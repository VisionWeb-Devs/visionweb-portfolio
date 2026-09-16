import type { Messages } from "./en";

/**
 * French translation.
 *
 * Typed against the English catalogue, so a missing or renamed key is a build
 * error rather than a string that silently falls back to English at runtime.
 *
 * REVIEW BEFORE LAUNCH: this is a competent translation, not a native
 * marketing rewrite. Tone matters more than literal accuracy in sales copy,
 * and a French-speaking reader should pass over it before it goes live.
 */
const fr: Messages = {
  nav: {
    services: "Services",
    work: "Réalisations",
    process: "Méthode",
    pricing: "Tarifs",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    skipToContent: "Aller au contenu",
    mainLabel: "Principal",
    mobileLabel: "Mobile",
    language: "Langue",
  },
  hero: {
    eyebrowOne: "Studio de développement web",
    eyebrowTwo: "Des sites qui travaillent autant que vous",
    scroll: "DÉFILER",
  },
  services: {
    eyebrow: "Ce que nous faisons",
    heading: "Envie de faire passer votre entreprise au niveau supérieur ?",
    cta: "Voir nos réalisations",
    points: [
      "Nous sommes une équipe de développeurs et de designers qui vous aide à atteindre vos objectifs.",
      "Nous créons des sites et des applications web conçus sur mesure pour vos besoins.",
      "Qu'il s'agisse d'un site vitrine ou d'une application web complexe, nous pouvons vous accompagner.",
      "Nous avons l'expérience de clients issus de secteurs variés.",
    ],
  },
  work: {
    headingOne: "Envie de voir quelques-uns de nos projets ?",
    headingTwo: "Les voici",
    intro: "Une sélection de ce que nous avons construit.",
    caseStudy: "Étude de cas",
    visit: "Visiter",
    backToWork: "← Retour aux réalisations",
    problem: "Le problème",
    solution: "Ce que nous avons construit",
    features: "Fonctionnalités",
    builtWith: "Technologies",
    moreScreens: "Autres écrans",
    visitLive: "Voir le site en ligne",
    startSimilar: "Lancer un projet similaire",
    client: "Client",
    industry: "Secteur",
    type: "Type",
    ownProduct: "Notre propre produit",
  },
  process: {
    eyebrow: "Notre méthode",
    heading:
      "Une méthode claire, du premier échange jusqu'à la mise en ligne",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Ce que nos clients demandent souvent",
  },
  pricing: {
    heading: "Formules",
    perWebsite: "Par site",
    included: "Ce qui est inclus :",
    bookNow: "Réserver",
    contactForPricing: "Sur devis",
  },
  contact: {
    heading: "CONTACT",
    intro:
      "Parlons-en. Écrivez-nous et lançons la conversation — vos idées, vos questions et vos projets sont toujours les bienvenus.",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "E-mail",
    emailPlaceholder: "vous@entreprise.com",
    company: "Entreprise",
    optional: "Facultatif",
    projectType: "De quoi avez-vous besoin ?",
    types: {
      portfolio: "Site vitrine",
      ecommerce: "Boutique en ligne",
      custom: "Application web sur mesure",
      other: "Autre chose",
    },
    budget: "Budget",
    budgetPlaceholder: "Facultatif — nous aide à cadrer le projet",
    message: "Message",
    messagePlaceholder: "Parlez-nous de votre projet",
    send: "Envoyer le message",
    sending: "Envoi en cours…",
    responseTime: "Nous répondons sous 24 heures.",
    successTitle: "Message envoyé",
    honeypot: "Laissez ce champ vide",
    errors: {
      name: "Veuillez saisir votre nom.",
      email: "Veuillez saisir une adresse e-mail valide.",
      message: "Merci d'en dire un peu plus (au moins 10 caractères).",
      rateLimited:
        "Trop de messages depuis cette connexion. Veuillez réessayer plus tard.",
      generic:
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      unconfigured:
        "Le formulaire de contact n'est pas configuré. Écrivez-nous directement.",
    },
    success: "Merci — nous revenons vers vous sous 24 heures.",
  },
  footer: {
    privacy: "Confidentialité",
    terms: "Conditions",
    backToSite: "← Retour au site",
    lastUpdated: "Dernière mise à jour",
  },
};

export default fr;
