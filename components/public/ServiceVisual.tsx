import Image from "next/image";

export function ServiceVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-xl"
      style={{ borderColor: "var(--zk-border)", boxShadow: "0 30px 60px -20px oklch(0.2 0.02 260 / 0.25)" }}
    >
      <div className="relative aspect-[3/2] w-full" style={{ background: "var(--zk-panel)" }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </div>
  );
}
