import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardShell({
  brand = "Inkwell & Co.",
  navItems = [],
  moreItems = [],
  active,
  onNav,
  userName = "User",
  userSub = "",
  avatarColor = "#007BFF",
  onLogout,
  searchPlaceholder = "Search…",
  promo,
  notificationCount = 0,
  notifications = [],
  onNotifications,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const initials = (userName || "U").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const title = [...navItems, ...moreItems].find((n) => n.id === active)?.label || "Dashboard";
  const go = (id) => {
    onNav(id);
    setSidebarOpen(false);
    setMenuOpen(false);
    setNotifOpen(false);
  };
  const bottomPrimary = navItems.filter((n) => n.bottom !== false).slice(0, 4);
  const count = Number(notificationCount) || 0;
  const preview = (notifications || []).slice(0, 6);

  useEffect(() => {
    if (!notifOpen) return;
    const onDoc = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [notifOpen]);

  return (
    <div className="app-shell">
      <aside className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="side-brand">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue text-sm font-bold text-white"
            style={{ boxShadow: "inset 0 0 0 2px #FFD700" }}
          >
            I&Co
          </span>
          {brand}
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          <div className="side-section-label">Workspace</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`side-link ${active === item.id ? "active" : ""}`}
              onClick={() => go(item.id)}
            >
              <span className="ic">{item.icon}</span>
              {item.label}
              {item.badge != null && <span className="badge">{item.badge}</span>}
            </button>
          ))}
          {moreItems.length > 0 && (
            <>
              <div className="side-section-label">More</div>
              {moreItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`side-link ${active === item.id ? "active" : ""}`}
                  onClick={() => go(item.id)}
                >
                  <span className="ic">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </>
          )}
          <div className="side-section-label">Account</div>
          <button
            type="button"
            className="side-link"
            onClick={() => {
              onLogout();
              navigate("/");
            }}
          >
            <span className="ic">⇦</span> Log out
          </button>
        </nav>
        {promo && (
          <div className="side-promo">
            <strong>{promo.title}</strong>
            <span>{promo.body}</span>
          </div>
        )}
        <div className="side-foot">
          <div className="side-user">
            <div className="avatar" style={{ background: avatarColor }}>
              {initials}
            </div>
            <div className="who">
              <strong>{userName}</strong>
              <span>{userSub}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className={`sidebar-scrim ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      <div className="app-main">
        <div className="app-topbar">
          <button type="button" className="sidebar-toggle" aria-label="Menu" onClick={() => setSidebarOpen(true)}>
            <span>☰</span>
          </button>
          <h1>{title}</h1>
          <div className="spacer" />
          <div className="topbar-search">
            <span>⌕</span>
            <input placeholder={searchPlaceholder} />
          </div>

          {/* Notification bell next to search */}
          <div className="relative shrink-0" ref={notifRef}>
            <button
              type="button"
              className="topbar-notif"
              aria-label="Notifications"
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen((v) => !v)}
            >
              <span className="topbar-notif-ic" aria-hidden>
                🔔
              </span>
              {count > 0 && (
                <span className="topbar-notif-badge">{count > 9 ? "9+" : count}</span>
              )}
            </button>

            {notifOpen && (
              <div className="topbar-notif-panel">
                <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
                  <strong className="text-sm text-ink">Notifications</strong>
                  {count > 0 && (
                    <span className="rounded-full bg-blue-tint px-2 py-0.5 text-[0.7rem] font-semibold text-blue-dark">
                      {count} new
                    </span>
                  )}
                </div>
                <div className="max-h-[min(50vh,320px)] overflow-y-auto">
                  {preview.length === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-slate">You're all caught up.</p>
                  ) : (
                    preview.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        className="block w-full border-b border-line px-3 py-3 text-left last:border-0 hover:bg-slate-tint"
                        onClick={() => {
                          setNotifOpen(false);
                          if (n.view && onNav) onNav(n.view);
                          else if (onNotifications) onNotifications();
                        }}
                      >
                        <div className="text-sm font-medium text-ink line-clamp-1">{n.title}</div>
                        {n.body && <div className="mt-0.5 text-xs text-slate line-clamp-2">{n.body}</div>}
                        {n.time && <div className="mt-1 text-[0.65rem] text-slate">{n.time}</div>}
                      </button>
                    ))
                  )}
                </div>
                <div className="border-t border-line p-2">
                  <button
                    type="button"
                    className="w-full rounded-lg py-2 text-center text-sm font-semibold text-blue hover:bg-blue-tint"
                    onClick={() => {
                      setNotifOpen(false);
                      if (onNotifications) onNotifications();
                      else go("notifications");
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="hidden rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-soft hover:text-blue sm:inline"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>

        <div className="app-content">{children}</div>

        <nav className="bottom-nav" aria-label="Primary">
          <div className="inner">
            {bottomPrimary.map((item) => (
              <button
                key={item.id}
                type="button"
                className={active === item.id ? "active" : ""}
                onClick={() => go(item.id)}
              >
                <span className="ic">{item.icon}</span>
                {item.short || item.label}
              </button>
            ))}
            <button
              type="button"
              className={moreItems.some((m) => m.id === active) ? "active" : ""}
              onClick={() => setMenuOpen(true)}
            >
              <span className="ic">☰</span>Menu
            </button>
          </div>
        </nav>

        <div className={`menu-sheet-scrim ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)} />
        <div className={`menu-sheet ${menuOpen ? "show" : ""}`}>
          <div className="grabber" />
          <div className="menu-sheet-head">
            <strong>More</strong>
            <button type="button" className="menu-sheet-close" onClick={() => setMenuOpen(false)}>
              ×
            </button>
          </div>
          {moreItems.map((item) => (
            <button key={item.id} type="button" className="menu-sheet-link" onClick={() => go(item.id)}>
              <span className="ic">{item.icon}</span> {item.label}
            </button>
          ))}
          <button
            type="button"
            className="menu-sheet-link"
            onClick={() => {
              setMenuOpen(false);
              navigate("/");
            }}
          >
            <span className="ic">⌂</span> Marketing home
          </button>
          <button
            type="button"
            className="menu-sheet-link logout"
            onClick={() => {
              onLogout();
              navigate("/");
            }}
          >
            <span className="ic">⇦</span> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
