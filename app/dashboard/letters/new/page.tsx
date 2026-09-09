import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import type { Role, SignedBy } from "@prisma/client";
import { FOUNDERS } from "@/lib/content";

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

  if (!subject || !body || !["ZAHID", "KAMAR"].includes(signedBy)) {
    throw new Error("A subject and body are required");
  }

  const letter = await prisma.letter.create({
    data: {
      subject,
      recipientName: recipientName || null,
      recipientAddress: recipientAddress || null,
      body,
      signedBy,
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

export default async function NewLetterPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/dashboard");
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>New Letter</h1>

      <form action={createLetter} className="flex max-w-2xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Subject *">
            <input name="subject" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Date">
            <input name="letterDate" type="date" defaultValue={today} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Recipient name (optional)">
            <input name="recipientName" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Signed by">
            <select name="signedBy" required defaultValue="ZAHID" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
              <option value="ZAHID">{FOUNDERS[0].name} — {FOUNDERS[0].role}</option>
              <option value="KAMAR">{FOUNDERS[1].name} — {FOUNDERS[1].role}</option>
            </select>
          </Field>
        </div>

        <Field label="Recipient address (optional)">
          <textarea name="recipientAddress" rows={2} className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>

        <Field label="Letter body *">
          <textarea name="body" required rows={12} placeholder="Dear [Name],&#10;&#10;..." className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>

        <button
          type="submit"
          className="w-fit rounded-full px-6 py-3 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          Create Letter
        </button>
      </form>
    </div>
  );
}
