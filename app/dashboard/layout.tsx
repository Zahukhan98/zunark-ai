import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="zk flex min-h-screen flex-1 flex-col lg:flex-row">
      <DashboardSidebar role={session.user.role} email={session.user.email ?? ""} signOutAction={signOutAction} />
      <main className="flex-1 p-5 md:p-8">{children}</main>
    </div>
  );
}
