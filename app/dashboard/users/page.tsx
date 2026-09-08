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

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user.role as Role, "MANAGE_USERS")) {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Users</h1>

      <div className="mb-8 overflow-hidden rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-zinc-800">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2 text-zinc-400">{u.email}</td>
                <td className="px-4 py-2 text-zinc-400">{u.role}</td>
                <td className="px-4 py-2 text-zinc-500">{u.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-sm font-medium text-zinc-300">Create user</h2>
        <form action={createUser} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Full name"
            required
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50"
          />
          <input
            name="password"
            type="password"
            placeholder="Temporary password (min 8 chars)"
            required
            minLength={8}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50"
          />
          <select
            name="role"
            required
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50"
          >
            <option value="DEVELOPER">Developer</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          <button
            type="submit"
            className="mt-1 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
          >
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}
