import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import type { Role, SignedBy, LetterType } from "@prisma/client";
import { FOUNDERS } from "@/lib/content";
import { ContractFields } from "@/components/dashboard/ContractFields";

async function createLetter(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    throw new Error("Not authorized");
  }

  const subject = String(formData.get("subject") || "").trim();
  const recipientName = String(formData.get("recipientName") || "").trim();
  const recipientAddress = String(formData.get("recipientAddress") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const signedBy = String(formData.get("signedBy") || "ZAHID") as SignedBy;
  const letterDateRaw = String(formData.get("letterDate") || "");
  const type = String(formData.get("type") || "GENERAL") as LetterType;
  const projectId = String(formData.get("projectId") || "").trim();
  const clientId = String(formData.get("clientId") || "").trim();

  if (!subject || !body) {
    throw new Error("A subject and body are required");
  }
  if (type !== "CONTRACT" && !["ZAHID", "KAMAR"].includes(signedBy)) {
    throw new Error("Invalid signer");
  }

  let contractCost: number | null = null;
  let contractCurrency: string | null = null;
  let projectStartDate: Date | null = null;
  let projectDeliveryDate: Date | null = null;

  if (type === "CONTRACT") {
    const costRaw = String(formData.get("contractCost") || "");
    const startRaw = String(formData.get("projectStartDate") || "");
    const deliveryRaw = String(formData.get("projectDeliveryDate") || "");
    contractCost = Number(costRaw);
    contractCurrency = String(formData.get("contractCurrency") || "SAR").trim();
    if (!recipientName || !startRaw || !deliveryRaw || !Number.isFinite(contractCost) || contractCost <= 0) {
      throw new Error("Company name, start date, delivery date and cost are required for a contract letter");
    }
    projectStartDate = new Date(startRaw);
    projectDeliveryDate = new Date(deliveryRaw);
  }

  const letter = await prisma.letter.create({
    data: {
      subject,
      recipientName: recipientName || null,
      recipientAddress: recipientAddress || null,
      body,
      signedBy,
      type: type === "CONTRACT" ? "CONTRACT" : "GENERAL",
      projectId: projectId || null,
      clientId: clientId || null,
      contractCost,
      contractCurrency,
      projectStartDate,
      projectDeliveryDate,
      letterDate: letterDateRaw ? new Date(letterDateRaw) : new Date(),
      createdById: session.user.id,
    },
  });

  redirect(`/dashboard/letters/${letter.id}`);
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

const CONTRACT_TEMPLATE = `Scope of Work:
- `;

export default async function NewLetterPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId?: string; type?: string; subject?: string; recipientName?: string }>;
}) {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const isContract = params.type === "CONTRACT";
  const today = new Date().toISOString().slice(0, 10);

  const projects = isContract
    ? await prisma.project.findMany({ include: { client: true }, orderBy: { name: "asc" } })
    : [];
  const projectOptions = projects.map((p) => ({
    id: p.id,
    name: p.name,
    cost: Number(p.clientPrice ?? p.estimatedCost ?? 0),
    client: { id: p.client.id, name: p.client.name, address: p.client.address },
  }));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
        {isContract ? "New Contract Letter" : "New Letter"}
      </h1>
      {isContract && (
        <p className="mb-6 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
          Pick the project (or enter the company manually), fill in dates and cost, and describe the scope of work — the rest of the agreement, and both founders&apos; signatures, are generated automatically.
        </p>
      )}
      {!isContract && <div className="mb-6" />}

      <form action={createLetter} className="flex max-w-2xl flex-col gap-4">
        <input type="hidden" name="type" value={isContract ? "CONTRACT" : "GENERAL"} />

        {isContract ? (
          <ContractFields
            projects={projectOptions}
            initialProjectId={params.projectId || ""}
            initialRecipientName={params.recipientName || ""}
          />
        ) : (
          params.projectId && <input type="hidden" name="projectId" value={params.projectId} />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Subject *">
            <input name="subject" required defaultValue={params.subject || ""} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Date">
            <input name="letterDate" type="date" defaultValue={today} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          {!isContract && (
            <>
              <Field label="Recipient name (optional)">
                <input name="recipientName" defaultValue={params.recipientName || ""} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
              </Field>
              <Field label="Signed by">
                <select name="signedBy" required defaultValue="ZAHID" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
                  <option value="ZAHID">{FOUNDERS[0].name} — {FOUNDERS[0].role}</option>
                  <option value="KAMAR">{FOUNDERS[1].name} — {FOUNDERS[1].role}</option>
                </select>
              </Field>
            </>
          )}
        </div>

        {!isContract && (
          <Field label="Recipient address (optional)">
            <textarea name="recipientAddress" rows={2} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
        )}

        <Field label={isContract ? "Scope of work *" : "Letter body *"}>
          <textarea
            name="body"
            required
            rows={isContract ? 8 : 14}
            defaultValue={isContract ? CONTRACT_TEMPLATE : ""}
            placeholder="Dear [Name],&#10;&#10;..."
            className="rounded-lg border px-3 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </Field>

        <button
          type="submit"
          className="w-fit rounded-full px-6 py-3 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          {isContract ? "Create Contract Letter" : "Create Letter"}
        </button>
      </form>
    </div>
  );
}
