import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { SERVICE_ICONS } from "@/components/public/icons";
import { INDUSTRIES } from "@/lib/industries";
import { CASE_STUDIES } from "@/lib/work";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZUNARK | Websites, Software, AI & Automation",
  description:
    "ZUNARK designs and builds websites, custom software, AI solutions and automation that fit the way your business actually works.",
  alternates: { canonical: absoluteUrl("/") },
};

const CAPABILITIES = ["Websites", "Software", "AI", "Automation", "Data"];

const PROBLEMS_WE_SOLVE = [
  {
    problem: "Our website doesn't explain what we do or bring in enquiries.",
    solution: "A clear, fast website built around how you actually sell.",
    service: "web-development",
  },
  {
    problem: "We're stuck managing the business across spreadsheets and disconnected tools.",
    solution: "Custom software or a dashboard that fits your real workflow.",
    service: "custom-software",
  },
  {
    problem: "We spend hours a week on repetitive content, sorting or data entry.",
    solution: "AI tools and automation scoped to that specific task, with human review.",
    service: "ai-solutions",
  },
  {
    problem: "We can't see what's actually happening across the business.",
    solution: "A dashboard that pulls your real numbers into one place.",
    service: "data-analytics",
  },
];

const WHY_ZUNARK = [
  {
    title: "We start with the problem, not the technology",
    text: "We don't propose AI, automation or a rebuild by default — we recommend what the problem actually needs, including \"nothing yet.\"",
  },
  {
    title: "Founder-led delivery",
    text: "You work directly with the people building your project, not an account manager relaying to an offshore team.",
  },
  {
    title: "Human review on everything AI-assisted",
    text: "AI accelerates drafting and analysis. A person reviews the output before it ships — every time.",
  },
  {
    title: "Honest about what we don't do",
    text: "We won't stretch \"maintenance\" into general IT support, or oversell a project's scope to close it.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
        <Image src="/office-hero.jpg" alt="The zunark-ai office" fill priority sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, oklch(0.16 0.02 255 / 0.93) 0%, oklch(0.16 0.02 255 / 0.8) 42%, oklch(0.16 0.02 255 / 0.42) 100%)",
          }}
        />
        <div className="relative z-10 w-full px-6 py-20 md:px-16">
          <div className="max-w-xl">
            <div className="mb-5 w-14 border-t-2" style={{ borderStyle: "dashed", borderColor: "oklch(0.78 0.13 75)" }} />
            <h1 className="mb-6 text-[38px] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display-fam)" }}>
              From Business Ideas to <span style={{ color: "oklch(0.8 0.13 75)" }}>Digital Products.</span>
            </h1>
            <p className="mb-6 max-w-md text-lg leading-relaxed" style={{ color: "oklch(0.9 0.008 255)" }}>
              We design and build websites, software and intelligent digital solutions
              around the way your business actually works.
            </p>
            <div
              className="mb-8 text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono-fam)", color: "oklch(0.82 0.01 255)" }}
            >
              {CAPABILITIES.join(" • ")}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full px-6 py-3.5 text-sm font-semibold" style={{ background: "oklch(1 0 0)", color: "var(--zk-accent1)" }}>
                Discuss Your Project
              </Link>
              <Link href="/work" className="rounded-full border px-6 py-3.5 text-sm font-semibold" style={{ borderColor: "oklch(1 0 0 / 0.5)", color: "oklch(1 0 0)" }}>
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b px-6 py-10 md:px-16" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>Founder-led</div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>Building in public, led directly by our founders.</p>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>Human-reviewed</div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>Every AI-assisted output is checked before it ships.</p>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>5 capabilities</div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>Websites, software, AI, automation and data — under one team.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>What we do</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>We turn business problems into digital systems</h2>
          </div>
          <Link href="/services" className="zk-link border-b pb-0.5 text-sm font-medium" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
            View all services →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="zk-link overflow-hidden rounded-2xl border"
                style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
              >
                {service.previewImage && (
                  <div className="relative aspect-[3/2] w-full" style={{ background: "var(--zk-panel-soft)" }}>
                    <Image src={service.previewImage} alt={`${service.navTitle} illustration`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px]" style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}>
                    <Icon />
                  </div>
                  <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{service.navTitle}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>{service.short}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-20 md:px-16" style={{ background: "var(--zk-panel)" }}>
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>Business problems we solve</div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Sound familiar?</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROBLEMS_WE_SOLVE.map((p) => (
            <Link
              key={p.problem}
              href={`/services/${p.service}`}
              className="zk-link rounded-2xl border p-7"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
            >
              <p className="mb-3 font-semibold leading-snug">&ldquo;{p.problem}&rdquo;</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>→ {p.solution}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            Not sure what you need?{" "}
            <Link href="/contact" className="zk-link underline" style={{ color: "var(--zk-accent1)" }}>
              Tell us about the problem.
            </Link>
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>Selected work</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>What we&apos;ve actually built</h2>
          </div>
          <Link href="/work" className="zk-link border-b pb-0.5 text-sm font-medium" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
            See all work →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="zk-link overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
            >
              {cs.screenshots && cs.screenshots.length > 0 && (
                <div className="relative aspect-[16/10] w-full">
                  <Image src={cs.screenshots[0].src} alt={cs.screenshots[0].caption} fill sizes="33vw" className="object-cover object-top" />
                </div>
              )}
              <div className="p-6">
                <span
                  className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                  style={{
                    background: cs.status === "delivered" ? "var(--zk-panel)" : "var(--zk-accent2)",
                    color: cs.status === "delivered" ? "var(--zk-fg-muted)" : "oklch(1 0 0)",
                    border: cs.status === "delivered" ? "1px solid var(--zk-border)" : "none",
                  }}
                >
                  {cs.status === "delivered" ? "Delivered" : "In Development"}
                </span>
                <h3 className="text-base font-bold leading-snug" style={{ fontFamily: "var(--font-display-fam)" }}>{cs.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-16" style={{ background: "var(--zk-panel)" }}>
        <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>Industries</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Built for how your industry actually operates</h2>
          </div>
          <Link href="/industries" className="zk-link border-b pb-0.5 text-sm font-medium" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
            View all industries →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="zk-link rounded-2xl border p-6"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
            >
              <h3 className="mb-2 text-base font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{ind.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>{ind.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>Why ZUNARK</div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>A technology partner, not a generic agency</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {WHY_ZUNARK.map((w) => (
            <div key={w.title}>
              <h3 className="mb-2 font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{w.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Have a business problem that software could solve?"
        supporting="Tell us what you're trying to build. We'll help you turn the idea into a practical digital solution."
      />
    </div>
  );
}
