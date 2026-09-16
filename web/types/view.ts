/**
 * View models.
 *
 * Presentation components take these rather than raw Strapi payloads, so the
 * client components stay unaware of the CMS wire format and the server
 * components own the mapping.
 */

export type ProjectImageView = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectView = {
  id: string;
  name: string;
  description: string;
  url: string | null;
  isInternal: boolean;
  image: ProjectImageView | null;
};
