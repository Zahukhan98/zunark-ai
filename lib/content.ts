export const SERVICES = [
  {
    slug: "web-development",
    icon: "web" as const,
    title: "Web Development",
    short: "Corporate sites, landing pages and e-commerce built to convert and last.",
    items: [
      "Corporate and business websites",
      "Landing pages",
      "Portfolio and service websites",
      "E-commerce",
      "Custom web experiences",
    ],
  },
  {
    slug: "custom-software",
    icon: "software" as const,
    title: "Custom Software",
    short: "Dashboards, portals and business systems shaped around your workflow.",
    items: [
      "Business management systems",
      "Internal dashboards",
      "Customer portals",
      "Booking and workflow systems",
      "Custom web applications",
    ],
  },
  {
    slug: "ai-solutions",
    icon: "ai" as const,
    title: "AI Solutions",
    short: "AI assistants and automation that plug into how your team works.",
    items: [
      "AI assistants and chat tools",
      "AI-powered business tools",
      "AI document processing",
      "AI analytics and automation",
      "Custom AI workflows and integrations",
    ],
  },
  {
    slug: "data-analytics",
    icon: "data" as const,
    title: "Data & Analytics",
    short: "Dashboards and reporting that turn raw data into decisions.",
    items: [
      "Business dashboards",
      "Reporting systems",
      "Data visualization",
      "Automated reports",
      "Business intelligence tools",
    ],
  },
  {
    slug: "automation",
    icon: "automation" as const,
    title: "Automation",
    short: "Workflow automation and integrations that remove repetitive work.",
    items: [
      "Workflow automation",
      "API integrations",
      "Data synchronization",
      "Repetitive-task automation",
      "Internal productivity tools",
    ],
  },
  {
    slug: "it-consulting-maintenance",
    icon: "maintenance" as const,
    title: "IT Consulting & Maintenance",
    short: "Ongoing maintenance and digital transformation guidance after launch.",
    items: [
      "Website maintenance",
      "Software maintenance",
      "Digital transformation guidance",
      "Ongoing technical support",
    ],
  },
];

export const FOUNDERS = [
  {
    slug: "mohammed-zahid-khan",
    name: "Mohammed Zahid Khan",
    role: "Founder & CEO",
    initials: "ZK",
    photos: ["/founders/zahid.jpg", "/founders/founders-group.jpg"] as string[],
    bio: "Mohammed Zahid Khan is responsible for the overall vision, technology direction, product strategy and growth of zunark-ai. He has hands-on experience working on websites, AI tools and software-related projects while working with an international German technology company.",
    focus: ["Technology", "Product Vision", "AI", "Software Development", "Architecture"],
  },
  {
    slug: "mohammed-kamar",
    name: "Mohammed Kamar",
    role: "Co-Founder & Managing Director",
    initials: "MK",
    photos: ["/founders/kamar.jpg", "/founders/founders-group.jpg"] as string[],
    bio: "Mohammed Kamar is responsible for management, business operations, client relationships, administration and overall business execution at zunark-ai.",
    focus: ["Business Operations", "Management", "Client Relationships", "Business Development"],
  },
];

export const CONTACT_PHONE: string | null = "+91 79935 76880";
export const CONTACT_EMAIL = "info@zunark-ai.com";

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, objectives and requirements.",
  },
  {
    number: "02",
    title: "Define",
    description: "Convert business requirements into a structured product specification.",
  },
  {
    number: "03",
    title: "Design",
    description: "Design the user experience, interface and technical architecture.",
  },
  {
    number: "04",
    title: "Build",
    description: "Develop the solution using modern engineering and AI-assisted development.",
  },
  {
    number: "05",
    title: "Test",
    description: "Test functionality, security, performance and usability.",
  },
  {
    number: "06",
    title: "Deploy",
    description: "Prepare infrastructure, domain, hosting and production deployment.",
  },
  {
    number: "07",
    title: "Support",
    description: "Maintain, improve and expand the product after launch.",
  },
];
