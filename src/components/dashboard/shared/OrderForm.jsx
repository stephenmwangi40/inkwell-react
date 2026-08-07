import { useState, useEffect, useRef } from "react";
import Button from "../../ui/Button";
import { WORD_RATE, WORDS_PER_PAGE, priceFromWords } from "../../../lib/db";

const TYPES = ["Business Copy", "Research Report", "Brand Copy", "PR Copy", "Academic", "Editing"];

function fmtBytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / (1024 * 1024)).toFixed(1) + " MB";
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function OrderForm({
  initial,
  customers,
  onSubmit,
  onCancel,
  showCustomer = false,
  uploadRole = "customer",
}) {
  const inputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    type: "Business Copy",
    words: 1000,
    pages: 4,
    deadline: "",
    notes: "",
    customerId: customers?.[0]?.id || "",
    status: "assigned",
    priority: false,
    ...initial,
  });
  const [files, setFiles] = useState([]); // { name, size, file, dataUrl? }
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (initial) setForm((f) => ({ ...f, ...initial }));
  }, [initial]);

  const setWords = (w) => {
    const words = Math.max(0, Number(w) || 0);
    setForm((f) => ({ ...f, words, pages: Math.max(1, Math.round(words / WORDS_PER_PAGE)) }));
  };
  const setPages = (p) => {
    const pages = Math.max(1, Number(p) || 1);
    setForm((f) => ({ ...f, pages, words: pages * WORDS_PER_PAGE }));
  };

  const base = priceFromWords(form.words);
  const price = form.priority ? Math.round(base * 1.25 * 100) / 100 : base;

  const addFiles = async (fileList) => {
    if (!fileList?.length) return;
    const next = [];
    for (const file of Array.from(fileList)) {
      let dataUrl = null;
      try {
        if (file.size <= 1.5 * 1024 * 1024) dataUrl = await readFileAsDataURL(file);
      } catch {
        dataUrl = null;
      }
      next.push({ name: file.name, size: file.size, dataUrl, id: "f" + Date.now() + Math.random() });
    }
    setFiles((prev) => [...prev, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handle = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await onSubmit({
        ...form,
        price,
        words: Number(form.words),
        pages: Number(form.pages),
        files, // staged uploads
        uploadRole,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handle} className="space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
      {showCustomer && customers && (
        <div>
          <label className="mb-1.5 block text-sm font-medium">Customer</label>
          <select
            value={form.customerId}
            onChange={(e) => setForm({ ...form, customerId: e.target.value })}
            className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
            required
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-sm font-medium">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
          placeholder="Project title"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
        >
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Words</label>
          <input
            type="number"
            min={50}
            value={form.words}
            onChange={(e) => setWords(e.target.value)}
            className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
          />
          <p className="mt-1 text-xs text-slate">${WORD_RATE.toFixed(2)} per word</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Pages (~{WORDS_PER_PAGE} words)</label>
          <input
            type="number"
            min={1}
            value={form.pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Estimated price</label>
          <div className="rounded-[10px] border border-line bg-slate-tint px-3.5 py-2.5 font-semibold text-ink">
            ${price.toFixed(2)}
          </div>
          <p className="mt-1 text-xs text-slate">
            {form.words} words × ${WORD_RATE}
            {form.priority ? " · priority +25%" : ""}
          </p>
        </div>
      </div>
      {showCustomer && (
        <div>
          <label className="mb-1.5 block text-sm font-medium">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
          >
            {["assigned", "drafting", "review", "revision", "delivered", "cancelled"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.checked })}
          className="rounded"
        />
        Priority 3-day turnaround (+25%)
      </label>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Brief / notes</label>
        <textarea
          rows={3}
          value={form.notes || ""}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
          placeholder="Audience, tone, key points…"
        />
      </div>

      {/* Upload documents when creating / editing order */}
      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {uploadRole === "writer" ? "Attach delivery or reference files" : "Upload brief / reference documents"}
        </label>
        <div
          className={`dropzone ${drag ? "dragover" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            disabled={busy}
          />
          <div className="ic">📎</div>
          <strong>{uploadRole === "writer" ? "Add files for this order" : "Add briefs, briefs PDFs, or references"}</strong>
          <span>Drag & drop or click · PDF, DOC, images · up to ~1.5MB each stored in demo</span>
        </div>
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-line bg-slate-tint/50 px-3 py-2 text-sm"
              >
                <span className="min-w-0 truncate font-medium text-ink">
                  {f.name}{" "}
                  <span className="font-normal text-slate">({fmtBytes(f.size)})</span>
                </span>
                <button
                  type="button"
                  className="shrink-0 text-xs font-semibold text-danger hover:underline"
                  onClick={() => removeFile(f.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto" disabled={busy}>
          {busy ? "Saving…" : initial?.id ? "Save changes" : "Create order"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        )}
      </div>
      <p className="secure-badge text-xs">🔒 Secure checkout — funds held until draft approval</p>
    </form>
  );
}
