const en = {
  nav: {
    services: "Services",
    work: "Work",
    process: "Process",
    pricing: "Pricing",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    mainLabel: "Main",
    mobileLabel: "Mobile",
    language: "Language",
  },
  hero: {
    eyebrowOne: "Web development studio",
    eyebrowTwo: "Websites that work as hard as you do",
    scroll: "SCROLL",
  },
  services: {
    eyebrow: "What we do",
    heading: "Want to take your business to the next level?",
    cta: "See our work",
    points: [
      "We are a team of developers and designers who can help you achieve your goals.",
      "We specialize in creating websites and web applications that are tailored to your needs.",
      "Whether you need a simple website or a complex web application, we can help you.",
      "We have experience working with clients from a variety of industries.",
    ],
  },
  work: {
    headingOne: "Want to see some of our projects?",
    headingTwo: "Here they are",
    intro: "A selection of what we have built.",
    caseStudy: "Case study",
    visit: "Visit",
    backToWork: "← Back to work",
    problem: "The problem",
    solution: "What we built",
    features: "Features",
    builtWith: "Built with",
    moreScreens: "More screens",
    visitLive: "Visit the live site",
    startSimilar: "Start a project like this",
    client: "Client",
    industry: "Industry",
    type: "Type",
    ownProduct: "Our own product",
  },
  process: {
    eyebrow: "How we work",
    heading: "A process you can follow, from first conversation to launch",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Things clients usually ask",
  },
  pricing: {
    heading: "Packages",
    perWebsite: "Per project",
    included: "What is included:",
    timeline: "Timeline",
    quoteCta: "Get a free quote",
    bookNow: "Get a free quote",
    contactForPricing: "On request",
  },
  contact: {
    heading: "CONTACT",
    intro:
      "Let's connect. Reach out and let the conversation begin — your thoughts, questions and ideas are always welcome.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    company: "Company",
    optional: "Optional",
    projectType: "What do you need?",
    types: {
      portfolio: "Portfolio website",
      ecommerce: "E-commerce store",
      custom: "Custom web application",
      other: "Something else",
    },
    budget: "Budget",
    budgetPlaceholder: "Optional — helps us scope the work",
    message: "Message",
    messagePlaceholder: "Tell us about your project",
    send: "Send message",
    sending: "Sending…",
    responseTime: "We reply within 24 hours.",
    successTitle: "Message sent",
    honeypot: "Leave this field empty",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please tell us a little more (at least 10 characters).",
      rateLimited:
        "Too many messages from this connection. Please try again later.",
      generic: "Something went wrong sending your message. Please try again.",
      unconfigured:
        "The contact form is not configured. Please email us directly.",
    },
    success: "Thanks — we'll get back to you within 24 hours.",
  },
  footer: {
    privacy: "Privacy",
    terms: "Terms",
    backToSite: "← Back to site",
    lastUpdated: "Last updated",
  },
};

export default en;

/**
 * The English catalogue is the contract every other locale must satisfy.
 *
 * Deliberately NOT `as const`: with literal types, a translation would have to
 * equal the English string to typecheck. Inferred `string` types mean the
 * contract is the shape and the key set, which is what actually matters — a
 * missing or misspelled key is still a build error.
 */
export type Messages = typeof en;
