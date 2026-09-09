import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SERVICE_ICONS } from "@/components/public/icons";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services | ZUNARK",
  description:
    "Web development, custom software, AI solutions, data & analytics, business automation and ongoing maintenance — built around how your business actually works.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      <div className="mb-14 max-w-2xl">
        <div
          className="mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          Services
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          We turn business problems into digital systems
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          We start by understanding the business problem, then build the specific
          websites, software, AI tools or automation that solve it — not a generic
          package of services.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="zk-link group rounded-2xl border p-8 transition-colors"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
            >
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px]"
                style={{ background: "var(--zk-panel)", color: "var(--zk-accent1)" }}
              >
                <Icon />
              </div>
              <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
                {service.navTitle}
              </h2>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                {service.short}
              </p>
              <span className="text-sm font-medium underline" style={{ color: "var(--zk-accent1)" }}>
                Learn more →
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-14">
        <CTASection
          heading="Not sure what you need?"
          supporting="Tell us about the problem — we'll help you figure out the right service."
        />
      </div>
    </div>
  );
}
