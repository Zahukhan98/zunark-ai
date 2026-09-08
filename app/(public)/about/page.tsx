import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — zunark-ai",
  description: "Why zunark-ai exists and how we work.",
};

export default function AboutPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <div className="max-w-2xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          About
        </div>
        <h1 className="mb-8 text-4xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Understand the business first.{" "}
          <span
            className="italic"
            style={{ fontFamily: "var(--font-serif-fam)", fontWeight: 400, color: "var(--zk-accent1)" }}
          >
            Design the solution second.
          </span>{" "}
          Build the technology third.
        </h1>

        <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          <p>
            Many businesses know they need a website, a piece of software or a digital
            solution — but struggle to translate what they actually need into something
            a team can build. zunark-ai exists to bridge that gap.
          </p>
          <p>
            We start by understanding the client&apos;s business: how it runs, who it
            serves, and what&apos;s actually getting in the way. We then translate those
            requirements into a structured digital solution — a specification, an
            architecture, a plan — before a single line of production code gets written.
          </p>
          <p>
            We combine human engineering expertise with modern AI-assisted development
            tools to build practical, scalable solutions faster than a traditional
            agency, without skipping the judgment calls that AI can&apos;t make on its
            own — requirements, architecture, security, and what &quot;done&quot;
            actually means for a given client.
          </p>
          <p>
            zunark-ai is a new company, founded and run by{" "}
            <Link href="/founders" className="zk-link underline" style={{ color: "var(--zk-fg)" }}>
              Mohammed Zahid Khan and Mohammed Kamar
            </Link>
            , with a long-term goal of building a technology organization capable of
            delivering digital solutions to businesses at scale. We&apos;re starting
            small and building the foundation properly — not claiming a size or history
            we don&apos;t have yet.
          </p>
        </div>
      </div>
    </div>
  );
}
