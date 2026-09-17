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
    eyebrowOne: "Independent software development studio",
    eyebrowTwo: "Websites that work as hard as you do",
    projectCta: "Let's talk",
    workCta: "Explore our work",
    disciplines: "Design & development, thoughtfully connected.",
    scroll: "SCROLL",
  },
  services: {
    eyebrow: "What we do",
    heading: "Good ideas deserve a great digital presence.",
    intro: "We bring design and development together to turn what makes your business different into something people can see, feel and use.",
    items: [
      { title: "Digital design", description: "A clear point of view, down to the smallest interaction. We shape an experience around your brand and the people who use it.", detail: "Art direction · Interface design · Prototyping" },
      { title: "Development", description: "Thoughtful design, built to work beautifully. Responsive layouts, purposeful motion and fast, dependable performance on every screen.", detail: "Custom development · E-commerce · CMS integration" },
      { title: "Care & evolution", description: "Launch is a beginning. We help you keep things running, make useful improvements and grow your digital presence with your business.", detail: "Maintenance · Improvements · Ongoing support" },
    ],
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
    heading: "Good questions. Clear answers.",
    note: "A little clarity before we get started.",
  },
  pricing: {
    heading: "Packages",
    perWebsite: "Per project",
    included: "What is included:",
    timeline: "Timeline",
    quoteCta: "Get a free quote",
    bookNow: "Get a free quote",
    detailIntro: "What this covers",
    otherPackages: "Other packages",
    allPackages: "← All packages",
    viewDetails: "View details",
    startingAt: "Indicative price",
    contactForPricing: "On request",
  },
  contact: {
    projectLabel: "Have something in mind?",
    projectHeading: "Let's make it happen.",
    projectIntro: "Tell us what you're thinking. We'll help you find the right direction, scope and next step.",
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
  partners: {
    nav: "Partners",
    title: "Partner Program",
    tagline: "You refer. We deliver. You get paid.",
    intro:
      "If you work with businesses that need a website, bring them to us and earn a commission on every project we close. No quotas, no exclusivity, no cost to join.",
    modelsHeading: "Two ways to partner",
    referralTitle: "Referral partner",
    referralPoints: [
      "You pass us the client's contact.",
      "We handle the quote, the project and the follow-up.",
      "Nothing to do on your side after the introduction.",
    ],
    managingTitle: "Managing partner",
    managingPoints: [
      "You qualify the need and frame the brief.",
      "You gather the content: logo, copy, photos.",
      "You stay the client's point of contact alongside us.",
    ],
    ratesHeading: "Commission",
    ratesBody:
      "Commission is paid on every project we close, calculated on the project's base price excluding taxes and the items we include for free. Managing partners earn a higher rate than referrals. We send the full rate card directly — get in touch and we will share it.",
    ctaHeading: "Interested?",
    ctaBody:
      "Tell us a little about who you work with and we will send you the rate card and answer any questions.",
    cta: "Become a partner",
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
