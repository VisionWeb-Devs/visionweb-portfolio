import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Whether the optimizer may fetch images from localhost / private IPs.
 *
 * Gated on an explicit flag rather than NODE_ENV, because `next start` runs a
 * production build against a local Strapi and would otherwise reject every
 * image with a 400 — the media is served from http://localhost:1337 and Next
 * 16 blocks local addresses by default.
 *
 * SSRF risk: this lets the optimizer be pointed at hosts inside the network it
 * runs on. Only ever set it on a developer machine; it must be unset wherever
 * the site is publicly reachable.
 */
const allowLocalImages =
  isDev || process.env.ALLOW_LOCAL_IMAGES === "true";

/**
 * Hostname serving Strapi media in production (the R2 / S3 public bucket, or a
 * custom domain in front of it). Set MEDIA_HOSTNAME once the bucket exists.
 */
const mediaHostname = process.env.MEDIA_HOSTNAME;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(mediaHostname
        ? [
            {
              protocol: "https" as const,
              hostname: mediaHostname,
              port: "",
              pathname: "/**",
              search: "",
            },
          ]
        : []),
      // Local Strapi, for development and for testing a local production build.
      ...(allowLocalImages
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
              search: "",
            },
          ]
        : []),
    ],

    // Next 16 requires an explicit allowlist and defaults to [75]; a `quality`
    // prop outside this list is coerced rather than honoured.
    qualities: [75, 90],

    // Next 16 blocks optimising images served from localhost / local IPs by
    // default, which otherwise makes a local Strapi return 400 for every image.
    // Scoped to development because it is an SSRF risk in production.
    dangerouslyAllowLocalIP: allowLocalImages,

    // Media URLs from the upload provider are content-addressed and stable.
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
