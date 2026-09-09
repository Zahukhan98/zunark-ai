import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessMeeting, endMeeting, cancelMeeting } from "@/lib/meetings";

async function endMeetingAction(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");
  const meetingId = String(formData.get("meetingId"));
  await endMeeting(meetingId, session.user.id);
  revalidatePath(`/dashboard/meetings/${meetingId}`);
}

async function cancelMeetingAction(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");
  const meetingId = String(formData.get("meetingId"));
  await cancelMeeting(meetingId, session.user.id);
  revalidatePath(`/dashboard/meetings/${meetingId}`);
}

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (!(await canAccessMeeting(id, session.user.id))) notFound();

  const meeting = await prisma.meeting.findUnique({
    where: { id },
    include: {
      host: { select: { id: true, name: true, email: true } },
      participants: { include: { user: { select: { id: true, name: true, email: true } } } },
    },
  });
  if (!meeting) notFound();

  const isHost = meeting.hostId === session.user.id;
  const canJoin =
    meeting.status === "ONGOING" ||
    (meeting.status === "SCHEDULED" && (!meeting.scheduledAt || meeting.scheduledAt <= new Date()));

  return (
    <div>
      <Link href="/dashboard/meetings" className="zk-link mb-4 inline-block text-sm" style={{ color: "var(--zk-fg-muted)" }}>
        ← All meetings
      </Link>
      <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>{meeting.title}</h1>
      <p className="mb-6 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
        Hosted by {meeting.host.name}
        {meeting.scheduledAt && ` · ${meeting.scheduledAt.toLocaleString()}`}
      </p>

      <div className="mb-6 rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
        <p className="mb-4 text-sm font-medium">
          Status: <span style={{ color: "var(--zk-accent1)" }}>{meeting.status}</span>
        </p>

        {canJoin && meeting.status !== "ENDED" && meeting.status !== "CANCELLED" ? (
          <Link
            href={`/call/${meeting.id}`}
            className="zk-link inline-block rounded-lg px-5 py-2.5 text-sm font-semibold"
            style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
          >
            Join meeting
          </Link>
        ) : meeting.status === "SCHEDULED" && meeting.scheduledAt ? (
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>
            The Join button will appear once this meeting starts.
          </p>
        ) : (
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>This meeting has ended.</p>
        )}

        {isHost && meeting.status === "ONGOING" && (
          <form action={endMeetingAction} className="mt-3">
            <input type="hidden" name="meetingId" value={meeting.id} />
            <button type="submit" className="rounded-lg border px-4 py-2 text-sm" style={{ borderColor: "var(--zk-border)" }}>
              End meeting for everyone
            </button>
          </form>
        )}
        {isHost && meeting.status === "SCHEDULED" && (
          <form action={cancelMeetingAction} className="mt-3">
            <input type="hidden" name="meetingId" value={meeting.id} />
            <button type="submit" className="rounded-lg border px-4 py-2 text-sm text-red-600" style={{ borderColor: "var(--zk-border)" }}>
              Cancel meeting
            </button>
          </form>
        )}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
        Participants
      </h2>
      <div className="flex flex-col gap-2">
        {meeting.participants.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm"
            style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
          >
            <span>
              {p.user.name} {p.userId === meeting.hostId && "(host)"}
            </span>
            <span style={{ color: "var(--zk-fg-muted)" }}>
              {p.inviteEmailSentAt ? "Invited by email" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
