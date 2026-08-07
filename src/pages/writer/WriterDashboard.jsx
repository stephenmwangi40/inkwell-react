import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { useApp } from "../../context/AppContext";
import WriterOverview from "../../components/dashboard/writer/Overview";
import WriterOrders from "../../components/dashboard/writer/Orders";
import WriterCustomers from "../../components/dashboard/writer/Customers";
import WriterEarnings from "../../components/dashboard/writer/Earnings";
import WriterMessages from "../../components/dashboard/writer/Messages";
import WriterSettings from "../../components/dashboard/writer/Settings";
import WriterSupport from "../../components/dashboard/writer/Support";
import WriterRecovery from "../../components/dashboard/writer/Recovery";
import WriterPolicies from "../../components/dashboard/writer/Policies";
import WriterBlogs from "../../components/dashboard/writer/Blogs";
import WriterSamples from "../../components/dashboard/writer/Samples";
import { priceFromWords, seedDB, saveDB } from "../../lib/db";

const NAV = [
  { id: "overview", label: "Overview", short: "Home", icon: "▤" },
  { id: "orders", label: "Orders", short: "Orders", icon: "▢" },
  { id: "customers", label: "Customers", short: "Clients", icon: "◍" },
  { id: "messages", label: "Messages", short: "Chat", icon: "✉" },
];
const MORE = [
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "earnings", label: "Earnings & Payments", icon: "$" },
  { id: "blogs", label: "Blog posts", icon: "✎" },
  { id: "samples", label: "Samples", icon: "▤" },
  { id: "settings", label: "Settings", icon: "⚙" },
  { id: "support", label: "Support", icon: "❓" },
  { id: "recovery", label: "Recovery", icon: "🔒" },
  { id: "policies", label: "Policies", icon: "📄" },
];

