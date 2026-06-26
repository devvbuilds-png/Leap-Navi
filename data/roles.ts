// AUTO-GENERATED career-role catalogue (India 2025-26), researched by parallel agents.
// 105 roles across Product, Engineering, Data & AI, Design, Growth & GTM, Business & Ops.
// Each role carries CTC bands, skills, and a career-path graph (growth + adjacent roles) so we can
// map a résumé to real, multi-direction next moves. Regenerate via tmp/gen-roles.mjs.

export type RoleLevel = "entry" | "mid" | "senior" | "lead" | "director" | "vp" | "exec";

export interface CareerRole {
  id: string;
  title: string;
  domain: string;
  archetype: string;
  level: RoleLevel;
  description: string;
  ctc: { low: number; median: number; high: number };
  coreSkills: string[];
  niceToHave: string[];
  growthRoles: string[];   // titles this grows INTO
  adjacentRoles: string[]; // realistic side moves (may cross domains)
  topCompanies: string[];
  demand: "high" | "medium" | "niche";
  moneyPotential: "high" | "medium" | "steady";
}

export const ROLES: CareerRole[] = [
  {
    "id": "associate-product-manager",
    "title": "Associate Product Manager",
    "domain": "Product",
    "archetype": "consumer",
    "level": "entry",
    "description": "Supports senior PMs in defining requirements, writing PRDs, and tracking feature delivery. Works closely with engineering and design to ship incremental improvements, owns small feature areas end-to-end.",
    "ctc": {
      "low": 10,
      "median": 16,
      "high": 22
    },
    "coreSkills": [
      "PRD writing",
      "user story mapping",
      "stakeholder communication",
      "basic SQL / data querying",
      "wireframing with Figma",
      "agile ceremonies"
    ],
    "niceToHave": [
      "A/B testing basics",
      "competitive analysis",
      "prior internship in tech or consulting"
    ],
    "growthRoles": [
      "Product Manager",
      "Technical Product Manager"
    ],
    "adjacentRoles": [
      "Business Analyst",
      "UX Researcher",
      "Strategy & Ops Analyst"
    ],
    "topCompanies": [
      "Swiggy",
      "PhonePe",
      "Razorpay",
      "Meesho",
      "Navi",
      "ShareChat",
      "Groww",
      "Cred"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "product-manager",
    "title": "Product Manager",
    "domain": "Product",
    "archetype": "consumer",
    "level": "mid",
    "description": "Owns one or two product areas end-to-end — discovery, roadmap prioritisation, sprint execution, and launch. Translates user problems and business goals into shipped features that move key metrics.",
    "ctc": {
      "low": 22,
      "median": 35,
      "high": 55
    },
    "coreSkills": [
      "product strategy",
      "metrics definition & tracking",
      "SQL / product analytics",
      "cross-functional leadership",
      "user research",
      "roadmap planning",
      "A/B testing"
    ],
    "niceToHave": [
      "growth experimentation",
      "API / technical literacy",
      "competitive intelligence"
    ],
    "growthRoles": [
      "Senior Product Manager",
      "Technical Product Manager",
      "Growth Product Manager"
    ],
    "adjacentRoles": [
      "Product Marketing Manager",
      "Business Development Manager",
      "Solution Engineer"
    ],
    "topCompanies": [
      "Flipkart",
      "Swiggy",
      "Ola",
      "CRED",
      "Razorpay",
      "Zepto",
      "Groww",
      "Zomato"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-product-manager",
    "title": "Senior Product Manager",
    "domain": "Product",
    "archetype": "consumer",
    "level": "senior",
    "description": "Drives a significant product vertical with multiple squads, sets quarterly OKRs, mentors junior PMs, and influences the broader roadmap. Interfaces directly with business heads to align product and revenue goals.",
    "ctc": {
      "low": 40,
      "median": 60,
      "high": 90
    },
    "coreSkills": [
      "strategic roadmapping",
      "OKR setting",
      "stakeholder management (CXO-level)",
      "product analytics (Mixpanel/Amplitude)",
      "go-to-market planning",
      "mentoring",
      "prioritisation frameworks"
    ],
    "niceToHave": [
      "P&L ownership understanding",
      "experimentation platform design",
      "partner/vendor management"
    ],
    "growthRoles": [
      "Group Product Manager",
      "Director of Product",
      "Principal Product Manager"
    ],
    "adjacentRoles": [
      "Senior Program Manager",
      "Head of Strategy",
      "VP Engineering (cross-move)"
    ],
    "topCompanies": [
      "Meesho",
      "PhonePe",
      "Swiggy",
      "Nykaa",
      "Paytm",
      "Juspay",
      "Dunzo",
      "Cashfree"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "group-product-manager",
    "title": "Group Product Manager",
    "domain": "Product",
    "archetype": "consumer",
    "level": "lead",
    "description": "Manages a portfolio of product lines and a team of 3-6 PMs. Sets vision for an entire product surface area, allocates PM resources across squads, and represents product in leadership forums.",
    "ctc": {
      "low": 60,
      "median": 85,
      "high": 130
    },
    "coreSkills": [
      "PM people management",
      "portfolio roadmapping",
      "executive communication",
      "business case building",
      "cross-org alignment",
      "hiring & performance management"
    ],
    "niceToHave": [
      "P&L accountability",
      "platform architecture thinking",
      "board-level storytelling"
    ],
    "growthRoles": [
      "Director of Product",
      "VP of Product"
    ],
    "adjacentRoles": [
      "Senior Director of Engineering",
      "Head of Growth",
      "General Manager – Product"
    ],
    "topCompanies": [
      "Flipkart",
      "Swiggy",
      "Zepto",
      "Razorpay",
      "Juspay",
      "Navi",
      "CRED",
      "Dream11"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "principal-product-manager",
    "title": "Principal Product Manager",
    "domain": "Product",
    "archetype": "b2b-saas",
    "level": "lead",
    "description": "Individual-contributor senior leader who drives the highest-complexity product bets — often platform or cross-cutting — without direct reports. Acts as an internal thought leader and shapes PM craft across the org.",
    "ctc": {
      "low": 55,
      "median": 80,
      "high": 120
    },
    "coreSkills": [
      "deep domain expertise",
      "long-horizon product strategy",
      "systems thinking",
      "influencing without authority",
      "platform design",
      "technical architecture alignment"
    ],
    "niceToHave": [
      "patent / IP familiarity",
      "external conference speaking",
      "open-source community engagement"
    ],
    "growthRoles": [
      "Director of Product",
      "Chief of Staff – Product",
      "VP of Product"
    ],
    "adjacentRoles": [
      "Principal Engineer",
      "Head of Design",
      "Strategy Lead"
    ],
    "topCompanies": [
      "Freshworks",
      "Zoho",
      "Browserstack",
      "Postman",
      "Chargebee",
      "Razorpay",
      "Sarvam AI"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "director-of-product",
    "title": "Director of Product",
    "domain": "Product",
    "archetype": "consumer",
    "level": "director",
    "description": "Owns product strategy for a major business unit, leads a team of Group PMs and Senior PMs, and partners with CTO/CEO on multi-year vision. Responsible for measurable revenue or engagement outcomes at scale.",
    "ctc": {
      "low": 80,
      "median": 110,
      "high": 160
    },
    "coreSkills": [
      "business unit strategy",
      "multi-team PM leadership",
      "financial acumen",
      "executive influencing",
      "product operations design",
      "talent development",
      "OKR cascading"
    ],
    "niceToHave": [
      "M&A / partnership evaluation",
      "board presentation experience",
      "international market expansion"
    ],
    "growthRoles": [
      "VP of Product",
      "Chief Product Officer"
    ],
    "adjacentRoles": [
      "VP Engineering",
      "Chief of Staff to CEO",
      "GM – Business Unit"
    ],
    "topCompanies": [
      "Swiggy",
      "Flipkart",
      "Paytm",
      "Meesho",
      "Ola",
      "InMobi",
      "Freshworks",
      "Nykaa"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "vp-of-product",
    "title": "VP of Product",
    "domain": "Product",
    "archetype": "consumer",
    "level": "vp",
    "description": "Sets the company-wide product vision and strategy across all product lines, owns the overall product roadmap, and leads the entire PM organisation. Key member of the executive leadership team driving growth and monetisation.",
    "ctc": {
      "low": 120,
      "median": 175,
      "high": 280
    },
    "coreSkills": [
      "company-level product vision",
      "org design",
      "capital allocation across product bets",
      "board & investor communication",
      "talent strategy",
      "competitive positioning",
      "revenue growth ownership"
    ],
    "niceToHave": [
      "IPO / fundraise experience",
      "M&A integration",
      "global product launches"
    ],
    "growthRoles": [
      "Chief Product Officer",
      "CEO / Co-founder"
    ],
    "adjacentRoles": [
      "CTO",
      "Chief Revenue Officer",
      "COO"
    ],
    "topCompanies": [
      "Zepto",
      "CRED",
      "Dream11",
      "Razorpay",
      "PhonePe",
      "Navi",
      "BrowserStack",
      "Groww"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "chief-product-officer",
    "title": "Chief Product Officer",
    "domain": "Product",
    "archetype": "consumer",
    "level": "exec",
    "description": "Sits on the C-suite and owns end-to-end product, design, and sometimes data organisations. Defines the multi-year product philosophy, drives product-led growth, and is accountable to the board for product outcomes.",
    "ctc": {
      "low": 180,
      "median": 280,
      "high": 500
    },
    "coreSkills": [
      "product-led growth strategy",
      "C-suite leadership",
      "organisation building",
      "investor relations",
      "product portfolio management",
      "brand & product narrative",
      "M&A due diligence"
    ],
    "niceToHave": [
      "fund-raising storytelling",
      "public market readiness",
      "cross-border product experience"
    ],
    "growthRoles": [
      "CEO / Co-founder",
      "Venture Partner",
      "Board Director"
    ],
    "adjacentRoles": [
      "Chief Technology Officer",
      "Chief Revenue Officer",
      "Managing Director"
    ],
    "topCompanies": [
      "Swiggy",
      "PhonePe",
      "Razorpay",
      "Freshworks",
      "Navi",
      "Meesho",
      "Ola",
      "Urban Company"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "technical-product-manager",
    "title": "Technical Product Manager",
    "domain": "Product",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Bridges engineering and product by defining technical requirements, managing API/platform roadmaps, and collaborating deeply with architects. Owns developer-facing features or infrastructure products that enable other teams to build.",
    "ctc": {
      "low": 28,
      "median": 45,
      "high": 70
    },
    "coreSkills": [
      "API design & documentation",
      "system design fundamentals",
      "SQL & data pipelines",
      "technical PRD writing",
      "developer experience",
      "sprint planning with engineering",
      "incident triage"
    ],
    "niceToHave": [
      "prior SWE experience",
      "cloud infrastructure (AWS/GCP)",
      "open API standards (REST/GraphQL)"
    ],
    "growthRoles": [
      "Senior Technical PM",
      "Principal Product Manager",
      "Director of Platform Product"
    ],
    "adjacentRoles": [
      "Engineering Manager",
      "Solutions Architect",
      "Platform Engineer"
    ],
    "topCompanies": [
      "Razorpay",
      "Juspay",
      "Setu (by Pine Labs)",
      "Cashfree",
      "Zoho",
      "Postman",
      "BrowserStack",
      "Hasura"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "growth-product-manager",
    "title": "Growth Product Manager",
    "domain": "Product",
    "archetype": "quick-commerce",
    "level": "mid",
    "description": "Owns acquisition, activation, retention, and monetisation funnels. Runs rapid experimentation cycles, optimises onboarding flows, referral loops, and lifecycle nudges to drive sustainable user and revenue growth.",
    "ctc": {
      "low": 25,
      "median": 40,
      "high": 65
    },
    "coreSkills": [
      "funnel analytics",
      "A/B & multivariate testing",
      "user segmentation",
      "growth modelling (AARRR)",
      "CRM & lifecycle tools (MoEngage/Clevertap)",
      "SQL",
      "referral & virality mechanics"
    ],
    "niceToHave": [
      "paid acquisition basics",
      "LTV modelling",
      "ML-driven personalisation"
    ],
    "growthRoles": [
      "Senior Growth PM",
      "Head of Growth",
      "Director of Product – Growth"
    ],
    "adjacentRoles": [
      "Growth Marketing Manager",
      "Data Analyst – Growth",
      "Revenue Manager"
    ],
    "topCompanies": [
      "Zepto",
      "Blinkit (Zomato)",
      "Swiggy Instamart",
      "CRED",
      "Groww",
      "Jar",
      "Khatabook",
      "BharatPe"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "platform-product-manager",
    "title": "Platform Product Manager",
    "domain": "Product",
    "archetype": "b2b-saas",
    "level": "senior",
    "description": "Owns shared platform capabilities — identity, payments infra, notification systems, or data platforms — used by multiple product teams. Defines platform SLAs, deprecation policies, and internal developer enablement.",
    "ctc": {
      "low": 38,
      "median": 58,
      "high": 85
    },
    "coreSkills": [
      "platform strategy",
      "internal developer tooling",
      "API lifecycle management",
      "cross-team dependency management",
      "scalability planning",
      "dogfooding frameworks",
      "technical documentation"
    ],
    "niceToHave": [
      "service mesh / microservices understanding",
      "observability tools (Datadog)",
      "open-source strategy"
    ],
    "growthRoles": [
      "Principal PM – Platform",
      "Director of Platform Product",
      "VP Engineering"
    ],
    "adjacentRoles": [
      "Technical Program Manager",
      "Staff Engineer",
      "Solutions Architect"
    ],
    "topCompanies": [
      "Flipkart",
      "Razorpay",
      "Juspay",
      "Freshworks",
      "Zoho",
      "Ola",
      "PayU",
      "MoEngage"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "ai-ml-product-manager",
    "title": "AI / ML Product Manager",
    "domain": "Product",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Defines product requirements and roadmaps for AI/ML-powered features or AI-native products. Works with data scientists and ML engineers to translate model capabilities into user value, handling evaluation frameworks, bias concerns, and responsible AI rollout.",
    "ctc": {
      "low": 45,
      "median": 70,
      "high": 110
    },
    "coreSkills": [
      "ML product lifecycle (data → model → deploy)",
      "prompt engineering basics",
      "model evaluation metrics",
      "AI product ethics & safety",
      "LLM application design",
      "SQL / feature store understanding",
      "user research for AI features"
    ],
    "niceToHave": [
      "Python scripting",
      "MLOps familiarity",
      "generative AI toolchain (LangChain/LlamaIndex)"
    ],
    "growthRoles": [
      "Senior AI PM",
      "Director of AI Products",
      "Head of Product – GenAI"
    ],
    "adjacentRoles": [
      "ML Engineering Manager",
      "Data Science Lead",
      "AI Solutions Architect"
    ],
    "topCompanies": [
      "Sarvam AI",
      "Krutrim",
      "Ola Krutrim",
      "Google DeepMind India",
      "Microsoft India",
      "Freshworks",
      "Juspay",
      "Sprinklr"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "data-product-manager",
    "title": "Data Product Manager",
    "domain": "Product",
    "archetype": "fintech",
    "level": "mid",
    "description": "Owns data products — analytics dashboards, data marketplaces, customer data platforms, or monetised data APIs — ensuring data quality, governance, and business utility. Acts as the bridge between data engineering and business stakeholders.",
    "ctc": {
      "low": 24,
      "median": 38,
      "high": 60
    },
    "coreSkills": [
      "data modelling basics",
      "SQL (advanced)",
      "data governance & cataloguing",
      "BI tools (Metabase/Tableau/Superset)",
      "data pipeline understanding",
      "product analytics",
      "stakeholder requirement gathering"
    ],
    "niceToHave": [
      "dbt / warehouse tooling",
      "data monetisation strategy",
      "privacy-by-design (DPDP Act)"
    ],
    "growthRoles": [
      "Senior Data PM",
      "Head of Data Products",
      "Director of Product – Analytics"
    ],
    "adjacentRoles": [
      "Data Engineering Manager",
      "Analytics Engineer",
      "Business Intelligence Lead"
    ],
    "topCompanies": [
      "PhonePe",
      "Navi",
      "HDFC Bank Tech",
      "BharatPe",
      "Signzy",
      "Setu",
      "Perfios",
      "Karza Technologies"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "product-operations-manager",
    "title": "Product Operations Manager",
    "domain": "Product",
    "archetype": "consumer",
    "level": "mid",
    "description": "Runs the operating system of the product org — sprint rituals, OKR tracking, tooling (Jira/Notion/Confluence), PM onboarding, and cross-functional reporting. Reduces coordination overhead so PMs can focus on strategy and delivery.",
    "ctc": {
      "low": 18,
      "median": 28,
      "high": 42
    },
    "coreSkills": [
      "process design",
      "OKR/KPI dashboards",
      "PM tooling administration",
      "documentation standards",
      "stakeholder reporting",
      "cross-functional facilitation",
      "change management"
    ],
    "niceToHave": [
      "JIRA administration",
      "data visualisation (Looker/Metabase)",
      "scaled agile (SAFe)"
    ],
    "growthRoles": [
      "Senior Product Ops Manager",
      "Head of Product Operations",
      "Chief of Staff – Product"
    ],
    "adjacentRoles": [
      "Business Operations Manager",
      "Program Manager",
      "Scrum Master / Agile Coach"
    ],
    "topCompanies": [
      "Swiggy",
      "Flipkart",
      "Ola",
      "Meesho",
      "Nykaa",
      "Urban Company",
      "Navi",
      "Razorpay"
    ],
    "demand": "medium",
    "moneyPotential": "medium"
  },
  {
    "id": "senior-program-manager",
    "title": "Senior Program Manager",
    "domain": "Product",
    "archetype": "generic",
    "level": "senior",
    "description": "Orchestrates complex, multi-team initiatives from scoping through launch, managing risks, dependencies, and stakeholder communication. Ensures large-scale programmes (new market launches, platform migrations) land on time and within scope.",
    "ctc": {
      "low": 30,
      "median": 48,
      "high": 75
    },
    "coreSkills": [
      "programme planning (Gantt/OKR)",
      "risk & dependency management",
      "executive status reporting",
      "cross-functional facilitation",
      "RACI matrix design",
      "budget tracking",
      "change control"
    ],
    "niceToHave": [
      "PMP / PRINCE2 certification",
      "JIRA / Asana / Monday.com admin",
      "vendor management"
    ],
    "growthRoles": [
      "Director of Program Management",
      "Head of PMO",
      "Chief of Staff"
    ],
    "adjacentRoles": [
      "Senior Product Manager",
      "Delivery Manager",
      "Head of Strategy & Operations"
    ],
    "topCompanies": [
      "Amazon India",
      "Microsoft India",
      "Flipkart",
      "Infosys BPM",
      "Wipro",
      "Tata Digital",
      "Reliance Jio",
      "InMobi"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "chief-of-staff-product",
    "title": "Chief of Staff – Product",
    "domain": "Product",
    "archetype": "consumer",
    "level": "lead",
    "description": "Acts as a force multiplier for the CPO or VP Product — managing strategic initiatives, preparing board materials, running leadership rhythms, and driving cross-org projects that lack a natural owner. Often serves as an informal Chief PM or operating partner.",
    "ctc": {
      "low": 35,
      "median": 55,
      "high": 85
    },
    "coreSkills": [
      "executive communication",
      "strategic synthesis",
      "stakeholder management",
      "programme management",
      "data-driven storytelling",
      "organisational design",
      "prioritisation under ambiguity"
    ],
    "niceToHave": [
      "consulting background (MBB)",
      "fundraising deck experience",
      "P&L modelling"
    ],
    "growthRoles": [
      "Director of Product",
      "VP of Strategy",
      "General Manager – New Ventures"
    ],
    "adjacentRoles": [
      "Senior Product Manager",
      "Head of Strategy & Operations",
      "Associate Director – Business"
    ],
    "topCompanies": [
      "CRED",
      "Navi",
      "Razorpay",
      "BharatPe",
      "Zepto",
      "Meesho",
      "Dream11",
      "Groww"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "fintech-product-manager",
    "title": "Fintech Product Manager",
    "domain": "Product",
    "archetype": "fintech",
    "level": "mid",
    "description": "Owns lending, payments, insurance, or wealth product journeys, navigating RBI regulations, partner bank integrations, and compliance-first feature design. Balances user delight with stringent regulatory and fraud-risk constraints.",
    "ctc": {
      "low": 26,
      "median": 42,
      "high": 68
    },
    "coreSkills": [
      "RBI / SEBI regulatory landscape",
      "payment rails (UPI/IMPS/NACH)",
      "credit underwriting basics",
      "KYC/AML product flows",
      "API-first banking integrations",
      "risk metrics",
      "A/B testing in regulated environments"
    ],
    "niceToHave": [
      "account aggregator (AA) stack",
      "ONDC integration",
      "fraud detection ML familiarity"
    ],
    "growthRoles": [
      "Senior PM – Fintech",
      "Director of Product – Lending/Payments",
      "Principal PM – Fintech"
    ],
    "adjacentRoles": [
      "Credit Risk Analyst",
      "Regulatory Affairs Manager",
      "Business Development – Fintech Partnerships"
    ],
    "topCompanies": [
      "PhonePe",
      "Razorpay",
      "Navi",
      "Juspay",
      "BharatPe",
      "Fi Money",
      "Slice",
      "Perfios"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "edtech-healthtech-product-manager",
    "title": "EdTech / HealthTech Product Manager",
    "domain": "Product",
    "archetype": "edtech",
    "level": "mid",
    "description": "Designs learning or healthcare product experiences with deep domain sensitivity — curriculum design alignment in edtech, or clinical pathway logic in healthtech. Manages complex stakeholder ecosystems (teachers/doctors alongside end-users).",
    "ctc": {
      "low": 18,
      "median": 28,
      "high": 45
    },
    "coreSkills": [
      "domain research (ed/health)",
      "content product design",
      "engagement & outcome metrics",
      "multi-stakeholder mapping",
      "mobile-first product thinking",
      "localisation strategy",
      "compliance awareness (health data)"
    ],
    "niceToHave": [
      "clinical data standards (HL7/FHIR) or learning standards (SCORM)",
      "regional language product experience",
      "B2B2C model understanding"
    ],
    "growthRoles": [
      "Senior PM – EdTech/HealthTech",
      "Head of Product",
      "Director of Product"
    ],
    "adjacentRoles": [
      "Curriculum Designer",
      "Clinical Operations Manager",
      "Product Marketing Manager"
    ],
    "topCompanies": [
      "BYJU's",
      "Unacademy",
      "Vedantu",
      "Practo",
      "Mfine",
      "1mg (Tata Health)",
      "PhysicsWallah",
      "Classplus"
    ],
    "demand": "medium",
    "moneyPotential": "medium"
  },
  {
    "id": "software-development-engineer-i-sde-1",
    "title": "Software Development Engineer I (SDE-1)",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "entry",
    "description": "Entry-level engineer building features and fixing bugs under close mentorship. Expected to own small, well-scoped tasks end-to-end within a team.",
    "ctc": {
      "low": 12,
      "median": 18,
      "high": 28
    },
    "coreSkills": [
      "Data Structures & Algorithms",
      "Java or Python or Go",
      "REST APIs",
      "SQL",
      "Git",
      "System Design basics",
      "Unit Testing"
    ],
    "niceToHave": [
      "Competitive programming",
      "Open-source contributions",
      "Cloud basics (AWS/GCP)",
      "Docker"
    ],
    "growthRoles": [
      "Software Development Engineer II (SDE-2)",
      "Frontend Engineer",
      "Backend Engineer"
    ],
    "adjacentRoles": [
      "QA / SDET",
      "Technical Program Manager (APM)",
      "Data Analyst",
      "Solutions Engineer"
    ],
    "topCompanies": [
      "Flipkart",
      "PhonePe",
      "Razorpay",
      "Meesho",
      "Zepto",
      "CRED",
      "Swiggy",
      "Nykaa"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "software-development-engineer-ii-sde-2",
    "title": "Software Development Engineer II (SDE-2)",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "mid",
    "description": "Mid-level engineer who independently designs and ships features, reviews peers' code, and participates in system design discussions. Typically 2-5 years of experience.",
    "ctc": {
      "low": 22,
      "median": 35,
      "high": 55
    },
    "coreSkills": [
      "System Design",
      "Microservices",
      "Java / Go / Python",
      "Distributed Systems basics",
      "SQL & NoSQL",
      "CI/CD",
      "Code Review"
    ],
    "niceToHave": [
      "Kafka / event streaming",
      "Kubernetes",
      "gRPC",
      "Observability (Grafana/Datadog)"
    ],
    "growthRoles": [
      "Senior Software Engineer",
      "Software Development Engineer III (SDE-3)",
      "Engineering Manager"
    ],
    "adjacentRoles": [
      "Product Manager",
      "Solutions Architect",
      "Technical Lead",
      "Backend Engineer"
    ],
    "topCompanies": [
      "Razorpay",
      "Zepto",
      "CRED",
      "PhonePe",
      "Groww",
      "Dunzo",
      "BrowserStack",
      "Ola"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-software-engineer-sde-3-sse",
    "title": "Senior Software Engineer (SDE-3 / SSE)",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "senior",
    "description": "Senior individual contributor who leads feature squads, drives technical design docs, and mentors junior engineers. Broad ownership across at least one service area.",
    "ctc": {
      "low": 40,
      "median": 60,
      "high": 90
    },
    "coreSkills": [
      "Large-scale System Design",
      "Cross-team technical leadership",
      "Performance tuning",
      "API design",
      "Mentoring",
      "Incident management",
      "Java/Go/Rust"
    ],
    "niceToHave": [
      "ML system integration",
      "Multi-region architecture",
      "Cost optimisation",
      "GraphQL"
    ],
    "growthRoles": [
      "Staff Engineer",
      "Engineering Manager",
      "Principal Engineer"
    ],
    "adjacentRoles": [
      "Product Manager",
      "Solutions Architect",
      "DevOps/SRE",
      "Technical Program Manager"
    ],
    "topCompanies": [
      "Flipkart",
      "PhonePe",
      "Razorpay",
      "Google India",
      "Microsoft India",
      "Swiggy",
      "CRED",
      "Atlassian India"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "staff-software-engineer",
    "title": "Staff Software Engineer",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "lead",
    "description": "Cross-team technical leader who sets engineering standards, resolves ambiguous large-scope problems, and influences 2-4 teams without direct management responsibility.",
    "ctc": {
      "low": 60,
      "median": 90,
      "high": 140
    },
    "coreSkills": [
      "Cross-org system design",
      "Technical strategy",
      "RFC / ADR authoring",
      "Engineering culture",
      "Stakeholder management",
      "Distributed systems",
      "Scalability patterns"
    ],
    "niceToHave": [
      "Patents / publications",
      "Open-source maintainer",
      "FinOps",
      "ML platform design"
    ],
    "growthRoles": [
      "Principal Engineer",
      "Director of Engineering",
      "Engineering Manager"
    ],
    "adjacentRoles": [
      "Engineering Manager",
      "Principal Product Manager",
      "Solutions Architect",
      "Developer Advocate"
    ],
    "topCompanies": [
      "Flipkart",
      "Razorpay",
      "PhonePe",
      "Meesho",
      "Zepto",
      "BrowserStack",
      "Freshworks",
      "InMobi"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "principal-engineer",
    "title": "Principal Engineer",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "lead",
    "description": "Most senior IC role, operating at the org or company level to define multi-year technical vision, evaluate build-vs-buy decisions, and drive platform unification initiatives.",
    "ctc": {
      "low": 90,
      "median": 130,
      "high": 200
    },
    "coreSkills": [
      "Enterprise architecture",
      "Technical vision",
      "Org-wide design reviews",
      "Executive communication",
      "Build-vs-buy analysis",
      "Engineering org health",
      "Security & compliance design"
    ],
    "niceToHave": [
      "Board-level reporting",
      "Patent portfolio",
      "External conference speaking",
      "AI/ML strategy"
    ],
    "growthRoles": [
      "VP Engineering",
      "CTO",
      "Distinguished Engineer"
    ],
    "adjacentRoles": [
      "VP Product",
      "Chief Architect",
      "Head of Infrastructure",
      "Director of Engineering"
    ],
    "topCompanies": [
      "Flipkart",
      "PhonePe",
      "Razorpay",
      "Google India",
      "Amazon India",
      "Atlassian India",
      "Freshworks",
      "Meesho"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "engineering-manager-em",
    "title": "Engineering Manager (EM)",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "lead",
    "description": "People manager leading a squad of 5-10 engineers, responsible for delivery, team health, hiring, and career development while staying technically credible.",
    "ctc": {
      "low": 40,
      "median": 65,
      "high": 100
    },
    "coreSkills": [
      "People management",
      "Agile/Scrum",
      "Technical roadmap planning",
      "Hiring & onboarding",
      "Performance reviews",
      "Stakeholder communication",
      "Incident retrospectives"
    ],
    "niceToHave": [
      "Organisational design",
      "OKR frameworks",
      "Budget ownership",
      "Executive storytelling"
    ],
    "growthRoles": [
      "Senior Engineering Manager",
      "Director of Engineering",
      "VP Engineering"
    ],
    "adjacentRoles": [
      "Product Manager",
      "Technical Program Manager",
      "Staff Engineer",
      "Delivery Manager"
    ],
    "topCompanies": [
      "Swiggy",
      "Razorpay",
      "CRED",
      "Zepto",
      "PhonePe",
      "Freshworks",
      "Meesho",
      "BrowserStack"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-engineering-manager",
    "title": "Senior Engineering Manager",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "director",
    "description": "Manages multiple squads or a full product area, balances engineering strategy with operational execution, and develops a pipeline of engineering leads beneath them.",
    "ctc": {
      "low": 65,
      "median": 100,
      "high": 150
    },
    "coreSkills": [
      "Multi-team delivery",
      "Engineering strategy",
      "Manager-of-managers",
      "Headcount planning",
      "Cross-functional alignment",
      "Budget management",
      "Org design"
    ],
    "niceToHave": [
      "P&L awareness",
      "M&A technical due diligence",
      "Exec stakeholder management",
      "DEI initiatives"
    ],
    "growthRoles": [
      "Director of Engineering",
      "VP Engineering",
      "CTO"
    ],
    "adjacentRoles": [
      "Senior Product Manager / Group PM",
      "Technical Program Manager",
      "Director of Engineering",
      "Chief of Staff Engineering"
    ],
    "topCompanies": [
      "Flipkart",
      "PhonePe",
      "Swiggy",
      "Razorpay",
      "Ola",
      "Paytm",
      "Zepto",
      "Juspay"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "director-of-engineering",
    "title": "Director of Engineering",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "director",
    "description": "Owns engineering for a major product vertical, defines the multi-quarter technical roadmap, and represents engineering at the leadership table with business and product counterparts.",
    "ctc": {
      "low": 80,
      "median": 120,
      "high": 180
    },
    "coreSkills": [
      "Vertical ownership",
      "Engineering KPIs & OKRs",
      "Org scaling",
      "Vendor & partner management",
      "Technical due diligence",
      "P&L co-ownership",
      "Culture & retention"
    ],
    "niceToHave": [
      "IPO / fundraise readiness",
      "Board-level presenting",
      "Open-source strategy",
      "AI adoption roadmap"
    ],
    "growthRoles": [
      "VP Engineering",
      "CTO",
      "GM / Business Head"
    ],
    "adjacentRoles": [
      "VP Product",
      "Chief Product Officer",
      "Technical Program Director",
      "Head of Infrastructure"
    ],
    "topCompanies": [
      "Flipkart",
      "Razorpay",
      "PhonePe",
      "Swiggy",
      "CRED",
      "Meesho",
      "Freshworks",
      "Paytm"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "vp-engineering",
    "title": "VP Engineering",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "vp",
    "description": "C-1 executive accountable for the entire engineering organisation, sets technical vision and culture, and is a key voice in company strategy alongside CEO and CPO.",
    "ctc": {
      "low": 100,
      "median": 150,
      "high": 250
    },
    "coreSkills": [
      "Engineering org leadership",
      "Company-level technical strategy",
      "Board communication",
      "M&A technical diligence",
      "Engineering brand",
      "Large-scale hiring",
      "Budget ownership"
    ],
    "niceToHave": [
      "IPO/DRHP experience",
      "International engineering centres",
      "Public speaking / thought leadership",
      "AI transformation leadership"
    ],
    "growthRoles": [
      "CTO",
      "CEO",
      "Founder / Co-founder"
    ],
    "adjacentRoles": [
      "Chief Product Officer",
      "Chief Operating Officer",
      "Chief AI Officer",
      "Board Advisor"
    ],
    "topCompanies": [
      "Razorpay",
      "PhonePe",
      "CRED",
      "Zepto",
      "Meesho",
      "Swiggy",
      "Groww",
      "slice"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "chief-technology-officer-cto",
    "title": "Chief Technology Officer (CTO)",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "exec",
    "description": "Topmost technical executive setting the 3-5 year tech vision, representing technology to investors and the board, and ensuring the organisation can scale to business ambitions.",
    "ctc": {
      "low": 150,
      "median": 250,
      "high": 500
    },
    "coreSkills": [
      "Technical vision",
      "Investor & board communication",
      "Platform strategy",
      "Engineering talent brand",
      "AI/ML strategy",
      "Partnership & ecosystem",
      "Company culture"
    ],
    "niceToHave": [
      "Public markets experience",
      "International expansion",
      "Patent portfolio",
      "Startup ecosystem mentorship"
    ],
    "growthRoles": [
      "Co-founder",
      "Board Member",
      "Venture Partner"
    ],
    "adjacentRoles": [
      "CEO",
      "Chief AI Officer",
      "Chief Product Officer",
      "Board Advisor (Tech)"
    ],
    "topCompanies": [
      "Flipkart",
      "PhonePe",
      "Razorpay",
      "Swiggy",
      "Zepto",
      "CRED",
      "Groww",
      "BrowserStack"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "devops-site-reliability-engineer-sre",
    "title": "DevOps / Site Reliability Engineer (SRE)",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "mid",
    "description": "Owns production reliability, CI/CD pipelines, and infrastructure automation, bridging the gap between development velocity and operational stability through SLOs and error budgets.",
    "ctc": {
      "low": 18,
      "median": 32,
      "high": 55
    },
    "coreSkills": [
      "Kubernetes & Docker",
      "Terraform / IaC",
      "CI/CD (GitHub Actions / Jenkins)",
      "Observability (Prometheus/Grafana/Datadog)",
      "AWS/GCP/Azure",
      "Incident management",
      "Shell scripting"
    ],
    "niceToHave": [
      "eBPF / kernel internals",
      "Chaos engineering",
      "FinOps / cloud cost optimisation",
      "Service mesh (Istio/Linkerd)"
    ],
    "growthRoles": [
      "Senior SRE",
      "Platform Engineer",
      "Engineering Manager (Infrastructure)"
    ],
    "adjacentRoles": [
      "Platform Engineer",
      "Security Engineer",
      "Cloud Architect",
      "Backend Engineer"
    ],
    "topCompanies": [
      "PhonePe",
      "Razorpay",
      "Swiggy",
      "Flipkart",
      "Zepto",
      "Juspay",
      "Atlassian India",
      "BrowserStack"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "platform-engineer",
    "title": "Platform Engineer",
    "domain": "Engineering",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Builds and maintains the Internal Developer Platform (IDP) that abstracts away infrastructure complexity for product engineers, accelerating developer velocity at scale.",
    "ctc": {
      "low": 30,
      "median": 55,
      "high": 90
    },
    "coreSkills": [
      "Internal developer platform (Backstage/Port)",
      "Kubernetes operators",
      "Terraform / Pulumi",
      "Developer experience tooling",
      "Service catalogue design",
      "Cloud-native patterns",
      "Python / Go"
    ],
    "niceToHave": [
      "Crossplane",
      "GitOps (ArgoCD/Flux)",
      "WASM",
      "Cost attribution systems"
    ],
    "growthRoles": [
      "Staff Platform Engineer",
      "Engineering Manager (Platform)",
      "Principal Engineer"
    ],
    "adjacentRoles": [
      "DevOps/SRE",
      "Cloud Architect",
      "Backend Engineer",
      "Security Engineer"
    ],
    "topCompanies": [
      "Flipkart",
      "Zepto",
      "Razorpay",
      "CRED",
      "Meesho",
      "PhonePe",
      "Freshworks",
      "Atlassian India"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "security-engineer-appsec-cloud-security",
    "title": "Security Engineer (AppSec / Cloud Security)",
    "domain": "Engineering",
    "archetype": "fintech",
    "level": "senior",
    "description": "Embeds security into SDLC, performs threat modelling and penetration testing, and leads cloud security posture management for product and infrastructure teams.",
    "ctc": {
      "low": 25,
      "median": 45,
      "high": 80
    },
    "coreSkills": [
      "OWASP / application security",
      "Cloud security (AWS GuardDuty / GCP SCC)",
      "SAST/DAST tooling",
      "Threat modelling",
      "Zero-trust architecture",
      "Compliance (SOC2/PCI-DSS/ISO27001)",
      "Python / Bash automation"
    ],
    "niceToHave": [
      "Red teaming / bug bounty",
      "CSPM tools (Wiz/Orca)",
      "Kubernetes security",
      "CISM/CEH certifications"
    ],
    "growthRoles": [
      "Staff Security Engineer",
      "Head of Security",
      "CISO"
    ],
    "adjacentRoles": [
      "DevOps/SRE",
      "Platform Engineer",
      "Compliance Manager",
      "Security Architect"
    ],
    "topCompanies": [
      "Razorpay",
      "PhonePe",
      "CRED",
      "Juspay",
      "BrowserStack",
      "Freshworks",
      "Flipkart",
      "Zepto"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "mobile-engineer-android-ios",
    "title": "Mobile Engineer (Android / iOS)",
    "domain": "Engineering",
    "archetype": "consumer",
    "level": "mid",
    "description": "Builds high-performance consumer mobile applications with a focus on smooth UX, offline-first architecture, and fast app startup — critical for India's mobile-first market.",
    "ctc": {
      "low": 15,
      "median": 28,
      "high": 55
    },
    "coreSkills": [
      "Kotlin (Android) or Swift/SwiftUI (iOS)",
      "Jetpack Compose / Flutter",
      "RESTful API integration",
      "App performance profiling",
      "Push notifications",
      "Offline sync patterns",
      "CI/CD for mobile (Fastlane/Bitrise)"
    ],
    "niceToHave": [
      "React Native / KMM",
      "A/B testing (Firebase)",
      "Deep linking",
      "App store optimisation"
    ],
    "growthRoles": [
      "Senior Mobile Engineer",
      "Staff Engineer",
      "Engineering Manager (Mobile)"
    ],
    "adjacentRoles": [
      "Frontend Engineer",
      "Full-stack Engineer",
      "Product Manager",
      "UX Engineer"
    ],
    "topCompanies": [
      "PhonePe",
      "Swiggy",
      "CRED",
      "Zepto",
      "Groww",
      "Meesho",
      "Nykaa",
      "slice"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "frontend-engineer",
    "title": "Frontend Engineer",
    "domain": "Engineering",
    "archetype": "consumer",
    "level": "mid",
    "description": "Crafts performant, accessible web interfaces using modern component-based frameworks, owning web vitals, design system adoption, and front-end build pipelines.",
    "ctc": {
      "low": 14,
      "median": 25,
      "high": 48
    },
    "coreSkills": [
      "React / Next.js",
      "TypeScript",
      "State management (Redux/Zustand)",
      "CSS / Tailwind",
      "Web performance (Core Web Vitals)",
      "Testing (Jest/Playwright)",
      "REST/GraphQL"
    ],
    "niceToHave": [
      "Micro-frontend architecture",
      "WebAssembly",
      "SSR/SSG optimisation",
      "Figma Dev Mode"
    ],
    "growthRoles": [
      "Senior Frontend Engineer",
      "Full-stack Engineer",
      "Staff Engineer"
    ],
    "adjacentRoles": [
      "Mobile Engineer",
      "UX Engineer / Design Technologist",
      "Product Manager",
      "Full-stack Engineer"
    ],
    "topCompanies": [
      "CRED",
      "Razorpay",
      "Groww",
      "BrowserStack",
      "Freshworks",
      "Zepto",
      "Nykaa",
      "Meesho"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "backend-engineer",
    "title": "Backend Engineer",
    "domain": "Engineering",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Designs and scales server-side systems handling high-throughput APIs, data pipelines, and event-driven microservices, with a strong emphasis on reliability and low latency.",
    "ctc": {
      "low": 16,
      "median": 30,
      "high": 58
    },
    "coreSkills": [
      "Java / Go / Python",
      "Microservices",
      "Message queues (Kafka/RabbitMQ)",
      "PostgreSQL / MySQL / MongoDB",
      "Redis caching",
      "REST & gRPC APIs",
      "Cloud deployment"
    ],
    "niceToHave": [
      "Distributed tracing (Jaeger/Zipkin)",
      "Elasticsearch",
      "Event sourcing / CQRS",
      "gRPC streaming"
    ],
    "growthRoles": [
      "Senior Software Engineer",
      "Staff Engineer",
      "Backend Architect"
    ],
    "adjacentRoles": [
      "Data Engineer",
      "Platform Engineer",
      "Full-stack Engineer",
      "Solutions Architect"
    ],
    "topCompanies": [
      "Razorpay",
      "Juspay",
      "PhonePe",
      "Flipkart",
      "Swiggy",
      "Zepto",
      "Groww",
      "CRED"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "full-stack-engineer",
    "title": "Full-stack Engineer",
    "domain": "Engineering",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Delivers complete product features across web frontend and backend services, making this role especially valuable in early-stage startups and small product teams needing end-to-end ownership.",
    "ctc": {
      "low": 14,
      "median": 26,
      "high": 50
    },
    "coreSkills": [
      "React / Next.js",
      "Node.js or Python (FastAPI/Django)",
      "TypeScript",
      "PostgreSQL / MongoDB",
      "REST APIs",
      "Docker & CI/CD",
      "Cloud basics"
    ],
    "niceToHave": [
      "GraphQL",
      "Mobile (React Native)",
      "Serverless (Lambda/Cloud Functions)",
      "Prisma / ORM expertise"
    ],
    "growthRoles": [
      "Senior Full-stack Engineer",
      "Backend Engineer",
      "Engineering Manager"
    ],
    "adjacentRoles": [
      "Frontend Engineer",
      "Backend Engineer",
      "Product Manager",
      "Technical Co-founder"
    ],
    "topCompanies": [
      "Freshworks",
      "Chargebee",
      "Postman",
      "BrowserStack",
      "Hasura",
      "Setu",
      "Sprinto",
      "Leadsquared"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "solutions-cloud-architect",
    "title": "Solutions / Cloud Architect",
    "domain": "Engineering",
    "archetype": "b2b-saas",
    "level": "lead",
    "description": "Designs enterprise-grade cloud architectures for internal platforms or customer-facing solutions, bridging business requirements with technical implementation across AWS, GCP, or Azure.",
    "ctc": {
      "low": 40,
      "median": 70,
      "high": 120
    },
    "coreSkills": [
      "AWS / GCP / Azure architecture",
      "Well-Architected Framework",
      "Microservices & event-driven design",
      "Network & security design",
      "Cost optimisation",
      "Pre-sales & RFP support",
      "Infrastructure as Code"
    ],
    "niceToHave": [
      "Multi-cloud strategy",
      "Data architecture (Lakehouse/Mesh)",
      "FinOps certification",
      "TOGAF"
    ],
    "growthRoles": [
      "Principal Architect",
      "Director of Engineering",
      "VP Engineering"
    ],
    "adjacentRoles": [
      "Platform Engineer",
      "Principal Engineer",
      "Technical Program Manager",
      "DevOps/SRE"
    ],
    "topCompanies": [
      "Freshworks",
      "Infosys",
      "Wipro Digital",
      "TCS iON",
      "Juspay",
      "Setu",
      "Razorpay",
      "Oracle India"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "qa-engineer-sdet",
    "title": "QA Engineer / SDET",
    "domain": "Engineering",
    "archetype": "generic",
    "level": "mid",
    "description": "Engineers quality into the SDLC through automated test frameworks, performance testing, and chaos experiments, ensuring reliability at each release gate in fast-shipping product teams.",
    "ctc": {
      "low": 10,
      "median": 20,
      "high": 40
    },
    "coreSkills": [
      "Selenium / Playwright / Cypress",
      "API testing (Postman/RestAssured)",
      "Java or Python for automation",
      "Performance testing (k6/JMeter)",
      "CI/CD integration",
      "Test strategy & planning",
      "BDD (Cucumber)"
    ],
    "niceToHave": [
      "Mobile automation (Appium)",
      "Contract testing (Pact)",
      "Chaos engineering",
      "Observability-driven testing"
    ],
    "growthRoles": [
      "Senior SDET",
      "QA Lead",
      "Engineering Manager (Quality)"
    ],
    "adjacentRoles": [
      "DevOps/SRE",
      "Backend Engineer",
      "Product Manager",
      "Security Engineer"
    ],
    "topCompanies": [
      "BrowserStack",
      "Flipkart",
      "Razorpay",
      "Swiggy",
      "Freshworks",
      "Meesho",
      "PhonePe",
      "Atlassian India"
    ],
    "demand": "medium",
    "moneyPotential": "steady"
  },
  {
    "id": "data-analyst",
    "title": "Data Analyst",
    "domain": "Data & AI",
    "archetype": "generic",
    "level": "entry",
    "description": "Translates business questions into SQL queries and dashboards. Owns reporting pipelines, monitors KPIs, and surfaces actionable insights for product and ops teams. Primary stack: SQL, Excel/Sheets, Tableau or Metabase. Common first job for graduates entering data careers at Indian startups and GCCs.",
    "ctc": {
      "low": 4,
      "median": 7,
      "high": 12
    },
    "coreSkills": [
      "SQL",
      "Excel / Google Sheets",
      "Tableau / Metabase / Looker",
      "Python (pandas, numpy)",
      "Data storytelling",
      "A/B test interpretation",
      "Dashboard design"
    ],
    "niceToHave": [
      "dbt basics",
      "Airflow familiarity",
      "Statistical hypothesis testing",
      "BigQuery / Redshift"
    ],
    "growthRoles": [
      "Senior Data Analyst",
      "Analytics Engineer",
      "Data Scientist",
      "Product Analyst"
    ],
    "adjacentRoles": [
      "Business Analyst",
      "Product Manager",
      "Operations Analyst",
      "Growth Analyst"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Flipkart",
      "Meesho",
      "Razorpay",
      "CRED",
      "PhonePe",
      "Groww",
      "Zepto",
      "Myntra"
    ],
    "demand": "high",
    "moneyPotential": "steady"
  },
  {
    "id": "senior-data-analyst",
    "title": "Senior Data Analyst",
    "domain": "Data & AI",
    "archetype": "consumer",
    "level": "mid",
    "description": "Leads analytical workstreams for a product vertical (growth, retention, monetisation). Designs experimentation frameworks, mentors junior analysts, and owns self-serve data tooling. Expected to proactively define metrics and influence product roadmap with data.",
    "ctc": {
      "low": 12,
      "median": 18,
      "high": 28
    },
    "coreSkills": [
      "Advanced SQL",
      "Python (statsmodels, scipy)",
      "Experimentation & causal inference",
      "Cohort & funnel analysis",
      "BI tool ownership (Looker/Superset)",
      "Stakeholder communication",
      "Metric design"
    ],
    "niceToHave": [
      "dbt",
      "Spark basics",
      "ML model interpretation",
      "Product sense"
    ],
    "growthRoles": [
      "Analytics Lead",
      "Analytics Engineer",
      "Data Scientist",
      "Product Manager"
    ],
    "adjacentRoles": [
      "Product Analyst",
      "Growth Analyst",
      "Strategy Analyst",
      "Business Intelligence Analyst"
    ],
    "topCompanies": [
      "Swiggy",
      "Zepto",
      "Meesho",
      "Dunzo",
      "Urban Company",
      "Nykaa",
      "Paytm",
      "Dream11",
      "upGrad"
    ],
    "demand": "high",
    "moneyPotential": "steady"
  },
  {
    "id": "analytics-engineer",
    "title": "Analytics Engineer",
    "domain": "Data & AI",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Sits at the intersection of data engineering and analytics. Owns the transformation layer — building and maintaining dbt models, semantic layers, and data marts that analysts consume. Ensures data quality, lineage, and documentation. High demand at product companies scaling their data infrastructure.",
    "ctc": {
      "low": 14,
      "median": 22,
      "high": 35
    },
    "coreSkills": [
      "dbt (Core / Cloud)",
      "SQL (advanced)",
      "Data warehouse (BigQuery, Snowflake, Redshift)",
      "Data modelling (Kimball / Data Vault)",
      "Git & CI/CD",
      "Data quality frameworks",
      "Python scripting"
    ],
    "niceToHave": [
      "Airflow / Prefect",
      "Looker LookML",
      "Great Expectations",
      "Spark basics"
    ],
    "growthRoles": [
      "Senior Data Engineer",
      "Data Engineering Manager",
      "Analytics Lead",
      "Staff Data Engineer"
    ],
    "adjacentRoles": [
      "Data Engineer",
      "Senior Data Analyst",
      "BI Engineer",
      "Data Platform Engineer"
    ],
    "topCompanies": [
      "Razorpay",
      "Chargebee",
      "Freshworks",
      "Postman",
      "BrowserStack",
      "Hasura",
      "Setu",
      "Groww",
      "Fi Money"
    ],
    "demand": "high",
    "moneyPotential": "steady"
  },
  {
    "id": "data-engineer",
    "title": "Data Engineer",
    "domain": "Data & AI",
    "archetype": "fintech",
    "level": "mid",
    "description": "Builds and operates data pipelines, ingestion systems, and the lakehouse/warehouse that powers analytics and ML. Works with streaming (Kafka, Flink) and batch (Spark, Airflow) systems. Core role at every product company with data-driven decision making.",
    "ctc": {
      "low": 10,
      "median": 18,
      "high": 30
    },
    "coreSkills": [
      "Python / Scala",
      "Apache Spark",
      "Apache Kafka / Flink",
      "Airflow / Prefect / Dagster",
      "Cloud data warehouses (BigQuery, Redshift, Snowflake)",
      "SQL",
      "Data modelling"
    ],
    "niceToHave": [
      "dbt",
      "Delta Lake / Apache Iceberg",
      "Kubernetes / Docker",
      "Terraform",
      "MLflow"
    ],
    "growthRoles": [
      "Senior Data Engineer",
      "Staff Data Engineer",
      "Data Engineering Manager",
      "Platform Engineer"
    ],
    "adjacentRoles": [
      "Analytics Engineer",
      "Backend Engineer",
      "DevOps / SRE",
      "MLOps Engineer"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon",
      "Swiggy",
      "PhonePe",
      "Razorpay",
      "Paytm",
      "Groww",
      "Meesho",
      "Ola"
    ],
    "demand": "high",
    "moneyPotential": "steady"
  },
  {
    "id": "senior-data-engineer",
    "title": "Senior Data Engineer",
    "domain": "Data & AI",
    "archetype": "fintech",
    "level": "senior",
    "description": "Designs scalable, fault-tolerant data architectures. Leads platform decisions around lakehouse, real-time streaming, and data quality. Mentors junior engineers, drives cost optimisation, and collaborates closely with ML and Analytics teams on feature stores and experiment tracking.",
    "ctc": {
      "low": 22,
      "median": 35,
      "high": 55
    },
    "coreSkills": [
      "Distributed systems design",
      "Spark + Flink at scale",
      "Data lake / lakehouse architecture",
      "Feature store (Feast, Tecton)",
      "Kafka / Pulsar",
      "Cloud infra (GCP / AWS)",
      "Python / Scala / Java"
    ],
    "niceToHave": [
      "Delta Lake / Hudi / Iceberg",
      "Kubernetes",
      "dbt advanced",
      "ML pipeline integration",
      "Terraform IaC"
    ],
    "growthRoles": [
      "Staff Data Engineer",
      "Data Engineering Manager",
      "Principal Engineer",
      "Head of Data Platform"
    ],
    "adjacentRoles": [
      "ML Platform Engineer",
      "Solutions Architect",
      "Principal Backend Engineer",
      "Data Architect"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon",
      "Google",
      "PhonePe",
      "Swiggy",
      "Dream11",
      "CRED",
      "Zepto",
      "upGrad"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "data-scientist",
    "title": "Data Scientist",
    "domain": "Data & AI",
    "archetype": "consumer",
    "level": "mid",
    "description": "Builds predictive models and statistical analyses to solve business problems — churn, personalisation, pricing, fraud detection. Bridges exploration (notebooks) and production (working with engineers to deploy models). Increasingly expected to have MLOps awareness.",
    "ctc": {
      "low": 10,
      "median": 18,
      "high": 30
    },
    "coreSkills": [
      "Python (scikit-learn, XGBoost, LightGBM)",
      "SQL",
      "Feature engineering",
      "ML model evaluation & selection",
      "Statistical inference",
      "Experiment design",
      "MLflow / W&B basics"
    ],
    "niceToHave": [
      "Deep learning (PyTorch/TF)",
      "Spark ML",
      "NLP basics",
      "Cloud ML services (SageMaker, Vertex AI)",
      "Causal inference"
    ],
    "growthRoles": [
      "Senior Data Scientist",
      "ML Engineer",
      "Applied Scientist",
      "Analytics Lead"
    ],
    "adjacentRoles": [
      "ML Engineer",
      "Senior Data Analyst",
      "Quantitative Analyst",
      "Product Data Scientist"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Flipkart",
      "Meesho",
      "PhonePe",
      "Razorpay",
      "CRED",
      "PolicyBazaar",
      "Nykaa"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "senior-data-scientist",
    "title": "Senior Data Scientist",
    "domain": "Data & AI",
    "archetype": "consumer",
    "level": "senior",
    "description": "Owns end-to-end ML solutions for high-impact product areas (recommendations, search ranking, dynamic pricing). Drives problem framing, leads modelling cycles, and coordinates deployment with engineers. Increasingly involved in LLM integration for product features.",
    "ctc": {
      "low": 22,
      "median": 35,
      "high": 55
    },
    "coreSkills": [
      "Advanced ML (ensemble, neural nets, ranking models)",
      "Causal inference & uplift modelling",
      "Production ML deployment",
      "Python (PyTorch, HuggingFace basics)",
      "Feature stores",
      "Experimentation (multi-armed bandits)",
      "SQL at scale"
    ],
    "niceToHave": [
      "LLM fine-tuning basics",
      "Reinforcement learning",
      "Graph ML",
      "Spark ML",
      "MLOps (Kubeflow, MLflow)"
    ],
    "growthRoles": [
      "Staff Data Scientist",
      "ML Engineer",
      "Applied Scientist",
      "Analytics Lead",
      "Data Science Manager"
    ],
    "adjacentRoles": [
      "Senior ML Engineer",
      "Applied Research Scientist",
      "Principal Data Scientist",
      "Product Manager (AI)"
    ],
    "topCompanies": [
      "Flipkart",
      "Swiggy",
      "Dream11",
      "CRED",
      "Razorpay",
      "Ola",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "staff-data-scientist",
    "title": "Staff Data Scientist",
    "domain": "Data & AI",
    "archetype": "ai-infra",
    "level": "lead",
    "description": "Senior IC (Individual Contributor) who shapes ML strategy across a product domain. Defines the modelling roadmap, introduces new techniques, reviews design docs, and often co-authors patent/research with applied science teams. Equivalent to Staff Engineer on the SWE track.",
    "ctc": {
      "low": 40,
      "median": 60,
      "high": 90
    },
    "coreSkills": [
      "ML systems design",
      "Research literacy (reading + applying papers)",
      "LLM/foundation model integration",
      "Mentorship",
      "Technical leadership",
      "Cross-functional influence",
      "Deep ML (transformers, diffusion)"
    ],
    "niceToHave": [
      "Publications / patents",
      "Open source contributions",
      "MLOps platform design",
      "GenAI RAG pipelines"
    ],
    "growthRoles": [
      "Principal Data Scientist",
      "Head of Data Science",
      "Director of AI",
      "Research Scientist"
    ],
    "adjacentRoles": [
      "Principal ML Engineer",
      "Applied Scientist",
      "Director of Engineering (AI)",
      "VP of AI"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon Science",
      "Google DeepMind India",
      "Microsoft Research India",
      "Swiggy",
      "Phonepe",
      "InMobi"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "ml-engineer",
    "title": "ML Engineer",
    "domain": "Data & AI",
    "archetype": "consumer",
    "level": "mid",
    "description": "Productionises ML models — building training pipelines, serving infra, and monitoring. Closer to SWE than data science; owns the reliability and performance of models in production. High demand as companies move from prototype to production ML.",
    "ctc": {
      "low": 12,
      "median": 22,
      "high": 38
    },
    "coreSkills": [
      "Python",
      "PyTorch / TensorFlow",
      "ML serving (TorchServe, Triton, BentoML)",
      "Docker / Kubernetes",
      "MLflow / Kubeflow / Metaflow",
      "REST API design",
      "CI/CD for ML"
    ],
    "niceToHave": [
      "ONNX optimisation",
      "GPU profiling (CUDA basics)",
      "Feature store (Feast)",
      "Spark",
      "LLM inference optimisation"
    ],
    "growthRoles": [
      "Senior ML Engineer",
      "MLOps Engineer",
      "AI Platform Engineer",
      "Applied Scientist"
    ],
    "adjacentRoles": [
      "Backend Engineer",
      "Data Scientist",
      "DevOps / MLOps Engineer",
      "AI Engineer"
    ],
    "topCompanies": [
      "Swiggy",
      "Flipkart",
      "Meesho",
      "Zepto",
      "Dream11",
      "Juspay",
      "Sarvam AI",
      "Krutrim",
      "Ola"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-ml-engineer",
    "title": "Senior ML Engineer",
    "domain": "Data & AI",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Leads design and implementation of ML platform components — feature stores, training orchestration, model registries, and low-latency serving systems. Often the bridge between data science and platform engineering. May specialise in a vertical (NLP, CV, RecSys).",
    "ctc": {
      "low": 28,
      "median": 45,
      "high": 75
    },
    "coreSkills": [
      "ML system design at scale",
      "GPU/TPU training optimisation",
      "Distributed training (DDP, FSDP)",
      "Kubernetes / Ray",
      "LLM inference (vLLM, TGI, SGLang)",
      "Model compression (quantisation, distillation)",
      "Python / C++"
    ],
    "niceToHave": [
      "CUDA programming",
      "Triton custom kernels",
      "Multi-modal model deployment",
      "RL from human feedback (RLHF)",
      "MLOps platform ownership"
    ],
    "growthRoles": [
      "Staff ML Engineer",
      "Principal ML Engineer",
      "ML Platform Lead",
      "Applied Scientist"
    ],
    "adjacentRoles": [
      "Staff Data Scientist",
      "AI Infrastructure Engineer",
      "GenAI Engineer",
      "Platform Engineering Manager"
    ],
    "topCompanies": [
      "Google",
      "Microsoft",
      "Amazon",
      "Sarvam AI",
      "Krutrim",
      "Flipkart",
      "PhonePe",
      "Verloop",
      "Yellow.ai"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "applied-scientist",
    "title": "Applied Scientist",
    "domain": "Data & AI",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Hybrid role common at FAANG India and well-funded product cos. Applies cutting-edge research to product-scale problems. Expected to implement novel algorithms, run rigorous offline and online evaluations, and publish or patent findings. Often sits in an Applied Science org distinct from Data Science.",
    "ctc": {
      "low": 35,
      "median": 55,
      "high": 100
    },
    "coreSkills": [
      "Deep learning (transformers, diffusion, GNNs)",
      "Research methodology (paper reading, ablations, benchmarking)",
      "PyTorch",
      "Large-scale ML training",
      "Statistical rigour",
      "Scientific writing",
      "Python / C++"
    ],
    "niceToHave": [
      "NeurIPS / ICML / ACL publications",
      "RL / multi-agent systems",
      "Multimodal models",
      "LLM pre-training / fine-tuning",
      "Causal ML"
    ],
    "growthRoles": [
      "Senior Applied Scientist",
      "Principal Scientist",
      "Research Scientist",
      "Head of Applied Science"
    ],
    "adjacentRoles": [
      "Staff Data Scientist",
      "Senior ML Engineer",
      "Research Engineer",
      "AI Product Manager"
    ],
    "topCompanies": [
      "Amazon Science (Bangalore)",
      "Google Research India",
      "Microsoft Research India",
      "Adobe Research",
      "Walmart Global Tech",
      "Flipkart AI Lab"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "ai-engineer",
    "title": "AI Engineer",
    "domain": "Data & AI",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Builds AI-powered product features end-to-end — from LLM prompt engineering and RAG pipelines to evaluation harnesses and production deployments. Differs from GenAI/LLM Engineer by being more product-feature oriented and less infra-heavy. Fast-growing role across every Indian product company.",
    "ctc": {
      "low": 12,
      "median": 22,
      "high": 40
    },
    "coreSkills": [
      "LLM APIs (OpenAI, Anthropic, Gemini)",
      "RAG pipelines (LangChain / LlamaIndex)",
      "Vector databases (Pinecone, Weaviate, PgVector)",
      "Prompt engineering & evaluation",
      "Python",
      "REST API development (FastAPI)",
      "Embedding models"
    ],
    "niceToHave": [
      "Fine-tuning (LoRA, QLoRA)",
      "LLM observability (LangSmith, Langfuse)",
      "Agent frameworks (LangGraph, CrewAI)",
      "Multimodal models",
      "Cloud deployment (AWS Bedrock, GCP Vertex)"
    ],
    "growthRoles": [
      "Senior AI Engineer",
      "GenAI/LLM Engineer",
      "ML Engineer",
      "AI Product Manager"
    ],
    "adjacentRoles": [
      "Backend Engineer",
      "ML Engineer",
      "Data Scientist",
      "Solutions Engineer"
    ],
    "topCompanies": [
      "Sarvam AI",
      "Krutrim",
      "Juspay",
      "Freshworks",
      "Zoho",
      "Razorpay",
      "CRED",
      "Leapfrog",
      "Yellow.ai",
      "Verloop"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "genai-llm-engineer",
    "title": "GenAI / LLM Engineer",
    "domain": "Data & AI",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Specialises in the full lifecycle of large language model applications — from evaluation-driven prompt design and fine-tuning to optimised inference serving at scale. Commands the highest compensation premiums in the 2025-26 India market. Works at the boundary of research and engineering.",
    "ctc": {
      "low": 20,
      "median": 40,
      "high": 80
    },
    "coreSkills": [
      "LLM fine-tuning (LoRA, QLoRA, RLHF, DPO)",
      "Inference optimisation (vLLM, TGI, GGUF quantisation)",
      "Evaluation frameworks (RAGAS, LangSmith, custom evals)",
      "Agent & multi-agent systems (LangGraph, AutoGen)",
      "RAG architecture (hybrid search, re-ranking)",
      "Python / CUDA basics",
      "HuggingFace Transformers / PEFT"
    ],
    "niceToHave": [
      "Multimodal LLMs (vision-language models)",
      "LLM pre-training from scratch",
      "Reinforcement learning for LLMs",
      "SFT dataset curation",
      "Open-source model ecosystem (Llama, Mistral, Gemma)"
    ],
    "growthRoles": [
      "Staff / Principal LLM Engineer",
      "Research Scientist",
      "Applied Scientist",
      "Head of AI",
      "AI Product Manager"
    ],
    "adjacentRoles": [
      "Senior ML Engineer",
      "Applied Scientist",
      "AI Platform Engineer",
      "Research Engineer"
    ],
    "topCompanies": [
      "Sarvam AI",
      "Krutrim",
      "Google DeepMind India",
      "Microsoft Azure AI",
      "Amazon Bedrock team India",
      "Anthropic (remote)",
      "Verloop",
      "Haptik",
      "Yellow.ai",
      "Ola Krutrim"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "research-scientist",
    "title": "Research Scientist",
    "domain": "Data & AI",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Conducts original ML research — designing experiments, writing papers, and advancing the state of the art in areas like NLP, computer vision, RL, or multimodal AI. Most positions at India labs (Google, Microsoft, Amazon, Adobe) require a PhD or equivalent publication record.",
    "ctc": {
      "low": 35,
      "median": 60,
      "high": 110
    },
    "coreSkills": [
      "Deep learning theory (attention, optimisation, generative models)",
      "Experimental design & statistical rigour",
      "PyTorch / JAX",
      "Scientific writing & peer review",
      "Research roadmap ownership",
      "Python",
      "Mathematics (linear algebra, probability, information theory)"
    ],
    "niceToHave": [
      "Top-tier publications (NeurIPS, ICML, ICLR, ACL, CVPR)",
      "Foundation model pre-training experience",
      "Multimodal / multi-agent research",
      "Open-source model release experience",
      "PhD from IIT/IISc/top international university"
    ],
    "growthRoles": [
      "Senior Research Scientist",
      "Principal Research Scientist",
      "Research Manager",
      "Head of AI Research"
    ],
    "adjacentRoles": [
      "Applied Scientist",
      "Staff ML Engineer",
      "GenAI/LLM Engineer",
      "AI Product Manager"
    ],
    "topCompanies": [
      "Google DeepMind India",
      "Microsoft Research India",
      "Amazon Science India",
      "Adobe Research Bangalore",
      "Wadhwani AI",
      "AI4Bharat",
      "IIT/IISc collaborative labs",
      "Samsung Research India"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "analytics-lead",
    "title": "Analytics Lead",
    "domain": "Data & AI",
    "archetype": "consumer",
    "level": "lead",
    "description": "Manages a team of 4-8 analysts and owns the analytics function for a business unit (e.g., growth, supply, monetisation). Sets the analytical strategy, defines KPI frameworks, drives experimentation culture, and presents insights to senior leadership. Often the first people-manager role in an analytics career.",
    "ctc": {
      "low": 28,
      "median": 45,
      "high": 70
    },
    "coreSkills": [
      "Team management & hiring",
      "Strategic thinking & business acumen",
      "Executive communication",
      "Advanced SQL & Python",
      "Experimentation (A/B, holdout, switchback)",
      "KPI framework design",
      "Cross-functional stakeholder management"
    ],
    "niceToHave": [
      "Product sense",
      "ML model interpretation",
      "Data infrastructure decisions",
      "OKR design",
      "MBA (bonus, not required)"
    ],
    "growthRoles": [
      "Head of Analytics",
      "Head of Data",
      "Director of Data Science",
      "VP of Analytics"
    ],
    "adjacentRoles": [
      "Product Manager (Senior)",
      "Strategy Manager",
      "Growth Lead",
      "Data Science Manager"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Meesho",
      "Flipkart",
      "PhonePe",
      "Zepto",
      "Blinkit",
      "Dream11",
      "CRED"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "head-of-data",
    "title": "Head of Data",
    "domain": "Data & AI",
    "archetype": "fintech",
    "level": "director",
    "description": "Owns the entire data function — analytics, data engineering, data science, and sometimes ML platform — for a company or large business unit. Sets data strategy, builds the team, drives data democratisation initiatives, and ensures governance and compliance. Key hire for Series B+ startups.",
    "ctc": {
      "low": 60,
      "median": 90,
      "high": 150
    },
    "coreSkills": [
      "Org building & people management",
      "Data strategy & architecture decisions",
      "Executive stakeholder alignment",
      "Data governance & compliance (India DPDP)",
      "Budget ownership",
      "Cross-functional leadership",
      "Business acumen"
    ],
    "niceToHave": [
      "P&L ownership",
      "ML / AI product strategy",
      "Board / investor communication",
      "Data monetisation",
      "Prior startup experience"
    ],
    "growthRoles": [
      "VP of Data & AI",
      "Chief Data Officer (CDO)",
      "Chief Analytics Officer",
      "VP of Engineering"
    ],
    "adjacentRoles": [
      "VP of Engineering",
      "Chief Product Officer",
      "VP of AI",
      "Strategy Director"
    ],
    "topCompanies": [
      "Razorpay",
      "CRED",
      "Groww",
      "PhonePe",
      "Paytm",
      "Zepto",
      "Juspay",
      "Slice",
      "BharatPe",
      "Urban Company"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "mlops-ai-platform-engineer",
    "title": "MLOps / AI Platform Engineer",
    "domain": "Data & AI",
    "archetype": "ai-infra",
    "level": "mid",
    "description": "Specialises in the operational infrastructure for ML — CI/CD pipelines for model training and deployment, model monitoring, drift detection, and the internal ML platform that data scientists and ML engineers consume. Growing fast as Indian product companies industrialise AI.",
    "ctc": {
      "low": 14,
      "median": 25,
      "high": 45
    },
    "coreSkills": [
      "Kubernetes / Docker",
      "MLflow / Kubeflow / Metaflow / ZenML",
      "CI/CD (GitHub Actions, ArgoCD)",
      "Model monitoring (Evidently, Arize, Grafana)",
      "Python",
      "Cloud (AWS SageMaker / GCP Vertex AI)",
      "Infrastructure as Code (Terraform)"
    ],
    "niceToHave": [
      "Ray / Dask distributed computing",
      "Feature store (Feast, Tecton)",
      "LLM serving optimisation (vLLM, TGI)",
      "Prometheus / OpenTelemetry",
      "Spark"
    ],
    "growthRoles": [
      "Senior MLOps Engineer",
      "ML Platform Lead",
      "Staff ML Engineer",
      "Data Engineering Manager"
    ],
    "adjacentRoles": [
      "Senior ML Engineer",
      "DevOps / SRE",
      "Data Engineer",
      "Platform Engineering Manager"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon",
      "Microsoft",
      "Swiggy",
      "PhonePe",
      "Razorpay",
      "Sarvam AI",
      "Krutrim",
      "Juspay"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "ui-designer",
    "title": "UI Designer",
    "domain": "Design",
    "archetype": "consumer",
    "level": "entry",
    "description": "Creates visual interfaces for digital products, translating wireframes and UX flows into polished, pixel-perfect screens. Works closely with product and engineering teams to ensure visual consistency across web and mobile platforms. Responsible for component-level UI, icon sets, and maintaining brand guidelines within the product.",
    "ctc": {
      "low": 4,
      "median": 6,
      "high": 9
    },
    "coreSkills": [
      "Figma",
      "Visual Design",
      "Typography",
      "Color Theory",
      "Responsive Design",
      "Component Libraries",
      "Prototyping",
      "Design Handoff (Zeplin/Figma Dev Mode)"
    ],
    "niceToHave": [
      "Motion Design basics",
      "Accessibility (WCAG)",
      "Tailwind/CSS basics",
      "Framer"
    ],
    "growthRoles": [
      "UX Designer",
      "Product Designer",
      "Visual/Brand Designer"
    ],
    "adjacentRoles": [
      "Graphic Designer",
      "Web Designer",
      "Frontend Developer"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Meesho",
      "Groww",
      "PhonePe",
      "Razorpay",
      "Freshworks",
      "Infosys BPM",
      "Wipro Digital"
    ],
    "demand": "high",
    "moneyPotential": "steady"
  },
  {
    "id": "ux-designer",
    "title": "UX Designer",
    "domain": "Design",
    "archetype": "consumer",
    "level": "mid",
    "description": "Owns the end-to-end user experience for product features — from discovery and user flows to wireframes and usability testing. Conducts heuristic evaluations, journey mapping, and collaborates with UX researchers to translate insights into intuitive product experiences. Bridges user needs with business objectives and technical constraints.",
    "ctc": {
      "low": 7,
      "median": 12,
      "high": 20
    },
    "coreSkills": [
      "User Research",
      "Wireframing",
      "Information Architecture",
      "User Journey Mapping",
      "Usability Testing",
      "Figma",
      "Interaction Design",
      "Stakeholder Communication"
    ],
    "niceToHave": [
      "Quantitative Research",
      "SQL basics",
      "Accessibility audits",
      "Design Ops"
    ],
    "growthRoles": [
      "Senior UX Designer",
      "Product Designer",
      "UX Researcher"
    ],
    "adjacentRoles": [
      "Product Manager",
      "Content Designer",
      "UI Designer"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon India",
      "Paytm",
      "CRED",
      "Dunzo",
      "Navi Technologies",
      "MakeMyTrip",
      "Byju's",
      "Zepto"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "product-designer",
    "title": "Product Designer",
    "domain": "Design",
    "archetype": "consumer",
    "level": "mid",
    "description": "Drives end-to-end product design — owning the full design lifecycle from problem definition and user research to high-fidelity UI and shipping. Acts as the primary design owner for one or more product squads, balancing user outcomes with business KPIs. Highly valued in product-led startups where designers ship independently.",
    "ctc": {
      "low": 10,
      "median": 18,
      "high": 28
    },
    "coreSkills": [
      "Product Thinking",
      "End-to-end UX/UI",
      "Figma",
      "A/B Testing",
      "User Research",
      "Design Critique",
      "Metrics Awareness",
      "Cross-functional Collaboration"
    ],
    "niceToHave": [
      "Growth Design",
      "Data Visualization",
      "Framer",
      "AI-assisted Design (Galileo/Uizard)"
    ],
    "growthRoles": [
      "Senior Product Designer",
      "Design Lead",
      "Product Manager"
    ],
    "adjacentRoles": [
      "UX Designer",
      "Product Manager",
      "Design Strategist"
    ],
    "topCompanies": [
      "Razorpay",
      "CRED",
      "PhonePe",
      "Zepto",
      "Groww",
      "Juspay",
      "slice",
      "BrowserStack",
      "Chargebee"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-product-designer",
    "title": "Senior Product Designer",
    "domain": "Design",
    "archetype": "fintech",
    "level": "senior",
    "description": "Leads design for complex, high-impact product areas with significant autonomy. Sets design quality benchmarks, mentors junior designers, and drives alignment with product strategy. Represents design in cross-functional leadership forums. Expected to proactively identify UX debt and own systemic design improvements beyond assigned features.",
    "ctc": {
      "low": 18,
      "median": 26,
      "high": 38
    },
    "coreSkills": [
      "System-level Thinking",
      "Design Leadership",
      "Complex UX Patterns",
      "Stakeholder Management",
      "Mentoring",
      "OKR-linked Design",
      "Design Critique",
      "Figma Advanced"
    ],
    "niceToHave": [
      "Design Ops",
      "0-to-1 Product Experience",
      "Quantitative UX Research",
      "AI product design"
    ],
    "growthRoles": [
      "Staff Designer",
      "Design Lead",
      "Design Manager"
    ],
    "adjacentRoles": [
      "Product Lead",
      "Principal Product Manager",
      "Head of UX Research"
    ],
    "topCompanies": [
      "Zepto",
      "PhonePe",
      "Groww",
      "Razorpay",
      "CRED",
      "Meesho",
      "Navi",
      "Juspay",
      "Lenskart"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "staff-designer",
    "title": "Staff Designer",
    "domain": "Design",
    "archetype": "b2b-saas",
    "level": "lead",
    "description": "An individual-contributor leadership track role responsible for cross-product design vision and consistency. Operates at the intersection of design systems, product strategy, and engineering architecture. Drives org-wide design standards, audits design debt across product lines, and serves as the internal design expert. Comparable to a Staff Engineer in influence without managing people.",
    "ctc": {
      "low": 28,
      "median": 38,
      "high": 55
    },
    "coreSkills": [
      "Design Systems",
      "Cross-functional Influence",
      "Design Strategy",
      "Figma Libraries",
      "Technical Fluency",
      "Design Ops",
      "Accessibility at Scale",
      "Executive Communication"
    ],
    "niceToHave": [
      "Product Strategy",
      "DesignOps tooling (Supernova/Zeroheight)",
      "AI design workflows",
      "Public design writing"
    ],
    "growthRoles": [
      "Principal Designer",
      "Head of Design",
      "Design Director"
    ],
    "adjacentRoles": [
      "Principal Engineer",
      "Engineering Manager",
      "Product Director"
    ],
    "topCompanies": [
      "Freshworks",
      "Razorpay",
      "Zepto",
      "BrowserStack",
      "Chargebee",
      "Postman",
      "Setu",
      "Khatabook"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "design-lead",
    "title": "Design Lead",
    "domain": "Design",
    "archetype": "consumer",
    "level": "lead",
    "description": "Leads a pod or squad of 3-6 designers, combining hands-on design work with team leadership. Owns design quality and delivery for a product vertical, while developing designers on the team. Sets the design vision for their area, advocates for users in product strategy discussions, and is accountable for design process and tooling within the squad.",
    "ctc": {
      "low": 22,
      "median": 32,
      "high": 48
    },
    "coreSkills": [
      "Team Leadership",
      "Design Delivery",
      "OKR Planning",
      "Mentoring & Feedback",
      "Stakeholder Alignment",
      "Roadmap Input",
      "Hiring",
      "Design Review"
    ],
    "niceToHave": [
      "P&L awareness",
      "DesignOps",
      "Cross-vertical Design",
      "Research program management"
    ],
    "growthRoles": [
      "Design Manager",
      "Head of Design",
      "Product Director"
    ],
    "adjacentRoles": [
      "Product Lead",
      "Engineering Lead",
      "Research Lead"
    ],
    "topCompanies": [
      "Flipkart",
      "Swiggy",
      "Zomato",
      "CRED",
      "Meesho",
      "Paytm",
      "Nykaa",
      "Urban Company",
      "Byju's"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "design-manager",
    "title": "Design Manager",
    "domain": "Design",
    "archetype": "consumer",
    "level": "director",
    "description": "Manages a team of 5-10 designers across product verticals. Primary focus is people management — hiring, performance, career growth, and culture — while also driving design strategy across their domain. Partners with product and engineering leadership on roadmap, resource planning, and org design. Accountable for design output across multiple squads.",
    "ctc": {
      "low": 28,
      "median": 40,
      "high": 60
    },
    "coreSkills": [
      "People Management",
      "Design Strategy",
      "Headcount Planning",
      "Performance Management",
      "Cross-org Alignment",
      "Design Operations",
      "Executive Stakeholder Management",
      "Hiring & Talent Development"
    ],
    "niceToHave": [
      "P&L Exposure",
      "Design Systems Ownership",
      "0-to-1 Product Experience",
      "Org Design"
    ],
    "growthRoles": [
      "Head of Design",
      "VP Design",
      "Chief Design Officer"
    ],
    "adjacentRoles": [
      "Product Director",
      "Engineering Manager",
      "Head of UX Research"
    ],
    "topCompanies": [
      "Amazon India",
      "Flipkart",
      "Swiggy",
      "Myntra",
      "PhonePe",
      "Razorpay",
      "Navi",
      "Ola",
      "InMobi"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "head-of-design",
    "title": "Head of Design",
    "domain": "Design",
    "archetype": "consumer",
    "level": "director",
    "description": "Owns the entire design function for a business unit or company, setting the design vision, culture, and org structure. Builds and scales design teams, defines design principles, and ensures cohesive product experience across all touchpoints. Sits at the leadership table alongside CPO and CTO, influencing product strategy at the highest level.",
    "ctc": {
      "low": 40,
      "median": 60,
      "high": 90
    },
    "coreSkills": [
      "Design Vision",
      "Org Building",
      "Executive Influence",
      "Brand & Product Design Alignment",
      "OKR Ownership",
      "Hiring Leadership",
      "Cross-functional Strategy",
      "Investor & Board Communication"
    ],
    "niceToHave": [
      "VC-backed startup experience",
      "0-to-1 product scaling",
      "Design for AI products",
      "Brand strategy"
    ],
    "growthRoles": [
      "VP Design",
      "Chief Design Officer",
      "CPO"
    ],
    "adjacentRoles": [
      "Chief Product Officer",
      "CMO",
      "VP Engineering"
    ],
    "topCompanies": [
      "CRED",
      "Zepto",
      "Groww",
      "Navi",
      "slice",
      "Urban Company",
      "Khatabook",
      "Juspay",
      "BrowserStack"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "vp-design",
    "title": "VP Design",
    "domain": "Design",
    "archetype": "consumer",
    "level": "vp",
    "description": "Executive design leader responsible for design across the entire company or a major business line. Defines multi-year design strategy, manages design budgets and org structure, and owns the relationship between design, product, brand, and growth. Typical in large-scale consumer tech or high-growth unicorns. Often has 3-4 direct reports who are themselves design managers or heads.",
    "ctc": {
      "low": 55,
      "median": 80,
      "high": 130
    },
    "coreSkills": [
      "Executive Leadership",
      "Design Strategy",
      "P&L Awareness",
      "Org Scaling",
      "Board-level Communication",
      "Brand Architecture",
      "Design Culture",
      "Talent Magnetism"
    ],
    "niceToHave": [
      "IPO/M&A exposure",
      "Design awards & external reputation",
      "International design team management",
      "AI product strategy"
    ],
    "growthRoles": [
      "Chief Design Officer",
      "CPO",
      "Independent Design Advisor"
    ],
    "adjacentRoles": [
      "Chief Product Officer",
      "Chief Marketing Officer",
      "CTO"
    ],
    "topCompanies": [
      "Flipkart",
      "Swiggy",
      "Razorpay",
      "PhonePe",
      "Myntra",
      "OYO",
      "Paytm",
      "Byju's",
      "Ola"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "ux-researcher",
    "title": "UX Researcher",
    "domain": "Design",
    "archetype": "consumer",
    "level": "mid",
    "description": "Conducts qualitative and quantitative user research to generate actionable insights for product teams. Methods include moderated usability testing, in-depth interviews, diary studies, surveys, and contextual inquiry. Collaborates closely with product designers and PMs to inform roadmap prioritization, validate hypotheses, and understand user mental models. Especially critical in consumer and fintech products with complex user journeys.",
    "ctc": {
      "low": 8,
      "median": 14,
      "high": 22
    },
    "coreSkills": [
      "Qualitative Research",
      "Usability Testing",
      "Survey Design",
      "User Interviews",
      "Affinity Mapping",
      "Insight Synthesis",
      "Research Reporting",
      "Dovetail/Maze/UserTesting"
    ],
    "niceToHave": [
      "Quantitative Research (SQL, Mixpanel)",
      "Eye-tracking",
      "Behavioral Economics",
      "Accessibility Research"
    ],
    "growthRoles": [
      "Senior UX Researcher",
      "Research Lead",
      "UX Strategist"
    ],
    "adjacentRoles": [
      "Product Designer",
      "Data Analyst",
      "Product Manager",
      "Behavioral Scientist"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon India",
      "Myntra",
      "Google India",
      "Microsoft India",
      "PhonePe",
      "Navi",
      "CRED",
      "Paytm"
    ],
    "demand": "medium",
    "moneyPotential": "medium"
  },
  {
    "id": "senior-ux-researcher",
    "title": "Senior UX Researcher",
    "domain": "Design",
    "archetype": "consumer",
    "level": "senior",
    "description": "Leads complex, multi-method research programs that shape product strategy. Independently scopes and executes large-scale studies — including longitudinal research, concept testing at 0-to-1 stage, and cross-product insights synthesis. Advocates for the research function's strategic value, builds research infrastructure (repositories, panels), and mentors junior researchers. Increasingly expected to translate research into product metrics.",
    "ctc": {
      "low": 18,
      "median": 28,
      "high": 45
    },
    "coreSkills": [
      "Mixed-methods Research",
      "Research Program Management",
      "Strategic Influence",
      "Insight Repository (Dovetail/EnjoyHQ)",
      "Executive Storytelling",
      "Longitudinal Studies",
      "Mentoring",
      "Research Ops"
    ],
    "niceToHave": [
      "Statistical Analysis (R/Python)",
      "Behavioral Science",
      "Research panel management",
      "AI-assisted synthesis tools"
    ],
    "growthRoles": [
      "Head of UX Research",
      "Research Director",
      "UX Strategist"
    ],
    "adjacentRoles": [
      "Senior Product Designer",
      "Product Director",
      "Data Scientist",
      "Design Manager"
    ],
    "topCompanies": [
      "Flipkart",
      "Amazon India",
      "Google India",
      "Microsoft India",
      "PhonePe",
      "Razorpay",
      "Navi",
      "Myntra",
      "Swiggy"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "design-systems-designer",
    "title": "Design Systems Designer",
    "domain": "Design",
    "archetype": "b2b-saas",
    "level": "senior",
    "description": "Builds and maintains the company's design system — a shared library of components, patterns, tokens, and guidelines used across all product surfaces. Works at the intersection of design and engineering, ensuring components are accessible, well-documented, and developer-ready. Partners with frontend engineers to create Storybook integrations and token pipelines. Critical in scaling companies to ensure visual and interaction consistency.",
    "ctc": {
      "low": 14,
      "median": 22,
      "high": 36
    },
    "coreSkills": [
      "Figma Components & Variants",
      "Design Tokens",
      "Accessibility (WCAG)",
      "Component Documentation",
      "Storybook",
      "Token pipelines (Style Dictionary)",
      "Engineering Collaboration",
      "Pattern Library Governance"
    ],
    "niceToHave": [
      "React basics",
      "Supernova/Zeroheight",
      "Design Ops",
      "Theming for multi-brand systems"
    ],
    "growthRoles": [
      "Staff Designer",
      "Design Ops Lead",
      "Principal Designer"
    ],
    "adjacentRoles": [
      "Frontend Engineer",
      "UI Designer",
      "Design Ops Manager"
    ],
    "topCompanies": [
      "Freshworks",
      "Razorpay",
      "BrowserStack",
      "Chargebee",
      "Postman",
      "Zoho",
      "Setu",
      "Meesho",
      "Zepto"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "interaction-designer",
    "title": "Interaction Designer",
    "domain": "Design",
    "archetype": "ai-infra",
    "level": "senior",
    "description": "Specializes in the design of complex interaction models — micro-interactions, motion flows, advanced gestures, voice UI, and emerging paradigms like AI conversational interfaces. Bridges the gap between static UI and dynamic, behavioral product experiences. Works closely with prototyping-heavy teams and is frequently embedded in AI product or developer tools teams where interaction complexity is high.",
    "ctc": {
      "low": 12,
      "median": 20,
      "high": 34
    },
    "coreSkills": [
      "Interaction Patterns",
      "Prototyping (Protopie/Principle/Framer)",
      "Motion Design",
      "Micro-interaction Design",
      "Figma Advanced",
      "Voice & Conversational UI",
      "Accessibility",
      "Behavioral Design"
    ],
    "niceToHave": [
      "AI/LLM interface design",
      "AR/VR interaction",
      "Haptic design",
      "Hardware interaction design"
    ],
    "growthRoles": [
      "Senior Product Designer",
      "Staff Designer",
      "Head of Design"
    ],
    "adjacentRoles": [
      "Motion Designer",
      "UI Designer",
      "Product Designer",
      "AR/VR Designer"
    ],
    "topCompanies": [
      "Google India",
      "Microsoft India",
      "Adobe India",
      "Flipkart",
      "Juspay",
      "Postman",
      "BrowserStack",
      "InMobi",
      "Dunzo"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "visual-brand-designer",
    "title": "Visual / Brand Designer",
    "domain": "Design",
    "archetype": "consumer",
    "level": "mid",
    "description": "Owns the visual language and brand identity expression within digital and offline touchpoints. Responsible for campaign visuals, brand guidelines, marketing design, and ensuring brand consistency across the product. Works at the intersection of marketing and product design — often embedded in growth or marketing teams. In startups, frequently handles both brand identity creation and execution.",
    "ctc": {
      "low": 5,
      "median": 9,
      "high": 16
    },
    "coreSkills": [
      "Brand Identity",
      "Graphic Design",
      "Adobe Creative Suite",
      "Figma",
      "Typography",
      "Campaign Design",
      "Illustration",
      "Marketing Collateral Design"
    ],
    "niceToHave": [
      "Motion Graphics",
      "3D Design (Blender/C4D)",
      "Social Media Design",
      "Photography/Art Direction"
    ],
    "growthRoles": [
      "Senior Visual Designer",
      "Brand Lead",
      "Creative Director"
    ],
    "adjacentRoles": [
      "UI Designer",
      "Marketing Manager",
      "Content Designer",
      "Motion Designer"
    ],
    "topCompanies": [
      "Nykaa",
      "Myntra",
      "Urban Company",
      "Swiggy",
      "Zomato",
      "Meesho",
      "Lenskart",
      "boAt",
      "Moj"
    ],
    "demand": "high",
    "moneyPotential": "steady"
  },
  {
    "id": "content-designer-ux-writer",
    "title": "Content Designer / UX Writer",
    "domain": "Design",
    "archetype": "fintech",
    "level": "mid",
    "description": "Crafts product copy — button labels, error messages, onboarding flows, tooltips, empty states, and microcopy — to make products clear, conversational, and trustworthy. Deeply embedded with product design and PM teams to ensure content and UI work as a unified system. Especially critical in fintech and healthtech where regulatory clarity and user trust are paramount. Increasingly responsible for AI conversational UX copy.",
    "ctc": {
      "low": 7,
      "median": 12,
      "high": 20
    },
    "coreSkills": [
      "Microcopy & UX Writing",
      "Content Strategy",
      "Tone of Voice",
      "Figma (content annotations)",
      "User Research Collaboration",
      "Content Audits",
      "Accessibility Writing",
      "Localization Awareness"
    ],
    "niceToHave": [
      "Conversational AI / Chatbot Writing",
      "SEO basics",
      "Hindi/regional language UX",
      "CMS tooling"
    ],
    "growthRoles": [
      "Senior UX Writer",
      "Content Strategist",
      "Head of Content Design"
    ],
    "adjacentRoles": [
      "Product Designer",
      "Product Manager",
      "Brand Copywriter",
      "Localization Specialist"
    ],
    "topCompanies": [
      "PhonePe",
      "Razorpay",
      "CRED",
      "Navi",
      "Groww",
      "slice",
      "Juspay",
      "Paytm",
      "Jupiter Money"
    ],
    "demand": "medium",
    "moneyPotential": "medium"
  },
  {
    "id": "motion-designer",
    "title": "Motion Designer",
    "domain": "Design",
    "archetype": "consumer",
    "level": "mid",
    "description": "Creates motion graphics, animated UI transitions, loading states, brand films, and product storytelling videos. Works at the intersection of brand and product — crafting animations that delight users and reinforce brand personality. In consumer apps, motion design drives engagement and retention. Also responsible for social media video content, app store previews, and onboarding animations.",
    "ctc": {
      "low": 4,
      "median": 8,
      "high": 16
    },
    "coreSkills": [
      "After Effects",
      "Lottie/Rive",
      "Figma (Smart Animate)",
      "Motion Principles",
      "Video Editing",
      "Storyboarding",
      "Brand Animation",
      "Protopie"
    ],
    "niceToHave": [
      "3D Animation (Blender/Cinema 4D)",
      "Spline",
      "Sound Design basics",
      "AR Filter design"
    ],
    "growthRoles": [
      "Senior Motion Designer",
      "Creative Director",
      "Brand Lead"
    ],
    "adjacentRoles": [
      "Visual Designer",
      "Video Producer",
      "Interactive Designer",
      "AR/VR Designer"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Myntra",
      "Nykaa",
      "Meesho",
      "boAt",
      "Moj",
      "ShareChat",
      "Dream11"
    ],
    "demand": "medium",
    "moneyPotential": "steady"
  },
  {
    "id": "growth-marketer",
    "title": "Growth Marketer",
    "domain": "Growth & GTM",
    "archetype": "consumer",
    "level": "entry",
    "description": "Drives top-of-funnel and activation experiments across paid, organic, and product channels. Owns A/B tests, funnel analytics, and iterates rapidly on growth loops. Typically first growth hire at early-stage startups or junior member on growth teams at Series A/B companies.",
    "ctc": {
      "low": 6,
      "median": 10,
      "high": 16
    },
    "coreSkills": [
      "Growth experimentation",
      "Funnel analytics (Mixpanel/Amplitude)",
      "A/B testing",
      "SQL basics",
      "Meta & Google Ads basics",
      "Retention frameworks (AARRR)"
    ],
    "niceToHave": [
      "Product sense",
      "Python for data pulls",
      "CRO",
      "App marketing (Firebase/AppsFlyer)"
    ],
    "growthRoles": [
      "Performance Marketing Manager",
      "Growth Lead",
      "Product Marketing Manager"
    ],
    "adjacentRoles": [
      "Product Analyst",
      "Digital Marketing Executive",
      "Marketing Analyst"
    ],
    "topCompanies": [
      "Swiggy",
      "Zepto",
      "CRED",
      "Razorpay",
      "Meesho",
      "Groww",
      "Jar",
      "Freo"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "performance-marketing-manager",
    "title": "Performance Marketing Manager",
    "domain": "Growth & GTM",
    "archetype": "consumer",
    "level": "mid",
    "description": "Manages paid acquisition across Google, Meta, YouTube, and programmatic channels. Owns CAC, ROAS, and budget allocation across performance channels. Works closely with creative and data teams to optimise campaigns at scale.",
    "ctc": {
      "low": 12,
      "median": 18,
      "high": 28
    },
    "coreSkills": [
      "Google Ads & Meta Ads (Expert)",
      "Attribution (AppsFlyer/Branch)",
      "Budget management",
      "Creative strategy",
      "Bid optimisation",
      "UA for apps"
    ],
    "niceToHave": [
      "Programmatic DSPs",
      "Influencer ROI measurement",
      "MMPs",
      "SQL"
    ],
    "growthRoles": [
      "Senior Performance Marketing Manager",
      "Head of Performance Marketing",
      "Growth Lead"
    ],
    "adjacentRoles": [
      "Growth Marketer",
      "Marketing Analyst",
      "Media Planner"
    ],
    "topCompanies": [
      "PhonePe",
      "CRED",
      "Swiggy",
      "Zomato",
      "Dream11",
      "Paytm",
      "Myntra",
      "boAt"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "seo-content-lead",
    "title": "SEO & Content Lead",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Owns organic search strategy and content production pipeline. Drives non-paid acquisition through technical SEO, topical authority, and programmatic content. Increasingly critical in AI-era search with SGE and LLM-driven discovery changing traffic dynamics.",
    "ctc": {
      "low": 10,
      "median": 15,
      "high": 22
    },
    "coreSkills": [
      "Technical SEO (Core Web Vitals, schema)",
      "Keyword research",
      "Content strategy",
      "Editorial management",
      "Ahrefs/SEMrush",
      "Analytics (GA4/GSC)"
    ],
    "niceToHave": [
      "Programmatic SEO",
      "Python for crawl analysis",
      "CMS (WordPress/Webflow)",
      "Link building"
    ],
    "growthRoles": [
      "Head of SEO",
      "Head of Content",
      "Growth Lead",
      "VP Marketing"
    ],
    "adjacentRoles": [
      "Content Marketing Manager",
      "Product Marketing Manager",
      "Digital Marketing Manager"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Cleartax",
      "Zoho",
      "Learnapp",
      "Kredivo",
      "Unacademy"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "brand-manager",
    "title": "Brand Manager",
    "domain": "Growth & GTM",
    "archetype": "consumer",
    "level": "mid",
    "description": "Owns brand identity, positioning, and campaign strategy for a product or category. Manages ATL/BTL/digital campaigns and agencies. Drives brand health metrics (awareness, NPS, recall) while collaborating with performance and product teams.",
    "ctc": {
      "low": 10,
      "median": 16,
      "high": 24
    },
    "coreSkills": [
      "Brand strategy",
      "Campaign management",
      "Consumer insights",
      "Agency management",
      "Media planning",
      "Creative briefing"
    ],
    "niceToHave": [
      "Influencer marketing",
      "PR",
      "Brand tracking tools",
      "D2C experience"
    ],
    "growthRoles": [
      "Senior Brand Manager",
      "Head of Brand",
      "VP Marketing"
    ],
    "adjacentRoles": [
      "Product Marketing Manager",
      "Performance Marketing Manager",
      "Category Manager"
    ],
    "topCompanies": [
      "Mamaearth",
      "boAt",
      "Nykaa",
      "Lenskart",
      "Noise",
      "Wakefit",
      "mCaffeine",
      "Sugar Cosmetics"
    ],
    "demand": "medium",
    "moneyPotential": "medium"
  },
  {
    "id": "product-marketing-manager",
    "title": "Product Marketing Manager",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Owns go-to-market strategy for product launches, positioning, and messaging. Bridges product and commercial teams by translating features into customer value propositions. Produces competitive intelligence, sales enablement, and segment-level messaging frameworks.",
    "ctc": {
      "low": 14,
      "median": 20,
      "high": 30
    },
    "coreSkills": [
      "GTM strategy",
      "Positioning & messaging",
      "Competitive analysis",
      "Sales enablement",
      "Product launch management",
      "Market research"
    ],
    "niceToHave": [
      "Pricing strategy",
      "Win/loss analysis",
      "Analyst relations",
      "Customer interview frameworks"
    ],
    "growthRoles": [
      "Senior PMM",
      "Group PMM",
      "Head of Product Marketing",
      "VP Marketing"
    ],
    "adjacentRoles": [
      "Product Manager",
      "Growth Lead",
      "Brand Manager",
      "Demand Gen Manager"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Zoho",
      "Chargebee",
      "Postman",
      "BrowserStack",
      "Leadsquared",
      "Slintel"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-product-marketing-manager",
    "title": "Senior Product Marketing Manager",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "senior",
    "description": "Leads GTM for a product line or customer segment independently. Sets messaging strategy across ICP segments, owns competitive battlecards, drives analyst relations, and coaches junior PMMs. Often the most senior individual contributor before PMM management tracks.",
    "ctc": {
      "low": 22,
      "median": 32,
      "high": 45
    },
    "coreSkills": [
      "Strategic messaging",
      "Segment GTM ownership",
      "Analyst & PR relations",
      "Revenue enablement",
      "Pricing inputs",
      "Cross-functional leadership"
    ],
    "niceToHave": [
      "ABM strategy",
      "International market expansion",
      "Category creation",
      "PLG motion experience"
    ],
    "growthRoles": [
      "Head of Product Marketing",
      "VP Marketing",
      "Group Product Manager"
    ],
    "adjacentRoles": [
      "Product Director",
      "Demand Generation Lead",
      "Revenue Enablement Lead"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Chargebee",
      "CleverTap",
      "WebEngage",
      "MoEngage",
      "Hasura",
      "Postman"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "growth-lead",
    "title": "Growth Lead",
    "domain": "Growth & GTM",
    "archetype": "consumer",
    "level": "lead",
    "description": "Owns the full growth funnel from acquisition to retention for a product or business unit. Manages a small team of growth marketers and analysts, runs structured experiment programs, and directly influences north star metric (DAU/MAU, GMV, revenue). Common title at Series B–D startups.",
    "ctc": {
      "low": 25,
      "median": 38,
      "high": 55
    },
    "coreSkills": [
      "Full-funnel growth ownership",
      "Experimentation programs",
      "Team leadership",
      "Product-led growth",
      "Retention & lifecycle",
      "Data-driven decision making"
    ],
    "niceToHave": [
      "Referral & viral loops",
      "Pricing experiments",
      "Growth engineering collaboration",
      "International expansion"
    ],
    "growthRoles": [
      "Head of Growth",
      "Head of Marketing",
      "VP Growth",
      "Chief Growth Officer"
    ],
    "adjacentRoles": [
      "Group Product Manager",
      "Head of Revenue",
      "Marketing Director"
    ],
    "topCompanies": [
      "Meesho",
      "Groww",
      "CRED",
      "Zepto",
      "Slice",
      "Khatabook",
      "OkCredit",
      "Ola"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "head-of-marketing",
    "title": "Head of Marketing",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "director",
    "description": "Leads the entire marketing function across brand, performance, content, and product marketing. Sets annual marketing strategy, owns marketing budget, and reports to CEO or CMO. Accountable for pipeline contribution, CAC targets, and brand health at Series B–D or mid-size companies.",
    "ctc": {
      "low": 35,
      "median": 55,
      "high": 80
    },
    "coreSkills": [
      "Marketing strategy",
      "Budget ownership",
      "Team building & management",
      "Pipeline generation",
      "Brand + performance balance",
      "Board reporting"
    ],
    "niceToHave": [
      "International GTM",
      "PLG + SLG hybrid motions",
      "Category creation",
      "PR & comms oversight"
    ],
    "growthRoles": [
      "VP Marketing",
      "CMO",
      "Chief Growth Officer"
    ],
    "adjacentRoles": [
      "VP Product",
      "Chief Business Officer",
      "VP Sales"
    ],
    "topCompanies": [
      "Razorpay",
      "Leadsquared",
      "Zoho",
      "Freshworks",
      "Urban Company",
      "BlackBuck",
      "Delhivery",
      "Zetwerk"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "chief-marketing-officer-cmo",
    "title": "Chief Marketing Officer (CMO)",
    "domain": "Growth & GTM",
    "archetype": "consumer",
    "level": "exec",
    "description": "Executive owner of all marketing and growth functions. Defines market positioning, brand architecture, and GTM for the entire company. Sits on leadership team, influences product roadmap, drives investor narrative, and is accountable for revenue-generating marketing at unicorn or late-stage startups.",
    "ctc": {
      "low": 60,
      "median": 100,
      "high": 200
    },
    "coreSkills": [
      "C-suite leadership",
      "Full-funnel revenue marketing",
      "Brand building at scale",
      "M&A marketing due diligence",
      "Investor communications",
      "Org design"
    ],
    "niceToHave": [
      "IPO/growth equity experience",
      "Global brand building",
      "PR/crisis management",
      "Board presentation"
    ],
    "growthRoles": [
      "Founder",
      "CEO (via GCO track)",
      "Chief Growth Officer"
    ],
    "adjacentRoles": [
      "Chief Revenue Officer",
      "Chief Product Officer",
      "Chief Business Officer"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Paytm",
      "PhonePe",
      "BYJU's",
      "Ola",
      "Nykaa",
      "Meesho"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "sales-development-representative-sdr-bdr",
    "title": "Sales Development Representative (SDR/BDR)",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "entry",
    "description": "Generates qualified pipeline for Account Executives through outbound prospecting (cold email, LinkedIn, calls) and inbound lead qualification. Owns meeting-booked and SQL metrics. First sales role in a SaaS/B2B company; fast track to AE for high performers.",
    "ctc": {
      "low": 5,
      "median": 8,
      "high": 14
    },
    "coreSkills": [
      "Outbound prospecting",
      "Cold email & calling",
      "CRM (Salesforce/HubSpot)",
      "LinkedIn Sales Navigator",
      "Objection handling",
      "Pipeline hygiene"
    ],
    "niceToHave": [
      "Sales engagement tools (Outreach/Apollo)",
      "ICP research",
      "Basic SaaS product knowledge",
      "Multilingual outreach"
    ],
    "growthRoles": [
      "Account Executive",
      "Senior SDR",
      "Sales Team Lead"
    ],
    "adjacentRoles": [
      "Inside Sales Executive",
      "Customer Success Manager",
      "Pre-Sales Consultant"
    ],
    "topCompanies": [
      "Freshworks",
      "Leadsquared",
      "Salesforce India",
      "Zoho",
      "Postman",
      "Chargebee",
      "CleverTap",
      "Wingify"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "account-executive-ae",
    "title": "Account Executive (AE)",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Owns the full sales cycle from discovery to close for mid-market or enterprise accounts. Runs product demos, negotiates contracts, and manages stakeholders. Quota-carrying role with significant variable pay tied to ARR closed. Core commercial engine of any B2B SaaS company.",
    "ctc": {
      "low": 12,
      "median": 20,
      "high": 35
    },
    "coreSkills": [
      "Full-cycle sales",
      "Solution selling / MEDDIC",
      "Demo & storytelling",
      "Contract negotiation",
      "CRM discipline",
      "Stakeholder management"
    ],
    "niceToHave": [
      "Enterprise procurement navigation",
      "Technical product fluency",
      "MEDDPICC",
      "Channel partner selling"
    ],
    "growthRoles": [
      "Senior AE",
      "Sales Manager",
      "Enterprise AE",
      "Sales Team Lead"
    ],
    "adjacentRoles": [
      "Customer Success Manager",
      "Pre-Sales / Solutions Engineer",
      "Partnerships Manager"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Zoho",
      "Salesforce India",
      "Postman",
      "BrowserStack",
      "Chargebee",
      "MoEngage"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "sales-manager",
    "title": "Sales Manager",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "senior",
    "description": "Manages a team of 5-10 AEs/SDRs, owns team quota, and drives forecast accuracy. Runs deal reviews, coaches reps on methodology, and maintains pipeline health. First people-management role in the sales track; critical for scaling revenue predictably at Series B+.",
    "ctc": {
      "low": 20,
      "median": 32,
      "high": 50
    },
    "coreSkills": [
      "Sales team management",
      "Pipeline forecasting",
      "Deal coaching",
      "Quota setting",
      "Hiring AEs/SDRs",
      "Sales process design"
    ],
    "niceToHave": [
      "Sales compensation design",
      "CRM admin",
      "Revenue intelligence tools (Gong/Clari)",
      "Cross-functional GTM alignment"
    ],
    "growthRoles": [
      "Sales Director",
      "VP Sales",
      "Regional Sales Head"
    ],
    "adjacentRoles": [
      "Revenue Operations Manager",
      "Customer Success Lead",
      "Business Development Manager"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Zoho",
      "Leadsquared",
      "Darwinbox",
      "Exotel",
      "Cleartax",
      "BrowserStack"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "sales-director",
    "title": "Sales Director",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "director",
    "description": "Owns a regional or segment (SMB/Mid-Market/Enterprise) revenue number. Manages multiple sales managers, sets go-to-market execution strategy, and partners with marketing on demand gen and pipeline. Directly accountable to VP Sales for ARR targets at growth-stage companies.",
    "ctc": {
      "low": 35,
      "median": 55,
      "high": 85
    },
    "coreSkills": [
      "Revenue ownership",
      "Multi-team sales management",
      "Territory strategy",
      "Executive stakeholder selling",
      "Forecasting & reporting",
      "Hiring & talent development"
    ],
    "niceToHave": [
      "Enterprise account strategy",
      "Channel/partner GTM",
      "International expansion",
      "PLG+SLG hybrid experience"
    ],
    "growthRoles": [
      "VP Sales",
      "Chief Revenue Officer",
      "GM - Business Unit"
    ],
    "adjacentRoles": [
      "VP Customer Success",
      "VP Revenue Operations",
      "Chief Business Officer"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Zoho",
      "Darwinbox",
      "Chargebee",
      "Postman",
      "CleverTap",
      "Exotel"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "vp-sales",
    "title": "VP Sales",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "vp",
    "description": "Executive responsible for the entire sales organisation and ARR growth. Designs sales compensation, territory plans, and team structure. Partners with CEO and CRO on pricing, packaging, and GTM strategy. Owns revenue forecast and investor-level metrics at Series C/D+ companies.",
    "ctc": {
      "low": 60,
      "median": 100,
      "high": 180
    },
    "coreSkills": [
      "Revenue strategy",
      "Sales org design",
      "Executive selling",
      "Board-level reporting",
      "Compensation design",
      "GTM planning"
    ],
    "niceToHave": [
      "PLG-assisted sales motion",
      "International expansion",
      "M&A integration",
      "Analyst relations (Gartner/Forrester)"
    ],
    "growthRoles": [
      "Chief Revenue Officer",
      "CEO (GTM-founder path)",
      "Chief Business Officer"
    ],
    "adjacentRoles": [
      "CMO",
      "VP Customer Success",
      "Chief Product Officer"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Zoho",
      "Darwinbox",
      "BrowserStack",
      "Chargebee",
      "MoEngage",
      "Postman"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "customer-success-manager-csm",
    "title": "Customer Success Manager (CSM)",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Owns post-sales relationship for a portfolio of accounts. Drives product adoption, reduces churn, and identifies expansion/upsell opportunities. Tracks health scores, runs QBRs, and is the internal voice of the customer. Net Revenue Retention (NRR) is the primary success metric.",
    "ctc": {
      "low": 8,
      "median": 14,
      "high": 22
    },
    "coreSkills": [
      "Account management",
      "Onboarding & adoption",
      "QBR facilitation",
      "Churn prediction",
      "Product knowledge",
      "CRM/CS tools (Gainsight/Totango)"
    ],
    "niceToHave": [
      "Upsell/expansion selling",
      "Technical product fluency",
      "Data analysis",
      "CSQL process"
    ],
    "growthRoles": [
      "Senior CSM",
      "CS Team Lead",
      "Customer Success Lead",
      "Partnerships Manager"
    ],
    "adjacentRoles": [
      "Account Executive",
      "Implementation Manager",
      "Product Specialist",
      "Solutions Consultant"
    ],
    "topCompanies": [
      "Freshworks",
      "Zoho",
      "Chargebee",
      "CleverTap",
      "WebEngage",
      "Leadsquared",
      "MoEngage",
      "BrowserStack"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "customer-success-lead",
    "title": "Customer Success Lead",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "lead",
    "description": "Manages a team of CSMs and owns a segment-level NRR and GRR target. Builds CS playbooks, defines health score models, and partners with Product on feature feedback loops. Bridges CSMs with Sales on expansion motions and with Engineering on escalation paths.",
    "ctc": {
      "low": 20,
      "median": 32,
      "high": 50
    },
    "coreSkills": [
      "CS team management",
      "NRR/GRR ownership",
      "Playbook design",
      "Escalation management",
      "Retention strategy",
      "Revenue forecasting"
    ],
    "niceToHave": [
      "CS platform administration (Gainsight)",
      "Customer community building",
      "Success-qualified lead (SQL) programs",
      "Executive relationship management"
    ],
    "growthRoles": [
      "VP Customer Success",
      "Head of Customer Success",
      "Chief Customer Officer"
    ],
    "adjacentRoles": [
      "VP Sales",
      "Director of Professional Services",
      "Head of Partnerships"
    ],
    "topCompanies": [
      "Freshworks",
      "Chargebee",
      "Postman",
      "CleverTap",
      "Darwinbox",
      "MoEngage",
      "Exotel",
      "Slintel"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "partnerships-manager",
    "title": "Partnerships Manager",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Builds and manages technology, channel, and strategic partnerships that drive revenue and distribution. Identifies co-sell and reseller opportunities, negotiates partnership agreements, and tracks partner-influenced pipeline. Increasingly important in ecosystem-led growth strategies.",
    "ctc": {
      "low": 12,
      "median": 18,
      "high": 28
    },
    "coreSkills": [
      "Partnership development",
      "Commercial negotiation",
      "Ecosystem mapping",
      "Co-sell programs",
      "Partner onboarding",
      "CRM for partner tracking"
    ],
    "niceToHave": [
      "API/integration ecosystem knowledge",
      "SI/GSI relationship management",
      "Marketplace listing (AWS/Salesforce AppExchange)",
      "Alliance strategy"
    ],
    "growthRoles": [
      "Head of Partnerships",
      "VP Alliances",
      "VP Business Development",
      "GM - Ecosystem"
    ],
    "adjacentRoles": [
      "Account Executive",
      "Customer Success Manager",
      "Product Marketing Manager",
      "BD Manager"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Zoho",
      "Postman",
      "Chargebee",
      "BrowserStack",
      "Leadsquared",
      "Sigmoid"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "revenue-operations-manager",
    "title": "Revenue Operations Manager",
    "domain": "Growth & GTM",
    "archetype": "b2b-saas",
    "level": "senior",
    "description": "Owns the data, tooling, and process infrastructure that makes the GTM machine run. Manages CRM hygiene, sales/marketing/CS tech stack, attribution models, and revenue reporting. Enables leadership to forecast accurately and identifies inefficiencies in the funnel. One of the fastest-growing roles in Indian B2B SaaS.",
    "ctc": {
      "low": 15,
      "median": 24,
      "high": 38
    },
    "coreSkills": [
      "CRM administration (Salesforce/HubSpot)",
      "Revenue analytics",
      "Sales process design",
      "Data pipeline management",
      "Dashboard building (Looker/Tableau)",
      "Attribution modelling"
    ],
    "niceToHave": [
      "SQL & dbt",
      "Marketing automation (Marketo/Pardot)",
      "CPQ tools",
      "CS platforms (Gainsight)",
      "Python for automation"
    ],
    "growthRoles": [
      "Head of Revenue Operations",
      "VP Revenue Operations",
      "Chief of Staff (GTM)",
      "Sales Director"
    ],
    "adjacentRoles": [
      "Business Analyst",
      "Growth Analyst",
      "Sales Manager",
      "Marketing Operations Manager"
    ],
    "topCompanies": [
      "Razorpay",
      "Freshworks",
      "Darwinbox",
      "Chargebee",
      "BrowserStack",
      "CleverTap",
      "Postman",
      "Leadsquared"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "business-analyst",
    "title": "Business Analyst",
    "domain": "Business & Ops",
    "archetype": "generic",
    "level": "entry",
    "description": "Translates business problems into data-driven insights and recommendations. Works with stakeholders to gather requirements, model scenarios, build dashboards, and produce reports that drive decisions in product, ops, or finance teams.",
    "ctc": {
      "low": 5,
      "median": 9,
      "high": 16
    },
    "coreSkills": [
      "SQL",
      "Excel / Google Sheets",
      "Data storytelling",
      "Stakeholder management",
      "Requirements gathering",
      "PowerPoint / deck-building",
      "Process mapping"
    ],
    "niceToHave": [
      "Python basics",
      "Tableau / Power BI",
      "Agile / Scrum",
      "Financial modelling"
    ],
    "growthRoles": [
      "Senior Business Analyst",
      "Product Analyst",
      "Strategy & BizOps Associate",
      "Financial Analyst"
    ],
    "adjacentRoles": [
      "Data Analyst",
      "Product Manager",
      "Operations Analyst",
      "Management Consultant (Big 4 entry)"
    ],
    "topCompanies": [
      "Deloitte",
      "EY",
      "KPMG",
      "Accenture",
      "Flipkart",
      "Meesho",
      "Razorpay",
      "Zomato",
      "HDFC Bank"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "strategy-bizops-associate",
    "title": "Strategy & BizOps Associate",
    "domain": "Business & Ops",
    "archetype": "consumer",
    "level": "mid",
    "description": "Embedded in a high-growth startup's central strategy or CEO office. Runs cross-functional initiatives, builds business cases, tracks OKRs, and acts as an internal consultant solving ambiguous problems across product, growth, and operations.",
    "ctc": {
      "low": 12,
      "median": 20,
      "high": 35
    },
    "coreSkills": [
      "First-principles problem solving",
      "Financial modelling",
      "OKR / goal-setting frameworks",
      "Cross-functional coordination",
      "SQL & analytics",
      "Executive communication"
    ],
    "niceToHave": [
      "Consulting background",
      "MBA",
      "Market sizing / TAM-SAM-SOM",
      "Python / BI tools"
    ],
    "growthRoles": [
      "Senior BizOps Manager",
      "Chief of Staff",
      "Product Manager",
      "Senior Management Consultant"
    ],
    "adjacentRoles": [
      "Business Analyst",
      "Product Operations Manager",
      "Category Manager",
      "Engagement Manager"
    ],
    "topCompanies": [
      "Swiggy",
      "Zepto",
      "CRED",
      "Razorpay",
      "PhonePe",
      "Meesho",
      "Ola",
      "Groww",
      "Byju's"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "operations-manager",
    "title": "Operations Manager",
    "domain": "Business & Ops",
    "archetype": "quick-commerce",
    "level": "mid",
    "description": "Owns day-to-day operational excellence for a city, vertical, or product line. Manages SLAs, vendor relationships, workforce planning, and process optimisation to hit unit-economics and fulfilment targets.",
    "ctc": {
      "low": 8,
      "median": 14,
      "high": 22
    },
    "coreSkills": [
      "Process improvement (Lean / Six Sigma)",
      "Vendor management",
      "P&L ownership basics",
      "Team management",
      "Data-driven decision making",
      "Escalation handling"
    ],
    "niceToHave": [
      "Supply chain knowledge",
      "Warehouse / dark-store ops",
      "SQL",
      "Project management (PMP / Prince2)"
    ],
    "growthRoles": [
      "Senior Operations Manager",
      "Ops Lead / Head of Ops",
      "Category Manager",
      "COO (startup)"
    ],
    "adjacentRoles": [
      "City Head",
      "Supply Chain Manager",
      "Program Manager",
      "Product Operations Manager"
    ],
    "topCompanies": [
      "Blinkit",
      "Zepto",
      "Swiggy Instamart",
      "Amazon India",
      "Flipkart",
      "Delhivery",
      "BigBasket",
      "Porter"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "ops-lead-head-of-operations",
    "title": "Ops Lead / Head of Operations",
    "domain": "Business & Ops",
    "archetype": "consumer",
    "level": "lead",
    "description": "Leads a regional or national operations function. Responsible for building scalable processes, managing multi-tier teams, defining ops strategy, and owning key business metrics such as on-time delivery, cost-per-order, and NPS.",
    "ctc": {
      "low": 20,
      "median": 32,
      "high": 50
    },
    "coreSkills": [
      "Strategic planning",
      "P&L management",
      "Multi-city / multi-team leadership",
      "Process re-engineering",
      "Stakeholder management (C-suite)",
      "Hiring & org design"
    ],
    "niceToHave": [
      "ERP / WMS systems",
      "Six Sigma Black Belt",
      "MBA from Tier 1",
      "Supply chain expertise"
    ],
    "growthRoles": [
      "VP Operations",
      "COO",
      "Founder / Co-founder",
      "General Manager"
    ],
    "adjacentRoles": [
      "Supply Chain Director",
      "Category Director",
      "Product Operations Lead",
      "Chief of Staff"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Meesho",
      "Amazon India",
      "Flipkart",
      "Nykaa",
      "PhonePe",
      "Ola"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "category-manager",
    "title": "Category Manager",
    "domain": "Business & Ops",
    "archetype": "consumer",
    "level": "mid",
    "description": "Owns a product or merchant category end-to-end: assortment planning, pricing, promotions, and seller/brand relationships. Balances growth (GMV, revenue) with margin in an e-commerce or quick-commerce context.",
    "ctc": {
      "low": 10,
      "median": 18,
      "high": 30
    },
    "coreSkills": [
      "Category P&L management",
      "Vendor / brand negotiation",
      "Pricing & promotions strategy",
      "Data analysis (SQL, Excel)",
      "Consumer insights",
      "Cross-functional coordination"
    ],
    "niceToHave": [
      "FMCG / retail background",
      "Python",
      "Cohort / funnel analysis",
      "Supply chain basics"
    ],
    "growthRoles": [
      "Senior Category Manager",
      "Head of Category",
      "VP Category",
      "GM / Business Head"
    ],
    "adjacentRoles": [
      "Growth Manager",
      "Product Manager (marketplace)",
      "Supply Chain Manager",
      "BizOps Associate"
    ],
    "topCompanies": [
      "Blinkit",
      "Zepto",
      "Amazon India",
      "Flipkart",
      "Nykaa",
      "Myntra",
      "BigBasket",
      "Meesho"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "supply-chain-manager",
    "title": "Supply Chain Manager",
    "domain": "Business & Ops",
    "archetype": "quick-commerce",
    "level": "mid",
    "description": "Manages end-to-end supply chain: procurement, inventory planning, logistics, and last-mile delivery. Ensures product availability while minimising holding costs, waste, and lead times.",
    "ctc": {
      "low": 8,
      "median": 15,
      "high": 28
    },
    "coreSkills": [
      "Demand forecasting",
      "Inventory management",
      "Logistics & 3PL management",
      "ERP / WMS tools (SAP / Oracle)",
      "Supplier negotiation",
      "Data analysis"
    ],
    "niceToHave": [
      "Six Sigma / Lean",
      "APICS CPIM certification",
      "Cold chain knowledge",
      "Python / Power BI"
    ],
    "growthRoles": [
      "Senior Supply Chain Manager",
      "Head of Supply Chain",
      "VP Supply Chain",
      "COO"
    ],
    "adjacentRoles": [
      "Operations Manager",
      "Procurement Manager",
      "Category Manager",
      "Logistics Head"
    ],
    "topCompanies": [
      "Blinkit",
      "Zepto",
      "Swiggy",
      "Delhivery",
      "Amazon India",
      "Flipkart",
      "Mahindra Logistics",
      "HUL"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "management-consultant",
    "title": "Management Consultant",
    "domain": "Business & Ops",
    "archetype": "generic",
    "level": "entry",
    "description": "Junior consultant at an MBB, Big 4, or boutique firm. Works on client engagements spanning strategy, operations, and transformation. Responsible for research, analysis, modelling, and slide-deck delivery under senior guidance.",
    "ctc": {
      "low": 14,
      "median": 24,
      "high": 38
    },
    "coreSkills": [
      "Hypothesis-driven problem solving",
      "Deck-building (MECE, pyramid principle)",
      "Financial modelling",
      "Primary & secondary research",
      "Client communication",
      "Excel & PowerPoint"
    ],
    "niceToHave": [
      "MBA / IIM degree",
      "Industry specialisation (FS, healthcare)",
      "Python / Alteryx",
      "Case interview mastery"
    ],
    "growthRoles": [
      "Senior Consultant",
      "Engagement Manager",
      "Principal / Associate Partner",
      "VP Strategy (corporate)"
    ],
    "adjacentRoles": [
      "Strategy & BizOps Associate",
      "Business Analyst",
      "Investment Banking Analyst",
      "Product Manager"
    ],
    "topCompanies": [
      "McKinsey",
      "BCG",
      "Bain",
      "Deloitte",
      "EY-Parthenon",
      "Kearney",
      "LEK Consulting",
      "Accenture Strategy"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "senior-consultant",
    "title": "Senior Consultant",
    "domain": "Business & Ops",
    "archetype": "generic",
    "level": "senior",
    "description": "Leads workstreams on complex consulting engagements. Manages junior analysts, owns client relationships at the mid-level, and delivers strategic recommendations with minimal supervision at MBB or Big 4 firms.",
    "ctc": {
      "low": 30,
      "median": 50,
      "high": 75
    },
    "coreSkills": [
      "Workstream management",
      "Advanced financial & scenario modelling",
      "Client relationship management",
      "Thought leadership",
      "Team coaching",
      "Business development support"
    ],
    "niceToHave": [
      "Sector expertise (fintech, healthcare, consumer)",
      "MBA Tier 1",
      "International project exposure",
      "Data science basics"
    ],
    "growthRoles": [
      "Engagement Manager",
      "Principal / Associate Partner",
      "VP Strategy (corporate)",
      "Chief of Staff"
    ],
    "adjacentRoles": [
      "Strategy Director",
      "BizOps Lead",
      "Corporate Development Manager",
      "Investment Professional"
    ],
    "topCompanies": [
      "McKinsey",
      "BCG",
      "Bain",
      "Deloitte Consulting",
      "EY-Parthenon",
      "Roland Berger",
      "Oliver Wyman"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "engagement-manager",
    "title": "Engagement Manager",
    "domain": "Business & Ops",
    "archetype": "generic",
    "level": "director",
    "description": "Owns the overall delivery of a consulting engagement at MBB / Tier-1 boutique. Manages client relationships at senior levels, leads cross-functional teams, drives proposal development, and ensures quality of final output.",
    "ctc": {
      "low": 55,
      "median": 80,
      "high": 120
    },
    "coreSkills": [
      "Engagement P&L",
      "Senior client management",
      "Proposal & BD development",
      "Team leadership & mentoring",
      "Executive storytelling",
      "Commercial acumen"
    ],
    "niceToHave": [
      "Partner track readiness",
      "MBA IIM / ISB",
      "Global project portfolio",
      "Practice area leadership"
    ],
    "growthRoles": [
      "Principal / Associate Partner",
      "Partner",
      "VP Strategy & Growth (unicorn)",
      "Founder"
    ],
    "adjacentRoles": [
      "Head of Corporate Strategy",
      "Chief of Staff (Series C+)",
      "Investment Director",
      "GM Business Unit"
    ],
    "topCompanies": [
      "McKinsey",
      "BCG",
      "Bain",
      "Kearney",
      "Accenture Strategy",
      "Deloitte",
      "EY-Parthenon"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "financial-analyst",
    "title": "Financial Analyst",
    "domain": "Business & Ops",
    "archetype": "fintech",
    "level": "entry",
    "description": "Builds financial models, analyses P&Ls, prepares MIS reports, supports budgeting cycles, and delivers insights on business performance to finance and leadership teams. Common in banks, NBFCs, startups, and large enterprises.",
    "ctc": {
      "low": 5,
      "median": 9,
      "high": 16
    },
    "coreSkills": [
      "Financial modelling (DCF, LBO basics)",
      "Excel / Google Sheets",
      "MIS reporting",
      "Budgeting & forecasting",
      "Variance analysis",
      "Accounting fundamentals"
    ],
    "niceToHave": [
      "CFA Level 1",
      "SQL",
      "Tableau / Power BI",
      "CA Inter or CMA"
    ],
    "growthRoles": [
      "Senior Financial Analyst",
      "FP&A Manager",
      "Finance Manager",
      "Investment Analyst"
    ],
    "adjacentRoles": [
      "Business Analyst",
      "FP&A Analyst",
      "Credit Analyst",
      "Equity Research Analyst"
    ],
    "topCompanies": [
      "Razorpay",
      "HDFC Bank",
      "ICICI Bank",
      "Zomato",
      "Paytm",
      "PhonePe",
      "Goldman Sachs India",
      "JP Morgan India"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "fp-a-manager",
    "title": "FP&A Manager",
    "domain": "Business & Ops",
    "archetype": "fintech",
    "level": "senior",
    "description": "Leads financial planning & analysis for a business unit or the entire company. Owns the annual operating plan, rolling forecasts, board-level financial reporting, and business partnering with functional leaders to drive profitability.",
    "ctc": {
      "low": 18,
      "median": 28,
      "high": 45
    },
    "coreSkills": [
      "Long-range planning & rolling forecasts",
      "Business partnering",
      "Board / investor reporting",
      "Advanced financial modelling",
      "Budgeting & headcount planning",
      "BI tools (Anaplan, Adaptive)"
    ],
    "niceToHave": [
      "CA / CFA / MBA",
      "SQL & Python",
      "ERP (SAP / Oracle)",
      "Unit-economics fluency"
    ],
    "growthRoles": [
      "Head of FP&A",
      "Finance Director",
      "CFO (startup)",
      "VP Finance"
    ],
    "adjacentRoles": [
      "Controller",
      "Business Finance Manager",
      "Strategy & BizOps Lead",
      "Corporate Development Manager"
    ],
    "topCompanies": [
      "Flipkart",
      "Swiggy",
      "Groww",
      "Razorpay",
      "PhonePe",
      "Byju's",
      "MakeMyTrip",
      "Zepto"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "finance-manager-business-finance-manager",
    "title": "Finance Manager / Business Finance Manager",
    "domain": "Business & Ops",
    "archetype": "b2b-saas",
    "level": "mid",
    "description": "Acts as a strategic finance business partner to a specific vertical or product line. Manages P&L reporting, cost controls, pricing decisions, and investment cases, bridging finance with operations and product.",
    "ctc": {
      "low": 14,
      "median": 22,
      "high": 35
    },
    "coreSkills": [
      "P&L ownership",
      "Budgeting & cost control",
      "Commercial / pricing analysis",
      "Stakeholder communication",
      "MIS & dashboards",
      "Accounting & compliance basics"
    ],
    "niceToHave": [
      "CA / CPA / MBA",
      "ERP proficiency",
      "SQL",
      "SaaS metrics (ARR, CAC, LTV)"
    ],
    "growthRoles": [
      "FP&A Manager",
      "Head of Finance",
      "Controller",
      "CFO (Series A startup)"
    ],
    "adjacentRoles": [
      "Financial Analyst",
      "Business Analyst",
      "Corporate Development Manager",
      "Strategy Associate"
    ],
    "topCompanies": [
      "Freshworks",
      "Zoho",
      "Razorpay",
      "Chargebee",
      "Postman",
      "Clevertap",
      "MoEngage",
      "BrowserStack"
    ],
    "demand": "high",
    "moneyPotential": "medium"
  },
  {
    "id": "financial-controller",
    "title": "Financial Controller",
    "domain": "Business & Ops",
    "archetype": "generic",
    "level": "senior",
    "description": "Owns accounting integrity, statutory compliance, audit management, and internal controls. Responsible for monthly close, financial statements, IndAS / IFRS compliance, transfer pricing, and tax filings in an Indian corporate or MNC setup.",
    "ctc": {
      "low": 20,
      "median": 35,
      "high": 55
    },
    "coreSkills": [
      "IndAS / IFRS accounting",
      "Month-end close management",
      "Statutory audit coordination",
      "Internal controls (SOX / Ind AS)",
      "Tax compliance (GST, direct tax)",
      "ERP (SAP / Oracle)"
    ],
    "niceToHave": [
      "CA mandatory / CPA",
      "Big 4 background",
      "Transfer pricing knowledge",
      "IPO readiness experience"
    ],
    "growthRoles": [
      "VP Finance",
      "CFO",
      "Head of Finance",
      "Group Controller"
    ],
    "adjacentRoles": [
      "FP&A Manager",
      "Finance Director",
      "Treasury Manager",
      "Head of Compliance"
    ],
    "topCompanies": [
      "Infosys",
      "Wipro",
      "TCS",
      "HUL",
      "ITC",
      "Mahindra",
      "Tata Group",
      "PhonePe",
      "Paytm"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  },
  {
    "id": "cfo",
    "title": "CFO",
    "domain": "Business & Ops",
    "archetype": "fintech",
    "level": "exec",
    "description": "Leads all financial functions of an organisation: fundraising strategy, investor relations, financial planning, treasury, compliance, and M&A. In startups, often a key member of the leadership team through funding rounds and IPO.",
    "ctc": {
      "low": 60,
      "median": 100,
      "high": 200
    },
    "coreSkills": [
      "Fundraising & investor relations",
      "Capital allocation strategy",
      "Board & audit committee management",
      "M&A / deal structuring",
      "Enterprise risk management",
      "Team building & leadership"
    ],
    "niceToHave": [
      "CA + MBA from Tier 1",
      "Big 4 / investment banking background",
      "IPO / DRHP experience",
      "ESOP management"
    ],
    "growthRoles": [
      "Co-founder / Founder",
      "CEO",
      "Board Member",
      "Partner (PE/VC)"
    ],
    "adjacentRoles": [
      "COO",
      "Chief of Staff",
      "VP Finance",
      "MD (investment bank)"
    ],
    "topCompanies": [
      "Razorpay",
      "PhonePe",
      "Groww",
      "Zepto",
      "CRED",
      "MakeMyTrip",
      "Nykaa",
      "Paytm"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "coo",
    "title": "COO",
    "domain": "Business & Ops",
    "archetype": "consumer",
    "level": "exec",
    "description": "Second-in-command responsible for converting the CEO's vision into operational reality. Oversees all business functions (ops, supply chain, customer success, BizOps), drives cross-functional alignment, and owns company-wide KPIs.",
    "ctc": {
      "low": 70,
      "median": 120,
      "high": 250
    },
    "coreSkills": [
      "Operating cadence design",
      "Multi-functional leadership",
      "Strategic execution",
      "P&L ownership (company level)",
      "Board / investor communication",
      "Org design & hiring"
    ],
    "niceToHave": [
      "MBA IIM / ISB or IIT",
      "Prior founder or GM experience",
      "Consulting or PE background",
      "International market exposure"
    ],
    "growthRoles": [
      "CEO",
      "Founder / Co-founder",
      "Partner (PE / VC)",
      "Board Director"
    ],
    "adjacentRoles": [
      "CFO",
      "Chief of Staff",
      "VP Operations",
      "President / MD"
    ],
    "topCompanies": [
      "Swiggy",
      "Zomato",
      "Meesho",
      "Ola",
      "Flipkart",
      "CRED",
      "Zepto",
      "Groww"
    ],
    "demand": "niche",
    "moneyPotential": "high"
  },
  {
    "id": "chief-of-staff",
    "title": "Chief of Staff",
    "domain": "Business & Ops",
    "archetype": "consumer",
    "level": "senior",
    "description": "Acts as the CEO/Founder's operational partner and force-multiplier. Manages the leadership team's agenda, coordinates cross-functional priorities, drives strategic projects, and ensures execution of key company initiatives. High-visibility, high-trust role.",
    "ctc": {
      "low": 22,
      "median": 38,
      "high": 65
    },
    "coreSkills": [
      "Executive presence & communication",
      "Project & program management",
      "Strategic problem solving",
      "Facilitation & alignment",
      "Data analysis",
      "OKR tracking"
    ],
    "niceToHave": [
      "Prior consulting or BizOps experience",
      "MBA",
      "Fundraising support experience",
      "Board deck preparation"
    ],
    "growthRoles": [
      "VP Strategy",
      "BizOps Lead",
      "GM Business Unit",
      "Founder / Co-founder",
      "COO"
    ],
    "adjacentRoles": [
      "Strategy & BizOps Associate",
      "Engagement Manager",
      "Head of Special Projects",
      "Product Operations Lead"
    ],
    "topCompanies": [
      "Razorpay",
      "CRED",
      "Zepto",
      "Swiggy",
      "Ola",
      "Groww",
      "Meesho",
      "PhonePe"
    ],
    "demand": "high",
    "moneyPotential": "high"
  },
  {
    "id": "head-of-people-vp-people",
    "title": "Head of People / VP People",
    "domain": "Business & Ops",
    "archetype": "consumer",
    "level": "vp",
    "description": "Leads the entire people function: talent acquisition, HRBP, L&D, compensation & benefits, culture, and DEI. Partners with the CEO and leadership team to build the organisation at scale, especially critical at Series B to IPO stage.",
    "ctc": {
      "low": 30,
      "median": 55,
      "high": 100
    },
    "coreSkills": [
      "Org design & workforce planning",
      "Talent strategy",
      "Compensation benchmarking (ESOP, pay bands)",
      "Culture & engagement",
      "Executive hiring",
      "HR systems (Darwinbox, SAP HCM)"
    ],
    "niceToHave": [
      "MBA HR / Tier 1 XLRI",
      "Prior CHRO or VP People background",
      "ESOP design",
      "Employer branding"
    ],
    "growthRoles": [
      "CHRO",
      "Co-founder (HR tech)",
      "Board Advisor",
      "COO"
    ],
    "adjacentRoles": [
      "HR Business Partner",
      "Chief of Staff",
      "L&D Head",
      "Talent Acquisition Lead"
    ],
    "topCompanies": [
      "CRED",
      "Razorpay",
      "Swiggy",
      "Zepto",
      "Groww",
      "PhonePe",
      "Nykaa",
      "Meesho"
    ],
    "demand": "medium",
    "moneyPotential": "high"
  }
];

const LEVEL_ORDER: RoleLevel[] = ["entry","mid","senior","lead","director","vp","exec"];
export const levelRank = (l: string) => Math.max(0, LEVEL_ORDER.indexOf(l as RoleLevel));
export const levelOf = (rank: number): RoleLevel => LEVEL_ORDER[Math.max(0, Math.min(LEVEL_ORDER.length - 1, rank))];

// The designation ladder: each rung + the experience it typically takes to reach it (India tech/PM
// norms). Used to estimate a candidate's TRUE level from years — so we don't over-promote off a
// résumé — and to size realistic jumps. A 2-rung jump usually needs an MBA or an equivalent reset.
export const LADDER: { level: RoleLevel; minYears: number; needs: string }[] = [
  { level: "entry",    minYears: 0,  needs: "0-2 yrs" },
  { level: "mid",      minYears: 3,  needs: "3-5 yrs" },
  { level: "senior",   minYears: 6,  needs: "6-8 yrs" },
  { level: "lead",     minYears: 9,  needs: "9-11 yrs (GPM / Principal / EM)" },
  { level: "director", minYears: 11, needs: "11-15 yrs" },
  { level: "vp",       minYears: 15, needs: "15-19 yrs" },
  { level: "exec",     minYears: 19, needs: "19+ yrs" },
];
export function levelFromYears(years: number): RoleLevel {
  let lv: RoleLevel = "entry";
  for (const r of LADDER) if (years >= r.minYears) lv = r.level;
  return lv;
}
export const experienceForLevel = (l: RoleLevel): string => LADDER.find((r) => r.level === l)?.needs || "";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Fuzzy find a role by (approximate) title.
export function findRole(title: string): CareerRole | undefined {
  if (!title) return undefined;
  const n = norm(title);
  let exact = ROLES.find((r) => norm(r.title) === n);
  if (exact) return exact;
  const words = n.split(" ").filter((w) => w.length > 2);
  let best: CareerRole | undefined; let bestScore = 0;
  for (const r of ROLES) {
    const hay = norm(r.title + " " + r.domain);
    const score = words.reduce((a, w) => a + (hay.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = r; }
  }
  return bestScore >= Math.min(2, words.length) ? best : undefined;
}

export const rolesByDomain = (domain: string) => ROLES.filter((r) => norm(r.domain) === norm(domain));
export const resolveTitles = (titles: string[]): CareerRole[] =>
  titles.map((t) => findRole(t)).filter((r): r is CareerRole => !!r);

// Career-path graph: roles you can grow into / move sideways to.
export const growthFrom = (role: CareerRole) => resolveTitles(role.growthRoles);
export const adjacentTo = (role: CareerRole) => resolveTitles(role.adjacentRoles);

// Rank candidate target roles for a profile (skills overlap + domain + sensible level step).
export function matchRoles(opts: { skills: string[]; domain?: string; level?: string; limit?: number }): CareerRole[] {
  const skillSet = new Set(opts.skills.map(norm));
  const baseRank = opts.level ? levelRank(opts.level) : 2;
  const scored = ROLES.map((r) => {
    let s = 0;
    for (const sk of r.coreSkills) if ([...skillSet].some((u) => norm(sk).includes(u) || u.includes(norm(sk)))) s += 3;
    if (opts.domain && norm(r.domain) === norm(opts.domain)) s += 4;
    const step = levelRank(r.level) - baseRank;
    if (step === 1) s += 4; else if (step === 0) s += 2; else if (step === 2) s += 2; else if (step < 0) s -= 3;
    if (r.demand === "high") s += 1;
    return { r, s };
  });
  return scored.sort((a, b) => b.s - a.s).slice(0, opts.limit ?? 8).map((x) => x.r);
}
