import type { Metadata } from "next";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/solutions";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solutions | ZUNARK",
  description:
    "Outcome-focused solutions — automation, AI, CRM, dashboards, healthcare software and digital transformation — for real business problems.",
  alternates: { canonical: absoluteUrl("/solutions") },
};

export default function SolutionsPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} />
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          Solutions
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Solutions built around business outcomes
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          Rather than starting from a technology, we start from the problem — then
          recommend and build the solution that actually fits.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SOLUTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/solutions/${s.slug}`}
            className="zk-link rounded-2xl border p-8"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
              {s.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
              {s.short}
            </p>
            <span className="text-sm font-medium underline" style={{ color: "var(--zk-accent1)" }}>
              Learn more →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <CTASection heading="Have a similar challenge?" supporting="Tell us about your situation — we'll tell you what's realistic." />
      </div>
    </div>
  );
}
