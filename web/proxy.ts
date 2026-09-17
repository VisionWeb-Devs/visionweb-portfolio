import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

/**
 * Locale routing and partner-subdomain resolution.
 *
 * The App Router has no built-in i18n routing — that was a Pages Router
 * feature — so an unprefixed path is redirected to a locale-prefixed one here.
 * Named `proxy` because Next 16 renamed Middleware to Proxy; behaviour is
 * unchanged.
 *
 * A partner subdomain is rewritten, not redirected: the visitor keeps seeing
 * scale.example.com/fr while the app renders /p/scale/fr. That keeps the
 * partner as a route parameter, so those pages stay statically generated —
 * reading the Host header inside a layout would opt every route into dynamic
 * rendering, the main site included.
 */
const LOCALE_COOKIE = "locale";

/** Apex the partner subdomains hang off. `localhost` makes scale.localhost work in dev. */
const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? "localhost";

function detectLocale(request: NextRequest): string {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen && isLocale(chosen)) return chosen;

  const header = request.headers.get("accept-language") ?? "";
  for (const entry of header.split(",")) {
    const code = entry.split(";")[0]?.trim().split("-")[0]?.toLowerCase();
    if (code && isLocale(code)) return code;
  }

  return defaultLocale;
}

/** Returns the partner subdomain, or null for the apex and www. */
function partnerFromHost(request: NextRequest): string | null {
  const host = (request.headers.get("host") ?? "").split(":")[0]?.toLowerCase();
  if (!host) return null;

  const suffix = `.${ROOT_DOMAIN}`;
  if (host === ROOT_DOMAIN || !host.endsWith(suffix)) return null;

  const subdomain = host.slice(0, -suffix.length);
  // Only a single label, and never www — a deeper name is not a partner.
  if (!subdomain || subdomain === "www" || subdomain.includes(".")) return null;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdomain)) return null;

  return subdomain;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const partner = partnerFromHost(request);

  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = Boolean(segments[0] && isLocale(segments[0]));

  if (!hasLocale) {
    // Send everyone to an explicit locale first, so the rewrite below always
    // has one to work with and URLs are shareable.
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  if (partner) {
    const url = request.nextUrl.clone();
    url.pathname = `/p/${partner}/${segments.join("/")}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, the webhook, and files with an
  // extension — metadata routes such as robots.txt and sitemap.xml must not be
  // redirected into a locale, or crawlers get a 307 instead of the file.
  matcher: [
    "/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|opengraph-image|.*\\.).*)",
  ],
};

export { locales };
