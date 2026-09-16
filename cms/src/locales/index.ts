import type { Core } from "@strapi/strapi";

/**
 * Ensures the non-default locales exist.
 *
 * Strapi creates only the default locale (en) on a fresh install, so a clone of
 * this repo would otherwise have localization enabled on the content types but
 * nowhere to put a translation. Adding them here keeps that in version control
 * rather than as a manual admin step.
 */
const LOCALES = [{ code: "fr", name: "French (fr)" }];

export async function ensureLocales({ strapi }: { strapi: Core.Strapi }) {
  const service = strapi.plugin("i18n")?.service("locales");
  if (!service) {
    strapi.log.warn("[locales] i18n plugin unavailable, skipping.");
    return;
  }

  const existing: { code: string }[] = await service.find();
  const codes = new Set(existing.map((locale) => locale.code));

  for (const locale of LOCALES) {
    if (codes.has(locale.code)) continue;
    await service.create(locale);
    strapi.log.info(`[locales] created locale: ${locale.code}`);
  }
}
