import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Role } from "@prisma/client";

async function createClient(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_CLIENTS")) {
    throw new Error("Not authorized");
  }

  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const industry = String(formData.get("industry") || "").trim();

  if (!name || !email) throw new Error("Name and email are required");

  await prisma.client.create({
    data: {
      name,
      company: company || null,
      email,
      phone: phone || null,
      country: country || null,
      industry: industry || null,
    },
  });

  revalidatePath("/dashboard/clients");
}

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

export default async function ClientsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const canManage = hasPermission(session.user.role as Role, "MANAGE_CLIENTS");

  const clients = await prisma.client.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Clients</h1>

      {clients.length === 0 ? (
        <p className="mb-8 text-sm" style={{ color: "var(--zk-fg-muted)" }}>No clients yet — accept an inquiry to create one automatically, or add one manually below.</p>
      ) : (
        <div className="mb-8 overflow-hidden overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--zk-border)" }}>
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left" style={{ background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)" }}>
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Projects</th>
                <th className="px-4 py-3">Since</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-t" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/dashboard/clients/${c.id}`} className="zk-link" style={{ color: "var(--zk-accent1)" }}>
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{c.company || "—"}</td>
                  <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{c.email}</td>
                  <td className="px-4 py-3">{c._count.projects}</td>
                  <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{c.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {canManage && (
        <div className="max-w-md rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Add client manually</h2>
          <form action={createClient} className="flex flex-col gap-3">
            <input name="name" placeholder="Contact name" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            <input name="company" placeholder="Company (optional)" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            <input name="email" type="email" placeholder="Email" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            <input name="phone" placeholder="Phone (optional)" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            <div className="grid grid-cols-2 gap-3">
              <input name="country" placeholder="Country" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
              <input name="industry" placeholder="Industry" className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
            <button
              type="submit"
              className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
            >
              Add client
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
