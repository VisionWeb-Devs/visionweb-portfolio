"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Messages } from "@/i18n";

type PartnerHeroProps = {
  name: string;
  tagline: string | null;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
  /** Service names, shown as a capability row beneath the mark. */
  services: string[];
  messages: Messages["hero"];
  ctaLabel: string;
  contactLabel: string;
};

/**
 * A partner's hero.
 *
 * Mirrors the shape of SCALE's own banner — mark, tagline, then a row of
 * capabilities — rather than leaving the name alone in the middle of a full
 * viewport. The services come from the price list, so the row states what the
 * partner can actually sell instead of being decoration.
 */
const PartnerHero = ({
  name,
  tagline,
  logoUrl,
  logoWidth,
  logoHeight,
  services,
  messages,
  ctaLabel,
  contactLabel,
}: PartnerHeroProps) => {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const rise: Variants = {
    hidden: { y: reduceMotion ? 0 : 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      data-nav-theme="light"
      className="min-h-screen bg-surface text-on-surface flex flex-col justify-center items-center text-center px-6 xl:px-12 pt-32 pb-24 relative"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col items-center gap-8 xl:gap-10 max-w-5xl"
      >
        {logoUrl ? (
          <motion.div variants={rise}>
            <Image
              src={logoUrl}
              alt={name}
              width={logoWidth ?? 400}
              height={logoHeight ?? 400}
              sizes="(min-width: 1280px) 340px, 220px"
              className="h-40 xl:h-60 w-auto"
              priority
            />
          </motion.div>
        ) : (
          <motion.h1
            variants={rise}
            className="2xl:text-[9rem] md:text-8xl text-5xl font-semibold leading-[0.9] tracking-tight"
          >
            {name}
          </motion.h1>
        )}

        {tagline && (
          // With the mark carrying the name, the tagline is the page's h1.
          <motion.h1
            variants={rise}
            className="flex items-center gap-4 text-base xl:text-2xl font-medium uppercase tracking-[0.2em]"
          >
            <span aria-hidden="true" className="h-px w-8 xl:w-12 bg-accent" />
            {tagline}
            <span aria-hidden="true" className="h-px w-8 xl:w-12 bg-accent" />
          </motion.h1>
        )}

        {services.length > 0 && (
          <motion.ul
            variants={rise}
            className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 text-sm xl:text-base opacity-80"
          >
            {services.map((service, index) => (
              <li key={service} className="flex items-center gap-5">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-px bg-accent hidden sm:block"
                  />
                )}
                {service}
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={rise} className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="#pricing"
            className="bg-accent text-on-accent rounded-full px-10 py-4 font-semibold"
          >
            {ctaLabel}
          </a>
          <a
            href="#contact"
            className="border border-current/40 rounded-full px-10 py-4 font-semibold"
          >
            {contactLabel}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          delay: reduceMotion ? 0 : 1.4,
        }}
        className="absolute bottom-10 text-sm opacity-60"
      >
        {messages.scroll}
      </motion.div>
    </div>
  );
};

export default PartnerHero;
