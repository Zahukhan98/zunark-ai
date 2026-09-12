import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { PROJECT_STATUSES } from "@/lib/projects";
import { redirect } from "next/navigation";
import type { Role, ProjectStatus } from "@prisma/client";

async function createProject(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_PROJECTS")) {
    throw new Error("Not authorized");
  }

  const clientId = String(formData.get("clientId") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const status = String(formData.get("status") || "NEW") as ProjectStatus;
  const timeline = String(formData.get("timeline") || "").trim();
  const budgetRaw = String(formData.get("budget") || "").trim();
  const clientPriceRaw = String(formData.get("clientPrice") || "").trim();
  const estimatedCostRaw = String(formData.get("estimatedCost") || "").trim();

  if (!clientId || !name || !type) {
    throw new Error("Client, project name and type are required");
  }
  if (!PROJECT_STATUSES.includes(status)) throw new Error("Invalid status");

  const project = await prisma.project.create({
    data: {
      clientId,
      name,
      type,
      description: description || null,
      status,
      timeline: timeline || null,
      budget: budgetRaw ? Number(budgetRaw) : null,
      clientPrice: clientPriceRaw ? Number(clientPriceRaw) : null,
      estimatedCost: estimatedCostRaw ? Number(estimatedCostRaw) : null,
    },
  });

  redirect(`/dashboard/projects/${project.id}`);
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

export default async function NewProjectPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_PROJECTS")) {
    redirect("/dashboard");
  }

  const clients = await prisma.client.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>New Project</h1>
      <p className="mb-6 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
        For projects that didn&apos;t come through a public inquiry — add one directly against an existing client.
      </p>

      {clients.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
          No clients yet — <Link href="/dashboard/clients" className="zk-link" style={{ color: "var(--zk-accent1)" }}>add a client first</Link>, then come back here.
        </p>
      ) : (
        <form action={createProject} className="flex max-w-2xl flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Client *">
              <select name="clientId" required defaultValue="" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
                <option value="" disabled>Select a client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}{c.company ? ` — ${c.company}` : ""}</option>
                ))}
              </select>
            </Field>
            <Field label="Project name *">
              <input name="name" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
            <Field label="Type *">
              <input name="type" required placeholder="e.g. Website, Custom Software, AI Solution" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
            <Field label="Status">
              <select name="status" defaultValue="NEW" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                ))}
              </select>
            </Field>
            <Field label="Timeline">
              <input name="timeline" placeholder="e.g. 6 weeks" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
          </div>

          <Field label="Description">
            <textarea name="description" rows={3} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Budget">
              <input name="budget" type="number" min={0} step="0.01" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
            <Field label="Client price">
              <input name="clientPrice" type="number" min={0} step="0.01" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
            <Field label="Estimated cost">
              <input name="estimatedCost" type="number" min={0} step="0.01" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </Field>
          </div>

          <button
            type="submit"
            className="w-fit rounded-full px-6 py-3 text-sm font-semibold"
            style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
          >
            Create Project
          </button>
        </form>
      )}
    </div>
  );
}
