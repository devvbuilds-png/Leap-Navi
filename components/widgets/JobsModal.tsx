"use client";
import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";
import JobsFeed from "./JobsFeed";

// Jobs you fit — a pop-up widget reachable anytime from the chat (header / sidebar).
// Fetches openings matched to the chosen path's archetype (or a passed archetype).
export default function JobsModal({ sessionId, archetype, title, onClose }: {
  sessionId: string;
  archetype?: string;
  title?: string;
  onClose: () => void;
}) {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let live = true;
    fetch("/api/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId, archetype }) })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("failed"))))
      .then((d) => { if (live) setJobs(d.jobs || []); })
      .catch(() => { if (live) setErr("Couldn't load matched jobs right now — please try again."); });
    return () => { live = false; };
  }, [sessionId, archetype]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="cmp-overlay" onClick={onClose}>
      <div className="jobs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmp-modal-h">
          <div>
            <div className="cmp-modal-t">💼 Jobs you fit{title ? ` · ${title}` : ""}</div>
            <div className="cmp-modal-s">Live-feeling openings matched to your path · comp from India 2025-26 data.</div>
          </div>
          <button className="cmp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="jobs-modal-body">
          {!jobs && !err && <div className="faint" style={{ padding: 28, textAlign: "center" }}>Finding roles you fit…</div>}
          {err && <div className="error-note" style={{ margin: 16 }}>{err}</div>}
          {jobs && jobs.length > 0 && <JobsFeed jobs={jobs} />}
          {jobs && jobs.length === 0 && <div className="faint" style={{ padding: 28, textAlign: "center" }}>No live matches right now — check back soon.</div>}
        </div>
      </div>
    </div>
  );
}
