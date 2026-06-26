/**
 * Pluggable intelligence layer.
 *
 * Provider-agnostic: prefers OpenAI (ChatGPT) when OPENAI_API_KEY is set, else Anthropic,
 * else the deterministic engine. Pin one with LLM_PROVIDER=openai|anthropic. When a key is set
 * the chosen model powers the *real* intelligence:
 *   - parseResumeLLM   : résumé text → structured, date-reconciled Profile
 *   - generatePathsLLM : Profile + answers → 3 grounded career paths + a named tension
 *   - deepDiveLLM      : Profile + path → richer "what it does / why ready" prose
 *   - askNavi          : free-form Q&A grounded in the user's profile + plan
 *
 * Every call is wrapped so that if the key is missing, the SDK isn't present, the call
 * fails, or the JSON is malformed, we fall back to the deterministic engine. The app is
 * always fully functional with ZERO keys — the LLM makes it sharper, not load-bearing.
 *
 * Guardrail: even LLM-extracted résumés are run through reconcileExperience() so the
 * phantom multi-decade "gap loop" bug can never reappear (the #1 teardown finding).
 */
import type { Profile, Answers, CareerPath, AnalyzeResult, ResumeRole } from "./types";
import { generatePaths } from "./engine/analyze";
import { parseProfile, reconcileExperience, monthIndex, yearsLabel, seniorityFor, guessDomain } from "./engine/parseProfile";

// Provider-agnostic. Prefer OpenAI (ChatGPT) when OPENAI_API_KEY is set, else Anthropic,
// else the deterministic engine. Force one with LLM_PROVIDER=openai|anthropic.
type Provider = "openai" | "anthropic";
function provider(): Provider | null {
  const forced = (process.env.LLM_PROVIDER || "").toLowerCase();
  if (forced === "openai") return process.env.OPENAI_API_KEY ? "openai" : null;
  if (forced === "anthropic") return process.env.ANTHROPIC_API_KEY ? "anthropic" : null;
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  return null;
}
export const llmEnabled = () => provider() !== null;

const _clients: Record<string, any> = {};
async function getClient(p: Provider): Promise<any | null> {
  if (_clients[p]) return _clients[p];
  if (p === "openai") {
    const mod: any = await import("openai").catch(() => null);
    if (!mod) return null;
    const OpenAI = mod.default || mod;
    _clients[p] = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } else {
    const mod: any = await import("@anthropic-ai/sdk").catch(() => null);
    if (!mod) return null;
    const Anthropic = mod.default || mod;
    _clients[p] = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _clients[p];
}

// Low-level call returning raw text. Throws on failure (callers catch + fall back).
// `json: true` uses OpenAI's JSON mode for reliable structured output.
async function complete(system: string, user: string, maxTokens = 1200, json = false): Promise<string> {
  const p = provider();
  if (!p) throw new Error("no-llm");
  const c = await getClient(p);
  if (!c) throw new Error("no-sdk");

  if (p === "openai") {
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const res = await c.chat.completions.create({
      model,
      max_tokens: maxTokens,
      ...(json ? { response_format: { type: "json_object" } } : {}),
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    });
    return res.choices?.[0]?.message?.content?.trim() || "";
  }
  // anthropic
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const msg = await c.messages.create({ model, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] });
  const block = msg.content?.find((b: any) => b.type === "text");
  return block?.text?.trim() || "";
}

