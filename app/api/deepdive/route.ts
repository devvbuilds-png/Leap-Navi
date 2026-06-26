import { NextRequest, NextResponse } from "next/server";
import { buildDeepDive } from "@/lib/engine/deepdive";
import { deepDiveLLM } from "@/lib/ai";
import { db } from "@/lib/db";
import type { Profile, CareerPath } from "@/lib/types";

export const maxDuration = 45;

export async function POST(req: NextRequest) {
  const { sessionId, pathId } = (await req.json()) as { sessionId: string; pathId: string };
  const session = await db.session.findUnique({ where: { id: sessionId } });
  if (!session?.profileJson || !session.pathsJson) return NextResponse.json({ error: "Session not ready" }, { status: 404 });

  const profile = JSON.parse(session.profileJson) as Profile;
  const paths = JSON.parse(session.pathsJson) as CareerPath[];
  const path = paths.find((p) => p.id === pathId) || paths[0];

  const dive = buildDeepDive(profile, path);
  // Optional LLM enrichment of the prose; falls back silently to the engine bullets.
  const llm = await deepDiveLLM(profile, path);
  if (llm) {
    dive.whatItDoes = llm.whatItDoes;
    dive.whyReady = { ...dive.whyReady, bullets: llm.whyReady };
  }

  await db.event.create({ data: { sessionId, name: "deepdive_viewed", metaJson: JSON.stringify({ path: path.title, llm: !!llm }) } });
  return NextResponse.json(dive);
}
