import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { strapiFetch } from "@/lib/strapi";
import type { StrapiProject } from "@/types/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: projects } = await strapiFetch<StrapiProject[]>("projects", {
    query: { fields: ["slug", "updatedAt"] },
    tags: ["project"],
  });

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["privacy", "terms"].map((page) => ({
      url: `${SITE_URL}/${page}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
