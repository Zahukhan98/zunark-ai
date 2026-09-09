import Image from "next/image";

export function DeviceMockup({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-xl"
      style={{ borderColor: "var(--zk-border)", boxShadow: "0 30px 60px -20px oklch(0.2 0.02 260 / 0.25)" }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--zk-border)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--zk-border)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--zk-border)" }} />
        {label && (
          <span
            className="ml-2 truncate rounded-md px-2.5 py-1 text-xs"
            style={{ background: "var(--zk-panel)", color: "var(--zk-fg-muted)", fontFamily: "var(--font-mono-fam)" }}
          >
            {label}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] w-full" style={{ background: "var(--zk-panel)" }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

export function AbstractPanel({
  icon: Icon,
  accent = "var(--zk-accent1)",
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent?: string;
}) {
  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--zk-border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute h-56 w-56 rounded-full opacity-25 blur-3xl"
        style={{ background: accent }}
      />
      <div
        className="relative flex h-28 w-28 items-center justify-center rounded-2xl border"
        style={{ background: "var(--zk-panel)", borderColor: "var(--zk-border)", color: accent }}
      >
        <Icon className="h-12 w-12" />
      </div>
    </div>
  );
}
