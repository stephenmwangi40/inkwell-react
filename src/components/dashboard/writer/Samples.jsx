import { useState } from "react";
import Button from "../../ui/Button";

const empty = { category: "Business", subcategory: "", title: "", paper: "" };
const CATEGORIES = ["Business", "Research", "Brand", "PR", "Academic", "Editing", "Other"];

export default function WriterSamples({ samples = [], onCreate, onUpdate, onDelete }) {
  const [mode, setMode] = useState("list");
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(empty);

  const openCreate = () => { setEdit(null); setForm(empty); setMode("form"); };
  const openEdit = (s) => {
    setEdit(s);
    setForm({ category: s.category, subcategory: s.subcategory || "", title: s.title, paper: s.paper });
    setMode("form");
  };

  const submit = (e) => {
    e.preventDefault();
    if (edit) onUpdate(edit.id, form);
    else onCreate(form);
    setMode("list");
    setEdit(null);
    setForm(empty);
  };

  if (mode === "form") {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{edit ? "Edit sample" : "New writing sample"}</h2>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Subcategory</label>
              <input required value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} placeholder="e.g. Pitch narrative" className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Paper / sample text</label>
            <textarea required rows={10} value={form.paper} onChange={(e) => setForm({ ...form, paper: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" placeholder="Description or excerpt of the sample work…" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">{edit ? "Save changes" : "Add sample"}</Button>
            <Button type="button" variant="outline" onClick={() => { setMode("list"); setEdit(null); }}>Cancel</Button>
          </div>
          <p className="text-xs text-slate">Samples appear on the public <strong>/samples</strong> page.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Writing samples</h2>
          <p className="text-sm text-slate">Showcase work by category for the marketing site.</p>
        </div>
        <Button size="sm" onClick={openCreate} className="w-full sm:w-auto">+ New sample</Button>
      </div>
      <div className="space-y-3">
        {samples.map((s) => (
          <div key={s.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-blue">{s.category} · {s.subcategory}</div>
                <div className="mt-1 font-semibold text-ink">{s.title}</div>
                <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{s.paper}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`/samples/${s.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-[10px] border border-line px-3 py-1.5 text-sm font-semibold text-ink hover:border-blue hover:text-blue">View on site</a>
                <Button size="sm" variant="outline" onClick={() => openEdit(s)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => { if (window.confirm("Delete this sample?")) onDelete(s.id); }}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
        {samples.length === 0 && <p className="rounded-2xl border border-line bg-white py-10 text-center text-slate">No samples yet.</p>}
      </div>
    </div>
  );
}
