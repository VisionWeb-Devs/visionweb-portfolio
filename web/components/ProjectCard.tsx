import Image from "next/image";
import NextLink from "next/link";
import Link from "./Link";
import type { ProjectView } from "@/types/view";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

type ProjectCardProps = {
  project: ProjectView;
  locale: Locale;
  messages: Messages["work"];
};

/**
 * One project, filling a panel of the horizontal scroll.
 *
 * Laid out side by side because the project sheets are tall portraits: a
 * full-width row would either crop them or shrink them past legibility. The
 * text no longer uses `text-nowrap` — that was safe for a one-line caption and
 * would push a real description off the panel.
 */
const ProjectCard = ({ project, locale, messages }: ProjectCardProps) => {
  const { slug, name, description, url, image, isInternal } = project;

  return (
    <article className="flex flex-col md:flex-row items-center gap-8 xl:gap-16 max-w-6xl w-full">
      {image && (
        <NextLink
          href={`/${locale}/work/${slug}`}
          className="shrink-0 w-full md:w-[38%] max-w-sm"
        >
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 380px, 90vw"
            className="w-full h-auto rounded-xl max-h-[55vh] md:max-h-[70vh] object-contain object-top"
          />
        </NextLink>
      )}

      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-2">
          {project.industry && (
            <span className="text-sm uppercase tracking-[0.18em] opacity-60">
              {project.industry}
            </span>
          )}
          <h3 className="text-3xl xl:text-5xl font-semibold leading-tight">
            <NextLink href={`/${locale}/work/${slug}`}>{name}</NextLink>
          </h3>
        </div>

        <p className="opacity-75 leading-relaxed max-w-xl">{description}</p>

        {isInternal && (
          <span className="text-sm opacity-60">{messages.ownProduct}</span>
        )}

        <div className="flex flex-wrap items-center gap-6 pt-2 font-semibold">
          <NextLink href={`/${locale}/work/${slug}`}>
            <Link text={messages.caseStudy} />
          </NextLink>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Link text={messages.visit} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
