import Image from "next/image";
import { COMPANY_LEGAL_NAME, COMPANY_OFFICIAL_PHONE, COMPANY_WEBSITE, CONTACT_EMAIL } from "@/lib/content";

export function PrintHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 pb-5" style={{ borderColor: "#0f1b2d" }}>
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt={`${COMPANY_LEGAL_NAME} logo`} width={44} height={44} />
        <div>
          <div className="text-xl font-bold tracking-tight" style={{ color: "#0f1b2d" }}>
            {COMPANY_LEGAL_NAME}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500">Ideas · Systems · Impact</div>
        </div>
      </div>
      <div className="text-left text-xs leading-relaxed text-gray-600 sm:text-right">
        <div>{COMPANY_OFFICIAL_PHONE}</div>
        <div>{CONTACT_EMAIL}</div>
        <div>{COMPANY_WEBSITE}</div>
      </div>
    </div>
  );
}
