import { strapiFetch, strapiMediaUrl } from "@/lib/strapi";
import type { StrapiPartner } from "@/types/strapi";
import type { Locale } from "@/i18n/config";

export type PartnerBrand = {
  name: string;
  subdomain: string;
  tagline: string | null;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
  defaultLocale: Locale;
  indexable: boolean;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  /** The six variables that retheme the whole site. */
  theme: Record<string, string>;
};

export async function getPartner(
  subdomain: string,
): Promise<PartnerBrand | null> {
  const { data } = await strapiFetch<StrapiPartner[]>("partners", {
    query: {
      filters: { subdomain: { $eq: subdomain }, active: { $eq: true } },
      populate: { logo: true },
    },
    tags: ["partner"],
    fallback: false,
  });

  const partner = data[0];
  if (!partner) return null;

  return {
    name: partner.name,
    subdomain: partner.subdomain,
    tagline: partner.tagline,
    logoUrl: partner.logo ? strapiMediaUrl(partner.logo.url) : null,
    logoWidth: partner.logo?.width ?? null,
    logoHeight: partner.logo?.height ?? null,
    defaultLocale: partner.defaultLocale,
    indexable: partner.indexable,
    email: partner.email,
    phone: partner.phone,
    whatsapp: partner.whatsapp,
    theme: {
      "--color-surface": partner.colorSurface,
      "--color-on-surface": partner.colorOnSurface,
      "--color-surface-alt": partner.colorSurfaceAlt,
      "--color-on-surface-alt": partner.colorOnSurfaceAlt,
      "--color-accent": partner.colorAccent,
      "--color-on-accent": partner.colorOnAccent,
    },
  };
}

export async function getPartnerSubdomains(): Promise<string[]> {
  const { data } = await strapiFetch<StrapiPartner[]>("partners", {
    query: { filters: { active: { $eq: true } }, fields: ["subdomain"] },
    tags: ["partner"],
    fallback: false,
  });
  return data.map((partner) => partner.subdomain);
}
