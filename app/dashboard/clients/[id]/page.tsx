import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { statusBadgeStyle } from "@/lib/projects";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const client = await prisma.client.findUnique({
    where: { id },
    include: { projects: { orderBy: { createdAt: "desc" } } },
  });
  if (!client) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{client.name}</h1>
        {client.company && <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>{client.company}</p>}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border p-6 sm:grid-cols-2" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <div>
          <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Email</div>
          <a href={`mailto:${client.email}`} className="zk-link text-sm" style={{ color: "var(--zk-accent1)" }}>{client.email}</a>
        </div>
        {client.phone && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Phone</div>
            <a href={`tel:${client.phone}`} className="zk-link text-sm" style={{ color: "var(--zk-accent1)" }}>{client.phone}</a>
          </div>
        )}
        {client.country && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Country</div>
            <div className="text-sm">{client.country}</div>
          </div>
        )}
        {client.industry && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Industry</div>
            <div className="text-sm">{client.industry}</div>
          </div>
        )}
        {client.notes && (
          <div className="sm:col-span-2">
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Notes</div>
            <p className="whitespace-pre-wrap text-sm">{client.notes}</p>
          </div>
        )}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Projects</h2>
      {client.projects.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No projects for this client yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {client.projects.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/projects/${p.id}`}
              className="zk-link rounded-2xl border p-5"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold">{p.name}</h3>
                <span className="rounded-full border px-2.5 py-1 text-xs font-semibold" style={statusBadgeStyle(p.status)}>
                  {p.status.replace("_", " ")}
                </span>
              </div>
              <ProgressBar status={p.status} />
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/dashboard/clients" className="zk-link text-sm font-medium" style={{ color: "var(--zk-accent1)" }}>
          ← Back to clients
        </Link>
      </div>
    </div>
  );
}
