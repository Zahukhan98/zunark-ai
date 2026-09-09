import { auth } from "@/lib/auth";
import { canAccessMeeting } from "@/lib/meetings";
import { relaySignal, type SignalMessage } from "@/lib/video-signaling-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const body = (await request.json()) as SignalMessage;
  if (!body.from || !body.type) {
    return new Response("Invalid signal payload", { status: 400 });
  }

  relaySignal(meetingId, body);
  return Response.json({ ok: true });
}
