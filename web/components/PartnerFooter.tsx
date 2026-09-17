import ContactForm from "./ContactForm";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

type PartnerFooterProps = {
  locale: Locale;
  messages: Messages;
  partner: {
    name: string;
    subdomain: string;
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
  };
};

/**
 * Contact section for a partner site.
 *
 * Shows only the partner's own contact details. VisionWeb's phone, email and
 * social links are deliberately absent: the whole point of the branded
 * subdomain is that the partner is the visible party, and any of those would
 * give that away. Where the partner has supplied nothing, the form stands on
 * its own — submissions still reach VisionWeb, tagged to this partner.
 */
const PartnerFooter = ({ locale, messages, partner }: PartnerFooterProps) => {
  const details = [
    partner.email && { label: partner.email, href: `mailto:${partner.email}` },
    partner.phone && { label: partner.phone, href: `tel:${partner.phone}` },
    partner.whatsapp && { label: "WhatsApp", href: partner.whatsapp },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer
      id="contact"
      data-nav-theme="dark"
      className="bg-surface-alt text-on-surface-alt xl:px-24 px-6 xl:py-28 py-20"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl xl:text-6xl font-semibold">
            {messages.contact.heading}
          </h2>
          <p className="opacity-70 text-lg">{messages.contact.intro}</p>
        </div>

        <ContactForm
          messages={messages.contact}
          locale={locale}
          partner={partner.subdomain}
        />

        {details.length > 0 && (
          <ul className="flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-on-surface-alt/20">
            {details.map((detail) => (
              <li key={detail.href}>
                <a href={detail.href} className="font-semibold">
                  {detail.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm opacity-50">
          &copy; {new Date().getFullYear()} {partner.name}
        </p>
      </div>
    </footer>
  );
};

export default PartnerFooter;
