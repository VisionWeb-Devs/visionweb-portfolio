"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Messages } from "@/i18n";

type PartnerHeroProps = {
  name: string;
  tagline: string | null;
  messages: Messages["hero"];
  ctaLabel: string;
};

const PartnerHero = ({ name, tagline, messages, ctaLabel }: PartnerHeroProps) => {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.15, delayChildren: 0.1 },
    },
  };

  const line: Variants = {
    hidden: { y: "40%", clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
      y: "0%",
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      data-nav-theme="light"
      className="min-h-screen bg-surface text-on-surface flex flex-col justify-center items-center text-center px-8 relative"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col items-center gap-6"
      >
        <motion.h1
          variants={line}
          className="2xl:text-[9rem] md:text-8xl text-5xl font-semibold leading-[0.9] tracking-tight"
        >
          {name}
        </motion.h1>
        {tagline && (
          <motion.p
            variants={line}
            className="text-lg xl:text-2xl opacity-70 max-w-2xl"
          >
            {tagline}
          </motion.p>
        )}
        <motion.a
          variants={line}
          href="#pricing"
          className="bg-accent text-on-accent rounded-full px-10 py-4 font-semibold mt-4"
        >
          {ctaLabel}
        </motion.a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 1.2 }}
        className="absolute bottom-12 text-sm opacity-60"
      >
        {messages.scroll}
      </motion.div>
    </div>
  );
};

export default PartnerHero;
