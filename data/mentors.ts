import type { Mentor, CareerPath, Profile } from "../lib/types";
import type { RoleLevel } from "./roles";
import { levelRank } from "./roles";

// Credible, named, *matched* experts (Rec #8) — the opposite of two faceless photos.
// Each has made the exact move the user is considering, with a relevant credential.
//
// Matching is NOT just by market archetype anymore. Each mentor carries the FUNCTION they
// coach (catalog `domains`), the seniority band they're useful at (`levels`), and the market
// segments they know (`archetypes`). matchMentor() scores on all three, so a Staff Engineer
// gets an engineering leader, a Data Scientist gets a data/AI leader, and a Director of Product
// gets a product leader — instead of everyone landing on one generic product coach.
type MentorEntry = Mentor & {
  archetype: string;            // primary market segment (kept for back-compat)
  domains: string[];            // catalog domains they credibly coach
  levels: RoleLevel[];          // seniority band where their advice lands
  archetypes: string[];         // market segments they know well
};

export const MENTORS: MentorEntry[] = [
  // ---- Product (market-segment specialists) ----------------------------------------------
  { archetype: "quick-commerce", name: "Rohan Mehta", initials: "RM", role: "ex-VP Product, Meesho · made the Director → VP Commerce switch in 2022",
    match: "Tier 2/3 commerce + 0→1 builder background",
    domains: ["Product", "Business & Ops"], levels: ["lead", "director", "vp"], archetypes: ["quick-commerce", "consumer"],
    gets: ["An honest read on whether your target salary is realistic", "The 2 gaps that actually block VP offers", "3 warm intros to commerce companies hiring now"], slot: "Thu 6:00 PM" },
  { archetype: "ai-infra", name: "Aditi Rao", initials: "AR", role: "Founding PM → VP Product at an AI-infra startup · shipped agentic products",
    match: "MCP / agent builders shipping with LLMs",
    domains: ["Product", "Data & AI"], levels: ["senior", "lead", "director", "vp"], archetypes: ["ai-infra", "b2b-saas"],
    gets: ["Whether to join vs. found in AI infra right now", "How to position a builder-operator profile", "Intros to 2 Series-A AI teams"], slot: "Sat 11:00 AM" },
  { archetype: "b2b-saas", name: "Vikram Nair", initials: "VN", role: "ex-Director Product, Razorpay · scaled platform ARR 5×",
    match: "PLG → enterprise SaaS operators",
    domains: ["Product", "Business & Ops"], levels: ["senior", "lead", "director"], archetypes: ["b2b-saas", "fintech"],
    gets: ["How to tell the platform story recruiters want", "Which enterprise gaps to close first", "Intros to 2 SaaS teams hiring directors"], slot: "Wed 7:30 PM" },
  { archetype: "fintech", name: "Sneha Iyer", initials: "SI", role: "Head of Product, consumer fintech · 100M+ user products",
    match: "consumer fintech growth + retention leaders",
    domains: ["Product", "Growth & GTM"], levels: ["senior", "lead", "director"], archetypes: ["fintech", "consumer"],
    gets: ["A frank read on your growth narrative", "The metrics that get you to Head-of level", "2 warm intros in fintech"], slot: "Tue 8:00 PM" },
  { archetype: "consumer", name: "Arjun Desai", initials: "AD", role: "VP Product at a consumer unicorn · led monetisation 0→₹500Cr",
    match: "mass-market consumer + monetisation",
    domains: ["Product", "Growth & GTM"], levels: ["lead", "director", "vp"], archetypes: ["consumer", "quick-commerce"],
    gets: ["Is your target level realistic in 6 months?", "The monetisation proof points to build", "Intros to 2 consumer teams"], slot: "Fri 6:30 PM" },
  { archetype: "edtech", name: "Priya Menon", initials: "PM", role: "ex-VP Product, Eruditus · scaled learning products globally",
    match: "edtech product leaders monetising outcomes",
    domains: ["Product", "Growth & GTM"], levels: ["senior", "lead", "director", "vp"], archetypes: ["edtech", "consumer"],
    gets: ["How to connect outcomes to revenue", "Positioning for a VP move", "Intros to 2 edtech teams"], slot: "Mon 7:00 PM" },

  // ---- Engineering (IC track) ------------------------------------------------------------
  { archetype: "engineering", name: "Karthik Iyer", initials: "KI", role: "Staff Engineer, ex-Flipkart · grew SDE-2 → Staff, mentored 30+ engineers",
    match: "backend / platform engineers leveling up the IC ladder",
    domains: ["Engineering"], levels: ["entry", "mid", "senior", "lead"], archetypes: ["b2b-saas", "consumer", "fintech", "generic"],
    gets: ["What actually gets you promoted vs. just more work", "The system-design depth that clears Staff bars", "A 90-day plan to your next level"], slot: "Sat 10:00 AM" },
  // ---- Engineering (management track) ----------------------------------------------------
  { archetype: "eng-leadership", name: "Deepa Krishnan", initials: "DK", role: "ex-VP Engineering, PhonePe · scaled teams 12 → 140",
    match: "Senior IC → EM and EM → Director/VP Eng transitions",
    domains: ["Engineering"], levels: ["lead", "director", "vp", "exec"], archetypes: ["fintech", "b2b-saas", "consumer", "generic"],
    gets: ["IC vs. management: an honest read for your wiring", "What a Director-of-Eng panel really tests", "Intros to 2 teams hiring eng leaders"], slot: "Wed 8:30 PM" },

  // ---- Data & AI / ML --------------------------------------------------------------------
  { archetype: "data-ai", name: "Ananya Gupta", initials: "AG", role: "Head of Data Science, ex-Swiggy · built the ML platform team 0→1",
    match: "DS / ML / analytics ICs and leads moving up",
    domains: ["Data & AI"], levels: ["mid", "senior", "lead", "director"], archetypes: ["consumer", "fintech", "ai-infra", "generic"],
    gets: ["Whether to go deep ML or pivot to DS leadership", "The portfolio that proves senior-DS impact", "Intros to 2 data teams hiring now"], slot: "Thu 8:00 PM" },

  // ---- Design ----------------------------------------------------------------------------
  { archetype: "design", name: "Meera Nambiar", initials: "MN", role: "Design Director, ex-CRED · led 0→1 design systems and a 20-person craft team",
    match: "product / UX designers moving into lead and director craft roles",
    domains: ["Design"], levels: ["mid", "senior", "lead", "director"], archetypes: ["consumer", "fintech", "b2b-saas", "generic"],
    gets: ["Portfolio story that reads at director level", "IC-craft vs. design-management: which fits you", "Intros to 2 teams hiring design leaders"], slot: "Tue 7:00 PM" },

  // ---- Business & Ops / Strategy / Consulting --------------------------------------------
  { archetype: "consulting", name: "Siddharth Rao", initials: "SR", role: "ex-Partner-track, McKinsey → VP Strategy at a unicorn · ran 0→₹300Cr P&Ls",
    match: "consultants and strategy/ops leaders moving into operating roles",
    domains: ["Business & Ops"], levels: ["senior", "lead", "director", "vp"], archetypes: ["consumer", "b2b-saas", "generic"],
    gets: ["Consulting → industry: how to land the right level", "Owning a P&L vs. advising on one", "Intros to 2 strategy/BizOps teams"], slot: "Mon 8:30 PM" },

  // ---- Growth & GTM ----------------------------------------------------------------------
  { archetype: "growth", name: "Nikhil Bansal", initials: "NB", role: "VP Growth, ex-CRED · owned a ₹400Cr growth P&L across paid + organic",
    match: "growth, marketing, and GTM leaders scaling to VP",
    domains: ["Growth & GTM"], levels: ["senior", "lead", "director", "vp"], archetypes: ["consumer", "fintech", "edtech", "b2b-saas"],
    gets: ["The growth narrative that gets you to VP", "Which loops compound vs. which just burn cash", "Intros to 2 teams hiring growth leaders"], slot: "Fri 7:30 PM" },

  // ---- Healthtech (segment specialist) ---------------------------------------------------
  { archetype: "healthtech", name: "Dr. Ritu Shah", initials: "RS", role: "Chief Product Officer, digital health · built regulated consumer-health products",
    match: "product and ops leaders in regulated health / wellness",
    domains: ["Product", "Business & Ops"], levels: ["lead", "director", "vp"], archetypes: ["healthtech", "consumer"],
    gets: ["Building product inside clinical + regulatory constraints", "The trust metrics investors and recruiters look for", "Intros to 2 healthtech teams"], slot: "Sat 12:00 PM" },

  // ---- Default generalist (true fallback only) -------------------------------------------
  { archetype: "default", name: "Kabir Shah", initials: "KS", role: "Career coach · guided 200+ professionals into their next level across functions",
    match: "senior IC → leadership transitions, any function",
    domains: ["Product", "Business & Ops", "Growth & GTM", "Engineering", "Data & AI", "Design"], levels: ["entry", "mid", "senior", "lead", "director", "vp", "exec"], archetypes: ["generic"],
    gets: ["A frank read on your readiness", "The narrative that gets you shortlisted", "A 30-day action plan"], slot: "Tomorrow 7:00 PM" },
];

