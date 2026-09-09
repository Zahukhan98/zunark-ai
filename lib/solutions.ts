export type Solution = {
  slug: string;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  problem: string;
  challenges: string[];
  approach: string;
  whatWeBuild: string[];
  exampleWorkflow: string[];
  benefits: string[];
  relatedServices: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "business-automation",
    title: "Business Automation",
    short: "Remove the manual, repetitive steps between the tools you already use.",
    seoTitle: "Business Automation Solutions | ZUNARK",
    seoDescription:
      "Connect your existing tools and remove repetitive manual work — lead intake, data entry, status updates and internal handoffs.",
    problem:
      "Growing businesses accumulate manual steps between tools — copying a new lead into a spreadsheet, updating a status in two places, sending the same follow-up message by hand. Individually small, collectively a real drag on the team's time.",
    challenges: [
      "Data re-entered manually across multiple systems",
      "Follow-ups and handoffs that depend on someone remembering to do them",
      "No single place to see what's actually happening across tools",
      "Growth makes manual processes break down faster, not slower",
    ],
    approach:
      "We map the process end to end, separate the mechanical steps from the ones that genuinely need human judgment, and automate the mechanical ones by connecting your existing tools through their APIs.",
    whatWeBuild: [
      "Lead intake and routing automation",
      "Data synchronization between systems",
      "Status and notification automation",
      "Scheduled reporting and reminders",
    ],
    exampleWorkflow: [
      "A form submission creates a record automatically",
      "The right team member is notified instantly instead of checking an inbox",
      "The record's status updates automatically as it moves through your process",
      "A summary report is generated on a schedule without manual compilation",
    ],
    benefits: [
      "Less time spent on repetitive manual work",
      "Fewer dropped handoffs and missed follow-ups",
      "More consistent process execution",
      "A clearer picture of what's happening without asking around",
    ],
    relatedServices: ["business-automation", "ai-solutions"],
  },
  {
    slug: "ai-business-solutions",
    title: "AI Business Solutions",
    short: "Practical AI tools built around a specific, repetitive task in your business.",
    seoTitle: "AI Business Solutions | ZUNARK",
    seoDescription:
      "AI content generation, document processing and data pipelines built around a specific business task — not a generic chatbot.",
    problem:
      "Many businesses know AI \"should\" help somewhere but aren't sure where to start, or have tried a generic chatbot that didn't earn its keep because it wasn't connected to their actual data or process.",
    challenges: [
      "Uncertainty about which task is actually worth automating with AI",
      "Generic AI tools that don't reflect the business's own data or terminology",
      "Concerns about AI output quality without a review step",
      "Not knowing what an AI project realistically costs or takes to build",
    ],
    approach:
      "We start with one clearly-defined, repetitive task — content drafting, document processing, lead qualification, data summarization — and build a tool around it that includes a human-review step before anything goes live.",
    whatWeBuild: [
      "AI content generation pipelines (e.g. SEO-oriented drafting)",
      "Document and form processing tools",
      "Lead qualification and routing assistants",
      "Generative AI data summarization pipelines",
    ],
    exampleWorkflow: [
      "A topic or data input is submitted to the pipeline",
      "The AI model drafts the output using your own data and guidelines",
      "A team member reviews and approves before publishing or acting on it",
      "Approved outputs feed back into your existing tools automatically",
    ],
    benefits: [
      "Faster turnaround on repetitive content or analysis tasks",
      "Consistent quality baseline, with a human still making the final call",
      "A narrow, well-scoped project rather than an open-ended \"AI initiative\"",
    ],
    relatedServices: ["ai-solutions", "business-automation"],
  },
  {
    slug: "custom-crm",
    title: "Custom CRM",
    short: "A CRM shaped around your actual sales or service process, not a generic pipeline.",
    seoTitle: "Custom CRM Development | ZUNARK",
    seoDescription:
      "When a standard CRM doesn't fit your sales or service process, we build one that does — connected to the tools you already use.",
    problem:
      "Standard CRMs assume a fairly generic sales pipeline. If your process has unusual stages, multiple service lines, or specific data you need to track that the CRM doesn't have a field for, you end up working around the tool instead of with it.",
    challenges: [
      "Sales or service stages that don't map cleanly to a generic pipeline",
      "Important business-specific data with nowhere proper to live",
      "Paying for CRM features your team never uses",
      "Needing the CRM to connect tightly to another internal system",
    ],
    approach:
      "We only recommend a custom CRM when a configured off-the-shelf option genuinely doesn't fit — and when it does, we build the exact stages, fields and views your team actually needs.",
    whatWeBuild: [
      "Custom pipeline stages matching your real sales or service process",
      "Client/customer records with the fields your business actually tracks",
      "Task and follow-up tracking tied to each record",
      "Integration with your existing email, booking or support tools",
    ],
    exampleWorkflow: [
      "A new lead or client enters the system from a form, email or manual entry",
      "The record moves through stages that reflect your real process",
      "Follow-ups and tasks are tracked against each record automatically",
      "Reporting shows exactly the metrics your team cares about",
    ],
    benefits: [
      "A tool that matches your process instead of the other way around",
      "One system instead of a CRM plus several workarounds",
      "Full ownership of the system and its data",
    ],
    relatedServices: ["custom-software"],
  },
  {
    slug: "business-dashboards",
    title: "Business Dashboards",
    short: "One clear view of the numbers that are currently scattered across tools.",
    seoTitle: "Business Dashboard Development | ZUNARK",
    seoDescription:
      "Combine data from the tools you already use into a single dashboard that shows what's actually happening in the business.",
    problem:
      "Decision-relevant data usually already exists — it's just spread across a booking tool, an accounting system, a spreadsheet and someone's inbox, with no single place to see the whole picture.",
    challenges: [
      "No single source of truth for key metrics",
      "Manual compilation of reports that takes hours every week",
      "Decisions delayed while someone tracks down a number",
      "Generic BI tools that need heavy setup to reflect your actual metrics",
    ],
    approach:
      "We identify which decisions the dashboard needs to support, trace those back to the systems holding the underlying data, and build the pipeline and visualization connecting them.",
    whatWeBuild: [
      "Dashboards pulling from multiple existing systems",
      "Automated report generation on a schedule",
      "Role-based views for different parts of the team",
      "Alerting on metrics that need attention",
    ],
    exampleWorkflow: [
      "Data is pulled automatically from your existing systems on a schedule",
      "It's structured and combined into a single data model",
      "The dashboard presents it in views built around real decisions",
      "Reports are generated automatically instead of compiled by hand",
    ],
    benefits: [
      "Decisions made from current data instead of a week-old spreadsheet",
      "Hours saved on manual report compilation",
      "A shared source of truth across the team",
    ],
    relatedServices: ["data-analytics", "ai-solutions"],
  },
  {
    slug: "healthcare-software",
    title: "Healthcare Software",
    short: "Software for clinics and care providers that fits real clinical and admin workflows.",
    seoTitle: "Healthcare Software Solutions | ZUNARK",
    seoDescription:
      "Appointment booking, patient inquiry management and admin dashboards built around how clinics and care providers actually operate.",
    problem:
      "Clinics and care providers often run on a mix of phone bookings, paper records and a website that doesn't do much beyond listing contact details — while patients increasingly expect to book and communicate online.",
    challenges: [
      "Booking and inquiries handled entirely by phone or in person",
      "Admin staff spending significant time on scheduling and data entry",
      "Patient communication that's inconsistent or delayed",
      "Sensitive data that needs to be handled carefully and compliantly",
    ],
    approach:
      "We build the specific pieces that reduce administrative load — booking, inquiry management, admin dashboards — with data handling appropriate to healthcare information, rather than a generic business template.",
    whatWeBuild: [
      "Appointment booking systems",
      "Patient inquiry and contact management",
      "Admin dashboards for staff and scheduling",
      "Practice websites with doctor/provider profiles",
    ],
    exampleWorkflow: [
      "A patient books an appointment online instead of calling",
      "Staff see and manage bookings from a single admin view",
      "Inquiries are routed and tracked instead of relying on someone's inbox",
      "Reporting shows booking patterns and admin load",
    ],
    benefits: [
      "Less phone-based administrative work",
      "A more convenient booking experience for patients",
      "Clearer visibility into scheduling and inquiries for staff",
    ],
    relatedServices: ["custom-software", "web-development"],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    short: "A practical, prioritized plan for what to build next — not a buzzword initiative.",
    seoTitle: "Digital Transformation Guidance | ZUNARK",
    seoDescription:
      "A clear, prioritized technology roadmap based on what's actually holding your business back — not a generic transformation framework.",
    problem:
      "\"Digital transformation\" often becomes a vague, expensive initiative with no clear priority order. Most businesses don't need to transform everything at once — they need to know what to fix first.",
    challenges: [
      "Multiple systems that don't talk to each other",
      "Manual processes that used to work fine but don't scale anymore",
      "Uncertainty about where technology investment would actually pay off",
      "Previous initiatives that stalled without a clear, achievable scope",
    ],
    approach:
      "We start with a short discovery process to understand the business, then produce a prioritized, realistic roadmap — usually starting with the highest-friction manual process, not the most impressive-sounding project.",
    whatWeBuild: [
      "A technology and process audit",
      "A prioritized roadmap of recommended projects",
      "The first prioritized project itself, once scoped",
      "Ongoing guidance as priorities shift",
    ],
    exampleWorkflow: [
      "We review current tools, processes and pain points with your team",
      "We identify which problems are actually worth solving with software",
      "We propose a realistic, prioritized roadmap — not a wish list",
      "We build the first project, then reassess",
    ],
    benefits: [
      "A clear, honest priority order instead of a vague initiative",
      "Investment directed at what's actually causing friction",
      "A technology partner who understands the business before proposing a build",
    ],
    relatedServices: ["custom-software", "web-development", "it-consulting"],
  },
];

export function getSolutionBySlug(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
