import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reconcileExperience, seniorityFor, yearsLabel } from "@/lib/engine/parseProfile";
import type { Profile, ResumeRole } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, profile } = (await req.json()) as { sessionId?: string; profile?: Profile };
    if (!sessionId || !profile) return NextResponse.json({ error: "Missing profile" }, { status: 400 });

    const roles: ResumeRole[] = (profile.roles || []).slice(0, 8).map((role) => ({
      ...role,
      title: String(role.title || "Role").trim().slice(0, 90),
      company: String(role.company || "").trim().slice(0, 60),
      start: role.start ? String(role.start).trim().slice(0, 20) : undefined,
      end: role.end ? String(role.end).trim().slice(0, 20) : undefined,
      bullets: Array.isArray(role.bullets) ? role.bullets.slice(0, 5) : [],
    }));
    const { totalMonths, reconciledNote } = reconcileExperience(roles);
    const titles = roles.map((role) => role.title).join(" ");
    const saved: Profile = {
      ...profile,
      name: String(profile.name || "Candidate").trim().slice(0, 60),
      headlineTitle: String(profile.headlineTitle || roles[0]?.title || "Professional").trim().slice(0, 90),
      headlineCompany: String(profile.headlineCompany || roles[0]?.company || "").trim().slice(0, 60),
      city: String(profile.city || "Bangalore").trim().slice(0, 40),
      skills: Array.from(new Set((profile.skills || []).map((skill) => String(skill).trim()).filter(Boolean))).slice(0, 15),
      roles,
      totalMonths,
      totalYearsLabel: yearsLabel(totalMonths),
      seniority: seniorityFor(totalMonths, titles),
      reconciledNote,
    };

    await db.session.update({ where: { id: sessionId }, data: { profileJson: JSON.stringify(saved) } });
    await db.event.create({ data: { sessionId, name: "profile_confirmed", metaJson: JSON.stringify({ edited: true }) } });
    return NextResponse.json({ profile: saved });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