const DEFAULT = MENTORS.find((m) => m.archetype === "default")!;

function stripEntry(m: MentorEntry): Mentor {
  const { archetype: _a, domains: _d, levels: _l, archetypes: _ar, ...rest } = m;
  return rest;
}

/**
 * Pick the mentor who has actually made THIS person's move. We score every mentor on three
 * axes and take the best — function (domain) matters most, then seniority band, then the
 * market segment. This is why an SDE-3 lands on a Staff-eng mentor, a Data Scientist on a
 * data/AI leader, and a Director of Product on a product leader, rather than all three on the
 * same generic coach. Falls back to the generalist only when nothing genuinely fits.
 */
export function matchMentor(path: Pick<CareerPath, "archetype" | "salaryFamily"> & { domain?: string }, profile?: Pick<Profile, "domain">): Mentor {
  const wantDomain = path.domain || profile?.domain || "";
  const wantArch = path.archetype || "";
  const wantLevel = (path.salaryFamily || "") as RoleLevel;
  const wantRank = wantLevel ? levelRank(wantLevel) : 2;

  let best: MentorEntry = DEFAULT;
  let bestScore = -1;
  for (const m of MENTORS) {
    if (m.archetype === "default") continue;
    let s = 0;
    // Function fit dominates — a domain match is the single strongest signal, and a mentor whose
    // PRIMARY (first-listed) function is this domain beats one who merely also covers it. This is
    // why a Data Scientist lands on the Head of Data Science, not a PM who happens to know data.
    if (wantDomain && m.domains.some((d) => sameDomain(d, wantDomain))) {
      s += 6;
      if (sameDomain(m.domains[0], wantDomain)) s += 4;
    }
    // Seniority band: in-band is best, one level off still useful, far off penalised.
    if (m.levels.length) {
      const dist = Math.min(...m.levels.map((l) => Math.abs(levelRank(l) - wantRank)));
      s += dist === 0 ? 4 : dist === 1 ? 2 : dist === 2 ? 0 : -3;
    }
    // Market segment: exact archetype, then any archetype they know.
    if (wantArch && m.archetype === wantArch) s += 4;
    else if (wantArch && m.archetypes.includes(wantArch)) s += 2;

    if (s > bestScore) { bestScore = s; best = m; }
  }
  // If even the best mentor has no real signal (no domain + no archetype overlap), use the
  // honest generalist rather than pretending a random specialist made this exact move.
  if (bestScore < 2) best = DEFAULT;
  return stripEntry(best);
}

// "AI Products" (profile.domain free-text) should still match the "Data & AI" catalog domain, etc.
function sameDomain(a: string, b: string): boolean {
  const na = a.toLowerCase(), nb = b.toLowerCase();
  if (na === nb) return true;
  const ai = (s: string) => /\bai\b|\bml\b|data|machine learning/.test(s);
  if (ai(na) && ai(nb)) return true;
  // token overlap (e.g. "Growth" ~ "Growth & GTM")
  const ta = new Set(na.split(/[^a-z]+/).filter((w) => w.length > 2));
  const tb = nb.split(/[^a-z]+/).filter((w) => w.length > 2);
  return tb.some((w) => ta.has(w));
}

// Back-compat shim: older callers that only have an archetype string still work.
export function mentorForArchetype(archetype: string): Mentor {
  return matchMentor({ archetype, salaryFamily: "" });
}
