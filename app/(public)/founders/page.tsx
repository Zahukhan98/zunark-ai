import type { Metadata } from "next";
import { FOUNDERS } from "@/lib/content";
import { FounderSlideshow } from "@/components/public/FounderSlideshow";

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
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
          >
            <div className="relative aspect-[4/5] w-full">
              <FounderSlideshow photos={founder.photos} name={founder.name} initials={founder.initials} />
            </div>
            <div className="p-8">
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
          </div>
        ))}
      </div>
    </div>
  );
}
