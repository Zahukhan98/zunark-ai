import Link from "next/link";

export function CTASection({
  heading,
  supporting,
  buttonLabel = "Discuss Your Project",
  href = "/contact",
}: {
  heading: string;
  supporting?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="px-6 py-16 md:px-16" style={{ background: "var(--zk-panel)" }}>
      <div
        className="flex flex-col items-start gap-6 rounded-2xl border p-10 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
      >
        <div className="max-w-xl">
          <h2 className="mb-2 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            {heading}
          </h2>
          {supporting && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
              {supporting}
            </p>
          )}
        </div>
        <Link
          href={href}
          className="zk-link shrink-0 rounded-full px-7 py-3.5 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
