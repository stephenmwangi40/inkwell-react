import { useState } from "react";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <MarketingLayout>
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-app">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-blue">Contact</p>
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Talk to the desk</h1>
            <p className="mt-3 text-ink-soft">Mon–Fri · 9am–6pm ET · We reply within one business day.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-8 lg:grid-cols-2">
            <form
              className="space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setForm({ name: "", email: "", message: "" });
              }}
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
              </div>
              {sent && <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-success">Thanks — we’ll reply by email (prototype: message not sent to a server).</div>}
              <Button type="submit" className="w-full sm:w-auto">Send message</Button>
            </form>
            <div className="rounded-2xl border border-line bg-slate-tint/50 p-5 sm:p-6 text-sm text-ink-soft space-y-3">
              <p><strong className="text-ink">Email</strong><br /><a className="text-blue" href="mailto:hello@inkwellandco.com">hello@inkwellandco.com</a></p>
              <p><strong className="text-ink">Writers</strong><br /><a className="text-blue" href="mailto:writers@inkwellandco.com">writers@inkwellandco.com</a></p>
              <p><strong className="text-ink">Hours</strong><br />Monday–Friday, 9:00–18:00 Eastern</p>
              <p className="pt-2 text-xs text-slate">For order issues, use Support inside your client or writer dashboard after sign-in.</p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
