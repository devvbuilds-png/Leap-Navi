import type { CareerPath, Answers, RoadmapPhase } from "../types";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dayLabel(d: Date): string { return `${MON[d.getMonth()]} ${d.getDate()}`; }
// "Wk a–b · Mon D – Mon D" from a start date.
function weekSpan(start: Date, wkA: number, wkB: number): string {
  const a = new Date(start); a.setDate(a.getDate() + (wkA - 1) * 7);
  const b = new Date(start); b.setDate(b.getDate() + wkB * 7 - 1);
  return `Wk ${wkA}–${wkB} · ${dayLabel(a)} – ${dayLabel(b)}`;
}

// Habits + instant wins, not a course dump (Rec #5). Courses are one input, mapped to gaps (Rec #6).
export function buildRoadmap(path: CareerPath, answers: Answers): RoadmapPhase[] {
  const start = new Date();
  const b = path.skillsBuild;
  const jobHunt = answers.timeline === "3-4" ? [5, 8] : answers.timeline === "12+" ? [9, 16] : [7, 10];

  return [
    {
      name: "Foundation · research it yourself",
      weeks: weekSpan(start, 1, 2),
      tasks: [
        { text: `Find 5 live ${path.title} JDs and list the repeated must-haves`, pct: 6, done: false },
        { text: "DM 3 people already in this role; ask what actually got them in", pct: 5, done: false },
        { text: "Write a 1-page teardown of one company you'd target", pct: 4 },
        { text: "Book one 30-min expert call to pressure-test the move", pct: 5 },
      ],
    },
    {
      name: "Upskill · close the exact gaps",
      weeks: weekSpan(start, 3, 6),
      tasks: [
        b[0] ? { text: `Close "${b[0].name}" → ${b[0].closesWith}`, pct: 7 } : { text: "Close gap #1", pct: 7 },
        b[1] ? { text: `Close "${b[1].name}" → ${b[1].closesWith}`, pct: 6 } : { text: "Close gap #2", pct: 6 },
        b[2] ? { text: `Close "${b[2].name}" → ${b[2].closesWith}`, pct: 5 } : { text: "Close gap #3", pct: 5 },
        { text: "Ship one portfolio artifact that proves the new skill", pct: 8 },
      ],
    },
    {
      name: "Job hunt · convert",
      weeks: weekSpan(start, jobHunt[0], jobHunt[1]),
      tasks: [
        { text: "Apply to 3 matched roles a day (target list from Wk 1)", pct: 6 },
        { text: "2 mock interviews / week with the framework from your mentor", pct: 6 },
        { text: "Rework your résumé around the target role's must-haves", pct: 5 },
        { text: "Negotiate using the band on your outcome card", pct: 5 },
      ],
    },
  ];
}
