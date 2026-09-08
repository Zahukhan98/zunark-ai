import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { SERVICE_ICONS } from "@/components/public/icons";

function AiHeadIllustration() {
  return (
    <div className="relative flex h-[420px] items-center justify-center md:h-[480px]">
      <div
        className="absolute h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{
          left: "50%",
          top: "42%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, var(--zk-accent1) 0%, transparent 68%)",
        }}
      />
      <svg viewBox="0 0 380 480" width="300" height="380" className="relative z-10">
        <defs>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--zk-panel-soft)" }} />
            <stop offset="1" style={{ stopColor: "oklch(0.15 0.02 200)" }} />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--zk-accent1)" }} />
            <stop offset="1" style={{ stopColor: "var(--zk-accent2)" }} />
          </linearGradient>
        </defs>

        <path
          d="M190 460c-70 0-115-24-115-55v-25c0-40 30-60 115-60s115 20 115 60v25c0 31-45 55-115 55z"
          fill="url(#headGrad)"
          opacity={0.9}
        />

        <line x1="190" y1="70" x2="190" y2="20" stroke="var(--zk-accent3)" strokeWidth={2} />
        <circle cx="190" cy="14" r="7" style={{ fill: "var(--zk-accent3)" }} />

        <line x1="70" y1="180" x2="18" y2="150" stroke="var(--zk-accent1)" strokeWidth={1.6} opacity={0.7} />
        <circle cx="12" cy="146" r="5" style={{ fill: "var(--zk-accent1)" }} />
        <line x1="310" y1="180" x2="362" y2="150" stroke="var(--zk-accent2)" strokeWidth={1.6} opacity={0.7} />
        <circle cx="368" cy="146" r="5" style={{ fill: "var(--zk-accent2)" }} />

        <rect x="55" y="65" width="270" height="300" rx="105" fill="url(#headGrad)" stroke="var(--zk-border)" strokeWidth={1.5} />

        <rect x="88" y="195" width="204" height="58" rx="29" fill="oklch(0.1 0.01 200)" />
        <rect x="94" y="201" width="192" height="46" rx="23" fill="url(#visorGrad)" opacity={0.9} />
        <circle cx="190" cy="224" r="9" style={{ fill: "oklch(0.98 0 0)" }} />

        <line x1="88" y1="290" x2="292" y2="290" stroke="var(--zk-border)" strokeWidth={1.5} />
        <line x1="105" y1="310" x2="275" y2="310" stroke="var(--zk-border)" strokeWidth={1} />
      </svg>

      <div
        className="absolute left-0 top-6 z-20 hidden max-w-[170px] rounded-2xl border p-4 backdrop-blur-md sm:block"
        style={{ background: "var(--zk-glass)", borderColor: "var(--zk-border)" }}
      >
        <div className="mb-1.5 text-[11px]" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
          HUMAN-REVIEWED
        </div>
        <div className="text-xs leading-relaxed">Every AI output is checked before it ships.</div>
      </div>
      <div
        className="absolute bottom-4 right-0 z-20 hidden max-w-[170px] rounded-2xl border p-4 backdrop-blur-md sm:block"
        style={{ background: "var(--zk-glass)", borderColor: "var(--zk-border)" }}
      >
        <div className="mb-1.5 text-[11px]" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent3)" }}>
          6 SOLUTION AREAS
        </div>
        <div className="text-xs leading-relaxed">Web, software, AI, data, automation, IT support.</div>
      </div>
    </div>
  );
}

function PeekingCards() {
  return (
    <>
      <div
        className="absolute -left-24 top-24 hidden w-56 -rotate-2 rounded-2xl border p-5 lg:block"
        style={{ background: "oklch(0.2 0.03 195 / 0.6)", borderColor: "var(--zk-border)" }}
      >
        <div className="text-lg font-semibold leading-snug" style={{ fontFamily: "var(--font-display-fam)", color: "var(--zk-fg-muted)" }}>
          Intelligent Digital Solutions
        </div>
      </div>
      <div
        className="absolute -right-24 top-40 hidden w-56 rotate-2 rounded-2xl border p-5 lg:block"
        style={{ background: "oklch(0.2 0.03 195 / 0.6)", borderColor: "var(--zk-border)" }}
      >
        <div className="text-lg font-semibold leading-snug" style={{ fontFamily: "var(--font-display-fam)", color: "var(--zk-fg-muted)" }}>
          Built On Modern Architecture
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-20 pt-6 md:px-16">
        <PeekingCards />
        <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:items-center">
          <div className="max-w-xl flex-1">
            <div className="mb-5 w-14 border-t-2" style={{ borderStyle: "dashed", borderColor: "var(--zk-accent3)" }} />
            <h1
              className="mb-6 text-[42px] font-semibold leading-[1.12] tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-display-fam)" }}
            >
              From Business Ideas to
              <br />
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-serif-fam)",
                  fontWeight: 400,
                  fontSize: "1.15em",
                  background: "linear-gradient(120deg, var(--zk-accent1) 10%, var(--zk-accent2) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Digital Products.
              </span>
            </h1>
            <p className="mb-8 max-w-md text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
              We design and build websites, software and intelligent digital solutions
              around the way your business actually works.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="zk-link rounded-full px-6 py-3.5 text-sm font-semibold"
                style={{
                  background: "linear-gradient(120deg, var(--zk-accent1), var(--zk-accent2))",
                  color: "oklch(0.14 0.02 205)",
                }}
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="zk-link rounded-full border px-6 py-3.5 text-sm font-medium"
                style={{ borderColor: "var(--zk-border)" }}
              >
                Explore Our Solutions
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <AiHeadIllustration />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-16">
        <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div
              className="mb-3 text-xs uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
            >
              What we do
            </div>
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
              Solutions built around your business
            </h2>
          </div>
          <Link
            href="/services"
            className="zk-link border-b pb-0.5 text-sm"
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
                style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px]"
                  style={{ background: "oklch(0.28 0.045 190)", color: "var(--zk-accent1)" }}
                >
                  <Icon />
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
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
