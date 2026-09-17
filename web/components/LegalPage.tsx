import type { ReactNode } from "react";
import NextLink from "next/link";
import type { Locale } from "@/i18n/config";
import styles from "./InnerPage.module.css";

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
  locale,
  backLabel,
  updatedLabel,
}: {
  title: string;
  updated: string;
  children: ReactNode;
  locale: Locale;
  backLabel: string;
  updatedLabel: string;
}) => (
  <article data-nav-theme="light" className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.masthead}>
        <NextLink
          href={`/${locale}`}
          className={styles.back}
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </NextLink>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <div className={styles.legal}>
        <p className={styles.meta}>
          {updatedLabel}: {updated}
        </p>
        <div className={styles.legalBody}>{children}</div>
      </div>
    </div>
  </article>
);

export default LegalPage;
