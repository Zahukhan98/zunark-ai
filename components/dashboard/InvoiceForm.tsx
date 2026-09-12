"use client";

import { useState } from "react";

type Item = { description: string; quantity: number; unitPrice: number };

type ClientOption = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  address: string | null;
  vatNumber: string | null;
};

type ProjectOption = {
  id: string;
  name: string;
  clientId: string;
  cost: number;
  client: ClientOption;
};

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };
const currencySymbol: Record<string, string> = { SAR: "SAR", INR: "₹" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>{label}</span>
      {children}
    </label>
  );
}

export function InvoiceForm({
  clients,
  projects,
  defaultPaymentDetails,
}: {
  clients: ClientOption[];
  projects: ProjectOption[];
  defaultPaymentDetails: string;
}) {
  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [buyerVatNumber, setBuyerVatNumber] = useState("");
  const [projectName, setProjectName] = useState("");
  const [items, setItems] = useState<Item[]>([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [currency, setCurrency] = useState("SAR");

  function applyClient(c: ClientOption) {
    setClientId(c.id);
    setClientName(c.name);
    setClientCompany(c.company || "");
    setClientEmail(c.email || "");
    setClientAddress(c.address || "");
    setBuyerVatNumber(c.vatNumber || "");
  }

  function onSelectClient(id: string) {
    if (!id) {
      setClientId("");
      return;
    }
    const c = clients.find((c) => c.id === id);
    if (c) applyClient(c);
  }

  function onSelectProject(id: string) {
    setProjectId(id);
    if (!id) return;
    const p = projects.find((p) => p.id === id);
    if (!p) return;
    applyClient(p.client);
    setProjectName(p.name);

    const isDefaultItems = items.length === 1 && !items[0].description && items[0].unitPrice === 0;
    if (isDefaultItems) {
      setItems([{ description: p.name, quantity: 1, unitPrice: p.cost }]);
    }
  }

  function updateItem(index: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  const subtotal = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;
  const symbol = currencySymbol[currency] || currency;

  return (
    <>
      <input type="hidden" name="clientId" value={clientId} readOnly />
      <input type="hidden" name="projectId" value={projectId} readOnly />
      <input type="hidden" name="itemsJson" value={JSON.stringify(items)} readOnly />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Select existing client (optional)">
          <select value={clientId} onChange={(e) => onSelectClient(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
            <option value="">— Type manually below —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}{c.company ? ` — ${c.company}` : ""}</option>
            ))}
          </select>
        </Field>
        <Field label="Select existing project (optional)">
          <select value={projectId} onChange={(e) => onSelectProject(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
            <option value="">— None —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {p.client.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Client name *">
          <input name="clientName" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Client company">
          <input name="clientCompany" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Client email">
          <input name="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Project name">
          <input name="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Client address">
            <textarea name="clientAddress" rows={2} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
        </div>
        <Field label="Buyer VAT number (optional)">
          <input name="buyerVatNumber" value={buyerVatNumber} onChange={(e) => setBuyerVatNumber(e.target.value)} placeholder="Leave blank if the client isn't VAT-registered" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Due date">
          <input name="dueDate" type="date" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Line items</h2>
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 rounded-lg border p-3 sm:grid-cols-[1fr_90px_120px_auto]" style={{ borderColor: "var(--zk-border)" }}>
              <input
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                style={inputStyle}
              />
              <input
                type="number"
                min={0}
                step="0.01"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                style={inputStyle}
              />
              <input
                type="number"
                min={0}
                step="0.01"
                placeholder="Unit price"
                value={item.unitPrice}
                onChange={(e) => updateItem(index, { unitPrice: Number(e.target.value) })}
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-lg border px-3 py-2 text-xs font-medium"
                style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-3 rounded-lg border px-4 py-2 text-sm font-medium"
          style={{ borderColor: "var(--zk-border)", color: "var(--zk-accent1)" }}
        >
          + Add line item
        </button>

        <div className="mt-5 flex flex-wrap items-end justify-end gap-4 border-t pt-4" style={{ borderColor: "var(--zk-border)" }}>
          <label className="flex items-center gap-2 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            Currency
            <select name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-lg border px-3 py-1.5 text-sm outline-none" style={inputStyle}>
              <option value="SAR">SAR</option>
              <option value="INR">INR</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            VAT rate (%)
            <input
              type="number"
              min={0}
              step="0.01"
              name="taxRate"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-24 rounded-lg border px-3 py-1.5 text-sm outline-none"
              style={inputStyle}
            />
          </label>
        </div>
        <div className="mt-2 flex flex-col items-end gap-1">
          <div className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>Subtotal: {symbol} {subtotal.toFixed(2)}</div>
          <div className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>VAT: {symbol} {taxAmount.toFixed(2)}</div>
          <div className="text-base font-bold">Total: {symbol} {total.toFixed(2)}</div>
        </div>
      </div>

      <Field label="Payment details (shown on the invoice)">
        <textarea name="paymentDetails" rows={4} defaultValue={defaultPaymentDetails} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
      </Field>

      <Field label="Notes / terms (optional)">
        <textarea name="notes" rows={3} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
      </Field>
    </>
  );
}
