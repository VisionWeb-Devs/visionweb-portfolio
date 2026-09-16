import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Cursor from "@/components/Cursor";
import { site, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  // metadataBase makes every relative URL below resolve absolutely, which Open
  // Graph and canonical tags both require.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "web development",
    "web design",
    "e-commerce development",
    "custom web applications",
    "Next.js development",
    "web development Algeria",
  ],
  authors: [
    { name: "Sadjed Bougandoura" },
    { name: "Abd Eldjalil Selamnia" },
  ],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Next 16 no longer overrides `scroll-behavior: smooth` on navigation
    // unless this attribute is present.
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={inter.className}
    >
      <body className="overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <span id="top" />
        {/*
          Structured data. Only facts the business has actually stated are
          included; no address beyond country, no ratings, no invented claims.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: site.name,
              description: site.description,
              url: SITE_URL,
              image: `${SITE_URL}/opengraph-image`,
              address: {
                "@type": "PostalAddress",
                addressCountry: site.country,
              },
              founder: [
                { "@type": "Person", name: "Sadjed Bougandoura", jobTitle: "Chief Executive Officer" },
                { "@type": "Person", name: "Abd Eldjalil Selamnia", jobTitle: "Co-Founder" },
              ],
              sameAs: Object.values(site.social),
              serviceType: [
                "Web development",
                "Web design",
                "E-commerce development",
                "Custom web application development",
              ],
            }),
          }}
        />
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
