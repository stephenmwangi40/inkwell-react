import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useApp } from "../context/AppContext";

export default function WriterLogin() {
  const { loginWriter } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const res = loginWriter(username, password);
    if (!res.ok) setError(res.error);
    else navigate("/writer");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-tint">
      <div className="container-app flex flex-1 flex-col items-center justify-center py-12">
        <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue text-base font-bold text-white">I&Co</span>
          Writer Desk
        </Link>
        <div className="w-full auth-card max-w-md rounded-2xl border border-line bg-white p-6 shadow-md sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-ink">Writer login</h1>
          <p className="mt-1 text-sm text-slate">Access your desk, orders, and earnings.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{error}</div>}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" placeholder="admin" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 pr-16 text-[0.95rem] outline-none focus:border-blue focus:ring-2 focus:ring-blue/20" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate hover:text-blue">{show ? "Hide" : "Show"}</button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/writer-forgot-password" className="text-sm text-blue hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full">Enter desk</Button>
          </form>
          <p className="mt-5 text-center text-xs text-slate">Demo: admin / writer123</p>
        </div>
      </div>
    </div>
  );
}
