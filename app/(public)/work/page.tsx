import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES } from "@/lib/work";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Work | ZUNARK",
  description: "Real projects our founding team has delivered — AI tools, automation, websites and software for German businesses.",
  alternates: { canonical: absoluteUrl("/work") },
};

export default function WorkPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          Our Work
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          What we&apos;ve actually built
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          ZUNARK is a new company, but our founding team isn&apos;t new to building. Here&apos;s
          real work our team has delivered — some before ZUNARK existed, some in progress now.
          We don&apos;t publish fabricated case studies or invented results.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CASE_STUDIES.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="zk-link overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            {cs.screenshots && cs.screenshots.length > 0 && (
              <div className="relative aspect-[16/10] w-full">
                <Image src={cs.screenshots[0].src} alt={cs.screenshots[0].caption} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
              </div>
            )}
            <div className="p-7">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                  style={{
                    background: cs.status === "delivered" ? "var(--zk-panel)" : "var(--zk-accent2)",
                    color: cs.status === "delivered" ? "var(--zk-fg-muted)" : "oklch(1 0 0)",
                    border: cs.status === "delivered" ? "1px solid var(--zk-border)" : "none",
                  }}
                >
                  {cs.status === "delivered" ? "Delivered" : "In Development"}
                </span>
                <span className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>{cs.industry}</span>
              </div>
              <h2 className="mb-2 text-lg font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
                {cs.name}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                {cs.problem}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <CTASection heading="Have a similar project?" supporting="Tell us what you're trying to build." />
      </div>
    </div>
  );
}
