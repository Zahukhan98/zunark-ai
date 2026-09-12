import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { calculateInvoiceTotals, formatCurrency } from "@/lib/invoice";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Role, InvoiceStatus } from "@prisma/client";

const STATUSES: InvoiceStatus[] = ["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"];

async function updateStatus(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    throw new Error("Not authorized");
  }
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as InvoiceStatus;
  if (!STATUSES.includes(status)) throw new Error("Invalid status");

  await prisma.invoice.update({ where: { id }, data: { status } });
  revalidatePath(`/dashboard/invoices/${id}`);
}

async function deleteInvoice(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    throw new Error("Not authorized");
  }
  const id = String(formData.get("id"));
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice || invoice.status !== "DRAFT") {
    throw new Error("Only draft invoices can be deleted");
  }
  await prisma.invoice.delete({ where: { id } });
  redirect("/dashboard/invoices");
}

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    redirect("/dashboard");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { items: { orderBy: { order: "asc" } }, createdBy: true },
  });
  if (!invoice) notFound();

  const { subtotal, taxAmount, total } = calculateInvoiceTotals(
    invoice.items.map((i) => ({ quantity: Number(i.quantity), unitPrice: Number(i.unitPrice) })),
    Number(invoice.taxRate)
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{invoice.invoiceNumber}</h1>
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>{invoice.clientName}{invoice.clientCompany ? ` · ${invoice.clientCompany}` : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/print/invoices/${invoice.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-4 py-2 text-sm font-medium"
            style={{ borderColor: "var(--zk-border)", color: "var(--zk-accent1)" }}
          >
            Open printable version →
          </a>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <form action={updateStatus} className="flex items-center gap-2">
            <input type="hidden" name="id" value={invoice.id} />
            <select name="status" defaultValue={invoice.status} className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)", color: "var(--zk-fg)" }}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button type="submit" className="rounded-full border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
              Update status
            </button>
          </form>
          {invoice.status === "DRAFT" && (
            <form action={deleteInvoice}>
              <input type="hidden" name="id" value={invoice.id} />
              <button type="submit" className="rounded-full border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "oklch(0.6 0.2 30 / 0.4)", color: "oklch(0.5 0.2 30)" }}>
                Delete draft
              </button>
            </form>
          )}
        </div>

        <p className="mb-1 text-sm" style={{ color: "var(--zk-fg-muted)" }}>Issued: {invoice.issueDate.toLocaleString()}</p>
        {invoice.projectName && (
          <p className="mb-1 text-sm"><span style={{ color: "var(--zk-fg-muted)" }}>Project: </span>{invoice.projectName}</p>
        )}
        <p className="mb-3 text-sm"><span style={{ color: "var(--zk-fg-muted)" }}>Buyer VAT No: </span>{invoice.buyerVatNumber || "N/A"}</p>

        <div className="overflow-hidden overflow-x-auto rounded-xl border" style={{ borderColor: "var(--zk-border)" }}>
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-left" style={{ background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)" }}>
              <tr>
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5">Qty</th>
                <th className="px-4 py-2.5">Unit Price</th>
                <th className="px-4 py-2.5">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-t" style={{ borderColor: "var(--zk-border)" }}>
                  <td className="px-4 py-2.5">{item.description}</td>
                  <td className="px-4 py-2.5">{Number(item.quantity)}</td>
                  <td className="px-4 py-2.5">{formatCurrency(Number(item.unitPrice), invoice.currency)}</td>
                  <td className="px-4 py-2.5">{formatCurrency(Number(item.quantity) * Number(item.unitPrice), invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col items-end gap-1 text-sm">
          <div style={{ color: "var(--zk-fg-muted)" }}>Subtotal: {formatCurrency(subtotal, invoice.currency)}</div>
          <div style={{ color: "var(--zk-fg-muted)" }}>VAT ({Number(invoice.taxRate)}%): {formatCurrency(taxAmount, invoice.currency)}</div>
          <div className="text-base font-bold">Total: {formatCurrency(total, invoice.currency)}</div>
        </div>
      </div>

      <Link href="/dashboard/invoices" className="zk-link text-sm font-medium" style={{ color: "var(--zk-accent1)" }}>
        ← Back to invoices
      </Link>
    </div>
  );
}
