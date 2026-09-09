export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  icon: "web" | "software" | "ai" | "data" | "automation" | "maintenance";
  navTitle: string;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  problem: string;
  whatWeBuild: string[];
  useCases: string[];
  whyCustom: string;
  technologies: string[];
  faqs: FAQ[];
  relatedSolutions: string[];
  relatedIndustries: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    icon: "web",
    navTitle: "Web Development",
    title: "Web Development",
    short: "Corporate sites, landing pages and e-commerce built to convert and last.",
    seoTitle: "Web Development Services | ZUNARK",
    seoDescription:
      "Custom websites, landing pages and e-commerce builds designed around how your business actually sells and operates — not a generic template.",
    intro:
      "Your website is usually the first place a prospective client checks before they call you. If it's slow, outdated, or doesn't explain what you do clearly, that's lost business before a conversation even starts.",
    problem:
      "Most businesses either outgrow a template site or inherit one built years ago by someone who's no longer around to maintain it. Content is hard to update, the design doesn't reflect the business anymore, and nobody's sure what's actually editable.",
    whatWeBuild: [
      "Corporate and business websites with clear service and contact structure",
      "Landing pages built around a single conversion goal",
      "Portfolio and service-based business websites",
      "E-commerce storefronts with product, cart and checkout flows",
      "Custom web experiences that don't fit a standard template",
    ],
    useCases: [
      "A consultancy that needs a credible site explaining services and getting inquiries",
      "A retail business moving from Instagram-only sales to a proper online store",
      "A company replacing an old WordPress site that's become slow and hard to edit",
      "A product launch that needs a dedicated landing page with tracking",
    ],
    whyCustom:
      "A page builder or theme can get a site online fast, but it usually means fighting the template's limitations later — slow load times from unused plugins, awkward layouts for your actual content, and no real ownership of the codebase. We build with a clear content structure so you (or we) can update it without breaking things.",
    technologies: ["Next.js / React", "TypeScript", "Tailwind CSS", "Headless CMS options", "WordPress (managed builds)"],
    faqs: [
      {
        q: "Do you build on WordPress or a custom stack?",
        a: "Both, depending on the project. If you need a content team editing pages daily without developer involvement, a well-structured WordPress or headless CMS build often makes sense. If performance, custom functionality or long-term ownership of the codebase matters more, we build custom with Next.js.",
      },
      {
        q: "How long does a website project take?",
        a: "A focused landing page can be ready in 1–2 weeks. A full corporate site with several pages typically takes 4–6 weeks depending on content readiness and how much custom functionality is involved.",
      },
      {
        q: "Will I be able to update content myself afterward?",
        a: "Yes — we structure the site with an editable content layer (a CMS or a simple content file) appropriate to your team's technical comfort, and document how to use it.",
      },
    ],
    relatedSolutions: ["digital-transformation"],
    relatedIndustries: ["small-business", "professional-services"],
  },
  {
    slug: "custom-software",
    icon: "software",
    navTitle: "Custom Software",
    title: "Custom Software",
    short: "Dashboards, portals and business systems shaped around your workflow.",
    seoTitle: "Custom Software Development | ZUNARK",
    seoDescription:
      "Off-the-shelf software doesn't always fit how your business runs. We design custom dashboards, portals and internal systems around your actual workflow.",
    intro:
      "Off-the-shelf software doesn't always fit the way your business operates. We design custom dashboards, portals and internal systems around your actual workflow, not the workflow a generic SaaS product assumes you have.",
    problem:
      "Spreadsheets held together with formulas, three different tools that don't talk to each other, and a SaaS product you're paying for but only using 20% of — this is how most growing businesses end up managing operations, and it gets more expensive (in time, not just money) every year.",
    whatWeBuild: [
      "Internal business management systems and admin dashboards",
      "Customer and client portals",
      "Booking, scheduling and workflow systems",
      "CRM-style platforms shaped around your actual sales process",
      "Custom web applications that connect to your existing tools",
    ],
    useCases: [
      "Replacing a spreadsheet-based tracking process with a real database and dashboard",
      "A client portal so customers can check project or order status themselves",
      "An internal tool that connects two systems that currently require manual data entry between them",
      "A booking system tailored to a specific business's scheduling rules",
    ],
    whyCustom:
      "A generic SaaS tool is built for the average customer, not your specific process — you end up adapting your business to the software instead of the other way around. Custom software costs more upfront than a subscription, but it fits exactly, and you own it rather than renting access to a workflow someone else designed.",
    technologies: ["Next.js / React", "Node.js", "PostgreSQL / MySQL", "Prisma", "REST & webhook integrations"],
    faqs: [
      {
        q: "Is custom software worth it for a small business?",
        a: "It depends on the problem. If an off-the-shelf tool already fits your process well, use it — that's usually cheaper. Custom software makes sense when you're paying for a workaround, when the process is specific enough that no SaaS product fits it, or when you need systems to talk to each other in a way no existing product supports.",
      },
      {
        q: "Do you build a CRM from scratch?",
        a: "Yes, when a standard CRM doesn't fit the sales or service process closely enough. We also frequently recommend a configured off-the-shelf CRM instead, when that's genuinely the better fit — we'll tell you honestly which makes sense for your case.",
      },
      {
        q: "What does ongoing maintenance look like after launch?",
        a: "We offer a maintenance arrangement for anything we build — bug fixes, small feature additions and keeping dependencies up to date. See our Maintenance & Support service for details.",
      },
    ],
    relatedSolutions: ["custom-crm", "business-dashboards", "digital-transformation"],
    relatedIndustries: ["healthcare", "professional-services", "manufacturing"],
  },
  {
    slug: "ai-solutions",
    icon: "ai",
    navTitle: "AI Solutions",
    title: "AI Solutions",
    short: "AI assistants and automation that plug into how your team works.",
    seoTitle: "AI Solutions for Businesses | ZUNARK",
    seoDescription:
      "Practical AI tools — content generation, document processing and data pipelines — built to fit into your existing workflow, not bolted on as a gimmick.",
    intro:
      "Most businesses don't need \"AI\" as a headline feature — they need a specific repetitive task handled faster and more consistently. We build AI tools around that specific task.",
    problem:
      "Content that needs to be written every week, documents that need to be read and categorized by hand, or reports that take a person a day to compile from raw data — these are exactly the kind of tasks modern AI models are well-suited to handle, but only when the tool is built around your actual data and process, not a generic chatbot wrapper.",
    whatWeBuild: [
      "AI-assisted content generation tools (e.g. SEO-oriented content pipelines)",
      "AI-powered document and form processing",
      "Generative AI data pipelines that turn raw data into structured reports",
      "AI assistants embedded into an existing website or internal tool",
      "Custom AI workflows connecting a model to your own data sources",
    ],
    useCases: [
      "A content pipeline that drafts SEO-oriented articles from a topic brief for human review before publishing",
      "A contact-form funnel that qualifies and routes incoming leads automatically",
      "A data pipeline that uses generative AI to turn raw analytics exports into a readable summary",
      "Document processing that extracts structured data from unstructured PDFs or forms",
    ],
    whyCustom:
      "A generic AI chatbot bolted onto a website rarely earns its keep. The AI tools worth building are narrow and specific — connected to your real data, reviewed by a human where it matters, and measured against the actual task they replace. That's the standard we build to.",
    technologies: ["Anthropic Claude API", "OpenAI API", "Python / Node.js pipelines", "Vector search & retrieval", "Workflow automation"],
    faqs: [
      {
        q: "Will AI replace our team?",
        a: "No — and we wouldn't build it that way. AI accelerates specific, well-defined tasks (drafting, sorting, summarizing). Judgment calls, client relationships, and quality control stay with your team. Every AI-assisted output we build includes a human-review step before anything goes live.",
      },
      {
        q: "How much does an AI business solution cost?",
        a: "It depends heavily on scope — a single automated content workflow is a much smaller project than a custom data pipeline with multiple integrations. We scope this honestly during the discovery call rather than quoting a number blind.",
      },
      {
        q: "Do you use our own data to train a model?",
        a: "We typically don't fine-tune models — we use retrieval and prompt engineering against your existing data, which is faster to build, cheaper to run, and easier to update than a fine-tuned model.",
      },
    ],
    relatedSolutions: ["ai-business-solutions", "business-automation"],
    relatedIndustries: ["professional-services", "small-business"],
  },
  {
    slug: "data-analytics",
    icon: "data",
    navTitle: "Data & Analytics",
    title: "Data & Analytics",
    short: "Dashboards and reporting that turn raw data into decisions.",
    seoTitle: "Business Dashboards & Data Analytics | ZUNARK",
    seoDescription:
      "Turn scattered spreadsheets and disconnected tools into a single dashboard that shows what's actually happening in your business.",
    intro:
      "If a decision-maker in your business has to ask someone else to pull a number before making a call, that's a data problem software can usually solve.",
    problem:
      "Data usually isn't missing — it's scattered across spreadsheets, a booking tool, an accounting system and someone's inbox, with nobody able to see the whole picture in one place without manual work.",
    whatWeBuild: [
      "Business dashboards pulling from multiple existing data sources",
      "Automated reporting that replaces manual spreadsheet compilation",
      "Data visualization for operational and financial metrics",
      "Business intelligence tools tailored to how your team actually reviews performance",
    ],
    useCases: [
      "A single dashboard combining sales, bookings and cost data that currently live in three tools",
      "A weekly report that used to take a person half a day, generated automatically",
      "A visual breakdown of where revenue and costs are actually concentrated",
    ],
    whyCustom:
      "Generic BI tools are powerful but often need real setup to reflect your specific metrics and data sources correctly. We build the connections and the visualizations around the numbers that actually matter to your business, not a generic template dashboard.",
    technologies: ["PostgreSQL / MySQL", "Custom dashboard builds (React)", "API integrations", "Scheduled data pipelines"],
    faqs: [
      {
        q: "How do you build a business dashboard?",
        a: "We start by identifying which decisions the dashboard needs to support and which systems hold the underlying data, then build the pipeline connecting those sources to a single, clear view — rather than starting from a template and working backward.",
      },
      {
        q: "Do we need a data engineer on our team already?",
        a: "No. Part of what we build is the pipeline that moves and structures the data — you don't need in-house data engineering to get a working dashboard.",
      },
    ],
    relatedSolutions: ["business-dashboards", "ai-business-solutions"],
    relatedIndustries: ["manufacturing", "professional-services"],
  },
  {
    slug: "business-automation",
    icon: "automation",
    navTitle: "Business Automation",
    title: "Business Automation",
    short: "Workflow automation and integrations that remove repetitive work.",
    seoTitle: "Business Automation Solutions | ZUNARK",
    seoDescription:
      "Automate the repetitive, manual steps between the tools you already use — from lead intake to internal handoffs.",
    intro:
      "Repetitive manual work between systems — copying data from one tool to another, sending the same follow-up email, updating a status by hand — is exactly what automation is for.",
    problem:
      "Every manual handoff between tools is a place where things get delayed, forgotten or entered incorrectly. It's rarely one big problem — it's ten small ones adding up across a week.",
    whatWeBuild: [
      "Workflow automation connecting your existing tools",
      "API integrations between systems that don't natively talk to each other",
      "Data synchronization to keep records consistent across platforms",
      "Automation for repetitive, rule-based tasks",
      "Internal productivity tools for specific recurring processes",
    ],
    useCases: [
      "A new lead automatically creates a record, sends a notification, and gets added to a follow-up sequence",
      "Data syncing between an e-commerce store and accounting software",
      "Automatic status updates when a project moves between stages",
      "A contact-form funnel that routes and qualifies enquiries before a human sees them",
    ],
    whyCustom:
      "Off-the-shelf automation tools (like generic no-code platforms) work well for simple cases, but hit limits fast with anything conditional or business-specific. We build automations that handle your actual edge cases, not just the happy path.",
    technologies: ["Node.js", "Webhooks & REST APIs", "Scheduled jobs", "No-code tools where genuinely sufficient"],
    faqs: [
      {
        q: "How do I automate a small business workflow?",
        a: "Start by mapping the manual steps in the process end to end, then identify which steps are purely mechanical (copying data, sending a standard message) versus which require judgment. The mechanical steps are usually automatable; we handle the mapping as part of scoping the project.",
      },
      {
        q: "Can you automate our existing tools without replacing them?",
        a: "Yes — most of our automation work connects existing tools via their APIs rather than replacing them. Replacing a tool is only worth it when the tool itself is the actual limitation.",
      },
    ],
    relatedSolutions: ["business-automation", "ai-business-solutions"],
    relatedIndustries: ["healthcare", "small-business", "manufacturing"],
  },
  {
    slug: "it-consulting",
    icon: "maintenance",
    navTitle: "Maintenance & Support",
    title: "Maintenance & Support",
    short: "Ongoing maintenance and digital transformation guidance after launch.",
    seoTitle: "Website & Software Maintenance | ZUNARK",
    seoDescription:
      "Ongoing maintenance, updates and technical support for the websites and software we build — and guidance on what to prioritize next.",
    intro:
      "A website or system that launches well and is then left unmaintained tends to degrade quietly — outdated dependencies, unpatched issues, content nobody's keeping current. We keep what we build running properly after launch.",
    problem:
      "Once a project ships, someone still needs to apply updates, fix the occasional bug, and make small adjustments as the business changes. Without a plan for that, maintenance either doesn't happen or falls on whoever's least busy that week.",
    whatWeBuild: [
      "Ongoing website maintenance (updates, fixes, content changes)",
      "Software maintenance for systems we've built",
      "Digital transformation guidance — what to prioritize next, based on what's actually holding the business back",
      "Ongoing technical support for existing ZUNARK projects",
    ],
    useCases: [
      "Monthly maintenance covering security updates and small content or feature changes",
      "A retainer arrangement for a growing internal tool that needs regular small improvements",
      "A technical audit and roadmap for a business unsure what to build next",
    ],
    whyCustom:
      "We scope maintenance to what a project actually needs — we're not selling a generic broad \"IT services\" package covering hardware, networks or general office IT support. This is specifically about keeping the websites and software we build (or take over) working well over time.",
    technologies: ["Dependency & security updates", "Uptime monitoring", "Incremental feature delivery"],
    faqs: [
      {
        q: "Do you handle general IT support, like office networks or hardware?",
        a: "No — our maintenance is scoped to the websites and software we build (or take over maintaining), not general office IT support.",
      },
      {
        q: "Can you take over maintenance of a site you didn't build?",
        a: "Often, yes — we review the existing codebase first to confirm it's something we can maintain responsibly before taking it on.",
      },
    ],
    relatedSolutions: ["digital-transformation"],
    relatedIndustries: ["small-business", "professional-services"],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
