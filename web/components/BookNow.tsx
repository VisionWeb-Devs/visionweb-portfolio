import React from "react";
import type { Surface } from "@/types/content";
import type { Locale } from "@/i18n/config";
import NextLink from "next/link";
import styles from "./Portfolio.module.css";

type BookNowProps = {
  /** The surface of the card this button sits on; the button inverts it. */
  surface: Surface;
  locale: Locale;
  label: string;
};

const BookNow = ({ surface, locale, label }: BookNowProps) => {
  const inverted = surface === "ink" ? "bg-paper text-ink" : "bg-ink text-paper";

  return (
    <NextLink
      href={`/${locale}#contact`}
      className={`${inverted} ${styles.quote}`}
    >
      {label}
      <span aria-hidden="true" className={styles.quoteArrow}>↗</span>
    </NextLink>
  );
};

export default BookNow;
