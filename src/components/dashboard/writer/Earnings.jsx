import { EarningsChart, MixChart } from "../Charts";
import { PaymentIconRow } from "../shared/PaymentIcons";

export default function WriterEarnings({ payments, customers, orders }) {
  const paid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const name = (id) => customers.find((c) => c.id === id)?.name || id;

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Earnings & Payments</h2>
        <p className="text-sm text-slate">Secure payouts — funds release after client approval.</p>
      </div>
      <div className="stat-grid grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <div className="text-xs text-slate">Total paid</div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink">${paid.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <div className="text-xs text-slate">Pending (escrow)</div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink">${pending.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <div className="text-xs text-slate">Delivered</div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink">{delivered}</div>
        </div>
      </div>
      <div className="dash-grid grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-3 font-semibold text-ink">Monthly earnings</h3>
          <EarningsChart />
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-3 font-semibold text-ink">Category mix</h3>
          <MixChart />
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-ink">Secure payment methods accepted</h3>
          <PaymentIconRow />
        </div>
        <p className="text-sm text-slate">Card and crypto checkout. Client funds are held until draft approval.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-line bg-slate-tint/60 text-slate">
            <tr>
              <th className="px-3 py-3 font-medium sm:px-4">ID</th>
              <th className="px-3 py-3 font-medium sm:px-4">Customer</th>
              <th className="px-3 py-3 font-medium sm:px-4">Order</th>
              <th className="px-3 py-3 font-medium sm:px-4">Amount</th>
              <th className="px-3 py-3 font-medium sm:px-4">Status</th>
              <th className="px-3 py-3 font-medium sm:px-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="px-3 py-3 font-medium sm:px-4">{p.id}</td>
                <td className="px-3 py-3 sm:px-4">{name(p.customerId)}</td>
                <td className="px-3 py-3 text-slate sm:px-4">{p.orderId}</td>
                <td className="px-3 py-3 sm:px-4">${Number(p.amount).toFixed(2)}</td>
                <td className="px-3 py-3 sm:px-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === "paid" ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>{p.status}</span>
                </td>
                <td className="px-3 py-3 text-slate sm:px-4">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
