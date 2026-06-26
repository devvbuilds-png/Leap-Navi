"use client";
import { useState } from "react";
import type { DeepDive } from "@/lib/types";

// Role deep dive (matches Navi's accordion: What it does / Why ready / What to learn / Companies).
export default function DeepDive({ dive, onBuild }: { dive: DeepDive; onBuild: () => void }) {
  const [open, setOpen] = useState(0);
  const sections = [
    {
      ic: "🚀", t: "What This Role Actually Does", sub: dive.whatItDoes[0]?.slice(0, 40),
      body: <ul>{dive.whatItDoes.map((x, i) => <li key={i}>{x}</li>)}</ul>,
    },
    {
      ic: "📊", t: "Where You Stand", sub: `${dive.whyReady.matchPct}% ready · ${dive.learn.gap.length} gaps to close`,
      body: (
        <div className="gapdive">
          <div className="gapdive-readiness">
            <span className="gapdive-chip">{dive.whyReady.matchPct}% ready</span>
            <span className="gapdive-note">{dive.whyReady.bullets[0] || "A readiness signal — the real story is the gap below."}</span>
          </div>
          <div className="gapdive-block">
            <h6 className="gapdive-h have">✓ Strengths that already count</h6>
            <div className="gapdive-tags">{(dive.strengths.length ? dive.strengths : ["Your core experience"]).slice(0, 6).map((s) => <span key={s}>{s}</span>)}</div>
          </div>
          <div className="gapdive-block">
            <h6 className="gapdive-h build">◎ The gaps — and how to bridge each</h6>
            {dive.learn.gap.map((g, i) => (
              <div className="gapdive-row" key={g.name}>
                <div className="gapdive-rowh"><b>{g.name}</b><span>you&apos;re {g.havePct}% there</span></div>
                <div className="gapdive-bar"><i style={{ width: `${g.havePct}%` }} /></div>
                <div className="gapdive-bridge">↳ Bridge with: {g.closesWith}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      ic: "🎓", t: "What You Need to Learn", sub: `${dive.learn.courses.length} courses · ${dive.learn.certs} certs`,
      body: (
        <div>
          {dive.learn.gap.map((g, i) => {
            const c = dive.learn.courses[i];
            return (
              <div key={g.name} style={{ padding: "8px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13.5 }}>{g.name} <span style={{ color: "var(--ink-faint)", fontWeight: 400 }}>· have {g.havePct}%</span></div>
                {c && <div style={{ fontSize: 12.5, marginTop: 3 }}>→ <b style={{ color: "var(--indigo)" }}>{c.title}</b> · {c.provider} · {c.hours}h {c.free ? "· Free" : ""}</div>}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      ic: "🏢", t: "Companies Hiring", sub: `${dive.companies.length} matched`,
      body: <ul>{dive.companies.map((c) => <li key={c.name}><b style={{ color: "var(--ink)" }}>{c.name}</b> ({c.stage}) — {c.hiringFor}</li>)}</ul>,
    },
  ];

  return (
    <div className="widget" style={{ marginTop: 6 }}>
      <div className="sheet-h">{dive.title}</div>
      {sections.map((s, i) => (
        <div className={`acc ${open === i ? "open" : ""}`} key={s.t}>
          <div className="acc-h" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="acc-ic">{s.ic}</span>
            <span className="t">{s.t}<small>{s.sub}</small></span>
            <span className="car">▾</span>
          </div>
          {open === i && <div className="acc-body">{s.body}</div>}
        </div>
      ))}
      <button className="btn block" style={{ marginTop: 14 }} onClick={onBuild}>Let&apos;s build my Roadmap →</button>
    </div>
  );
}
