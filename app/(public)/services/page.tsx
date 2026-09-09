import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SERVICE_ICONS, CheckIcon, ArrowRightIcon } from "@/components/public/icons";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { DeviceMockup, AbstractPanel } from "@/components/public/DeviceMockup";
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
      <div className="mb-16 max-w-2xl">
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

      <div className="flex flex-col gap-16">
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[service.icon];
          const reversed = index % 2 === 1;
          return (
            <div
              key={service.slug}
              className="grid grid-cols-1 items-center gap-10 rounded-3xl border p-6 md:p-10 lg:grid-cols-2 lg:gap-14"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
            >
              <div className={reversed ? "lg:order-2" : ""}>
                {service.previewImage ? (
                  <DeviceMockup
                    src={service.previewImage}
                    alt={`${service.navTitle} preview`}
                    label={`zunark-ai.com`}
                  />
                ) : (
                  <AbstractPanel icon={Icon} />
                )}
              </div>

              <div className={reversed ? "lg:order-1" : ""}>
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px]"
                  style={{ background: "var(--zk-panel)", color: "var(--zk-accent1)" }}
                >
                  <Icon />
                </div>
                <h2 className="mb-3 text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-display-fam)" }}>
                  {service.navTitle}
                </h2>
                <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                  {service.short}
                </p>

                <ul className="mb-8 flex flex-col gap-3">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: "var(--zk-panel)", color: "var(--zk-accent1)" }}
                      >
                        <CheckIcon />
                      </span>
                      <span style={{ color: "var(--zk-fg)" }}>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
                  >
                    {service.ctaLabel}
                    <ArrowRightIcon />
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="zk-link text-sm font-medium underline"
                    style={{ color: "var(--zk-accent1)" }}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16">
        <CTASection
          heading="Not sure what you need?"
          supporting="Tell us about the problem — we'll help you figure out the right service."
        />
      </div>
    </div>
  );
}
