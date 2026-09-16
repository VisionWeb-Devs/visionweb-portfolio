"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Messages } from "@/i18n";

type Step = {
  id: string;
  title: string;
  description: string;
  duration: string | null;
};

const ProcessSteps = ({
  steps,
  messages,
}: {
  steps: Step[];
  messages: Messages["process"];
}) => {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="process"
      data-nav-theme="light"
      className="bg-paper text-ink xl:px-36 px-12 xl:py-36 py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="flex flex-col gap-12 xl:gap-20"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <p className="xl:text-lg font-semibold opacity-65">{messages.eyebrow}</p>
          <h2 className="xl:text-5xl text-3xl font-semibold leading-tight max-w-3xl">
            {messages.heading}
          </h2>
        </motion.div>

        <ol className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              variants={item}
              className="flex flex-col gap-3 border-t border-ink/20 pt-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-5xl font-semibold opacity-20 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.duration && (
                  <span className="text-sm opacity-60">{step.duration}</span>
                )}
              </div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="opacity-70 leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
};

export default ProcessSteps;
