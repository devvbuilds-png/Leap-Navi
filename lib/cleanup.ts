import { db } from "@/lib/db";

// How long a session's personal data is kept. After this, the resume/answers/plan
// are wiped — but the session row + analytics events are KEPT so funnel metrics survive.
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Wipe personal/working data off sessions older than the TTL.
// Idempotent and cheap: only touches stale rows that still hold data.
export async function purgeStaleSessionData(): Promise<number> {
  const cutoff = new Date(Date.now() - TTL_MS);
  const result = await db.session.updateMany({
    where: {
      createdAt: { lt: cutoff },
      // only rows that still carry personal data — avoids re-touching already-wiped rows
      profileJson: { not: null },
    },
    data: {
      profileJson: null,
      answersJson: null,
      pathsJson: null,
      planJson: null,
    },
  });
  return result.count;
}
