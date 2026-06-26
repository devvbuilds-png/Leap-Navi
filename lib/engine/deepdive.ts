import type { Profile, CareerPath, DeepDive } from "../types";
import { courseFor, type Course } from "../../data/courses";
import { companiesForArchetypes } from "../../data/companies";

// Assemble the role deep dive (matches Navi's accordion: what / why-ready / learn / companies).
export function buildDeepDive(profile: Profile, path: CareerPath): DeepDive {
  // Map each gap to the course that closes it; de-dup.
  const courses: Course[] = [];
  for (const s of path.skillsBuild) {
    const c = courseFor(s.name);
    if (c && !courses.find((x) => x.title === c.title)) courses.push(c);
  }
  const certs = courses.filter((c) => !c.free).length;

  const whyReady = {
    matchPct: path.matchPct,
    bullets: [
      ...path.fit,
      profile.metrics[0] ? `The numbers back it: "${profile.metrics[0]}"` : `Your ${profile.totalYearsLabel} of depth is the foundation`,
    ],
  };

  return {
    pathId: path.id,
    title: path.title,
    whatItDoes: path.whatItDoes,
    strengths: path.skillsHave,
    whyReady,
    learn: { gap: path.skillsBuild, courses, certs },
    companies: companiesForArchetypes([path.archetype]),
  };
}
