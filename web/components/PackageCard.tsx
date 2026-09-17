import React from "react";
import NextLink from "next/link";
import BookNow from "./BookNow";
import type { Surface } from "@/types/content";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import styles from "./Portfolio.module.css";

type PackageCardProps = {
  name: string;
  slug: string;
  subtitle: string | null;
  timeline: string | null;
  /** Already formatted for display; see lib/format.ts. */
  priceLabel: string;
  features: string[];
  surface: Surface;
  locale: Locale;
  messages: Messages["pricing"];
};

/**
 * A pricing tier.
 *
 * The whole card is clickable via a stretched link: the title anchor carries an
 * ::after that covers the card, so the large target does not require nesting
 * the quote button inside another anchor, which would be invalid HTML. The
 * button sits above that overlay and keeps its own destination.
 */
const PackageCard = ({
  name,
  slug,
  subtitle,
  timeline,
  priceLabel,
  features,
  surface,
  locale,
  messages,
}: PackageCardProps) => {
  const skin =
    surface === "ink"
      ? "bg-ink text-paper"
      : "bg-paper text-ink";

  return (
    <div
      className={`${skin} ${styles.package}`}
    >
      <div className={styles.packageTitle}>
        <h3>
          <NextLink
            href={`/${locale}/services/${slug}`}
            className={styles.packageTitleLink}
          >
            {name}
          </NextLink>
        </h3>
        {subtitle && (
          <div className={styles.packageSubtitle}>{subtitle}</div>
        )}
      </div>
      <div className={styles.packageBody}>
        <div className="flex flex-col gap-4">
          <div>
            <div className={styles.packagePrice}>
              {priceLabel}
            </div>
            <div className="opacity-60 text-sm font-normal mt-1">
              {messages.perWebsite}
            </div>
          </div>
          {timeline && (
            <div className="text-sm font-normal">
              <span className="opacity-60">{messages.timeline}: </span>
              {timeline}
            </div>
          )}
        </div>

        {features.length > 0 && (
          <div>
            <p className="opacity-65 text-xs mb-4">{messages.included}</p>
            <ul className={styles.packageFeatures}>
            {features.map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">&#10003;</span>
                {feature}
              </li>
            ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-2 flex flex-col gap-3">
          {/* Above the stretched link, so it keeps its own destination. */}
          <div className="relative z-10">
            <BookNow
              surface={surface}
              locale={locale}
              label={messages.quoteCta}
            />
          </div>
          <span
            aria-hidden="true"
            className={styles.packageDetail}
          >
            {messages.viewDetails} <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
