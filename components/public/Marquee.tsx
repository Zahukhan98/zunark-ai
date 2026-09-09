"use client";

import { useState } from "react";

export function Marquee({
  text,
  durationSeconds = 16,
  className,
  style,
}: {
  text: string;
  durationSeconds?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  if (reducedMotion) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <div className={className} style={{ ...style, overflow: "hidden", width: "100%" }}>
      <style>{`
        @keyframes zk-marquee-track {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `zk-marquee-track ${durationSeconds}s linear infinite`,
        }}
      >
        <span style={{ paddingRight: "3em", flexShrink: 0 }}>{text}</span>
        <span style={{ paddingRight: "3em", flexShrink: 0 }} aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
