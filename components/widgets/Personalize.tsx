"use client";
import { useState } from "react";
import type { Answers, CtcGuidance } from "@/lib/types";

const GROUPS: { key: string; q: string; opts: { label: string; v: Partial<Answers> }[] }[] = [
  { key: "mode", q: "How do you want to do this?", opts: [
    { label: "Level up while working", v: { upskillMode: "while-working", company: "stay" } },
    { label: "I'm open to leaving", v: { upskillMode: "while-working", company: "leave" } },
    { label: "Consider a full MBA / Masters", v: { upskillMode: "masters", company: "leave" } },
  ]},
  { key: "timeline", q: "Target timeline?", opts: [
    { label: "3–4 months", v: { timeline: "3-4" } }, { label: "6–8 months", v: { timeline: "6-8" } }, { label: "12+ months", v: { timeline: "12+" } },
  ]},
  { key: "budget", q: "Budget for upskilling?", opts: [
    { label: "Free only", v: { budget: "free" } }, { label: "Under ₹1L", v: { budget: "<1L" } }, { label: "₹1–5L", v: { budget: "1-5L" } }, { label: "₹5–8L+", v: { budget: "5-8L+" } },
  ]},
  { key: "work", q: "Work mode?", opts: [
    { label: "Remote", v: { workMode: "remote" } }, { label: "Hybrid", v: { workMode: "hybrid" } }, { label: "Office", v: { workMode: "office" } },
  ]},
];

export default function Personalize({ pathTitle, onCheckCtc, onDone }: {
  pathTitle: string;
  onCheckCtc: (expected: number) => Promise<CtcGuidance>;
  onDone: (a: Answers) => void;
}) {
  const [sel, setSel] = useState<Record<string, Partial<Answers>>>({});
  const [ctc, setCtc] = useState("");
  const [guide, setGuide] = useState<CtcGuidance | null>(null);

  const merged = (): Answers => Object.values(sel).reduce((acc, v) => ({ ...acc, ...v }), {} as Answers);
  const allAnswered = GROUPS.every((g) => sel[g.key]);

  async function checkCtc(val: string) {
    const n = parseFloat(val);
    if (!n || n <= 0) { setGuide(null); return; }
    setGuide(await onCheckCtc(n));
  }

  return (
    <div className="widget" style={{ marginTop: 6 }}>
      <div className="sheet-h">Personalise your plan</div>
      <p className="muted" style={{ fontSize: 14, marginTop: -8, marginBottom: 6 }}>A few constraints so the roadmap and the math fit your real life.</p>

      {GROUPS.map((g) => (
        <div key={g.key} style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>{g.q}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {g.opts.map((o) => (
              <button key={o.label} className={`tag ${JSON.stringify(sel[g.key]) === JSON.stringify(o.v) ? "solid" : ""}`}
                style={{ cursor: "pointer" }} onClick={() => setSel({ ...sel, [g.key]: o.v })}>{o.label}</button>
            ))}
          </div>
        </div>
      ))}

      <div className="field">
        <label>Expected CTC (optional · LPA)</label>
        <input type="number" placeholder="e.g. 80" value={ctc}
          onChange={(e) => { setCtc(e.target.value); }}
          onBlur={(e) => checkCtc(e.target.value)} />
        {guide && (
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: guide.ok ? "var(--green)" : "var(--amber)", background: guide.ok ? "var(--green-soft)" : "var(--amber-soft)", border: `1px solid ${guide.ok ? "var(--green-line)" : "var(--amber-line)"}`, borderRadius: 12, padding: "11px 13px" }}>
            {guide.note}
          </div>
        )}
      </div>

      <button className="btn block" style={{ marginTop: 18 }} disabled={!allAnswered}
        onClick={() => onDone({ ...merged(), ...(parseFloat(ctc) > 0 ? { expectedCTC: parseFloat(ctc) } : {}) })}>
        Build my roadmap →
      </button>
    </div>
  );
}
