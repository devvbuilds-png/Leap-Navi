// Shared types for Navi+

export interface ResumeRole {
  title: string;
  company: string;
  start?: string;      // "MMM YYYY"
  end?: string;        // "MMM YYYY" | "Present"
  startMonths?: number; // months since epoch-ish, for reconciliation
  endMonths?: number;
  bullets: string[];
}

export interface Profile {
  name: string;
  headlineTitle: string;
  headlineCompany: string;
  city: string;
  totalMonths: number;     // RECONCILED total experience (never sums overlaps)
  totalYearsLabel: string; // "14 yr 9 mo"
  seniority: Seniority;
  domain: string;          // best-guess domain, e.g. "Commerce & Ops"
  skills: string[];
  metrics: string[];       // notable quantified wins pulled from bullets
  roles: ResumeRole[];
  reconciledNote?: string; // what we fixed (overlaps), shown transparently — NOT a scary gap modal
  rawTextLen: number;
}

export type Seniority = "grad" | "early" | "mid" | "senior" | "leader";

export interface Answers {
  goal?: "earn" | "switch" | "grow" | "explore"; // the clear, primary driver (new intake)
  priorities?: string[];  // what matters most (multi-select): pay, growth, balance, impact, security, learning
  risk?: "safe" | "balanced" | "bold"; // appetite for a leap (segmented)
  intent?: string;        // grow / adjacent / switch / self / unsure (legacy)
  keep?: string[];        // what they want to keep doing
  stop?: string[];        // what they'd stop
  goodDay?: string;       // free text
  profileNote?: string;   // context the résumé misses, optionally dictated by voice
  knownRole?: string;     // if user already knows their target (Rec #4)
  upskillMode?: "while-working" | "masters";
  company?: "stay" | "leave";
  timeline?: "3-4" | "6-8" | "12+";
  budget?: "free" | "<1L" | "1-5L" | "5-8L+";
  workMode?: "remote" | "hybrid" | "office";
  currentCTC?: number;    // LPA
  expectedCTC?: number;   // LPA
}

export interface SkillItem { name: string; havePct: number; closesWith?: string; }

export interface CareerPath {
  id: string;
  title: string;
  archetype: string;
  bestMatch: boolean;
  matchPct: number;              // grounded fit score shown on the card / deep dive
  fit: string[];                 // why you're a fit (bullets)
  whatItDoes: string[];          // "what this role actually does" (deep dive)
  dayToDay?: string[];           // a typical day in this role (compare)
  life?: string;                 // what your life would look like (compare)
  levelStep?: number;            // how many levels above current (how-far)
  skillsHave: string[];
  skillsBuild: SkillItem[];
  salaryFamily: string;
  band: { low: number; median: number; high: number }; // researched comp range
  compare?: { pay: string; time: string; gap: string; risk: string };
}

// A live-feeling matched opening (Jobs tab).
export interface Job {
  id: string;
  title: string;
  company: string;
  archetype: string;
  location: string;
  comp: string;          // e.g. "₹90L–₹1.4Cr"
  posted: string;        // e.g. "2d ago"
  mustHaves: string[];
  matchPct?: number;     // filled per-user
}

// Role deep dive (matches Navi's accordion: what / why-ready / learn / companies).
export interface DeepDive {
  pathId: string;
  title: string;
  whatItDoes: string[];
  strengths: string[];           // current strengths that already count toward this role
  whyReady: { matchPct: number; bullets: string[] };
  learn: { gap: SkillItem[]; courses: import("../data/courses").Course[]; certs: number };
  companies: CompanyFit[];
}

export interface OutcomeMath {
  currentLPA: number;
  medianLPA: number;
  lowLPA: number;
  highLPA: number;
  upliftPct: number;
  probabilityPct: number;        // odds of reaching target within timeline
  timelineLabel: string;
  upskillCostLPA: string;        // e.g. "₹3.2L"
  stay3yr: string;               // "₹60L → ₹74L"
  switch3yr: string;             // "₹60L → ₹1.1Cr"
  basis: string;                 // transparency: how it was derived
}

export interface HabitTask { text: string; pct: number; done?: boolean; }
export interface RoadmapPhase { name: string; weeks: string; tasks: HabitTask[]; }

export interface CompanyFit { name: string; stage: string; archetype: string; why: string; hiringFor: string; }

export interface Mentor {
  name: string; initials: string; role: string; match: string; gets: string[]; slot: string;
}

export type OfferKind = "courses" | "resume" | "mentor" | "mba";
export interface Offer {
  kind: OfferKind;
  emoji: string;
  title: string;
  desc: string;
  cta: string;
  primary: boolean;
  highlightMBA?: boolean;
}

export interface AnalyzeResult {
  paths: CareerPath[];
  tension: string;        // the named tension shown before paths (Rec: name a tension)
}

export interface PlanResult {
  outcome: OutcomeMath;
  gap: SkillItem[];
  roadmap: RoadmapPhase[];
  companies: CompanyFit[];
  jobs: Job[];
  mentor: Mentor;
  offers: Offer[];
}

// Expected-CTC realism guidance (Rec #1 reframe): helpful range, never only a blocking error.
export interface CtcGuidance {
  ok: boolean;            // within realistic range
  realisticMax: number;   // LPA
  median: number;
  low: number;
  note: string;
}
