import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/process", label: "How it works" },
  { to: "/writers", label: "Writers" },
  { to: "/samples", label: "Samples" },
  { to: "/blogs", label: "Blog" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container-app flex h-full items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-[1.1rem] font-semibold text-ink no-underline sm:text-[1.22rem]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue text-[1.05rem] font-bold text-white">I&Co</span>
          <span className="hidden sm:inline">Inkwell & Co.</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `text-[0.92rem] font-medium transition-colors hover:text-blue ${isActive ? "text-blue" : "text-ink-soft"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="hidden text-[0.92rem] font-medium text-ink-soft hover:text-blue sm:inline">Log in</Link>
          <Button to="/signup" size="sm" className="!px-3.5 sm:!px-4">Order Now</Button>
          <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line bg-white lg:hidden">
            <span className={`block h-0.5 w-5 bg-ink transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="max-h-[70vh] overflow-y-auto border-t border-line bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-ink-soft hover:bg-slate-tint hover:text-blue">{item.label}</Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-ink-soft hover:bg-slate-tint hover:text-blue">Log in</Link>
            <Link to="/writer-login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-ink-soft hover:bg-slate-tint hover:text-blue">Writer desk</Link>
          </div>
        </div>
      )}
    </header>
  );
}
