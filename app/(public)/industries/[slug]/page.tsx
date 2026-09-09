import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/industries";
import { SERVICES } from "@/lib/services";
import { SOLUTIONS } from "@/lib/solutions";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { JsonLd } from "@/components/public/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.seoTitle,
    description: industry.seoDescription,
    alternates: { canonical: absoluteUrl(`/industries/${industry.slug}`) },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedServices = SERVICES.filter((s) => industry.relatedServices.includes(s.slug));
  const relatedSolutions = SOLUTIONS.filter((s) => industry.relatedSolutions.includes(s.slug));

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Industries", path: "/industries" }, { name: industry.title, path: `/industries/${industry.slug}` }])} />
      <div className="px-6 pt-16 md:px-16">
        <Breadcrumbs items={[{ name: "Industries", path: "/industries" }, { name: industry.title, path: `/industries/${industry.slug}` }]} />
        <h1 className="mb-5 max-w-3xl text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Technology for {industry.title}
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          {industry.short}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-16">
        <div className="md:col-span-2">
          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Common problems
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {industry.problems.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                {p}
              </li>
            ))}
          </ul>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Digital opportunities
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {industry.opportunities.map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent2)" }} />
                {o}
              </li>
            ))}
          </ul>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Example workflow
          </h2>
          <ol className="flex flex-col gap-3">
            {industry.exampleWorkflow.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <aside className="flex flex-col gap-8">
          {relatedServices.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Relevant services
              </h3>
              <ul className="flex flex-col gap-2">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="zk-link text-sm underline">
                      {s.navTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {relatedSolutions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Relevant solutions
              </h3>
              <ul className="flex flex-col gap-2">
                {relatedSolutions.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/solutions/${s.slug}`} className="zk-link text-sm underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-16">
        <CTASection heading="Have a similar challenge?" supporting="Tell us about your business — we'll tell you what's worth building." />
      </div>
    </div>
  );
}
