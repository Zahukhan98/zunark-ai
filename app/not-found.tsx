import Link from "next/link";

export default function NotFound() {
  return (
    <div className="zk flex min-h-screen flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
        404
      </div>
      <h1 className="mb-4 text-3xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
        This page doesn&apos;t exist
      </h1>
      <p className="mb-8 max-w-md leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
        The page you&apos;re looking for may have moved or been renamed. Try the
        homepage, or explore our services and work below.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="zk-link rounded-full px-6 py-3 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          Back to Home
        </Link>
        <Link
          href="/services"
          className="zk-link rounded-full border px-6 py-3 text-sm font-semibold"
          style={{ borderColor: "var(--zk-border)" }}
        >
          View Services
        </Link>
      </div>
    </div>
  );
}
