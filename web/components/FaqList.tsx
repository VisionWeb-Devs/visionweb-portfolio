"use client";

import { motion, useReducedMotion } from "motion/react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Uses native <details>/<summary> rather than a hand-rolled accordion: it is
 * keyboard operable, screen-reader friendly and searchable in-page by default,
 * with no state to manage.
 */
const FaqList = ({ items }: { items: FaqItem[] }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="bg-ink text-paper xl:px-36 px-12 xl:py-36 py-20"
    >
      <div className="flex flex-col gap-12 xl:gap-16 max-w-4xl">
        <div className="flex flex-col gap-4">
          <p className="xl:text-lg font-semibold opacity-65">Questions</p>
          <h2 className="xl:text-5xl text-3xl font-semibold leading-tight">
            Things clients usually ask
          </h2>
        </div>

        <div className="flex flex-col">
          {items.map((item, index) => (
            <motion.details
              key={item.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.05,
              }}
              className="group border-b border-paper/20 py-6"
            >
              <summary className="flex items-start justify-between gap-6 text-xl xl:text-2xl font-semibold list-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="opacity-70 leading-relaxed pt-4 max-w-3xl">
                {item.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqList;
