import type { Metadata } from "next";
import Image from "next/image";
import { FOUNDERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Founders — zunark-ai",
  description: "Meet the founders of zunark-ai.",
};

export default function FoundersPage() {
  return (
    <div className="px-6 py-16 md:px-16">
      <div className="mb-14 max-w-2xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          Founders
        </div>
        <h1 className="text-4xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Founder-led, from day one
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {FOUNDERS.map((founder) => (
          <div
            key={founder.slug}
            className="rounded-2xl border p-8"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.name}
                width={88}
                height={88}
                className="mb-6 rounded-full object-cover"
              />
            ) : (
              <div
                className="mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full text-2xl font-semibold"
                style={{
                  background: "linear-gradient(135deg, var(--zk-accent1), var(--zk-accent2))",
                  color: "oklch(0.14 0.02 205)",
                  fontFamily: "var(--font-display-fam)",
                }}
              >
                {founder.initials}
              </div>
            )}
            <h2 className="mb-1 text-xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
              {founder.name}
            </h2>
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
        ))}
      </div>
    </div>
  );
}
