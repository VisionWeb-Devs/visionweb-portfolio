"use server";

import { headers } from "next/headers";
import { getMessages } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

const PROJECT_TYPES = ["portfolio", "ecommerce", "custom", "other"] as const;
type ProjectType = (typeof PROJECT_TYPES)[number];

/**
 * In-memory rate limit.
 *
 * Deliberately simple: this is one small bucket per origin IP, and it resets
 * when the process restarts. It is NOT shared across instances, so it stops
 * casual flooding from a single client and nothing more. If the site is ever
 * horizontally scaled, this needs to move to shared storage.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // The locale travels with the form so validation messages come back in the
  // language the visitor is reading, rather than always in English.
  const rawLocale = String(formData.get("locale") ?? "");
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = (await getMessages(locale)).contact;
  // Honeypot: a field hidden from people but filled in by naive bots. A silent
  // success is returned so the bot cannot tell it was rejected.
  if ((formData.get("website") as string | null)?.trim()) {
    return { status: "success", message: t.success };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      message: t.errors.rateLimited,
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  // Attribution. Recorded from the hidden field rather than inferred, and
  // sanitised to the subdomain charset so a forged value cannot inject
  // anything downstream. An absent value means the main site.
  const rawPartner = String(formData.get("partner") ?? "").trim().toLowerCase();
  const partner = /^[a-z0-9]([a-z0-9-]{0,48}[a-z0-9])?$/.test(rawPartner)
    ? rawPartner
    : null;

  const rawType = String(formData.get("projectType") ?? "other");
  const projectType: ProjectType = PROJECT_TYPES.includes(rawType as ProjectType)
    ? (rawType as ProjectType)
    : "other";

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = t.errors.name;
  if (!isEmail(email)) fieldErrors.email = t.errors.email;
  if (message.length < 10) fieldErrors.message = t.errors.message;

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const strapiUrl = process.env.STRAPI_URL;
  if (!strapiUrl) {
    return {
      status: "error",
      message: t.errors.unconfigured,
    };
  }

  try {
    const response = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name,
          email,
          message,
          company: company || undefined,
          budget: budget || undefined,
          projectType,
          partner: partner ?? undefined,
          handled: false,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      // The upstream body may contain internal detail, so it is logged rather
      // than shown to the visitor.
      console.error(
        `Contact submission failed: ${response.status} ${await response.text()}`,
      );
      return {
        status: "error",
        message: t.errors.generic,
      };
    }
  } catch (error) {
    console.error("Contact submission threw:", error);
    return {
      status: "error",
      message: t.errors.generic,
    };
  }

  return { status: "success", message: t.success };
}
