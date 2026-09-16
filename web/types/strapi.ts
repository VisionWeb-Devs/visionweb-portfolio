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
  liveUrl: string | null;
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
  /** Numeric so it can be formatted per locale; never a pre-rendered string. */
  price: number | null;
  /** ISO 4217, e.g. "DZD". Explicit because expansion means multi-currency. */
  currency: string;
  /** Renders the "+" prefix, i.e. "starting from", as data rather than text. */
  priceIsFrom: boolean;
  description: string;
  order: number;
  /** Optional: components are absent unless the request populates them. */
  features?: StrapiLabel[];
};

export type StrapiTeamMember = StrapiEntry & {
  name: string;
  role: string;
  bio: string | null;
  /** Optional: absent unless the request populates it. */
  photo?: StrapiMedia | null;
  order: number;
};

/**
 * Cache tags. These deliberately match Strapi's webhook `model` values, so the
 * revalidation handler can map a webhook straight onto a tag with no lookup
 * table to keep in sync.
 */
export const STRAPI_TAGS = ["project", "package", "team-member"] as const;
export type StrapiTag = (typeof STRAPI_TAGS)[number];
