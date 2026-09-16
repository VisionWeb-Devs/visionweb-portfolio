import type { StaticImageData } from "next/image";

/**
 * Content model.
 *
 * These shapes currently back the hardcoded arrays in the section components.
 * They are declared here, separately from the components that render them, so
 * that the CMS integration can satisfy the same contracts without rewriting the
 * presentation layer.
 */

export type Project = {
  name: string;
  image: StaticImageData;
  description: string;
  /**
   * The live URL for the project. Previously hardcoded into ProjectCard, which
   * meant every project would have linked to the first one.
   */
  url: string;
};

export type Package = {
  name: string;
  price: string;
  description: string;
  what_is_included: string[];
};

export type WhyUsItem = {
  title: string;
  description: string;
  image: StaticImageData;
};

/** Which of the two brand surfaces a component paints itself on. */
export type Surface = "ink" | "paper";
