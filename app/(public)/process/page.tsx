import type { Metadata } from "next";
import { PROCESS_STEPS } from "@/lib/content";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { CTASection } from "@/components/public/CTASection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How We Work | ZUNARK",
  description: "How a ZUNARK project runs from discovery through to ongoing support.",
  alternates: { canonical: absoluteUrl("/process") },
};

export default function ProcessPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Process", path: "/process" }]} />
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          How we work
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          From requirement to running software
        </h1>
      </div>

      <div className="flex flex-col">
        {PROCESS_STEPS.map((step) => (
          <div key={step.number} className="flex gap-6 border-t py-7 first:border-t-0 md:gap-10" style={{ borderColor: "var(--zk-border)" }}>
            <div className="w-16 shrink-0 text-2xl font-semibold md:w-20" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
              {step.number}
            </div>
            <div>
              <h2 className="mb-1.5 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{step.title}</h2>
              <p className="max-w-lg text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <CTASection heading="Ready to start?" supporting="Tell us about your project and we'll walk you through the first step." />
      </div>
    </div>
  );
}
