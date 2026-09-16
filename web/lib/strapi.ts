import qs from "qs";
import type { StrapiResponse, StrapiTag } from "@/types/strapi";

/**
 * Thin typed wrapper over Strapi's REST API.
 *
 * Deliberately plain `fetch` rather than `@strapi/client`: the official SDK
 * exposes no way to pass per-request fetch options, so there is no way to
 * attach `next: { tags }`. Without tags there is no targeted on-demand
 * revalidation, which is a hard requirement here — a price edit has to go live
 * without a redeploy.
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type FetchOptions = {
  /** Strapi query params (populate, filters, sort, locale, pagination). */
  query?: Record<string, unknown>;
  /** Cache tags; use the Strapi model name so webhooks map straight onto it. */
  tags?: StrapiTag[];
};

export async function strapiFetch<T>(
  path: string,
  { query, tags = [] }: FetchOptions = {},
): Promise<StrapiResponse<T>> {
  if (!STRAPI_URL) {
    throw new Error("STRAPI_URL is not set. See .env.example.");
  }

  const search = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : "";
  const url = `${STRAPI_URL}/api/${path}${search}`;

  const response = await fetch(url, {
    headers: STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      : {},
    next: { tags },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi responded ${response.status} ${response.statusText} for ${path}`,
    );
  }

  return response.json() as Promise<StrapiResponse<T>>;
}

/**
 * Resolves a Strapi media URL to something absolute.
 *
 * With an upload provider (R2/S3) Strapi returns absolute URLs already; the
 * local provider returns paths relative to the Strapi host.
 */
export function strapiMediaUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL ?? ""}${url}`;
}
