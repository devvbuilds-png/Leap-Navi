"use client";
import { useRouter } from "next/navigation";

// The dark in-flow header that matches Navi: "Navi ✓ / Career Strategist", back arrow.
export default function ChatHeader({ onBack, onJobs }: { onBack?: () => void; onJobs?: () => void }) {
  const router = useRouter();
  return (
    <div className="navi-bar">
      <button className="back" aria-label="Back" onClick={() => (onBack ? onBack() : router.push("/"))}>←</button>
      <div>
        <div className="who">Navi <span className="vf">✓</span></div>
        <div className="role">Career Strategist</div>
      </div>
      {onJobs && <button className="navi-jobs" aria-label="Jobs you fit" onClick={onJobs}>💼 Jobs</button>}
    </div>
  );
}
