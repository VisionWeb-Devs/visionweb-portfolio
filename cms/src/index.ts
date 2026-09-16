import type { Core } from "@strapi/strapi";
import { seed } from "./seed";
import { grantPublicPermissions } from "./permissions";
import { ensureLocales } from "./locales";

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales({ strapi });
    await grantPublicPermissions({ strapi });
    await seed({ strapi });
  },
};
