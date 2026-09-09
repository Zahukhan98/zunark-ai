import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { calculateInvoiceTotals, formatCurrency } from "@/lib/invoice";
import { redirect } from "next/navigation";
import type { Role, InvoiceStatus } from "@prisma/client";

function statusStyle(status: InvoiceStatus): React.CSSProperties {
  switch (status) {
    case "DRAFT":
      return { background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)", borderColor: "var(--zk-border)" };
    case "SENT":
      return { background: "oklch(0.55 0.18 255 / 0.12)", color: "oklch(0.55 0.18 255)", borderColor: "oklch(0.55 0.18 255 / 0.35)" };
    case "PAID":
      return { background: "oklch(0.6 0.15 150 / 0.15)", color: "oklch(0.5 0.15 150)", borderColor: "oklch(0.6 0.15 150 / 0.35)" };
    case "OVERDUE":
      return { background: "oklch(0.6 0.2 30 / 0.15)", color: "oklch(0.5 0.2 30)", borderColor: "oklch(0.6 0.2 30 / 0.35)" };
    case "CANCELLED":
      return { background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)", borderColor: "var(--zk-border)", opacity: 0.7 };
  }
}

export default async function InvoicesPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    redirect("/dashboard");
  }

  const invoices = await prisma.invoice.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Invoices</h1>
        <Link
          href="/dashboard/invoices/new"
          className="rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          + New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No invoices yet.</p>
      ) : (
        <div className="overflow-hidden overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--zk-border)" }}>
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left" style={{ background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)" }}>
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const { total } = calculateInvoiceTotals(
                  inv.items.map((i) => ({ quantity: Number(i.quantity), unitPrice: Number(i.unitPrice) })),
                  Number(inv.taxRate)
                );
                return (
                  <tr key={inv.id} className="border-t" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/dashboard/invoices/${inv.id}`} className="zk-link" style={{ color: "var(--zk-accent1)" }}>
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{inv.clientName}</td>
                    <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{inv.projectName || "—"}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(total, inv.currency)}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border px-2.5 py-1 text-xs font-semibold" style={statusStyle(inv.status)}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{inv.issueDate.toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
