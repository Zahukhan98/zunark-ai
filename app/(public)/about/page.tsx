import type { Metadata } from "next";
import Image from "next/image";
import { FOUNDERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — zunark-ai",
  description: "Why zunark-ai exists, how we work, and who's behind it.",
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
        <h1 className="mb-8 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Understand the business first.{" "}
          <span style={{ color: "var(--zk-accent1)" }}>Design the solution second.</span> Build the
          technology third.
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
            zunark-ai is a new company, with a long-term goal of building a technology
            organization capable of delivering digital solutions to businesses at scale.
            We&apos;re starting small and building the foundation properly — not
            claiming a size or history we don&apos;t have yet.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          Founders
        </div>
        <h2 className="mb-10 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Founder-led, from day one
        </h2>
      </div>

      <div className="grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
        {FOUNDERS.map((founder) => (
          <div
            key={founder.slug}
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            <div className="relative aspect-[4/5] w-full">
              {founder.photo ? (
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-5xl font-semibold"
                  style={{
                    background: "var(--zk-accent1)",
                    color: "oklch(1 0 0)",
                    fontFamily: "var(--font-display-fam)",
                  }}
                >
                  {founder.initials}
                </div>
              )}
            </div>
            <div className="p-8">
              <h3 className="mb-1 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
                {founder.name}
              </h3>
              <div className="mb-5 text-sm" style={{ color: "var(--zk-accent1)", fontFamily: "var(--font-mono-fam)" }}>
                {founder.role}
              </div>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                {founder.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {founder.focus.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs"
                    style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
