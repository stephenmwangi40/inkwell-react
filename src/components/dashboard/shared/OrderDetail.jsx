import { useState } from "react";
import Button from "../../ui/Button";
import StatusPill from "./StatusPill";
import DocumentPanel from "./DocumentPanel";
import { STATUS_LABELS, STATUS_ORDER } from "../../../lib/db";

export default function OrderDetail({
  order,
  customerName,
  messages = [],
  documents = [],
  role = "customer",
  onBack,
  onUpdateStatus,
  onSendMessage,
  onUploadDoc,
  onDeleteDoc,
  onRequestRevision,
}) {
  const [text, setText] = useState("");
  if (!order) return null;

  const thread = messages
    .filter((m) => m.orderId === order.id)
    .slice()
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const idx = STATUS_ORDER.indexOf(order.status);
  const mine = role === "writer" ? "writer" : "customer";

  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="text-sm font-semibold text-blue hover:underline">
        ← Back to orders
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-slate">{order.id}</div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{order.title}</h2>
          <p className="mt-1 text-sm text-slate">
            {order.type}
            {customerName ? ` · ${customerName}` : ""}
            {" · "}
            {order.words || (order.pages || 0) * 250} words
            {" · "}
            Due {order.deadline || "—"}
            {order.priority ? " · Priority" : ""}
          </p>
        </div>
        <div className="text-right">
          <StatusPill status={order.status} />
          <div className="mt-1 text-lg font-semibold text-ink">${Number(order.price || 0).toFixed(2)}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-ink">Progress</h3>
        <div className="ribbon">
          {STATUS_ORDER.map((s, i) => (
            <div key={s} className={`stage ${i < idx ? "done" : ""} ${i === idx ? "current" : ""}`}>
              <div className="bar" />
              <div className="dot" />
              <label>{STATUS_LABELS[s]}</label>
            </div>
          ))}
        </div>
        {role === "writer" && onUpdateStatus && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onUpdateStatus(order.id, s)}
                className={`rounded-lg border px-2.5 py-1 text-[0.7rem] font-medium ${
                  order.status === s ? "border-blue bg-blue-tint text-blue-dark" : "border-line text-slate hover:border-blue"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        )}
        {role === "customer" && ["review", "delivered"].includes(order.status) && onRequestRevision && (
          <div className="mt-4">
            <Button size="sm" variant="outline" onClick={() => onRequestRevision(order.id)}>
              Request revision
            </Button>
          </div>
        )}
      </div>

      {order.notes && (
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-2 text-sm font-semibold text-ink">Brief / notes</h3>
          <p className="whitespace-pre-wrap text-sm text-ink-soft">{order.notes}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex min-h-[280px] flex-col rounded-2xl border border-line bg-white">
        <div className="border-b border-line px-4 py-3 font-semibold text-ink">Messages</div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {thread.length === 0 && <p className="text-center text-sm text-slate">No messages yet. Start the thread below.</p>}
          {thread.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                m.from === mine ? "ml-auto bg-blue text-white" : "bg-slate-tint text-ink"
              }`}
            >
              <p>{m.text}</p>
              <div className={`mt-1 text-[0.7rem] ${m.from === mine ? "text-white/70" : "text-slate"}`}>{m.time}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-line p-3 sm:flex-row">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim()) {
                onSendMessage?.(order.id, text);
                setText("");
              }
            }}
            placeholder="Write a message…"
            className="flex-1 rounded-[10px] border border-line px-3 py-2 text-sm outline-none focus:border-blue"
          />
          <Button
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => {
              if (!text.trim()) return;
              onSendMessage?.(order.id, text);
              setText("");
            }}
          >
            Send
          </Button>
        </div>
      </div>

      {/* Documents */}
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
        <DocumentPanel
          orderId={order.id}
          documents={documents}
          role={role}
          onUpload={onUploadDoc}
          onDelete={onDeleteDoc}
        />
      </div>
    </div>
  );
}
