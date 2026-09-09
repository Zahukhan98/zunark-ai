import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/insights";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights | ZUNARK",
  description: "Practical answers to the questions businesses ask before investing in software, AI or automation.",
  alternates: { canonical: absoluteUrl("/insights") },
};

export default function InsightsPage() {
  const sorted = [...ARTICLES].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Insights", path: "/insights" }]} />
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          Insights
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Practical answers, not generic content
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          Written to answer the questions businesses actually search before deciding
          what to build.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sorted.map((a) => (
          <Link
            key={a.slug}
            href={`/insights/${a.slug}`}
            className="zk-link rounded-2xl border p-7"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            <div
              className="mb-3 text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
            >
              {a.category}
            </div>
            <h2 className="mb-2 text-lg font-bold leading-snug" style={{ fontFamily: "var(--font-display-fam)" }}>
              {a.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
              {a.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <CTASection heading="Ready to solve this in your business?" supporting="Tell us what you're trying to build." />
      </div>
    </div>
  );
}
