import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { generateInvoiceNumber } from "@/lib/invoice";
import { BANK_DETAILS } from "@/lib/content";
import { InvoiceForm } from "@/components/dashboard/InvoiceForm";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";

async function createInvoice(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    throw new Error("Not authorized");
  }

  const clientId = String(formData.get("clientId") || "").trim();
  const projectId = String(formData.get("projectId") || "").trim();
  const clientName = String(formData.get("clientName") || "").trim();
  const clientCompany = String(formData.get("clientCompany") || "").trim();
  const clientEmail = String(formData.get("clientEmail") || "").trim();
  const clientAddress = String(formData.get("clientAddress") || "").trim();
  const buyerVatNumber = String(formData.get("buyerVatNumber") || "").trim();
  const projectName = String(formData.get("projectName") || "").trim();
  const dueDateRaw = String(formData.get("dueDate") || "");
  const currency = String(formData.get("currency") || "SAR").trim();
  const taxRate = Number(formData.get("taxRate") || 0);
  const notes = String(formData.get("notes") || "").trim();
  const paymentDetails = String(formData.get("paymentDetails") || "").trim();

  let items: { description: string; quantity: number; unitPrice: number }[] = [];
  try {
    items = JSON.parse(String(formData.get("itemsJson") || "[]"));
  } catch {
    items = [];
  }
  items = items
    .map((i) => ({ description: String(i.description || "").trim(), quantity: Number(i.quantity) || 0, unitPrice: Number(i.unitPrice) || 0 }))
    .filter((i) => i.description.length > 0 && i.quantity > 0);

  if (!clientName || items.length === 0) {
    throw new Error("A client name and at least one valid line item are required");
  }

  const invoiceNumber = await generateInvoiceNumber();

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      clientId: clientId || null,
      projectId: projectId || null,
      clientName,
      clientCompany: clientCompany || null,
      clientEmail: clientEmail || null,
      clientAddress: clientAddress || null,
      buyerVatNumber: buyerVatNumber || null,
      projectName: projectName || null,
      dueDate: dueDateRaw ? new Date(dueDateRaw) : null,
      currency: currency || "SAR",
      taxRate,
      notes: notes || null,
      paymentDetails: paymentDetails || null,
      createdById: session.user.id,
      items: {
        create: items.map((item, index) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          order: index,
        })),
      },
    },
  });

  redirect(`/dashboard/invoices/${invoice.id}`);
}

const defaultPaymentDetails = `${BANK_DETAILS.bankName}\nAccount Holder: ${BANK_DETAILS.accountHolder}\nAccount Number: ${BANK_DETAILS.accountNumber}\nIFSC: ${BANK_DETAILS.ifsc}`;

export default async function NewInvoicePage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    redirect("/dashboard");
  }

  const [clients, projects] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ include: { client: true }, orderBy: { name: "asc" } }),
  ]);

  const clientOptions = clients.map((c) => ({
    id: c.id,
    name: c.name,
    company: c.company,
    email: c.email,
    address: c.address,
    vatNumber: c.vatNumber,
  }));

  const projectOptions = projects.map((p) => ({
    id: p.id,
    name: p.name,
    clientId: p.clientId,
    cost: Number(p.clientPrice ?? p.estimatedCost ?? 0),
    client: {
      id: p.client.id,
      name: p.client.name,
      company: p.client.company,
      email: p.client.email,
      address: p.client.address,
      vatNumber: p.client.vatNumber,
    },
  }));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>New Invoice</h1>

      <form action={createInvoice} className="flex max-w-3xl flex-col gap-6">
        <InvoiceForm clients={clientOptions} projects={projectOptions} defaultPaymentDetails={defaultPaymentDetails} />

        <button
          type="submit"
          className="w-fit rounded-full px-6 py-3 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
}
