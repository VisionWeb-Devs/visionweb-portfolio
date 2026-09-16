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

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onDown = () => scale.set(0.5);
    const onUp = () => scale.set(1);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
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
      className="pointer-events-none fixed top-0 left-0 z-50 -mt-2 -ml-2 hidden h-4 w-4 rounded-full bg-paper mix-blend-difference [@media(pointer:fine)]:block"
    />
  );
};

export default Cursor;
