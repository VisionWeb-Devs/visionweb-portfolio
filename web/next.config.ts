import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

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
      // Local Strapi during development only.
      ...(isDev
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
    dangerouslyAllowLocalIP: isDev,

    // Media URLs from the upload provider are content-addressed and stable.
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
