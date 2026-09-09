"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

type ServerEvent =
  | { type: "welcome"; peerId: string }
  | { type: "existing-peers"; peerIds: string[] }
  | { type: "peer-joined"; peerId: string }
  | { type: "peer-left"; peerId: string }
  | { type: "ping" }
  | {
      type: "signal";
      from: string;
      to?: string;
      signalType: "offer" | "answer" | "candidate" | "leave";
      payload: unknown;
    };

type Status = "requesting-media" | "media-denied" | "connecting" | "in-call";

export function VideoCallRoom({
  meetingId,
  meetingTitle,
  backHref,
}: {
  meetingId: string;
  meetingTitle: string;
  backHref: string;
}) {
  const [status, setStatus] = useState<Status>("requesting-media");
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [audioOnly, setAudioOnly] = useState(false);
  const [remotePeerIds, setRemotePeerIds] = useState<string[]>([]);
  const [slowMediaHint, setSlowMediaHint] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerIdRef = useRef<string | null>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const pendingCandidatesRef = useRef<Map<string, RTCIceCandidateInit[]>>(new Map());
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const eventSourceRef = useRef<EventSource | null>(null);

  const sendSignal = useCallback(
    (message: { to?: string; type: "offer" | "answer" | "candidate" | "leave"; payload: unknown }) => {
      if (!peerIdRef.current) return;
      fetch(`/api/video/${meetingId}/signal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: peerIdRef.current, ...message }),
      }).catch(() => {});
    },
    [meetingId]
  );

  const attachRemoteStream = useCallback((peerId: string, stream: MediaStream) => {
    const el = remoteVideoRefs.current.get(peerId);
    if (el) el.srcObject = stream;
  }, []);

  const createPeerConnection = useCallback(
    (remotePeerId: string) => {
      const pc = new RTCPeerConnection(ICE_SERVERS);
      peerConnectionsRef.current.set(remotePeerId, pc);

      const remoteStream = new MediaStream();

      localStreamRef.current?.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });

      pc.ontrack = (event) => {
        remoteStream.addTrack(event.track);
        attachRemoteStream(remotePeerId, remoteStream);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal({ to: remotePeerId, type: "candidate", payload: event.candidate.toJSON() });
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") setStatus("in-call");
      };

      return pc;
    },
    [attachRemoteStream, sendSignal]
  );

  const handleOffer = useCallback(
    async (fromPeerId: string, sdp: RTCSessionDescriptionInit) => {
      const pc = peerConnectionsRef.current.get(fromPeerId) ?? createPeerConnection(fromPeerId);
      await pc.setRemoteDescription(sdp);
      const queued = pendingCandidatesRef.current.get(fromPeerId) ?? [];
      for (const candidate of queued) await pc.addIceCandidate(candidate);
      pendingCandidatesRef.current.delete(fromPeerId);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendSignal({ to: fromPeerId, type: "answer", payload: answer });
    },
    [createPeerConnection, sendSignal]
  );

  const handleAnswer = useCallback(async (fromPeerId: string, sdp: RTCSessionDescriptionInit) => {
    const pc = peerConnectionsRef.current.get(fromPeerId);
    if (!pc) return;
    await pc.setRemoteDescription(sdp);
    const queued = pendingCandidatesRef.current.get(fromPeerId) ?? [];
    for (const candidate of queued) await pc.addIceCandidate(candidate);
    pendingCandidatesRef.current.delete(fromPeerId);
  }, []);

  const handleCandidate = useCallback(async (fromPeerId: string, candidate: RTCIceCandidateInit) => {
    const pc = peerConnectionsRef.current.get(fromPeerId);
    if (!pc || !pc.remoteDescription) {
      const queue = pendingCandidatesRef.current.get(fromPeerId) ?? [];
      queue.push(candidate);
      pendingCandidatesRef.current.set(fromPeerId, queue);
      return;
    }
    await pc.addIceCandidate(candidate);
  }, []);

  const removePeer = useCallback((peerId: string) => {
    peerConnectionsRef.current.get(peerId)?.close();
    peerConnectionsRef.current.delete(peerId);
    remoteVideoRefs.current.delete(peerId);
    setRemotePeerIds((ids) => ids.filter((id) => id !== peerId));
  }, []);

  useEffect(() => {
    if (status !== "requesting-media") return;
    const timer = setTimeout(() => setSlowMediaHint(true), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch (videoErr) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
          setAudioOnly(true);
        } catch (audioErr) {
          if (!cancelled) {
            const message = audioErr instanceof Error ? audioErr.message : "Unknown error";
            setMediaError(
              videoErr instanceof Error && videoErr.name === "NotReadableError"
                ? "Camera/microphone appears to be in use by another tab or app."
                : message
            );
            setStatus("media-denied");
          }
          return;
        }
      }

      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setStatus("connecting");

      const es = new EventSource(`/api/video/${meetingId}/events`);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        const data = JSON.parse(event.data) as ServerEvent;

        if (data.type === "welcome") {
          peerIdRef.current = data.peerId;
        } else if (data.type === "peer-joined") {
          const remotePeerId = data.peerId;
          setRemotePeerIds((ids) => [...new Set([...ids, remotePeerId])]);
          const pc = createPeerConnection(remotePeerId);
          pc.createOffer()
            .then((offer) => pc.setLocalDescription(offer).then(() => offer))
            .then((offer) => sendSignal({ to: remotePeerId, type: "offer", payload: offer }));
        } else if (data.type === "peer-left") {
          removePeer(data.peerId);
        } else if (data.type === "existing-peers") {
          setRemotePeerIds((prev) => [...new Set([...prev, ...data.peerIds])]);
        } else if (data.type === "signal") {
          if (data.signalType === "offer")
            handleOffer(data.from, data.payload as RTCSessionDescriptionInit);
          else if (data.signalType === "answer")
            handleAnswer(data.from, data.payload as RTCSessionDescriptionInit);
          else if (data.signalType === "candidate")
            handleCandidate(data.from, data.payload as RTCIceCandidateInit);
          else if (data.signalType === "leave") removePeer(data.from);
        }
      };
    }

    start();

    return () => {
      cancelled = true;
      eventSourceRef.current?.close();
      peerConnectionsRef.current.forEach((pc) => pc.close());
      peerConnectionsRef.current.clear();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId]);

  function toggleMic() {
    const next = !micOn;
    setMicOn(next);
    localStreamRef.current?.getAudioTracks().forEach((t) => (t.enabled = next));
  }

  function toggleCam() {
    const next = !camOn;
    setCamOn(next);
    localStreamRef.current?.getVideoTracks().forEach((t) => (t.enabled = next));
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-300">
        <span className="font-medium text-white">{meetingTitle}</span>
        <span>{remotePeerIds.length + 1} in call</span>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-2 p-2 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg bg-slate-800">
          <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
          {audioOnly && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
              🎤 Audio only
            </div>
          )}
          <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs">You</span>
        </div>
        {remotePeerIds.map((peerId) => (
          <div key={peerId} className="relative overflow-hidden rounded-lg bg-slate-800">
            <video
              ref={(el) => {
                if (el) remoteVideoRefs.current.set(peerId, el);
              }}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {status === "requesting-media" && (
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-700 p-4 text-center text-sm text-slate-400">
            <span>Requesting camera/microphone access…</span>
            {slowMediaHint && (
              <span className="text-xs text-amber-400">
                Taking a while — if another tab or app is using your camera right now, it may
                need to release it first. This will fall back to audio-only automatically if the
                camera can&apos;t be reached.
              </span>
            )}
          </div>
        )}
        {status === "connecting" && remotePeerIds.length === 0 && (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-700 text-sm text-slate-400">
            Waiting for others to join…
          </div>
        )}
        {status === "media-denied" && (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-red-700 p-4 text-center text-sm text-red-300">
            Couldn&apos;t access your camera/microphone
            {mediaError ? `: ${mediaError}` : ""}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 border-t border-slate-800 bg-slate-900 p-4">
        <button
          type="button"
          onClick={toggleMic}
          className={`rounded-full px-4 py-2 text-sm ${micOn ? "bg-slate-700" : "bg-red-600"}`}
        >
          Mic: {micOn ? "On" : "Off"}
        </button>
        {!audioOnly && (
          <button
            type="button"
            onClick={toggleCam}
            className={`rounded-full px-4 py-2 text-sm ${camOn ? "bg-slate-700" : "bg-red-600"}`}
          >
            Camera: {camOn ? "On" : "Off"}
          </button>
        )}
        <Link href={backHref} className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium">
          Leave call
        </Link>
      </div>
    </div>
  );
}
