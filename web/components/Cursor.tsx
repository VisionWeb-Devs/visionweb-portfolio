"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { sectionThemeAt, type NavTheme } from "@/hooks/useSectionTheme";

/**
 * The brand's custom cursor.
 *
 * Colour is chosen from the band under the pointer rather than produced by
 * mix-blend-difference. The blend only composites against the backdrop inside
 * the same stacking context, and `position: sticky` and Motion's transforms
 * both create one — so on the pinned sections it silently failed. It also
 * could not work at all for a mono-dark theme, where the dot and the page
 * were the same colour and the difference was nothing.
 *
 * The probe uses the pointer's own Y rather than the header's, because the
 * cursor roams the whole viewport, and it runs inside the same animation frame
 * as the position update so it costs no extra layout pass.
 */
const Cursor = () => {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<NavTheme>("light");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useSpring(1, { stiffness: 700, damping: 40 });

  useEffect(() => {
    if (reduceMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)");
    const syncPointer = () => {
      if (finePointer.matches) document.documentElement.dataset.customCursor = "true";
      else delete document.documentElement.dataset.customCursor;
    };
    syncPointer();
    finePointer.addEventListener("change", syncPointer);

    const interactive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("a, button, summary, [role='button']"));

    let frame = 0;
    let latestY = -100;

    const measure = () => {
      frame = 0;
      const found = sectionThemeAt(latestY);
      if (found) setTheme((current) => (current === found ? current : found));
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      latestY = event.clientY;
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const onOver = (event: PointerEvent) => scale.set(interactive(event.target) ? 1.8 : 1);
    const onDown = () => scale.set(0.65);
    const onUp = (event: PointerEvent) => scale.set(interactive(event.target) ? 1.8 : 1);
    const onLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) { x.set(-100); y.set(-100); }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onLeave);
      finePointer.removeEventListener("change", syncPointer);
      delete document.documentElement.dataset.customCursor;
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion, x, y, scale]);

  // Mounted for fine pointers only, matching the `cursor: none` rule in
  // globals.css exactly, and never when reduced motion is requested.
  if (reduceMotion) return null;

  // Contrast with the band underneath: the foreground colour of that surface
  // is by definition readable against it, in every theme.
  const dot = theme === "dark" ? "bg-on-surface-alt" : "bg-on-surface";

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, scale }}
      // Centred with negative margins rather than `-translate-*` utilities,
      // because Motion writes its own `transform` and would override them.
      className={`pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] -mt-2 -ml-2 hidden h-4 w-4 rounded-full ${dot} transition-colors duration-200 [@media(pointer:fine)]:block`}
    />
  );
};

export default Cursor;