// Pull the first JSON object/array out of a model response (handles ```json fences + prose).
function extractJSON<T = any>(text: string): T | null {
  if (!text) return null;
  let s = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const start = s.search(/[{[]/);
  if (start < 0) return null;
  // find matching close by scanning
  const open = s[start];
  const close = open === "{" ? "}" : "]";
  let depth = 0, end = -1, inStr = false, esc = false;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true;
    else if (ch === open) depth++;
    else if (ch === close) { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) return null;
  try { return JSON.parse(s.slice(start, end + 1)) as T; } catch { return null; }
}

// ---------------------------------------------------------------------------
// 1) RÉSUMÉ PARSING — LLM extraction + deterministic reconciliation guardrail.
// ---------------------------------------------------------------------------
const RESUME_SYS = `You are an expert résumé parser for an Indian career product. Extract a STRUCTURED profile from the résumé text. Be faithful — never invent facts. Return ONLY JSON (no prose, no code fences) of shape:
{
  "name": string,
  "headlineTitle": string,        // current/most-recent role title
  "headlineCompany": string,
  "city": string,                  // best guess; Indian metro if unclear
  "domain": string,                // one of: "Commerce & Ops","Fintech","AI Products","Growth","B2B SaaS","Edtech","Product"
  "skills": string[],              // 8-15 concrete skills actually evidenced
  "metrics": string[],             // 3-6 quantified wins, VERBATIM short fragments (e.g. "₹500 Cr working capital saved")
  "roles": [
    { "title": string, "company": string, "start": "MMM YYYY", "end": "MMM YYYY"|"Present", "bullets": string[] }
  ]
}
CRITICAL date rule: copy start/end exactly as written; if a role is ongoing use "Present". Do NOT compute any gaps or totals — the app reconciles dates itself. List roles most-recent first.`;

export async function parseResumeLLM(text: string, fileName = ""): Promise<Profile | null> {
  if (!llmEnabled() || !text || text.length < 40) return null;
  try {
    const raw = await complete(RESUME_SYS, `Résumé text:\n\n${text.slice(0, 14000)}`, 2600, true);
    const j = extractJSON<any>(raw);
    return profileFromResumeJSON(j, text, fileName);
  } catch (e) {
    console.warn("parseResumeLLM fallback:", (e as Error).message);
    return null;
  }
}

// Scanned/image-only PDF fallback. OpenAI PDF inputs include both page images and
// extracted text, so this works even when pdf-parse returns little or no text.
export async function parseResumePDFLLM(buffer: Buffer, fileName = "resume.pdf"): Promise<Profile | null> {
  if (!process.env.OPENAI_API_KEY || !buffer.length) return null;
  try {
    const client = await getClient("openai");
    if (!client) return null;
    const response = await client.responses.create({
      model: process.env.OPENAI_PDF_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
      max_output_tokens: 2600,
      input: [{
        role: "user",
        content: [
          {
            type: "input_file",
            filename: fileName,
            file_data: `data:application/pdf;base64,${buffer.toString("base64")}`,
          },
          {
            type: "input_text",
            text: `${RESUME_SYS}\n\nRead every visible résumé page carefully, including scanned page images. Return only the requested JSON.`,
          },
        ],
      }],
    });
    const j = extractJSON<any>(response.output_text || "");
    return profileFromResumeJSON(j, response.output_text || "", fileName);
  } catch (e) {
    console.warn("parseResumePDFLLM fallback:", (e as Error).message);
    return null;
  }
}

function profileFromResumeJSON(j: any, sourceText: string, fileName: string): Profile | null {
  if (!j || !Array.isArray(j.roles)) return null;
  const roles: ResumeRole[] = j.roles.map((r: any) => ({
    title: String(r.title || "Role").slice(0, 90),
    company: String(r.company || "").slice(0, 60),
    start: r.start ? String(r.start) : undefined,
    end: r.end ? String(r.end) : undefined,
    startMonths: monthIndex(r.start),
    endMonths: monthIndex(r.end),
    bullets: Array.isArray(r.bullets) ? r.bullets.slice(0, 5).map((b: any) => String(b).slice(0, 200)) : [],
  }));
  const { totalMonths, reconciledNote } = reconcileExperience(roles, sourceText);
  const titlesBlob = roles.map((r) => r.title).join(" ");
  const skills: string[] = Array.isArray(j.skills) ? j.skills.map((s: any) => String(s)).slice(0, 15) : [];
  const metrics: string[] = Array.isArray(j.metrics) ? j.metrics.map((s: any) => String(s)).slice(0, 6) : [];
  return {
    name: String(j.name || fileName.replace(/[-_]/g, " ").replace(/\.pdf$/i, "").trim() || "there").slice(0, 60),
    headlineTitle: String(j.headlineTitle || roles[0]?.title || "Product professional").slice(0, 90),
    headlineCompany: String(j.headlineCompany || roles[0]?.company || "").slice(0, 60),
    city: String(j.city || "Bangalore").slice(0, 40),
    totalMonths,
    totalYearsLabel: yearsLabel(totalMonths),
    seniority: seniorityFor(totalMonths, titlesBlob),
    domain: String(j.domain || guessDomain(sourceText)).slice(0, 40),
    skills: skills.length ? skills : ["Product Strategy", "Roadmapping", "Stakeholder Communication", "Analytics"],
    metrics,
    roles: roles.slice(0, 8),
    reconciledNote,
    rawTextLen: sourceText.length,
  };
}

// The public entrypoint used by the API: LLM first, deterministic fallback.
export async function buildProfile(text: string, fileName = ""): Promise<{ profile: Profile; source: "llm" | "engine" }> {
  const llm = await parseResumeLLM(text, fileName);
  if (llm) return { profile: llm, source: "llm" };
  return { profile: parseProfile(text, fileName), source: "engine" };
}

// ---------------------------------------------------------------------------
// 2) PATH GENERATION — catalogue chooses the REAL roles + CTC; the LLM enriches
//    the tension and per-role reasoning. Titles/bands never drift from the catalogue.
// ---------------------------------------------------------------------------
const PATHS_SYS = `You are Navi+, a sharp, honest AI career strategist for the Indian market. You are given a person's profile, their goal, and 3 PRE-SELECTED target roles (with real comp bands). Do NOT invent or rename roles. Write a specific tension and, for each given role, why THIS person fits and what the role does. Return ONLY JSON:
{
  "tension": string,            // 2-3 sentences, specific to this person + their goal
  "paths": [ { "title": string,  // EXACTLY one of the given titles, unchanged
               "fit": string[3], // why they fit — reference their real wins/skills, <16 words each
               "whatItDoes": string[2] } ]  // what the role does day-to-day, <16 words each
}
Keep all three given roles; order them best-fit first. Never use em dashes (—); write with commas, colons, or periods.`;

export async function generatePathsLLM(profile: Profile, answers: Answers): Promise<AnalyzeResult | null> {
  if (!llmEnabled()) return null;
  try {
    // The catalogue picks the real roles + CTC bands (goal-aware). LLM only enriches prose.
    const base = generatePaths(profile, answers).paths;
    if (!base.length) return null;
    const goal = answers.goal || answers.intent || "explore";
    const ctx = `Profile: ${profile.name}, ${profile.headlineTitle}${profile.headlineCompany ? ` at ${profile.headlineCompany}` : ""}, ${profile.totalYearsLabel}, domain ${profile.domain}, ${profile.city}.
Skills: ${profile.skills.join(", ")}.
Wins: ${profile.metrics.join(" | ") || "n/a"}.
Goal: ${goal}.${answers.knownRole ? ` Target they named: "${answers.knownRole}".` : ""}
Extra context from the person: ${answers.profileNote || "none provided"}.
What a good work day looks like: ${answers.goodDay || "not yet specified"}.
Priorities: ${answers.priorities?.join(", ") || "not yet specified"}.
The 3 pre-selected roles (use these titles verbatim):
${base.map((p, i) => `${i + 1}. ${p.title} — ${p.archetype}, median ${p.band.median}L, skills to build: ${p.skillsBuild.map((s) => s.name).join(", ")}`).join("\n")}`;

    const raw = await complete(PATHS_SYS, ctx, 1200, true);
    const j = extractJSON<any>(raw);
    if (!j) return { paths: base, tension: String(j?.tension || base.length ? generatePaths(profile, answers).tension : "") };

    // Merge LLM prose onto the catalogue paths (match by title; keep title/band/skills fixed).
    const llmByTitle = new Map<string, any>();
    if (Array.isArray(j.paths)) for (const p of j.paths) if (p?.title) llmByTitle.set(String(p.title).toLowerCase().trim(), p);
    const paths: CareerPath[] = base.map((p) => {
      const e = llmByTitle.get(p.title.toLowerCase().trim());
      return {
        ...p,
        fit: e && Array.isArray(e.fit) && e.fit.length ? e.fit.slice(0, 4).map(String) : p.fit,
        whatItDoes: e && Array.isArray(e.whatItDoes) && e.whatItDoes.length
          ? [...e.whatItDoes.slice(0, 2).map(String), p.whatItDoes[1]].filter(Boolean)
          : p.whatItDoes,
      };
    });
    return { paths, tension: String(j.tension || "").trim() || generatePaths(profile, answers).tension };
  } catch (e) {
    console.warn("generatePathsLLM fallback:", (e as Error).message);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 3) DEEP-DIVE PROSE — optional enrichment of what-it-does / why-ready bullets.
// ---------------------------------------------------------------------------
export async function deepDiveLLM(profile: Profile, path: CareerPath): Promise<{ whatItDoes: string[]; whyReady: string[] } | null> {
  if (!llmEnabled()) return null;
  try {
    const sys = `You are Navi+. Return ONLY JSON {"whatItDoes": string[3], "whyReady": string[3]} for a candidate's target role. whatItDoes = what the role actually does day-to-day at a senior level. whyReady = why THIS person is ready, referencing their real wins. Be concrete, no fluff. Never use em dashes (—); use commas or periods.`;
    const user = `Person: ${profile.headlineTitle}, ${profile.totalYearsLabel}, ${profile.domain}. Wins: ${profile.metrics.join(" | ") || "n/a"}. Target role: ${path.title}.`;
    const raw = await complete(sys, user, 600, true);
    const j = extractJSON<any>(raw);
    if (!j || !Array.isArray(j.whatItDoes) || !Array.isArray(j.whyReady)) return null;
    return { whatItDoes: j.whatItDoes.slice(0, 4).map(String), whyReady: j.whyReady.slice(0, 4).map(String) };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// 4) ASK NAVI — free-form, grounded; deterministic fallback always answers.
// ---------------------------------------------------------------------------
interface AskCtx { profile?: Profile | null; chosenPath?: string | null; planSummary?: string | null; history?: { role: "user" | "navi"; text: string }[]; }

export async function askNavi(question: string, ctx: AskCtx): Promise<{ answer: string; source: "llm" | "engine" }> {
  if (llmEnabled()) {
    try {
      const sys =
        "You are Navi+, a sharp, honest AI career strategist for the Indian market. You are mid-conversation with the user — read the recent transcript and reply to their LATEST message in context (don't restart or give generic advice). Be specific, name real tensions, never invent facts about the user beyond the context. Ground money talk in their numbers. Keep answers to 3-5 sentences. Nudge toward a concrete next step only when it genuinely helps. IMPORTANT: this is a demo — you cannot actually book sessions, enrol in courses, rework résumés, or apply to jobs. If the user asks you to do one of those, briefly note that it's a demo and describe what the real product would do, rather than pretending it's done. Never use em dashes (—); write with commas, colons, or periods instead.";
      const context = [
        ctx.profile && `Profile: ${ctx.profile.name}, ${ctx.profile.headlineTitle}, ${ctx.profile.totalYearsLabel}, ${ctx.profile.domain}, ${ctx.profile.city}. Skills: ${ctx.profile.skills.join(", ")}.`,
        ctx.chosenPath && `Chosen path: ${ctx.chosenPath}.`,
        ctx.planSummary && `Plan: ${ctx.planSummary}.`,
      ].filter(Boolean).join("\n");
      const convo = (ctx.history || []).slice(-8).map((m) => `${m.role === "user" ? "User" : "Navi"}: ${m.text}`).join("\n");
      const user = `${context}${convo ? `\n\nRecent conversation:\n${convo}` : ""}\n\nUser's latest message: ${question}\n\nReply to that latest message, in context.`;
      const answer = await complete(sys, user, 500);
      if (answer) return { answer, source: "llm" };
    } catch (e) {
      console.warn("askNavi LLM fallback:", (e as Error).message);
    }
  }
  return { answer: engineAnswer(question, ctx), source: "engine" };
}

// Grounded fallback so free-text always works, even offline.
function engineAnswer(question: string, ctx: AskCtx): string {
  const q = question.toLowerCase();
  const who = ctx.profile?.name?.split(" ")[0] || "there";
  const path = ctx.chosenPath ? ` for ${ctx.chosenPath}` : "";
  if (q.includes("salary") || q.includes("pay") || q.includes("ctc") || q.includes("worth"))
    return `Short version, ${who}: the outcome card on your plan${path} is the honest answer — a realistic range, the odds of hitting it, and the cost. If you want it tighter, add your exact current CTC and I'll re-run it. The biggest lever on the number is closing your top gap before you interview.`;
  if (q.includes("mba") || q.includes("masters") || q.includes("study"))
    return `An MBA mainly makes sense if you're optimising for a step-change in level or a hard pivot — and it's fundable via Leap Finance (study-now-pay-later, no collateral). If your move is lateral and you already have the proof points, a mentor call + 2 mapped courses usually beats two years out of the market. Want me to compare both for your numbers?`;
  if (q.includes("company") || q.includes("companies") || q.includes("where") || q.includes("job"))
    return `Look at the "Companies you fit" list and the Jobs tab on your plan — they're filtered to your archetype and stage, not generic. Start with the two actively hiring for your target title; a warm intro through a mentor beats a cold application every time.`;
  if (q.includes("gap") || q.includes("skill") || q.includes("learn"))
    return `Your gap map breaks it into 3 specific gaps with exactly what closes each one${path}. Don't try to close all three at once — pick the one that shows up most on the JDs you saw in week 1, and ship one artifact that proves it.`;
  return `Good question, ${who}. The fastest way to a confident answer is a 30-min call with a mentor who made this exact move — they'll pressure-test it against your numbers${path}. In the meantime, the plan on your dashboard has the outcome math, the gap map, and your week-by-week. What specifically are you weighing?`;
}
