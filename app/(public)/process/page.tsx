import type { Metadata } from "next";
import { PROCESS_STEPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process — zunark-ai",
  description: "How we take a project from discovery to support.",
};

export default function ProcessPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <div className="mb-14 max-w-2xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          How we work
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          From requirement to running software
        </h1>
      </div>

      <div className="flex flex-col">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.number}
            className="flex gap-6 border-t py-7 first:border-t-0 md:gap-10"
            style={{ borderColor: "var(--zk-border)" }}
          >
            <div
              className="w-16 shrink-0 text-2xl font-semibold md:w-20"
              style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
            >
              {step.number}
            </div>
            <div>
              <h2 className="mb-1.5 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
                {step.title}
              </h2>
              <p className="max-w-lg text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
