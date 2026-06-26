import type { Profile, Answers, CareerPath, OutcomeMath, CtcGuidance } from "../types";
import { estimateBand, bandBasis } from "../../data/salaryBands";

export function fmtLPA(n: number): string {
  if (n >= 100) return `₹${(n / 100).toFixed(1)}Cr`;
  return `₹${Math.round(n)}L`;
}

function inferCurrent(p: Profile): number {
  const yrs = p.totalMonths / 12;
  if (p.seniority === "leader") return Math.round(55 + yrs);
  if (p.seniority === "senior") return Math.round(35 + yrs);
  if (p.seniority === "mid") return Math.round(22 + yrs);
  if (p.seniority === "early") return 14;
  return 9;
}

const TIMELINE_LABEL: Record<string, string> = { "3-4": "3–4 months", "6-8": "6–8 months", "12+": "12+ months" };

export function computeOutcome(profile: Profile, path: CareerPath, answers: Answers): OutcomeMath {
  const years = profile.totalMonths / 12;
  const current = answers.currentCTC && answers.currentCTC > 0 ? answers.currentCTC : inferCurrent(profile);

  // Prefer the path's researched band; fall back to a fresh estimate from the title.
  const band = path.band && path.band.median ? path.band : estimateBand(path.title, years, profile.city);
  let median = band.median;
  let low = band.low;
  let high = band.high;
  // a deliberate switch should beat staying; nudge the whole band up if it lands below current
  if (median <= current) {
    const f = (current * 1.15) / median;
    median = Math.round(median * f); low = Math.round(low * f); high = Math.round(high * f);
  }

  const upliftPct = Math.max(0, Math.round(((median - current) / current) * 100));

  // probability: more gaps + shorter timeline => lower odds. Honest, bounded.
  const gaps = path.skillsBuild.length;
  let prob = 78 - gaps * 4;
  if (answers.timeline === "3-4") prob -= 10;
  if (answers.timeline === "12+") prob += 6;
  if (profile.seniority === "leader") prob += 4;
  prob = Math.max(45, Math.min(88, prob));

  const costByBudget: Record<string, string> = { free: "₹0 (free tracks)", "<1L": "≈₹0.8L", "1-5L": "≈₹3.2L", "5-8L+": "≈₹6.5L" };
  const upskillCostLPA = costByBudget[answers.budget || "1-5L"];

  const stayEnd = Math.round(current * 1.22);
  const switchEnd = Math.round(median * 1.45);

  return {
    currentLPA: current,
    medianLPA: median,
    lowLPA: low,
    highLPA: high,
    upliftPct,
    probabilityPct: prob,
    timelineLabel: TIMELINE_LABEL[answers.timeline || "6-8"],
    upskillCostLPA,
    stay3yr: `${fmtLPA(current)} → ${fmtLPA(stayEnd)}`,
    switch3yr: `${fmtLPA(median)} → ${fmtLPA(switchEnd)}`,
    basis: answers.currentCTC
      ? `Modelled from your stated ₹${current}L and ${bandBasis(path.title, years, profile.city)}`
      : `Estimated from your seniority (no exact CTC given) and ${bandBasis(path.title, years, profile.city)} Add your CTC for a tighter range.`,
  };
}

// Rec #1 reframe: expected-CTC realism as HELPFUL guidance (range + why), never only a wall.
export function ctcGuidance(profile: Profile, path: CareerPath, expectedCTC: number): CtcGuidance {
  const years = profile.totalMonths / 12;
  const band = path.band && path.band.median ? path.band : estimateBand(path.title, years, profile.city);
  const realisticMax = band.high;
  const ok = expectedCTC <= realisticMax * 1.05;
  const note = ok
    ? `₹${expectedCTC}L is within reach for ${path.title} — the band runs ${fmtLPA(band.low)}–${fmtLPA(band.high)} (median ${fmtLPA(band.median)}). Closing your top gap before you interview is the biggest lever on landing the upper end.`
    : `₹${expectedCTC}L is above the realistic ceiling for ${path.title} right now (band ${fmtLPA(band.low)}–${fmtLPA(band.high)}, median ${fmtLPA(band.median)}). It's reachable in a step or two — aim for ${fmtLPA(band.high)} on this move, then the next jump. Want me to show what gets you to the top of the band?`;
  return { ok, realisticMax, median: band.median, low: band.low, note };
}
