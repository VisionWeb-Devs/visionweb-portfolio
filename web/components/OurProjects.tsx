"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform, useReducedMotion } from "motion/react";
import ProjectCard from "./ProjectCard";
import type { ProjectView } from "@/types/view";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import styles from "./Portfolio.module.css";

type OurProjectsProps = {
  projects: ProjectView[];
  locale: Locale;
  messages: Messages["work"];
};

const OurProjects = ({ projects, locale, messages }: OurProjectsProps) => {
  const reduceMotion = useReducedMotion();
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const section = container.current;
    const content = track.current;
    if (!section || !content) return;

    const measure = () => {
      const travel = Math.max(0, content.scrollWidth - section.clientWidth);
      distance.set(travel);
      section.style.setProperty("--work-travel", `${travel}px`);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(section);
    measure();
    return () => observer.disconnect();
  }, [distance, projects.length]);

  return (
    <section
      id="work"
      ref={container}
      data-nav-theme="dark"
      aria-labelledby="work-heading"
      className={styles.work}
    >
      <div className={styles.workViewport}>
        <motion.div ref={track} style={{ x }} className={styles.workTrack}>
          <div className={styles.workIntro}>
            <p className={styles.workKicker}>{messages.intro}</p>
            <motion.h2
              id="work-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {messages.headingOne}
              <span>{messages.headingTwo}</span>
            </motion.h2>
            <div className={styles.workIntroEnd} aria-hidden="true">
              <span>{String(projects.length).padStart(2, "0")}</span>
              <svg viewBox="0 0 120 80" fill="none">
                <path d="M2 40h112M78 4l36 36-36 36" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className={styles.workGallery}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} locale={locale} messages={messages} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurProjects;
