import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useApp } from "../context/AppContext";

export default function Signup() {
  const { signupCustomer } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const res = signupCustomer({ name, email, password });
    if (!res.ok) setError(res.error);
    else navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-tint">
      <div className="container-app flex flex-1 flex-col items-center justify-center py-12">
        <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue text-base font-bold text-white">I&Co</span>
          Inkwell & Co.
        </Link>
        <div className="w-full auth-card max-w-md rounded-2xl border border-line bg-white p-6 shadow-md sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-ink">Create your account</h1>
          <p className="mt-1 text-sm text-slate">Start a free brief — matched to a vetted writer within hours.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{error}</div>}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Full name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" placeholder="Amara Chen" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Work email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" placeholder="you@company.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 pr-16 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate hover:text-blue">{show ? "Hide" : "Show"}</button>
              </div>
            </div>
            <Button type="submit" className="w-full">Create account</Button>
          </form>
          <p className="mt-5 text-center text-sm text-slate">
            Already have an account? <Link to="/login" className="font-medium text-blue hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
