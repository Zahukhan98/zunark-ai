"use client";

import { useState } from "react";

type ClientOption = {
  id: string;
  name: string;
  address: string | null;
};

type ProjectOption = {
  id: string;
  name: string;
  cost: number;
  client: ClientOption;
};

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>{label}</span>
      {children}
    </label>
  );
}

export function ContractFields({
  projects,
  initialProjectId,
  initialRecipientName,
}: {
  projects: ProjectOption[];
  initialProjectId: string;
  initialRecipientName: string;
}) {
  const initialProject = projects.find((p) => p.id === initialProjectId);

  const [projectId, setProjectId] = useState(initialProjectId);
  const [clientId, setClientId] = useState(initialProject?.client.id || "");
  const [recipientName, setRecipientName] = useState(initialRecipientName || initialProject?.client.name || "");
  const [recipientAddress, setRecipientAddress] = useState(initialProject?.client.address || "");
  const [contractCost, setContractCost] = useState(initialProject?.cost || 0);
  const [contractCurrency, setContractCurrency] = useState("SAR");

  function onSelectProject(id: string) {
    setProjectId(id);
    if (!id) return;
    const p = projects.find((p) => p.id === id);
    if (!p) return;
    setClientId(p.client.id);
    setRecipientName(p.client.name);
    setRecipientAddress(p.client.address || "");
    setContractCost(p.cost);
  }

  return (
    <>
      <input type="hidden" name="projectId" value={projectId} readOnly />
      <input type="hidden" name="clientId" value={clientId} readOnly />

      <Field label="Select existing project (optional)">
        <select value={projectId} onChange={(e) => onSelectProject(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
          <option value="">— Not in the system, enter manually below —</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name} — {p.client.name}</option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Company / client name *">
          <input name="recipientName" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Cost *">
          <div className="flex gap-2">
            <select value={contractCurrency} onChange={(e) => setContractCurrency(e.target.value)} name="contractCurrency" className="rounded-lg border px-2 py-2.5 text-sm outline-none" style={inputStyle}>
              <option value="SAR">SAR</option>
              <option value="INR">INR</option>
            </select>
            <input
              type="number"
              min={0}
              step="0.01"
              required
              name="contractCost"
              value={contractCost}
              onChange={(e) => setContractCost(Number(e.target.value))}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </Field>
        <Field label="Project start date *">
          <input name="projectStartDate" type="date" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Delivery date *">
          <input name="projectDeliveryDate" type="date" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
      </div>

      <Field label="Company / client address">
        <textarea name="recipientAddress" rows={2} value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
      </Field>
    </>
  );
}
