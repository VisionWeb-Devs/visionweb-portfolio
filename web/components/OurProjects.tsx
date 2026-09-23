"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import ProjectCard from "./ProjectCard";
import type { ProjectView } from "@/types/view";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";


type OurProjectsProps = {
  projects: ProjectView[];
  locale: Locale;
  messages: Messages["work"];
};

const OurProjects = ({ projects, locale, messages }: OurProjectsProps) => {
  const reduceMotion = useReducedMotion();
  const container = useRef<HTMLElement>(null);

  /**
   * Horizontal scroll.
   *
   * The GSAP version pinned with ScrollTrigger and computed its travel distance
   * from `scrollWidth` and `window.innerWidth` once on mount, with no resize
   * listener — so rotating a phone left the track misaligned. Driving a `vw`
   * transform from scroll progress is resolution-independent and needs no
   * measurement at all.
   */
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  /**
   * One panel for the intro plus one per project. The track and the travel
   * distance are both derived from that count: the original hardcoded two
   * panels, so a second project would have sat off-screen with no way to
   * scroll to it.
   */
  const panelCount = 1 + projects.length;
  const travelVw = (panelCount - 1) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travelVw}vw`]);

  const wipe: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: reduceMotion ? 0 : 1.4, ease: "linear" },
    },
  };

  const caret = reduceMotion
    ? {}
    : {
        animate: { opacity: [1, 1, 0, 0] },
        transition: { duration: 1, repeat: Infinity, ease: "linear" as const },
      };

  const intro = (
    <div className="relative h-screen w-screen shrink-0 bg-surface-alt text-on-surface-alt flex flex-col items-center justify-center gap-24 xl:px-36 px-12 py-36">
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <span className="xl:text-5xl text-xl text-center font-semibold">
          {/* The headings are real text in the markup and are revealed with a
              wipe. The GSAP version typed them in with TextPlugin from empty
              spans, so neither heading existed in the server-rendered HTML. */}
          <motion.span variants={wipe} className="inline-block">
            {messages.headingOne}
          </motion.span>
          <motion.span aria-hidden="true" className="font-normal" {...caret}>
            |
          </motion.span>
        </span>
        <span className="xl:text-4xl text-lg font-medium">
          <motion.span
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              visible: {
                clipPath: "inset(0 0% 0 0)",
                transition: {
                  duration: reduceMotion ? 0 : 0.9,
                  delay: reduceMotion ? 0 : 1.4,
                  ease: "linear",
                },
              },
            }}
            className="inline-block"
          >
            {messages.headingTwo}
          </motion.span>
        </span>
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 2 }}
        className="xl:text-xl text-center"
      >
        {messages.intro}
      </motion.span>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: 0 }}
        animate={
          reduceMotion ? { opacity: 1 } : { opacity: 1, x: [0, 40, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute xl:right-36 right-12 bottom-24 text-3xl"
      >
        {"->"}
      </motion.div>
    </div>
  );

  const gallery = projects.map((project) => (
    <div
      key={project.id}
      className="h-screen w-screen shrink-0 bg-surface-alt text-on-surface-alt flex items-center justify-center xl:px-36 px-8 py-28"
    >
      <ProjectCard project={project} locale={locale} messages={messages} />
    </div>
  ));

  // Reduced motion: no scroll hijacking, the panels simply stack.
  if (reduceMotion) {
    return (
      <section id="work" data-nav-theme="dark" className="bg-surface-alt">
        {intro}
        {gallery}
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={container}
      data-nav-theme="dark"
      className="relative bg-surface-alt"
      style={{ height: `${panelCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x, width: `${panelCount * 100}vw` }}
          className="flex h-screen"
        >
          {intro}
          {gallery}
        </motion.div>
      </div>
    </section>
  );
};

export default OurProjects;
