"use client";

import { useEffect, useRef, useState } from "react";

export function Typewriter({ text, speedMs = 28, className, style }: { text: string; speedMs?: number; className?: string; style?: React.CSSProperties }) {
  const reducedMotion = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )[0];
  const [shown, setShown] = useState(() => (reducedMotion ? text : ""));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i += 1;
            setShown(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
          }, speedMs);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, speedMs, reducedMotion]);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {shown}
      <span aria-hidden="true" style={{ opacity: shown.length < text.length ? 1 : 0 }}>▌</span>
    </span>
  );
}
