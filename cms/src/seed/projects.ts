import fs from "node:fs";
import path from "node:path";
import type { Core } from "@strapi/strapi";

/**
 * Portfolio projects.
 *
 * Every description and feature below is read off the project's own
 * presentation sheet — the headline, the stated capabilities, the sections
 * visible in the interface. Nothing is inferred about outcomes, budgets or
 * results, because none of that is evidenced.
 *
 * Three fields are deliberately left empty for the owner to fill: liveUrl,
 * techStack, and whether a project was client work or internal. Those are
 * claims only VisionWeb can make truthfully.
 */

type Localised = {
  name: string;
  client: string | null;
  industry: string;
  description: string;
  problem: string | null;
  solution: string | null;
  features: string[];
};

type Seed = {
  slug: string;
  order: number;
  image: string;
  en: Localised;
  fr: Localised;
};

const PROJECTS: Seed[] = [
  {
    slug: "immo-pro",
    order: 1,
    image: "immo-pro.png",
    en: {
      name: "Immo Pro",
      client: null,
      industry: "Real estate software",
      description:
        "A real-estate agency management platform: a complete workspace for agencies to manage listings, subscriptions and teams.",
      problem: null,
      solution:
        "A multi-agency platform with an administrator workspace overseeing every agency, and a separate workspace each agency uses to publish properties and manage its own team.",
      features: [
        "Multi-agency platform with a central admin workspace",
        "Subscription management with tiered plans and renewals",
        "Payment proof review and approval workflow",
        "Property listings with detailed records and photo galleries",
        "Property search filtered by transaction type, wilaya, city and price",
        "Team management with member invitations and roles",
        "Full audit log of actions across the platform",
      ],
    },
    fr: {
      name: "Immo Pro",
      client: null,
      industry: "Logiciel immobilier",
      description:
        "Une plateforme de gestion pour agences immobilières : un espace de travail complet pour gérer biens, abonnements et équipes.",
      problem: null,
      solution:
        "Une plateforme multi-agences avec un espace administrateur qui supervise l'ensemble des agences, et un espace dédié à chaque agence pour publier ses biens et gérer son équipe.",
      features: [
        "Plateforme multi-agences avec espace d'administration central",
        "Gestion des abonnements avec formules et renouvellements",
        "Validation des preuves de paiement",
        "Fiches de biens détaillées avec galeries photos",
        "Recherche par type de transaction, wilaya, ville et prix",
        "Gestion d'équipe avec invitations et rôles",
        "Journal d'audit complet des actions sur la plateforme",
      ],
    },
  },
  {
    slug: "parisian-hotel",
    order: 2,
    image: "parisian-hotel.png",
    en: {
      name: "Parisian Hotel",
      client: null,
      industry: "Hospitality",
      description:
        "A boutique hotel website for a three-star hotel in Le Marais, Paris, built around the rooms, the neighbourhood and online booking.",
      problem: null,
      solution:
        "A bilingual site that presents the rooms and the surrounding quarter, with an interactive location map, verified guest reviews and online reservation.",
      features: [
        "Bilingual site, French and English",
        "Room presentation with amenities and photo carousels",
        "Immersive photo gallery with category filters",
        "Neighbourhood guide for Le Marais",
        "Special offers section",
        "Interactive map with transport and walking times",
        "Verified guest reviews",
        "Online reservation",
      ],
    },
    fr: {
      name: "Parisian Hotel",
      client: null,
      industry: "Hôtellerie",
      description:
        "Le site d'un hôtel boutique trois étoiles situé dans le Marais à Paris, construit autour des chambres, du quartier et de la réservation en ligne.",
      problem: null,
      solution:
        "Un site bilingue qui présente les chambres et le quartier, avec un plan d'accès interactif, des avis clients vérifiés et la réservation en ligne.",
      features: [
        "Site multilingue, français et anglais",
        "Présentation des chambres avec équipements et carrousels photos",
        "Galerie photos immersive avec filtres par catégorie",
        "Présentation du quartier du Marais",
        "Section offres spéciales",
        "Plan et accès interactif avec temps de trajet",
        "Avis clients vérifiés",
        "Réservation en ligne",
      ],
    },
  },
  {
    slug: "ben-h-solutions",
    order: 3,
    image: "ben-h-solutions.png",
    en: {
      name: "Ben-H Solutions",
      client: null,
      industry: "IT services and staffing",
      description:
        "A site for an IT and electronic-security staffing agency placing qualified technicians across Montréal, Laval and the Rive-Nord/Rive-Sud.",
      problem: null,
      solution:
        "A site serving two audiences at once — companies looking for a technician, and technicians looking for work — with a separate path and contact form for each.",
      features: [
        "Two distinct journeys: for companies and for technicians",
        "IT and electronic-security service listings",
        "Technician recruitment with CV submission",
        "Separate contact forms per audience",
        "Three-step process explaining how a placement works",
        "Company values and credentials section",
      ],
    },
    fr: {
      name: "Ben-H Solutions",
      client: null,
      industry: "Services informatiques et placement",
      description:
        "Le site d'une agence de placement spécialisée en support informatique et sécurité électronique, qui place des techniciens qualifiés à Montréal, Laval et sur la Rive-Nord/Rive-Sud.",
      problem: null,
      solution:
        "Un site qui s'adresse à deux publics à la fois — les entreprises qui cherchent un technicien et les techniciens qui cherchent un mandat — avec un parcours et un formulaire dédiés à chacun.",
      features: [
        "Deux parcours distincts : pour les entreprises et pour les techniciens",
        "Présentation des services IT et sécurité électronique",
        "Recrutement de techniciens avec dépôt de CV",
        "Formulaires de contact séparés par public",
        "Processus en trois étapes expliquant le déroulement d'un mandat",
        "Section valeurs et expertise de l'agence",
      ],
    },
  },
];

