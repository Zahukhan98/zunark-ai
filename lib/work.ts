export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  status: "delivered" | "in-development";
  screenshots?: { src: string; caption: string; url?: string }[];
  attribution: string;
  problem: string;
  solution: string;
  whatWeBuilt: string[];
  technologies: string[];
  outcome: string;
  relatedServices: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "german-sme-website-development",
    name: "Website Development for German SMEs",
    industry: "Professional Services / Healthcare",
    status: "delivered",
    screenshots: [
      { src: "/work/steuerberater-tabak.jpg", caption: "Tax advisory firm website", url: "https://steuerberater-tabak.com/" },
      { src: "/work/ihrteam24.jpg", caption: "Care services provider website", url: "https://ihrteam24.de/" },
    ],
    attribution:
      "Our founder contributed to the development of these websites while working with an international German technology company, prior to founding ZUNARK.",
    problem:
      "Several German small and medium-sized businesses — including a tax advisory firm and a care-services provider — needed professional, credible websites explaining their services clearly.",
    solution:
      "Collaborative website development covering design implementation, content structure and on-page technical setup.",
    whatWeBuilt: [
      "Corporate websites with clear service structure",
      "Content and page architecture for non-technical editing",
      "On-page technical setup (metadata, structure)",
    ],
    technologies: ["WordPress", "Custom theming", "On-page SEO structuring"],
    outcome: "Contributed to live, in-use business websites including steuerberater-tabak.com and ihrteam24.de.",
    relatedServices: ["web-development"],
  },
  {
    slug: "ecommerce-platform",
    name: "E-Commerce Platform",
    industry: "Retail",
    status: "in-development",
    attribution: "Current ZUNARK project.",
    problem:
      "A retail business needs to move from in-person/social-media-only sales to a proper online store with product, cart and checkout flows.",
    solution: "A custom-built e-commerce storefront currently in development.",
    whatWeBuilt: ["Product catalog and storefront (in progress)", "Cart and checkout flow (in progress)"],
    technologies: ["Next.js / React", "Payment integration"],
    outcome: "In development — details to follow once launched.",
    relatedServices: ["web-development"],
  },
  {
    slug: "ai-content-generation-seo",
    name: "AI Content Generation Pipeline for SEO",
    industry: "Marketing / SEO",
    status: "delivered",
    attribution:
      "Built by our founding team prior to ZUNARK, for German businesses, as part of hands-on AI tooling work.",
    problem:
      "A business needed a steady stream of SEO-oriented content but didn't have the internal writing capacity to produce it consistently.",
    solution:
      "An AI-assisted content pipeline that drafts SEO-oriented articles from a topic brief, structured for a human editor to review and publish rather than publishing unreviewed AI output.",
    whatWeBuilt: [
      "A content generation pipeline connected to a topic/keyword input",
      "Structured drafts (headings, sections, meta fields) ready for editorial review",
      "A repeatable process the client's team could run without developer involvement",
    ],
    technologies: ["Generative AI APIs", "Content pipeline automation", "SEO structuring"],
    outcome:
      "Gave the client a repeatable way to produce SEO-oriented drafts at a pace their internal team couldn't match manually, with human review preserved before publishing.",
    relatedServices: ["ai-solutions"],
  },
  {
    slug: "contact-form-lead-funnels",
    name: "Contact Form Lead Funnels",
    industry: "SME Services",
    status: "delivered",
    attribution: "Built by our founding team prior to ZUNARK, for German businesses.",
    problem:
      "Inbound contact form submissions were landing in a shared inbox with no qualification or routing, so leads sat unread or got picked up inconsistently.",
    solution:
      "A structured contact-form funnel that captured, qualified and routed submissions automatically to the right person.",
    whatWeBuilt: [
      "Structured multi-step contact/enquiry forms",
      "Automated routing based on submission content",
      "Notification and follow-up triggers",
    ],
    technologies: ["Form automation", "Webhook-based routing", "Email/notification integration"],
    outcome: "Replaced an unstructured shared inbox with a consistent, trackable intake process.",
    relatedServices: ["business-automation", "web-development"],
  },
  {
    slug: "managed-wordpress-cms-architecture",
    name: "Managed WordPress CMS Architecture",
    industry: "SME Services",
    status: "delivered",
    attribution: "Built by our founding team prior to ZUNARK, for German businesses.",
    problem:
      "A business needed a content-managed website their non-technical team could update themselves, without ongoing developer involvement for routine changes.",
    solution:
      "A structured, managed WordPress build with a clear content architecture — the kind a marketing or admin team can maintain without breaking the site.",
    whatWeBuilt: [
      "A structured WordPress theme and content architecture",
      "Editable content areas scoped to what the client's team actually needed to change",
      "Managed hosting and update process",
    ],
    technologies: ["WordPress", "PHP", "Managed hosting"],
    outcome: "Gave the client's team day-to-day content control without needing a developer for routine updates.",
    relatedServices: ["web-development", "it-consulting"],
  },
  {
    slug: "generative-ai-data-pipeline",
    name: "Generative AI Data Analytics Pipeline",
    industry: "Data & Analytics",
    status: "delivered",
    attribution: "Built by our founding team prior to ZUNARK, for German businesses.",
    problem:
      "Raw analytics exports existed but turning them into a readable summary for decision-makers required manual work every reporting cycle.",
    solution:
      "A generative AI pipeline that processes raw data exports and produces a structured, readable summary automatically.",
    whatWeBuilt: [
      "A data ingestion pipeline for raw analytics exports",
      "A generative AI summarization step producing structured reports",
      "A repeatable process replacing manual report compilation",
    ],
    technologies: ["Generative AI APIs", "Python data pipelines", "Automated reporting"],
    outcome: "Removed a recurring manual reporting task and gave decision-makers a consistent summary format.",
    relatedServices: ["data-analytics", "ai-solutions"],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
