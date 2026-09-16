import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { strapiFetch } from "@/lib/strapi";
import { formatPriceRange } from "@/lib/format";
import { locales, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { SITE_URL, site } from "@/lib/site";
import type { StrapiPackage, StrapiPricingInfo } from "@/types/strapi";

/**
 * Detail page for a single service from the price list.
 *
 * The pricing section lists six tiers side by side, which is the right shape
 * for comparison but leaves no room to explain any one of them. Each tier now
 * has a URL that can be linked directly in a quote or a message.
 */

async function getPackage(slug: string, locale: string) {
  const { data } = await strapiFetch<StrapiPackage[]>("packages", {
    query: { filters: { slug: { $eq: slug } }, populate: { features: true } },
    tags: ["package"],
    locale,
  });
  return data[0] ?? null;
}

export async function generateStaticParams() {
  const { data } = await strapiFetch<StrapiPackage[]>("packages", {
    query: { fields: ["slug"] },
    tags: ["package"],
  });

  return locales.flatMap((locale) =>
    data.map((pkg) => ({ locale, slug: pkg.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isLocale(locale)) return {};

  const pkg = await getPackage(slug, locale);
  if (!pkg) return { title: "Not found" };

  const description =
    pkg.description ?? pkg.subtitle ?? `${pkg.name} — ${site.name}`;

  return {
    title: pkg.name,
    description,
    alternates: { canonical: `/${locale}/services/${pkg.slug}` },
    openGraph: {
      title: pkg.name,
      description,
      url: `/${locale}/services/${pkg.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[locale]/services/[slug]">) {
  const { slug, locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale);
  const t = messages.pricing;

  const [pkg, { data: all }, { data: info }] = await Promise.all([
    getPackage(slug, locale),
    strapiFetch<StrapiPackage[]>("packages", {
      query: { sort: "order:asc", fields: ["slug", "name", "subtitle"] },
      tags: ["package"],
      locale,
    }),
    strapiFetch<StrapiPricingInfo | null>("pricing-info", {
      query: { populate: { included: true, addons: true } },
      tags: ["pricing-info"],
      locale,
      fallback: false,
    }),
  ]);

  if (!pkg) notFound();

  const priceLabel = formatPriceRange(
    pkg.priceMin,
    pkg.priceMax,
    pkg.currency,
    locale,
    t.contactForPricing,
  );

  const others = all.filter((entry) => entry.slug !== pkg.slug).slice(0, 3);

  return (
    <article data-nav-theme="light" className="bg-paper text-ink min-h-screen">
      <div className="xl:px-36 px-8 pt-40 xl:pt-56 pb-24 max-w-5xl mx-auto flex flex-col gap-16">
        <header className="flex flex-col gap-5">
          <NextLink
            href={`/${locale}#pricing`}
            className="text-sm font-semibold opacity-60 w-fit"
          >
            {t.allPackages}
          </NextLink>
          <h1 className="text-4xl xl:text-7xl font-semibold leading-[0.95]">
            {pkg.name}
          </h1>
          {pkg.subtitle && (
            <p className="text-xl xl:text-2xl opacity-70">{pkg.subtitle}</p>
          )}

          <dl className="flex flex-wrap gap-x-12 gap-y-4 pt-4">
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold opacity-50">
                {t.startingAt}
              </dt>
              <dd className="text-2xl xl:text-3xl font-semibold">
                {priceLabel}
              </dd>
            </div>
            {pkg.timeline && (
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold opacity-50">
                  {t.timeline}
                </dt>
                <dd className="text-2xl xl:text-3xl font-semibold">
                  {pkg.timeline}
                </dd>
              </div>
            )}
          </dl>
        </header>

        {pkg.description && (
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">{t.detailIntro}</h2>
            <p className="opacity-70 leading-relaxed whitespace-pre-line max-w-3xl">
              {pkg.description}
            </p>
          </section>
        )}

        {pkg.features && pkg.features.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{t.included}</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {pkg.features.map((feature) => (
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

        {info?.included && info.included.length > 0 && (
          <section className="flex flex-col gap-4 border-t border-ink/20 pt-10">
            <h2 className="text-2xl font-semibold">{info.includedHeading}</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {info.included.map((item) => (
                <li key={item.id} className="flex gap-3 opacity-80">
                  <span aria-hidden="true" className="opacity-50">
                    &#10003;
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            {info.disclaimer && (
              <p className="text-sm opacity-60 max-w-3xl pt-2">
                {info.disclaimer}
              </p>
            )}
          </section>
        )}

        <section className="bg-ink text-paper rounded-2xl p-8 xl:p-12 flex flex-col gap-5">
          <h2 className="text-2xl xl:text-3xl font-semibold">{t.quoteCta}</h2>
          <div className="flex flex-wrap gap-4">
            <NextLink
              href={`/${locale}#contact`}
              className="bg-paper text-ink rounded-full px-8 py-4 font-semibold"
            >
              {t.quoteCta}
            </NextLink>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-paper/40 rounded-full px-8 py-4 font-semibold"
            >
              WhatsApp
            </a>
          </div>
        </section>

        {others.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-ink/20 pt-10">
            <h2 className="text-2xl font-semibold">{t.otherPackages}</h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {others.map((entry) => (
                <li key={entry.slug}>
                  <NextLink
                    href={`/${locale}/services/${entry.slug}`}
                    className="border border-ink/25 rounded-xl p-5 flex flex-col gap-1 h-full"
                  >
                    <span className="font-semibold">{entry.name}</span>
                    {entry.subtitle && (
                      <span className="text-sm opacity-60">
                        {entry.subtitle}
                      </span>
                    )}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Service + Offer structured data, using the same range shown above. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: pkg.name,
              description: pkg.description ?? pkg.subtitle ?? undefined,
              provider: {
                "@type": "ProfessionalService",
                name: site.name,
                url: SITE_URL,
              },
              areaServed: site.country,
              url: `${SITE_URL}/${locale}/services/${pkg.slug}`,
              ...(pkg.priceMin !== null && pkg.priceMax !== null
                ? {
                    offers: {
                      "@type": "AggregateOffer",
                      priceCurrency: pkg.currency,
                      lowPrice: pkg.priceMin,
                      highPrice: pkg.priceMax,
                    },
                  }
                : {}),
            }),
          }}
        />
      </div>
    </article>
  );
}
