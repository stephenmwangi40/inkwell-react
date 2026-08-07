import Button from "../../ui/Button";
import StatusPill from "../shared/StatusPill";
import { STATUS_ORDER, STATUS_LABELS } from "../../../lib/db";

export default function CustomerOverview({ orders, payments, messages, onNew, onOrders }) {
  const active = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const spent = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Your workspace</h2>
          <p className="text-sm text-slate">Track active work and start a new brief anytime.</p>
        </div>
        <Button size="sm" onClick={onNew} className="w-full sm:w-auto">+ New order</Button>
      </div>
      <div className="stat-grid grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l: "Active orders", v: active.length },
          { l: "Delivered", v: delivered },
          { l: "Total spent", v: `$${spent.toFixed(2)}` },
          { l: "Messages", v: messages.length },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="text-xs text-slate">{s.l}</div>
            <div className="mt-1 font-display text-2xl font-semibold text-ink">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-4 py-3.5 sm:px-5">
          <h3 className="font-semibold text-ink">Your active orders</h3>
          <button type="button" className="text-sm font-medium text-blue" onClick={onOrders}>View all →</button>
        </div>
        <div className="divide-y divide-line">
          {active.map((o) => {
            const idx = STATUS_ORDER.indexOf(o.status);
            return (
              <div key={o.id} className="px-4 py-4 sm:px-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-medium text-ink">{o.title}</div>
                    <div className="text-xs text-slate">{o.id} · {o.words || "—"} words · ${Number(o.price).toFixed(2)}</div>
                  </div>
                  <StatusPill status={o.status} />
                </div>
                <div className="ribbon mt-3">
                  {STATUS_ORDER.map((s, i) => (
                    <div key={s} className={`stage ${i < idx ? "done" : ""} ${i === idx ? "current" : ""}`}>
                      <div className="bar" /><div className="dot" />
                      <label>{STATUS_LABELS[s]}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {active.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="font-semibold text-ink">Welcome to your desk</p>
              <p className="mt-1 text-sm text-slate">Create a brief to get a writer matched and track status here.</p>
              <button type="button" onClick={onNew} className="mt-4 rounded-[10px] bg-blue px-4 py-2 text-sm font-semibold text-white">Create your first order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
