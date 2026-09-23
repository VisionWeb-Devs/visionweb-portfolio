import fs from "node:fs";
import path from "node:path";
import type { Core } from "@strapi/strapi";

/**
 * Signed partners and their branding.
 *
 * Colours are sampled from the partner's own logo files rather than guessed.
 * SCALE's identity is black with a red chevron, so both of its surfaces are
 * dark — the arrangement the old two-colour system could not express.
 *
 * Contact details are intentionally blank where the partner has not supplied
 * them: the branded site shows its own contact form regardless, and showing
 * VisionWeb's phone number on a partner-branded page would break the very
 * thing the subdomain exists to do.
 */
const PARTNERS = [
  {
    name: "SCALE",
    subdomain: "scale",
    tagline: "Agence de services digitaux",
    // Sampled: background #000000, wordmark #ffffff, chevron peaking at
    // #fc0004. The accent is pulled back slightly from that peak, which is a
    // blown-out highlight rather than a usable interface colour.
    colorSurface: "#000000",
    colorOnSurface: "#ffffff",
    colorSurfaceAlt: "#0d0d0d",
    colorOnSurfaceAlt: "#ffffff",
    colorAccent: "#e6101a",
    colorOnAccent: "#ffffff",
    defaultLocale: "fr" as const,
    // Partner sites repeat the main site's content, which search engines
    // discount as duplication and which would cost the main domain. Opt in
    // only for a partner who writes genuinely original copy.
    indexable: false,
    active: true,
    logoFile: "scale-logo.png",
  },
];

async function uploadLogo(
  strapi: Core.Strapi,
  fileName: string,
): Promise<number | null> {
  const absolutePath = path.join(process.cwd(), "seed-assets", fileName);
  if (!fs.existsSync(absolutePath)) {
    strapi.log.warn(`[seed] partner logo missing: ${absolutePath}`);
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

export async function seedPartners({ strapi }: { strapi: Core.Strapi }) {
  const docs = strapi.documents("api::partner.partner");

  for (const { logoFile, ...partner } of PARTNERS) {
    const [existing] = (await docs.findMany({
      filters: { subdomain: { $eq: partner.subdomain } },
    })) as { documentId: string }[];

    if (existing) {
      strapi.log.info(`[seed] partners: "${partner.subdomain}" exists, skipping.`);
      continue;
    }

    const logo = await uploadLogo(strapi, logoFile);
    await docs.create({
      data: { ...partner, ...(logo ? { logo } : {}) },
    });
    strapi.log.info(
      `[seed] partners: created "${partner.subdomain}"${logo ? " with logo" : " (no logo)"}.`,
    );
  }
}
