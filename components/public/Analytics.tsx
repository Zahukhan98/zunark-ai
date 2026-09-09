"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-2LX5DDG4ZG";
const CONSENT_KEY = "zk-cookie-consent";

type Consent = "accepted" | "declined";

function getStoredConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function Analytics() {
  const [state, setState] = useState<{ hydrated: boolean; consent: Consent | null }>({
    hydrated: false,
    consent: null,
  });

  useEffect(() => {
    // One-time sync from localStorage on mount — unavailable during SSR, so it
    // can't be read during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ hydrated: true, consent: getStoredConsent() });
  }, []);

  const { hydrated, consent } = state;

  function choose(value: Consent) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // localStorage unavailable — consent choice won't persist, banner will reappear
    }
    setState((s) => ({ ...s, consent: value }));
  }

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {hydrated && consent === null && (
        <div
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-xl flex-col gap-4 rounded-2xl border p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between"
          style={{ background: "var(--zk-panel)", borderColor: "var(--zk-border)" }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            We use cookies only to understand how visitors use this site (Google Analytics). No data is sold or
            shared for advertising.
          </p>
          <div className="flex shrink-0 gap-2.5">
            <button
              type="button"
              onClick={() => choose("declined")}
              className="rounded-full border px-4 py-2 text-sm font-medium"
              style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg)" }}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (getStoredConsent() === "accepted" && typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  }
}
