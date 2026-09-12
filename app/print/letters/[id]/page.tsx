import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { formatCurrency } from "@/lib/invoice";
import { notFound, redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { PrintHeader } from "@/components/dashboard/PrintHeader";
import { PrintButton } from "@/components/dashboard/PrintButton";
import { FOUNDERS, COMPANY_LEGAL_NAME, COMPANY_ADDRESS, COMPANY_VAT_NUMBER } from "@/lib/content";

function signer(signedBy: "ZAHID" | "KAMAR") {
  return signedBy === "ZAHID" ? FOUNDERS[0] : FOUNDERS[1];
}

function SignatureBlock({ founder }: { founder: (typeof FOUNDERS)[number] }) {
  return (
    <div>
      <div className="relative -mt-1 h-20 w-28">
        <Image src="/logo.png" alt="Company stamp" fill className="object-contain opacity-70" />
      </div>
      <div className="border-t pt-1 text-sm font-bold" style={{ borderColor: "#0f1b2d" }}>{founder.name}</div>
      <div className="text-xs text-gray-500">{founder.role}</div>
      <div className="text-xs text-gray-500">{COMPANY_LEGAL_NAME}</div>
    </div>
  );
}

export default async function PrintLetterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    redirect("/login");
  }

  const letter = await prisma.letter.findUnique({ where: { id }, include: { project: true } });
  if (!letter) notFound();

  if (letter.type === "CONTRACT") {
    return (
      <div className="min-h-screen bg-white text-[#1a1a1a]">
        <style>{`@media print { @page { size: A4; margin: 20mm; } }`}</style>
        <PrintButton />
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-20 sm:px-10 sm:py-14 print:px-0 print:py-0">
          <PrintHeader />

          <div className="mt-8">
            <div className="text-2xl font-bold" style={{ color: "#0f1b2d" }}>SERVICE AGREEMENT</div>
            <div className="mt-1 text-sm text-gray-500">{letter.subject}</div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">The Company</div>
              <div className="mt-1.5 font-semibold">{COMPANY_LEGAL_NAME}</div>
              {COMPANY_ADDRESS && <div className="whitespace-pre-wrap text-gray-600">{COMPANY_ADDRESS}</div>}
              <div className="mt-1 text-gray-600">VAT Registration No: {COMPANY_VAT_NUMBER || "Not yet VAT-registered"}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">The Client</div>
              {letter.recipientName && <div className="mt-1.5 font-semibold">{letter.recipientName}</div>}
              {letter.recipientAddress && <div className="whitespace-pre-wrap text-gray-600">{letter.recipientAddress}</div>}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 rounded-lg bg-gray-50 p-4 text-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Project</div>
              <div className="mt-1">{letter.project?.name || letter.subject}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Start date</div>
              <div className="mt-1">{letter.projectStartDate?.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Delivery date</div>
              <div className="mt-1">{letter.projectDeliveryDate?.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Scope of work</div>
            <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{letter.body}</div>
          </div>

          <div className="mt-8 flex flex-col items-end gap-1 text-sm">
            <div className="flex w-64 justify-between text-gray-600"><span>Total contract value</span><span className="font-semibold">{formatCurrency(Number(letter.contractCost || 0), letter.contractCurrency || "SAR")}</span></div>
            <div className="flex w-64 justify-between text-gray-600"><span>VAT registration</span><span>{COMPANY_VAT_NUMBER || "Not yet VAT-registered"}</span></div>
          </div>

          <div className="mt-6 text-sm text-gray-700">
            By signing below, both parties agree to the scope, dates and cost set out in this agreement.
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8">
            <SignatureBlock founder={FOUNDERS[0]} />
            <SignatureBlock founder={FOUNDERS[1]} />
          </div>
        </div>
      </div>
    );
  }

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
