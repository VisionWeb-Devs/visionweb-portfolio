import type { ReactNode } from "react";
import NextLink from "next/link";

/**
 * Shared shell for legal pages.
 *
 * These pages exist because their absence is conspicuous on a company site,
 * and because a privacy policy is a legal requirement rather than a nicety once
 * a contact form collects personal data — particularly for visitors in the EU.
 */
const LegalPage = ({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) => (
  <article className="bg-paper text-ink min-h-screen">
    <div className="xl:px-36 px-8 pt-40 xl:pt-56 pb-24 max-w-3xl mx-auto flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <NextLink href="/" className="text-sm font-semibold opacity-60 w-fit">
          ← Back to site
        </NextLink>
        <h1 className="text-4xl xl:text-6xl font-semibold">{title}</h1>
        <p className="text-sm opacity-60">Last updated: {updated}</p>
      </header>
      <div className="flex flex-col gap-6 leading-relaxed [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-4 [&_p]:opacity-80 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:opacity-80 [&_li]:mb-2 [&_a]:underline">
        {children}
      </div>
    </div>
  </article>
);

export default LegalPage;
