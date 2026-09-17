// web/hooks/useHeaderScroll.ts
"use client";

import { useEffect, useState } from "react";

/** Direction changes need deliberate movement so touch-scroll jitter cannot flicker the bar. */
export function useHeaderScroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;
    let travel = 0;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const current = Math.max(0, Math.min(window.scrollY, maximum));
      const delta = current - previous;
      previous = current;
      if (current < 120) {
        travel = 0;
        setHidden(false);
        return;
      }
      if (Math.sign(delta) !== Math.sign(travel)) travel = 0;
      travel += delta;
      if (travel > 64) setHidden(true);
      if (travel < -16) setHidden(false);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return hidden;
}
