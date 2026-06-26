import { PrismaClient } from "@prisma/client";
import { COMPANIES } from "../data/companies";
import { JOBS } from "../data/jobs";
import { COURSES } from "../data/courses";
import { MENTORS } from "../data/mentors";
import { ROLES } from "../data/roles";

const db = new PrismaClient();

async function main() {
  // Seed the research knowledge base so it's queryable + editable in prod.
  await db.company.deleteMany();
  for (const c of COMPANIES) {
    await db.company.create({ data: { name: c.name, archetype: c.archetype, stage: c.stage, why: c.why, hiringFor: c.hiringFor } });
  }

  await db.job.deleteMany();
  for (const j of JOBS) {
    await db.job.create({ data: { title: j.title, company: j.company, archetype: j.archetype, location: j.location, comp: j.comp, posted: j.posted, mustHaves: JSON.stringify(j.mustHaves) } });
  }

  await db.course.deleteMany();
  for (const c of COURSES) {
    await db.course.create({ data: { skill: c.skill, title: c.title, provider: c.provider, hours: c.hours, free: c.free, level: c.level, blurb: c.blurb } });
  }

  await db.mentor.deleteMany();
  for (const m of MENTORS) {
    await db.mentor.create({ data: { archetype: m.archetype, name: m.name, initials: m.initials, role: m.role, matchNote: m.match, gets: JSON.stringify(m.gets), slot: m.slot } });
  }

  await db.role.deleteMany();
  for (const r of ROLES) {
    await db.role.create({ data: {
      id: r.id, title: r.title, domain: r.domain, archetype: r.archetype, level: r.level,
      description: r.description, ctcLow: r.ctc.low, ctcMedian: r.ctc.median, ctcHigh: r.ctc.high,
      coreSkills: JSON.stringify(r.coreSkills), niceToHave: JSON.stringify(r.niceToHave),
      growthRoles: JSON.stringify(r.growthRoles), adjacentRoles: JSON.stringify(r.adjacentRoles),
      topCompanies: JSON.stringify(r.topCompanies), demand: r.demand, moneyPotential: r.moneyPotential,
    } });
  }

  console.log(`Seeded ${COMPANIES.length} companies, ${JOBS.length} jobs, ${COURSES.length} courses, ${MENTORS.length} mentors, ${ROLES.length} roles.`);
}

main().finally(() => db.$disconnect());
