import type { Profile, Answers, CareerPath, SkillItem, AnalyzeResult } from "../types";
import { courseFor } from "../../data/courses";
import { estimateBand } from "../../data/salaryBands";
import { fmtLPA } from "./outcome";
import {
  ROLES, type CareerRole, type RoleLevel,
  findRole, matchRoles, growthFrom, adjacentTo, levelRank,
} from "../../data/roles";

// ---------------------------------------------------------------------------
// Catalog-driven path generation. We map the résumé to a "current role" in the
// 105-role catalogue, then surface real next moves along the career-path graph,
// steered by the user's GOAL (earn more / switch / grow / explore).
// ---------------------------------------------------------------------------

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Is a catalog title a STRONG match for what the user typed? (set-equality of significant
// tokens, ignoring only structural words) — "VP Product" ~ "VP of Product", but
// "Chief Revenue Officer" is NOT "Chief Product Officer".
const TITLE_STRUCT = new Set(["of", "the", "and", "for", "to", "in", "on", "at", "with", "a"]);
function sigTokens(s: string): Set<string> {
  return new Set(norm(s).split(" ").filter((w) => w.length >= 3 && !TITLE_STRUCT.has(w)));
}
function closeTitle(a: string, b: string): boolean {
  const A = sigTokens(a), B = sigTokens(b);
  if (!A.size || !B.size) return norm(a) === norm(b);
  const [small, big] = A.size <= B.size ? [A, B] : [B, A];
  let hit = 0; small.forEach((t) => { if (big.has(t)) hit++; });
  return hit === small.size && Math.abs(A.size - B.size) <= 1;
}

function seniorityToLevel(s: Profile["seniority"]): RoleLevel {
  return ({ grad: "entry", early: "mid", mid: "senior", senior: "lead", leader: "director" } as const)[s] || "mid";
}

function anchorRole(profile: Profile): CareerRole {
  return (
    findRole(profile.headlineTitle) ||
    matchRoles({ skills: profile.skills, domain: profile.domain, level: seniorityToLevel(profile.seniority), limit: 1 })[0] ||
    ROLES[0]
  );
}

const STOP = new Set(["and", "the", "for", "with", "to", "of", "a", "in", "on", "at", "skills", "management", "strategy"]);
function tokens(s: string): string[] {
  return norm(s).split(" ").filter((t) => t.length >= 3 && !STOP.has(t));
}
// How well the profile covers a role's core skills (0..1) — token-overlap OR phrase-containment,
// so "P&L Management" matches "P&L ownership", "Growth Loops" matches "Consumer growth", etc.
function coverage(profile: CareerRole | Profile, role: CareerRole): number {
  const havePhrases = ("coreSkills" in profile ? profile.coreSkills : profile.skills).map(norm);
  const haveTokens = new Set(havePhrases.flatMap((p) => tokens(p)));
  if (!role.coreSkills.length) return 0.5;
  let hit = 0;
  for (const cs of role.coreSkills) {
    const csn = norm(cs);
    const phraseMatch = havePhrases.some((h) => h && (csn.includes(h) || h.includes(csn)));
    const tokenMatch = tokens(cs).some((t) => haveTokens.has(t));
    if (phraseMatch || tokenMatch) hit++;
  }
  return hit / role.coreSkills.length;
}

// Track-affinity: how credible a cross-domain move is, independent of exact skill text.
// Product↔Growth/Business/Data are real pivots; Product↔Engineering is a stretch. This is the
// "mapping" that stops a Director of Product being offered a CTO role.
const AFFINITY: Record<string, Record<string, number>> = {
  "Product": { "Product": 1, "Growth & GTM": 0.72, "Business & Ops": 0.66, "Data & AI": 0.5, "Design": 0.46, "Engineering": 0.32 },
  "Engineering": { "Engineering": 1, "Data & AI": 0.72, "Product": 0.5, "Design": 0.34, "Business & Ops": 0.38, "Growth & GTM": 0.24 },
  "Data & AI": { "Data & AI": 1, "Engineering": 0.7, "Product": 0.6, "Business & Ops": 0.5, "Growth & GTM": 0.4, "Design": 0.3 },
  "Design": { "Design": 1, "Product": 0.6, "Growth & GTM": 0.46, "Engineering": 0.34, "Data & AI": 0.3, "Business & Ops": 0.36 },
  "Growth & GTM": { "Growth & GTM": 1, "Business & Ops": 0.62, "Product": 0.62, "Design": 0.42, "Data & AI": 0.4, "Engineering": 0.24 },
  "Business & Ops": { "Business & Ops": 1, "Growth & GTM": 0.62, "Product": 0.6, "Data & AI": 0.5, "Engineering": 0.4, "Design": 0.36 },
};
function affinity(a: string, b: string): number {
  return AFFINITY[a]?.[b] ?? (a === b ? 1 : 0.35);
}
// Combined credibility of a move: skill overlap + track affinity (0..1).
// anchorDomain is the CATALOG domain of the person's matched role (e.g. "Product"), not the
// free-text profile.domain (e.g. "AI Products") — the catalog vocabulary is what affinity keys on.
function fitScore(profile: Profile, role: CareerRole, anchorDomain: string): number {
  return 0.55 * coverage(profile, role) + 0.45 * affinity(anchorDomain, role.domain);
}

function matchPctFor(profile: Profile, role: CareerRole, baseLevel: RoleLevel, anchorDomain: string): number {
  const fit = fitScore(profile, role, anchorDomain); // blends skill overlap + track affinity
  const step = levelRank(role.level) - levelRank(baseLevel);
  let m = 48 + fit * 50;
  if (step === 0) m += 3; else if (step === 1) m += 1; else if (step >= 2) m -= 7;
  if (role.demand === "high") m += 2;
  return Math.max(52, Math.min(95, Math.round(m)));
}

function buildSkillItems(profile: Profile, role: CareerRole): SkillItem[] {
  const have = profile.skills.map(norm);
  const missing = role.coreSkills.filter((cs) => !have.some((h) => h && (norm(cs).includes(h) || h.includes(norm(cs)))));
  const pick = (missing.length ? missing : role.coreSkills).slice(0, 3);
  return pick.map((name, i) => {
    const c = courseFor(name);
    return { name, havePct: [40, 25, 55][i % 3], closesWith: c ? `${c.title} (${c.hours}h)` : "a focused 2-week sprint + 1 expert call" };
  });
}

function relevantHave(profile: Profile, role: CareerRole): string[] {
  const have = profile.skills;
  const rel = have.filter((h) => role.coreSkills.some((cs) => norm(cs).includes(norm(h)) || norm(h).includes(norm(cs))));
  return (rel.length ? rel : have).slice(0, 5);
}

function fitBullets(profile: Profile, role: CareerRole, direction: string): string[] {
  const metric = profile.metrics[0];
  const out: string[] = [];
  if (direction === "grow") out.push(`Natural next step up from ${profile.headlineTitle} — you already operate near this scope.`);
  else if (direction === "switch") out.push(`A credible pivot: your strengths transfer into ${role.domain}.`);
  else if (direction === "earn") out.push(`Higher earning ceiling — median ${fmtLPA(role.ctc.median)}, up to ${fmtLPA(role.ctc.high)}.`);
  else out.push(`Worth exploring — strong fit signals from your background.`);
  if (metric) out.push(`Your proof carries over: "${metric}".`);
  out.push(`${role.domain} demand is ${role.demand}; ${profile.totalYearsLabel} of depth backs the move.`);
  return out;
}

// "What your life would look like" — derived from level, money, and domain pace.
function lifeAtRole(role: CareerRole): string {
  const lr = levelRank(role.level);
  let work: string;
  if (lr <= 1) work = "Hands-on maker time — you build and ship directly, learning fast.";
  else if (lr === 2) work = "A balance of deep work and influence — you own outcomes, not just tasks.";
  else if (lr <= 4) work = "Mostly leading through others — strategy, hiring, and stakeholder rooms; less hands-on.";
  else work = "Org-building and high-stakes bets — leadership visibility, intense but high-leverage.";
  const money = role.moneyPotential === "high"
    ? ` Comp at this level (median ${fmtLPA(role.ctc.median)}) opens real financial freedom.`
    : role.moneyPotential === "steady"
    ? ` Comp is steady (median ${fmtLPA(role.ctc.median)}) rather than explosive.`
    : ` Solid comp (median ${fmtLPA(role.ctc.median)}) with room to grow.`;
  const pace = /sales|gtm|founding|founder|chief|vp|coo|cfo|cto/i.test(role.title) ? " Expect high intensity and ownership." : "";
  return work + money + pace;
}

function dayToDayFor(role: CareerRole): string[] {
  const lr = levelRank(role.level);
  const rhythm = lr <= 1 ? "Most days: focused execution, code/specs/designs, quick feedback loops."
    : lr === 2 ? "Most days: deep problem-solving, a few key meetings, shipping outcomes."
    : lr <= 4 ? "Most days: 1:1s, prioritisation, unblocking your team, exec syncs."
    : "Most days: strategy, leadership reviews, hiring, and high-stakes decisions.";
  return [role.description, rhythm];
}

function timeForStep(step: number): string {
  if (step <= 0) return "now–3 mo";
  if (step === 1) return "6–8 mo";
  return "9–14 mo";
}
function riskForStep(step: number, crossDomain: boolean): string {
  if (crossDomain && step >= 1) return "High";
  if (step >= 2) return "Medium-high";
  if (step === 1) return "Low";
  return "Very low";
}

function pathFromRole(role: CareerRole, profile: Profile, rank: number, direction: string, anchorDomain: string): CareerPath {
  const baseLevel = seniorityToLevel(profile.seniority);
  const step = levelRank(role.level) - levelRank(baseLevel);
  const crossDomain = norm(role.domain) !== norm(anchorDomain);
  const skillsBuild = buildSkillItems(profile, role);
  return {
    id: `path-${role.id}`,
    title: role.title,
    archetype: role.archetype,
    bestMatch: rank === 0,
    matchPct: matchPctFor(profile, role, baseLevel, anchorDomain),
    fit: fitBullets(profile, role, direction),
    whatItDoes: [role.description, `Domain: ${role.domain} · typical comp ${fmtLPA(role.ctc.low)}–${fmtLPA(role.ctc.high)}.`, role.topCompanies.length ? `Hiring now: ${role.topCompanies.slice(0, 4).join(", ")}.` : "Strong demand across product companies."],
    dayToDay: dayToDayFor(role),
    life: lifeAtRole(role),
    levelStep: Math.max(0, step),
    skillsHave: relevantHave(profile, role),
    skillsBuild,
    salaryFamily: role.level,
    band: { low: role.ctc.low, median: role.ctc.median, high: role.ctc.high },
    compare: {
      pay: fmtLPA(role.ctc.median),
      time: timeForStep(step),
      gap: `${skillsBuild.length} to build`,
      risk: riskForStep(step, crossDomain),
    },
  };
}

function uniqRoles(arr: CareerRole[]): CareerRole[] {
  const seen = new Set<string>(); const out: CareerRole[] = [];
  for (const r of arr) if (r && !seen.has(r.id)) { seen.add(r.id); out.push(r); }
  return out;
}

/**
 * Candidate selection — track-aware, graph-grounded, skill-gated.
 *
 * The pool comes from the catalogue's real career-path graph (1-hop growth + adjacent, plus
 * 2-hop when the user is bold/exploring) AND skill-relevant roles across domains. Every
 * candidate must clear a SKILL gate before a cross-track move is allowed — so a Director of
 * Product never gets offered CTO/COO (no shared skills), but DOES get credible pivots like
 * Head of Growth, Strategy & BizOps, or GM (real skill overlap). Goal + risk only reshape the
 * ranking and the level-step ceiling; they never override track sanity.
 */
function candidatesByGoal(profile: Profile, goal: string, current: CareerRole, risk?: string): { role: CareerRole; dir: string }[] {
  const baseLevel = seniorityToLevel(profile.seniority);
  const baseRank = levelRank(baseLevel);
  const anchorDomain = norm(current.domain);               // catalog track of the matched role
  const stepCap = risk === "safe" ? 1 : 2;                 // appetite ceiling on level jumps
  const allowHop2 = risk === "bold" || goal === "explore"; // widen the credible net when bold/exploring

  const hop1 = uniqRoles([...growthFrom(current), ...adjacentTo(current)]);
  const hop2 = allowHop2 ? uniqRoles(hop1.flatMap((r) => [...growthFrom(r), ...adjacentTo(r)])) : [];
  const graphIds = new Set(hop1.map((r) => r.id));
  const sameDom = matchRoles({ skills: profile.skills, domain: profile.domain, level: baseLevel, limit: 10 });
  const anyDom = matchRoles({ skills: profile.skills, level: baseLevel, limit: 16 });
  const pool = uniqRoles([...hop1, ...hop2, ...sameDom, ...anyDom]).filter((r) => r.id !== current.id);

  type Scored = { role: CareerRole; dir: string; score: number };
  const appetite = (step: number) =>
    (risk === "bold" ? [0, 3, 6] : risk === "safe" ? [6, 2, -3] : [3, 5, 2])[Math.min(2, Math.max(0, step))];

  const scored: Scored[] = [];
  for (const r of pool) {
    const step = levelRank(r.level) - baseRank;
    const cross = norm(r.domain) !== anchorDomain;
    const fit = fitScore(profile, r, current.domain);
    // hard gates
    if (step < 0) continue;                        // never recommend a downgrade
    if (step > stepCap) continue;                  // respect the user's appetite
    // Cross-track gating. A director-level commercial pivot (Head of Growth, Strategy, Sales
    // Director) is credible on affinity. But jumping tracks INTO a VP/exec seat (CTO, COO, CMO,
    // VP Design) demands real skill overlap, not just adjacency — so those need a much higher bar.
    const crossCeil = levelRank(r.level) >= levelRank("vp") ? 0.52 : 0.36;
    if (cross && fit < crossCeil) continue;

    let s = fit * 50;                              // credibility (skills + track affinity) dominates
    if (graphIds.has(r.id)) s += 10;              // researched, real transition
    s += cross ? 0 : 6;                            // gently prefer staying in-track
    s += appetite(step);
    if (goal === "earn") s += Math.min(22, r.ctc.median / 12);
    else if (goal === "grow") s += (cross ? 0 : 8) + (step >= 1 ? 6 : 0);
    else if (goal === "switch") s += cross ? 20 : -8;   // strongly favour a genuine lane change
    else s += 4;                                        // explore: flat, let diversity decide
    if (r.demand === "high") s += 2;

    const dir = cross ? "switch" : step >= 1 ? "grow" : "adjacent";
    scored.push({ role: r, dir, score: s });
  }
  scored.sort((a, b) => b.score - a.score);

  // Diversify: at most one role per (domain × level) in the lead set, so we never return
  // three near-identical roles (e.g. three C-suite titles). Top up if diversity runs short.
  const picked: Scored[] = [];
  const buckets = new Set<string>();
  for (const c of scored) {
    const key = `${c.role.domain}|${c.role.level}`;
    if (buckets.has(key)) continue;
    buckets.add(key); picked.push(c);
    if (picked.length >= 6) break;
  }
  for (const c of scored) { if (picked.length >= 6) break; if (!picked.includes(c)) picked.push(c); }
  // last-resort fallback so we always return something
  if (!picked.length) for (const r of growthFrom(current).concat(sameDom).slice(0, 3)) picked.push({ role: r, dir: "grow", score: 0 });

  return picked.map((c) => ({ role: c.role, dir: c.dir }));
}

export function generatePaths(profile: Profile, answers: Answers): AnalyzeResult {
  const goal = answers.goal || legacyGoal(answers.intent);
  const current = anchorRole(profile);
  const anchorDom = current.domain;

  // Rec #4: user named a target — anchor on it. Use full catalog data only on a STRONG title
  // match; otherwise honor their exact typed title (so "Chief Revenue Officer" ≠ "Chief Product Officer").
  if (answers.knownRole && answers.knownRole.trim().length > 2) {
    const known = findRole(answers.knownRole);
    const strong = known && closeTitle(known.title, answers.knownRole);
    const hero = strong ? pathFromRole(known!, profile, 0, "grow", anchorDom) : synthesizePath(answers.knownRole.trim(), profile, 0);
    const rest = candidatesByGoal(profile, goal, current, answers.risk).filter((c) => c.role.id !== known?.id).slice(0, 2);
    const paths = dedupPaths([hero, ...rest.map((c, i) => pathFromRole(c.role, profile, i + 1, c.dir, anchorDom))]);
    return { paths, tension: buildTension(profile, goal) };
  }

  const cands = candidatesByGoal(profile, goal, current, answers.risk);
  // Keep the GOAL-aware order (switch leads with a pivot, earn with the upside play) so the
  // three feel different per goal; mark "Best match" as the genuinely highest-fit role.
  const paths = dedupPaths(cands.map((c, i) => pathFromRole(c.role, profile, i, c.dir, anchorDom))).slice(0, 3);
  if (paths.length) {
    const top = paths.reduce((a, b) => (b.matchPct > a.matchPct ? b : a), paths[0]);
    paths.forEach((p) => (p.bestMatch = p === top));
  }
  return { paths, tension: buildTension(profile, goal) };
}

// Safety net: never show the same role (by id or title) twice.
function dedupPaths(paths: CareerPath[]): CareerPath[] {
  const seen = new Set<string>(); const out: CareerPath[] = [];
  for (const p of paths) {
    const key = `${p.id}|${norm(p.title)}`;
    if (seen.has(p.id) || seen.has(norm(p.title))) continue;
    seen.add(p.id); seen.add(norm(p.title)); out.push(p);
  }
  return out;
}

function legacyGoal(intent?: string): string {
  if (intent === "switch") return "switch";
  if (intent === "grow") return "grow";
  if (intent === "self") return "switch";
  return "explore";
}

function synthesizePath(title: string, profile: Profile, rank: number): CareerPath {
  const years = profile.totalMonths / 12;
  const band = estimateBand(title, years, profile.city);
  return {
    id: "path-known", title, archetype: "generic", bestMatch: rank === 0, matchPct: 86,
    fit: ["You already know your target — we skip discovery and go straight to the gap, the math, and the plan.", profile.metrics[0] ? `Your proof: "${profile.metrics[0]}".` : `Built over ${profile.totalYearsLabel}.`],
    whatItDoes: ["The role you named — we'll map your exact gap to it.", "Outcome math grounded in your numbers.", "A week-by-week plan to land it."],
    skillsHave: profile.skills.slice(0, 5),
    // Off-catalog role: seed sensible, course-mapped gaps so the gap map / plan aren't empty.
    skillsBuild: buildSkillItems(profile, { coreSkills: ["P&L ownership", "Executive communication", "Stakeholder leadership"], id: "", title, domain: "", archetype: "", level: "lead", description: "", ctc: band, niceToHave: [], growthRoles: [], adjacentRoles: [], topCompanies: [], demand: "medium", moneyPotential: "medium" }),
    salaryFamily: "lead", band: { low: band.low, median: band.median, high: band.high },
    compare: { pay: fmtLPA(band.median), time: "3–6 mo", gap: "3 to build", risk: "Low" },
  };
}

// Rec #10: "suggest more" — diverse roles not already shown, with a closing message.
export function suggestMore(profile: Profile, shown: string[]): { paths: CareerPath[]; closing: string } {
  const current = anchorRole(profile);
  const shownIds = new Set(shown.map((t) => findRole(t)?.id).filter(Boolean) as string[]);
  const pool = candidatesByGoal(profile, "explore", current).filter((c) => !shownIds.has(c.role.id) && !shown.some((t) => norm(t) === norm(c.role.title)));
  const more = pool.slice(0, 2).map((c, i) => pathFromRole(c.role, profile, i + 3, c.dir, current.domain));
  const closing = more.length
    ? "These are the adjacent moves worth a look. Beyond this you're stretching past what your experience supports right now — better to go deep on a strong match than keep widening the net."
    : "That's the full set of strong-fit roles for your profile right now. Going wider would mean roles your experience doesn't yet support — pick from the strong matches instead.";
  return { paths: more, closing };
}

export function buildTension(p: Profile, goal: string): string {
  const yrs = p.totalYearsLabel;
  const lead = goal === "earn"
    ? `You want the number to move — and it can, but only if the next role is one the market actually pays a premium for.`
    : goal === "switch"
    ? `You're ready for something different — the trick is switching into a lane where your ${p.domain} strengths still compound, not reset.`
    : goal === "grow"
    ? `You want to go deeper, not just busier — the next level rewards owning outcomes end-to-end, not more surface area.`
    : `You've got options — the real question is which one you'd actually defend, with the numbers to back it.`;
  return `You've spent ${yrs} becoming rare, with real ${p.domain} depth. ${lead} Let's find the path that pays off — then prove it.`;
}
