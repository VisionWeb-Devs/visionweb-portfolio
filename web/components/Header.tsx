"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { setLocale } from "@/app/actions/locale";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NavLabel from "./Link";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import type { Messages } from "@/i18n";

type HeaderProps = {
  locale: Locale;
  messages: Messages["nav"];
};

/**
 * Site navigation.
 *
 * The bar is fixed, and picks its colour from whichever band is behind it.
 *
 * It previously used mix-blend-difference, which reads well in principle but
 * only blends against the backdrop within the same stacking context. Several
 * sections create their own — `position: sticky` and Motion's transforms both
 * do — and wherever the blend failed the bar rendered paper on paper and
 * vanished. Reading the section under the bar and setting the colour outright
 * works in every case, including on the standalone pages.
 */
const Header = ({ locale, messages }: HeaderProps) => {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const sectionTheme = useSectionTheme();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Kept to five: every extra item costs scannability, and Why Us and the FAQ
  // are both reachable by scrolling from the sections that precede them.
  const links = [
    { label: messages.services, href: `/${locale}#services` },
    { label: messages.work, href: `/${locale}#work` },
    { label: messages.process, href: `/${locale}#process` },
    { label: messages.pricing, href: `/${locale}#pricing` },
    { label: messages.contact, href: `/${locale}#contact` },
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

  /**
   * Swaps the locale segment of the current path, so switching language keeps
   * the visitor on the page they were reading. The choice is remembered in a
   * cookie that the proxy reads on the next unprefixed visit.
   */
  const pathWithLocale = (next: Locale) => {
    const segments = (pathname ?? `/${locale}`).split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  const onDark = open || sectionTheme === "dark";
  const barText = onDark ? "text-on-surface-alt" : "text-on-surface";
  const barBar = onDark ? "bg-surface" : "bg-surface-alt";

  const entrance = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduceMotion ? 0 : 0.5,
      delay: reduceMotion ? 0 : 1.2,
    },
  };

  const languageSwitcher = (
    <ul className="flex items-center gap-2" aria-label={messages.language}>
      {locales.map((option) => (
        <li key={option}>
          {/* A form rather than a link, so the choice is stored in a cookie by
              the server action and the switcher still works without JS. */}
          <form action={setLocale}>
            <input type="hidden" name="locale" value={option} />
            <input type="hidden" name="path" value={pathWithLocale(option)} />
            <button
              type="submit"
              lang={option}
              aria-current={option === locale ? "true" : undefined}
              className={option === locale ? "font-semibold" : "opacity-50"}
            >
              {option.toUpperCase()}
              <span className="sr-only"> — {localeNames[option]}</span>
            </button>
          </form>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        <motion.div
          {...entrance}
          className={`${barText} pointer-events-auto xl:px-36 px-6 xl:py-10 py-5 flex items-center justify-between font-medium transition-colors duration-300`}
        >
          <NextLink
            href={`/${locale}`}
            className="2xl:text-xl font-semibold tracking-tight"
          >
            <NavLabel text="Visionweb" />
          </NextLink>

          <div className="hidden md:flex items-center gap-8">
            <nav aria-label={messages.mainLabel}>
              <ul className="flex items-center gap-8 2xl:text-lg">
                {links.map((link) => (
                  <li key={link.href}>
                    <NextLink href={link.href} className="block">
                      <NavLabel text={link.label} />
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
            {languageSwitcher}
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
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
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-50 bg-surface-alt text-on-surface-alt md:hidden flex flex-col justify-center px-10 gap-10"
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
                    <NextLink
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-4xl font-semibold uppercase"
                    >
                      {link.label}
                    </NextLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="text-xl">{languageSwitcher}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
