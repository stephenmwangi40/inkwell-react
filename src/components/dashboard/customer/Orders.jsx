import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import StatusPill from "../shared/StatusPill";
import OrderForm from "../shared/OrderForm";
import DocumentPanel from "../shared/DocumentPanel";
import OrderDetail from "../shared/OrderDetail";

export default function CustomerOrders({ orders, onCreate, onUpdate, onDelete, onMessage, onRevision, forceCreate = false, documents = [], onUploadDoc, onDeleteDoc, messages = [], onSendMessage }) {
  const [mode, setMode] = useState(forceCreate ? "create" : "list");
  const [detailId, setDetailId] = useState(null);
  useEffect(() => { if (forceCreate) setMode("create"); }, [forceCreate]);
  const [edit, setEdit] = useState(null);
  const sorted = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  
  if (detailId) {
    const order = orders.find((o) => o.id === detailId);
    if (order) {
      return (
        <OrderDetail
          order={order}
          messages={messages}
          documents={documents}
          role="customer"
          onBack={() => setDetailId(null)}
          onSendMessage={onSendMessage}
          onUploadDoc={onUploadDoc}
          onDeleteDoc={onDeleteDoc}
          onRequestRevision={onRevision}
        />
      );
    }
  }

  if (mode === "create" || mode === "edit") {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">{mode === "edit" ? "Edit order" : "New order"}</h2>
        <OrderForm
          uploadRole="customer"
          initial={edit}
          onCancel={() => { setMode("list"); setEdit(null); }}
          onSubmit={(data) => {
            if (mode === "edit" && edit?.id) onUpdate(edit.id, data);
            else onCreate(data);
            setMode("list");
            setEdit(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">My orders</h2>
          <p className="text-sm text-slate">Create, update briefs, or request revisions · $0.04/word</p>
        </div>
        <Button size="sm" onClick={() => setMode("create")} className="w-full sm:w-auto">+ New order</Button>
      </div>
      <div className="space-y-3">
        {sorted.map((o) => (
          <div key={o.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-ink">{o.title}</div>
                <div className="mt-1 text-xs text-slate sm:text-sm">
                  {o.id} · {o.type} · {o.words || o.pages * 250} words · Due {o.deadline}
                </div>
              </div>
              <div className="text-right">
                <StatusPill status={o.status} />
                <div className="mt-1 text-sm font-semibold">${Number(o.price).toFixed(2)}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button size="sm" className="w-full sm:w-auto" onClick={() => setDetailId(o.id)}>Open order</Button>
              {["assigned", "drafting"].includes(o.status) && (
                <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={() => { setEdit(o); setMode("edit"); }}>Edit brief</Button>
              )}
              <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={() => onMessage(o.id)}>Messages</Button>
              {["review", "delivered"].includes(o.status) && (
                <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={() => onRevision(o.id)}>Request revision</Button>
              )}
              {["assigned"].includes(o.status) && (
                <Button size="sm" variant="danger" className="w-full sm:w-auto" onClick={() => { if (window.confirm("Cancel this order?")) onDelete(o.id); }}>Cancel</Button>
              )}
            </div>
            <DocumentPanel
              orderId={o.id}
              documents={documents}
              role="customer"
              onUpload={onUploadDoc}
              onDelete={onDeleteDoc}
            />
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">No orders yet</p>
            <p className="mt-2 text-sm text-slate">Start with a short brief — we’ll match a writer and track every stage here.</p>
            <Button size="sm" className="mt-5" onClick={() => setMode("create")}>+ Create your first order</Button>
          </div>
        )}
      </div>
    </div>
  );
}
