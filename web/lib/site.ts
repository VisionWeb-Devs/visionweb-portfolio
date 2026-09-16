/**
 * Single source of truth for site-level facts used by metadata, structured
 * data, the sitemap and robots.
 *
 * SITE_URL drives canonical URLs, Open Graph URLs and the sitemap, so it must
 * be the real production origin once the domain is settled. The fallback only
 * keeps local builds working.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name: "VisionWeb Devs",
  /**
   * Written to describe the business to a stranger. The previous description,
   * "Portfolio site for Visionweb Devs", described the site to itself and
   * carried no keyword a prospective client would ever search for.
   */
  description:
    "VisionWeb Devs is a web development studio building portfolio websites, e-commerce stores and custom web applications for businesses and professionals.",
  tagline: "Web development studio",
  locale: "en",
  /**
   * Country only. The street-level location was commented out in the original
   * footer, so it is treated as deliberately withheld rather than lost.
   */
  country: "Algeria",
  /**
   * Public contact details, as published on the company's own 2026 price
   * sheet. The CEO's personal address (sadjedbougandoura@gmail.com) is
   * deliberately not published here — inbound should reach the shared inbox.
   */
  contact: {
    email: "visionwebdevs@gmail.com",
    /** Displayed in local format; `phoneE164` is what tel:/wa.me links use. */
    phone: "0675 49 48 80",
    phoneE164: "+213675494880",
    whatsapp: "https://wa.me/213675494880",
  },
  social: {
    instagram: "https://www.instagram.com/visionweb.devs/",
    linkedin: "https://www.linkedin.com/company/visionweb-devs/",
    github: "https://www.github.com/VisionWeb-Devs",
    discord: "https://discord.gg/dgXrgJxdKs",
  },
} as const;
