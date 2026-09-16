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
import visionshopHome from "@/public/assets/projects/visionshop_home.png";
import type { Project } from "@/types/content";

const projects: Project[] = [
  {
    name: "Vision Shop",
    image: visionshopHome,
    description:
      "This is the template for e-commerce website that sells clothing",
    url: "https://visionshop.netlify.app/",
  },
];

const OurProjects = () => {
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
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);

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
    <div className="relative h-screen w-screen shrink-0 bg-ink text-paper flex flex-col items-center justify-center gap-24 xl:px-36 px-12 py-36">
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
            What?! want to see some of our projects?
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
            Alright here you go
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
        Our team have been working hard on these so <br /> no comments pls
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

  const gallery = (
    <div className="h-screen w-screen shrink-0 bg-ink text-paper flex items-end gap-24 xl:px-36 px-12 py-36">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );

  // Reduced motion: no scroll hijacking, the panels simply stack.
  if (reduceMotion) {
    return (
      <section className="bg-ink">
        {intro}
        {gallery}
      </section>
    );
  }

  return (
    <section ref={container} className="relative h-[300vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-screen w-[200vw]">
          {intro}
          {gallery}
        </motion.div>
      </div>
    </section>
  );
};

export default OurProjects;
