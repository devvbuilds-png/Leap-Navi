"use client";
import { useMemo, useState } from "react";
import type { PlanResult } from "@/lib/types";
import OutcomeMathW from "./OutcomeMath";
import GapMap from "./GapMap";
import HabitRoadmap from "./HabitRoadmap";
import CompaniesFit from "./CompaniesFit";
import ExpertCard from "./ExpertCard";
import Offers from "./Offers";
import JobsFeed from "./JobsFeed";

// Full dashboard: the plan gets its own well-sectioned surface, with Roadmap | Jobs as
// switchable tabs. (outcome math, gap, roadmap, companies, mentor, next step / jobs feed)
export default function Dashboard({ plan, pathTitle, gapLabel, tab, onTab, onBook, onPick, onChat }: {
  plan: PlanResult;
  pathTitle: string;
  gapLabel: string;
  tab: "roadmap" | "jobs";
  onTab: (t: "roadmap" | "jobs") => void;
  onBook?: () => void;
  onPick?: (kind: string) => void;
  onChat?: () => void;
}) {
  const totals = useMemo(() => {
    const total = plan.roadmap.reduce((n, ph) => n + ph.tasks.length, 0);
    let done = 0, pct = 0;
    plan.roadmap.forEach((ph) => ph.tasks.forEach((t) => { if (t.done) { done++; pct += t.pct; } }));
    return { total, done, pct };
  }, [plan.roadmap]);
  const [prog, setProg] = useState({ pct: totals.pct, done: totals.done, total: totals.total });

  return (
    <div className="dash">
      <header className="dash-head">
        <div className="dash-head-l">
          <div className="dash-kicker">Your career plan</div>
          <h1 className="dash-title">{pathTitle}</h1>
          <div className="dash-sub">A plan you can act on — the math, the gap, the weekly reps, and who can help.</div>
        </div>
        <div className="dash-head-r">
          <div className="dash-prog">
            <div className="dash-prog-top"><span>{prog.done} of {prog.total} steps</span><b>{prog.pct}%</b></div>
            <div className="prog-bar"><i style={{ width: `${prog.pct}%` }} /></div>
          </div>
          <button className="btn block" onClick={onBook}>Book 1:1 with {plan.mentor.name.split(" ")[0]} →</button>
        </div>
      </header>

      {/* Roadmap | Jobs tabs */}
      <div className="dash-tabs">
        <button className={tab === "roadmap" ? "on" : ""} onClick={() => onTab("roadmap")}>📋 Roadmap</button>
        <button className={tab === "jobs" ? "on" : ""} onClick={() => onTab("jobs")}>💼 Jobs you fit <span className="dash-tab-count">{plan.jobs.length}</span></button>
      </div>

      {tab === "roadmap" ? (
        <>
          <section className="dash-sec">
            <div className="dash-h">Is it worth it?</div>
            <OutcomeMathW o={plan.outcome} />
          </section>

          <div className="dash-2col">
            <section className="dash-sec">
              <div className="dash-h">Where you stand</div>
              <GapMap title={gapLabel} gap={plan.gap} />
            </section>
            <section className="dash-sec">
              <div className="dash-h">Your matched mentor</div>
              <ExpertCard m={plan.mentor} onBook={onBook} />
            </section>
          </div>

          <section className="dash-sec">
            <div className="dash-h">Your roadmap <span className="dash-h-note">momentum, not a course list</span></div>
            <div className="w" style={{ paddingBottom: 8 }}>
              <div className="w-s" style={{ marginTop: 0 }}>Daily reps that compound — check them off to move the bar. Courses are mapped to your exact gaps.</div>
              <HabitRoadmap phases={plan.roadmap} onProgress={(pct, done, total) => setProg({ pct, done, total })} />
            </div>
          </section>

          <div className="dash-2col">
            <section className="dash-sec">
              <div className="dash-h-row"><div className="dash-h">Companies you fit</div></div>
              <CompaniesFit companies={plan.companies} />
            </section>
            <section className="dash-sec">
              <div className="dash-h">Your smartest next step</div>
              <Offers offers={plan.offers} onPick={onPick} />
            </section>
          </div>
        </>
      ) : (
        <section className="dash-sec">
          <div className="dash-h">Jobs matched to {pathTitle} <span className="dash-h-note">comp from India 2025-26 data</span></div>
          <div className="w"><JobsFeed jobs={plan.jobs} /></div>
          {onChat && <button className="btn ghost block" style={{ marginTop: 14 }} onClick={onChat}>Ask Navi about any of these →</button>}
        </section>
      )}
    </div>
  );
}
