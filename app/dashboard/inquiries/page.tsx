import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Role, InquiryStatus } from "@prisma/client";

const STATUSES: InquiryStatus[] = ["NEW", "REVIEWED", "CONVERTED", "DECLINED"];

async function updateStatus(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "VIEW_INQUIRIES")) {
    throw new Error("Not authorized");
  }
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as InquiryStatus;
  if (!STATUSES.includes(status)) throw new Error("Invalid status");

  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard/inquiries");
}

function statusStyle(status: InquiryStatus): React.CSSProperties {
  switch (status) {
    case "NEW":
      return { background: "oklch(0.55 0.18 255 / 0.12)", color: "oklch(0.55 0.18 255)", borderColor: "oklch(0.55 0.18 255 / 0.35)" };
    case "REVIEWED":
      return { background: "var(--zk-accent2)", color: "oklch(1 0 0)", borderColor: "transparent", opacity: 0.9 };
    case "CONVERTED":
      return { background: "oklch(0.6 0.15 150 / 0.15)", color: "oklch(0.5 0.15 150)", borderColor: "oklch(0.6 0.15 150 / 0.35)" };
    case "DECLINED":
      return { background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)", borderColor: "var(--zk-border)" };
  }
}

export default async function InquiriesPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "VIEW_INQUIRIES")) {
    redirect("/dashboard");
  }

  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Inquiries</h1>
        <span className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>{inquiries.length} total</span>
      </div>

      {inquiries.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No project enquiries yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-2xl border p-5" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold">{inq.name}</h2>
                    {inq.company && <span className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>· {inq.company}</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--zk-fg-muted)" }}>
                    <a href={`mailto:${inq.email}`} className="zk-link">{inq.email}</a>
                    {inq.phone && <a href={`tel:${inq.phone}`} className="zk-link">{inq.phone}</a>}
                    <span>{new Date(inq.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <form action={updateStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={inq.id} />
                  <select
                    name="status"
                    defaultValue={inq.status}
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={statusStyle(inq.status)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} style={{ background: "var(--zk-panel)", color: "var(--zk-fg)" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
                  >
                    Update
                  </button>
                </form>
              </div>

              <div className="mb-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border px-2.5 py-1" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>{inq.projectType}</span>
                {inq.industry && <span className="rounded-full border px-2.5 py-1" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>{inq.industry}</span>}
                {inq.country && <span className="rounded-full border px-2.5 py-1" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>{inq.country}</span>}
                {inq.budget && <span className="rounded-full border px-2.5 py-1" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>Budget: {inq.budget}</span>}
                {inq.timeline && <span className="rounded-full border px-2.5 py-1" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>Timeline: {inq.timeline}</span>}
              </div>

              <p className="whitespace-pre-wrap text-sm">{inq.description}</p>
              {inq.additionalRequirements && (
                <p className="mt-2 whitespace-pre-wrap text-sm" style={{ color: "var(--zk-fg-muted)" }}>
                  <span style={{ color: "var(--zk-fg)" }}>Additional: </span>
                  {inq.additionalRequirements}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
