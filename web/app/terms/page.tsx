import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms under which ${site.name} provides this website and its services.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

/**
 * STARTING DRAFT — NOT LEGAL ADVICE.
 *
 * Deliberately limited to terms of use for the website itself plus a plain
 * statement that project work is governed by a separate written agreement.
 * Payment terms, deposits, revision limits, cancellation and IP transfer belong
 * in that agreement, not on a public page, and must be drafted with a lawyer
 * under Algerian law.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="16 September 2026">
      <p>
        These terms govern your use of this website. They do not govern project
        work — that is covered by a separate written agreement signed before any
        project begins.
      </p>

      <h2>Using this site</h2>
      <p>
        You may browse this site and contact us through it. You agree not to
        attempt to disrupt the site, access it by automated means for bulk
        collection, or use the contact form to send unsolicited advertising or
        unlawful content.
      </p>

      <h2>Our work and content</h2>
      <p>
        The design, text, code and images on this site belong to {site.name}{" "}
        unless stated otherwise. Project work shown in our portfolio may include
        material owned by our clients and is displayed with their knowledge. You
        may not reproduce any of it without permission.
      </p>

      <h2>Quotes and pricing</h2>
      <p>
        Prices shown on this site are indicative starting prices, not offers.
        The price for any project is the one given in a written quote for that
        project, and is valid for [QUOTE VALIDITY PERIOD — e.g. 30 days].
      </p>

      <h2>Project work</h2>
      <p>
        Any project we take on is governed by a separate written agreement
        covering scope, timeline, payment terms, revisions, ownership of the
        finished work, and what happens if either side ends the project. Nothing
        on this website forms a contract for that work.
      </p>

      <h2>No warranty for the site itself</h2>
      <p>
        We work to keep this site accurate and available, but we provide it as
        it is. We are not liable for loss arising from your use of this website.
        This does not limit any liability that cannot be limited by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of [JURISDICTION — confirm with a
        lawyer], and any dispute will be handled by the courts of that
        jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through our{" "}
        <NextLink href="/#contact">contact form</NextLink>.
      </p>
    </LegalPage>
  );
}
