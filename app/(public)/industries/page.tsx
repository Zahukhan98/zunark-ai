import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industries | ZUNARK",
  description: "Technology solutions for healthcare, small business, manufacturing and professional services.",
  alternates: { canonical: absoluteUrl("/industries") },
};

export default function IndustriesPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          Industries
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Different businesses, different problems
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          The right technology depends on how an industry actually operates. Here&apos;s
          what we typically see, and how we approach it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {INDUSTRIES.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="zk-link rounded-2xl border p-8"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
              {ind.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
              {ind.short}
            </p>
            <span className="text-sm font-medium underline" style={{ color: "var(--zk-accent1)" }}>
              Learn more →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <CTASection heading="Don't see your industry?" supporting="We're not limited to these — tell us about your business and we'll tell you how we can help." />
      </div>
    </div>
  );
}
