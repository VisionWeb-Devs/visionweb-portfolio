import type { StaticImageData } from "next/image";

/**
 * Local content types.
 *
 * Projects and packages now come from Strapi and are typed in `types/strapi.ts`
 * (wire format) and `types/view.ts` (presentation). What remains here is the
 * content that has not moved yet, plus the shared surface token.
 */

/**
 * NOTE: the "Why Us" items are still hardcoded in MeetTheTeam, and the copy is
 * e-commerce/logistics placeholder text that was never replaced. Moving it to
 * Strapi is deliberately deferred until the copy itself is rewritten, so the
 * wrong content does not get migrated into the CMS and legitimised.
 */
export type WhyUsItem = {
  title: string;
  description: string;
  image: StaticImageData;
};

/** Which of the two brand surfaces a component paints itself on. */
export type Surface = "ink" | "paper";
