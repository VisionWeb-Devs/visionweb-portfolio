// web/components/Hero.tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Messages } from "@/i18n";
import styles from "./Hero.module.css";

export default function Hero({ messages }: { messages: Messages["hero"] }) {
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const firstDrift = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const secondDrift = useTransform(scrollYProgress, [0, 1], ["0%", "3%"]);

  return (
    <section ref={section} className={styles.hero} aria-labelledby="hero-title" data-nav-theme="light">
      <div className={styles.topline}>
        <p>{messages.eyebrowOne}</p>
        <a href="#contact" className={styles.smallLink}>{messages.projectCta}<span aria-hidden="true">↗</span></a>
      </div>

      <div className={styles.composition}>
        <h1 id="hero-title" className={styles.title} aria-label="Visionweb Devs">
          <motion.span className={styles.word} style={reduceMotion ? undefined : { x: firstDrift }} aria-hidden="true">
            <span className={styles.reveal}>
              {"Visionweb".split("").map((letter, index) => <span key={index} className={styles.letter}>{letter}</span>)}
            </span>
          </motion.span>
          <motion.span className={styles.secondWord} style={reduceMotion ? undefined : { x: secondDrift }} aria-hidden="true">
            <span className={styles.reveal}>
              {"Devs".split("").map((letter, index) => <span key={index} className={styles.letter}>{letter}</span>)}
              <span className={styles.period}>.</span>
            </span>
          </motion.span>
        </h1>
        <div className={styles.statement}>
          <p>{messages.eyebrowTwo}</p>
          <a href="#work" className={styles.workLink}>
            <span>{messages.workCta}</span>
            <span className={styles.arrowWindow} aria-hidden="true"><span>↗</span><span>↗</span></span>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>{messages.disciplines}</span>
        <a href="#services" className={styles.scroll}>{messages.scroll}<span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
