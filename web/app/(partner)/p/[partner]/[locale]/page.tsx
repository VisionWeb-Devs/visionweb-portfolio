import { notFound } from "next/navigation";
import WhatWeDo from "@/components/WhatWeDo";
import Process from "@/components/Process";
import Tiers from "@/components/Tiers";
import Faq from "@/components/Faq";
import PartnerHero from "@/components/PartnerHero";
import PartnerFooter from "@/components/PartnerFooter";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { getPartner } from "@/lib/partner";

/**
 * A partner's branded home page.
 *
 * Reuses the main site's sections — they read their content from Strapi and
 * their colours from CSS variables, so they retexture themselves without
 * knowing a partner exists.
 *
 * Two sections are deliberately absent. The portfolio is VisionWeb's own work,
 * and presenting it under a partner's brand would be a claim the partner has
 * not earned. The "Why Us" section still holds placeholder copy, so it is not
 * worth propagating to a second brand until it is rewritten.
 */
export default async function PartnerHome({
  params,
}: {
  params: Promise<{ partner: string; locale: string }>;
}) {
  const { partner: subdomain, locale } = await params;
  if (!isLocale(locale)) notFound();

  const partner = await getPartner(subdomain);
  if (!partner) notFound();

  const messages = await getMessages(locale);

  return (
    <main id="main">
      <PartnerHero
        name={partner.name}
        tagline={partner.tagline}
        messages={messages.hero}
        ctaLabel={messages.pricing.quoteCta}
      />
      <WhatWeDo locale={locale} messages={messages.services} />
      <Process locale={locale} messages={messages.process} />
      <Tiers locale={locale} messages={messages.pricing} />
      <Faq locale={locale} messages={messages.faq} />
      <PartnerFooter
        locale={locale}
        messages={messages}
        partner={{
          name: partner.name,
          subdomain: partner.subdomain,
          email: partner.email,
          phone: partner.phone,
          whatsapp: partner.whatsapp,
        }}
      />
    </main>
  );
}
