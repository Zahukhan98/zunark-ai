import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { ContractFields } from "@/components/dashboard/ContractFields";
import { createLetter } from "@/lib/letters";

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>{label}</span>
      {children}
    </label>
  );
}

const SCOPE_OF_WORK_TEMPLATE = `Scope of Work:
- `;

export default async function NewContractPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId?: string; subject?: string; recipientName?: string }>;
}) {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const today = new Date().toISOString().slice(0, 10);

  const projects = await prisma.project.findMany({ include: { client: true }, orderBy: { name: "asc" } });
  const projectOptions = projects.map((p) => ({
    id: p.id,
    name: p.name,
    cost: Number(p.clientPrice ?? p.estimatedCost ?? 0),
    client: { id: p.client.id, name: p.client.name, address: p.client.address },
  }));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>New Contract</h1>
      <p className="mb-6 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
        Pick the project (or enter the company manually), fill in dates and cost, and describe the scope of work — the rest of the agreement, and both founders&apos; signatures, are generated automatically.
      </p>

      <form action={createLetter} className="flex max-w-2xl flex-col gap-4">
        <input type="hidden" name="type" value="CONTRACT" />

        <ContractFields
          projects={projectOptions}
          initialProjectId={params.projectId || ""}
          initialRecipientName={params.recipientName || ""}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Subject *">
            <input name="subject" required defaultValue={params.subject || ""} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Date">
            <input name="letterDate" type="date" defaultValue={today} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
        </div>

        <Field label="Scope of work *">
          <textarea
            name="body"
            required
            rows={8}
            defaultValue={SCOPE_OF_WORK_TEMPLATE}
            className="rounded-lg border px-3 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </Field>

        <button
          type="submit"
          className="w-fit rounded-full px-6 py-3 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          Create Contract
        </button>
      </form>
    </div>
  );
}
