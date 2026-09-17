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
    eyebrowOne: "Studio indépendant de développement logiciel",
    eyebrowTwo: "Des sites qui travaillent autant que vous",
    projectCta: "Parlons-en",
    workCta: "Voir nos réalisations",
    disciplines: "Design et développement, pensés ensemble.",
    scroll: "DÉFILER",
  },
  services: {
    eyebrow: "Ce que nous faisons",
    heading: "Vos idées méritent une présence digitale à leur hauteur.",
    intro: "Nous réunissons design et développement pour donner vie à ce qui rend votre entreprise unique.",
    items: [
      { title: "Design digital", description: "Un parti pris clair, jusque dans les plus petites interactions. Nous créons une expérience autour de votre marque et de ses utilisateurs.", detail: "Direction artistique · Design d'interface · Prototypage" },
      { title: "Développement", description: "Un design soigné, une réalisation solide. Des interfaces adaptées à chaque écran, des animations utiles et des performances fiables.", detail: "Développement sur mesure · E-commerce · Intégration CMS" },
      { title: "Suivi & évolution", description: "La mise en ligne est un début. Nous assurons le suivi et les améliorations pour faire évoluer votre présence digitale avec votre entreprise.", detail: "Maintenance · Améliorations · Accompagnement" },
    ],
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
    heading: "Vos questions. Nos réponses.",
    note: "Quelques précisions avant de commencer.",
  },
  pricing: {
    heading: "Formules",
    perWebsite: "Par projet",
    included: "Ce qui est inclus :",
    timeline: "Délai",
    quoteCta: "Devis gratuit",
    bookNow: "Devis gratuit",
    detailIntro: "Ce que cela comprend",
    otherPackages: "Autres formules",
    allPackages: "← Toutes les formules",
    viewDetails: "Voir le détail",
    startingAt: "Prix indicatif",
    contactForPricing: "Sur devis",
  },
  contact: {
    projectLabel: "Un projet en tête ?",
    projectHeading: "Donnons-lui vie.",
    projectIntro: "Parlez-nous de votre idée. Nous vous aiderons à définir la direction, le périmètre et la prochaine étape.",
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
  partners: {
    nav: "Partenaires",
    title: "Programme Partenaires",
    tagline: "Vous recommandez. Nous livrons. Vous êtes payé.",
    intro:
      "Si vous travaillez avec des entreprises qui ont besoin d'un site, présentez-les-nous et touchez une commission sur chaque projet signé. Sans quota, sans exclusivité, sans frais d'entrée.",
    modelsHeading: "Deux façons de travailler avec nous",
    referralTitle: "Simple apporteur d'affaires",
    referralPoints: [
      "Vous nous transmettez le contact du client.",
      "Nous gérons le devis, le projet et le suivi.",
      "Aucun travail de votre côté après l'intro.",
    ],
    managingTitle: "Partenaire qui gère le client",
    managingPoints: [
      "Vous qualifiez le besoin et cadrez le brief.",
      "Vous récupérez contenus, logo, textes, photos.",
      "Vous restez l'interlocuteur du client avec nous.",
    ],
    ratesHeading: "Commission",
    ratesBody:
      "La commission est versée sur chaque projet signé, calculée sur le prix de base du projet, hors taxes et hors prestations offertes. Le partenaire qui gère le client touche un taux plus élevé que le simple apporteur. Nous transmettons le barème complet directement — contactez-nous et nous vous l'envoyons.",
    ctaHeading: "Intéressé ?",
    ctaBody:
      "Dites-nous avec qui vous travaillez et nous vous enverrons le barème ainsi que les réponses à vos questions.",
    cta: "Devenir partenaire",
  },
  footer: {
    privacy: "Confidentialité",
    terms: "Conditions",
    backToSite: "← Retour au site",
    lastUpdated: "Dernière mise à jour",
  },
};

export default fr;
