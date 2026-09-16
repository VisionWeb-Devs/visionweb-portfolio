import Image from "next/image";
import Link from "./Link";
import type { ProjectView } from "@/types/view";
import NextLink from "next/link";

type ProjectCardProps = {
  project: ProjectView;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug, name, description, url, image } = project;

  return (
    <div className="text-paper flex w-full items-end gap-3">
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
          <NextLink href={`/work/${slug}`}>{name}</NextLink>
        </h3>
        <p className="text-sm text-nowrap">{description}</p>
        <NextLink href={`/work/${slug}`} className="font-semibold">
          <Link text={"Case study"} />
        </NextLink>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            <Link text={"Visit"} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
