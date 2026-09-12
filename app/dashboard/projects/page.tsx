import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { statusBadgeStyle } from "@/lib/projects";
import type { Role } from "@prisma/client";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const canManage = hasPermission(session.user.role as Role, "MANAGE_PROJECTS");

  const projects = await prisma.project.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Projects</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>{projects.length} total</span>
          {canManage && (
            <Link
              href="/dashboard/projects/new"
              className="rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
            >
              + New Project
            </Link>
          )}
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
          No projects yet — accept an inquiry from the{" "}
          <Link href="/dashboard/inquiries" className="zk-link" style={{ color: "var(--zk-accent1)" }}>Inquiries</Link> page,
          {canManage ? (
            <> or <Link href="/dashboard/projects/new" className="zk-link" style={{ color: "var(--zk-accent1)" }}>add one manually</Link>.</>
          ) : (
            " to create one."
          )}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/projects/${p.id}`}
              className="zk-link rounded-2xl border p-5"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold">{p.name}</h2>
                  <p className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>{p.client.company || p.client.name} · {p.type}</p>
                </div>
                <span className="rounded-full border px-2.5 py-1 text-xs font-semibold" style={statusBadgeStyle(p.status)}>
                  {p.status.replace("_", " ")}
                </span>
              </div>
              <div className="mt-3 max-w-sm">
                <ProgressBar status={p.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
