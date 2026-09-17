import Image from "next/image";
import Link from "./Link";
import type { ProjectView } from "@/types/view";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import NextLink from "next/link";

type ProjectCardProps = {
  project: ProjectView;
  locale: Locale;
  messages: Messages["work"];
};

const ProjectCard = ({ project, locale, messages }: ProjectCardProps) => {
  const { slug, name, description, url, image } = project;

  return (
    <div className="text-on-surface-alt flex w-full items-end gap-3">
      {image && (
        // `sizes` is required here: without it Next assumes 100vw and ships the
        // largest candidate, which is how the original 2.5 MB PNG reached every
        // visitor for a 500px slot.
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="500px"
          className="w-[500px] h-auto"
        />
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-medium text-nowrap">
          <NextLink href={`/${locale}/work/${slug}`}>{name}</NextLink>
        </h3>
        <p className="text-sm text-nowrap">{description}</p>
        <NextLink href={`/${locale}/work/${slug}`} className="font-semibold">
          <Link text={messages.caseStudy} />
        </NextLink>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            <Link text={messages.visit} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
