import { prisma } from "@/lib/db";

export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ZNK-${year}-`;

  const last = await prisma.invoice.findFirst({
    where: { invoiceNumber: { startsWith: prefix } },
    orderBy: { invoiceNumber: "desc" },
  });

  const lastSeq = last ? parseInt(last.invoiceNumber.slice(prefix.length), 10) : 0;
  const nextSeq = (Number.isFinite(lastSeq) ? lastSeq : 0) + 1;
  return `${prefix}${String(nextSeq).padStart(4, "0")}`;
}

export function calculateInvoiceTotals(
  items: { quantity: number; unitPrice: number }[],
  taxRate: number
) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;
  return { subtotal, taxAmount, total };
}

export function formatCurrency(amount: number, currency = "INR") {
  const locale = currency === "SAR" ? "en-SA" : "en-IN";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
}
