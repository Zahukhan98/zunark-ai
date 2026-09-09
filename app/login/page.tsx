import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: params.callbackUrl || "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect(`/login?error=CredentialsSignin`);
      }
      throw error;
    }
  }

  return (
    <div className="zk flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border p-8" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <h1 className="mb-1 text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          zunark<span style={{ color: "var(--zk-accent1)" }}>-ai</span>
        </h1>
        <p className="mb-6 text-sm" style={{ color: "var(--zk-fg-muted)" }}>Internal platform sign in</p>

        {params.error && (
          <p className="mb-4 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--zk-accent2)", color: "var(--zk-accent2)" }}>
            Invalid email or password.
          </p>
        )}

        <form action={authenticate} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={{ background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={{ background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" }}
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-lg px-3 py-2.5 text-sm font-semibold"
            style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
