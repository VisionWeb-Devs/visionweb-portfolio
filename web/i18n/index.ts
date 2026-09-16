import "server-only";
import { defaultLocale, type Locale } from "./config";
import type { Messages } from "./messages/en";

/**
 * Loads a locale's message catalogue.
 *
 * Dynamic import rather than a static map so only the active locale's strings
 * reach the bundle. Deliberately hand-rolled instead of pulling in an i18n
 * library: there are two locales and most visitor-facing text comes from
 * Strapi, so the library would be carrying about forty strings.
 */
export async function getMessages(locale: Locale): Promise<Messages> {
  try {
    return (await import(`./messages/${locale}`)).default as Messages;
  } catch {
    return (await import(`./messages/${defaultLocale}`)).default as Messages;
  }
}

export type { Messages };
