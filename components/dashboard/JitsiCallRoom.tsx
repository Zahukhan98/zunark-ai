"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: Record<string, unknown>) => JitsiApi;
  }
}

type JitsiApi = {
  dispose: () => void;
  addEventListener: (event: string, handler: (...args: unknown[]) => void) => void;
  getIFrame: () => HTMLIFrameElement;
};

const JITSI_DOMAIN = "meet.jit.si";
const SCRIPT_SRC = `https://${JITSI_DOMAIN}/external_api.js`;

export function JitsiCallRoom({
  meetingId,
  meetingTitle,
  displayName,
  backHref,
}: {
  meetingId: string;
  meetingTitle: string;
  displayName: string;
  backHref: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<JitsiApi | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "ended">("loading");

  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled || !containerRef.current || !window.JitsiMeetExternalAPI) return;

      const api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
        roomName: `zunark-meeting-${meetingId}`,
        parentNode: containerRef.current,
        width: "100%",
        height: "100%",
        userInfo: { displayName },
        configOverwrite: { prejoinPageEnabled: false },
        interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false, SHOW_WATERMARK_FOR_GUESTS: false },
      });
      apiRef.current = api;
      setStatus("ready");

      // The Jitsi IFrame API doesn't reliably honor percentage width/height
      // options — it can leave the iframe at a small intrinsic size instead
      // of filling its container. Force it to fill directly.
      const iframe = api.getIFrame();
      if (iframe) {
        iframe.style.cssText = "position:absolute; inset:0; width:100%; height:100%; border:0;";
      }

      api.addEventListener("readyToClose", () => setStatus("ended"));
      api.addEventListener("videoConferenceLeft", () => setStatus("ended"));
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (window.JitsiMeetExternalAPI) {
      init();
    } else if (existing) {
      existing.addEventListener("load", init);
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = init;
      script.onerror = () => !cancelled && setStatus("error");
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, [meetingId, displayName]);

  if (status === "ended") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <p className="text-lg">You left the call.</p>
        <Link href={backHref} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950">
          Back to meeting
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-300">
        <span className="font-medium text-white">{meetingTitle}</span>
        <Link href={backHref} className="rounded-full border border-slate-700 px-4 py-1.5 text-xs">
          Back
        </Link>
      </div>
      <div className="relative flex-1">
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Connecting to the call…
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-red-300">
            Couldn&apos;t load the video call. Check your connection and try refreshing.
          </div>
        )}
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </div>
  );
}
