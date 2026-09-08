import Link from "next/link";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/founders", label: "Founders" },
];

export function PublicNav() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-16">
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-display-fam)" }}
      >
        zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
      </Link>
      <nav
        className="hidden items-center gap-9 text-sm md:flex"
        style={{ color: "var(--zk-fg-muted)" }}
      >
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="zk-link">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/contact"
        className="zk-link rounded-full px-5 py-2.5 text-sm font-semibold"
        style={{
          background: "linear-gradient(120deg, var(--zk-accent1), var(--zk-accent2))",
          color: "oklch(0.14 0.02 205)",
        }}
      >
        Start a Project
      </Link>
    </header>
  );
}
