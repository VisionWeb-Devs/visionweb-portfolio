import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { site } from "@/lib/site";

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
    <article data-nav-theme="light" className="bg-paper text-ink min-h-screen">
      <div className="xl:px-36 px-8 pt-40 xl:pt-56 pb-24 max-w-5xl mx-auto flex flex-col gap-16">
        <header className="flex flex-col gap-5">
          <NextLink
            href={`/${locale}`}
            className="text-sm font-semibold opacity-60 w-fit"
          >
            {messages.footer.backToSite}
          </NextLink>
          <h1 className="text-4xl xl:text-7xl font-semibold leading-[0.95]">
            {t.title}
          </h1>
          <p className="text-xl xl:text-3xl font-medium">{t.tagline}</p>
          <p className="text-lg opacity-70 max-w-3xl">{t.intro}</p>
        </header>

        <section className="flex flex-col gap-8">
          <h2 className="text-2xl xl:text-3xl font-semibold">
            {t.modelsHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {models.map((model) => (
              <div
                key={model.title}
                className="border border-ink/25 rounded-2xl p-8 flex flex-col gap-4"
              >
                <h3 className="text-xl xl:text-2xl font-semibold">
                  {model.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {model.points.map((point) => (
                    <li key={point} className="flex gap-3 opacity-80">
                      <span aria-hidden="true" className="opacity-50">
                        &#10003;
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 border-t border-ink/20 pt-10">
          <h2 className="text-2xl xl:text-3xl font-semibold">
            {t.ratesHeading}
          </h2>
          {/* Describes how commission works without stating any figure. */}
          <p className="opacity-70 leading-relaxed max-w-3xl">{t.ratesBody}</p>
        </section>

        <section className="bg-ink text-paper rounded-2xl p-8 xl:p-12 flex flex-col gap-5">
          <h2 className="text-2xl xl:text-3xl font-semibold">
            {t.ctaHeading}
          </h2>
          <p className="opacity-70 max-w-2xl">{t.ctaBody}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent(t.title)}`}
              className="bg-paper text-ink rounded-full px-8 py-4 font-semibold"
            >
              {t.cta}
            </a>
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
      </div>
    </article>
  );
}
