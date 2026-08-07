import { useState } from "react";
import Button from "../../ui/Button";

export default function WriterMessages({ orders, customers, messages, selectedOrder, setSelectedOrder, onSend }) {
  const [text, setText] = useState("");
  const name = (id) => customers.find((c) => c.id === id)?.name || id;
  const thread = (messages || []).filter((m) => m.orderId === selectedOrder).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <div className="rounded-2xl border border-line bg-white">
        <div className="border-b border-line px-4 py-3 font-semibold">Orders</div>
        <div className="max-h-[40vh] overflow-y-auto lg:max-h-[60vh]">
          {orders.map((o) => (
            <button key={o.id} type="button" onClick={() => setSelectedOrder(o.id)} className={`block w-full border-b border-line px-4 py-3 text-left text-sm ${selectedOrder === o.id ? "bg-blue-tint" : "hover:bg-slate-tint"}`}>
              <div className="truncate font-medium text-ink">{o.title}</div>
              <div className="text-xs text-slate">{name(o.customerId)}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex min-h-[320px] flex-col rounded-2xl border border-line bg-white">
        {selectedOrder ? (
          <>
            <div className="border-b border-line px-4 py-3 font-semibold text-ink">{orders.find((o) => o.id === selectedOrder)?.title}</div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {thread.map((m) => (
                <div key={m.id} className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${m.from === "writer" ? "ml-auto bg-blue text-white" : "bg-slate-tint text-ink"}`}>
                  <p>{m.text}</p>
                  <div className={`mt-1 text-[0.7rem] ${m.from === "writer" ? "text-white/70" : "text-slate"}`}>{m.time}</div>
                </div>
              ))}
              {thread.length === 0 && <p className="text-center text-sm text-slate">No messages yet.</p>}
            </div>
            <div className="flex flex-col gap-2 border-t border-line p-3 sm:flex-row">
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (onSend(selectedOrder, text), setText(""))} placeholder="Reply as writer…" className="flex-1 rounded-[10px] border border-line px-3 py-2 text-sm outline-none focus:border-blue" />
              <Button size="sm" className="w-full sm:w-auto" onClick={() => { onSend(selectedOrder, text); setText(""); }}>Send</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-slate">Select an order</div>
        )}
      </div>
    </div>
  );
}
