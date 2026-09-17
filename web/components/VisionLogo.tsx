// web/components/VisionLogo.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./Header.module.css";

// Matching cubic segments let the O open into an eye without a crossfade.
const letter = "M16 3 C23 3 27 8 27 16 C27 24 23 29 16 29 C9 29 5 24 5 16 C5 8 9 3 16 3 Z";
const eye = "M16 8 C22 8 27 12 30 16 C27 20 22 24 16 24 C10 24 5 20 2 16 C5 12 10 8 16 8 Z";
const times = [0, 0.56, 0.66, 0.78, 0.9, 1];

export default function VisionLogo() {
  const reducedMotion = useReducedMotion();
  const transition = { duration: 8, times, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <span aria-hidden="true" className={styles.wordmark}>
      <span>VISI</span>
      <svg className={styles.logoEye} viewBox="0 0 32 32" fill="none" focusable="false">
        <motion.path
          d={letter}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
          initial={false}
          animate={{ d: reducedMotion ? letter : [letter, letter, eye, eye, letter, letter] }}
          transition={reducedMotion ? { duration: 0 } : transition}
        />
        <motion.circle
          cx="16" cy="16" r="4" fill="currentColor"
          initial={{ opacity: 0 }}
          animate={reducedMotion ? { opacity: 0, cx: 16 } : {
            opacity: [0, 0, 1, 1, 0, 0],
            cx: [16, 16, 19, 13, 16, 16],
          }}
          transition={reducedMotion ? { duration: 0 } : transition}
        />
      </svg>
      <span>NWEB</span>
    </span>
  );
}
