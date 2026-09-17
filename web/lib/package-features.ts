// web/lib/package-features.ts
import type { Locale } from "@/i18n/config";

// Scope already stated in the published package subtitles. CMS features take
// precedence; this keeps existing entries useful until their lists are filled.
const scope: Record<string, Record<Locale, string[]>> = {
  "landing-page": { en: ["One focused landing page", "Conversion-focused layout"], fr: ["Une page dédiée", "Mise en page orientée conversion"] },
  "site-vitrine-basique": { en: ["1–5 pages", "Template-based design"], fr: ["1 à 5 pages", "Design basé sur un modèle"] },
  "site-vitrine-pro": { en: ["5–15 pages", "Custom visual design", "SEO setup"], fr: ["5 à 15 pages", "Design sur mesure", "Mise en place du SEO"] },
  "site-catalogue-boutique": { en: ["Online product catalogue", "WhatsApp orders", "Cash-on-delivery ordering"], fr: ["Catalogue de produits en ligne", "Commandes WhatsApp", "Commande avec paiement à la livraison"] },
  "application-web-sur-mesure": { en: ["Custom dashboard", "API integration", "Project-specific functionality"], fr: ["Tableau de bord sur mesure", "Intégration API", "Fonctionnalités adaptées au projet"] },
  "marketplace-plateforme": { en: ["Multi-vendor platform", "Advanced management tools"], fr: ["Plateforme multi-vendeurs", "Outils de gestion avancée"] },
};

export function packageFeatures(slug: string, locale: Locale, features: string[], included: string[] = []) {
  const authored = features.filter(feature => feature.trim().length > 0);
  if (authored.length) return authored;
  return [...new Set([...(scope[slug]?.[locale] ?? []), ...included])].slice(0, 5);
}
