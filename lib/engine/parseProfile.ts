import type { Profile, ResumeRole, Seniority } from "../types";

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};

// months since Jan 2000; "Present" -> current month
export function monthIndex(s?: string): number | undefined {
  if (!s) return undefined;
  const t = s.trim().toLowerCase();
  if (t.includes("present") || t.includes("current") || t.includes("now")) {
    const d = new Date();
    return (d.getFullYear() - 2000) * 12 + d.getMonth();
  }
  const m = t.match(/([a-z]{3,4})?\s*'?(\d{4})/);
  if (!m) return undefined;
  const mon = m[1] ? (MONTHS[m[1].slice(0, 3)] ?? 0) : 0;
  const yr = parseInt(m[2], 10);
  if (yr < 1980 || yr > 2100) return undefined;
  return (yr - 2000) * 12 + mon;
}

const SKILL_BANK = [
  "Demand Forecasting", "OMS/IMS Architecture", "SaaS GTM Strategy", "P&L Management", "AI/ML Products",
  "B2B2C Platforms", "Growth Loops", "Retention", "Pricing", "Data-led Pricing", "Roadmap Prioritization",
  "Stakeholder Communication", "MCP-Native AI Agents", "LLM Prompt Engineering", "Claude Code", "Org Design",
  "User Research", "A/B Testing", "Analytics", "GTM", "Fundraising", "Enterprise Sales", "Vendor Negotiation",
  "Inventory", "Catalog", "Marketplace", "Fintech", "Edtech", "Consumer", "0-to-1", "Platform Thinking",
];

function pickSkills(text: string): string[] {
  const lt = text.toLowerCase();
  const found = SKILL_BANK.filter((s) => lt.includes(s.toLowerCase().split("/")[0].split(" ")[0]));
  // de-dup + keep order, ensure at least a few
  const uniq = Array.from(new Set(found));
  return uniq.length ? uniq.slice(0, 12) : ["Product Strategy", "Roadmapping", "Stakeholder Communication", "Analytics"];
}

function pickMetrics(text: string): string[] {
  const out: string[] = [];
  const re = /([₹$]?\s?\d[\d,.]*\s?(cr|lpa|lakh|k|m|%|x|months?|mo)\b[^.;\n]{0,60})/gi;
  let m;
  while ((m = re.exec(text)) && out.length < 6) {
    const frag = m[1].trim().replace(/\s+/g, " ");
    if (frag.length > 4) out.push(frag);
  }
  return out;
}

// crude role extraction: look for "Title @ Company" or lines with a date range nearby
function extractRoles(text: string): ResumeRole[] {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const dateRange = /([A-Za-z]{3,4}\.?\s?'?\d{4}|\d{4})\s*[-–—to]+\s*(present|current|[A-Za-z]{3,4}\.?\s?'?\d{4}|\d{4})/i;
  const roles: ResumeRole[] = [];
  for (let i = 0; i < lines.length; i++) {
    const dm = lines[i].match(dateRange);
    if (dm) {
      // title likely current or previous line
      const titleLine = (lines[i].replace(dateRange, "").trim() || lines[i - 1] || "").slice(0, 80);
      const start = monthIndex(dm[1]);
      const end = monthIndex(dm[2]);
      // capture a few following bullet lines as achievements
      const bullets: string[] = [];
      for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
        if (dateRange.test(lines[j])) break;
        if (/^[•\-*▪◦·]|^\s*\d+[.)]/.test(lines[j]) && lines[j].length > 8) bullets.push(lines[j].replace(/^[•\-*▪◦·\d.)\s]+/, "").slice(0, 160));
        if (bullets.length >= 4) break;
      }
      roles.push({
        title: titleLine || "Role",
        company: (lines[i + 1] || "").slice(0, 50),
        start: dm[1], end: dm[2], startMonths: start, endMonths: end, bullets,
      });
    }
  }
  return roles;
}

export function yearsLabel(months: number): string {
  const y = Math.floor(months / 12), m = months % 12;
  return m ? `${y} yr ${m} mo` : `${y} yr`;
}

