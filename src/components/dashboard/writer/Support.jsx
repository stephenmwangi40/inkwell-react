import { useState } from "react";
import Button from "../../ui/Button";

export default function WriterSupport({ tickets = [], onSubmit }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Support</h2>
        <p className="text-sm text-slate">Writer desk help — response within one business day.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <form
          className="space-y-4 rounded-2xl border border-line bg-white p-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.({ subject, body });
            setSubject("");
            setBody("");
            setSent(true);
          }}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium">Subject</label>
            <input required value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Message</label>
            <textarea required rows={5} value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          {sent && <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-success">Ticket submitted — we’ll email you shortly.</div>}
          <Button type="submit">Submit ticket</Button>
        </form>
        <div className="rounded-2xl border border-line bg-white p-5">
          <h3 className="font-semibold text-ink">Quick links</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>• Order status stuck? Move the stage from Orders.</li>
            <li>• Client not responding? Message from the order thread.</li>
            <li>• Payout questions? Check Earnings & Payments.</li>
            <li>• Email: <a href="mailto:writers@inkwellandco.com" className="text-blue">writers@inkwellandco.com</a></li>
          </ul>
          {tickets.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold">Recent tickets</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate">
                {tickets.slice(-5).reverse().map((t) => (
                  <li key={t.id} className="rounded-lg border border-line px-3 py-2">{t.subject} · {t.time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
