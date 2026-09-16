import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * STARTING DRAFT — NOT LEGAL ADVICE.
 *
 * This describes what the site actually does today (a contact form posting to a
 * self-hosted Strapi instance, no analytics, no advertising cookies), which is
 * the honest basis for a policy. It has NOT been reviewed by a lawyer, and the
 * bracketed items below are facts only VisionWeb can supply. If the company
 * later adds analytics, embedded media or a newsletter, this must be updated.
 */
export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getMessages(locale)).footer;

  return (
    <LegalPage
      title="Privacy Policy"
      updated="16 September 2026"
      locale={locale}
      backLabel={t.backToSite}
      updatedLabel={t.lastUpdated}
    >
      <p>
        This policy explains what personal information {site.name} collects
        through this website, why we collect it, and what we do with it.
      </p>

      <h2>Who we are</h2>
      <p>
        {site.name} is a web development studio based in {site.country}. For any
        question about this policy or your data, contact us at{" "}
        <a href="#contact">the address on our contact section</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        We only collect information you choose to send us. When you submit the
        contact form, we receive your name, email address, and anything you
        write in the message, along with the optional company, budget and
        project type fields.
      </p>
      <p>
        Our server records the IP address a contact form submission comes from.
        This is used solely to rate-limit submissions and prevent abuse.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not use advertising or tracking cookies.</li>
        <li>We do not run third-party analytics on this site.</li>
        <li>We do not sell, rent or share your information with third parties.</li>
        <li>We do not send marketing email to people who contact us.</li>
      </ul>

      <h2>Why we are allowed to hold it</h2>
      <p>
        We process what you send in order to reply to your enquiry and, if you
        become a client, to carry out the work. Where required, our legal basis
        is your consent in submitting the form, and our legitimate interest in
        responding to enquiries about our services.
      </p>

      <h2>Where it is stored</h2>
      <p>
        Contact submissions are stored in our own content management system on
        infrastructure we control. Access is limited to{" "}
        {site.name} staff.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for [RETENTION PERIOD — e.g. 24 months] after our last
        contact with you, then delete them. If you become a client, project
        records are kept as long as required for our business and tax
        obligations.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of the information we hold about you, ask us
        to correct it, or ask us to delete it. Write to us and we will respond
        within 30 days. If you are in the European Union, you also have the
        right to object to processing and to complain to your national data
        protection authority.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy we will update the date at the top of this
        page.
      </p>
    </LegalPage>
  );
}
