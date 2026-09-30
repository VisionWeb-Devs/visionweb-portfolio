# Strapi CMS. Debian (glibc) base: sharp and better-sqlite3 ship prebuilt
# binaries for it, so no compiler toolchain is needed.
FROM node:24-bookworm-slim AS base
WORKDIR /opt/app
ENV NODE_ENV=production

# ── dependencies ────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# ── build (compiles TypeScript and the admin panel; needs dev deps) ─
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund
COPY . .
RUN npm run build

# ── runtime ─────────────────────────────────────────────────────────
FROM base AS runner
COPY --from=deps  --chown=node:node /opt/app/node_modules ./node_modules
COPY --from=build --chown=node:node /opt/app/dist ./dist
COPY --from=build --chown=node:node /opt/app/package.json /opt/app/tsconfig.json ./
# (tsconfig.json tells `strapi start` to load the compiled app from dist/.)
COPY --from=build --chown=node:node /opt/app/public ./public
COPY --from=build --chown=node:node /opt/app/database ./database
COPY --from=build --chown=node:node /opt/app/seed-assets ./seed-assets
COPY --from=build --chown=node:node /opt/app/favicon.png ./favicon.png
# Uploaded media live here; mount a volume over it.
RUN mkdir -p public/uploads && chown -R node:node public/uploads
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
