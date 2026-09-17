// web/components/FaqList.tsx
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Messages } from "@/i18n";
import styles from "./Editorial.module.css";

type FaqItem = { id: string; question: string; answer: string };

export default function FaqList({ items, messages }: {
  items: FaqItem[];
  messages: Messages["faq"];
}) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const [turns, setTurns] = useState(0);
  const reduceMotion = useReducedMotion();
  return (
    <section id="faq" data-nav-theme="dark" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.faqIntro}>
        <p className={styles.sectionLabel}>{messages.eyebrow}</p>
        <h2 id="faq-title">{messages.heading}</h2>
        <motion.div aria-hidden="true" className={styles.faqSymbol} animate={{ rotate: reduceMotion ? 0 : turns * 90 }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>✳</motion.div>
        <p className={styles.faqNote}>{messages.note}</p>
      </div>
      <div className={styles.faqList}>
        {items.map((item, index) => {
          const open = active === item.id;
          return (
            <div key={item.id} className={styles.faqRow} data-open={open}>
              <h3>
                <button id={`faq-button-${item.id}`} type="button" aria-expanded={open} aria-controls={`faq-panel-${item.id}`} onClick={() => { setActive(open ? null : item.id); setTurns(value => value + 1); }}>
                  <span className={styles.faqNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.question}</span>
                  <span className={styles.faqPlus} aria-hidden="true"><i /><i /></span>
                </button>
              </h3>
              <div id={`faq-panel-${item.id}`} role="region" aria-labelledby={`faq-button-${item.id}`} className={styles.faqAnswer} inert={!open}>
                <div><p>{item.answer}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
