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
    <div className="flex flex-1 items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-1 text-xl font-semibold text-zinc-50">zunark-ai</h1>
        <p className="mb-6 text-sm text-zinc-400">Internal platform sign in</p>

        {params.error && (
          <p className="mb-4 rounded-md bg-red-950 px-3 py-2 text-sm text-red-400">
            Invalid email or password.
          </p>
        )}

        <form action={authenticate} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-zinc-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-zinc-500"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
