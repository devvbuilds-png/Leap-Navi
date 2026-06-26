import type { Job, Profile, CareerPath } from "../lib/types";
import { levelRank, type RoleLevel } from "./roles";

// "Jobs you fit" feed — matched openings. Live-feeling, researched comp ranges (India 2025-26).
// In prod this is a real ATS/aggregator feed filtered + ranked to the user's target. Each opening
// carries a `domain` (function) and `level` so we can score real fit, not just archetype membership.
export const JOBS: (Job & { domain: string; level: RoleLevel })[] = [
  // ---- Product · quick-commerce ----------------------------------------------------------
  { id: "j-zepto-dir", title: "Director of Product — Commerce", company: "Zepto", archetype: "quick-commerce", domain: "Product", level: "director", location: "Bangalore", comp: "₹90L–₹1.4Cr", posted: "2d ago", mustHaves: ["Demand forecasting", "OMS/IMS ownership", "P&L"] },
  { id: "j-instamart-head", title: "Head of Product — Instamart", company: "Swiggy", archetype: "quick-commerce", domain: "Product", level: "vp", location: "Bangalore", comp: "₹1.1Cr–₹1.8Cr", posted: "5d ago", mustHaves: ["Q-commerce ops", "Pricing", "Team leadership"] },
  { id: "j-blinkit-ppm", title: "Principal PM — Q-Commerce", company: "Blinkit", archetype: "quick-commerce", domain: "Product", level: "lead", location: "Gurgaon", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["Catalog", "Supply ops", "Experimentation"] },
  // ---- Product · consumer ----------------------------------------------------------------
  { id: "j-meesho-vp", title: "VP Product — Monetisation", company: "Meesho", archetype: "consumer", domain: "Product", level: "vp", location: "Bangalore", comp: "₹1.2Cr–₹2.2Cr", posted: "3d ago", mustHaves: ["Tier 2/3 intuition", "Ads/monetisation", "Growth loops"] },
  { id: "j-cred-spm", title: "Senior PM — Growth", company: "CRED", archetype: "consumer", domain: "Product", level: "senior", location: "Bangalore", comp: "₹50L–₹80L", posted: "4d ago", mustHaves: ["Retention", "Funnel craft", "A/B testing"] },
  { id: "j-flipkart-dir", title: "Director Product — Marketplace", company: "Flipkart", archetype: "consumer", domain: "Product", level: "director", location: "Bangalore", comp: "₹85L–₹1.3Cr", posted: "6d ago", mustHaves: ["Marketplace", "Seller ecosystem", "P&L"] },
  // ---- Product · b2b-saas ----------------------------------------------------------------
  { id: "j-razorpay-dir", title: "Director Product — Platform", company: "Razorpay", archetype: "b2b-saas", domain: "Product", level: "director", location: "Bangalore", comp: "₹80L–₹1.2Cr", posted: "1d ago", mustHaves: ["Platform thinking", "API products", "Enterprise GTM"] },
  { id: "j-postman-gpm", title: "Group PM — Developer Experience", company: "Postman", archetype: "b2b-saas", domain: "Product", level: "lead", location: "Remote", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["Dev-facing product", "DX", "Technical depth"] },
  { id: "j-whatfix-dir", title: "Director Product", company: "Whatfix", archetype: "b2b-saas", domain: "Product", level: "director", location: "Bangalore", comp: "₹65L–₹95L", posted: "2w ago", mustHaves: ["Enterprise SaaS", "Onboarding", "Platform"] },
  // ---- Product · fintech -----------------------------------------------------------------
  { id: "j-phonepe-ppm", title: "Principal PM — Commerce", company: "PhonePe", archetype: "fintech", domain: "Product", level: "lead", location: "Bangalore", comp: "₹75L–₹1.1Cr", posted: "3d ago", mustHaves: ["Consumer scale", "Commerce", "Payments"] },
  { id: "j-jupiter-head", title: "Head of Growth Product", company: "Jupiter", archetype: "fintech", domain: "Product", level: "director", location: "Bangalore", comp: "₹60L–₹90L", posted: "5d ago", mustHaves: ["Growth loops", "Retention", "Fintech"] },
  // ---- Product · ai-infra ----------------------------------------------------------------
  { id: "j-sarvam-founding", title: "Founding Product Lead", company: "Sarvam AI", archetype: "ai-infra", domain: "Product", level: "lead", location: "Bangalore", comp: "₹50L–₹80L + equity", posted: "1d ago", mustHaves: ["0→1", "AI/agents", "Dev-facing design"] },
  { id: "j-fractal-dir", title: "Director — AI Products", company: "Fractal / Eka", archetype: "ai-infra", domain: "Product", level: "director", location: "Mumbai", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["Enterprise AI", "Workflow automation", "ML products"] },
  { id: "j-dust-founding", title: "Founding PM — India", company: "Dust", archetype: "ai-infra", domain: "Product", level: "lead", location: "Remote", comp: "₹60L–₹95L + equity", posted: "4d ago", mustHaves: ["Agentic workflows", "Builder-operator", "Enterprise"] },
  // ---- Product · edtech ------------------------------------------------------------------
  { id: "j-eruditus-vp", title: "VP Product", company: "Eruditus", archetype: "edtech", domain: "Product", level: "vp", location: "Mumbai", comp: "₹1Cr–₹1.6Cr", posted: "1w ago", mustHaves: ["Monetise learning", "Global scale", "Leadership"] },
  { id: "j-leap-dir", title: "Director Product — Growth", company: "Leap", archetype: "edtech", domain: "Product", level: "director", location: "Bangalore", comp: "₹70L–₹1Cr", posted: "2d ago", mustHaves: ["Outcomes→monetisation", "Growth", "Financing products"] },

  // ---- Engineering -----------------------------------------------------------------------
  { id: "j-flipkart-sde3", title: "Senior Software Engineer (SDE-3)", company: "Flipkart", archetype: "consumer", domain: "Engineering", level: "senior", location: "Bangalore", comp: "₹55L–₹85L", posted: "2d ago", mustHaves: ["Distributed systems", "Java/Go", "System design", "High-scale backend"] },
  { id: "j-razorpay-staff", title: "Staff Engineer — Payments", company: "Razorpay", archetype: "fintech", domain: "Engineering", level: "lead", location: "Bangalore", comp: "₹80L–₹1.2Cr", posted: "4d ago", mustHaves: ["System design", "Payments infra", "Reliability", "Technical leadership"] },
  { id: "j-phonepe-em", title: "Engineering Manager", company: "PhonePe", archetype: "fintech", domain: "Engineering", level: "lead", location: "Bangalore", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["People management", "Delivery ownership", "System design", "Hiring"] },
  { id: "j-cred-dir-eng", title: "Director of Engineering", company: "CRED", archetype: "consumer", domain: "Engineering", level: "director", location: "Bangalore", comp: "₹1.1Cr–₹1.7Cr", posted: "1w ago", mustHaves: ["Org scaling", "Architecture", "Cross-team delivery", "Engineering leadership"] },
  { id: "j-postman-sre", title: "Senior SRE / Platform Engineer", company: "Postman", archetype: "b2b-saas", domain: "Engineering", level: "senior", location: "Remote", comp: "₹45L–₹75L", posted: "5d ago", mustHaves: ["Kubernetes", "Observability", "CI/CD", "Cloud infra"] },

  // ---- Data & AI -------------------------------------------------------------------------
  { id: "j-swiggy-sds", title: "Senior Data Scientist", company: "Swiggy", archetype: "consumer", domain: "Data & AI", level: "senior", location: "Bangalore", comp: "₹40L–₹65L", posted: "3d ago", mustHaves: ["ML modeling", "Python", "Experimentation", "Causal inference"] },
  { id: "j-sarvam-mle", title: "ML Engineer — LLMs", company: "Sarvam AI", archetype: "ai-infra", domain: "Data & AI", level: "senior", location: "Bangalore", comp: "₹50L–₹90L + equity", posted: "2d ago", mustHaves: ["LLM fine-tuning", "PyTorch", "Inference optimisation", "MLOps"] },
  { id: "j-fractal-dshead", title: "Head of Data Science", company: "Fractal", archetype: "ai-infra", domain: "Data & AI", level: "director", location: "Mumbai", comp: "₹90L–₹1.4Cr", posted: "1w ago", mustHaves: ["DS leadership", "Stakeholder management", "ML strategy", "Team building"] },
  { id: "j-cred-analyst", title: "Senior Data Analyst", company: "CRED", archetype: "consumer", domain: "Data & AI", level: "mid", location: "Bangalore", comp: "₹25L–₹45L", posted: "6d ago", mustHaves: ["SQL", "Dashboarding", "Product analytics", "A/B testing"] },

  // ---- Design ----------------------------------------------------------------------------
  { id: "j-cred-design-lead", title: "Design Lead — Product", company: "CRED", archetype: "consumer", domain: "Design", level: "lead", location: "Bangalore", comp: "₹50L–₹80L", posted: "4d ago", mustHaves: ["Design systems", "Interaction design", "Craft leadership", "Figma"] },
  { id: "j-razorpay-sr-designer", title: "Senior Product Designer", company: "Razorpay", archetype: "b2b-saas", domain: "Design", level: "senior", location: "Bangalore", comp: "₹30L–₹55L", posted: "1w ago", mustHaves: ["Complex flows", "Prototyping", "User research", "Design systems"] },

  // ---- Business & Ops / Strategy / Consulting --------------------------------------------
  { id: "j-meesho-strategy", title: "Director — Strategy & BizOps", company: "Meesho", archetype: "consumer", domain: "Business & Ops", level: "director", location: "Bangalore", comp: "₹70L–₹1.1Cr", posted: "3d ago", mustHaves: ["P&L ownership", "Strategy", "Cross-functional leadership", "Analytics"] },
  { id: "j-swiggy-cos", title: "Chief of Staff — CEO Office", company: "Swiggy", archetype: "consumer", domain: "Business & Ops", level: "director", location: "Bangalore", comp: "₹60L–₹1Cr", posted: "1w ago", mustHaves: ["Executive communication", "Strategy", "Operating cadence", "Stakeholder management"] },
  { id: "j-leap-gm", title: "General Manager — New Business", company: "Leap", archetype: "edtech", domain: "Business & Ops", level: "director", location: "Bangalore", comp: "₹65L–₹95L", posted: "2d ago", mustHaves: ["P&L ownership", "0→1 building", "GTM", "Team leadership"] },

  // ---- Growth & GTM ----------------------------------------------------------------------
  { id: "j-cred-growth-head", title: "Head of Growth", company: "CRED", archetype: "consumer", domain: "Growth & GTM", level: "director", location: "Bangalore", comp: "₹70L–₹1.1Cr", posted: "2d ago", mustHaves: ["Growth loops", "Paid + organic", "Retention", "Growth P&L"] },
  { id: "j-jupiter-perf", title: "Director — Performance Marketing", company: "Jupiter", archetype: "fintech", domain: "Growth & GTM", level: "director", location: "Bangalore", comp: "₹55L–₹85L", posted: "5d ago", mustHaves: ["Paid acquisition", "Attribution", "CAC/LTV", "Funnel optimisation"] },

  // ---- Healthtech ------------------------------------------------------------------------
  { id: "j-practo-dir", title: "Director of Product — Care", company: "Practo", archetype: "healthtech", domain: "Product", level: "director", location: "Bangalore", comp: "₹60L–₹95L", posted: "1w ago", mustHaves: ["Regulated product", "Clinical workflows", "Trust & safety", "Consumer health"] },
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const STOP = new Set(["and", "the", "for", "with", "to", "of", "a", "in", "on", "at", "ops", "product", "senior", "systems", "design", "data"]);
function toks(s: string): string[] { return norm(s).split(" ").filter((t) => t.length >= 3 && !STOP.has(t)); }

// Does any of the person's skills/wins cover this must-have? (phrase containment OR token overlap)
function covered(must: string, haveText: string[], haveTokens: Set<string>): boolean {
  const mn = norm(must);
  if (haveText.some((h) => h && (mn.includes(h) || h.includes(mn)))) return true;
  return toks(must).some((t) => haveTokens.has(t));
}

/**
 * Rank EVERY opening by real fit, not archetype membership. Score blends:
 *   - must-have coverage (how many of the JD's must-haves the person can already evidence)
 *   - function (domain) alignment with the chosen path
 *   - seniority proximity (a senior IC shouldn't see a VP req as a 90% fit)
 *   - market-segment (archetype) bonus
 * Returns the top `limit`, each stamped with a per-job matchPct, a why-fit reason, and the one
 * must-have they'd most need to shore up. This is what makes "Jobs you fit" actually fit.
 */
export function scoreJobsForPath(profile: Profile, path: Pick<CareerPath, "archetype" | "domain" | "salaryFamily" | "skillsHave">, limit = 8): Job[] {
  const haveText = [...profile.skills, ...profile.metrics].map(norm);
  const haveTokens = new Set([...profile.skills, ...profile.metrics, ...(path.skillsHave || [])].flatMap((s) => toks(s)));
  const wantDomain = path.domain || profile.domain || "";
  const wantArch = path.archetype || "";
  const wantRank = path.salaryFamily ? levelRank(path.salaryFamily as RoleLevel) : 3;

  const scored = JOBS.map((j) => {
    const matched = j.mustHaves.filter((m) => covered(m, haveText, haveTokens));
    const missing = j.mustHaves.filter((m) => !covered(m, haveText, haveTokens));
    const coverage = j.mustHaves.length ? matched.length / j.mustHaves.length : 0.5;

    const domainMatch = wantDomain && sameDomain(j.domain, wantDomain);
    const levelDist = Math.abs(levelRank(j.level) - wantRank);

    let s = coverage * 50;                                   // skill coverage dominates
    s += domainMatch ? 20 : -8;                              // same function vs. off-function
    s += levelDist === 0 ? 12 : levelDist === 1 ? 6 : levelDist === 2 ? -4 : -16;
    if (j.archetype === wantArch) s += 8;                    // exact market segment
    if (levelRank(j.level) < wantRank - 1) s -= 10;          // don't surface clear step-downs high

    // matchPct: keep it honest (52..96) and tied to coverage + alignment. Off-function openings
    // are penalised hard so an Engineering req never reads as a 70% fit for a Designer.
    const matchPct = Math.max(52, Math.min(96, Math.round(58 + coverage * 30 + (domainMatch ? 6 : -16) + (levelDist === 0 ? 4 : levelDist === 1 ? 0 : -6))));

    const fitReason = matched.length
      ? `Your ${matched.slice(0, 2).join(" + ")} maps to what they need`
      : domainMatch ? `Same ${j.domain} track, right level` : `Adjacent move worth a look`;
    const topGap = missing[0];

    const job: Job = {
      id: j.id, title: j.title, company: j.company, archetype: j.archetype, domain: j.domain, level: j.level,
      location: j.location, comp: j.comp, posted: j.posted, mustHaves: j.mustHaves, matchPct, fitReason, topGap,
    };
    return { job, s };
  });

  // Select the strongest set by score (level + function aware), then present them in headline-%
  // order so the list reads consistently with the badge each card shows.
  scored.sort((a, b) => b.s - a.s);
  return scored.slice(0, limit).map((x) => x.job).sort((a, b) => (b.matchPct || 0) - (a.matchPct || 0));
}

function sameDomain(a: string, b: string): boolean {
  const na = a.toLowerCase(), nb = b.toLowerCase();
  if (na === nb) return true;
  const ai = (s: string) => /\bai\b|\bml\b|data|machine learning/.test(s);
  if (ai(na) && ai(nb)) return true;
  const ta = new Set(na.split(/[^a-z]+/).filter((w) => w.length > 2));
  return nb.split(/[^a-z]+/).filter((w) => w.length > 2).some((w) => ta.has(w));
}

// Back-compat: archetype-only feed (used when we have no profile, e.g. a bare archetype request).
export function jobsForArchetypes(archetypes: string[], limit = 8): Job[] {
  const ranked = JOBS.filter((j) => archetypes.includes(j.archetype));
  const rest = JOBS.filter((j) => !archetypes.includes(j.archetype));
  return [...ranked, ...rest].slice(0, limit).map((j) => ({ ...j }));
}
