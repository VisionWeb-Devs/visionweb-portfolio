"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";

/**
 * Records the visitor's language choice and sends them to the same page in
 * that language.
 *
 * Done as a Server Action rather than writing document.cookie on the client:
 * cookies can only be set from an action or route handler, and it keeps the
 * switcher working without JavaScript.
 */
export async function setLocale(formData: FormData) {
  const next = String(formData.get("locale") ?? "");
  const target = String(formData.get("path") ?? "/");

  if (!isLocale(next)) redirect(target);

  const store = await cookies();
  store.set("locale", next, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect(target);
}
