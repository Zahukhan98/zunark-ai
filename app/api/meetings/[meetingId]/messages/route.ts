import { auth } from "@/lib/auth";
import { canAccessMeeting, listMeetingMessages, sendMeetingMessage, MeetingError } from "@/lib/meetings";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const session = await auth();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const { meetingId } = await params;
  if (!(await canAccessMeeting(meetingId, session.user.id))) {
    return new Response("Forbidden", { status: 403 });
  }

  const messages = await listMeetingMessages(meetingId);
  return Response.json({
    messages: messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt.toISOString(),
      senderId: m.senderId,
      senderName: m.sender.name,
    })),
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const session = await auth();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const { meetingId } = await params;
  if (!(await canAccessMeeting(meetingId, session.user.id))) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { body?: string } | null;
  if (!body?.body) return new Response("Missing message body", { status: 400 });

  try {
    const message = await sendMeetingMessage(meetingId, session.user.id, body.body);
    return Response.json({
      message: {
        id: message.id,
        body: message.body,
        createdAt: message.createdAt.toISOString(),
        senderId: message.senderId,
        senderName: message.sender.name,
      },
    });
  } catch (err) {
    if (err instanceof MeetingError) return new Response(err.message, { status: 400 });
    throw err;
  }
}
