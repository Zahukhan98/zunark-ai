import { getProjectProgress } from "@/lib/projects";
import type { ProjectStatus } from "@prisma/client";

export function ProgressBar({ status, showLabel = true }: { status: ProjectStatus; showLabel?: boolean }) {
  const { percent, label, cancelled } = getProjectProgress(status);
  return (
    <div className="flex flex-col gap-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--zk-fg-muted)" }}>
          <span>{label}</span>
          {!cancelled && <span className="mono" style={{ fontFamily: "var(--font-mono-fam)" }}>{percent}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--zk-panel-soft)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: cancelled ? "100%" : `${percent}%`,
            background: cancelled ? "var(--zk-border)" : "var(--zk-accent1)",
          }}
        />
      </div>
    </div>
  );
}
