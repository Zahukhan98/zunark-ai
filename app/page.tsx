import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950 text-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 py-32">
        <p className="mb-4 text-sm font-medium tracking-wide text-zinc-500">zunark-ai</p>
        <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          From Business Ideas to Digital Products.
        </h1>
        <p className="mb-8 max-w-xl text-lg text-zinc-400">
          We design and build websites, software and intelligent digital solutions
          around the way your business actually works.
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
          >
            Start a Project
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Explore Our Solutions
          </Link>
        </div>
        <p className="mt-16 text-xs text-zinc-600">
          Full public site (About, Founders, Services, Process, Contact) ships in Milestone 2.
        </p>
      </main>
    </div>
  );
}