/** Superseded: the single self-branded demo the portfolio used to show. */
const RETIRED_SLUGS = ["vision-shop"];

const label = (values: string[]) => values.map((value) => ({ label: value }));

async function uploadImage(
  strapi: Core.Strapi,
  fileName: string,
): Promise<number | null> {
  const absolutePath = path.join(process.cwd(), "seed-assets", fileName);
  if (!fs.existsSync(absolutePath)) {
    strapi.log.warn(`[seed] project image missing: ${absolutePath}`);
    return null;
  }

  const { size } = fs.statSync(absolutePath);
  const uploaded = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { alternativeText: "", caption: "" } },
      files: [
        {
          filepath: absolutePath,
          originalFilename: fileName,
          mimetype: "image/png",
          size,
        },
      ],
    });

  return uploaded?.[0]?.id ?? null;
}

export async function seedProjects({ strapi }: { strapi: Core.Strapi }) {
  const docs = strapi.documents("api::project.project");

  for (const slug of RETIRED_SLUGS) {
    const stale = (await docs.findMany({
      filters: { slug: { $eq: slug } },
    })) as { documentId: string }[];
    for (const entry of stale) {
      await docs.delete({ documentId: entry.documentId });
      strapi.log.info(`[seed] projects: removed superseded "${slug}".`);
    }
  }

  for (const project of PROJECTS) {
    const [existing] = (await docs.findMany({
      filters: { slug: { $eq: project.slug } },
      locale: "en",
    })) as { documentId: string }[];

    if (existing) {
      strapi.log.info(`[seed] projects: "${project.slug}" exists, skipping.`);
      continue;
    }

    const image = await uploadImage(strapi, project.image);

    const payload = (variant: "en" | "fr") => ({
      slug: project.slug,
      order: project.order,
      name: project[variant].name,
      industry: project[variant].industry,
      description: project[variant].description,
      // Strapi types optional fields as `T | undefined`, never null, so an
      // unknown value is omitted rather than explicitly emptied.
      ...(project[variant].client ? { client: project[variant].client } : {}),
      ...(project[variant].problem ? { problem: project[variant].problem } : {}),
      ...(project[variant].solution
        ? { solution: project[variant].solution }
        : {}),
      features: label(project[variant].features),
      // Left for the owner: techStack, liveUrl, and whether this was client
      // work. Guessing any of them would put an unverified claim on the site.
      techStack: [],
      isInternal: false,
      ...(image ? { screenshots: [image] } : {}),
    });

    const created = await docs.create({
      data: payload("en"),
      locale: "en",
      status: "published",
    });

    // French written second, English rewritten last: a locale-scoped update
    // straight after create overwrites the original, so the order matters.
    await docs.update({
      documentId: created.documentId,
      locale: "fr",
      data: payload("fr"),
      status: "published",
    });
    await docs.update({
      documentId: created.documentId,
      locale: "en",
      data: payload("en"),
      status: "published",
    });

    const check = (await docs.findOne({
      documentId: created.documentId,
      locale: "en",
    })) as { name?: string } | null;

    if (check?.name !== project.en.name) {
      strapi.log.error(
        `[seed] projects: "${project.slug}" en reads back as "${check?.name}".`,
      );
    } else {
      strapi.log.info(`[seed] projects: created "${project.slug}" (en + fr).`);
    }
  }
}
