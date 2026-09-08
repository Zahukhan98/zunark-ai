"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function FounderSlideshow({
  photos,
  name,
  initials,
}: {
  photos: string[];
  name: string;
  initials: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photos.length]);

  if (photos.length === 0) {
    return (
      <div
        className="mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full text-2xl font-semibold"
        style={{
          background: "linear-gradient(135deg, var(--zk-accent1), var(--zk-accent2))",
          color: "oklch(0.14 0.02 205)",
          fontFamily: "var(--font-display-fam)",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div
        className="relative h-[88px] w-[88px] overflow-hidden rounded-full border"
        style={{ borderColor: "var(--zk-border)" }}
      >
        {photos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={name}
            fill
            sizes="88px"
            className="object-cover transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
      {photos.length > 1 && (
        <div className="mt-2.5 flex gap-1.5">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${name}`}
              onClick={() => setIndex(i)}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: i === index ? "var(--zk-accent1)" : "var(--zk-border)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
