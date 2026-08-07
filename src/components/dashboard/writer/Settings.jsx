import { useState } from "react";
import Button from "../../ui/Button";

export default function WriterSettings({ writerAuth, onSaveAuth, onResetDemo }) {
  const [username, setUsername] = useState(writerAuth.username);
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [secret, setSecret] = useState(writerAuth.secret);
  const [msg, setMsg] = useState(null);

  const save = (e) => {
    e.preventDefault();
    if (curPass !== writerAuth.password) {
      setMsg({ ok: false, text: "Current password is incorrect." });
      return;
    }
    const next = {
      username: username.trim() || writerAuth.username,
      password: newPass.length >= 8 ? newPass : writerAuth.password,
      secret: secret.trim() || writerAuth.secret,
    };
    onSaveAuth(next);
    setCurPass("");
    setNewPass("");
    setMsg({ ok: true, text: "Settings saved." });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Settings</h2>
        <p className="text-sm text-slate">Change username, password, and recovery question.</p>
      </div>
      <form onSubmit={save} className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-semibold text-ink">Account</h3>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Current password</label>
            <input type="password" required value={curPass} onChange={(e) => setCurPass(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">New password (blank to keep)</label>
            <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="At least 8 characters" className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-semibold text-ink">Password recovery</h3>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Security answer (first pet)</label>
            <input value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded" /> Weekly earnings summary</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded" /> New order notifications</label>
          {msg && <div className={`rounded-lg px-3 py-2 text-sm ${msg.ok ? "bg-green-50 text-success" : "bg-red-50 text-danger"}`}>{msg.text}</div>}
          <Button type="submit">Save settings</Button>
        </div>
      </form>
      {onResetDemo && (
        <div className="rounded-2xl border border-danger/30 bg-red-50/50 p-5">
          <h3 className="font-semibold text-ink">Demo data</h3>
          <p className="mt-1 text-sm text-ink-soft">Reset orders, customers, blogs, and samples to the original prototype seed. This cannot be undone.</p>
          <Button type="button" variant="danger" className="mt-3" onClick={() => { if (window.confirm("Reset all demo data?")) onResetDemo(); }}>Reset demo data</Button>
        </div>
      )}
    </div>
  );
}
