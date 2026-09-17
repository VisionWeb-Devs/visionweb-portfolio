"use client";

import { useEffect, useState } from "react";

export type NavTheme = "light" | "dark";

/**
 * Which band sits at a given vertical position.
 *
 * Shared by the header and the cursor so both agree on what is behind them.
 * Reads geometry rather than using IntersectionObserver because the question
 * is which section *contains* a point, which rect maths answers directly.
 * Last match wins, so a nested band — the footer's inset card — overrides the
 * panel it sits inside.
 */
export function sectionThemeAt(y: number): NavTheme | null {
  const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");

  let found: NavTheme | null = null;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= y && rect.bottom > y) {
      const value = section.dataset.navTheme;
      if (value === "light" || value === "dark") found = value;
    }
  }
  return found;
}

/**
 * Reports whether the section behind the fixed header is light or dark, so the
 * header can pick a legible colour explicitly.
 *
 * This replaces `mix-blend-difference`, which looked elegant but only blends
 * against the backdrop inside the same stacking context. Several sections
 * create their own — `position: sticky` and Motion's transforms both do — and
 * where the blend silently fails the element renders unblended, which on a
 * matching background means it disappears.
 */
export function useSectionTheme(probeY = 32): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const found = sectionThemeAt(probeY);
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
