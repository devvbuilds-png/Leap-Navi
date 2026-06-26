import { NextRequest, NextResponse } from "next/server";
import { ctcGuidance } from "@/lib/engine/outcome";
import { db } from "@/lib/db";
import type { Profile, CareerPath } from "@/lib/types";

// Rec #1 reframe: expected-CTC realism as HELPFUL guidance, never only a blocking error.
export async function POST(req: NextRequest) {
  const { sessionId, pathId, expectedCTC } = (await req.json()) as { sessionId: string; pathId: string; expectedCTC: number };
  const session = await db.session.findUnique({ where: { id: sessionId } });
  if (!session?.profileJson || !session.pathsJson) return NextResponse.json({ error: "Session not ready" }, { status: 404 });

  const profile = JSON.parse(session.profileJson) as Profile;
  const paths = JSON.parse(session.pathsJson) as CareerPath[];
  const path = paths.find((p) => p.id === pathId) || paths[0];

  const guidance = ctcGuidance(profile, path, Number(expectedCTC) || 0);
  return NextResponse.json(guidance);
}
