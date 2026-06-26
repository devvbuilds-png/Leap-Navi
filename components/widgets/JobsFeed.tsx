"use client";
import type { Job } from "@/lib/types";

// The "Jobs" tab — matched live-feeling openings (replaces a generic list).
export default function JobsFeed({ jobs }: { jobs: Job[] }) {
  return (
    <div>
      <div className="w-t" style={{ marginBottom: 2 }}>Openings matched to your path</div>
      <div className="w-s">Ranked by real fit — your skills vs. each role&apos;s must-haves, level, and function. Comp from India 2025-26 data.</div>
      {jobs.map((j) => (
        <div className="job" key={j.id}>
          <div className="job-h">
            <div><div className="jt">{j.title}</div><div className="jc">{j.company}</div></div>
            {j.matchPct && <span className="match">{j.matchPct}% fit</span>}
          </div>
          <div className="job-meta">
            <span><b>{j.comp}</b></span><span>📍 {j.location}</span><span>{j.posted}</span>
          </div>
          {j.fitReason && <div className="job-fit">✓ {j.fitReason}{j.topGap ? <> · <span className="job-gap">shore up {j.topGap}</span></> : null}</div>}
          <div className="job-tags">{j.mustHaves.map((m) => <span key={m}>{m}</span>)}</div>
        </div>
      ))}
    </div>
  );
}
