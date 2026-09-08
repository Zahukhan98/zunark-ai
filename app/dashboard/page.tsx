import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";

function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-50">{value}</p>
    </div>
  );
}

export default async function DashboardHome() {
  const session = await auth();
  const role = session!.user.role as "SUPER_ADMIN" | "ADMIN" | "DEVELOPER";

  const [clientCount, activeProjects, newInquiries] = await Promise.all([
    prisma.client.count(),
    prisma.project.count({ where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Clients" value={clientCount} />
        <StatTile label="Active Projects" value={activeProjects} />
        <StatTile label="New Inquiries" value={newInquiries} />
      </div>

      {hasPermission(role, "VIEW_BILLING_AND_COSTS") && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-zinc-400">Finance</h2>
          <p className="text-sm text-zinc-500">
            Billing and cost tracking ships in Phase 2 — visible only to Super Admin.
          </p>
        </div>
      )}
    </div>
  );
}
