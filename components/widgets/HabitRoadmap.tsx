"use client";
import { useState } from "react";
import type { RoadmapPhase } from "@/lib/types";

const GOALS = [
  "Know exactly what the role wants — from the market, not a guess.",
  "Close the 2-3 gaps that actually separate you from the role.",
  "Convert: applications, interviews, and a negotiated offer.",
];

// Interactive habit roadmap (Rec #5): daily reps with % progress; courses mapped to gaps (Rec #6).
export default function HabitRoadmap({ phases, onProgress }: { phases: RoadmapPhase[]; onProgress?: (pct: number, done: number, total: number) => void }) {
  const seed = new Set<string>();
  phases.forEach((ph, pi) => ph.tasks.forEach((t, ti) => { if (t.done) seed.add(`${pi}-${ti}`); }));
  const [done, setDone] = useState<Set<string>>(seed);
  const [open, setOpen] = useState(0);

  const totalTasks = phases.reduce((n, ph) => n + ph.tasks.length, 0);
  function toggle(pi: number, ti: number) {
    const k = `${pi}-${ti}`;
    const next = new Set(done);
    next.has(k) ? next.delete(k) : next.add(k);
    setDone(next);
    let pct = 0; let cnt = 0;
    phases.forEach((ph, p) => ph.tasks.forEach((t, t2) => { if (next.has(`${p}-${t2}`)) { pct += t.pct; cnt++; } }));
    onProgress?.(Math.min(100, pct), cnt, totalTasks);
  }

  return (
    <div style={{ marginTop: 4 }}>
      {phases.map((ph, pi) => {
        const phaseDone = ph.tasks.filter((_, ti) => done.has(`${pi}-${ti}`)).length;
        return (
          <div className={`phase ${open === pi ? "active" : ""}`} key={ph.name}>
            <div className="phase-h" onClick={() => setOpen(open === pi ? -1 : pi)}>
              <div className="phase-n">{phaseDone === ph.tasks.length && ph.tasks.length ? "✓" : pi + 1}</div>
              <div className="pt"><b>{ph.name.split("·")[0].trim().toUpperCase()}</b><small>{ph.weeks} · {phaseDone}/{ph.tasks.length} done</small></div>
              <span style={{ color: "var(--ink-faint)" }}>{open === pi ? "▲" : "▼"}</span>
            </div>
            {open === pi && (
              <div className="phase-body">
                <div className="phase-goal">Goal: {GOALS[pi] || ph.name.split("·")[1]?.trim()}</div>
                {ph.tasks.map((t, ti) => (
                  <div className="hb-item" key={ti}>
                    <span className={`hb-ck ${done.has(`${pi}-${ti}`) ? "done" : ""}`} onClick={() => toggle(pi, ti)} />
                    <span className="hb-txt">{t.text}</span>
                    <span className="hb-pct">+{t.pct}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
