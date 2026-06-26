import type { Mentor } from "../lib/types";

// Credible, named, *matched* experts (Rec #8) — the opposite of two faceless photos.
// Each has made the exact move the user is considering, with a relevant credential.
export const MENTORS: (Mentor & { archetype: string })[] = [
  { archetype: "quick-commerce", name: "Rohan Mehta", initials: "RM", role: "ex-VP Product, Meesho · made the Director → VP Commerce switch in 2022",
    match: "Tier 2/3 commerce + 0→1 builder background",
    gets: ["An honest read on whether your target salary is realistic", "The 2 gaps that actually block VP offers", "3 warm intros to commerce companies hiring now"], slot: "Thu 6:00 PM" },
  { archetype: "ai-infra", name: "Aditi Rao", initials: "AR", role: "Founding PM → VP Product at an AI-infra startup · shipped agentic products",
    match: "MCP / agent builders shipping with Claude Code",
    gets: ["Whether to join vs. found in AI infra right now", "How to position a builder-operator profile", "Intros to 2 Series-A AI teams"], slot: "Sat 11:00 AM" },
  { archetype: "b2b-saas", name: "Vikram Nair", initials: "VN", role: "ex-Director Product, Razorpay · scaled platform ARR 5×",
    match: "PLG → enterprise SaaS operators",
    gets: ["How to tell the platform story recruiters want", "Which enterprise gaps to close first", "Intros to 2 SaaS teams hiring directors"], slot: "Wed 7:30 PM" },
  { archetype: "fintech", name: "Sneha Iyer", initials: "SI", role: "Head of Product, consumer fintech · 100M+ user products",
    match: "consumer fintech growth + retention leaders",
    gets: ["A frank read on your growth narrative", "The metrics that get you to Head-of level", "2 warm intros in fintech"], slot: "Tue 8:00 PM" },
  { archetype: "consumer", name: "Arjun Desai", initials: "AD", role: "VP Product at a consumer unicorn · led monetisation 0→₹500Cr",
    match: "mass-market consumer + monetisation",
    gets: ["Is your target level realistic in 6 months?", "The monetisation proof points to build", "Intros to 2 consumer teams"], slot: "Fri 6:30 PM" },
  { archetype: "edtech", name: "Priya Menon", initials: "PM", role: "ex-VP Product, Eruditus · scaled learning products globally",
    match: "edtech product leaders monetising outcomes",
    gets: ["How to connect outcomes to revenue", "Positioning for a VP move", "Intros to 2 edtech teams"], slot: "Mon 7:00 PM" },
  { archetype: "default", name: "Kabir Shah", initials: "KS", role: "Product leader · coached 40+ PMs into Director/VP roles",
    match: "senior IC → leadership transitions",
    gets: ["A frank read on your readiness", "The narrative that gets you shortlisted", "A 30-day action plan"], slot: "Tomorrow 7:00 PM" },
];

export function mentorForArchetype(archetype: string): Mentor {
  const m = MENTORS.find((x) => x.archetype === archetype) ?? MENTORS.find((x) => x.archetype === "default")!;
  const { archetype: _a, ...rest } = m;
  return rest;
}
