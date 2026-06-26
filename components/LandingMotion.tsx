"use client";

import { useEffect } from "react";

/**
 * Landing-page motion layer. Pure DOM side-effects so the page stays
 * server-rendered. Three jobs, nothing decorative:
 *   1. scroll-reveal  — sections/cards fade+rise once as they enter view
 *   2. count-up       — hero target number + stat band tick to their value
 *   3. bar fill       — hero outcome bar grows 0 -> target width
 * All of it is short, fires ONCE, and collapses to a plain fade (or nothing)
 * under prefers-reduced-motion.
 */
export default function LandingMotion() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    function countUp(el: HTMLElement) {
      const to = parseFloat(el.dataset.to ?? "0");
      const from = parseFloat(el.dataset.from ?? "0");
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      const render = (v: number) => `${prefix}${v}${suffix}`;
      if (reduce) {
        el.textContent = render(to);
        return;
      }
      const dur = 950;
      let start: number | null = null;
      const frame = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = render(Math.round(from + (to - from) * easeOut(p)));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }

    // ---- 1. scroll reveal ----
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );
    let revealIO: IntersectionObserver | null = null;
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      revealIO = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -48px 0px" }
      );
      revealEls.forEach((el) => revealIO!.observe(el));
    }

    // ---- 2a. hero count-up + bar fill (above the fold, fire now) ----
    document
      .querySelectorAll<HTMLElement>("[data-hero-count]")
      .forEach((el) => countUp(el));

    // Markup renders the final width (so no-JS shows a filled bar). Here we
    // snap to 0, force a reflow, then animate back so the transition plays.
    document.querySelectorAll<HTMLElement>("[data-fill]").forEach((el) => {
      if (reduce) return; // leave the rendered width as-is
      const w = `${el.dataset.fill}%`;
      el.style.width = "0%";
      void el.offsetWidth; // reflow
      requestAnimationFrame(() => (el.style.width = w));
    });

    // ---- 2b. stat band count-up (fire when scrolled into view) ----
    const statEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stat-count]")
    );
    let statIO: IntersectionObserver | null = null;
    if (reduce) {
      statEls.forEach((el) => countUp(el));
    } else {
      statIO = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              countUp(e.target as HTMLElement);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      statEls.forEach((el) => statIO!.observe(el));
    }

    return () => {
      revealIO?.disconnect();
      statIO?.disconnect();
    };
  }, []);

  return null;
}
