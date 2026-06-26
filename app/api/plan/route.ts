import { NextRequest, NextResponse } from "next/server";
import { computeOutcome } from "@/lib/engine/outcome";
import { buildRoadmap } from "@/lib/engine/roadmap";
import { generateRoadmapLLM } from "@/lib/ai";
import { chooseOffers } from "@/lib/engine/conversion";
import { companiesForArchetypes } from "@/data/companies";
import { scoreJobsForPath } from "@/data/jobs";
import { matchMentor } from "@/data/mentors";
import { db } from "@/lib/db";
import type { Profile, Answers, CareerPath, PlanResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { sessionId, pathId, answers } = (await req.json()) as { sessionId: string; pathId: string; answers: Answers };
  const session = await db.session.findUnique({ where: { id: sessionId } });
  if (!session?.profileJson || !session.pathsJson) return NextResponse.json({ error: "Session not ready" }, { status: 404 });

  const profile = JSON.parse(session.profileJson) as Profile;
  const paths = JSON.parse(session.pathsJson) as CareerPath[];
  const path = paths.find((p) => p.id === pathId) || paths[0];
  const a = { ...(JSON.parse(session.answersJson || "{}") as Answers), ...(answers || {}) };

  const outcome = computeOutcome(profile, path, a);
  // LLM personalises the task text; engine owns dates + progress weights, and is the fallback.
  const roadmap = (await generateRoadmapLLM(profile, path, a)) || buildRoadmap(path, a);
  const companies = companiesForArchetypes([path.archetype]);
  const jobs = scoreJobsForPath(profile, path);
  const mentor = matchMentor(path, profile);
  const offers = chooseOffers(profile, a, outcome);
  const plan: PlanResult = { outcome, gap: path.skillsBuild, roadmap, companies, jobs, mentor, offers };

  await db.session.update({
    where: { id: sessionId },
    data: { chosenPath: path.title, planJson: JSON.stringify(plan), offerKind: offers[0]?.kind, answersJson: JSON.stringify(a) },
  });
  await db.event.create({ data: { sessionId, name: "plan_built", metaJson: JSON.stringify({ path: path.title }) } });
  await db.event.create({ data: { sessionId, name: "outcome_viewed", metaJson: JSON.stringify({ median: outcome.medianLPA, uplift: outcome.upliftPct }) } });
  await db.event.create({ data: { sessionId, name: "offer_shown", metaJson: JSON.stringify({ kind: offers[0]?.kind }) } });

  return NextResponse.json(plan);
}
