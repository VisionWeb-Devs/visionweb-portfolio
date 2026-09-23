import fs from "node:fs";
import path from "node:path";
import type { Core } from "@strapi/strapi";
import { seedPricing } from "./pricing";
import { seedPartners } from "./partners";
import { seedProjects } from "./projects";

/**
 * Seeds the content that was previously hardcoded in the Next.js components.
 *
 * Guarded per content type: each block runs only when that collection is empty,
 * so restarting Strapi never duplicates or overwrites edits made in the admin.
 * This exists so a fresh clone comes up with real content instead of an empty
 * admin, and so the migration off hardcoded arrays is recorded in git.
 */

const teamMembers = [
  {
    name: "Sadjed Bougandoura",
    role: "Chief Executive Officer",
    order: 1,
  },
  {
    name: "Abd Eldjalil Selamnia",
    role: "Co-Founder",
    order: 2,
  },
];

/**
 * STARTING CONTENT — REVIEW BEFORE LAUNCH.
 *
 * These process steps and FAQ answers are plausible defaults so the sections
 * render and can be edited in the admin, not statements the company has made.
 * The durations and policies in particular are guesses and must be replaced
 * with what VisionWeb actually does before this is published.
 */
const processSteps = [
  {
    title: "Discovery",
    description:
      "We start by understanding your business, your customers and what the site actually needs to achieve. You get a clear scope and a fixed quote before any work begins.",
    duration: "About 1 week",
    order: 1,
  },
  {
    title: "Design",
    description:
      "We design the site around your brand, starting from layout and working up to the finished visual design. You review and give feedback before anything is built.",
    duration: "1 to 2 weeks",
    order: 2,
  },
  {
    title: "Build",
    description:
      "We build the site to be fast and responsive on every screen, following SEO-friendly practices from the start rather than bolting them on afterwards.",
    duration: "2 to 4 weeks",
    order: 3,
  },
  {
    title: "Launch",
    description:
      "We test across devices and browsers, deploy the site, and hand over everything you need to run it, including a walkthrough of how to edit your own content.",
    duration: "A few days",
    order: 4,
  },
  {
    title: "Support",
    description:
      "We stay available after launch for fixes, changes and questions, so the site keeps working as your business grows.",
    duration: "Ongoing",
    order: 5,
  },
];

const faqs = [
  {
    question: "How long does a website take?",
    answer:
      "Most portfolio sites take three to four weeks from first conversation to launch. E-commerce builds and custom applications take longer, usually six to ten weeks depending on scope. We give you a timeline with your quote.",
    order: 1,
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "An idea of what you want the site to do, any brand materials you already have such as a logo or colours, and the text and images you want to include. If you do not have those yet, we can help.",
    order: 2,
  },
  {
    question: "Can you work with my existing brand?",
    answer:
      "Yes. If you already have a logo, colours or brand guidelines, we design around them. If you do not, we can establish a simple visual identity as part of the project.",
    order: 3,
  },
  {
    question: "Will I be able to update the site myself?",
    answer:
      "Yes. We build sites so that your content — text, images, prices, projects — can be edited without needing a developer, and we show you how before handover.",
    order: 4,
  },
  {
    question: "What happens after the site launches?",
    answer:
      "We stay available for fixes and changes. Ongoing maintenance can be arranged if you would like us to keep looking after the site.",
    order: 5,
  },
  {
    question: "Do you work with clients outside Algeria?",
    answer:
      "Yes. We work remotely and are happy to take on projects internationally.",
    order: 6,
  },
];

const label = (values: string[]) => values.map((value) => ({ label: value }));

/**
 * Uploads a file from disk into the media library and returns its id.
 *
 * The portfolio screenshot previously lived in the Next.js repo and was
 * imported directly by a component. Moving it into the media library is what
 * lets Strapi generate the responsive variants, and is why the 2.5 MB original
 * stops being what visitors download.
 */

export async function seed({ strapi }: { strapi: Core.Strapi }) {
  // Each collection is handled explicitly rather than through a shared helper:
  // the Document Service types `data` per content-type UID, so a helper taking
  // a union of UIDs cannot produce a `data` shape that satisfies all of them.

  await seedPricing({ strapi });
  await seedPartners({ strapi });

  await seedProjects({ strapi });

  const processDocs = strapi.documents("api::process-step.process-step");
  if ((await processDocs.count({})) === 0) {
    for (const step of processSteps) {
      await processDocs.create({ data: step, status: "published" });
    }
    strapi.log.info(`[seed] process steps: created ${processSteps.length}.`);
  } else {
    strapi.log.info("[seed] process steps: already populated, skipping.");
  }

  const faqDocs = strapi.documents("api::faq.faq");
  if ((await faqDocs.count({})) === 0) {
    for (const faq of faqs) {
      await faqDocs.create({ data: faq, status: "published" });
    }
    strapi.log.info(`[seed] faqs: created ${faqs.length}.`);
  } else {
    strapi.log.info("[seed] faqs: already populated, skipping.");
  }

  const teamDocs = strapi.documents("api::team-member.team-member");
  if ((await teamDocs.count({})) === 0) {
    for (const member of teamMembers) {
      await teamDocs.create({ data: member, status: "published" });
    }
    strapi.log.info(`[seed] team members: created ${teamMembers.length} document(s).`);
  } else {
    strapi.log.info("[seed] team members: already populated, skipping.");
  }
}
