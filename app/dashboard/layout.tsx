import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/clients", label: "Clients" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/users", label: "Users", roles: ["SUPER_ADMIN"] },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = session.user.role;

  return (
    <div className="flex min-h-screen flex-1 bg-zinc-950 text-zinc-50">
      <aside className="flex w-60 flex-col border-r border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-8 px-2 text-lg font-semibold">zunark-ai</div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role)).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-zinc-800 pt-4">
          <p className="px-2 text-xs text-zinc-500">{session.user.email}</p>
          <p className="mb-3 px-2 text-xs text-zinc-600">{role}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
