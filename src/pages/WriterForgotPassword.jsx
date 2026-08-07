import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { useApp } from "../context/AppContext";

export default function WriterForgotPassword() {
  const { db } = useApp();
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (secret.toLowerCase().trim() === db.writerAuth.secret.toLowerCase()) {
      setResult({ ok: true, msg: `Password is: ${db.writerAuth.password}` });
    } else {
      setResult({ ok: false, msg: "Secret answer incorrect." });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-tint">
      <div className="container-app flex flex-1 flex-col items-center justify-center py-12">
        <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue text-base font-bold text-white">I&Co</span>
          Writer Desk
        </Link>
        <div className="w-full auth-card max-w-md rounded-2xl border border-line bg-white p-6 shadow-md sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-ink">Recover access</h1>
          <p className="mt-1 text-sm text-slate">Answer the security question to recover your password.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">What was your first pet’s name?</label>
              <input type="text" required value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" />
            </div>
            {result && (
              <div className={`rounded-lg px-3 py-2 text-sm ${result.ok ? "bg-green-50 text-success" : "bg-red-50 text-danger"}`}>
                {result.msg}
              </div>
            )}
            <Button type="submit" className="w-full">Recover</Button>
          </form>
          <p className="mt-5 text-center text-sm text-slate">
            <Link to="/writer-login" className="font-medium text-blue hover:underline">Back to writer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
