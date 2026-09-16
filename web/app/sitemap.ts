import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { strapiFetch } from "@/lib/strapi";
import type { StrapiPackage, StrapiProject } from "@/types/strapi";
import { locales, defaultLocale } from "@/i18n/config";

/**
 * Every page, in every locale, with hreflang alternates so search engines
 * treat the translations as the same page rather than duplicates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: projects }, { data: packages }] = await Promise.all([
    strapiFetch<StrapiProject[]>("projects", {
      query: { fields: ["slug", "updatedAt"] },
      tags: ["project"],
    }),
    strapiFetch<StrapiPackage[]>("packages", {
      query: { fields: ["slug", "updatedAt"] },
      tags: ["package"],
    }),
  ]);

  const paths = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    ...projects.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: new Date(project.updatedAt),
    })),
    ...packages.map((pkg) => ({
      path: `/services/${pkg.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: new Date(pkg.updatedAt),
    })),
    { path: "/partners", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return paths.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${entry.path}`,
      lastModified: "lastModified" in entry ? entry.lastModified : new Date(),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE_URL}/${alt}${entry.path}`]),
        ),
      },
    })),
  ).concat();
}

export const dynamic = "force-static";
export { defaultLocale };
