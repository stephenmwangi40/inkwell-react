import { useState } from "react";
import Button from "../../ui/Button";

export default function CustomerProfile({ customer, onUpdate }) {
  const [form, setForm] = useState({ name: customer.name, email: customer.email, company: customer.company || "" });
  const [pass, setPass] = useState({ cur: "", next: "" });
  const [msg, setMsg] = useState(null);

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Profile</h2>
        <p className="text-sm text-slate">Update your details and password.</p>
      </div>
      <form
        className="space-y-4 rounded-2xl border border-line bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          onUpdate({ name: form.name, email: form.email, company: form.company });
          setMsg({ ok: true, text: "Profile saved." });
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: customer.avatarColor }}>
            {customer.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-ink">{customer.name}</div>
            <div className="text-xs text-slate">Member since {customer.joined}</div>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Company</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
        </div>
        <Button type="submit">Save profile</Button>
      </form>
      <form
        className="space-y-4 rounded-2xl border border-line bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (pass.cur !== customer.password) {
            setMsg({ ok: false, text: "Current password incorrect." });
            return;
          }
          if (pass.next.length < 6) {
            setMsg({ ok: false, text: "New password must be at least 6 characters." });
            return;
          }
          onUpdate({ password: pass.next });
          setPass({ cur: "", next: "" });
          setMsg({ ok: true, text: "Password updated." });
        }}
      >
        <h3 className="font-semibold text-ink">Change password</h3>
        <input type="password" placeholder="Current password" value={pass.cur} onChange={(e) => setPass({ ...pass, cur: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
        <input type="password" placeholder="New password" value={pass.next} onChange={(e) => setPass({ ...pass, next: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
        <Button type="submit" variant="outline">Update password</Button>
      </form>
      {msg && <div className={`rounded-lg px-3 py-2 text-sm ${msg.ok ? "bg-green-50 text-success" : "bg-red-50 text-danger"}`}>{msg.text}</div>}
    </div>
  );
}
