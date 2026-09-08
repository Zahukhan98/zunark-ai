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
        className="flex h-full w-full items-center justify-center text-5xl font-semibold"
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
    <div className="relative h-full w-full">
      {photos.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={i === 0}
          className="object-cover transition-opacity duration-700"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{ background: "linear-gradient(to top, oklch(0.13 0.02 205 / 0.75), transparent)" }}
      />
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${name}`}
              onClick={() => setIndex(i)}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: i === index ? "var(--zk-accent1)" : "oklch(0.9 0 0 / 0.5)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
