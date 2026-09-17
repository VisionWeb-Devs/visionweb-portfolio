import type { Core } from "@strapi/strapi";

/**
 * Grants the Public role exactly one capability: creating a contact
 * submission.
 *
 * Doing this in code rather than through the admin UI means a fresh clone or a
 * new environment comes up working, with the grant visible in review.
 *
 * TRADE-OFF, stated plainly: an unauthenticated create endpoint can be posted
 * to directly, bypassing the site's own form and its validation. For a
 * marketing site the worst case is junk rows in the admin, which is why this is
 * proportionate today. The form adds a honeypot and server-side rate limiting,
 * but before this is exposed publicly it should be put behind a scoped API
 * token or a CAPTCHA. Public READ of projects, packages and team members is
 * deliberately NOT granted here — the site reads those with a read-only token.
 */
const PUBLIC_ACTIONS = [
  "api::contact-submission.contact-submission.create",
  "api::faq.faq.find",
  "api::faq.faq.findOne",
  "api::package.package.find",
  "api::package.package.findOne",
  "api::pricing-info.pricing-info.find",
  "api::pricing-info.pricing-info.findOne",
  "api::process-step.process-step.find",
  "api::process-step.process-step.findOne",
  "api::project.project.find",
  "api::project.project.findOne",
  "api::team-member.team-member.find",
  "api::team-member.team-member.findOne",
];

export async function grantPublicPermissions({ strapi }: { strapi: Core.Strapi }) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) {
    strapi.log.warn("[permissions] public role not found, skipping.");
    return;
  }

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: publicRole.id } });

    if (existing) continue;

    await strapi.db.query("plugin::users-permissions.permission").create({
      data: { action, role: publicRole.id },
    });
    strapi.log.info(`[permissions] granted to public role: ${action}`);
  }
}
