# Next.js site. The build prerenders pages from the live CMS, so STRAPI_URL
# must point at a running Strapi (the production one, deployed first).
FROM node:24-alpine AS base
WORKDIR /app

# ── dependencies ────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ── build ───────────────────────────────────────────────────────────
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public values, baked into the build (canonical URLs, image host allowlist).
ARG NEXT_PUBLIC_SITE_URL
ARG STRAPI_URL
ARG MEDIA_HOSTNAME
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    STRAPI_URL=$STRAPI_URL \
    MEDIA_HOSTNAME=$MEDIA_HOSTNAME \
    NEXT_TELEMETRY_DISABLED=1
# The read-only Strapi token (partners are not public) is a BuildKit secret, so
# it is available to the build but never stored in an image layer.
RUN --mount=type=secret,id=strapi_token \
    STRAPI_API_TOKEN="$(cat /run/secrets/strapi_token 2>/dev/null)" npm run build

# ── runtime ─────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
