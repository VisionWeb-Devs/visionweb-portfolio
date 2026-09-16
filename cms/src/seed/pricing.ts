import type { Core } from "@strapi/strapi";

/**
 * The 2026 price list.
 *
 * Taken verbatim from the company's own "GRILLE TARIFAIRE 2026" sheet, which is
 * bilingual, so the French here is theirs rather than a translation of mine.
 * Prices are integers in DZD, excluding taxes, as stated on the sheet.
 */

type Tier = {
  slug: string;
  order: number;
  priceMin: number;
  priceMax: number;
  en: { name: string; subtitle: string; timeline: string };
  fr: { name: string; subtitle: string; timeline: string };
};

export const TIERS: Tier[] = [
  {
    slug: "landing-page",
    order: 1,
    priceMin: 15000,
    priceMax: 50000,
    en: { name: "Landing Page", subtitle: "Single conversion page", timeline: "3–7 days" },
    fr: { name: "Landing Page", subtitle: "1 page, optimisée conversion", timeline: "3–7 jours" },
  },
  {
    slug: "site-vitrine-basique",
    order: 2,
    priceMin: 25000,
    priceMax: 80000,
    en: { name: "Basic Showcase Website", subtitle: "1–5 pages, template", timeline: "1–2 weeks" },
    fr: { name: "Site Vitrine Basique", subtitle: "1–5 pages, template", timeline: "1–2 semaines" },
  },
  {
    slug: "site-vitrine-pro",
    order: 3,
    priceMin: 80000,
    priceMax: 200000,
    en: { name: "Pro Showcase Website", subtitle: "5–15 pages, custom design + SEO", timeline: "2–4 weeks" },
    fr: { name: "Site Vitrine Pro", subtitle: "5–15 pages, design sur mesure + SEO", timeline: "2–4 semaines" },
  },
  {
    slug: "site-catalogue-boutique",
    order: 4,
    priceMin: 70000,
    priceMax: 300000,
    en: { name: "Catalogue / Online Store", subtitle: "WhatsApp orders, cash on delivery", timeline: "3–5 weeks" },
    fr: { name: "Site Catalogue / Boutique", subtitle: "Commandes WhatsApp, paiement à la livraison", timeline: "3–5 semaines" },
  },
  {
    slug: "application-web-sur-mesure",
    order: 5,
    priceMin: 150000,
    priceMax: 1000000,
    en: { name: "Custom Web Application", subtitle: "Dashboard, API, custom features", timeline: "6–12 weeks" },
    fr: { name: "Application Web Sur Mesure", subtitle: "Dashboard, API, fonctionnalités custom", timeline: "6–12 semaines" },
  },
  {
    slug: "marketplace-plateforme",
    order: 6,
    priceMin: 250000,
    priceMax: 1500000,
    en: { name: "Marketplace / Platform", subtitle: "Multi-vendor, advanced management", timeline: "8–16 weeks" },
    fr: { name: "Marketplace / Plateforme", subtitle: "Multi-vendeurs, gestion avancée", timeline: "8–16 semaines" },
  },
];

const PRICING_INFO = {
  en: {
    includedHeading: "Included in every project",
    included: [
      "First year hosting free",
      "Domain name included",
      "6 months maintenance",
      "Mobile-friendly design",
      "Basic SEO setup",
      "Handover & training",
    ],
    addonsHeading: "Add-ons",
    addons: [
      "Logo & brand identity — on request",
      "Maintenance beyond 6 months, content writing, product photos — on request",
    ],
    disclaimer:
      "Indicative 2026 pricing, excluding taxes. Every project gets a free custom quote within 24h.",
  },
  fr: {
    includedHeading: "Inclus dans chaque projet",
    included: [
      "Hébergement 1ère année offert",
      "Nom de domaine offert",
      "6 mois de maintenance",
      "Design responsive",
      "SEO de base",
      "Formation à la prise en main",
    ],
    addonsHeading: "Options en supplément",
    addons: [
      "Logo & identité visuelle — sur devis",
      "Maintenance au-delà de 6 mois, rédaction de contenu, photos produits — sur devis",
    ],
    disclaimer:
      "Tarifs indicatifs valables pour 2026, hors taxes. Chaque projet fait l'objet d'un devis personnalisé et gratuit sous 24h.",
  },
};

