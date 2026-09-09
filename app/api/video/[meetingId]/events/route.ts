import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { canAccessMeeting } from "@/lib/meetings";
import { joinRoom, leaveRoom } from "@/lib/video-signaling-store";

// Long-lived connections + an in-memory room registry require this to run
// as one persistent Node process, not the edge runtime, and never be
// statically optimized/cached.
export const runtime = "nodejs";
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

  const peerId = randomUUID();
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const send = (data: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch {
          // Controller already closed (client disconnected mid-write).
        }
      };

      send(JSON.stringify({ type: "welcome", peerId }));
      const existingPeerIds = joinRoom(meetingId, peerId, send);
      send(JSON.stringify({ type: "existing-peers", peerIds: existingPeerIds }));

      const heartbeat = setInterval(() => send(JSON.stringify({ type: "ping" })), 20_000);

      request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(heartbeat);
        leaveRoom(meetingId, peerId);
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
