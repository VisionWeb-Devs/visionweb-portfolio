import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { strapiFetch } from "@/lib/strapi";
import { formatPriceRange } from "@/lib/format";
import { locales, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { SITE_URL, site } from "@/lib/site";
import type { StrapiPackage, StrapiPricingInfo } from "@/types/strapi";
import { packageFeatures } from "@/lib/package-features";
import styles from "@/components/InnerPage.module.css";

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
  const features = packageFeatures(
    pkg.slug,
    locale,
    pkg.features?.map((feature) => feature.label) ?? [],
  );

  return (
    <article data-nav-theme="light" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.masthead}>
          <NextLink
            href={`/${locale}#pricing`}
            className={styles.back}
          >
            <span aria-hidden="true">←</span>
            {t.allPackages}
          </NextLink>
          <h1 className={styles.title}>
            {pkg.name}
          </h1>
          {pkg.subtitle && (
            <p className={styles.intro}>{pkg.subtitle}</p>
          )}

          <dl className={styles.facts}>
            <div>
              <dt>
                {t.startingAt}
              </dt>
              <dd>
                {priceLabel}
              </dd>
            </div>
            {pkg.timeline && (
              <div>
                <dt>
                  {t.timeline}
                </dt>
                <dd>
                  {pkg.timeline}
                </dd>
              </div>
            )}
          </dl>
        </header>

        {pkg.description && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.detailIntro}</h2>
            <p className={styles.body}>
              {pkg.description}
            </p>
          </section>
        )}

        {features.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.included}</h2>
            <ul className={styles.features}>
              {features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">+</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {info?.included && info.included.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{info.includedHeading}</h2>
            <div className={styles.content}>
              <ul className={styles.features}>
                {info.included.map((item) => (
                  <li key={item.id}>
                    <span aria-hidden="true">+</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
              {info.disclaimer && (
                <p className={styles.note}>{info.disclaimer}</p>
              )}
            </div>
          </section>
        )}

        <section className={styles.cta}>
          <h2>{t.quoteCta}</h2>
          <div className={styles.actions}>
            <NextLink
              href={`/${locale}#contact`}
              className={styles.action}
            >
              {t.quoteCta}
              <span aria-hidden="true" className={styles.arrow}>↗</span>
            </NextLink>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              WhatsApp
              <span aria-hidden="true" className={styles.arrow}>↗</span>
            </a>
          </div>
        </section>

        {others.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.heading}>{t.otherPackages}</h2>
            <ul className={styles.related}>
              {others.map((entry) => (
                <li key={entry.slug}>
                  <NextLink
                    href={`/${locale}/services/${entry.slug}`}
                    className={styles.relatedLink}
                  >
                    <div>
                      <span className={styles.relatedName}>{entry.name}</span>
                      {entry.subtitle && (
                        <span className={styles.relatedSubtitle}>
                          {entry.subtitle}
                        </span>
                      )}
                    </div>
                    <span aria-hidden="true" className={styles.arrow}>↗</span>
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
