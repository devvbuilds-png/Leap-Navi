import type { Mentor } from "@/lib/types";

export default function ExpertCard({ m, onBook }: { m: Mentor; onBook?: () => void }) {
  return (
    <div className="w">
      <div className="xp">
        <div className="xp-av">{m.initials}</div>
        <div>
          <div className="xp-name">{m.name}</div>
          <div className="xp-role">{m.role}</div>
          <div className="xp-match">{m.match}</div>
        </div>
      </div>
      <ul className="xp-list">{m.gets.map((g) => <li key={g}>{g}</li>)}</ul>
      <button className="btn sm" style={{ marginTop: 14 }} onClick={onBook}>Book {m.name.split(" ")[0]} · {m.slot}</button>
      <div className="w-measure"><b>Measure</b> · booking rate as a result of trust, not button frequency</div>
    </div>
  );
}
