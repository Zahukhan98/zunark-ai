import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createMeeting } from "@/lib/meetings";
import { revalidatePath } from "next/cache";

const inputStyle = { background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" };

async function createInstantMeeting(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");

  const title = String(formData.get("title") || "").trim() || "Instant meeting";
  const participantUserIds = formData.getAll("participants").map(String);

  const meeting = await createMeeting({
    hostId: session.user.id,
    title,
    participantUserIds,
    scheduledAt: null,
  });

  redirect(`/call/${meeting.id}`);
}

async function scheduleMeeting(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");

  const title = String(formData.get("title") || "").trim();
  const dateStr = String(formData.get("date") || "");
  const timeStr = String(formData.get("time") || "");
  const participantUserIds = formData.getAll("participants").map(String);

  if (!title || !dateStr || !timeStr) throw new Error("Title, date, and time are required.");
  const scheduledAt = new Date(`${dateStr}T${timeStr}`);
  if (Number.isNaN(scheduledAt.getTime())) throw new Error("Invalid date/time.");

  const meeting = await createMeeting({
    hostId: session.user.id,
    title,
    participantUserIds,
    scheduledAt,
  });

  revalidatePath("/dashboard/meetings");
  redirect(`/dashboard/meetings/${meeting.id}`);
}

function statusLabel(status: string, scheduledAt: Date | null) {
  if (status === "ONGOING") return "Ongoing";
  if (status === "SCHEDULED") return scheduledAt ? `Scheduled — ${scheduledAt.toLocaleString()}` : "Scheduled";
  if (status === "ENDED") return "Ended";
  return "Cancelled";
}

export default async function MeetingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [users, meetings] = await Promise.all([
    prisma.user.findMany({
      where: { id: { not: session.user.id } },
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    }),
    prisma.meeting.findMany({
      where: { OR: [{ hostId: session.user.id }, { participants: { some: { userId: session.user.id } } }] },
      include: { host: { select: { name: true } } },
      orderBy: [{ status: "asc" }, { scheduledAt: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  const participantCheckboxes = (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>Invite teammates</p>
      {users.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--zk-fg-muted)" }}>No other team members yet.</p>
      ) : (
        users.map((u) => (
          <label key={u.id} className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="participants" value={u.id} />
            {u.name} <span style={{ color: "var(--zk-fg-muted)" }}>({u.email})</span>
          </label>
        ))
      )}
    </div>
  );

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>Meetings</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--zk-fg-muted)" }}>
        Start an instant meeting, or schedule one and invite teammates by email.
      </p>
      <div
        className="mb-7 rounded-xl border px-4 py-3 text-sm"
        style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)", color: "var(--zk-fg-muted)" }}
      >
        🎥 Live video calling is coming soon — for now this schedules the meeting and sends invites; the call itself will be added in a future update.
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
            Start an instant meeting
          </h2>
          <form action={createInstantMeeting} className="flex flex-col gap-3">
            <input
              name="title"
              placeholder="Meeting title (optional)"
              className="rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={inputStyle}
            />
            {participantCheckboxes}
            <button
              type="submit"
              className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
            >
              Start now
            </button>
          </form>
        </div>

        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
            Schedule a meeting
          </h2>
          <form action={scheduleMeeting} className="flex flex-col gap-3">
            <input
              name="title"
              placeholder="Meeting title"
              required
              className="rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={inputStyle}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="date"
                type="date"
                required
                className="rounded-lg border px-3 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
              <input
                name="time"
                type="time"
                required
                className="rounded-lg border px-3 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>
            {participantCheckboxes}
            <button
              type="submit"
              className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
            >
              Schedule & send invites
            </button>
          </form>
        </div>
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>
        Your meetings
      </h2>
      {meetings.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No meetings yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {meetings.map((m) => (
            <Link
              key={m.id}
              href={`/dashboard/meetings/${m.id}`}
              className="zk-link flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm"
              style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}
            >
              <div>
                <p className="font-medium">{m.title}</p>
                <p style={{ color: "var(--zk-fg-muted)" }}>Host: {m.host.name}</p>
              </div>
              <span style={{ color: m.status === "ONGOING" ? "var(--zk-accent1)" : "var(--zk-fg-muted)" }}>
                {statusLabel(m.status, m.scheduledAt)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
