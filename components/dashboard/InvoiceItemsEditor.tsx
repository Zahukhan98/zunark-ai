"use client";

import { useState } from "react";

type Item = { description: string; quantity: number; unitPrice: number };

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

export function InvoiceItemsEditor({ taxRateInputName = "taxRate" }: { taxRateInputName?: string }) {
  const [items, setItems] = useState<Item[]>([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [taxRate, setTaxRate] = useState(0);

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

  return (
    <div>
      <input type="hidden" name="itemsJson" value={JSON.stringify(items)} readOnly />

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

      <div className="mt-5 flex flex-col items-end gap-2 border-t pt-4" style={{ borderColor: "var(--zk-border)" }}>
        <label className="flex items-center gap-2 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
          Tax rate (%)
          <input
            type="number"
            min={0}
            step="0.01"
            name={taxRateInputName}
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="w-24 rounded-lg border px-3 py-1.5 text-sm outline-none"
            style={inputStyle}
          />
        </label>
        <div className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>Subtotal: ₹{subtotal.toFixed(2)}</div>
        <div className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>Tax: ₹{taxAmount.toFixed(2)}</div>
        <div className="text-base font-bold">Total: ₹{total.toFixed(2)}</div>
      </div>
    </div>
  );
}
