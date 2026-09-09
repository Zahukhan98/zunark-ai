import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | ZUNARK",
  description: "How ZUNARK collects, uses and protects information submitted through this website.",
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <div className="max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm" style={{ color: "var(--zk-fg-muted)" }}>Last updated: January 2026</p>

        <div className="flex flex-col gap-8 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              What we collect
            </h2>
            <p>
              When you submit our project enquiry form, we collect the information you
              provide: your name, company, email, phone number, and details about your
              project. We use this only to respond to your enquiry.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Analytics
            </h2>
            <p>
              With your consent (via the cookie banner shown on your first visit), we
              use Google Analytics to understand how visitors use this site — which
              pages are viewed and how people navigate the site. Analytics cookies are
              only set after you accept them. You can decline, and the site will
              function normally without analytics tracking.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              How we use your information
            </h2>
            <p>
              Project enquiry information is used solely to evaluate and respond to
              your enquiry. We do not sell your data or share it with third parties
              for marketing or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Data storage
            </h2>
            <p>
              Enquiry data is stored securely in our project database and is
              accessible only to ZUNARK team members handling project intake.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Your rights
            </h2>
            <p>
              You can request that we delete any information you&apos;ve submitted to
              us by emailing{" "}
              <a href="mailto:info@zunark-ai.com" className="zk-link underline" style={{ color: "var(--zk-fg)" }}>
                info@zunark-ai.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--zk-fg)", fontFamily: "var(--font-display-fam)" }}>
              Contact
            </h2>
            <p>
              Questions about this policy can be sent to{" "}
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
