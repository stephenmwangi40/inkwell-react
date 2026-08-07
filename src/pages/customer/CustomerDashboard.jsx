import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { useApp } from "../../context/AppContext";
import CustomerOverview from "../../components/dashboard/customer/Overview";
import CustomerOrders from "../../components/dashboard/customer/Orders";
import CustomerPayments from "../../components/dashboard/customer/Payments";
import CustomerMessages from "../../components/dashboard/customer/Messages";
import CustomerProfile from "../../components/dashboard/customer/Profile";
import CustomerSupport from "../../components/dashboard/customer/Support";
import CustomerPolicies from "../../components/dashboard/customer/Policies";
import { priceFromWords } from "../../lib/db";

const NAV = [
  { id: "overview", label: "Overview", short: "Home", icon: "▤" },
  { id: "orders", label: "Orders", short: "Orders", icon: "▢" },
  { id: "new", label: "New order", short: "New", icon: "+" },
  { id: "messages", label: "Messages", short: "Chat", icon: "✉" },
];
const MORE = [
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "payments", label: "Payments", icon: "$" },
  { id: "profile", label: "Profile", icon: "◎" },
  { id: "support", label: "Support", icon: "❓" },
  { id: "policies", label: "Policies", icon: "📄" },
];

export default function CustomerDashboard() {
  const { db, updateDB, currentCustomer, isCustomerLoggedIn, logoutCustomer } = useApp();
  const [view, setView] = useState("overview");
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!isCustomerLoggedIn || !currentCustomer) return <Navigate to="/login" replace />;

  const myOrders = useMemo(
    () => db.orders.filter((o) => o.customerId === currentCustomer.id),
    [db.orders, currentCustomer.id]
  );
  const myPayments = useMemo(
    () => db.payments.filter((p) => p.customerId === currentCustomer.id),
    [db.payments, currentCustomer.id]
  );
  const myMethods = useMemo(
    () => (db.paymentMethods || []).filter((m) => m.customerId === currentCustomer.id),
    [db.paymentMethods, currentCustomer.id]
  );
  const myMessages = useMemo(
    () => (db.messages || []).filter((m) => myOrders.some((o) => o.id === m.orderId)),
    [db.messages, myOrders]
  );

  const createOrder = (data) => {
    const id = "ORD-" + (1000 + Math.floor(Math.random() * 9000));
    const price = data.price ?? priceFromWords(data.words);
    const order = {
      id,
      customerId: currentCustomer.id,
      title: data.title,
      type: data.type,
      pages: data.pages,
      words: data.words,
      deadline: data.deadline || new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
      price,
      status: "assigned",
      priority: !!data.priority,
      createdAt: new Date().toISOString().slice(0, 10),
      notes: data.notes || "",
    };
    const method = myMethods.find((m) => m.default) || myMethods[0];
    const fileDocs = (data.files || []).map((f, i) => ({
      id: "doc" + Date.now() + i,
      orderId: id,
      name: f.name,
      size: f.size,
      uploadedBy: data.uploadRole || "customer",
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
          customerId: currentCustomer.id,
          orderId: id,
          amount: price,
          method: method ? `${method.brand} •••• ${method.last4}` : "Visa •••• 4291",
          date: order.createdAt,
          status: "pending",
        },
      ],
      documents: [...(prev.documents || []), ...fileDocs],
    }));
    setView("orders");
  };

  const updateOrder = (id, patch) => {
    updateDB((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => {
        if (o.id !== id || o.customerId !== currentCustomer.id) return o;
        const next = { ...o, ...patch };
        if (patch.words != null) next.price = priceFromWords(patch.words);
        return next;
      }),
    }));
  };

  const deleteOrder = (id) => {
    updateDB((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o)),
    }));
  };

  const sendMessage = (orderId, text) => {
    if (!text?.trim()) return;
    updateDB((prev) => ({
      ...prev,
      messages: [
        ...(prev.messages || []),
        { id: "m" + Date.now(), orderId, from: "customer", text: text.trim(), time: new Date().toISOString().slice(0, 16).replace("T", " ") },
      ],
    }));
  };

  const requestRevision = (orderId) => {
    const note = window.prompt("Revision notes:");
    if (!note) return;
    updateDB((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, status: "revision" } : o)),
      messages: [
        ...(prev.messages || []),
        { id: "m" + Date.now(), orderId, from: "customer", text: "Revision requested: " + note, time: new Date().toISOString().slice(0, 16).replace("T", " ") },
      ],
    }));
  };

  const updateProfile = (patch) => {
    updateDB((prev) => ({
      ...prev,
      customers: prev.customers.map((c) => (c.id === currentCustomer.id ? { ...c, ...patch } : c)),
      session:
        patch.email && patch.email !== currentCustomer.email
          ? { ...prev.session, customerEmail: patch.email }
          : prev.session,
    }));
  };

  const addMethod = (data) => {
    updateDB((prev) => ({
      ...prev,
      paymentMethods: [
        ...(prev.paymentMethods || []),
        {
          id: "pm" + Date.now(),
          customerId: currentCustomer.id,
          brand: data.brand,
          last4: data.last4,
          exp: data.exp,
          name: data.name,
          default: false,
        },
      ],
    }));
  };

  const removeMethod = (id) => {
    updateDB((prev) => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).filter((m) => m.id !== id),
    }));
  };

  const addTicket = ({ subject, body }) => {
    updateDB((prev) => ({
      ...prev,
      supportTickets: [
        ...(prev.supportTickets || []),
        { id: "t" + Date.now(), subject, body, from: "customer", customerId: currentCustomer.id, time: new Date().toISOString().slice(0, 16).replace("T", " ") },
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


  const notificationItems = useMemo(() => {
    const items = [];
    myOrders.filter((o) => ["review", "delivered"].includes(o.status)).forEach((o) => {
      items.push({
        id: "st-" + o.id,
        title: o.status === "review" ? "Draft ready for review" : "Order delivered",
        body: o.title,
        time: o.deadline || o.createdAt,
        view: "orders",
      });
    });
    (db.messages || [])
      .filter((m) => m.from === "writer" && myOrders.some((o) => o.id === m.orderId))
      .slice(-8)
      .reverse()
      .forEach((m) => {
        items.push({
          id: "msg-" + m.id,
          title: "Message from writer",
          body: m.text,
          time: m.time,
          view: "messages",
        });
      });
    return items;
  }, [myOrders, db.messages]);

  return (
    <DashboardShell
      brand="Client Desk"
      navItems={NAV}
      moreItems={MORE}
      active={view}
      onNav={setView}
      userName={currentCustomer.name}
      userSub={currentCustomer.email}
      avatarColor={currentCustomer.avatarColor}
      onLogout={logoutCustomer}
      searchPlaceholder="Search your orders..."
      notificationCount={notificationItems.length}
      notifications={notificationItems}
      onNotifications={() => setView("notifications")}
    >
      {view === "overview" && (
        <CustomerOverview
          orders={myOrders}
          payments={myPayments}
          messages={myMessages}
          onNew={() => setView("new")}
          onOrders={() => setView("orders")}
        />
      )}
      {view === "orders" && (
        <CustomerOrders
          orders={myOrders}
          documents={db.documents || []}
          messages={db.messages || []}
          onCreate={createOrder}
          onUpdate={updateOrder}
          onDelete={deleteOrder}
          onMessage={(id) => { setSelectedOrder(id); setView("messages"); }}
          onRevision={requestRevision}
          onUploadDoc={uploadDoc}
          onDeleteDoc={deleteDoc}
          onSendMessage={sendMessage}
        />
      )}
      {view === "new" && (
        <CustomerOrders
          orders={myOrders}
          forceCreate
          documents={db.documents || []}
          messages={db.messages || []}
          onCreate={(data) => { createOrder(data); setView("orders"); }}
          onUpdate={updateOrder}
          onDelete={deleteOrder}
          onMessage={(id) => { setSelectedOrder(id); setView("messages"); }}
          onRevision={requestRevision}
          onUploadDoc={uploadDoc}
          onDeleteDoc={deleteDoc}
          onSendMessage={sendMessage}
        />
      )}
      {view === "payments" && (
        <CustomerPayments
          payments={myPayments}
          methods={myMethods}
          customer={currentCustomer}
          onAddMethod={addMethod}
          onRemoveMethod={removeMethod}
        />
      )}
      {view === "messages" && (
        <CustomerMessages
          orders={myOrders}
          customers={[currentCustomer]}
          messages={db.messages}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          onSend={sendMessage}
        />
      )}
      {view === "profile" && <CustomerProfile customer={currentCustomer} onUpdate={updateProfile} />}
      {view === "support" && <CustomerSupport onSubmit={addTicket} />}
      
      {view === "notifications" && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink">Notifications</h2>
          <div className="space-y-2">
            {myOrders.filter((o) => ["review", "delivered"].includes(o.status)).map((o) => (
              <div key={o.id} className="rounded-xl border border-line bg-white p-4 text-sm">
                <strong className="text-ink">{o.title}</strong>
                <p className="text-slate">Status is <em>{o.status}</em> — open the order to review or download files.</p>
              </div>
            ))}
            {(db.messages || []).filter((m) => m.from === "writer" && myOrders.some((o) => o.id === m.orderId)).slice(-5).reverse().map((m) => (
              <div key={m.id} className="rounded-xl border border-line bg-white p-4 text-sm">
                <strong className="text-ink">New message</strong>
                <p className="text-slate">{m.text}</p>
                <p className="mt-1 text-xs text-slate">{m.time} · {m.orderId}</p>
              </div>
            ))}
            {myOrders.length === 0 && <p className="text-slate text-sm">No notifications yet. Create an order to get started.</p>}
          </div>
        </div>
      )}

      {view === "policies" && <CustomerPolicies />}
    </DashboardShell>
  );
}
