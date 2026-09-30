import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Public origin (e.g. https://cms.example.com). Behind a TLS-terminating
  // reverse proxy Strapi must know its real URL and trust X-Forwarded-* headers,
  // otherwise admin login fails trying to set secure cookies over "http".
  url: env('PUBLIC_URL', ''),
  proxy: { koa: env.bool('IS_PROXIED', false) },
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
