import fs from "fs";
const files=["product","engineering","data","design","growth","business"];
let raw=[];
for(const f of files) raw=raw.concat(JSON.parse(fs.readFileSync(`tmp/roles/${f}.json`,"utf8")));

const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const seen=new Set(); const roles=[];
for(const r of raw){
  const id=slug(r.title);
  if(seen.has(id)) continue; seen.add(id);
  roles.push({
    id,
    title:String(r.title),
    domain:String(r.domain),
    archetype:String(r.archetype||"generic"),
    level:String(r.level||"mid"),
    description:String(r.description||""),
    ctc:{low:Math.round(+r.ctc.low||0),median:Math.round(+r.ctc.median||0),high:Math.round(+r.ctc.high||0)},
    coreSkills:(r.coreSkills||[]).map(String),
    niceToHave:(r.niceToHave||[]).map(String),
    growthRoles:(r.growthRoles||[]).map(String),
    adjacentRoles:(r.adjacentRoles||[]).map(String),
    topCompanies:(r.topCompanies||[]).map(String),
    demand:String(r.demand||"medium"),
    moneyPotential:String(r.moneyPotential||"medium"),
  });
}
console.log("unique roles:", roles.length);

const header=`// AUTO-GENERATED career-role catalogue (India 2025-26), researched by parallel agents.
// ${roles.length} roles across Product, Engineering, Data & AI, Design, Growth & GTM, Business & Ops.
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

export const ROLES: CareerRole[] = ${JSON.stringify(roles,null,2)};

const LEVEL_ORDER: RoleLevel[] = ["entry","mid","senior","lead","director","vp","exec"];
export const levelRank = (l: string) => Math.max(0, LEVEL_ORDER.indexOf(l as RoleLevel));

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
`;
fs.writeFileSync("data/roles.ts", header);
console.log("wrote data/roles.ts", (header.length/1024).toFixed(1)+"KB");
