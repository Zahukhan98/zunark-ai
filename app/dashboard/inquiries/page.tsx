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

function statusColor(status: InquiryStatus) {
  switch (status) {
    case "NEW":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "REVIEWED":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "CONVERTED":
      return "bg-green-500/15 text-green-400 border-green-500/30";
    case "DECLINED":
      return "bg-zinc-700/40 text-zinc-400 border-zinc-700";
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
        <h1 className="text-xl font-semibold">Inquiries</h1>
        <span className="text-sm text-zinc-500">{inquiries.length} total</span>
      </div>

      {inquiries.length === 0 ? (
        <p className="text-sm text-zinc-500">No project enquiries yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-zinc-50">{inq.name}</h2>
                    {inq.company && <span className="text-sm text-zinc-500">· {inq.company}</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <a href={`mailto:${inq.email}`} className="hover:text-zinc-300">{inq.email}</a>
                    {inq.phone && <a href={`tel:${inq.phone}`} className="hover:text-zinc-300">{inq.phone}</a>}
                    <span>{new Date(inq.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <form action={updateStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={inq.id} />
                  <select
                    name="status"
                    defaultValue={inq.status}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColor(inq.status)}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-zinc-900 text-zinc-50">
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"
                  >
                    Update
                  </button>
                </form>
              </div>

              <div className="mb-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-400">{inq.projectType}</span>
                {inq.industry && <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-400">{inq.industry}</span>}
                {inq.country && <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-400">{inq.country}</span>}
                {inq.budget && <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-400">Budget: {inq.budget}</span>}
                {inq.timeline && <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-400">Timeline: {inq.timeline}</span>}
              </div>

              <p className="whitespace-pre-wrap text-sm text-zinc-300">{inq.description}</p>
              {inq.additionalRequirements && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-500">
                  <span className="text-zinc-400">Additional: </span>
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
