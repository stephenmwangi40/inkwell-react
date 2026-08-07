import { useRef, useState } from "react";
import Button from "../../ui/Button";

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

/**
 * Document list + upload for an order.
 * role: "customer" | "writer"
 */
export default function DocumentPanel({ orderId, documents = [], role = "customer", onUpload, onDelete }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const docs = documents.filter((d) => d.orderId === orderId).slice().reverse();

  const handleFiles = async (fileList) => {
    if (!fileList?.length || !onUpload) return;
    setBusy(true);
    try {
      for (const file of Array.from(fileList)) {
        let dataUrl = null;
        try {
          if (file.size <= 1.5 * 1024 * 1024) dataUrl = await readFileAsDataURL(file);
        } catch {
          dataUrl = null;
        }
        onUpload({
          orderId,
          name: file.name,
          size: file.size,
          uploadedBy: role === "writer" ? "writer" : "customer",
          dataUrl,
        });
      }
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-ink">
          {role === "writer" ? "Files & delivery uploads" : "Briefs & reference files"}
        </h4>
        <span className="text-xs text-slate">{docs.length} file{docs.length === 1 ? "" : "s"}</span>
      </div>

      {docs.length === 0 ? (
        <p className="text-xs text-slate">No files uploaded yet.</p>
      ) : (
        <div className="doc-list">
          {docs.map((d) => (
            <div key={d.id} className="doc-item">
              <div className={`ic ${d.uploadedBy === "writer" ? "writer" : "customer"}`}>
                {d.uploadedBy === "writer" ? "AD" : "CL"}
              </div>
              <div className="meta">
                <strong className="truncate">{d.name}</strong>
                <span>
                  {fmtBytes(d.size)} · {d.uploadedBy === "writer" ? "Writer / admin" : "Client"} · {d.uploadedAt}
                </span>
              </div>
              <div className="flex shrink-0 gap-1">
                {d.dataUrl ? (
                  <a className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink hover:border-blue hover:text-blue" href={d.dataUrl} download={d.name}>
                    Download
                  </a>
                ) : (
                  <span className="rounded-full bg-slate-tint px-2 py-0.5 text-[0.7rem] font-semibold text-slate">On file</span>
                )}
                {onDelete && (
                  <button type="button" className="rounded-lg border border-line px-2 py-1 text-xs text-danger hover:bg-red-50" onClick={() => onDelete(d.id)} title="Remove">
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={`dropzone ${drag ? "dragover" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          disabled={busy}
        />
        <div className="ic">📎</div>
        <strong>{busy ? "Uploading…" : role === "writer" ? "Upload finished work" : "Upload brief or reference"}</strong>
        <span>
          {role === "writer"
            ? "The client will see this file on their order"
            : "PDF, DOC, images — max ~1.5MB stored in browser for demo"}
        </span>
      </div>
    </div>
  );
}
