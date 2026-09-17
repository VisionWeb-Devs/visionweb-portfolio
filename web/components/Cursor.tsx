"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * The brand's custom cursor.
 *
 * Rewritten from the GSAP version, which positioned itself `absolute` and kept a
 * scroll listener alive purely to re-apply `top: window.scrollY` — a manual
 * reimplementation of `position: fixed`. It also registered four document
 * listeners and removed none of them, because each `removeEventListener` call
 * passed a freshly-created empty arrow function.
 */
const Cursor = () => {
  const reduceMotion = useReducedMotion();

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

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: PointerEvent) => scale.set(interactive(event.target) ? 1.8 : 1);
    const onDown = () => scale.set(0.65);
    const onUp = (event: PointerEvent) => scale.set(interactive(event.target) ? 1.8 : 1);
    const onLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) { x.set(-100); y.set(-100); }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onLeave);
      finePointer.removeEventListener("change", syncPointer);
      delete document.documentElement.dataset.customCursor;
    };
  }, [reduceMotion, x, y, scale]);

  // Mounted for fine pointers only, matching the `cursor: none` rule in
  // globals.css exactly, and never when reduced motion is requested.
  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, scale }}
      // Centred with negative margins rather than `-translate-*` utilities,
      // because Motion writes its own `transform` and would override them.
      className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] -mt-2 -ml-2 hidden h-4 w-4 rounded-full bg-paper mix-blend-difference [@media(pointer:fine)]:block"
    />
  );
};

export default Cursor;
