import type { OutcomeMath } from "@/lib/types";
import { fmtLPA } from "@/lib/engine/outcome";

export default function OutcomeMathW({ o }: { o: OutcomeMath }) {
  return (
    <div className="w">
      <div className="w-t">Is this move worth it?</div>
      <div className="w-s">{o.basis}</div>
      <div className="om-top">
        <div>
          <div className="om-lbl">Median outcome</div>
          <div className="om-big">{fmtLPA(o.medianLPA)}<span className="d">+{o.upliftPct}%</span></div>
          <div className="om-rng">likely range {fmtLPA(o.lowLPA)} – {fmtLPA(o.highLPA)}</div>
        </div>
        <div>
          <div className="om-lbl">Confidence</div>
          <div className="om-prob">{o.probabilityPct}%</div>
          <div className="om-rng">reach target within {o.timelineLabel}</div>
        </div>
      </div>
      <div className="bar"><i style={{ width: `${o.probabilityPct}%` }} /></div>
      <div className="om-foot">
        <div className="om-cell"><span className="om-k">Upskilling cost</span><span className="om-v">{o.upskillCostLPA}</span></div>
        <div className="om-cell"><span className="om-k">Stay put · 3yr</span><span className="om-v">{o.stay3yr}</span></div>
        <div className="om-cell"><span className="om-k">Switch · 3yr</span><span className="om-v">{o.switch3yr}</span></div>
      </div>
      <div className="w-measure"><b>Why this matters</b> · this is the answer ChatGPT can't give — grounded outcome math, not a roadmap.</div>
    </div>
  );
}
