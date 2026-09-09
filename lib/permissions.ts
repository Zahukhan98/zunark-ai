import type { Role } from "@prisma/client";

export const PERMISSIONS = {
  MANAGE_USERS: ["SUPER_ADMIN"],
  VIEW_BILLING_AND_COSTS: ["SUPER_ADMIN"],
  MANAGE_SYSTEM_SETTINGS: ["SUPER_ADMIN"],
  MANAGE_CLIENTS: ["SUPER_ADMIN", "ADMIN"],
  VIEW_INQUIRIES: ["SUPER_ADMIN", "ADMIN"],
  MANAGE_PROJECTS: ["SUPER_ADMIN", "ADMIN"],
  MANAGE_REQUIREMENTS: ["SUPER_ADMIN", "ADMIN", "DEVELOPER"],
  VIEW_ASSIGNED_PROJECTS: ["SUPER_ADMIN", "ADMIN", "DEVELOPER"],
  USE_AI_WORKSPACE: ["SUPER_ADMIN", "ADMIN", "DEVELOPER"],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof PERMISSIONS;

export function hasPermission(role: Role, permission: Permission): boolean {
  return (PERMISSIONS[permission] as readonly Role[]).includes(role);
}
