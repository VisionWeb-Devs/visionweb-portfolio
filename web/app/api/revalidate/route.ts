import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { STRAPI_TAGS, type StrapiTag } from "@/types/strapi";

/**
 * Strapi webhook receiver.
 *
 * Strapi has no built-in HMAC request signing, so this uses a shared secret in
 * an Authorization header over HTTPS. That is proportionate here: the worst a
 * forged request can do is flush a cache. The comparison is constant-time —
 * `===` on a secret is a timing oracle.
 *
 * Note also that Strapi does NOT retry failed webhooks. If this handler errors,
 * that revalidation is simply lost, so it is kept deliberately small and fast.
 */

function secureCompare(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  // timingSafeEqual throws on length mismatch, so length is checked first.
  // Length is not secret; the contents are.
  return left.length === right.length && timingSafeEqual(left, right);
}

function isStrapiTag(value: unknown): value is StrapiTag {
  return (
    typeof value === "string" && (STRAPI_TAGS as readonly string[]).includes(value)
  );
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, reason: "server not configured" },
      { status: 500 },
    );
  }

  const presented =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secureCompare(presented, secret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { revalidated: false, reason: "invalid json" },
      { status: 400 },
    );
  }

  const model = (payload as { model?: unknown } | null)?.model;

  // Media events carry only the file object and no `model`, so swapping a
  // screenshot would otherwise revalidate nothing. Fall back to every tag.
  const tags: StrapiTag[] = isStrapiTag(model) ? [model] : [...STRAPI_TAGS];

  for (const tag of tags) {
    // Next 16: the single-argument form is deprecated. `{ expire: 0 }` is the
    // documented form for invalidation arriving from outside a Server Action,
    // and expires the data immediately rather than serving it stale once more.
    revalidateTag(tag, { expire: 0 });
  }

  return Response.json({ revalidated: true, tags, now: Date.now() });
}
