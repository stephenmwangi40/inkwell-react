import { EarningsChart, MixChart } from "../Charts";
import StatusPill from "../shared/StatusPill";

export default function WriterOverview({ orders, customers, payments, onOpenOrders }) {
  const active = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));
  const paid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const name = (id) => customers.find((c) => c.id === id)?.name || id;

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Desk overview</h2>
        <p className="mt-1 text-sm text-slate">Orders, earnings, and pipeline at a glance.</p>
      </div>
      <div className="stat-grid grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { l: "Active orders", v: active.length },
          { l: "All orders", v: orders.length },
          { l: "Customers", v: customers.length },
          { l: "Earnings (paid)", v: `$${paid.toFixed(2)}` },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="text-xs text-slate sm:text-sm">{s.l}</div>
            <div className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="dash-grid grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-3 font-semibold text-ink">Earnings trend</h3>
          <EarningsChart />
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-3 font-semibold text-ink">Work mix</h3>
          <MixChart />
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-4 py-3.5 sm:px-5">
          <h3 className="font-semibold text-ink">Pipeline</h3>
          <button type="button" className="text-sm font-medium text-blue" onClick={onOpenOrders}>View all →</button>
        </div>
        <div className="divide-y divide-line">
          {active.slice(0, 6).map((o) => (
            <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="truncate font-medium text-ink">{o.title}</div>
                <div className="text-xs text-slate">{o.id} · {name(o.customerId)} · ${o.price}</div>
              </div>
              <StatusPill status={o.status} />
            </div>
          ))}
          {active.length === 0 && <p className="px-5 py-8 text-center text-slate">No active orders.</p>}
        </div>
      </div>
    </div>
  );
}
