import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time.
 *
 * Sharing a link previously produced a bare URL with no image and a
 * description that described the site to itself. This mirrors the site's own
 * two-colour, type-led identity rather than introducing new branding.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121212",
          color: "#e9e8e7",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, opacity: 0.65 }}>
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 140,
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex" }}>Visionweb</div>
          <div style={{ display: "flex" }}>Devs</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.65 }}>
          Websites · E-commerce · Custom web applications
        </div>
      </div>
    ),
    size,
  );
}