export function seniorityFor(months: number, titles: string): Seniority {
  const t = titles.toLowerCase();
  if (t.includes("vp") || t.includes("head of") || t.includes("director") || months >= 12 * 8) return "leader";
  if (months >= 12 * 4) return "senior";
  if (months >= 12 * 2) return "mid";
  if (months >= 8) return "early";
  return "grad";
}

/**
 * The core fix from the teardown: reconcile concurrent / "Present" roles so we NEVER
 * emit an impossible multi-decade gap. Total experience = (latest end) - (earliest start),
 * clamped to the real career span. Overlaps are surfaced as a calm note, not a blocking modal.
 */
/**
 * THE core teardown fix, shared by the deterministic parser AND the LLM path: reconcile
 * concurrent / "Present" roles so we NEVER emit an impossible multi-decade gap.
 * Total = (latest end | now) − (earliest start), clamped to a plausible working life.
 */
export function reconcileExperience(roles: ResumeRole[], fallbackText = ""): { totalMonths: number; reconciledNote?: string } {
  const starts = roles.map((r) => r.startMonths).filter((n): n is number => typeof n === "number");
  const ends = roles.map((r) => r.endMonths).filter((n): n is number => typeof n === "number");
  const now = (new Date().getFullYear() - 2000) * 12 + new Date().getMonth();

  let totalMonths = 0;
  let reconciledNote: string | undefined;
  if (starts.length) {
    const earliest = Math.min(...starts);
    const latest = ends.length ? Math.max(...ends, now) : now;
    totalMonths = Math.max(0, latest - earliest);
    const presentCount = roles.filter((r) => (r.end || "").toLowerCase().includes("present")).length;
    if (presentCount > 1) {
      reconciledNote = `Found ${presentCount} concurrent roles (e.g. a mentorship alongside your main job). Counted them as overlapping — not as a multi-year gap.`;
    }
  } else if (fallbackText) {
    const yrs = Array.from(fallbackText.matchAll(/\b(19|20)\d{2}\b/g)).map((m) => parseInt(m[0], 10));
    if (yrs.length) totalMonths = Math.max(0, (Math.max(...yrs) - Math.min(...yrs)) * 12);
  }
  // hard guardrail: experience can never exceed a plausible working life
  return { totalMonths: Math.min(totalMonths, 12 * 45), reconciledNote };
}

export function parseProfile(text: string, fileName = ""): Profile {
  const clean = text.replace(/\r/g, "");
  const roles = extractRoles(clean);

  const { totalMonths, reconciledNote } = reconcileExperience(roles, clean);

  const nameMatch = clean.split("\n").map((l) => l.trim()).find((l) => /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(l) && l.length < 32);
  const titlesBlob = roles.map((r) => r.title).join(" ");

  return {
    name: nameMatch || fileName.replace(/[-_]/g, " ").replace(/\.pdf$/i, "").trim() || "there",
    headlineTitle: roles[0]?.title || "Product professional",
    headlineCompany: roles[0]?.company || "",
    city: (clean.match(/\b(Bangalore|Bengaluru|Mumbai|Delhi|Gurgaon|Hyderabad|Pune|Remote)\b/i)?.[0] as string) || "Bangalore",
    totalMonths,
    totalYearsLabel: yearsLabel(totalMonths),
    seniority: seniorityFor(totalMonths, titlesBlob),
    domain: guessDomain(clean),
    skills: pickSkills(clean),
    metrics: pickMetrics(clean),
    roles: roles.slice(0, 8),
    reconciledNote,
    rawTextLen: clean.length,
  };
}

export function guessDomain(text: string): string {
  const lt = text.toLowerCase();
  if (lt.includes("commerce") || lt.includes("oms") || lt.includes("inventory")) return "Commerce & Ops";
  if (lt.includes("fintech") || lt.includes("payments")) return "Fintech";
  if (lt.includes("ai") || lt.includes("ml") || lt.includes("agent")) return "AI Products";
  if (lt.includes("growth") || lt.includes("retention")) return "Growth";
  if (lt.includes("saas") || lt.includes("b2b")) return "B2B SaaS";
  return "Product";
}
