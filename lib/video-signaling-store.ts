// In-memory WebRTC signaling relay for the team meeting feature — our own
// video calling backend, no third-party service involved. Peers exchange
// SDP offers/answers and ICE candidates through this relay over
// Server-Sent Events (push) + a plain POST (send); the actual audio/video
// never touches this server — it flows browser-to-browser once WebRTC
// negotiation completes.
//
// In-memory by design: this is a single-process deployment (one
// `next dev`/`next start` process). A multi-instance deployment would swap
// this for a shared pub/sub (Redis, etc.) behind the same interface.

export type SignalMessage = {
  from: string;
  to?: string;
  type: "offer" | "answer" | "candidate" | "leave";
  payload: unknown;
};

type Subscriber = {
  peerId: string;
  send: (data: string) => void;
};

const rooms = new Map<string, Map<string, Subscriber>>();

function getRoom(roomId: string): Map<string, Subscriber> {
  let room = rooms.get(roomId);
  if (!room) {
    room = new Map();
    rooms.set(roomId, room);
  }
  return room;
}

export function joinRoom(roomId: string, peerId: string, send: (data: string) => void) {
  const room = getRoom(roomId);
  const existingPeerIds = [...room.keys()];
  room.set(peerId, { peerId, send });

  for (const existingId of existingPeerIds) {
    room.get(existingId)?.send(JSON.stringify({ type: "peer-joined", peerId }));
  }

  return existingPeerIds;
}

export function leaveRoom(roomId: string, peerId: string) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.delete(peerId);
  for (const sub of room.values()) {
    sub.send(JSON.stringify({ type: "peer-left", peerId }));
  }
  if (room.size === 0) rooms.delete(roomId);
}

export function relaySignal(roomId: string, message: SignalMessage) {
  const room = rooms.get(roomId);
  if (!room) return;

  const targets = message.to
    ? [room.get(message.to)].filter((s): s is Subscriber => Boolean(s))
    : [...room.values()].filter((s) => s.peerId !== message.from);

  for (const target of targets) {
    target.send(
      JSON.stringify({
        type: "signal",
        from: message.from,
        to: message.to,
        signalType: message.type,
        payload: message.payload,
      })
    );
  }
}
