import { useState } from "react";
import Button from "../../ui/Button";
import StatusPill from "../shared/StatusPill";
import OrderForm from "../shared/OrderForm";
import { STATUS_LABELS, STATUS_ORDER } from "../../../lib/db";
import DocumentPanel from "../shared/DocumentPanel";
import OrderDetail from "../shared/OrderDetail";

export default function WriterOrders({ orders, customers, documents = [], onCreate, onUpdate, onDelete, onMessage, onUploadDoc, onDeleteDoc, messages = [], onSendMessage }) {
  const [mode, setMode] = useState("list"); // list | create | edit
  const [edit, setEdit] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const name = (id) => customers.find((c) => c.id === id)?.name || id;

  const sorted = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  
  if (detailId) {
    const order = orders.find((o) => o.id === detailId);
    if (order) {
      return (
        <OrderDetail
          order={order}
          customerName={name(order.customerId)}
          messages={messages}
          documents={documents}
          role="writer"
          onBack={() => setDetailId(null)}
          onUpdateStatus={(id, status) => onUpdate(id, { status })}
          onSendMessage={onSendMessage}
          onUploadDoc={onUploadDoc}
          onDeleteDoc={onDeleteDoc}
        />
      );
    }
  }

  if (mode === "create" || mode === "edit") {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{mode === "edit" ? "Edit order" : "Create order"}</h2>
        <OrderForm
          uploadRole="writer"
          showCustomer
          customers={customers}
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
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">All orders</h2>
          <p className="text-sm text-slate">Create, edit, or delete any order.</p>
        </div>
        <Button size="sm" onClick={() => setMode("create")} className="w-full sm:w-auto">+ New order</Button>
      </div>
      <div className="space-y-3">
        {sorted.map((o) => (
          <div key={o.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold text-ink">{o.title}</div>
                <div className="mt-1 text-xs text-slate sm:text-sm">
                  {o.id} · {name(o.customerId)} · {o.type} · {o.words || o.pages * 250} words · Due {o.deadline}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={o.status} />
                <span className="text-sm font-semibold text-ink">${Number(o.price).toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onUpdate(o.id, { status: s })}
                  className={`rounded-lg border px-2 py-1 text-[0.7rem] font-medium ${o.status === s ? "border-blue bg-blue-tint text-blue-dark" : "border-line text-slate hover:border-blue"}`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button size="sm" className="w-full sm:w-auto" onClick={() => setDetailId(o.id)}>Open order</Button>
              <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={() => { setEdit(o); setMode("edit"); }}>Edit</Button>
              <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={() => onMessage(o.id)}>Messages</Button>
              <Button size="sm" variant="danger" className="w-full sm:w-auto" onClick={() => { if (window.confirm(`Delete ${o.id}?`)) onDelete(o.id); }}>Delete</Button>
            </div>
            <DocumentPanel
              orderId={o.id}
              documents={documents}
              role="writer"
              onUpload={onUploadDoc}
              onDelete={onDeleteDoc}
            />
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">No orders yet</p>
            <p className="mt-2 text-sm text-slate">Create an order or wait for a client brief.</p>
            <Button size="sm" className="mt-5" onClick={() => setMode("create")}>+ New order</Button>
          </div>
        )}
      </div>
    </div>
  );
}
