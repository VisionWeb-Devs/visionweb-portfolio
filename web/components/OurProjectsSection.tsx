import OurProjects from "./OurProjects";
import { strapiFetch, strapiMediaUrl } from "@/lib/strapi";
import type { StrapiProject } from "@/types/strapi";
import type { ProjectView } from "@/types/view";

/**
 * Server wrapper for the projects section.
 *
 * OurProjects is a client component because it drives a scroll-linked
 * animation, so it cannot fetch. This fetches, maps the Strapi payload to a
 * view model, and hands it down.
 */
const OurProjectsSection = async () => {
  const { data } = await strapiFetch<StrapiProject[]>("projects", {
    query: {
      sort: "order:asc",
      // Media is not populated by default; without this, screenshots are
      // silently absent rather than an error.
      populate: { screenshots: true },
    },
    tags: ["project"],
  });

  const projects: ProjectView[] = data.map((project) => {
    const screenshot = project.screenshots?.[0];

    return {
      id: project.documentId,
      slug: project.slug,
      name: project.name,
      description: project.description,
      url: project.liveUrl,
      isInternal: project.isInternal,
      image: screenshot
        ? {
            url: strapiMediaUrl(screenshot.url),
            width: screenshot.width,
            height: screenshot.height,
            alt: screenshot.alternativeText ?? `${project.name} screenshot`,
          }
        : null,
    };
  });

  return <OurProjects projects={projects} />;
};

export default OurProjectsSection;
