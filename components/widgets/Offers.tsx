"use client";
import type { Offer } from "@/lib/types";

export default function Offers({ offers, onPick }: { offers: Offer[]; onPick?: (kind: string) => void }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div className="w-t" style={{ marginBottom: 2 }}>Your best next step</div>
      <div className="w-s">Tied to your numbers — so it&apos;s the move that actually pays off.</div>
      {offers.map((o) => (
        <div className={`offer ${o.primary ? "primary" : ""} ${o.highlightMBA ? "mba" : ""}`} key={o.kind} onClick={() => onPick?.(o.kind)} style={{ cursor: "pointer" }}>
          <div className="em">{o.emoji}</div>
          <div className="body">
            <div className="t">{o.title}{o.primary && <span style={{ color: "var(--green)", fontSize: 10, marginLeft: 8, fontWeight: 700 }}>RECOMMENDED</span>}</div>
            <div className="d">{o.desc}</div>
          </div>
          <span className="go">→</span>
        </div>
      ))}
    </div>
  );
}
