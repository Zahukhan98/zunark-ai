"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-6 py-6 md:px-10">
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-display-fam)" }}
      >
        zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
      </Link>

      <nav
        className="hidden items-center gap-6 text-sm lg:flex"
        style={{ color: "var(--zk-fg-muted)" }}
      >
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="zk-link">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="zk-link hidden rounded-full px-5 py-2.5 text-sm font-semibold sm:block"
          style={{
            background: "var(--zk-accent1)",
            color: "oklch(1 0 0)",
          }}
        >
          Discuss Your Project
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden"
          style={{ borderColor: "var(--zk-border)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <div
        className="fixed inset-0 z-40 transition-opacity duration-300 lg:hidden"
        style={{
          background: "oklch(0 0 0 / 0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-1 border-l p-6 transition-transform duration-300 lg:hidden"
        style={{
          background: "var(--zk-panel)",
          borderColor: "var(--zk-border)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border"
            style={{ borderColor: "var(--zk-border)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="zk-link rounded-lg px-3 py-3 text-base"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="zk-link mt-4 rounded-full px-5 py-3 text-center text-sm font-semibold"
          style={{
            background: "var(--zk-accent1)",
            color: "oklch(1 0 0)",
          }}
        >
          Discuss Your Project
        </Link>
      </div>
    </header>
  );
}
