// Deterministic salary model — the "outcome math" engine's ground truth.
// Grounded in India 2025-26 compensation research (productleadership, levels.fyi, recrew,
// aakashg PM survey, omnivoo): APM ₹12-22L · PM ₹22-48L · Sr PM ₹38-75L · Director ₹65-150L
// (avg ~95L) · VP ₹110L-2.4Cr (w/ ESOPs) · SWE-sr ₹35-75L · DS-sr ₹28-60L · Bangalore +20-35%.
// In prod this is replaced by Leap's earning-potential model from loan underwriting.

export type Family =
  | "apm" | "pm" | "senior-pm" | "principal" | "director" | "vp" | "cpo"
  | "founding" | "growth" | "data-sr" | "data-staff" | "swe-sr" | "swe-staff"
  | "design-lead" | "consulting";

export interface Band { low: number; median: number; high: number; }

// Reference total-comp bands (LPA) at the level's typical experience, India product-cos.
const BANDS: Record<Family, Band> = {
  apm:          { low: 12, median: 18,  high: 28 },
  pm:           { low: 22, median: 32,  high: 48 },
  "senior-pm":  { low: 38, median: 52,  high: 75 },
  principal:    { low: 55, median: 72,  high: 98 },   // GPM / Principal PM
  director:     { low: 65, median: 95,  high: 150 },
  vp:           { low: 110, median: 155, high: 240 },
  cpo:          { low: 180, median: 260, high: 450 },
  founding:     { low: 40, median: 60,  high: 90 },   // cash; equity is the real upside
  growth:       { low: 35, median: 48,  high: 70 },
  "data-sr":    { low: 28, median: 42,  high: 60 },
  "data-staff": { low: 60, median: 92,  high: 160 },
  "swe-sr":     { low: 35, median: 52,  high: 75 },
  "swe-staff":  { low: 70, median: 110, high: 180 },
  "design-lead":{ low: 30, median: 45,  high: 65 },
  consulting:   { low: 28, median: 40,  high: 60 },
};

const CITY_MULT: Record<string, number> = {
  Bangalore: 1.0, Bengaluru: 1.0, Gurgaon: 0.98, Mumbai: 0.97, Hyderabad: 0.95,
  Pune: 0.92, Delhi: 0.97, Chennai: 0.9, Remote: 1.03, default: 0.9,
};

export function familyForRole(title: string): Family {
  const t = title.toLowerCase();
  if (t.includes("cpo") || t.includes("chief product")) return "cpo";
  if (t.includes("chief") || t.includes("cxo") || t.includes(" ceo")) return "cpo"; // any C-suite → exec band
  if (t.includes("vp") || t.includes("vice president")) return "vp";
  if (t.includes("founding") || t.includes("founder")) return "founding";
  if (t.includes("head of")) return "director"; // "Head of X" ≈ director-level leadership
  if (t.includes("director")) return "director";
  if (t.includes("principal") || t.includes("group product") || t.includes("gpm")) return "principal";
  if (t.includes("growth")) return "growth";
  if (t.includes("staff") && t.includes("data")) return "data-staff";
  if (t.includes("data") || t.includes("ml ") || t.includes("machine learning")) return "data-sr";
  if (t.includes("staff") && (t.includes("engineer") || t.includes("swe"))) return "swe-staff";
  if (t.includes("engineer") || t.includes("swe")) return "swe-sr";
  if (t.includes("design")) return "design-lead";
  if (t.includes("consult")) return "consulting";
  if (t.includes("senior") || t.includes("sr.") || t.includes("sr ")) return "senior-pm";
  if (t.includes("associate") || t.includes("apm")) return "apm";
  return "pm";
}

// Gentle within-level experience nudge: more years -> upper part of the band.
function expAdj(years: number): number {
  // 0 at ~6yrs, +/- ~8% across a working life, capped.
  return 1 + Math.max(-0.06, Math.min(0.12, (Math.min(years, 20) - 6) * 0.012));
}

// Full band (low/median/high) for a target role given years + city.
export function estimateBand(title: string, years: number, city: string): Band & { family: Family } {
  const family = familyForRole(title);
  const b = BANDS[family];
  const mult = (CITY_MULT[city] ?? CITY_MULT.default) * expAdj(years);
  return {
    family,
    low: Math.round(b.low * mult),
    median: Math.round(b.median * mult),
    high: Math.round(b.high * mult),
  };
}

// Convenience: median only (back-compat for callers that want a single point).
export function estimateLPA(title: string, years: number, city: string): number {
  return estimateBand(title, years, city).median;
}

// Human-readable basis line for transparency (kills "fabricated precision from a band").
export function bandBasis(title: string, years: number, city: string): string {
  const fam = familyForRole(title);
  const label: Record<Family, string> = {
    apm: "APM", pm: "PM", "senior-pm": "Senior PM", principal: "Principal/GPM",
    director: "Director", vp: "VP", cpo: "CPO", founding: "Founding PM",
    growth: "Growth", "data-sr": "Senior Data", "data-staff": "Staff Data",
    "swe-sr": "Senior Eng", "swe-staff": "Staff Eng", "design-lead": "Design Lead", consulting: "Consulting",
  };
  return `${label[fam]} bands for ${city}, adjusted for ~${Math.round(years)} yrs experience (India 2025-26 market data).`;
}
