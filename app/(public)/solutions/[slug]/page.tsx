import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolutionBySlug } from "@/lib/solutions";
import { SERVICES } from "@/lib/services";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { JsonLd } from "@/components/public/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: solution.seoTitle,
    description: solution.seoDescription,
    alternates: { canonical: absoluteUrl(`/solutions/${solution.slug}`) },
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const relatedServices = SERVICES.filter((s) => solution.relatedServices.includes(s.slug));

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }, { name: solution.title, path: `/solutions/${solution.slug}` }])} />
      <div className="px-6 pt-16 md:px-16">
        <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }, { name: solution.title, path: `/solutions/${solution.slug}` }]} />
        <h1 className="mb-5 max-w-3xl text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          {solution.title}
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          {solution.problem}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-16">
        <div className="md:col-span-2">
          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Common challenges
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {solution.challenges.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                {c}
              </li>
            ))}
          </ul>

          <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Our approach
          </h2>
          <p className="mb-10 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            {solution.approach}
          </p>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            What we build
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {solution.whatWeBuild.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent2)" }} />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Example workflow
          </h2>
          <ol className="mb-10 flex flex-col gap-3">
            {solution.exampleWorkflow.map((step, i) => (
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

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Benefits
          </h2>
          <ul className="flex flex-col gap-2.5">
            {solution.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-8">
          {relatedServices.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Related services
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
          <div>
            <Link href="/work" className="zk-link text-sm underline" style={{ color: "var(--zk-accent1)" }}>
              See related work →
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <CTASection heading="Have a similar challenge?" supporting="Tell us what's slowing your business down — we'll tell you what's worth building." />
      </div>
    </div>
  );
}
