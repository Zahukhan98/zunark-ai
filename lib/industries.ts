export type Industry = {
  slug: string;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  problems: string[];
  opportunities: string[];
  exampleWorkflow: string[];
  relatedServices: string[];
  relatedSolutions: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    title: "Healthcare & Clinics",
    short: "Booking, patient communication and admin systems built for clinical workflows.",
    seoTitle: "Technology Solutions for Healthcare & Clinics | ZUNARK",
    seoDescription:
      "Appointment booking, patient inquiry management and admin dashboards for clinics and care providers.",
    problems: [
      "Bookings and inquiries handled almost entirely by phone",
      "Administrative staff spending significant time on scheduling",
      "Patient communication that's inconsistent or slow",
      "A website that lists information but doesn't reduce admin workload",
    ],
    opportunities: [
      "Online appointment booking to reduce phone volume",
      "A structured inquiry system so nothing gets missed in an inbox",
      "An admin dashboard giving staff one place to manage scheduling",
      "A clearer, more informative practice website",
    ],
    exampleWorkflow: [
      "A prospective patient finds the clinic's website and books directly online",
      "Staff manage all bookings and inquiries from a single dashboard",
      "Automated confirmations and reminders reduce no-shows",
      "Admin time shifts from data entry to actual patient care coordination",
    ],
    relatedServices: ["custom-software", "web-development", "business-automation"],
    relatedSolutions: ["healthcare-software", "business-dashboards"],
  },
  {
    slug: "small-business",
    title: "Small Business",
    short: "Practical websites and systems sized to an actual small-business budget and team.",
    seoTitle: "Technology Solutions for Small Businesses | ZUNARK",
    seoDescription:
      "Websites, booking systems and automation scoped realistically for a small business — no unnecessary complexity or cost.",
    problems: [
      "An outdated or template website that doesn't reflect the business today",
      "Manual admin work that takes time away from actually running the business",
      "Paying for software features that are never used",
      "Not knowing what technology investment would actually be worth it",
    ],
    opportunities: [
      "A website that's fast, current, and easy for the owner to update",
      "Automation for the specific repetitive tasks eating into the week",
      "A right-sized system instead of an enterprise tool with unused features",
      "Honest guidance on what's actually worth building first",
    ],
    exampleWorkflow: [
      "We identify the one or two processes causing the most friction",
      "We scope a focused project sized to the business's actual budget",
      "The business sees a concrete result before considering anything larger",
    ],
    relatedServices: ["web-development", "business-automation", "it-consulting"],
    relatedSolutions: ["business-automation", "digital-transformation"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    short: "Dashboards and internal systems for production, inventory and reporting visibility.",
    seoTitle: "Technology Solutions for Manufacturing | ZUNARK",
    seoDescription:
      "Internal dashboards and data systems giving manufacturing businesses visibility into production, inventory and reporting.",
    problems: [
      "Production, inventory and order data spread across disconnected tools",
      "Reporting that's manually compiled and outdated by the time it's reviewed",
      "Internal systems that don't reflect how the shop floor or supply chain actually works",
    ],
    opportunities: [
      "A dashboard combining production, inventory and order data",
      "Automated reporting instead of manual spreadsheet compilation",
      "Custom internal tools matching real operational processes",
    ],
    exampleWorkflow: [
      "Data from existing systems (inventory, orders, production logs) is connected automatically",
      "A dashboard presents current status without manual compilation",
      "Reports that used to take hours are generated on a schedule",
    ],
    relatedServices: ["data-analytics", "custom-software", "business-automation"],
    relatedSolutions: ["business-dashboards", "business-automation"],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    short: "Client portals, dashboards and automation for consultancies, agencies and advisory firms.",
    seoTitle: "Technology Solutions for Professional Services | ZUNARK",
    seoDescription:
      "Client portals, reporting dashboards and workflow automation for consultancies, agencies and advisory firms.",
    problems: [
      "Client communication and document exchange scattered across email",
      "Manual, repetitive reporting for clients or internal review",
      "No easy way for clients to check status without asking directly",
    ],
    opportunities: [
      "A client portal for status updates and document exchange",
      "Automated reporting for recurring client or internal reviews",
      "Workflow automation for repetitive account or case management tasks",
    ],
    exampleWorkflow: [
      "A client logs into a portal to check project or case status directly",
      "Recurring reports are generated automatically instead of compiled by hand",
      "Internal handoffs between team members are tracked automatically",
    ],
    relatedServices: ["custom-software", "ai-solutions", "data-analytics"],
    relatedSolutions: ["custom-crm", "business-dashboards", "ai-business-solutions"],
  },
];

export function getIndustryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
