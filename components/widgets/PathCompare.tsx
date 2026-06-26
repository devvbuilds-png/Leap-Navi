"use client";
import type { CareerPath } from "@/lib/types";

const ROWS: { k: string; get: (p: CareerPath) => string; hot?: boolean }[] = [
  { k: "Match", get: (p) => `${p.matchPct}%`, hot: true },
  { k: "Median pay", get: (p) => p.compare?.pay || "—" },
  { k: "Time", get: (p) => p.compare?.time || "—" },
  { k: "Skill gap", get: (p) => p.compare?.gap || "—" },
  { k: "Risk", get: (p) => p.compare?.risk || "—" },
];

// The decision screen (Rec #3): all paths side-by-side with a verdict.
export default function PathCompare({ paths }: { paths: CareerPath[] }) {
  const cols = `82px repeat(${paths.length}, 1fr)`;
  const best = paths.find((p) => p.bestMatch) || paths[0];
  const bestI = paths.indexOf(best);
  return (
    <div className="w">
      <div className="w-t">Compare all {paths.length}, then decide</div>
      <div className="w-s">Side by side — the decision screen, not one card at a time</div>
      <div className="cmp" style={{ gridTemplateColumns: cols }}>
        <div className="rk" />
        {paths.map((p, i) => (<div className={`ch ${i === bestI ? "win" : ""}`} key={p.id}>{shortTitle(p.title)}{i === bestI ? " ★" : ""}</div>))}
        {ROWS.map((r) => (
          <Row key={r.k} label={r.k} cells={paths.map((p) => r.get(p))} hotIdx={r.hot ? bestI : -1} />
        ))}
      </div>
      <div className="cmp-verdict">
        <b>Verdict:</b> {best.title} is your strongest move — highest fit at {best.matchPct}%, with the pay and supply to back it. The others are real fallbacks, not filler. Pick the one you&apos;d defend in an interview.
      </div>
    </div>
  );
}

function shortTitle(t: string): string {
  return t.includes("–") ? t.split("–").slice(-1)[0].trim() : t.length > 16 ? t.slice(0, 15) + "…" : t;
}

function Row({ label, cells, hotIdx }: { label: string; cells: string[]; hotIdx: number }) {
  return (
    <>
      <div className="rk">{label}</div>
      {cells.map((c, i) => (<div className={`cell ${i === hotIdx ? "hot" : ""}`} key={i}>{c}</div>))}
    </>
  );
}
