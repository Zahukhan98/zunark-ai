import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { generateInvoiceNumber } from "@/lib/invoice";
import { BANK_DETAILS } from "@/lib/content";
import { InvoiceItemsEditor } from "@/components/dashboard/InvoiceItemsEditor";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";

async function createInvoice(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    throw new Error("Not authorized");
  }

  const clientName = String(formData.get("clientName") || "").trim();
  const clientCompany = String(formData.get("clientCompany") || "").trim();
  const clientEmail = String(formData.get("clientEmail") || "").trim();
  const clientAddress = String(formData.get("clientAddress") || "").trim();
  const projectName = String(formData.get("projectName") || "").trim();
  const dueDateRaw = String(formData.get("dueDate") || "");
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
      clientName,
      clientCompany: clientCompany || null,
      clientEmail: clientEmail || null,
      clientAddress: clientAddress || null,
      projectName: projectName || null,
      dueDate: dueDateRaw ? new Date(dueDateRaw) : null,
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

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>{label}</span>
      {children}
    </label>
  );
}

const defaultPaymentDetails = `${BANK_DETAILS.bankName}\nAccount Holder: ${BANK_DETAILS.accountHolder}\nAccount Number: ${BANK_DETAILS.accountNumber}\nIFSC: ${BANK_DETAILS.ifsc}`;

export default async function NewInvoicePage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_INVOICES")) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>New Invoice</h1>

      <form action={createInvoice} className="flex max-w-3xl flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Client name *">
            <input name="clientName" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Client company">
            <input name="clientCompany" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Client email">
            <input name="clientEmail" type="email" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Project name">
            <input name="projectName" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Client address">
              <textarea name="clientAddress" rows={2} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
          </div>
          <Field label="Due date">
            <input name="dueDate" type="date" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Line items</h2>
          <InvoiceItemsEditor />
        </div>

        <Field label="Payment details (shown on the invoice)">
          <textarea name="paymentDetails" rows={4} defaultValue={defaultPaymentDetails} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>

        <Field label="Notes / terms (optional)">
          <textarea name="notes" rows={3} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>

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
