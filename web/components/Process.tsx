import { strapiFetch } from "@/lib/strapi";
import type { StrapiProcessStep } from "@/types/strapi";
import ProcessSteps from "./ProcessSteps";

/**
 * Server wrapper for the process section.
 *
 * "How we work" is one of the cheapest credibility signals a small studio can
 * offer: it shows there is a repeatable system rather than an ad-hoc approach.
 */
const Process = async () => {
  const { data } = await strapiFetch<StrapiProcessStep[]>("process-steps", {
    query: { sort: "order:asc" },
    tags: ["process-step"],
  });

  if (data.length === 0) return null;

  return <ProcessSteps steps={data.map((step) => ({
    id: step.documentId,
    title: step.title,
    description: step.description,
    duration: step.duration,
  }))} />;
};

export default Process;
