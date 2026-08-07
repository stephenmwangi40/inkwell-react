import { useState } from "react";
import Button from "../../ui/Button";
import CreditCard from "../shared/CreditCard";
import { PaymentIconRow, VisaIcon, MastercardIcon } from "../shared/PaymentIcons";

export default function CustomerPayments({ payments, methods, customer, onAddMethod, onRemoveMethod }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ brand: "Visa", last4: "", exp: "", name: customer?.name || "" });
  const defaultMethod = methods.find((m) => m.default) || methods[0];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Payments</h2>
        <p className="text-sm text-slate">Manage methods and review invoices. Secure escrow until you approve.</p>
      </div>
      <div className="dash-grid grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-4 font-semibold text-ink">Invoice history</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead className="border-b border-line text-slate">
                <tr>
                  <th className="py-2 font-medium">Invoice</th>
                  <th className="py-2 font-medium">Order</th>
                  <th className="py-2 font-medium">Amount</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2.5 font-medium">{p.id}</td>
                    <td className="py-2.5 text-slate">{p.orderId}</td>
                    <td className="py-2.5">${Number(p.amount).toFixed(2)}</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === "paid" ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="secure-badge mt-4">🔒 Card charged at brief; released to writer after approval</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <h3 className="mb-4 font-semibold text-ink">Payment methods</h3>
          {defaultMethod && (
            <CreditCard last4={defaultMethod.last4} name={defaultMethod.name} exp={defaultMethod.exp} brand={defaultMethod.brand} />
          )}
          <div className="mt-4 space-y-2">
            {methods.map((m) => (
              <div key={m.id} className={`pay-method-card ${m.default ? "default" : ""}`}>
                {m.brand === "Mastercard" ? <MastercardIcon className="h-6 w-10" /> : <VisaIcon className="h-6 w-10" />}
                <div className="min-w-0 flex-1">
                  <strong className="block text-sm">{m.brand} •••• {m.last4}</strong>
                  <span className="text-xs text-slate">{m.default ? "Default · " : ""}Expires {m.exp}</span>
                </div>
                {!m.default && (
                  <Button size="sm" variant="ghost" onClick={() => onRemoveMethod(m.id)}>Remove</Button>
                )}
              </div>
            ))}
          </div>
          {!showAdd ? (
            <Button variant="outline" className="mt-4 w-full" onClick={() => setShowAdd(true)}>+ Add payment method</Button>
          ) : (
            <form
              className="mt-4 space-y-3 rounded-xl border border-line p-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (form.last4.length < 4) return;
                onAddMethod({ ...form, last4: form.last4.slice(-4) });
                setShowAdd(false);
                setForm({ brand: "Visa", last4: "", exp: "", name: customer?.name || "" });
              }}
            >
              <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full rounded-[10px] border border-line px-3 py-2 text-sm">
                <option>Visa</option>
                <option>Mastercard</option>
              </select>
              <input required placeholder="Card number (last 4 used)" value={form.last4} onChange={(e) => setForm({ ...form, last4: e.target.value.replace(/\D/g, "").slice(0, 16) })} className="w-full rounded-[10px] border border-line px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input required placeholder="MM/YY" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} className="rounded-[10px] border border-line px-3 py-2 text-sm" />
                <input required placeholder="Name on card" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-[10px] border border-line px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm">Save card</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
              <p className="text-xs text-slate">Demo only — no real charges. We also accept:</p>
              <PaymentIconRow />
            </form>
          )}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate">
            <span>We also accept</span>
            <PaymentIconRow />
          </div>
        </div>
      </div>
    </div>
  );
}
