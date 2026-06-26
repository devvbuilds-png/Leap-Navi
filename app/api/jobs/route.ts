import { NextRequest, NextResponse } from "next/server";
import { jobsForArchetypes } from "@/data/jobs";
import { db } from "@/lib/db";
import type { CareerPath } from "@/lib/types";

// Jobs tab feed — matched to the user's chosen path archetype.
export async function POST(req: NextRequest) {
  const { sessionId, archetype } = (await req.json()) as { sessionId?: string; archetype?: string };
  let arch = archetype;
  let matchPct = 80;
  if (sessionId) {
    const s = await db.session.findUnique({ where: { id: sessionId } });
    if (s?.pathsJson && s.chosenPath) {
      const paths = JSON.parse(s.pathsJson) as CareerPath[];
      const chosen = paths.find((p) => p.title === s.chosenPath);
      if (chosen) { arch = chosen.archetype; matchPct = chosen.matchPct; }
    }
    await db.event.create({ data: { sessionId, name: "jobs_viewed", metaJson: JSON.stringify({ archetype: arch }) } }).catch(() => {});
  }
  const jobs = jobsForArchetypes(arch ? [arch] : []).map((j) => ({ ...j, matchPct }));
  return NextResponse.json({ jobs });
}
