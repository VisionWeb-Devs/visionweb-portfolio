import { strapiFetch } from "@/lib/strapi";
import type { StrapiProcessStep } from "@/types/strapi";
import ProcessSteps from "./ProcessSteps";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

/**
 * Server wrapper for the process section.
 *
 * "How we work" is one of the cheapest credibility signals a small studio can
 * offer: it shows there is a repeatable system rather than an ad-hoc approach.
 */
const Process = async ({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages["process"];
}) => {
  const { data } = await strapiFetch<StrapiProcessStep[]>("process-steps", {
    query: { sort: "order:asc" },
    tags: ["process-step"],
    locale,
  });

  if (data.length === 0) return null;

  return <ProcessSteps messages={messages} steps={data.map((step) => ({
    id: step.documentId,
    title: step.title,
    description: step.description,
    duration: step.duration,
  }))} />;
};

export default Process;
