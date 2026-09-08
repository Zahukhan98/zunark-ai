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

export const SERVICE_ICONS = {
  web: WebDevIcon,
  software: CustomSoftwareIcon,
  ai: AiSolutionsIcon,
  data: DataAnalyticsIcon,
  automation: AutomationIcon,
  maintenance: MaintenanceIcon,
} as const;
