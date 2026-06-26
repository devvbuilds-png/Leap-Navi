import type { Job } from "../lib/types";

// "Jobs" tab feed — matched openings per archetype. Live-feeling, researched comp ranges
// (India 2025-26). In prod this is a real ATS/aggregator feed filtered to the user's target.
export const JOBS: Job[] = [
  // quick-commerce
  { id: "j-zepto-dir", title: "Director of Product — Commerce", company: "Zepto", archetype: "quick-commerce", location: "Bangalore", comp: "₹90L–₹1.4Cr", posted: "2d ago", mustHaves: ["Demand forecasting", "OMS/IMS ownership", "P&L"] },
  { id: "j-instamart-head", title: "Head of Product — Instamart", company: "Swiggy", archetype: "quick-commerce", location: "Bangalore", comp: "₹1.1Cr–₹1.8Cr", posted: "5d ago", mustHaves: ["Q-commerce ops", "Pricing", "Team leadership"] },
  { id: "j-blinkit-ppm", title: "Principal PM — Q-Commerce", company: "Blinkit", archetype: "quick-commerce", location: "Gurgaon", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["Catalog", "Supply ops", "Experimentation"] },
  // consumer
  { id: "j-meesho-vp", title: "VP Product — Monetisation", company: "Meesho", archetype: "consumer", location: "Bangalore", comp: "₹1.2Cr–₹2.2Cr", posted: "3d ago", mustHaves: ["Tier 2/3 intuition", "Ads/monetisation", "Growth loops"] },
  { id: "j-cred-spm", title: "Senior PM — Growth", company: "CRED", archetype: "consumer", location: "Bangalore", comp: "₹50L–₹80L", posted: "4d ago", mustHaves: ["Retention", "Funnel craft", "A/B testing"] },
  { id: "j-flipkart-dir", title: "Director Product — Marketplace", company: "Flipkart", archetype: "consumer", location: "Bangalore", comp: "₹85L–₹1.3Cr", posted: "6d ago", mustHaves: ["Marketplace", "Seller ecosystem", "P&L"] },
  // b2b-saas
  { id: "j-razorpay-dir", title: "Director Product — Platform", company: "Razorpay", archetype: "b2b-saas", location: "Bangalore", comp: "₹80L–₹1.2Cr", posted: "1d ago", mustHaves: ["Platform thinking", "API products", "Enterprise GTM"] },
  { id: "j-postman-gpm", title: "Group PM — Developer Experience", company: "Postman", archetype: "b2b-saas", location: "Remote", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["Dev-facing product", "DX", "Technical depth"] },
  { id: "j-whatfix-dir", title: "Director Product", company: "Whatfix", archetype: "b2b-saas", location: "Bangalore", comp: "₹65L–₹95L", posted: "2w ago", mustHaves: ["Enterprise SaaS", "Onboarding", "Platform"] },
  // fintech
  { id: "j-phonepe-ppm", title: "Principal PM — Commerce", company: "PhonePe", archetype: "fintech", location: "Bangalore", comp: "₹75L–₹1.1Cr", posted: "3d ago", mustHaves: ["Consumer scale", "Commerce", "Payments"] },
  { id: "j-jupiter-head", title: "Head of Growth Product", company: "Jupiter", archetype: "fintech", location: "Bangalore", comp: "₹60L–₹90L", posted: "5d ago", mustHaves: ["Growth loops", "Retention", "Fintech"] },
  // ai-infra
  { id: "j-sarvam-founding", title: "Founding Product Lead", company: "Sarvam AI", archetype: "ai-infra", location: "Bangalore", comp: "₹50L–₹80L + equity", posted: "1d ago", mustHaves: ["0→1", "AI/agents", "Dev-facing design"] },
  { id: "j-fractal-dir", title: "Director — AI Products", company: "Fractal / Eka", archetype: "ai-infra", location: "Mumbai", comp: "₹70L–₹1.1Cr", posted: "1w ago", mustHaves: ["Enterprise AI", "Workflow automation", "ML products"] },
  { id: "j-dust-founding", title: "Founding PM — India", company: "Dust", archetype: "ai-infra", location: "Remote", comp: "₹60L–₹95L + equity", posted: "4d ago", mustHaves: ["Agentic workflows", "Builder-operator", "Enterprise"] },
  // edtech
  { id: "j-eruditus-vp", title: "VP Product", company: "Eruditus", archetype: "edtech", location: "Mumbai", comp: "₹1Cr–₹1.6Cr", posted: "1w ago", mustHaves: ["Monetise learning", "Global scale", "Leadership"] },
  { id: "j-leap-dir", title: "Director Product — Growth", company: "Leap", archetype: "edtech", location: "Bangalore", comp: "₹70L–₹1Cr", posted: "2d ago", mustHaves: ["Outcomes→monetisation", "Growth", "Financing products"] },
];

export function jobsForArchetypes(archetypes: string[], limit = 8): Job[] {
  const ranked = JOBS.filter((j) => archetypes.includes(j.archetype));
  const rest = JOBS.filter((j) => !archetypes.includes(j.archetype));
  return [...ranked, ...rest].slice(0, limit);
}
