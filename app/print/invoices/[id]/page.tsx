import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { calculateInvoiceTotals, formatCurrency } from "@/lib/invoice";
import { notFound, redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { PrintHeader } from "@/components/dashboard/PrintHeader";
import { PrintButton } from "@/components/dashboard/PrintButton";
import { COMPANY_LEGAL_NAME, COMPANY_ADDRESS, COMPANY_VAT_NUMBER, COMPANY_CR_NUMBER } from "@/lib/content";

export default async function PrintInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    redirect("/login");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { items: { orderBy: { order: "asc" } } },
  });
  if (!invoice) notFound();

  const { subtotal, taxAmount, total } = calculateInvoiceTotals(
    invoice.items.map((i) => ({ quantity: Number(i.quantity), unitPrice: Number(i.unitPrice) })),
    Number(invoice.taxRate)
  );

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <style>{`@media print { @page { size: A4; margin: 16mm; } }`}</style>
      <PrintButton />
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-20 sm:px-10 sm:py-14 print:px-0 print:py-0">
        <PrintHeader />

        <div className="mt-8 flex items-start justify-between">
          <div>
            <div className="text-2xl font-bold" style={{ color: "#0f1b2d" }}>TAX INVOICE</div>
            <div className="text-sm text-gray-500" dir="rtl">فاتورة ضريبية</div>
            <div className="mt-1 text-sm text-gray-500">{invoice.invoiceNumber}</div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Issue date: {invoice.issueDate.toLocaleString("en-IN")}</div>
            {invoice.dueDate && <div>Due date: {invoice.dueDate.toLocaleDateString("en-IN")}</div>}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">From</div>
            <div className="mt-1.5 text-sm font-semibold">{COMPANY_LEGAL_NAME}</div>
            {COMPANY_ADDRESS && <div className="whitespace-pre-wrap text-sm text-gray-600">{COMPANY_ADDRESS}</div>}
            <div className="mt-1 text-sm text-gray-600">VAT Registration No: {COMPANY_VAT_NUMBER || "Not yet VAT-registered"}</div>
            {COMPANY_CR_NUMBER && <div className="text-sm text-gray-600">CR No: {COMPANY_CR_NUMBER}</div>}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Bill to</div>
            <div className="mt-1.5 text-sm font-semibold">{invoice.clientName}</div>
            {invoice.clientCompany && <div className="text-sm text-gray-600">{invoice.clientCompany}</div>}
            {invoice.clientEmail && <div className="text-sm text-gray-600">{invoice.clientEmail}</div>}
            {invoice.clientAddress && <div className="whitespace-pre-wrap text-sm text-gray-600">{invoice.clientAddress}</div>}
            <div className="mt-1 text-sm text-gray-600">VAT No: {invoice.buyerVatNumber || "N/A"}</div>
          </div>
        </div>

        {invoice.projectName && (
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Project</div>
            <div className="mt-1.5 text-sm">{invoice.projectName}</div>
          </div>
        )}

        <table className="mt-10 w-full text-[11px] sm:text-sm">
          <thead>
            <tr className="border-b-2 text-left uppercase tracking-wide text-gray-400 whitespace-nowrap" style={{ borderColor: "#0f1b2d" }}>
              <th className="pb-2 pr-2 sm:pr-3">Description</th>
              <th className="pb-2 pr-2 sm:pr-3">Qty</th>
              <th className="pb-2 pr-2 sm:pr-3">Unit Price</th>
              <th className="pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200" style={{ breakInside: "avoid" }}>
                <td className="py-2 pr-2 sm:py-2.5 sm:pr-3">{item.description}</td>
                <td className="py-2 pr-2 sm:py-2.5 sm:pr-3">{Number(item.quantity)}</td>
                <td className="py-2 pr-2 whitespace-nowrap sm:py-2.5 sm:pr-3">{formatCurrency(Number(item.unitPrice), invoice.currency)}</td>
                <td className="py-2 text-right whitespace-nowrap sm:py-2.5">{formatCurrency(Number(item.quantity) * Number(item.unitPrice), invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex flex-col items-end gap-1 text-sm">
          <div className="flex w-56 justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal, invoice.currency)}</span></div>
          <div className="flex w-56 justify-between text-gray-600"><span>VAT ({Number(invoice.taxRate)}%)</span><span>{formatCurrency(taxAmount, invoice.currency)}</span></div>
          <div className="flex w-56 justify-between border-t pt-1.5 text-base font-bold" style={{ borderColor: "#0f1b2d" }}><span>Total</span><span>{formatCurrency(total, invoice.currency)}</span></div>
        </div>

        {invoice.paymentDetails && (
          <div className="mt-10 rounded-lg bg-gray-50 p-4 text-sm">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Payment details</div>
            <div className="whitespace-pre-wrap text-gray-700">{invoice.paymentDetails}</div>
          </div>
        )}

        {invoice.notes && (
          <div className="mt-6 text-sm">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Notes</div>
            <div className="whitespace-pre-wrap text-gray-700">{invoice.notes}</div>
          </div>
        )}

        <div className="mt-14 border-t pt-4 text-center text-xs text-gray-400" style={{ borderColor: "#e5e5e5" }}>
          Thank you for your business — ZUNARK
        </div>
      </div>
    </div>
  );
}
