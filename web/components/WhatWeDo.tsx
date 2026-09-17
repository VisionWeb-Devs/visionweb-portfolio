// web/components/WhatWeDo.tsx
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import NextLink from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import styles from "./Editorial.module.css";

export default function WhatWeDo({ locale, messages }: {
  locale: Locale;
  messages: Messages["services"];
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  return (
    <section id="services" data-nav-theme="light" className={styles.services} aria-labelledby="services-title">
      <div className={styles.servicesIntro}>
        <p className={styles.sectionLabel}>{messages.eyebrow}</p>
        <h2 id="services-title">{messages.heading}</h2>
        <p className={styles.servicesCopy}>{messages.intro}</p>
      </div>
      <div className={styles.servicesBody}>
        <div className={styles.serviceArt} aria-hidden="true" data-active={active}>
          <div className={styles.artCaption}>VISION / FORM / FUNCTION</div>
          <motion.div className={styles.artMark} animate={{ rotate: reduceMotion ? 0 : active * 90 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span /><span /><span /><span />
          </motion.div>
          <div className={styles.artFooter}><span>VWD®</span><span>{messages.items[active].title}</span></div>
        </div>
        <div className={styles.serviceList}>
          {messages.items.map((item, index) => (
            <div key={item.title} className={styles.serviceRow} data-open={active === index}>
              <h3>
                <button type="button" aria-expanded={active === index} aria-controls={`service-panel-${index}`} onClick={() => setActive(index)}>
                  <span>{item.title}</span><span className={styles.serviceArrow} aria-hidden="true">↗</span>
                </button>
              </h3>
              <div id={`service-panel-${index}`} className={styles.servicePanel} inert={active !== index}>
                <div><p>{item.description}</p><p className={styles.serviceTags}>{item.detail}</p></div>
              </div>
            </div>
          ))}
          <NextLink className={styles.textLink} href={`/${locale}#work`}>{messages.cta} <span aria-hidden="true">↗</span></NextLink>
        </div>
      </div>
    </section>
  );
}
