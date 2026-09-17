import NextLink from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import { site } from "@/lib/site";
import styles from "./Portfolio.module.css";

const Footer = ({ locale, messages }: { locale: Locale; messages: Messages }) => (
  <footer data-nav-theme="dark" className={styles.footer}>
    <div data-nav-theme="light" className={styles.footerPanel}>
      <div className={styles.footerHeading}>
        <NextLink href={`/${locale}#contact`} className={styles.footerContact}>
          <span>{messages.contact.heading}</span>
          <span aria-hidden="true">↗</span>
        </NextLink>
        <p>{messages.contact.intro}</p>
      </div>
      <div className={styles.footerBottom}>
        <ul>
          <li><a href="https://www.instagram.com/visionweb.devs/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
          <li><a href="https://www.linkedin.com/company/visionweb-devs/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          <li><a href="https://www.github.com/VisionWeb-Devs" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
          <li><a href={site.social.discord} target="_blank" rel="noopener noreferrer">Discord ↗</a></li>
        </ul>
        <ul>
          <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
          <li><a href={`tel:${site.contact.phoneE164}`}>{site.contact.phone}</a></li>
          <li><a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></li>
        </ul>
        <div className={styles.footerLegal}>
          <NextLink href={`/${locale}/partners`}>{messages.partners.nav}</NextLink>
          <NextLink href={`/${locale}/privacy`}>{messages.footer.privacy}</NextLink>
          <NextLink href={`/${locale}/terms`}>{messages.footer.terms}</NextLink>
          <a href="https://www.visionwebdevs.tech/inspiration" target="_blank" rel="noopener noreferrer">Inspiration ↗</a>
          <p>&copy; {new Date().getFullYear()} VisionWeb Devs.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
