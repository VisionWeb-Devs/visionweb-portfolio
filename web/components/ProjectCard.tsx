import Image from "next/image";
import NextLink from "next/link";
import type { ProjectView } from "@/types/view";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import styles from "./Portfolio.module.css";

type ProjectCardProps = {
  project: ProjectView;
  locale: Locale;
  messages: Messages["work"];
  index?: number;
};

const ProjectCard = ({ project, locale, messages, index = 0 }: ProjectCardProps) => {
  const { slug, name, description, url, image } = project;
  const href = `/${locale}/work/${slug}`;

  return (
    <article className={styles.project}>
      <NextLink href={href} className={styles.projectImage} aria-label={`${messages.caseStudy}: ${name}`}>
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 700px) 88vw, (max-width: 1000px) 44vw, 46vw"
          />
        ) : <span className={styles.projectPlaceholder} aria-hidden="true">{name}</span>}
        <span className={styles.projectImageArrow} aria-hidden="true">↗</span>
      </NextLink>
      <div className={styles.projectInfo}>
        <span className={styles.projectIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3><NextLink href={href}>{name}</NextLink></h3>
          <p>{description}</p>
          <div className={styles.projectLinks}>
            <NextLink href={href} className={styles.textLink}>{messages.caseStudy}<span aria-hidden="true">↗</span></NextLink>
            {url && <a href={url} target="_blank" rel="noopener noreferrer" className={styles.textLink}>{messages.visit}<span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
