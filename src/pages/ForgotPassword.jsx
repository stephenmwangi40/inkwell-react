import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-tint">
      <div className="container-app flex flex-1 flex-col items-center justify-center py-12">
        <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue text-base font-bold text-white">I&Co</span>
          Inkwell & Co.
        </Link>
        <div className="w-full auth-card max-w-md rounded-2xl border border-line bg-white p-6 shadow-md sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-ink">Reset password</h1>
          <p className="mt-1 text-sm text-slate">We’ll email a reset link if that address is registered.</p>
          {sent ? (
            <div className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-success">
              If an account exists for <strong>{email}</strong>, a reset link has been sent. Check your inbox.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" placeholder="you@company.com" />
              </div>
              <Button type="submit" className="w-full">Send reset link</Button>
            </form>
          )}
          <p className="mt-5 text-center text-sm text-slate">
            <Link to="/login" className="font-medium text-blue hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
