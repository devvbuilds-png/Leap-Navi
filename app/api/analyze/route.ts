import { NextRequest, NextResponse } from "next/server";
import { generatePaths, suggestMore } from "@/lib/engine/analyze";
import { generatePathsLLM } from "@/lib/ai";
import { db } from "@/lib/db";
import type { Profile, Answers } from "@/lib/types";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { sessionId, answers, mode, shown } = (await req.json()) as {
    sessionId: string; answers?: Answers; mode?: "more"; shown?: string[];
  };
  const session = await db.session.findUnique({ where: { id: sessionId } });
  if (!session?.profileJson) return NextResponse.json({ error: "Session not found" }, { status: 404 });
  const profile = JSON.parse(session.profileJson) as Profile;

  // Rec #10: "suggest more" — diverse, with a closing message; doesn't disturb stored paths.
  if (mode === "more") {
    const result = suggestMore(profile, shown || []);
    await db.event.create({ data: { sessionId, name: "suggest_more", metaJson: JSON.stringify({ count: result.paths.length }) } });
    return NextResponse.json(result);
  }

  const a = answers || {};
  // LLM-first path generation, deterministic engine as guaranteed fallback.
  const llm = await generatePathsLLM(profile, a);
  const result = llm || generatePaths(profile, a);
  const source = llm ? "llm" : "engine";

  await db.session.update({ where: { id: sessionId }, data: { answersJson: JSON.stringify(a), pathsJson: JSON.stringify(result.paths) } });
  await db.event.create({ data: { sessionId, name: "paths_generated", metaJson: JSON.stringify({ count: result.paths.length, source }) } });

  return NextResponse.json({ ...result, source });
}
