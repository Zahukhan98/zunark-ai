import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { formatCurrency } from "@/lib/invoice";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";

export default async function ContractsPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/dashboard");
  }

  const contracts = await prisma.letter.findMany({
    where: { type: "CONTRACT" },
    include: { project: { include: { client: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Contracts</h1>
        <Link
          href="/dashboard/contracts/new"
          className="rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          + New Contract
        </Link>
      </div>

      {contracts.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No contracts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {contracts.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/letters/${c.id}`}
              className="zk-link rounded-2xl border p-5"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{c.subject}</h2>
                <span className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>{c.letterDate.toLocaleDateString()}</span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--zk-fg-muted)" }}>
                {c.recipientName ? `${c.recipientName} · ` : ""}
                {c.project ? `${c.project.name} · ` : ""}
                {c.contractCost != null ? formatCurrency(Number(c.contractCost), c.contractCurrency || "SAR") : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
