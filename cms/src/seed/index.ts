import type { Core } from "@strapi/strapi";

/**
 * Seeds the content that was previously hardcoded in the Next.js components.
 *
 * Guarded per content type: each block runs only when that collection is empty,
 * so restarting Strapi never duplicates or overwrites edits made in the admin.
 * This exists so a fresh clone comes up with real content instead of an empty
 * admin, and so the migration off hardcoded arrays is recorded in git.
 */

const packages = [
  {
    name: "Portfolio Website",
    slug: "portfolio-website",
    price: 20000,
    currency: "DZD",
    priceIsFrom: true,
    order: 1,
    description:
      "Perfect for professionals and businesses looking to establish a credible online presence. Showcase your expertise and brand identity with a sleek, professional portfolio.",
    features: [
      "A design crafted to align seamlessly with your brand’s identity.",
      "Responsive and mobile-friendly to impress visitors on any device.",
      "Built with SEO-friendly practices to improve discoverability.",
    ],
  },
  {
    name: "E-commerce Template",
    slug: "e-commerce-template",
    price: 40000,
    currency: "DZD",
    priceIsFrom: true,
    order: 2,
    description:
      "Ideal for entrepreneurs and businesses ready to launch their online store and boost sales. Transform your vision into a functional and engaging shopping experience.",
    features: [
      "A fully operational e-commerce system with shopping cart and category management.",
      "An intuitive admin panel to track, manage, and fulfill orders effortlessly.",
      "A responsive design to attract and convert visitors on both desktop and mobile.",
    ],
  },
  {
    name: "Custom Website",
    slug: "custom-website",
    // Price intentionally omitted: this tier is quoted. Absence is the data,
    // rather than the string "Contact for Pricing" baked into the markup.
    // Strapi's create input types an optional decimal as `number | undefined`,
    // so the field is left out rather than set to null.
    currency: "DZD",
    priceIsFrom: false,
    order: 3,
    description:
      "For businesses and individuals seeking a truly unique online presence that stands out from the competition. Let us bring your vision to life with a website that combines cutting-edge design and functionality.",
    features: [
      "A one-of-a-kind design with interactive animations and custom features.",
      "Fully tailored solutions to meet your business goals and audience needs.",
      "Uncompromising attention to detail for a premium, high-quality result.",
    ],
  },
];

const projects = [
  {
    name: "Vision Shop",
    slug: "vision-shop",
    // Flagged internal: this carries VisionWeb's own brand and was described as
    // a template, so presenting it as client work would be misleading.
    isInternal: true,
    client: "VisionWeb Devs",
    industry: "E-commerce / Clothing",
    order: 1,
    description:
      "This is the template for e-commerce website that sells clothing",
    liveUrl: "https://visionshop.netlify.app/",
    techStack: [],
    features: [],
  },
];

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

const label = (values: string[]) => values.map((value) => ({ label: value }));

export async function seed({ strapi }: { strapi: Core.Strapi }) {
  // Each collection is handled explicitly rather than through a shared helper:
  // the Document Service types `data` per content-type UID, so a helper taking
  // a union of UIDs cannot produce a `data` shape that satisfies all of them.

  const packageDocs = strapi.documents("api::package.package");
  if ((await packageDocs.count({})) === 0) {
    for (const { features, ...rest } of packages) {
      await packageDocs.create({
        data: { ...rest, features: label(features) },
        status: "published",
      });
    }
    strapi.log.info(`[seed] packages: created ${packages.length} document(s).`);
  } else {
    strapi.log.info("[seed] packages: already populated, skipping.");
  }

  const projectDocs = strapi.documents("api::project.project");
  if ((await projectDocs.count({})) === 0) {
    for (const { techStack, features, ...rest } of projects) {
      await projectDocs.create({
        data: { ...rest, techStack: label(techStack), features: label(features) },
        status: "published",
      });
    }
    strapi.log.info(`[seed] projects: created ${projects.length} document(s).`);
  } else {
    strapi.log.info("[seed] projects: already populated, skipping.");
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
