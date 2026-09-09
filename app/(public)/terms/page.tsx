import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms | ZUNARK",
  description: "Terms of use for the ZUNARK website.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />
      <div className="max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Terms of Use
        </h1>
        <p className="mb-10 text-sm" style={{ color: "var(--zk-fg-muted)" }}>Last updated: January 2026</p>

        <div className="flex flex-col gap-8 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Website content
            </h2>
            <p>
              This website describes ZUNARK&apos;s services, work and general
              business information. It&apos;s provided for informational purposes;
              nothing on this site constitutes a binding offer or contract. Actual
              project terms are agreed separately in writing with each client.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Intellectual property
            </h2>
            <p>
              The content, design and branding of this website belong to ZUNARK
              unless otherwise noted. Case study screenshots of third-party websites
              are shown to illustrate our founding team&apos;s prior work and remain
              the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              No warranty
            </h2>
            <p>
              This website is provided as-is. While we aim to keep it accurate and
              up to date, we don&apos;t guarantee that all content is current or
              error-free at all times.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Contact
            </h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@zunark-ai.com" className="zk-link underline" style={{ color: "var(--zk-fg)" }}>
                info@zunark-ai.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
