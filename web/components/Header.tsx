"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NavLabel from "./Link";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Why Us", href: "#why-us" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

/**
 * Site navigation.
 *
 * Replaces a nine-line header whose only content was a non-interactive
 * <span>Contact</span> — not focusable, not a link, positioned absolutely so it
 * scrolled away immediately and was invisible for most of the page.
 *
 * The bar is fixed and uses mix-blend-difference so a single set of colours
 * stays legible across the alternating ink and paper bands, rather than needing
 * to detect which section is behind it.
 */
const Header = () => {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, and stop the page scrolling behind the overlay.
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

  const entrance = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduceMotion ? 0 : 0.5,
      delay: reduceMotion ? 0 : 1.2,
    },
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        <motion.div
          {...entrance}
          className="mix-blend-difference text-paper pointer-events-auto xl:px-36 px-6 xl:py-10 py-5 flex items-center justify-between font-medium"
        >
          <a href="#top" className="2xl:text-xl font-semibold tracking-tight">
            <NavLabel text="Visionweb" />
          </a>

          <nav aria-label="Main" className="hidden md:block">
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
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8 items-end"
          >
            <motion.span
              aria-hidden="true"
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="block h-[2px] w-7 bg-paper origin-center"
            />
            <motion.span
              aria-hidden="true"
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="block h-[2px] w-7 bg-paper origin-center"
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
            className="fixed inset-0 z-50 bg-ink text-paper md:hidden flex flex-col justify-center px-10"
          >
            <nav aria-label="Mobile">
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

export default Header;
