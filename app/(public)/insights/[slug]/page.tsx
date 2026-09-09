import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug } from "@/lib/insights";
import { SERVICES } from "@/lib/services";
import { SOLUTIONS } from "@/lib/solutions";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { ArticleBody } from "@/components/public/ArticleBody";
import { JsonLd } from "@/components/public/JsonLd";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: absoluteUrl(`/insights/${article.slug}`) },
    authors: [{ name: article.author }],
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const toc = article.content.filter((b) => b.type === "h2");
  const relatedServices = SERVICES.filter((s) => article.relatedServices.includes(s.slug));
  const relatedSolutions = SOLUTIONS.filter((s) => (article.relatedSolutions ?? []).includes(s.slug));
  const relatedArticles = ARTICLES.filter((a) => (article.relatedArticles ?? []).includes(a.slug));

  return (
    <div>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Insights", path: "/insights" }, { name: article.title, path: `/insights/${article.slug}` }]),
          articleJsonLd({
            title: article.title,
            description: article.seoDescription,
            path: `/insights/${article.slug}`,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            author: article.author,
          }),
          ...(article.faqs ? [faqJsonLd(article.faqs)] : []),
        ]}
      />
      <div className="px-6 pt-16 md:px-16">
        <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: article.title, path: `/insights/${article.slug}` }]} />
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          {article.category}
        </div>
        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-display-fam)" }}>
          {article.title}
        </h1>
        <div className="mb-10 flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
          <span>By {article.author}</span>
          <span aria-hidden="true">·</span>
          <span>Published {formatDate(article.publishedAt)}</span>
          {article.updatedAt !== article.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(article.updatedAt)}</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-16">
        <div className="md:col-span-2">
          <ArticleBody blocks={article.content} />

          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
                FAQs
              </h2>
              <div className="flex flex-col gap-6">
                {article.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="mb-1.5 font-semibold">{f.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-8">
          {toc.length > 0 && (
            <div className="rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                In this article
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                {toc.map((h) => (
                  <li key={h.text} style={{ color: "var(--zk-fg-muted)" }}>
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedServices.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Related service
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
                Related solution
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

          {relatedArticles.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
                Related articles
              </h3>
              <ul className="flex flex-col gap-2">
                {relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/insights/${a.slug}`} className="zk-link text-sm underline">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-16">
        <CTASection
          heading="Have a business problem that software could solve?"
          supporting="Tell us what you're trying to build. We'll help you turn the idea into a practical digital solution."
        />
      </div>
    </div>
  );
}
