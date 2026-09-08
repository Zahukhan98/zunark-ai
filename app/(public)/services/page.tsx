import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { SERVICE_ICONS } from "@/components/public/icons";

export const metadata: Metadata = {
  title: "Services — zunark-ai",
  description: "Web development, custom software, AI solutions, data & analytics, automation and IT consulting.",
};

export default function ServicesPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <div className="mb-14 max-w-2xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          Services
        </div>
        <h1 className="mb-4 text-4xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Solutions built around your business
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          We start by understanding the business, then translate requirements into a
          structured digital solution — combining human engineering with modern
          AI-assisted development.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <div
              key={service.slug}
              className="rounded-2xl border p-8"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
            >
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px]"
                style={{ background: "oklch(0.28 0.045 190)", color: "var(--zk-accent1)" }}
              >
                <Icon />
              </div>
              <h2 className="mb-3 text-xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
                {service.title}
              </h2>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                {service.short}
              </p>
              <ul className="flex flex-col gap-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--zk-accent1)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        className="mt-14 flex flex-col items-start gap-5 rounded-2xl border p-9 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
      >
        <div>
          <h2 className="mb-1 text-xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Have a project in mind?
          </h2>
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            Tell us what you&apos;re working on and we&apos;ll get back to you.
          </p>
        </div>
        <Link
          href="/contact"
          className="zk-link shrink-0 rounded-full px-6 py-3 text-sm font-semibold"
          style={{
            background: "linear-gradient(120deg, var(--zk-accent1), var(--zk-accent2))",
            color: "oklch(0.14 0.02 205)",
          }}
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
}
