import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology — zunark-ai",
  description: "How we use AI-assisted development, and where human judgment stays in charge.",
};

const AI_ASSISTS_WITH = [
  "Research",
  "Requirements analysis",
  "Prototyping",
  "Development",
  "Code generation",
  "Testing",
  "Documentation",
  "Data analysis",
  "Automation",
];

const HUMANS_STAY_RESPONSIBLE_FOR = [
  "Understanding the client",
  "Requirements",
  "Architecture",
  "Product decisions",
  "Design decisions",
  "Testing",
  "Security",
  "Quality assurance",
  "Deployment",
  "Client communication",
  "Final delivery",
];

export default function TechnologyPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <div className="mb-14 max-w-2xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          Technology
        </div>
        <h1 className="mb-5 text-4xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Human Expertise.{" "}
          <span
            className="italic"
            style={{ fontFamily: "var(--font-serif-fam)", fontWeight: 400, color: "var(--zk-accent1)" }}
          >
            AI Acceleration.
          </span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          Modern AI tools are part of our development workflow — not a replacement for
          it. AI helps us move faster. Engineering makes sure we move in the right
          direction.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
        >
          <h2 className="mb-5 text-lg font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Where AI helps
          </h2>
          <ul className="flex flex-col gap-2.5">
            {AI_ASSISTS_WITH.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
        >
          <h2 className="mb-5 text-lg font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
            Where humans stay responsible
          </h2>
          <ul className="flex flex-col gap-2.5">
            {HUMANS_STAY_RESPONSIBLE_FOR.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
                <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent3)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
