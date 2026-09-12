import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { getMyMeetingBanner } from "@/lib/meetings";
import { MailIcon, UsersIcon, FolderIcon, ArrowRightIcon } from "@/components/public/icons";

function formatTimeUntil(target: Date): string {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return "now";
  const minutes = Math.round(ms / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function MeetingBanner({
  ongoing,
  upcoming,
}: {
  ongoing: { id: string; title: string } | null;
  upcoming: { id: string; title: string; scheduledAt: Date | null } | null;
}) {
  if (!ongoing && !upcoming) return null;

  if (ongoing) {
    return (
      <div
        className="mb-7 flex items-center justify-between rounded-2xl border p-5"
        style={{ borderColor: "var(--zk-accent1)", background: "var(--zk-panel)" }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
            🔴 Ongoing meeting
          </p>
          <p className="mt-1 text-lg font-semibold">{ongoing.title}</p>
        </div>
        <Link
          href={`/call/${ongoing.id}`}
          className="zk-link rounded-lg px-5 py-2.5 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          Join now
        </Link>
      </div>
    );
  }

  return (
    <div
      className="mb-7 flex items-center justify-between rounded-2xl border p-5"
      style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--zk-fg-muted)" }}>
          Upcoming meeting
        </p>
        <p className="mt-1 text-lg font-semibold">{upcoming!.title}</p>
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
          Starts in {formatTimeUntil(upcoming!.scheduledAt!)}
        </p>
      </div>
      <Link
        href={`/dashboard/meetings/${upcoming!.id}`}
        className="zk-link rounded-lg border px-5 py-2.5 text-sm font-medium"
        style={{ borderColor: "var(--zk-border)" }}
      >
        View
      </Link>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}) {
  const content = (
    <div
      className="flex items-center justify-between rounded-2xl border p-5"
      style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
    >
      <div>
        <p className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>{label}</p>
        <p className="mt-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{value}</p>
      </div>
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="zk-link block">
      {content}
    </Link>
  ) : (
    content
  );
}

function QuickAction({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="zk-link flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-medium"
      style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
    >
      {label}
      <span style={{ color: "var(--zk-accent1)" }}>
        <ArrowRightIcon />
      </span>
    </Link>
  );
}

export default async function DashboardHome() {
  const session = await auth();
  const role = session!.user.role as "SUPER_ADMIN" | "ADMIN" | "DEVELOPER";

  const [clientCount, activeProjects, newInquiries, meetingBanner] = await Promise.all([
    prisma.client.count(),
    prisma.project.count({ where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    getMyMeetingBanner(session!.user.id),
  ]);

  const canViewInquiries = hasPermission(role, "VIEW_INQUIRIES");

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
        Overview
      </h1>
      <p className="mb-7 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
        Welcome back, {session!.user.name?.split(" ")[0] || "there"}.
      </p>

      <MeetingBanner ongoing={meetingBanner.ongoing} upcoming={meetingBanner.upcoming} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Clients" value={clientCount} icon={UsersIcon} href="/dashboard/clients" />
        <StatCard label="Active Projects" value={activeProjects} icon={FolderIcon} href="/dashboard/projects" />
        {canViewInquiries ? (
          <StatCard label="New Inquiries" value={newInquiries} icon={MailIcon} href="/dashboard/inquiries" />
        ) : (
          <StatCard label="New Inquiries" value={newInquiries} icon={MailIcon} />
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
          Quick actions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction label="Start or schedule a meeting" href="/dashboard/meetings" />
          {canViewInquiries && <QuickAction label="Review new inquiries" href="/dashboard/inquiries" />}
          <QuickAction label="View clients" href="/dashboard/clients" />
          {hasPermission(role, "MANAGE_PROJECTS") ? (
            <QuickAction label="Add a project" href="/dashboard/projects/new" />
          ) : (
            <QuickAction label="View projects" href="/dashboard/projects" />
          )}
          {hasPermission(role, "MANAGE_INVOICES") && <QuickAction label="Create an invoice" href="/dashboard/invoices/new" />}
          {hasPermission(role, "MANAGE_LETTERS") && <QuickAction label="Write a letter" href="/dashboard/letters/new" />}
          {hasPermission(role, "MANAGE_LETTERS") && <QuickAction label="Draft a contract" href="/dashboard/contracts/new" />}
          {hasPermission(role, "MANAGE_USERS") && <QuickAction label="Manage team users" href="/dashboard/users" />}
        </div>
      </div>

      {hasPermission(role, "VIEW_BILLING_AND_COSTS") && (
        <div className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
            Finance
          </h2>
          <div className="rounded-xl border p-5 text-sm" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)", color: "var(--zk-fg-muted)" }}>
            Billing and cost tracking ships in Phase 2 — visible only to Super Admin.
          </div>
        </div>
      )}
    </div>
  );
}
