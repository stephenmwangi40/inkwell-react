import { useState } from "react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const empty = { title: "", imageUrl: "", author: "", date: "", body: "" };

export default function WriterBlogs({ blogs = [], onCreate, onUpdate, onDelete }) {
  const [mode, setMode] = useState("list");
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(empty);

  const openCreate = () => {
    setEdit(null);
    setForm({ ...empty, date: new Date().toISOString().slice(0, 10), author: "Admin Desk" });
    setMode("form");
  };
  const openEdit = (b) => {
    setEdit(b);
    setForm({ title: b.title, imageUrl: b.imageUrl || "", author: b.author, date: b.date, body: b.body });
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
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{edit ? "Edit blog post" : "New blog post"}</h2>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Image URL</label>
            <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
            {form.imageUrl && <img src={form.imageUrl} alt="" className="mt-2 h-32 w-full rounded-lg object-cover" onError={(e) => { e.target.style.display = "none"; }} />}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Author</label>
              <input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Date</label>
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Body</label>
            <textarea required rows={10} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue" placeholder="Post content…" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">{edit ? "Save changes" : "Publish post"}</Button>
            <Button type="button" variant="outline" onClick={() => { setMode("list"); setEdit(null); }}>Cancel</Button>
          </div>
          <p className="text-xs text-slate">Published posts appear on the public <strong>/blogs</strong> page.</p>
        </form>
      </div>
    );
  }

  const sorted = [...blogs].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Blog posts</h2>
          <p className="text-sm text-slate">Create and manage posts shown on the marketing site.</p>
        </div>
        <Button size="sm" onClick={openCreate} className="w-full sm:w-auto">+ New post</Button>
      </div>
      <div className="space-y-3">
        {sorted.map((b) => (
          <div key={b.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center sm:p-5">
            {b.imageUrl ? (
              <img src={b.imageUrl} alt="" className="h-24 w-full shrink-0 rounded-xl object-cover sm:h-20 sm:w-32" />
            ) : (
              <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-xl bg-slate-tint text-xs text-slate sm:h-20 sm:w-32">No image</div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-ink">{b.title}</div>
              <div className="mt-1 text-xs text-slate">{b.author} · {b.date}</div>
              <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{b.body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a href="/blogs" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-[10px] border border-line px-3 py-1.5 text-sm font-semibold text-ink hover:border-blue hover:text-blue">View on site</a>
              <Button size="sm" variant="outline" onClick={() => openEdit(b)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => { if (window.confirm("Delete this post?")) onDelete(b.id); }}>Delete</Button>
            </div>
          </div>
        ))}
        {sorted.length === 0 && <p className="rounded-2xl border border-line bg-white py-10 text-center text-slate">No posts yet. Create the first one.</p>}
      </div>
    </div>
  );
}
