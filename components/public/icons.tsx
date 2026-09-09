type IconProps = { className?: string };

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WebDevIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polyline points="9 6 3 12 9 18" />
      <polyline points="15 6 21 12 15 18" />
    </svg>
  );
}

export function CustomSoftwareIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polygon points="12 3 21 8 12 13 3 8 12 3" />
      <polyline points="3 13 12 18 21 13" />
    </svg>
  );
}

export function AiSolutionsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="10.4" y1="13.2" x2="6.6" y2="17.5" />
      <line x1="13.6" y1="13.2" x2="17.4" y2="17.5" />
    </svg>
  );
}

export function DataAnalyticsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="5" y1="20" x2="5" y2="12" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="19" y1="20" x2="19" y2="9" />
    </svg>
  );
}

export function AutomationIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12a8 8 0 0 1 14-5.2M20 12a8 8 0 0 1-14 5.2" />
      <polyline points="17.5 4.5 18 7 15.5 7.5" />
      <polyline points="6.5 19.5 6 17 8.5 16.5" />
    </svg>
  );
}

export function MaintenanceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <polyline points="9 12 11.2 14.2 15.5 9.8" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 18.5 5.5 13.5 4.5 6.5A2 2 0 0 1 6.5 3.5z" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15 20a4.8 4.8 0 0 1 6.5-4.5" />
    </svg>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2.2H19.5A1.5 1.5 0 0 1 21 9.2V17a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7z" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <path d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
      <path d="M8.5 8.8c.2-.5.4-.5.6-.5h.5c.15 0 .35 0 .5.4.2.5.6 1.5.65 1.6.05.1.1.25 0 .4-.1.2-.15.3-.3.45l-.4.45c-.15.15-.3.3-.15.6.15.3.7 1.2 1.5 1.9 1 .9 1.85 1.2 2.15 1.35.3.15.5.1.65-.05.2-.2.4-.5.6-.75.15-.2.3-.2.5-.15.2.1 1.35.65 1.6.75.25.1.4.15.45.25.05.15.05.7-.2 1.35-.25.65-1.45 1.25-2 1.3-.5.05-1.1.08-1.75-.1a11 11 0 0 1-1-.35 8.6 8.6 0 0 1-3.2-2.25 9.4 9.4 0 0 1-1.9-3.2c-.2-.6-.3-1.15-.3-1.65 0-1.1.6-1.65.85-1.9z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <polyline points="4 12.5 9.5 18 20 6" />
    </svg>
  );
}

export function VideoIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="6" width="13" height="12" rx="2" />
      <path d="M15.5 10.2 21 7v10l-5.5-3.2z" />
    </svg>
  );
}

export function InvoiceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3h8l4 4v14H6V3z" />
      <path d="M14 3v4h4" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}

export const SERVICE_ICONS = {
  web: WebDevIcon,
  software: CustomSoftwareIcon,
  ai: AiSolutionsIcon,
  data: DataAnalyticsIcon,
  automation: AutomationIcon,
  maintenance: MaintenanceIcon,
} as const;
