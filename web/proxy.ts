import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

/**
 * Locale routing.
 *
 * The App Router has no built-in i18n routing — that was a Pages Router
 * feature — so an unprefixed path is redirected to a locale-prefixed one here.
 * Named `proxy` because Next 16 renamed Middleware to Proxy; the behaviour is
 * unchanged.
 *
 * Preference order: an explicit choice stored by the language switcher, then
 * the browser's Accept-Language, then English.
 */
const LOCALE_COOKIE = "locale";

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyPrefixed = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (alreadyPrefixed) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the webhook, and files with an
  // extension — metadata routes such as robots.txt and sitemap.xml must not be
  // redirected into a locale, or crawlers get a 307 instead of the file.
  matcher: [
    "/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|opengraph-image|.*\.).*)",
  ],
};
