"use client";
import type { CareerPath } from "@/lib/types";

// Full-screen comparison of all paths (Rec #3, expanded): your life, day-to-day, CTC,
// skills required, and how far you are — side by side on desktop, stacked on mobile.
export default function CompareModal({ paths, onClose, onSelect }: {
  paths: CareerPath[];
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const best = paths.reduce((a, b) => (b.matchPct > a.matchPct ? b : a), paths[0]);
  return (
    <div className="cmp-overlay" onClick={onClose}>
      <div className="cmp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmp-modal-h">
          <div><div className="cmp-modal-t">Compare your {paths.length} paths</div><div className="cmp-modal-s">Same you — three futures. Here&apos;s what each one really means.</div></div>
          <button className="cmp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="cmp-cols">
          {paths.map((p) => {
            const move = !p.levelStep ? "Lateral move" : p.levelStep >= 2 ? "Big leap" : "Step up";
            return (
            <div className={`cmp-col ${p.id === best.id ? "win" : ""}`} key={p.id}>
              <div className="cmp-col-h">
                <div className="cmp-col-t">{p.title}</div>
                {p.id === best.id && <span className="cmp-badge">Best fit</span>}
              </div>
              <div className="cmp-tags"><span className="cmp-move">{move}</span><span className="cmp-risk">{p.compare?.risk} risk</span></div>

              <div className="cmp-block">
                <div className="cmp-lbl">How far you are</div>
                <div className="cmp-ready"><div className="cmp-ready-bar"><i style={{ width: `${p.matchPct}%` }} /></div><b>{p.matchPct}% ready</b></div>
                <div className="cmp-sub">{p.levelStep ? `${p.levelStep} level${p.levelStep > 1 ? "s" : ""} up` : "Lateral move"} · {p.compare?.time} · {p.skillsBuild.length} skills to build</div>
              </div>

              <div className="cmp-block">
                <div className="cmp-lbl">CTC</div>
                <div className="cmp-ctc">{fmt(p.band.median)}<span> median</span></div>
                <div className="cmp-sub">range {fmt(p.band.low)} – {fmt(p.band.high)}</div>
              </div>

              <div className="cmp-block">
                <div className="cmp-lbl">Your day-to-day</div>
                <ul className="cmp-list">{(p.dayToDay || p.whatItDoes).slice(0, 2).map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>

              <div className="cmp-block">
                <div className="cmp-lbl">What your life looks like</div>
                <p className="cmp-life">{p.life || "A meaningful step that builds on your strengths."}</p>
              </div>

              <div className="cmp-block">
                <div className="cmp-lbl">Skills you&apos;ll build</div>
                <div className="cmp-skills">{p.skillsBuild.map((s) => <span key={s.name}>{s.name}</span>)}</div>
                {p.skillsHave?.length > 0 && <div className="cmp-have">✓ You already bring: {p.skillsHave.slice(0, 3).join(", ")}</div>}
              </div>

              <button className="btn block" style={{ marginTop: "auto" }} onClick={() => onSelect(p.id)}>Choose this path →</button>
            </div>
          );})}
        </div>

        <div className="cmp-verdict" style={{ margin: "4px 18px 18px" }}>
          <b>Verdict:</b> {best.title} is your strongest fit at {best.matchPct}% — with the pay and supply to back it. The others are real fallbacks, not filler. Pick the one you&apos;d defend in an interview.
        </div>
      </div>
    </div>
  );
}

function fmt(n: number): string { return n >= 100 ? `₹${(n / 100).toFixed(1)}Cr` : `₹${Math.round(n)}L`; }
