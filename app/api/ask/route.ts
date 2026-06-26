import { NextRequest, NextResponse } from "next/server";
import { askNavi } from "@/lib/ai";
import { db } from "@/lib/db";
import type { Profile } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { sessionId, question, history } = (await req.json()) as { sessionId?: string; question: string; history?: { role: "user" | "navi"; text: string }[] };
  let profile: Profile | null = null;
  let chosenPath: string | null = null;
  let planSummary: string | null = null;
  if (sessionId) {
    const s = await db.session.findUnique({ where: { id: sessionId } });
    if (s?.profileJson) profile = JSON.parse(s.profileJson);
    chosenPath = s?.chosenPath || null;
    if (s?.planJson) {
      try {
        const p = JSON.parse(s.planJson);
        planSummary = `target ${p.outcome?.medianLPA}L (${p.outcome?.upliftPct}% up, ${p.outcome?.probabilityPct}% odds), gaps: ${(p.gap || []).map((g: any) => g.name).join(", ")}`;
      } catch {}
    }
    await db.event.create({ data: { sessionId, name: "ask_navi", metaJson: JSON.stringify({ q: question.slice(0, 120) }) } }).catch(() => {});
  }
  const { answer, source } = await askNavi(question, { profile, chosenPath, planSummary, history });
  return NextResponse.json({ answer, source });
}
