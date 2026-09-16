import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { strapiFetch, strapiMediaUrl } from "@/lib/strapi";
import type { StrapiProject } from "@/types/strapi";
import NextLink from "next/link";

/**
 * Case study page.
 *
 * The portfolio previously showed each project as a thumbnail with a
 * one-line caption and no way to read further. This gives every project a URL
 * that can be linked in a pitch, and room for the problem/solution framing that
 * turns a screenshot into evidence.
 */

async function getProject(slug: string): Promise<StrapiProject | null> {
  const { data } = await strapiFetch<StrapiProject[]>("projects", {
    query: {
      filters: { slug: { $eq: slug } },
      populate: { screenshots: true, techStack: true, features: true },
    },
    tags: ["project"],
  });

  return data[0] ?? null;
}

export async function generateStaticParams() {
  const { data } = await strapiFetch<StrapiProject[]>("projects", {
    query: { fields: ["slug"] },
    tags: ["project"],
  });

  return data.map((project) => ({ slug: project.slug }));
}

// Next 16: params is a Promise; synchronous access was removed.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.description,
      url: `/work/${project.slug}`,
      images: project.screenshots?.[0]
        ? [strapiMediaUrl(project.screenshots[0].url)]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const facts = [
    project.client && { label: "Client", value: project.client },
    project.industry && { label: "Industry", value: project.industry },
    project.isInternal && { label: "Type", value: "Our own product" },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="bg-paper text-ink">
      <div className="xl:px-36 px-8 pt-40 xl:pt-56 pb-20 xl:pb-36 max-w-6xl mx-auto flex flex-col gap-16">
        <header className="flex flex-col gap-6">
          <NextLink href="/#work" className="text-sm font-semibold opacity-60 w-fit">
            ← Back to work
          </NextLink>
          <h1 className="text-4xl xl:text-7xl font-semibold leading-[0.95]">
            {project.name}
          </h1>
          <p className="text-lg xl:text-2xl opacity-70 max-w-3xl">
            {project.description}
          </p>

          {facts.length > 0 && (
            <dl className="flex flex-wrap gap-x-12 gap-y-4 pt-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold opacity-50">
                    {fact.label}
                  </dt>
                  <dd className="text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-paper rounded-full px-8 py-4 font-semibold w-fit mt-2"
            >
              Visit the live site
            </a>
          )}
        </header>

        {project.screenshots?.[0] && (
          <Image
            src={strapiMediaUrl(project.screenshots[0].url)}
            alt={
              project.screenshots[0].alternativeText ?? `${project.name} screenshot`
            }
            width={project.screenshots[0].width}
            height={project.screenshots[0].height}
            sizes="(min-width: 1280px) 1100px, 100vw"
            className="w-full h-auto rounded-2xl"
            priority
          />
        )}

        {(project.problem || project.solution) && (
          <div className="grid md:grid-cols-2 gap-12">
            {project.problem && (
              <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold">The problem</h2>
                <p className="opacity-70 leading-relaxed whitespace-pre-line">
                  {project.problem}
                </p>
              </section>
            )}
            {project.solution && (
              <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold">What we built</h2>
                <p className="opacity-70 leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </section>
            )}
          </div>
        )}

        {project.features && project.features.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feature) => (
                <li key={feature.id} className="flex gap-3 opacity-80">
                  <span aria-hidden="true" className="opacity-50">
                    &#10003;
                  </span>
                  {feature.label}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Built with</h2>
            <ul className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <li
                  key={tech.id}
                  className="border border-ink/25 rounded-full px-4 py-2 text-sm font-medium"
                >
                  {tech.label}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.screenshots && project.screenshots.length > 1 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">More screens</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {project.screenshots.slice(1).map((shot) => (
                <Image
                  key={shot.url}
                  src={strapiMediaUrl(shot.url)}
                  alt={shot.alternativeText ?? `${project.name} screenshot`}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="w-full h-auto rounded-xl"
                />
              ))}
            </div>
          </section>
        )}

        <NextLink
          href="/#contact"
          className="bg-ink text-paper rounded-full px-8 py-4 font-semibold w-fit"
        >
          Start a project like this
        </NextLink>
      </div>
    </article>
  );
}