/** Slugs from the superseded three-tier placeholder list. */
const RETIRED_SLUGS = ["portfolio-website", "e-commerce-template", "custom-website"];

const label = (values: string[]) => values.map((value) => ({ label: value }));

export async function seedPricing({ strapi }: { strapi: Core.Strapi }) {
  const docs = strapi.documents("api::package.package");

  // Remove only the previously seeded placeholder tiers, matched by slug, so
  // anything added by hand in the admin is left alone.
  for (const slug of RETIRED_SLUGS) {
    const stale = await docs.findMany({ filters: { slug: { $eq: slug } } });
    for (const entry of stale as { documentId: string }[]) {
      await docs.delete({ documentId: entry.documentId });
      strapi.log.info(`[seed] packages: removed superseded tier "${slug}".`);
    }
  }

  for (const tier of TIERS) {
    const [existing] = (await docs.findMany({
      filters: { slug: { $eq: tier.slug } },
      locale: "en",
    })) as { documentId: string }[];

    const payload = (variant: "en" | "fr") => ({
      slug: tier.slug,
      name: tier[variant].name,
      subtitle: tier[variant].subtitle,
      timeline: tier[variant].timeline,
      priceMin: tier.priceMin,
      priceMax: tier.priceMax,
      currency: "DZD",
      order: tier.order,
    });

    const documentId =
      existing?.documentId ??
      (
        await docs.create({
          data: payload("en"),
          locale: "en",
          status: "published",
        })
      ).documentId;

    // Upsert both locales every run, English LAST. Writing a locale-scoped
    // update immediately after create was overwriting the English entry, so
    // both languages ended up holding the French copy; ordering the writes and
    // reading them back is what makes that visible instead of silent.
    await docs.update({
      documentId,
      locale: "fr",
      data: payload("fr"),
      status: "published",
    });
    await docs.update({
      documentId,
      locale: "en",
      data: payload("en"),
      status: "published",
    });

    const check = await docs.findOne({ documentId, locale: "en" });
    const name = (check as { name?: string } | null)?.name;
    if (name !== tier.en.name) {
      strapi.log.error(
        `[seed] packages: "${tier.slug}" en reads back as "${name}", expected "${tier.en.name}".`,
      );
    } else {
      strapi.log.info(`[seed] packages: "${tier.slug}" ok (en + fr).`);
    }
  }

  const info = strapi.documents("api::pricing-info.pricing-info");
  const current = await info.findFirst({ locale: "en" });
  {
    const created = current ?? (await info.create({
      data: {
        includedHeading: PRICING_INFO.en.includedHeading,
        included: label(PRICING_INFO.en.included),
        addonsHeading: PRICING_INFO.en.addonsHeading,
        addons: label(PRICING_INFO.en.addons),
        disclaimer: PRICING_INFO.en.disclaimer,
      },
      locale: "en",
      status: "published",
    }));
    await info.update({
      documentId: created.documentId,
      locale: "fr",
      data: {
        includedHeading: PRICING_INFO.fr.includedHeading,
        included: label(PRICING_INFO.fr.included),
        addonsHeading: PRICING_INFO.fr.addonsHeading,
        addons: label(PRICING_INFO.fr.addons),
        disclaimer: PRICING_INFO.fr.disclaimer,
      },
      status: "published",
    });
    await info.update({
      documentId: created.documentId,
      locale: "en",
      data: {
        includedHeading: PRICING_INFO.en.includedHeading,
        included: label(PRICING_INFO.en.included),
        addonsHeading: PRICING_INFO.en.addonsHeading,
        addons: label(PRICING_INFO.en.addons),
        disclaimer: PRICING_INFO.en.disclaimer,
      },
      status: "published",
    });
    strapi.log.info("[seed] pricing info: upserted (en + fr).");
  }
}
