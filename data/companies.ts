import type { CompanyFit } from "../lib/types";

// Researched "who you fit" knowledge base. In prod this lives in the DB (seeded from here).
// Archetypes: quick-commerce · consumer · b2b-saas · fintech · ai-infra · edtech · healthtech
export const COMPANIES: CompanyFit[] = [
  // quick-commerce
  { name: "Zepto", stage: "Series F", archetype: "quick-commerce", why: "Scaling commerce + ops product; values builders who've owned forecasting & OMS.", hiringFor: "Director/VP Product — Commerce" },
  { name: "Swiggy Instamart", stage: "Public", archetype: "quick-commerce", why: "Deep Bharat ops, real-time pricing & inventory — your demand-forecasting DNA fits.", hiringFor: "Head of Product — Instamart" },
  { name: "Zomato / Blinkit", stage: "Public", archetype: "quick-commerce", why: "10-min delivery at national scale; wants PMs who can own a P&L end-to-end.", hiringFor: "Principal PM — Q-Commerce" },
  { name: "BigBasket", stage: "Tata-owned", archetype: "quick-commerce", why: "Grocery commerce + supply chain; rewards inventory and catalog depth.", hiringFor: "Director Product — Supply" },
  // consumer
  { name: "Meesho", stage: "Pre-IPO", archetype: "consumer", why: "Tier 2/3 commerce at scale; values value-conscious-India product intuition.", hiringFor: "VP Product — Monetisation" },
  { name: "CRED", stage: "Series F", archetype: "consumer", why: "Premium consumer + fintech crossover; rewards craft and growth-loop thinking.", hiringFor: "Senior PM — Growth" },
  { name: "Flipkart", stage: "Walmart-owned", archetype: "consumer", why: "Largest Indian commerce platform; needs full-stack owners across the funnel.", hiringFor: "Director Product — Marketplace" },
  { name: "Groww", stage: "Public", archetype: "consumer", why: "Consumer fintech with mass-market reach; values simplicity and retention.", hiringFor: "Principal PM — Consumer" },
  // b2b-saas
  { name: "Razorpay", stage: "Series F", archetype: "b2b-saas", why: "B2B SaaS scaling ARR fast; rewards 0→1 + GTM operators.", hiringFor: "Director Product — Platform" },
  { name: "Whatfix", stage: "Series E", archetype: "b2b-saas", why: "Enterprise SaaS; rewards platform thinking and end-to-end ownership.", hiringFor: "Director Product" },
  { name: "Postman", stage: "Series D", archetype: "b2b-saas", why: "Developer-facing product at global scale; loves PMs who think in APIs.", hiringFor: "Group PM — Developer Experience" },
  { name: "Atlan", stage: "Series C", archetype: "b2b-saas", why: "Data-collaboration SaaS; wants PMs who can sell a technical narrative.", hiringFor: "Senior PM — Platform" },
  // fintech
  { name: "PhonePe", stage: "Public", archetype: "fintech", why: "Massive consumer scale + commerce ambitions; needs full-stack product owners.", hiringFor: "Principal PM — Commerce" },
  { name: "Jupiter", stage: "Series C", archetype: "fintech", why: "Consumer fintech needing growth-loop + retention product leadership.", hiringFor: "Head of Growth Product" },
  { name: "Setu / Pine Labs", stage: "Series B/Pre-IPO", archetype: "fintech", why: "Fintech infra + payments; rewards API-first, platform PMs.", hiringFor: "Director Product — Infra" },
  // ai-infra
  { name: "Sarvam AI", stage: "Series A", archetype: "ai-infra", why: "AI-native infra for India; ideal for MCP/agent builders who ship.", hiringFor: "Founding Product Lead" },
  { name: "Fractal / Eka", stage: "Series B", archetype: "ai-infra", why: "Enterprise AI workflow automation — AI-Labs experience transfers directly.", hiringFor: "Director — AI Products" },
  { name: "Glean / Dust (India teams)", stage: "Series C", archetype: "ai-infra", why: "Agentic enterprise search + workflows; wants builder-operators.", hiringFor: "Founding PM — India" },
  // edtech
  { name: "Eruditus", stage: "Unicorn", archetype: "edtech", why: "Edtech scaling globally; values product leaders who can monetise learning.", hiringFor: "VP Product" },
  { name: "Leap (Leap Scholar)", stage: "Series D", archetype: "edtech", why: "Study-abroad + financing; rewards PMs who connect outcomes to monetisation.", hiringFor: "Director Product — Growth" },
  // healthtech
  { name: "PharmEasy", stage: "Pre-IPO", archetype: "healthtech", why: "Health commerce + supply chain; values ops-heavy product owners.", hiringFor: "Director Product — Commerce" },
  { name: "Practo", stage: "Series D", archetype: "healthtech", why: "Consumer health platform; rewards retention + marketplace thinking.", hiringFor: "Senior PM — Consumer" },
];

export function companiesForArchetypes(archetypes: string[], limit = 4): CompanyFit[] {
  const ranked = COMPANIES.filter((c) => archetypes.includes(c.archetype));
  const out = ranked.length ? ranked : COMPANIES;
  return out.slice(0, limit);
}
