/**
 * Strapi 5 wire format.
 *
 * These describe the JSON the REST API actually returns, which is deliberately
 * NOT the same thing as the types `strapi ts:generate-types` produces — those
 * describe the backend schema and Strapi documents no supported way to consume
 * them from a frontend. Hand-maintaining the contract here is the honest
 * option: when a content type changes in the admin, it changes here in the same
 * commit.
 *
 * Strapi 5 flattens attributes (no more `data.attributes` nesting) and gives
 * every entry a `documentId`, which is the key you query by.
 */

export type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

/** Strapi generates these variants on upload when responsive upload is on. */
export type StrapiMedia = {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats: Partial<
    Record<"thumbnail" | "small" | "medium" | "large", StrapiImageFormat>
  > | null;
};

type StrapiEntry = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
};

/** Repeatable single-field component, e.g. a tech stack or feature list. */
export type StrapiLabel = {
  id: number;
  label: string;
};

export type StrapiProject = StrapiEntry & {
  name: string;
  slug: string;
  client: string | null;
  industry: string | null;
  description: string;
  /** Long-form case-study fields; optional until written. */
  problem: string | null;
  solution: string | null;
  liveUrl: string | null;
  order: number;
  /** True for our own products (Vision Shop), false for client work. */
  isInternal: boolean;
  /** Optional: absent unless the request populates them. */
  techStack?: StrapiLabel[];
  features?: StrapiLabel[];
  screenshots?: StrapiMedia[];
};

export type StrapiPackage = StrapiEntry & {
  name: string;
  slug: string;
  subtitle: string | null;
  /**
   * A min-max range in whole currency units. Numeric so it can be formatted per
   * locale; the price list quotes a range per service, not a single figure.
   */
  priceMin: number | null;
  priceMax: number | null;
  /** ISO 4217, e.g. "DZD". Explicit because expansion means multi-currency. */
  currency: string;
  /** Free text because the unit varies: "3–7 days" vs "2–4 weeks". */
  timeline: string | null;
  description: string | null;
  order: number;
  /** Optional: components are absent unless the request populates them. */
  features?: StrapiLabel[];
};

/** Shared pricing copy that applies to every tier. */
export type StrapiPricingInfo = StrapiEntry & {
  includedHeading: string | null;
  included?: StrapiLabel[];
  addonsHeading: string | null;
  addons?: StrapiLabel[];
  disclaimer: string | null;
};

export type StrapiTeamMember = StrapiEntry & {
  name: string;
  role: string;
  bio: string | null;
  /** Optional: absent unless the request populates it. */
  photo?: StrapiMedia | null;
  order: number;
};

export type StrapiProcessStep = StrapiEntry & {
  title: string;
  description: string;
  duration: string | null;
  order: number;
};

export type StrapiFaq = StrapiEntry & {
  question: string;
  answer: string;
  order: number;
};

/**
 * A signed partner with a branded subdomain. Not localized: this is
 * configuration, identical in every language.
 */
export type StrapiPartner = StrapiEntry & {
  name: string;
  subdomain: string;
  tagline: string | null;
  logo?: StrapiMedia | null;
  colorSurface: string;
  colorOnSurface: string;
  colorSurfaceAlt: string;
  colorOnSurfaceAlt: string;
  colorAccent: string;
  colorOnAccent: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  defaultLocale: "en" | "fr";
  /** Partner sites repeat the main site's content; indexing them costs the
   *  main domain, so this is opt-in per partner. */
  indexable: boolean;
  active: boolean;
};

/**
 * Cache tags. These deliberately match Strapi's webhook `model` values, so the
 * revalidation handler can map a webhook straight onto a tag with no lookup
 * table to keep in sync.
 */
export const STRAPI_TAGS = [
  "partner",
  "project",
  "pricing-info",
  "package",
  "team-member",
  "process-step",
  "faq",
] as const;
export type StrapiTag = (typeof STRAPI_TAGS)[number];
