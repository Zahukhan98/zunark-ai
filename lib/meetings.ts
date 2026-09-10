import { prisma } from "@/lib/db";
import { sendMeetingInviteEmail } from "@/lib/mail";

export class MeetingError extends Error {}

const ACTIVE_INCLUDE = {
  host: { select: { id: true, name: true, email: true } },
  participants: { include: { user: { select: { id: true, name: true, email: true } } } },
} as const;

export async function createMeeting(params: {
  hostId: string;
  title: string;
  participantUserIds: string[];
  scheduledAt: Date | null; // null = instant meeting, starts now
}) {
  const { hostId, title, participantUserIds, scheduledAt } = params;
  if (!title.trim()) throw new MeetingError("Title is required.");

  const isInstant = scheduledAt === null;
  const participantIds = [...new Set([hostId, ...participantUserIds])];

  const meeting = await prisma.meeting.create({
    data: {
      title: title.trim(),
      hostId,
      scheduledAt,
      status: isInstant ? "ONGOING" : "SCHEDULED",
      startedAt: isInstant ? new Date() : null,
      participants: {
        create: participantIds.map((userId) => ({ userId })),
      },
    },
    include: ACTIVE_INCLUDE,
  });

  // Only scheduled meetings get an email invite — an instant meeting is
  // happening right now, so the in-app "ongoing meeting" banner is the
  // right channel; email would just arrive late.
  if (!isInstant) {
    const invitees = meeting.participants.filter((p) => p.userId !== hostId);
    await Promise.all(
      invitees.map(async (p) => {
        await sendMeetingInviteEmail({
          to: p.user.email,
          hostName: meeting.host.name,
          title: meeting.title,
          scheduledAt: meeting.scheduledAt!,
          meetingId: meeting.id,
        });
        await prisma.meetingParticipant.update({
          where: { id: p.id },
          data: { inviteEmailSentAt: new Date() },
        });
      })
    );
  }

  return meeting;
}

export async function canAccessMeeting(meetingId: string, userId: string): Promise<boolean> {
  const meeting = await prisma.meeting.findUnique({
    where: { id: meetingId },
    include: { participants: { select: { userId: true } } },
  });
  if (!meeting) return false;
  return meeting.hostId === userId || meeting.participants.some((p) => p.userId === userId);
}

/**
 * Lazily transitions a SCHEDULED meeting to ONGOING once someone actually
 * tries to join at/after its scheduled time — there's no real scheduler
 * running in the background, so the transition happens on demand instead.
 */
export async function ensureStarted(meetingId: string) {
  const meeting = await prisma.meeting.findUniqueOrThrow({ where: { id: meetingId } });
  if (meeting.status === "SCHEDULED" && (!meeting.scheduledAt || meeting.scheduledAt <= new Date())) {
    return prisma.meeting.update({
      where: { id: meetingId },
      data: { status: "ONGOING", startedAt: new Date() },
    });
  }
  return meeting;
}

export async function endMeeting(meetingId: string, actingUserId: string) {
  const meeting = await prisma.meeting.findUniqueOrThrow({ where: { id: meetingId } });
  if (meeting.hostId !== actingUserId) throw new MeetingError("Only the host can end this meeting.");
  return prisma.meeting.update({
    where: { id: meetingId },
    data: { status: "ENDED", endedAt: new Date() },
  });
}

export async function cancelMeeting(meetingId: string, actingUserId: string) {
  const meeting = await prisma.meeting.findUniqueOrThrow({ where: { id: meetingId } });
  if (meeting.hostId !== actingUserId) throw new MeetingError("Only the host can cancel this meeting.");
  if (meeting.status !== "SCHEDULED") {
    throw new MeetingError("Only a meeting that hasn't started yet can be cancelled.");
  }
  return prisma.meeting.update({ where: { id: meetingId }, data: { status: "CANCELLED" } });
}

/** The banner shown on the dashboard: an ongoing meeting takes priority over an upcoming one. */
export async function getMyMeetingBanner(userId: string) {
  const where = { OR: [{ hostId: userId }, { participants: { some: { userId } } }] };

  const ongoing = await prisma.meeting.findFirst({
    where: { ...where, status: "ONGOING" },
    include: ACTIVE_INCLUDE,
    orderBy: { startedAt: "asc" },
  });
  if (ongoing) return { ongoing, upcoming: null };

  const upcoming = await prisma.meeting.findFirst({
    where: { ...where, status: "SCHEDULED", scheduledAt: { gte: new Date() } },
    include: ACTIVE_INCLUDE,
    orderBy: { scheduledAt: "asc" },
  });
  return { ongoing: null, upcoming };
}

export async function listMyMeetings(userId: string) {
  const where = { OR: [{ hostId: userId }, { participants: { some: { userId } } }] };
  return prisma.meeting.findMany({
    where,
    include: ACTIVE_INCLUDE,
    orderBy: [{ status: "asc" }, { scheduledAt: "asc" }, { createdAt: "desc" }],
  });
}

export async function listMeetingMessages(meetingId: string) {
  return prisma.meetingMessage.findMany({
    where: { meetingId },
    include: { sender: { select: { id: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function sendMeetingMessage(meetingId: string, senderId: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) throw new MeetingError("Message can't be empty.");
  if (trimmed.length > 2000) throw new MeetingError("Message is too long.");

  return prisma.meetingMessage.create({
    data: { meetingId, senderId, body: trimmed },
    include: { sender: { select: { id: true, name: true } } },
  });
}
