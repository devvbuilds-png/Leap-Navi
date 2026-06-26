import { NextRequest, NextResponse } from "next/server";
import { scoreJobsForPath, jobsForArchetypes } from "@/data/jobs";
import { db } from "@/lib/db";
import type { CareerPath, Profile } from "@/lib/types";

// Jobs tab feed — ranked to the user's chosen path by REAL fit (skills + level + function),
// not just archetype membership. Falls back to an archetype feed only when we lack a profile.
export async function POST(req: NextRequest) {
  const { sessionId, archetype } = (await req.json()) as { sessionId?: string; archetype?: string };
  let arch = archetype;
  if (sessionId) {
    const s = await db.session.findUnique({ where: { id: sessionId } });
    if (s?.profileJson && s.pathsJson && s.chosenPath) {
      const profile = JSON.parse(s.profileJson) as Profile;
      const paths = JSON.parse(s.pathsJson) as CareerPath[];
      const chosen = paths.find((p) => p.title === s.chosenPath);
      if (chosen) {
        await db.event.create({ data: { sessionId, name: "jobs_viewed", metaJson: JSON.stringify({ path: chosen.title }) } }).catch(() => {});
        return NextResponse.json({ jobs: scoreJobsForPath(profile, chosen) });
      }
    }
    await db.event.create({ data: { sessionId, name: "jobs_viewed", metaJson: JSON.stringify({ archetype: arch }) } }).catch(() => {});
  }
  const jobs = jobsForArchetypes(arch ? [arch] : []).map((j) => ({ ...j, matchPct: 80 }));
  return NextResponse.json({ jobs });
}
