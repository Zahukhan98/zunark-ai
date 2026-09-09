import type { ProjectStatus } from "@prisma/client";

export const PROJECT_STATUSES: ProjectStatus[] = [
  "NEW",
  "DISCOVERY",
  "PLANNING",
  "PROPOSAL",
  "APPROVED",
  "IN_DEVELOPMENT",
  "TESTING",
  "DEPLOYMENT",
  "LIVE",
  "MAINTENANCE",
  "COMPLETED",
  "CANCELLED",
];

const PIPELINE: { status: ProjectStatus; label: string; percent: number }[] = [
  { status: "NEW", label: "New", percent: 5 },
  { status: "DISCOVERY", label: "Discovery", percent: 15 },
  { status: "PLANNING", label: "Planning", percent: 25 },
  { status: "PROPOSAL", label: "Proposal", percent: 35 },
  { status: "APPROVED", label: "Approved", percent: 45 },
  { status: "IN_DEVELOPMENT", label: "In Development", percent: 65 },
  { status: "TESTING", label: "Testing", percent: 80 },
  { status: "DEPLOYMENT", label: "Deployment", percent: 90 },
  { status: "LIVE", label: "Live", percent: 100 },
  { status: "MAINTENANCE", label: "Maintenance", percent: 100 },
  { status: "COMPLETED", label: "Completed", percent: 100 },
];

export function getProjectProgress(status: ProjectStatus): { percent: number; label: string; cancelled: boolean } {
  if (status === "CANCELLED") {
    return { percent: 0, label: "Cancelled", cancelled: true };
  }
  const stage = PIPELINE.find((s) => s.status === status);
  return { percent: stage?.percent ?? 0, label: stage?.label ?? status, cancelled: false };
}

export function statusBadgeStyle(status: ProjectStatus): React.CSSProperties {
  switch (status) {
    case "LIVE":
    case "COMPLETED":
      return { background: "oklch(0.6 0.15 150 / 0.15)", color: "oklch(0.5 0.15 150)", borderColor: "oklch(0.6 0.15 150 / 0.35)" };
    case "CANCELLED":
      return { background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)", borderColor: "var(--zk-border)", opacity: 0.75 };
    case "IN_DEVELOPMENT":
    case "TESTING":
    case "DEPLOYMENT":
      return { background: "oklch(0.55 0.18 255 / 0.12)", color: "oklch(0.55 0.18 255)", borderColor: "oklch(0.55 0.18 255 / 0.35)" };
    case "MAINTENANCE":
      return { background: "var(--zk-accent2)", color: "oklch(1 0 0)", borderColor: "transparent", opacity: 0.9 };
    default:
      return { background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)", borderColor: "var(--zk-border)" };
  }
}
