import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/content";
import { SERVICE_ICONS } from "@/components/public/icons";

const TRUST_ITEMS = [
  {
    label: "Founder-led",
    text: "Building in public, led directly by our founders.",
  },
  {
    label: "Human-reviewed",
    text: "Every AI-assisted output is checked before it ships.",
  },
  {
    label: "6 solution areas",
    text: "Web, software, AI, data, automation and IT support.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
        <Image
          src="/office-hero.jpg"
          alt="The zunark-ai office"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
            <h1
              className="mb-6 text-[38px] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-display-fam)" }}
            >
              From Business Ideas to <span style={{ color: "oklch(0.8 0.13 75)" }}>Digital Products.</span>
            </h1>
            <p className="mb-8 max-w-md text-lg leading-relaxed" style={{ color: "oklch(0.9 0.008 255)" }}>
              We design and build websites, software and intelligent digital solutions
              around the way your business actually works.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full px-6 py-3.5 text-sm font-semibold"
                style={{ background: "oklch(1 0 0)", color: "var(--zk-accent1)" }}
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="rounded-full border px-6 py-3.5 text-sm font-semibold"
                style={{ borderColor: "oklch(1 0 0 / 0.5)", color: "oklch(1 0 0)" }}
              >
                Explore Our Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b px-6 py-10 md:px-16"
        style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label}>
              <div
                className="mb-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
              >
                {item.label}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div
              className="mb-3 text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
            >
              What we do
            </div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
              Solutions built around your business
            </h2>
          </div>
          <Link
            href="/services"
            className="zk-link border-b pb-0.5 text-sm font-medium"
            style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
          >
            View all services →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <div
                key={service.slug}
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px]"
                  style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}
                >
                  <Icon />
                </div>
                <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                  {service.short}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
