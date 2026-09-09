import Link from "next/link";
import { JsonLd } from "@/components/public/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const full = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs" style={{ color: "var(--zk-fg-muted)" }}>
      <JsonLd data={breadcrumbJsonLd(full)} />
      {full.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {i === full.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link href={item.path} className="zk-link hover:underline">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
