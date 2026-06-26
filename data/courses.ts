// Course catalogue mapped to the exact skill-gap each one closes (Rec #6).
// Mix of free + paid, Leap / Unacademy-styled, with hours + level. Fuzzy-matched to gaps.
export interface Course {
  skill: string;     // the gap it closes (matched fuzzily)
  title: string;
  provider: string;
  hours: number;
  free: boolean;
  level: "Foundational" | "Intermediate" | "Advanced";
  blurb: string;
}

export const COURSES: Course[] = [
  { skill: "Quick-commerce ops", title: "Q-Commerce Operations & Unit Economics", provider: "Unacademy", hours: 8, free: false, level: "Advanced", blurb: "Dark stores, batching, and the unit economics that make 10-min delivery work." },
  { skill: "Vendor negotiation", title: "Supply-Side Negotiation for PMs", provider: "Unacademy", hours: 5, free: true, level: "Intermediate", blurb: "Frameworks for negotiating with vendors and supply partners at scale." },
  { skill: "Growth loops at scale", title: "Retention & Growth Loops Masterclass", provider: "Unacademy", hours: 6, free: false, level: "Advanced", blurb: "Build compounding loops instead of leaky funnels; instrument and iterate." },
  { skill: "Enterprise sales motion", title: "PLG → Enterprise Sales for Founders", provider: "Unacademy", hours: 7, free: false, level: "Advanced", blurb: "Move from self-serve to landing six-figure enterprise contracts." },
  { skill: "Fundraising narrative", title: "Pitch & Fundraising Storytelling", provider: "Leap", hours: 4, free: true, level: "Intermediate", blurb: "Craft the narrative and deck that gets a seed/Series-A term sheet." },
  { skill: "P&L ownership", title: "P&L Ownership for Product Leaders", provider: "Unacademy", hours: 6, free: false, level: "Advanced", blurb: "Own revenue, margin, and trade-offs like a GM — not just a feature backlog." },
  { skill: "AI product strategy", title: "Building AI-Native Products", provider: "Leap", hours: 9, free: false, level: "Advanced", blurb: "From eval-driven design to shipping agentic features users trust." },
  { skill: "Org design", title: "Scaling Product Orgs 10→50", provider: "Unacademy", hours: 5, free: true, level: "Advanced", blurb: "Team topology, rituals, and hiring as you scale a product org." },
  { skill: "Developer-facing product design", title: "Designing Products Developers Love", provider: "Unacademy", hours: 6, free: false, level: "Intermediate", blurb: "DX, docs, and API ergonomics for dev-tool and infra PMs." },
  { skill: "RAG / LLM evals", title: "LLMOps & Evals for PMs", provider: "Leap", hours: 7, free: false, level: "Advanced", blurb: "Retrieval, evals, guardrails — how to ship LLM features that don't regress." },
  { skill: "Data-led pricing", title: "Pricing & Monetisation with Data", provider: "Unacademy", hours: 5, free: false, level: "Intermediate", blurb: "Willingness-to-pay, packaging, and experiments that move ARPU." },
  { skill: "Stakeholder leadership", title: "Influence Without Authority", provider: "Unacademy", hours: 4, free: true, level: "Intermediate", blurb: "Align execs and cross-functional partners around a single bet." },
  { skill: "Consumer growth", title: "Consumer Growth at Scale", provider: "Unacademy", hours: 6, free: false, level: "Advanced", blurb: "Acquisition, activation, and retention loops for mass-market India." },
  { skill: "Platform thinking", title: "Platform & API Product Strategy", provider: "Leap", hours: 5, free: false, level: "Advanced", blurb: "Designing for ecosystems, extensibility, and developer adoption." },
  { skill: "Executive communication", title: "Executive Communication for Leaders", provider: "Unacademy", hours: 3, free: true, level: "Intermediate", blurb: "Crisp written and verbal comms for board, exec, and big-room moments." },
];

// Fuzzy match: exact, then keyword overlap.
export function courseFor(skill: string): Course | undefined {
  const s = skill.toLowerCase();
  const exact = COURSES.find((c) => c.skill.toLowerCase() === s);
  if (exact) return exact;
  const words = s.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  let best: Course | undefined;
  let bestScore = 0;
  for (const c of COURSES) {
    const hay = (c.skill + " " + c.title + " " + c.blurb).toLowerCase();
    const score = words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = c; }
  }
  return bestScore > 0 ? best : undefined;
}
