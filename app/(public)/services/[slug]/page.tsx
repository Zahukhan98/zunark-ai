import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import { SOLUTIONS } from "@/lib/solutions";
import { INDUSTRIES } from "@/lib/industries";
import { SERVICE_ICONS } from "@/components/public/icons";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { JsonLd } from "@/components/public/JsonLd";
import { absoluteUrl, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: absoluteUrl(`/services/${service.slug}`),
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = SERVICE_ICONS[service.icon];
  const relatedSolutions = SOLUTIONS.filter((s) => service.relatedSolutions.includes(s.slug));
  const relatedIndustries = INDUSTRIES.filter((i) => service.relatedIndustries.includes(i.slug));

  return (
    <div>
      <JsonLd
        data={[
          serviceJsonLd({ name: service.title, description: service.seoDescription, path: `/services/${service.slug}` }),
          faqJsonLd(service.faqs),
        ]}
      />
      <div className="px-6 pt-16 md:px-16">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: service.navTitle, path: `/services/${service.slug}` }]} />
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}>
          <Icon className="h-6 w-6" />
        </div>
        <h1 className="mb-5 max-w-3xl text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          {service.title}
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          {service.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-16">
        <div className="md:col-span-2">
          <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            The problem
          </h2>
          <p className="mb-10 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            {service.problem}
          </p>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            What we build
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {service.whatWeBuild.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Typical use cases
          </h2>
          <ul className="mb-10 flex flex-col gap-2.5">
            {service.useCases.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent2)" }} />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Why a custom approach can help
          </h2>
          <p className="mb-10 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            {service.whyCustom}
          </p>

          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-6">
            {service.faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="mb-1.5 font-semibold">{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-8">
          <div className="rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {relatedSolutions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Related solutions
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

          {relatedIndustries.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Common in these industries
              </h3>
              <ul className="flex flex-col gap-2">
                {relatedIndustries.map((ind) => (
                  <li key={ind.slug}>
                    <Link href={`/industries/${ind.slug}`} className="zk-link text-sm underline">
                      {ind.title}
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
        <CTASection
          heading={`Have a project that needs ${service.navTitle.toLowerCase()}?`}
          supporting="Tell us about the problem you're solving — we'll tell you honestly whether this is the right fit."
        />
      </div>
    </div>
  );
}
