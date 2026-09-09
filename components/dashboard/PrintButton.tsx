"use client";

export function PrintButton() {
  return (
    <div className="print:hidden fixed right-4 top-4 z-10 flex flex-col items-end gap-2 sm:right-6 sm:top-6">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg sm:px-5 sm:py-2.5 sm:text-sm"
        style={{ background: "#0f1b2d" }}
      >
        Print / Save as PDF
      </button>
      <p className="max-w-[220px] rounded-lg bg-white px-3 py-2 text-right text-[11px] leading-snug text-gray-500 shadow">
        To hide the page URL/date the browser adds: in the print dialog, open <b>More settings</b> and turn off <b>Headers and footers</b>.
      </p>
    </div>
  );
}
