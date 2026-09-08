export function PublicFooter() {
  return (
    <footer
      className="flex flex-col items-start gap-2 border-t px-6 py-8 text-xs md:flex-row md:items-center md:justify-between md:px-16"
      style={{ borderColor: "var(--zk-border)", color: "var(--zk-fg-muted)" }}
    >
      <span>© {new Date().getFullYear()} zunark-ai · Founded by Mohammed Zahid Khan &amp; Mohammed Kamar</span>
      <a
        href="mailto:info@zunark-ai.com"
        className="zk-link"
        style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-fg)" }}
      >
        info@zunark-ai.com
      </a>
    </footer>
  );
}
