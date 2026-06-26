import type { CompanyFit } from "@/lib/types";

export default function CompaniesFit({ companies }: { companies: CompanyFit[] }) {
  return (
    <div className="w">
      <div className="w-t">Companies you'd actually fit</div>
      <div className="w-s">Filtered to your archetype + stage — not a generic list</div>
      <div className="co-grid">
        {companies.map((c) => (
          <div className="co" key={c.name}>
            <div><span className="nm">{c.name}</span><span className="st">{c.stage}</span></div>
            <div className="wy">{c.why}</div>
            <div className="wy" style={{ color: "var(--green)", marginTop: 4 }}>Hiring: {c.hiringFor}</div>
          </div>
        ))}
      </div>
      <div className="w-measure"><b>Practical next step</b> · a warm intro through a mentor beats a cold application every time.</div>
    </div>
  );
}
