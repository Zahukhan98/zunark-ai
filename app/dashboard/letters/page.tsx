import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { FOUNDERS } from "@/lib/content";

function signerName(signedBy: "ZAHID" | "KAMAR") {
  return signedBy === "ZAHID" ? FOUNDERS[0].name : FOUNDERS[1].name;
}

export default async function LettersPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/dashboard");
  }

  const letters = await prisma.letter.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Letters</h1>
        <Link
          href="/dashboard/letters/new"
          className="rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          + New Letter
        </Link>
      </div>

      {letters.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No letters yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {letters.map((letter) => (
            <Link
              key={letter.id}
              href={`/dashboard/letters/${letter.id}`}
              className="zk-link rounded-2xl border p-5"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">{letter.subject}</h2>
                  {letter.type === "CONTRACT" && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: "var(--zk-accent2)", color: "oklch(1 0 0)" }}>
                      Contract
                    </span>
                  )}
                </div>
                <span className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>{letter.letterDate.toLocaleDateString()}</span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--zk-fg-muted)" }}>
                {letter.recipientName ? `To: ${letter.recipientName} · ` : ""}
                Signed by {letter.type === "CONTRACT" ? "both founders" : signerName(letter.signedBy)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
