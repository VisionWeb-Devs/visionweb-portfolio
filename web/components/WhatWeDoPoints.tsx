"use client";

import Button from "@/components/Button";
import { motion, useReducedMotion, type Variants } from "motion/react";

const points = [
  "We are a team of developers and designers who can help you achieve your goals.",
  "We specialize in creating websites and web applications that are tailored to your needs.",
  "Whether you need a simple website or a complex web application, we can help you.",
  "We have experience working with clients from a variety of industries and can help you achieve your goals.",
];

const WhatWeDoPoints = () => {
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
      id="whatwedo"
    >
      <span>
        <motion.p
          variants={riseIn}
          className="xl:text-lg font-semibold opacity-65"
        >
          What we do
        </motion.p>
        <motion.h2
          variants={riseIn}
          className="xl:text-5xl text-2xl font-semibold leading-tight"
        >
          Want to take your buisness <br /> to the next level?
        </motion.h2>
      </span>
      <ul className="list-disc list-inside">
        {points.map((point) => (
          <motion.li key={point} variants={slideIn}>
            {point}
          </motion.li>
        ))}
      </ul>
      <motion.div variants={slideIn}>
        <Button text={`Our team`} />
      </motion.div>
    </motion.div>
  );
};

export default WhatWeDoPoints;
