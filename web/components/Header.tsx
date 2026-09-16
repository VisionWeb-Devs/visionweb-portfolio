"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Fades itself in after the hero's entrance.
 *
 * Previously this was a plain server component whose opacity was animated by
 * Hero via a `#header` selector — Hero reached across the tree to control a
 * sibling of its own parent. It owns its own entrance now.
 */
const Header = () => {
  const reduceMotion = useReducedMotion();

  return (
    <header className="xl:px-36 xl:py-12 py-6 px-12 bg-transparent absolute top-0 left-0 w-full flex justify-end text-ink font-medium z-10">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          delay: reduceMotion ? 0 : 1.2,
        }}
        className="2xl:text-xl"
      >
        Contact
      </motion.span>
    </header>
  );
};

export default Header;
