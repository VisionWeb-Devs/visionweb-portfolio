import React from "react";
import type { Surface } from "@/types/content";
import type { Locale } from "@/i18n/config";
import NextLink from "next/link";

type BookNowProps = {
  /** The surface of the card this button sits on; the button inverts it. */
  surface: Surface;
  locale: Locale;
  label: string;
};

const BookNow = ({ surface, locale, label }: BookNowProps) => {
  const inverted = surface === "ink" ? "bg-surface text-on-surface" : "bg-surface-alt text-on-surface-alt";

  return (
    <NextLink
      href={`/${locale}#contact`}
      className={`${inverted} w-full py-3 xl:py-5 rounded-full block text-center`}
    >
      {label}
    </NextLink>
  );
};

export default BookNow;
