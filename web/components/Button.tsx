"use client";

import { motion, useReducedMotion } from "motion/react";

type ButtonProps = {
  text: string;
};

/**
 * Outlined button with a rolling label.
 *
 * The GSAP version measured `clientHeight` on mount to work out how far to
 * translate each label copy, which meant the animation was wrong until layout
 * settled and stayed wrong after a resize. Percentage transforms are
 * resolution-independent, so no measurement is needed.
 */
const Button = ({ text }: ButtonProps) => {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.28;
  const roll = { duration, ease: "easeOut" } as const;

  return (
    <motion.button
      type="button"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{
        rest: { backgroundColor: "rgba(18, 18, 18, 0)" },
        hover: { backgroundColor: "rgba(18, 18, 18, 1)" },
      }}
      transition={roll}
      className="border-2 border-ink font-semibold px-8 py-2 rounded-md w-fit flex items-center overflow-hidden relative select-none"
    >
      <span className="relative block overflow-hidden leading-tight">
        <motion.span
          className="block text-ink"
          variants={{ rest: { y: "0%" }, hover: { y: "-100%" } }}
          transition={roll}
        >
          {text}
        </motion.span>
        {/* Second copy rolls up into place; hidden from assistive tech so the
            label is not announced twice. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 block text-paper"
          variants={{ rest: { y: "100%" }, hover: { y: "0%" } }}
          transition={roll}
        >
          {text}
        </motion.span>
      </span>
      <motion.span
        aria-hidden="true"
        className="ml-1"
        variants={{
          rest: { rotate: 0, x: 0, color: "#121212" },
          hover: { rotate: 360, x: 5, color: "#e9e8e7" },
        }}
        transition={{ duration: duration * 1.5, ease: "easeOut" }}
      >
        {"->"}
      </motion.span>
    </motion.button>
  );
};

export default Button;
