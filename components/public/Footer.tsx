import { MailIcon, PhoneIcon } from "@/components/public/icons";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/content";

export function PublicFooter() {
  return (
    <footer
      className="flex flex-col items-start gap-3 border-t px-6 py-8 text-xs md:flex-row md:items-center md:justify-between md:px-16"
      style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
    >
      <span>© {new Date().getFullYear()} zunark-ai</span>
      <div className="flex items-center gap-5">
        {CONTACT_PHONE && (
          <a
            href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
            className="zk-link flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-fg)" }}
          >
            <PhoneIcon />
            {CONTACT_PHONE}
          </a>
        )}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="zk-link flex items-center gap-2"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-fg)" }}
        >
          <MailIcon />
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
