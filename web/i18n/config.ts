export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Written in each language's own name, as a language switcher should be. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Text direction, so adding an RTL language later is a data change here. */
export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fr: "ltr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
