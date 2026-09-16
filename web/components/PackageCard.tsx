import React from "react";
import BookNow from "./BookNow";
import type { Surface } from "@/types/content";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

type PackageCardProps = {
  name: string;
  subtitle: string | null;
  timeline: string | null;
  /** Already formatted for display; see lib/format.ts. */
  priceLabel: string;
  features: string[];
  surface: Surface;
  locale: Locale;
  messages: Messages["pricing"];
};

const PackageCard = ({
  name,
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
      ? "bg-ink text-paper border-paper"
      : "bg-paper text-ink border-ink";

  return (
    <div
      className={`${skin} rounded-2xl border flex flex-col font-semibold h-full`}
    >
      <div className="px-8 py-5">
        <div className="text-xl">{name}</div>
        {subtitle && (
          <div className="text-sm font-normal opacity-60 mt-1">{subtitle}</div>
        )}
      </div>
      <hr className="border-inherit" />
      <div className="flex flex-col gap-6 px-6 py-8 xl:px-8 xl:py-10 grow">
        <div className="flex flex-col gap-4">
          <div>
            <div className="xl:text-3xl text-2xl leading-tight">
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
          <ul className="flex flex-col gap-2 text-sm font-normal">
            <li className="opacity-60 list-none">{messages.included}</li>
            {features.map((feature) => (
              <li key={feature} className="flex gap-2 list-none">
                <span className="opacity-60">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2">
          <BookNow surface={surface} locale={locale} label={messages.quoteCta} />
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
