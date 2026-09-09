import Link from "next/link";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/public/icons";
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/content";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/work", label: "Work" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/web-development", label: "Web Development" },
      { href: "/services/custom-software", label: "Custom Software" },
      { href: "/services/ai-solutions", label: "AI Solutions" },
      { href: "/services/data-analytics", label: "Data & Analytics" },
      { href: "/services/business-automation", label: "Business Automation" },
      { href: "/services/it-consulting", label: "Maintenance & Support" },
    ],
  },
  {
    title: "Solutions & Industries",
    links: [
      { href: "/solutions", label: "All Solutions" },
      { href: "/industries", label: "All Industries" },
      { href: "/industries/healthcare", label: "Healthcare" },
      { href: "/industries/small-business", label: "Small Business" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t px-6 pt-14 md:px-16" style={{ borderColor: "var(--zk-border)" }}>
      <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="mb-3 text-lg font-semibold tracking-tight" style={{ fontFamily: "var(--font-display-fam)" }}>
            zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            We turn business problems into digital systems — websites, custom
            software, AI and automation built around how your business actually
            works.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="zk-link text-sm" style={{ color: "var(--zk-fg-muted)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col items-start gap-3 border-t py-6 text-xs md:flex-row md:items-center md:justify-between"
        style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© {new Date().getFullYear()} zunark-ai</span>
          <Link href="/privacy" className="zk-link">Privacy Policy</Link>
          <Link href="/terms" className="zk-link">Terms</Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="zk-link flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-fg)" }}
          >
            <WhatsAppIcon />
            {WHATSAPP_DISPLAY}
          </a>
          {CONTACT_PHONE && (
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
              className="zk-link flex items-center gap-2"
              style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-fg)" }}
            >
              <PhoneIcon />
              {CONTACT_PHONE}
            </a>
          )}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="zk-link flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-fg)" }}
          >
            <MailIcon />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
