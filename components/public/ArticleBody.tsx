import type { ContentBlock } from "@/lib/insights";

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className="leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={i} className="mt-4 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="mt-2 text-lg font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--zk-accent1)" }} />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={i} className="flex flex-col gap-3">
            {block.items.map((item, idx) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}
                >
                  {idx + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
