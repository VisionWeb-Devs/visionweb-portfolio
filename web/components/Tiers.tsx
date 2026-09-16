import React from "react";
import PackageCard from "./PackageCard";
import { strapiFetch } from "@/lib/strapi";
import { formatPriceRange } from "@/lib/format";
import type { StrapiPackage, StrapiPricingInfo } from "@/types/strapi";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

/**
 * Pricing, from the 2026 price list in Strapi.
 *
 * Every tier quotes a range rather than a single figure, and the terms that
 * apply to all of them — what is included, the paid add-ons, the tax and
 * quote-validity note — are shared copy rather than repeated per card.
 */
const Tiers = async ({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages["pricing"];
}) => {
  const [{ data: packages }, { data: info }] = await Promise.all([
    strapiFetch<StrapiPackage[]>("packages", {
      query: { sort: "order:asc", populate: { features: true } },
      tags: ["package"],
      locale,
    }),
    strapiFetch<StrapiPricingInfo | null>("pricing-info", {
      query: { populate: { included: true, addons: true } },
      tags: ["pricing-info"],
      locale,
      // A single type returns an object, so an empty-array check cannot apply.
      fallback: false,
    }),
  ]);

  return (
    <section id="pricing" className=" bg-ink text-paper xl:px-36 px-12 xl:py-36 py-20 flex flex-col gap-16 xl:gap-24 min-h-screen">
      <h2 className="text-4xl xl:text-5xl font-semibold">{messages.heading}</h2>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.documentId}
            name={pkg.name}
            slug={pkg.slug}
            subtitle={pkg.subtitle}
            timeline={pkg.timeline}
            priceLabel={formatPriceRange(
              pkg.priceMin,
              pkg.priceMax,
              pkg.currency,
              locale,
              messages.contactForPricing,
            )}
            features={(pkg.features ?? []).map((feature) => feature.label)}
            surface={index % 2 === 0 ? "ink" : "paper"}
            locale={locale}
            messages={messages}
          />
        ))}
      </div>

      {info && (
        <div className="flex flex-col gap-10 border-t border-paper/20 pt-12">
          <div className="grid md:grid-cols-2 gap-10">
            {info.included && info.included.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl xl:text-2xl font-semibold">
                  {info.includedHeading}
                </h3>
                <ul className="flex flex-col gap-2">
                  {info.included.map((item) => (
                    <li key={item.id} className="flex gap-3 opacity-80">
                      <span aria-hidden="true" className="opacity-50">
                        &#10003;
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {info.addons && info.addons.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl xl:text-2xl font-semibold">
                  {info.addonsHeading}
                </h3>
                <ul className="flex flex-col gap-2">
                  {info.addons.map((item) => (
                    <li key={item.id} className="opacity-80">
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {info.disclaimer && (
            <p className="text-sm opacity-60 max-w-3xl">{info.disclaimer}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Tiers;
