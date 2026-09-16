"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Messages } from "@/i18n";

const Hero = ({ messages }: { messages: Messages["hero"] }) => {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.18, delayChildren: 0.1 },
    },
  };

  // Mask reveal: each line wipes in from its own baseline.
  const line: Variants = {
    hidden: { y: "50%", clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
      y: "0%",
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fade: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 1.2 },
    },
  };

  return (
    <div
      data-nav-theme="light"
      className="h-screen bg-paper text-ink flex justify-center items-center relative"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col gap-4 xl:gap-0 items-center font-medium text-sm"
      >
        <p className="opacity-85 flex flex-col items-center">
          <motion.span variants={line} className="block">
            {messages.eyebrowOne}
          </motion.span>
          <motion.span variants={line} className="block">
            {messages.eyebrowTwo}
          </motion.span>
        </p>
        <h1 className="2xl:text-[10rem] md:text-9xl text-5xl leading-[0.85] select-none flex flex-col">
          <motion.span variants={line} className="block">
            Visionweb
          </motion.span>
          <motion.span variants={line} className="block">
            Devs
          </motion.span>
        </h1>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fade}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 font-[400] text-sm xl:text-base"
      >
        {messages.scroll}
      </motion.div>
    </div>
  );
};

export default Hero;
