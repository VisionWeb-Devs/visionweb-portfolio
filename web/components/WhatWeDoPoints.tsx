"use client";

import Button from "@/components/Button";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";


const WhatWeDoPoints = ({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages["services"];
}) => {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };

  const slideIn: Variants = {
    hidden: { x: reduceMotion ? 0 : -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  const riseIn: Variants = {
    hidden: { y: reduceMotion ? 0 : 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className="flex flex-col gap-4 xl:gap-8"
    >
      <span>
        <motion.p
          variants={riseIn}
          className="xl:text-lg font-semibold opacity-65"
        >
          {messages.eyebrow}
        </motion.p>
        <motion.h2
          variants={riseIn}
          className="xl:text-5xl text-2xl font-semibold leading-tight"
        >
          {messages.heading}
        </motion.h2>
      </span>
      <ul className="list-disc list-inside">
        {messages.points.map((point) => (
          <motion.li key={point} variants={slideIn}>
            {point}
          </motion.li>
        ))}
      </ul>
      <motion.div variants={slideIn}>
        <Button text={messages.cta} href={`/${locale}#work`} />
      </motion.div>
    </motion.div>
  );
};

export default WhatWeDoPoints;
