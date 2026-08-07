import { useState } from "react";
import Button from "../../ui/Button";

export default function WriterCustomers({ customers, orders, onCreate, onUpdate, onDelete }) {
  const [mode, setMode] = useState("list");
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "demo1234", company: "" });

  const orderCount = (id) => orders.filter((o) => o.customerId === id).length;

  const submit = (e) => {
    e.preventDefault();
    if (mode === "edit" && edit) onUpdate(edit.id, form);
    else onCreate(form);
    setMode("list");
    setEdit(null);
    setForm({ name: "", email: "", password: "demo1234", company: "" });
  };

  if (mode !== "list") {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">{mode === "edit" ? "Edit customer" : "Add customer"}</h2>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Company</label>
            <input value={form.company || ""} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          {mode === "create" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">Temp password</label>
              <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
            </div>
          )}
          <div className="flex gap-2">
            <Button type="submit">{mode === "edit" ? "Save" : "Create"}</Button>
            <Button type="button" variant="outline" onClick={() => { setMode("list"); setEdit(null); }}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Customers</h2>
          <p className="text-sm text-slate">Manage client accounts — add, edit, or remove.</p>
        </div>
        <Button size="sm" onClick={() => { setMode("create"); setForm({ name: "", email: "", password: "demo1234", company: "" }); }} className="w-full sm:w-auto">+ Add customer</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((c) => (
          <div key={c.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: c.avatarColor || "#007BFF" }}>
                {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="truncate font-semibold text-ink">{c.name}</div>
                <div className="truncate text-xs text-slate">{c.email}</div>
                <div className="text-[0.7rem] text-slate">{orderCount(c.id)} orders · {c.company || "—"}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => { setEdit(c); setForm({ name: c.name, email: c.email, company: c.company || "", password: c.password }); setMode("edit"); }}>Edit</Button>
              <Button size="sm" variant="danger" className="flex-1" onClick={() => { if (window.confirm(`Remove ${c.name}? Their orders will remain.`)) onDelete(c.id); }}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
