import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { site } from "@/lib/site";
import styles from "@/components/InnerPage.module.css";

/**
 * Partner recruitment page.
 *
 * IMPORTANT: no commission figures appear here, and none should be added.
 * The company's partner document is marked "réservé aux partenaires — ne pas
 * transmettre au client final", and publishing the rates would show a client
 * the referral margin being earned on their own project. The page describes
 * the two working models and routes interested partners to a private
 * conversation where the rate card is sent directly.
 */

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = (await getMessages(locale)).partners;

  return {
    title: t.title,
    description: t.intro,
    alternates: { canonical: `/${locale}/partners` },
    openGraph: { title: t.title, description: t.intro, url: `/${locale}/partners` },
  };
}

export default async function PartnersPage({
  params,
}: PageProps<"/[locale]/partners">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale);
  const t = messages.partners;

  const models = [
    { title: t.referralTitle, points: t.referralPoints },
    { title: t.managingTitle, points: t.managingPoints },
  ];

  return (
    <article data-nav-theme="light" className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.masthead}>
          <NextLink
            href={`/${locale}`}
            className={styles.back}
          >
            <span aria-hidden="true">←</span>
            {messages.footer.backToSite}
          </NextLink>
          <h1 className={styles.title}>
            {t.title}
          </h1>
          <p className={styles.tagline}>{t.tagline}</p>
          <p className={styles.intro}>{t.intro}</p>
        </header>

        <section className={styles.gallerySection}>
          <h2 className={styles.heading}>
            {t.modelsHeading}
          </h2>
          <div className={styles.models}>
            {models.map((model) => (
              <div
                key={model.title}
                className={styles.model}
              >
                <h3>
                  {model.title}
                </h3>
                <ul>
                  {model.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden="true">+</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>
            {t.ratesHeading}
          </h2>
          {/* Describes how commission works without stating any figure. */}
          <p className={styles.body}>{t.ratesBody}</p>
        </section>

        <section className={styles.cta}>
          <div>
            <h2>{t.ctaHeading}</h2>
            <p className={styles.body}>{t.ctaBody}</p>
          </div>
          <div className={styles.actions}>
            <a
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent(t.title)}`}
              className={styles.action}
            >
              {t.cta}
              <span aria-hidden="true" className={styles.arrow}>↗</span>
            </a>
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
      </div>
    </article>
  );
}
