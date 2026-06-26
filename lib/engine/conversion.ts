import type { Profile, Answers, OutcomeMath, Offer } from "../types";

/**
 * The monetisation engine. This is how Navi+ makes Leap money — by routing each user to the
 * RIGHT next step at the right moment, tied to the outcome math so conversion follows trust.
 *
 *  - Short-term skill gap / quick switch   -> Unacademy courses + Resume rework
 *  - Decision moment (always)              -> matched 1:1 Mentor
 *  - Long horizon / pivot / needs credential / high upside -> MBA  => Leap Finance acquisition
 */
export function chooseOffers(profile: Profile, answers: Answers, outcome: OutcomeMath): Offer[] {
  const yrs = profile.totalMonths / 12;
  const offers: Offer[] = [];

  // ---- MBA / Leap Finance: the high-LTV acquisition ----
  const mbaSignals =
    profile.seniority === "grad" ||
    profile.seniority === "early" ||
    answers.upskillMode === "masters" ||
    (answers.intent === "switch" && outcome.upliftPct >= 60) ||
    (yrs >= 2 && yrs <= 6 && (answers.budget === "5-8L+" || answers.timeline === "12+"));

  const mbaPrimary = mbaSignals && (answers.upskillMode === "masters" || profile.seniority === "early" || profile.seniority === "grad");

  if (mbaSignals) {
    offers.push({
      kind: "mba",
      emoji: "🎓",
      title: "A top MBA could change your ceiling — fund it with Leap Finance",
      desc: `Your ${outcome.upliftPct}% target is the kind of jump an MBA accelerates. See programs you'd get into, and a Leap Finance education loan to fund it (no collateral, study-now-pay-later).`,
      cta: "Explore MBA + financing →",
      primary: mbaPrimary,
      highlightMBA: true,
    });
  }

  // ---- Mentor: the decision-moment conversion (always present) ----
  offers.push({
    kind: "mentor",
    emoji: "🧭",
    title: "Pressure-test this with someone who made the exact move",
    desc: `A 1:1 with a matched expert — is your ${outcome.medianLPA}L target realistic, which gaps actually block offers, and warm intros. This is where most people get unstuck.`,
    cta: "Book a 1:1 →",
    primary: !mbaPrimary,
  });

  // ---- Unacademy courses: close the gaps (short-term LTV) ----
  if (answers.budget !== "free" || true) {
    offers.push({
      kind: "courses",
      emoji: "📚",
      title: "Close your top gaps with focused courses",
      desc: "Each course is mapped to a specific gap on your plan — not a generic catalogue. Start free, upgrade for certificates that show up on the JDs you're targeting.",
      cta: "See your mapped courses →",
      primary: false,
    });
  }

  // ---- Resume rework: when they're actively moving ----
  if (answers.company === "leave" || answers.timeline === "3-4" || answers.intent === "switch") {
    offers.push({
      kind: "resume",
      emoji: "📄",
      title: "Rework your resume around the target role",
      desc: `Recruiters for ${outcome.medianLPA}L roles scan for specific signals. Get yours rewritten around the must-haves we pulled from live JDs.`,
      cta: "Improve my resume →",
      primary: false,
    });
  }

  // exactly one primary
  if (!offers.some((o) => o.primary) && offers[0]) offers[0].primary = true;
  // primary first
  return offers.sort((a, b) => Number(b.primary) - Number(a.primary));
}
