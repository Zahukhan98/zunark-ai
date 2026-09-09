import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { notFound, redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { FOUNDERS } from "@/lib/content";

function signerName(signedBy: "ZAHID" | "KAMAR") {
  return signedBy === "ZAHID" ? FOUNDERS[0].name : FOUNDERS[1].name;
}

async function deleteLetter(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    throw new Error("Not authorized");
  }
  const id = String(formData.get("id"));
  await prisma.letter.delete({ where: { id } });
  redirect("/dashboard/letters");
}

export default async function LetterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/dashboard");
  }

  const letter = await prisma.letter.findUnique({ where: { id }, include: { project: true } });
  if (!letter) notFound();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{letter.subject}</h1>
            {letter.type === "CONTRACT" && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: "var(--zk-accent2)", color: "oklch(1 0 0)" }}>
                Contract
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            {letter.letterDate.toLocaleDateString()} · Signed by {signerName(letter.signedBy)}
            {letter.project && (
              <>
                {" · "}
                <Link href={`/dashboard/projects/${letter.project.id}`} className="zk-link" style={{ color: "var(--zk-accent1)" }}>
                  {letter.project.name}
                </Link>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/print/letters/${letter.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-4 py-2 text-sm font-medium"
            style={{ borderColor: "var(--zk-border)", color: "var(--zk-accent1)" }}
          >
            Open printable version →
          </a>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        {letter.recipientName && (
          <p className="mb-3 text-sm"><span style={{ color: "var(--zk-fg-muted)" }}>To: </span>{letter.recipientName}</p>
        )}
        {letter.recipientAddress && (
          <p className="mb-4 whitespace-pre-wrap text-sm" style={{ color: "var(--zk-fg-muted)" }}>{letter.recipientAddress}</p>
        )}
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{letter.body}</p>

        <form action={deleteLetter} className="mt-6 border-t pt-4" style={{ borderColor: "var(--zk-border)" }}>
          <input type="hidden" name="id" value={letter.id} />
          <button type="submit" className="rounded-full border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "oklch(0.6 0.2 30 / 0.4)", color: "oklch(0.5 0.2 30)" }}>
            Delete letter
          </button>
        </form>
      </div>

      <Link href="/dashboard/letters" className="zk-link text-sm font-medium" style={{ color: "var(--zk-accent1)" }}>
        ← Back to letters
      </Link>
    </div>
  );
}
