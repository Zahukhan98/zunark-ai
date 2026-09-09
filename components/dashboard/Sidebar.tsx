"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GridIcon, MailIcon, UsersIcon, FolderIcon, PersonIcon, InvoiceIcon, DocumentIcon } from "@/components/public/icons";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: GridIcon, exact: true },
  { href: "/dashboard/inquiries", label: "Inquiries", icon: MailIcon, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/dashboard/clients", label: "Clients", icon: UsersIcon },
  { href: "/dashboard/projects", label: "Projects", icon: FolderIcon },
  { href: "/dashboard/invoices", label: "Invoices", icon: InvoiceIcon, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/dashboard/letters", label: "Letters", icon: DocumentIcon, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/dashboard/users", label: "Users", icon: PersonIcon, roles: ["SUPER_ADMIN"] },
];

function NavLinks({ role, onNavigate }: { role: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role)).map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            style={{
              background: active ? "var(--zk-accent1)" : "transparent",
              color: active ? "oklch(1 0 0)" : "var(--zk-fg-muted)",
            }}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar({
  role,
  email,
  signOutAction,
}: {
  role: string;
  email: string;
  signOutAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  const footer = (
    <div className="border-t pt-4" style={{ borderColor: "var(--zk-border)" }}>
      <p className="truncate px-3 text-xs" style={{ color: "var(--zk-fg-muted)" }}>{email}</p>
      <p className="mb-3 px-3 text-xs" style={{ color: "var(--zk-fg-muted)", opacity: 0.7 }}>{role.replace("_", " ")}</p>
      <form action={signOutAction}>
        <button
          className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium"
          style={{ color: "var(--zk-fg-muted)" }}
        >
          Sign out
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="flex items-center justify-between border-b px-4 py-4 lg:hidden"
        style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
      >
        <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
          zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
        </span>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border"
          style={{ borderColor: "var(--zk-border)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300 lg:hidden"
        style={{ background: "oklch(0 0 0 / 0.6)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-1 p-5 transition-transform duration-300 lg:hidden"
        style={{ background: "var(--zk-panel)", transform: open ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
            zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
          </span>
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
        <NavLinks role={role} onNavigate={() => setOpen(false)} />
        {footer}
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r p-5 lg:flex"
        style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
      >
        <div className="mb-8 px-1 text-lg font-semibold" style={{ fontFamily: "var(--font-display-fam)" }}>
          zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
        </div>
        <NavLinks role={role} />
        {footer}
      </aside>
    </>
  );
}
