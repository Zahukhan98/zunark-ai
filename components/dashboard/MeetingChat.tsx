"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  body: string;
  createdAt: string;
  senderId: string;
  senderName: string;
};

const POLL_INTERVAL_MS = 2500;

export function MeetingChat({ meetingId, currentUserId }: { meetingId: string; currentUserId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const lastCountRef = useRef(0);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/meetings/${meetingId}/messages`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { messages: ChatMessage[] };
      setMessages(data.messages);
      setLoaded(true);
    } catch {
      // Silently retry on the next poll — a dropped fetch shouldn't surface as an error.
    }
  }, [meetingId]);

  useEffect(() => {
    // Fetching remote data on mount and on a poll interval is the correct
    // use of an effect here — the setState happens after the awaited
    // fetch resolves, not synchronously during this effect's execution.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();
    const interval = setInterval(fetchMessages, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (messages.length > lastCountRef.current && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    lastCountRef.current = messages.length;
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setDraft("");
    try {
      const res = await fetch(`/api/meetings/${meetingId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (res.ok) await fetchMessages();
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col rounded-2xl border" style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel)" }}>
      <div className="border-b px-5 py-3.5" style={{ borderColor: "var(--zk-border)" }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--zk-accent1)" }}>Chat</h2>
      </div>

      <div ref={listRef} className="flex max-h-96 min-h-[240px] flex-col gap-3 overflow-y-auto px-5 py-4">
        {!loaded ? (
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--zk-fg-muted)" }}>No messages yet — say hello.</p>
        ) : (
          messages.map((m) => {
            const mine = m.senderId === currentUserId;
            return (
              <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                <div
                  className="max-w-[80%] rounded-2xl px-3.5 py-2 text-sm"
                  style={{
                    background: mine ? "var(--zk-accent1)" : "var(--zk-panel-soft)",
                    color: mine ? "oklch(1 0 0)" : "var(--zk-fg)",
                  }}
                >
                  {!mine && (
                    <div className="mb-0.5 text-xs font-semibold" style={{ color: "var(--zk-accent1)" }}>{m.senderName}</div>
                  )}
                  <p className="whitespace-pre-wrap break-words">{m.body}</p>
                </div>
                <span className="mt-1 text-[11px]" style={{ color: "var(--zk-fg-muted)" }}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </span>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t p-3" style={{ borderColor: "var(--zk-border)" }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message…"
          maxLength={2000}
          className="flex-1 rounded-full border px-4 py-2 text-sm outline-none"
          style={{ background: "var(--zk-panel-soft)", borderColor: "var(--zk-border)", color: "var(--zk-fg)" }}
        />
        <button
          type="submit"
          disabled={!draft.trim() || sending}
          className="rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
          style={{ background: "var(--zk-accent1)", color: "oklch(1 0 0)" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
