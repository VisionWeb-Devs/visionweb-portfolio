import React from "react";
import BookNow from "./BookNow";
import type { Surface } from "@/types/content";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

type PackageCardProps = {
  name: string;
  /** Already formatted for display; see lib/format.ts. */
  priceLabel: string;
  description: string;
  features: string[];
  surface: Surface;
  locale: Locale;
  messages: Messages["pricing"];
};

const PackageCard = ({
  name,
  priceLabel,
  description,
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
      className={`${skin} rounded-2xl border flex flex-col w-fit font-semibold`}
    >
      <div className="text-xl px-8 py-4"> {name}</div>
      <hr className="border-inherit" />
      <div className="flex flex-col gap-[24px] xl:gap-[32px] px-6 py-8 xl:px-8 xl:py-10">
        <div className="flex flex-col gap-[16px] xl:gap-[32px]">
          <div>
            <div className="xl:text-5xl text-3xl">{priceLabel}</div>
            <div className="opacity-60 xl:text-base text-sm">
              {messages.perWebsite}
            </div>
          </div>
          <div className="opacity-60  xl:text-base text-sm">{description}</div>
        </div>
        <BookNow surface={surface} locale={locale} label={messages.bookNow} />
        <ul className="flex flex-col gap-[8px]  xl:text-base text-sm">
          <li className="opacity-60 list-none">{messages.included}</li>
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 list-none">
              <span className="opacity-60 font-normal ">&#10003;</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageCard;
