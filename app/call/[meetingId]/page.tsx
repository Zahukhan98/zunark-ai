import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { canAccessMeeting } from "@/lib/meetings";
import { prisma } from "@/lib/db";
import { VideoIcon } from "@/components/public/icons";

export default async function CallPage({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const { meetingId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (!(await canAccessMeeting(meetingId, session.user.id))) notFound();

  const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
  if (!meeting) notFound();

  return (
    <div className="zk flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center" style={{ background: "var(--zk-bg)" }}>
      <div
        className="mb-1 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ background: "var(--zk-panel-soft)", color: "var(--zk-accent1)" }}
      >
        <VideoIcon className="h-7 w-7" />
      </div>
      <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
        Live video calling is coming soon
      </h1>
      <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
        &ldquo;{meeting.title}&rdquo; is tracked here, but we&apos;re still evaluating the right video
        provider before turning on live calling. Scheduling, invites, and meeting history all work
        today — the call itself will be added in a future update.
      </p>
      <Link
        href={`/dashboard/meetings/${meetingId}`}
        className="zk-link mt-2 rounded-full px-5 py-2.5 text-sm font-semibold"
        style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
      >
        Back to meeting
      </Link>
    </div>
  );
}
