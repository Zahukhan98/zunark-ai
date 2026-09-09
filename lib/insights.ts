export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  category: "AI" | "Software" | "Automation" | "Business Technology" | "Web Development" | "Data & Analytics";
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  content: ContentBlock[];
  faqs?: { q: string; a: string }[];
  relatedServices: string[];
  relatedSolutions?: string[];
  relatedArticles?: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "custom-software-vs-saas-small-business",
    title: "Custom Software vs SaaS: Which Is Better for a Small Business?",
    seoTitle: "Custom Software vs SaaS for Small Business | ZUNARK",
    seoDescription:
      "A practical framework for deciding between an off-the-shelf SaaS tool and custom software for your small business.",
    excerpt:
      "Most small businesses don't need custom software — until they do. Here's how to tell which situation you're in.",
    category: "Software",
    tags: ["custom software", "SaaS", "small business"],
    author: "Mohammed Zahid Khan",
    publishedAt: "2026-01-15",
    updatedAt: "2026-01-15",
    content: [
      {
        type: "p",
        text: "If you run a small business, you've probably faced this decision more than once: subscribe to another SaaS tool, or get something built that fits exactly what you need. The honest answer is that most of the time, SaaS is the right call. But not always — and knowing the difference saves both money and frustration.",
      },
      { type: "h2", text: "Start with SaaS by default" },
      {
        type: "p",
        text: "Off-the-shelf software is cheaper to start, faster to deploy, and maintained by someone else. If a SaaS product handles 80–90% of what you need out of the box, it's almost always the better choice — at least to begin with.",
      },
      { type: "h2", text: "Signs a SaaS tool is the wrong fit" },
      {
        type: "ul",
        items: [
          "You're paying for a product but only using a small fraction of its features",
          "Your process doesn't map onto the tool's workflow, and you're bending your business around the software",
          "You need two or three tools to talk to each other, and none of them integrate cleanly",
          "The tool's pricing scales in a way that gets expensive as you grow, for functionality you don't need at scale",
          "You're storing critical business data in a tool that limits how you can export or use it",
        ],
      },
      { type: "h2", text: "When custom software actually pays off" },
      {
        type: "p",
        text: "Custom software makes sense when the process you're supporting is specific enough that no off-the-shelf tool fits it well, when you need systems to connect in a way no existing integration supports, or when the manual workaround you're currently using is costing more time than a proper build would.",
      },
      {
        type: "p",
        text: "It rarely makes sense to build custom software just because it feels more \"professional,\" or because a SaaS subscription feels like an ongoing cost you'd rather not pay. Custom software has its own ongoing cost — it just shows up as maintenance instead of a subscription fee.",
      },
      { type: "h2", text: "A simple way to decide" },
      {
        type: "ol",
        items: [
          "List what the process actually needs to do, in plain language, without reference to any specific tool",
          "Check whether an existing tool covers most of that list — try the free trial before assuming it won't fit",
          "If it mostly fits, use it and adapt the 10–20% gap manually or with light automation",
          "If it fundamentally doesn't fit — because your process is unusual, or you need deep integration between systems — that's when custom software is worth scoping properly",
        ],
      },
    ],
    faqs: [
      {
        q: "Is custom software more expensive than SaaS?",
        a: "Usually yes, upfront. A SaaS subscription might cost a small monthly fee; custom software has a real development cost. Over several years, the comparison depends on how many SaaS subscriptions you'd otherwise need and how much time the workarounds cost you.",
      },
      {
        q: "Can I start with SaaS and move to custom software later?",
        a: "Yes, and this is usually the right sequence. Start with an off-the-shelf tool, learn exactly where it doesn't fit your process, and use that specific gap to scope a focused custom build later.",
      },
    ],
    relatedServices: ["custom-software"],
    relatedSolutions: ["custom-crm", "digital-transformation"],
    relatedArticles: ["crm-vs-custom-business-software", "when-should-a-business-build-custom-software"],
  },
  {
    slug: "ai-automation-reduce-repetitive-business-work",
    title: "How Can AI Automation Reduce Repetitive Business Work?",
    seoTitle: "How AI Automation Reduces Repetitive Business Work | ZUNARK",
    seoDescription:
      "Practical examples of how AI and automation remove repetitive manual work from small and medium business operations.",
    excerpt:
      "AI automation works best on a narrow, well-defined task — not as a vague company-wide initiative. Here's what that looks like in practice.",
    category: "AI",
    tags: ["AI", "automation", "productivity"],
    author: "Mohammed Zahid Khan",
    publishedAt: "2026-01-22",
    updatedAt: "2026-01-22",
    content: [
      {
        type: "p",
        text: "\"We should use AI somewhere\" is a common instinct, but it's the wrong starting point. The businesses that get real value from AI automation start with a specific, repetitive task and work backward to the tool — not the other way around.",
      },
      { type: "h2", text: "The tasks AI automation is actually good at" },
      {
        type: "ul",
        items: [
          "Drafting first versions of repetitive content (emails, descriptions, reports) for a human to review and finalize",
          "Reading and categorizing incoming documents or forms",
          "Summarizing long or repetitive data into a short, structured report",
          "Qualifying and routing inbound leads or enquiries based on their content",
          "Answering common, well-defined questions from a fixed knowledge base",
        ],
      },
      { type: "h2", text: "Where it doesn't work well" },
      {
        type: "p",
        text: "AI automation struggles with tasks that require genuine judgment, tasks with no clear right answer, or tasks where a mistake is costly and hard to catch. A fully autonomous AI handling client communication with no review step is a common way automation projects go wrong — not because the AI is incapable, but because nobody built in a check.",
      },
      { type: "h2", text: "A practical starting process" },
      {
        type: "ol",
        items: [
          "Pick one specific, repetitive task — not a whole department's workflow",
          "Write down exactly what a human does today, step by step",
          "Identify which steps are mechanical (data lookup, drafting, sorting) versus judgment-based",
          "Automate the mechanical steps with a human review step at the point where judgment matters",
          "Measure the actual time saved before expanding to the next task",
        ],
      },
      {
        type: "p",
        text: "This is the same approach we use with clients: start narrow, prove it works on one real task, then decide whether it's worth expanding.",
      },
    ],
    faqs: [
      {
        q: "How to automate a small business workflow?",
        a: "Start by mapping one specific process end to end, separate the mechanical steps from the judgment-based ones, and automate the mechanical steps first — usually by connecting the tools you already use rather than replacing them.",
      },
      {
        q: "How much does an AI business solution cost?",
        a: "It depends on scope. A single automated task (like a content draft pipeline or a lead-routing workflow) is a modest, well-defined project. A multi-system data pipeline is larger. We scope this honestly per project rather than quoting a blanket number.",
      },
    ],
    relatedServices: ["ai-solutions", "business-automation"],
    relatedSolutions: ["ai-business-solutions", "business-automation"],
    relatedArticles: ["ai-automation-for-small-businesses-use-cases"],
  },
  {
    slug: "website-vs-web-application",
    title: "Website vs Web Application: What's the Difference?",
    seoTitle: "Website vs Web Application: What's the Difference? | ZUNARK",
    seoDescription:
      "A clear explanation of the difference between a website and a web application, and how to know which one your project actually needs.",
    excerpt: "\"Website\" and \"web app\" get used interchangeably, but they solve different problems and cost differently to build.",
    category: "Web Development",
    tags: ["web development", "web application"],
    author: "Mohammed Zahid Khan",
    publishedAt: "2026-01-29",
    updatedAt: "2026-01-29",
    content: [
      {
        type: "p",
        text: "People often ask for a \"website\" when what they actually need is a web application, or vice versa. The distinction matters because it changes the cost, timeline and technical approach significantly.",
      },
      { type: "h2", text: "What a website is" },
      {
        type: "p",
        text: "A website is primarily informational: it presents content — services, contact details, pricing, a blog — to a visitor. Most visitors don't log in, and the site's job is to explain and convert, not to manage ongoing user data or complex interactions.",
      },
      { type: "h2", text: "What a web application is" },
      {
        type: "p",
        text: "A web application lets users do something interactive and stateful — book an appointment, manage an account, view a personalized dashboard, process a transaction. It typically involves user accounts, a database, and business logic beyond just displaying content.",
      },
      { type: "h2", text: "Quick ways to tell which you need" },
      {
        type: "ul",
        items: [
          "If visitors mostly read content and contact you — that's a website",
          "If visitors need to log in, save data, or perform an action that changes based on who they are — that's a web application",
          "If you need e-commerce with accounts, order history and personalized recommendations — that leans web application",
          "A simple online store with a standard cart and checkout can often be built on solid website infrastructure without needing full custom application complexity",
        ],
      },
      { type: "h2", text: "Why the distinction affects cost and timeline" },
      {
        type: "p",
        text: "A website's cost is driven mainly by design and content structure. A web application's cost is driven by the complexity of its logic, data model and integrations — which is why two projects that both sound like \"a website\" can have very different price tags once one of them turns out to need user accounts and custom logic.",
      },
    ],
    relatedServices: ["web-development", "custom-software"],
    relatedArticles: ["how-to-build-a-business-dashboard"],
  },
  {
    slug: "crm-vs-custom-business-software",
    title: "CRM vs Custom Business Software: How to Choose",
    seoTitle: "CRM vs Custom Business Software | ZUNARK",
    seoDescription: "How to decide between a standard CRM and custom-built business software for managing clients and sales.",
    excerpt: "A CRM is built for a generic sales pipeline. Sometimes that's exactly what you need — and sometimes it isn't.",
    category: "Software",
    tags: ["CRM", "custom software"],
    author: "Mohammed Zahid Khan",
    publishedAt: "2026-02-05",
    updatedAt: "2026-02-05",
    content: [
      {
        type: "p",
        text: "A CRM (customer relationship management tool) is designed around a fairly standard sales or client-management pipeline: leads, contacts, deals, follow-ups. For a lot of businesses, that maps well onto reality. For others, it doesn't.",
      },
      { type: "h2", text: "When a standard CRM works well" },
      {
        type: "ul",
        items: [
          "Your sales process follows a fairly standard pipeline (lead → qualified → proposal → won/lost)",
          "You mainly need contact management, deal tracking and follow-up reminders",
          "You don't need deep, specific integration with an unusual internal system",
        ],
      },
      { type: "h2", text: "When it starts to break down" },
      {
        type: "ul",
        items: [
          "Your process has multiple distinct pipelines that don't fit one generic model (e.g. sales plus service delivery plus renewals, each with different stages)",
          "You need to track business-specific data the CRM has no proper field for, so it ends up in a custom field or a separate spreadsheet anyway",
          "You need the CRM to connect tightly with a specific internal tool or database in a way the CRM's integrations don't support",
        ],
      },
      { type: "h2", text: "A practical middle ground" },
      {
        type: "p",
        text: "Many businesses that think they need custom software actually just need a well-configured CRM with the right custom fields and automation rules set up properly. We usually recommend starting there, and only building a custom system when the configuration genuinely can't stretch far enough.",
      },
    ],
    faqs: [
      {
        q: "How much does it cost to build a CRM for a small business?",
        a: "A configured off-the-shelf CRM is usually a fraction of the cost of a fully custom one. A custom CRM's cost depends on how many pipelines, fields, and integrations it needs — we scope this per project rather than quoting blind.",
      },
    ],
    relatedServices: ["custom-software"],
    relatedSolutions: ["custom-crm"],
    relatedArticles: ["custom-software-vs-saas-small-business"],
  },
  {
    slug: "how-to-build-a-business-dashboard",
    title: "How to Build a Business Dashboard That People Actually Use",
    seoTitle: "How to Build a Business Dashboard | ZUNARK",
    seoDescription: "A practical approach to building a business dashboard that reflects real decisions, not just available data.",
    excerpt: "The most common dashboard mistake is starting from the data you have instead of the decisions you need to make.",
    category: "Data & Analytics",
    tags: ["dashboards", "data analytics", "business intelligence"],
    author: "Mohammed Zahid Khan",
    publishedAt: "2026-02-12",
    updatedAt: "2026-02-12",
    content: [
      {
        type: "p",
        text: "It's tempting to build a dashboard by asking \"what data do we have?\" and putting all of it on a screen. The dashboards that actually get used every week are built the opposite way.",
      },
      { type: "h2", text: "Start with the decision, not the data" },
      {
        type: "p",
        text: "Before building anything, ask: what decision does this dashboard need to support, and who's making it? A dashboard for a founder tracking overall business health looks very different from one an operations lead uses to manage daily scheduling.",
      },
      { type: "h2", text: "Steps to build one properly" },
      {
        type: "ol",
        items: [
          "List the two or three decisions the dashboard needs to inform",
          "Identify which systems currently hold the data needed for those decisions",
          "Build the pipeline connecting those systems into one consistent data model",
          "Design the view around the decision, not around every available metric",
          "Automate the refresh so it's never showing stale numbers by the time someone looks at it",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Too many metrics on one screen, so nothing stands out",
          "Manually updated data that goes stale within a week",
          "Numbers that look impressive but don't map to an actual decision anyone makes",
        ],
      },
    ],
    relatedServices: ["data-analytics"],
    relatedSolutions: ["business-dashboards"],
    relatedArticles: ["ai-automation-reduce-repetitive-business-work"],
  },
];

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Article["category"]) {
  return ARTICLES.filter((a) => a.category === category);
}
