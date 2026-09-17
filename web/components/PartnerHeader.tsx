"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NavLabel from "./Link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import { useSectionTheme } from "@/hooks/useSectionTheme";

type Brand = {
  name: string;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
};

type PartnerHeaderProps = {
  locale: Locale;
  messages: Messages["nav"];
  brand: Brand;
};

/**
 * Header for partner-branded sites.
 *
 * Deliberately a separate component from the main header rather than a prop on
 * it: the partner version carries the partner's mark instead of a wordmark, and
 * drops both the language switcher and the Partners link, which only make sense
 * on VisionWeb's own site. Sharing one component behind three conditionals
 * would be harder to read than two small ones.
 *
 * It keeps the section-theme detection, so the bar stays legible even on a
 * mono-dark brand where both bands are dark.
 */
const PartnerHeader = ({ locale, messages, brand }: PartnerHeaderProps) => {
  const reduceMotion = useReducedMotion();
  const sectionTheme = useSectionTheme();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: messages.services, href: `#services` },
    { label: messages.process, href: `#process` },
    { label: messages.pricing, href: `#pricing` },
    { label: messages.contact, href: `#contact` },
  ];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onDark = open || sectionTheme === "dark";
  const barText = onDark ? "text-on-surface-alt" : "text-on-surface";
  const barBar = onDark ? "bg-on-surface-alt" : "bg-on-surface";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.6,
          }}
          className={`${barText} pointer-events-auto xl:px-24 px-6 xl:py-6 py-4 flex items-center justify-between font-medium transition-colors duration-300`}
        >
          <NextLink href={`/${locale}`} className="flex items-center">
            {brand.logoUrl ? (
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                width={brand.logoWidth ?? 200}
                height={brand.logoHeight ?? 200}
                sizes="120px"
                className="h-12 xl:h-14 w-auto"
                priority
              />
            ) : (
              <span className="text-xl font-semibold tracking-tight">
                {brand.name}
              </span>
            )}
          </NextLink>

          <nav aria-label={messages.mainLabel} className="hidden md:block">
            <ul className="flex items-center gap-8 2xl:text-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block">
                    <NavLabel text={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="partner-menu"
            aria-label={open ? messages.closeMenu : messages.openMenu}
            className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8 items-end"
          >
            <motion.span
              aria-hidden="true"
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className={`block h-[2px] w-7 ${barBar} origin-center transition-colors duration-300`}
            />
            <motion.span
              aria-hidden="true"
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className={`block h-[2px] w-7 ${barBar} origin-center transition-colors duration-300`}
            />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="partner-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-50 bg-surface-alt text-on-surface-alt md:hidden flex flex-col justify-center px-10"
          >
            <nav aria-label={messages.mobileLabel}>
              <ul className="flex flex-col gap-6">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      delay: reduceMotion ? 0 : 0.05 * index,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-4xl font-semibold uppercase"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PartnerHeader;