export default function WriterDashboard() {
  const { db, updateDB, isWriterLoggedIn, logoutWriter } = useApp();
  const [view, setView] = useState("overview");
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!isWriterLoggedIn) return <Navigate to="/writer-login" replace />;

  const activeCount = db.orders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length;
  const nav = NAV.map((n) => (n.id === "orders" ? { ...n, badge: activeCount } : n));

  const createOrder = (data) => {
    const id = "ORD-" + (1000 + Math.floor(Math.random() * 9000));
    const price = data.price ?? priceFromWords(data.words);
    const order = {
      id,
      customerId: data.customerId,
      title: data.title,
      type: data.type,
      pages: data.pages,
      words: data.words,
      deadline: data.deadline || new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
      price,
      status: data.status || "assigned",
      priority: !!data.priority,
      createdAt: new Date().toISOString().slice(0, 10),
      notes: data.notes || "",
    };
    const fileDocs = (data.files || []).map((f, i) => ({
      id: "doc" + Date.now() + i,
      orderId: id,
      name: f.name,
      size: f.size,
      uploadedBy: data.uploadRole || "writer",
      uploadedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      dataUrl: f.dataUrl || null,
    }));
    updateDB((prev) => ({
      ...prev,
      orders: [...prev.orders, order],
      payments: [
        ...prev.payments,
        {
          id: "PAY-" + Date.now(),
          customerId: data.customerId,
          orderId: id,
          amount: price,
          method: "Visa •••• 4291",
          date: order.createdAt,
          status: "pending",
        },
      ],
      documents: [...(prev.documents || []), ...fileDocs],
    }));
  };

  const updateOrder = (id, patch) => {
    updateDB((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => {
        if (o.id !== id) return o;
        const next = { ...o, ...patch };
        if (patch.words != null && patch.price == null) next.price = priceFromWords(patch.words);
        return next;
      }),
      payments: prev.payments.map((p) =>
        p.orderId === id && patch.price != null ? { ...p, amount: patch.price } : p
      ),
    }));
  };

  const deleteOrder = (id) => {
    updateDB((prev) => ({
      ...prev,
      orders: prev.orders.filter((o) => o.id !== id),
      payments: prev.payments.filter((p) => p.orderId !== id),
      messages: (prev.messages || []).filter((m) => m.orderId !== id),
    }));
  };

  const createCustomer = (data) => {
    updateDB((prev) => ({
      ...prev,
      customers: [
        ...prev.customers,
        {
          id: "c" + Date.now(),
          name: data.name,
          email: data.email,
          password: data.password || "demo1234",
          company: data.company || "",
          joined: new Date().toISOString().slice(0, 10),
          avatarColor: "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"),
        },
      ],
    }));
  };

  const updateCustomer = (id, patch) => {
    updateDB((prev) => ({
      ...prev,
      customers: prev.customers.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  };

  const deleteCustomer = (id) => {
    updateDB((prev) => ({
      ...prev,
      customers: prev.customers.filter((c) => c.id !== id),
    }));
  };

  const sendMessage = (orderId, text) => {
    if (!text?.trim()) return;
    updateDB((prev) => ({
      ...prev,
      messages: [
        ...(prev.messages || []),
        { id: "m" + Date.now(), orderId, from: "writer", text: text.trim(), time: new Date().toISOString().slice(0, 16).replace("T", " ") },
      ],
    }));
  };

  const saveAuth = (auth) => {
    updateDB((prev) => ({ ...prev, writerAuth: auth }));
  };

  const addTicket = ({ subject, body }) => {
    updateDB((prev) => ({
      ...prev,
      supportTickets: [
        ...(prev.supportTickets || []),
        { id: "t" + Date.now(), subject, body, from: "writer", time: new Date().toISOString().slice(0, 16).replace("T", " ") },
      ],
    }));
  };


  const uploadDoc = (doc) => {
    updateDB((prev) => ({
      ...prev,
      documents: [
        ...(prev.documents || []),
        {
          id: "doc" + Date.now() + Math.floor(Math.random() * 1000),
          orderId: doc.orderId,
          name: doc.name,
          size: doc.size,
          uploadedBy: doc.uploadedBy,
          uploadedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
          dataUrl: doc.dataUrl || null,
        },
      ],
    }));
  };

  const deleteDoc = (id) => {
    updateDB((prev) => ({
      ...prev,
      documents: (prev.documents || []).filter((d) => d.id !== id),
    }));
  };


  const createBlog = (data) => {
    updateDB((prev) => ({
      ...prev,
      blogs: [
        ...(prev.blogs || []),
        { id: "b" + Date.now(), ...data },
      ],
    }));
  };
  const updateBlog = (id, data) => {
    updateDB((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).map((b) => (b.id === id ? { ...b, ...data } : b)),
    }));
  };
  const deleteBlog = (id) => {
    updateDB((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).filter((b) => b.id !== id),
    }));
  };

  const createSample = (data) => {
    updateDB((prev) => ({
      ...prev,
      samples: [
        ...(prev.samples || []),
        { id: "s" + Date.now(), ...data },
      ],
    }));
  };
  const updateSample = (id, data) => {
    updateDB((prev) => ({
      ...prev,
      samples: (prev.samples || []).map((s) => (s.id === id ? { ...s, ...data } : s)),
    }));
  };
  const deleteSample = (id) => {
    updateDB((prev) => ({
      ...prev,
      samples: (prev.samples || []).filter((s) => s.id !== id),
    }));
  };


  const notificationItems = useMemo(() => {
    const items = [];
    db.orders.filter((o) => o.status === "assigned").forEach((o) => {
      items.push({
        id: "asg-" + o.id,
        title: "Order assigned",
        body: o.title + " · $" + Number(o.price).toFixed(2),
        time: o.createdAt,
        view: "orders",
      });
    });
    (db.messages || [])
      .filter((m) => m.from === "customer")
      .slice(-8)
      .reverse()
      .forEach((m) => {
        items.push({
          id: "msg-" + m.id,
          title: "Client message",
          body: m.text,
          time: m.time,
          view: "messages",
        });
      });
    return items;
  }, [db.orders, db.messages]);

  return (
    <DashboardShell
      brand="Writer Desk"
      navItems={nav}
      moreItems={MORE}
      active={view}
      onNav={setView}
      userName="Admin Writer"
      userSub="Full access"
      avatarColor="#0056b3"
      onLogout={logoutWriter}
      searchPlaceholder="Search orders, customers..."
      notificationCount={notificationItems.length}
      notifications={notificationItems}
      onNotifications={() => setView("notifications")}
      promo={{ title: "Writer tip", body: "Reply within 2 hours to keep your response-rate badge." }}
    >
      {view === "overview" && (
        <WriterOverview orders={db.orders} customers={db.customers} payments={db.payments} onOpenOrders={() => setView("orders")} />
      )}
      {view === "orders" && (
        <WriterOrders
          orders={db.orders}
          customers={db.customers}
          documents={db.documents || []}
          messages={db.messages || []}
          onCreate={createOrder}
          onUpdate={updateOrder}
          onDelete={deleteOrder}
          onMessage={(id) => { setSelectedOrder(id); setView("messages"); }}
          onUploadDoc={uploadDoc}
          onDeleteDoc={deleteDoc}
          onSendMessage={sendMessage}
        />
      )}
      {view === "customers" && (
        <WriterCustomers customers={db.customers} orders={db.orders} onCreate={createCustomer} onUpdate={updateCustomer} onDelete={deleteCustomer} />
      )}
      {view === "earnings" && <WriterEarnings payments={db.payments} customers={db.customers} orders={db.orders} />}
      {view === "messages" && (
        <WriterMessages
          orders={db.orders}
          customers={db.customers}
          messages={db.messages}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          onSend={sendMessage}
        />
      )}
      {view === "settings" && (
        <WriterSettings
          writerAuth={db.writerAuth}
          onSaveAuth={saveAuth}
          onResetDemo={() => {
            const seeded = seedDB();
            seeded.session = { ...db.session, writerIn: true };
            saveDB(seeded);
            updateDB(() => seeded);
          }}
        />
      )}
      {view === "support" && <WriterSupport tickets={db.supportTickets} onSubmit={addTicket} />}
      {view === "recovery" && <WriterRecovery />}
      {view === "policies" && <WriterPolicies />}
      {view === "notifications" && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink">Notifications</h2>
          <div className="space-y-2">
            {db.orders.filter((o) => o.status === "assigned").map((o) => (
              <div key={o.id} className="rounded-xl border border-line bg-white p-4 text-sm">
                <strong className="text-ink">New / assigned: {o.title}</strong>
                <p className="text-slate">{o.id} · ${Number(o.price).toFixed(2)}</p>
              </div>
            ))}
            {(db.messages || []).filter((m) => m.from === "customer").slice(-8).reverse().map((m) => (
              <div key={m.id} className="rounded-xl border border-line bg-white p-4 text-sm">
                <strong className="text-ink">Client message</strong>
                <p className="text-slate">{m.text}</p>
                <p className="mt-1 text-xs text-slate">{m.time} · {m.orderId}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "blogs" && (
        <WriterBlogs blogs={db.blogs || []} onCreate={createBlog} onUpdate={updateBlog} onDelete={deleteBlog} />
      )}
      {view === "samples" && (
        <WriterSamples samples={db.samples || []} onCreate={createSample} onUpdate={updateSample} onDelete={deleteSample} />
      )}
    </DashboardShell>
  );
}
