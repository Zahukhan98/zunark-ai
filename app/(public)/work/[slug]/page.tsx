import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/lib/work";
import { SERVICES } from "@/lib/services";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { JsonLd } from "@/components/public/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} | ZUNARK Work`,
    description: cs.problem,
    alternates: { canonical: absoluteUrl(`/work/${cs.slug}`) },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const relatedServices = SERVICES.filter((s) => cs.relatedServices.includes(s.slug));

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/work" }, { name: cs.name, path: `/work/${cs.slug}` }])} />
      <div className="px-6 pt-16 md:px-16">
        <Breadcrumbs items={[{ name: "Work", path: "/work" }, { name: cs.name, path: `/work/${cs.slug}` }]} />
        <div className="mb-4 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
            style={{
              background: cs.status === "delivered" ? "var(--zk-panel-soft)" : "var(--zk-accent2)",
              color: cs.status === "delivered" ? "var(--zk-fg-muted)" : "oklch(1 0 0)",
              border: cs.status === "delivered" ? "1px solid var(--zk-border)" : "none",
            }}
          >
            {cs.status === "delivered" ? "Delivered" : "In Development"}
          </span>
          <span className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>{cs.industry}</span>
        </div>
        <h1 className="mb-4 max-w-3xl text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          {cs.name}
        </h1>
        <p className="mb-3 max-w-2xl text-sm italic leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          {cs.attribution}
        </p>
      </div>

      {cs.screenshots && cs.screenshots.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 px-6 sm:grid-cols-3 md:px-16">
          {cs.screenshots.map((shot) => (
            <div key={shot.src} className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--zk-border)" }}>
              <div className="relative aspect-[4/3] w-full">
                <Image src={shot.src} alt={shot.caption} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-top" />
              </div>
              <div className="p-3 text-xs" style={{ color: "var(--zk-fg-muted)" }}>
                {shot.url ? (
                  <a href={shot.url} target="_blank" rel="noopener noreferrer" className="zk-link underline">
                    {shot.caption} ↗
                  </a>
                ) : (
                  shot.caption
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 grid grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-16">
        <div className="md:col-span-2">
          <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            The problem
          </h2>
          <p className="mb-10 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            {cs.problem}
          </p>

          <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            The solution
          </h2>
          <p className="mb-10 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            {cs.solution}
          </p>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            What was built
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {cs.whatWeBuilt.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Outcome
          </h2>
          <p className="leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            {cs.outcome}
          </p>
        </div>

        <aside className="flex flex-col gap-8">
          <div className="rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {cs.technologies.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

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
        </aside>
      </div>

      <div className="mt-16">
        <CTASection heading="Have a similar project?" supporting="Tell us what you're trying to build." />
      </div>
    </div>
  );
}
