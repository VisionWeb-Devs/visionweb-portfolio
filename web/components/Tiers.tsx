import React from "react";
import PackageCard from "./PackageCard";
import { strapiFetch } from "@/lib/strapi";
import { formatPrice } from "@/lib/format";
import type { StrapiPackage } from "@/types/strapi";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

/**
 * Server Component: pricing comes from Strapi, not from a hardcoded array.
 *
 * Tagged "package" so the Strapi webhook can invalidate exactly this data when
 * a price changes — no redeploy. Components are not populated by default, so
 * `features` has to be requested explicitly or it silently arrives undefined.
 */
const Tiers = async ({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages["pricing"];
}) => {
  const { data: packages } = await strapiFetch<StrapiPackage[]>("packages", {
    query: { sort: "order:asc", populate: { features: true } },
    tags: ["package"],
    locale,
  });

  return (
    <section id="pricing" className=" bg-ink text-paper xl:px-36 px-12 xl:py-36 py-20 flex flex-col gap-16 xl:gap-24 min-h-screen">
      <h2 className="text-4xl xl:text-5xl font-semibold">{messages.heading}</h2>

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-10 ">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.documentId}
            name={pkg.name}
            priceLabel={formatPrice(
              pkg.price,
              pkg.currency,
              pkg.priceIsFrom,
              locale,
              messages.contactForPricing,
            )}
            description={pkg.description}
            features={(pkg.features ?? []).map((feature) => feature.label)}
            surface={index % 2 === 0 ? "ink" : "paper"}
            locale={locale}
            messages={messages}
          />
        ))}
      </div>
    </section>
  );
};

export default Tiers;
