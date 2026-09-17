import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import PartnerHeader from "@/components/PartnerHeader";
import Cursor from "@/components/Cursor";
import { locales, localeDirections, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { getPartner, getPartnerSubdomains } from "@/lib/partner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

/**
 * Root layout for partner-branded sites.
 *
 * A separate root layout, in its own route group, so a partner site can set its
 * own <html> attributes and theme without the main site paying for it. The
 * partner arrives as a route parameter rather than a request header, which
 * keeps these pages statically generated — reading headers() in a layout would
 * opt every route into dynamic rendering, including the main site.
 *
 * The theme is six CSS variables set on <html>. Every utility in the app reads
 * its colour through those variables, so this retextures the entire page
 * without a second stylesheet or a duplicated component tree.
 */

export async function generateStaticParams() {
  const subdomains = await getPartnerSubdomains();
  return subdomains.flatMap((partner) =>
    locales.map((locale) => ({ partner, locale })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string; locale: string }>;
}): Promise<Metadata> {
  const { partner: subdomain } = await params;
  const partner = await getPartner(subdomain);
  if (!partner) return {};

  return {
    title: {
      default: partner.tagline
        ? `${partner.name} — ${partner.tagline}`
        : partner.name,
      template: `%s — ${partner.name}`,
    },
    description: partner.tagline ?? undefined,
    // Partner sites repeat the main site's content. Indexing them by default
    // would have several near-identical domains competing with each other and
    // discounting the main one.
    robots: partner.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default async function PartnerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ partner: string; locale: string }>;
}) {
  const { partner: subdomain, locale } = await params;
  if (!isLocale(locale)) notFound();

  const partner = await getPartner(subdomain);
  if (!partner) notFound();

  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      dir={localeDirections[locale]}
      data-scroll-behavior="smooth"
      className={inter.className}
      style={partner.theme as CSSProperties}
    >
      <body className="overflow-x-hidden bg-surface text-on-surface">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {messages.nav.skipToContent}
        </a>
        <span id="top" />
        <Cursor />
        <PartnerHeader
          locale={locale}
          messages={messages.nav}
          brand={{
            name: partner.name,
            logoUrl: partner.logoUrl,
            logoWidth: partner.logoWidth,
            logoHeight: partner.logoHeight,
          }}
        />
        {children}
      </body>
    </html>
  );
}
