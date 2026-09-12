"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import type { Role, SignedBy, LetterType } from "@prisma/client";

export async function createLetter(formData: FormData) {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_LETTERS")) {
    throw new Error("Not authorized");
  }

  const subject = String(formData.get("subject") || "").trim();
  const recipientName = String(formData.get("recipientName") || "").trim();
  const recipientAddress = String(formData.get("recipientAddress") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const signedBy = String(formData.get("signedBy") || "ZAHID") as SignedBy;
  const letterDateRaw = String(formData.get("letterDate") || "");
  const type = String(formData.get("type") || "GENERAL") as LetterType;
  const projectId = String(formData.get("projectId") || "").trim();
  const clientId = String(formData.get("clientId") || "").trim();

  if (!subject || !body) {
    throw new Error("A subject and body are required");
  }
  if (type !== "CONTRACT" && !["ZAHID", "KAMAR"].includes(signedBy)) {
    throw new Error("Invalid signer");
  }

  let contractCost: number | null = null;
  let contractCurrency: string | null = null;
  let projectStartDate: Date | null = null;
  let projectDeliveryDate: Date | null = null;
  let sellerVatNumber: string | null = null;

  if (type === "CONTRACT") {
    const costRaw = String(formData.get("contractCost") || "");
    const startRaw = String(formData.get("projectStartDate") || "");
    const deliveryRaw = String(formData.get("projectDeliveryDate") || "");
    contractCost = Number(costRaw);
    contractCurrency = String(formData.get("contractCurrency") || "SAR").trim();
    sellerVatNumber = String(formData.get("sellerVatNumber") || "").trim() || null;
    if (!recipientName || !startRaw || !deliveryRaw || !Number.isFinite(contractCost) || contractCost <= 0) {
      throw new Error("Company name, start date, delivery date and cost are required for a contract letter");
    }
    projectStartDate = new Date(startRaw);
    projectDeliveryDate = new Date(deliveryRaw);
  }

  const letter = await prisma.letter.create({
    data: {
      subject,
      recipientName: recipientName || null,
      recipientAddress: recipientAddress || null,
      body,
      signedBy,
      type: type === "CONTRACT" ? "CONTRACT" : "GENERAL",
      projectId: projectId || null,
      clientId: clientId || null,
      contractCost,
      contractCurrency,
      projectStartDate,
      projectDeliveryDate,
      sellerVatNumber,
      letterDate: letterDateRaw ? new Date(letterDateRaw) : new Date(),
      createdById: session.user.id,
    },
  });

  redirect(`/dashboard/letters/${letter.id}`);
}
