"use client";

import { motion, useReducedMotion } from "motion/react";

type LinkProps = {
  text: string;
};

/**
 * Text-roll label used inside anchors.
 *
 * Renders as a span rather than a block element so it stays valid inside the
 * `<a>` tags that wrap it.
 */
const Link = ({ text }: LinkProps) => {
  const reduceMotion = useReducedMotion();
  const roll = {
    duration: reduceMotion ? 0 : 0.2,
    ease: "easeOut",
  } as const;

  return (
    <motion.span
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="relative block overflow-hidden uppercase leading-tight"
    >
      <motion.span
        className="block"
        variants={{ rest: { y: "0%" }, hover: { y: "-100%" } }}
        transition={roll}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block"
        variants={{ rest: { y: "100%" }, hover: { y: "0%" } }}
        transition={roll}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

export default Link;
