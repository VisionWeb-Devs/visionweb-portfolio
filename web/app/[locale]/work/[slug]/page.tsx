import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { strapiFetch, strapiMediaUrl } from "@/lib/strapi";
import { locales, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import type { StrapiProject } from "@/types/strapi";
import NextLink from "next/link";
import styles from "@/components/InnerPage.module.css";

/**
 * Case study page.
 *
 * The portfolio previously showed each project as a thumbnail with a
 * one-line caption and no way to read further. This gives every project a URL
 * that can be linked in a pitch, and room for the problem/solution framing that
 * turns a screenshot into evidence.
 */

async function getProject(
  slug: string,
  locale: string,
): Promise<StrapiProject | null> {
  const { data } = await strapiFetch<StrapiProject[]>("projects", {
    query: {
      filters: { slug: { $eq: slug } },
      populate: { screenshots: true, techStack: true, features: true },
    },
    tags: ["project"],
    locale,
  });

  return data[0] ?? null;
}

export async function generateStaticParams() {
  const { data } = await strapiFetch<StrapiProject[]>("projects", {
    query: { fields: ["slug"] },
    tags: ["project"],
  });

  // Every project, in every locale.
  return locales.flatMap((locale) =>
    data.map((project) => ({ locale, slug: project.slug })),
  );
}

// Next 16: params is a Promise; synchronous access was removed.
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProject(slug, locale);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/${locale}/work/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.description,
      url: `/${locale}/work/${project.slug}`,
      images: project.screenshots?.[0]
        ? [strapiMediaUrl(project.screenshots[0].url)]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { slug, locale } = await params;
  if (!isLocale(locale)) notFound();

  const project = await getProject(slug, locale);
  if (!project) notFound();

  const t = (await getMessages(locale)).work;

  const facts = [
    project.client && { label: t.client, value: project.client },
    project.industry && { label: t.industry, value: project.industry },
    project.isInternal && { label: t.type, value: t.ownProduct },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article data-nav-theme="light" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.masthead}>
          <NextLink
            href={`/${locale}#work`}
            className={styles.back}
          >
            <span aria-hidden="true">←</span>
            {t.backToWork}
          </NextLink>
          <h1 className={styles.title}>
            {project.name}
          </h1>
          <p className={styles.intro}>
            {project.description}
          </p>

          {facts.length > 0 && (
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              {t.visitLive}
              <span aria-hidden="true" className={styles.arrow}>↗</span>
            </a>
          )}
        </header>

        {project.screenshots?.[0] && (
          <figure className={styles.media}>
            <Image
              src={strapiMediaUrl(project.screenshots[0].url)}
              alt={
                project.screenshots[0].alternativeText ?? `${project.name} screenshot`
              }
              width={project.screenshots[0].width}
              height={project.screenshots[0].height}
              sizes="(min-width: 1600px) 1312px, (min-width: 768px) 86vw, 100vw"
              priority
            />
          </figure>
        )}

        {project.problem && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.problem}</h2>
            <p className={styles.body}>{project.problem}</p>
          </section>
        )}
        {project.solution && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.solution}</h2>
            <p className={styles.body}>{project.solution}</p>
          </section>
        )}

        {project.features && project.features.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.features}</h2>
            <ul className={styles.features}>
              {project.features.map((feature) => (
                <li key={feature.id}>
                  <span aria-hidden="true">+</span>
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.builtWith}</h2>
            <ul className={styles.tech}>
              {project.techStack.map((tech) => (
                <li key={tech.id}>{tech.label}</li>
              ))}
            </ul>
          </section>
        )}

        {project.screenshots && project.screenshots.length > 1 && (
          <section className={styles.gallerySection}>
            <h2 className={styles.heading}>{t.moreScreens}</h2>
            <div className={styles.gallery}>
              {project.screenshots.slice(1).map((shot) => (
                <figure key={shot.url} className={styles.media}>
                  <Image
                    src={strapiMediaUrl(shot.url)}
                    alt={shot.alternativeText ?? `${project.name} screenshot`}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 1600px) 632px, (min-width: 601px) 43vw, 100vw"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        <div className={styles.cta}>
          <NextLink href={`/${locale}#contact`} className={styles.action}>
            {t.startSimilar}
            <span aria-hidden="true" className={styles.arrow}>↗</span>
          </NextLink>
          <NextLink href={`/${locale}#work`} className={styles.secondary}>
            {t.backToWork}
            <span aria-hidden="true" className={styles.arrow}>↗</span>
          </NextLink>
        </div>
      </div>
    </article>
  );
}
