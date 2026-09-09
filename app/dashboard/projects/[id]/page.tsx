import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Role, ProjectStatus } from "@prisma/client";
import { PROJECT_STATUSES, statusBadgeStyle } from "@/lib/projects";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

async function updateProjectStatus(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_PROJECTS")) {
    throw new Error("Not authorized");
  }
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ProjectStatus;
  if (!PROJECT_STATUSES.includes(status)) throw new Error("Invalid status");

  await prisma.project.update({ where: { id }, data: { status } });
  revalidatePath(`/dashboard/projects/${id}`);
  revalidatePath("/dashboard/projects");
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");
  const canManage = hasPermission(session.user.role as Role, "MANAGE_PROJECTS");

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      letters: { where: { type: "CONTRACT" }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!project) notFound();

  const contractParams = new URLSearchParams({
    projectId: project.id,
    type: "CONTRACT",
    subject: `Service Agreement — ${project.name}`,
    recipientName: project.client.name,
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{project.name}</h1>
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            <Link href={`/dashboard/clients/${project.client.id}`} className="zk-link" style={{ color: "var(--zk-accent1)" }}>
              {project.client.company || project.client.name}
            </Link>
            {" · "}{project.type}
          </p>
        </div>
        <span className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={statusBadgeStyle(project.status)}>
          {project.status.replace("_", " ")}
        </span>
      </div>

      <div className="mb-8 rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <ProgressBar status={project.status} />

        {canManage && (
          <form action={updateProjectStatus} className="mt-5 flex flex-wrap items-center gap-2 border-t pt-5" style={{ borderColor: "var(--zk-border)" }}>
            <input type="hidden" name="id" value={project.id} />
            <label className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Update stage:</label>
            <select name="status" defaultValue={project.status} className="rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)", color: "var(--zk-fg)" }}>
              {PROJECT_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </select>
            <button type="submit" className="rounded-full border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}>
              Update
            </button>
          </form>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border p-6 sm:grid-cols-2" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        {project.description && (
          <div className="sm:col-span-2">
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Description</div>
            <p className="whitespace-pre-wrap text-sm">{project.description}</p>
          </div>
        )}
        {project.timeline && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Timeline</div>
            <div className="text-sm">{project.timeline}</div>
          </div>
        )}
        {project.clientPrice != null && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Client Price</div>
            <div className="text-sm">{project.clientPrice.toString()}</div>
          </div>
        )}
        {project.budget != null && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Budget</div>
            <div className="text-sm">{project.budget.toString()}</div>
          </div>
        )}
        {project.estimatedCost != null && (
          <div>
            <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>Estimated Cost</div>
            <div className="text-sm">{project.estimatedCost.toString()}</div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Contract</h2>
          {canManage && (
            <Link
              href={`/dashboard/letters/new?${contractParams.toString()}`}
              className="rounded-full px-4 py-2 text-xs font-semibold"
              style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
            >
              + Draft Contract Letter
            </Link>
          )}
        </div>

        {project.letters.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            No contract issued yet. Once you accept this project, draft a contract letter with your terms — it uses the same letterhead and signature stamp as other company letters.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {project.letters.map((letter) => (
              <div key={letter.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-4 py-3" style={{ borderColor: "var(--zk-border)" }}>
                <div>
                  <div className="text-sm font-medium">{letter.subject}</div>
                  <div className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>{letter.letterDate.toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Link href={`/dashboard/letters/${letter.id}`} className="zk-link" style={{ color: "var(--zk-accent1)" }}>View</Link>
                  <a href={`/print/letters/${letter.id}`} target="_blank" rel="noopener noreferrer" className="zk-link" style={{ color: "var(--zk-accent1)" }}>Print</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link href="/dashboard/projects" className="zk-link text-sm font-medium" style={{ color: "var(--zk-accent1)" }}>
          ← Back to projects
        </Link>
      </div>
    </div>
  );
}
