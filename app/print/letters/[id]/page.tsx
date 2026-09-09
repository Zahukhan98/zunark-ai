import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { notFound, redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { PrintHeader } from "@/components/dashboard/PrintHeader";
import { PrintButton } from "@/components/dashboard/PrintButton";
import { FOUNDERS, COMPANY_LEGAL_NAME } from "@/lib/content";

function signer(signedBy: "ZAHID" | "KAMAR") {
  return signedBy === "ZAHID" ? FOUNDERS[0] : FOUNDERS[1];
}

export default async function PrintLetterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/login");
  }

  const letter = await prisma.letter.findUnique({ where: { id } });
  if (!letter) notFound();

  const s = signer(letter.signedBy);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <style>{`@media print { @page { size: A4; margin: 20mm; } }`}</style>
      <PrintButton />
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-20 sm:px-10 sm:py-14 print:px-0 print:py-0">
        <PrintHeader />

        <div className="mt-8 text-right text-sm text-gray-500">
          {letter.letterDate.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </div>

        {(letter.recipientName || letter.recipientAddress) && (
          <div className="mt-6 text-sm">
            {letter.recipientName && <div className="font-semibold">{letter.recipientName}</div>}
            {letter.recipientAddress && <div className="whitespace-pre-wrap text-gray-600">{letter.recipientAddress}</div>}
          </div>
        )}

        <div className="mt-8 text-sm font-semibold">Subject: {letter.subject}</div>

        <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{letter.body}</div>

        <div className="mt-16">
          <div className="text-sm text-gray-600">Yours sincerely,</div>
          <div className="relative -mt-1 h-24 w-32">
            <Image src="/logo.png" alt="Company stamp" fill className="object-contain opacity-70" />
          </div>
          <div className="text-sm font-bold">{s.name}</div>
          <div className="text-xs text-gray-500">{s.role}</div>
          <div className="text-xs text-gray-500">{COMPANY_LEGAL_NAME}</div>
        </div>
      </div>
    </div>
  );
}
