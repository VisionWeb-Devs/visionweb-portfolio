import Image from "next/image";
import Link from "./Link";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({
  project: { name, image, description, url },
}: ProjectCardProps) => {
  return (
    <div className="text-paper flex w-full items-end gap-3">
      {/* Static import: Next derives the intrinsic size and serves a responsive
          AVIF/WebP set, instead of shipping the full 2.5 MB source PNG. */}
      <Image
        src={image}
        alt={`${name} homepage`}
        sizes="500px"
        className="w-[500px] h-auto"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-medium text-nowrap">{name}</h3>
        <p className="text-sm text-nowrap">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold"
        >
          <Link text={"Visit"} />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
