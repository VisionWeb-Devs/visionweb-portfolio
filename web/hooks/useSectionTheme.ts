"use client";

import { useEffect, useState } from "react";

export type NavTheme = "light" | "dark";

/**
 * Reports whether the section currently behind the fixed header is light or
 * dark, so the header can pick a legible colour explicitly.
 *
 * This replaces `mix-blend-difference`, which looked elegant but only blends
 * against the backdrop inside the same stacking context. Several sections
 * create their own — `position: sticky` and Motion's transforms both do — and
 * where the blend silently fails the header rendered paper-coloured text on a
 * paper background and disappeared.
 *
 * Geometry is read directly rather than through IntersectionObserver because a
 * probe line needs the section that *contains* a point, which rect maths gives
 * directly; with fewer than a dozen sections the cost is trivial, and reads are
 * batched into an animation frame so scrolling does not thrash layout.
 */
export function useSectionTheme(probeY = 32): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const sections =
        document.querySelectorAll<HTMLElement>("[data-nav-theme]");

      let found: NavTheme | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Last match wins, so a nested band (the footer's inset card) can
        // override the panel it sits inside.
        if (rect.top <= probeY && rect.bottom > probeY) {
          const value = section.dataset.navTheme;
          if (value === "light" || value === "dark") found = value;
        }
      }

      if (found) setTheme((current) => (current === found ? current : found));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [probeY]);

  return theme;
}
