import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getDB, saveDB, seedDB } from "../lib/db";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [db, setDb] = useState(() => getDB());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDb(getDB());
    setReady(true);
  }, []);

  const updateDB = useCallback((updater) => {
    setDb((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveDB(next);
      return next;
    });
  }, []);

  const loginCustomer = useCallback((email, password) => {
    const current = getDB();
    const customer = current.customers.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (!customer) return { ok: false, error: "Invalid email or password." };
    const next = {
      ...current,
      session: { ...current.session, customerEmail: customer.email, writerIn: false },
    };
    saveDB(next);
    setDb(next);
    return { ok: true, customer };
  }, []);

  const signupCustomer = useCallback(({ name, email, password }) => {
    const current = getDB();
    if (current.customers.some((c) => c.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with that email already exists." };
    }
    const customer = {
      id: "c" + Date.now(),
      name,
      email,
      password,
      joined: new Date().toISOString().slice(0, 10),
      avatarColor: "#007BFF",
    };
    const next = {
      ...current,
      customers: [...current.customers, customer],
      session: { ...current.session, customerEmail: email, writerIn: false },
    };
    saveDB(next);
    setDb(next);
    return { ok: true, customer };
  }, []);

  const logoutCustomer = useCallback(() => {
    updateDB((prev) => ({
      ...prev,
      session: { ...prev.session, customerEmail: null },
    }));
  }, [updateDB]);

  const loginWriter = useCallback((username, password) => {
    const current = getDB();
    if (
      current.writerAuth.username === username &&
      current.writerAuth.password === password
    ) {
      const next = {
        ...current,
        session: { ...current.session, writerIn: true, customerEmail: null },
      };
      saveDB(next);
      setDb(next);
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials." };
  }, []);

  const logoutWriter = useCallback(() => {
    updateDB((prev) => ({
      ...prev,
      session: { ...prev.session, writerIn: false },
    }));
  }, [updateDB]);

  const currentCustomer = db.customers.find(
    (c) => c.email === db.session.customerEmail
  ) || null;

  const value = {
    db,
    updateDB,
    ready,
    currentCustomer,
    isCustomerLoggedIn: !!db.session.customerEmail,
    isWriterLoggedIn: !!db.session.writerIn,
    loginCustomer,
    signupCustomer,
    logoutCustomer,
    loginWriter,
    logoutWriter,
    resetDemo: () => {
      const seeded = seedDB();
      saveDB(seeded);
      setDb(seeded);
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
