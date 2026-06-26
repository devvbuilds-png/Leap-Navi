import type { SkillItem } from "@/lib/types";

export default function GapMap({ title, gap }: { title: string; gap: SkillItem[] }) {
  return (
    <div className="w">
      <div className="w-t">{title} · your gap, mapped</div>
      <div className="w-s">{gap.length} gaps to close · each tied to exactly what closes it</div>
      {gap.map((g) => (
        <div className="gap-row" key={g.name}>
          <div className="gap-name">{g.name}<small>have {g.havePct}%</small></div>
          <div>
            <div className="gap-bar"><i style={{ width: `${g.havePct}%` }} /></div>
            <div className="gap-meta">Closes with: {g.closesWith}</div>
          </div>
        </div>
      ))}
      <div className="w-measure"><b>Measure</b> · % of users who can name their top gap after viewing</div>
    </div>
  );
}
