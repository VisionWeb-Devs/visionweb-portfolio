// web/components/ContactSection.tsx
import ContactForm from "./ContactForm";
import type { Messages } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import styles from "./Editorial.module.css";

export default function ContactSection({ locale, messages }: {
  locale: Locale;
  messages: Messages["contact"];
}) {
  return (
    <section id="contact" data-nav-theme="light" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.contactIntro}>
        <p className={styles.sectionLabel}>{messages.projectLabel}</p>
        <h2 id="contact-title">{messages.projectHeading}</h2>
        <p>{messages.projectIntro}</p>
        <a className={styles.textLink} href={`mailto:${site.contact.email}`}>{site.contact.email} <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.contactForm}><ContactForm locale={locale} messages={messages} /></div>
    </section>
  );
}
