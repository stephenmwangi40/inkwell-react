import { useState } from "react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

export default function CustomerSupport({ onSubmit }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Support</h2>
        <p className="text-sm text-slate">We’re here Mon–Fri · 9am–6pm ET</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <form className="space-y-4 rounded-2xl border border-line bg-white p-5" onSubmit={(e) => { e.preventDefault(); onSubmit?.({ subject, body }); setSent(true); setSubject(""); setBody(""); }}>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Subject</label>
            <input required value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">How can we help?</label>
            <textarea required rows={5} value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          {sent && <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-success">Message sent — we’ll reply by email.</div>}
          <Button type="submit">Send</Button>
        </form>
        <div className="rounded-2xl border border-line bg-white p-5 text-sm text-ink-soft space-y-3">
          <p><strong className="text-ink">Email:</strong> <a href="mailto:hello@inkwellandco.com" className="text-blue">hello@inkwellandco.com</a></p>
          <p><strong className="text-ink">Pricing:</strong> $0.04 per word · secure escrow checkout</p>
          <p>
            <Link to="/privacy" className="text-blue hover:underline">Privacy</Link>
            {" · "}
            <Link to="/terms" className="text-blue hover:underline">Terms</Link>
            {" · "}
            <Link to="/faq" className="text-blue hover:underline">FAQ</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
