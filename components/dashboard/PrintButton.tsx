"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden fixed right-4 top-4 z-10 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg sm:right-6 sm:top-6 sm:px-5 sm:py-2.5 sm:text-sm"
      style={{ background: "#0f1b2d" }}
    >
      Print / Save as PDF
    </button>
  );
}
