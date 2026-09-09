import { PublicNav } from "@/components/public/Nav";
import { PublicFooter } from "@/components/public/Footer";
import { Analytics } from "@/components/public/Analytics";
import { JsonLd } from "@/components/public/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="zk flex flex-1 flex-col">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <PublicNav />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <Analytics />
    </div>
  );
}
