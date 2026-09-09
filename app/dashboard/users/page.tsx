import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasPermission } from "@/lib/permissions";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Role } from "@prisma/client";

async function createUser(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_USERS")) {
    throw new Error("Not authorized");
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "") as Role;

  if (!name || !email || password.length < 8 || !["SUPER_ADMIN", "ADMIN", "DEVELOPER"].includes(role)) {
    throw new Error("Invalid input");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { name, email, role, passwordHash } });
  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      entityType: "user",
      entityId: email,
      action: "User created",
    },
  });

  revalidatePath("/dashboard/users");
}

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_USERS")) {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Users</h1>

      <div className="mb-8 overflow-hidden overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--zk-border)" }}>
        <table className="w-full min-w-[480px] text-sm">
          <thead className="text-left" style={{ background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)" }}>
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{u.email}</td>
                <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{u.role}</td>
                <td className="px-4 py-3" style={{ color: "var(--zk-fg-muted)" }}>{u.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-md rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Create user</h2>
        <form action={createUser} className="flex flex-col gap-3">
          <input name="name" placeholder="Full name" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          <input name="email" type="email" placeholder="Email" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle} />
          <input
            name="password"
            type="password"
            placeholder="Temporary password (min 8 chars)"
            required
            minLength={8}
            className="rounded-lg border px-3 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
          <select name="role" required className="rounded-lg border px-3 py-2.5 text-sm outline-none" style={inputStyle}>
            <option value="DEVELOPER">Developer</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          <button
            type="submit"
            className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold"
            style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
          >
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}
