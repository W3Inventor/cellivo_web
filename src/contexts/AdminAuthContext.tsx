import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { ADMIN_SESSION_EXPIRED_EVENT, fetchAdminSession, logoutAdmin } from "@/lib/admin-api";
import type { AdminSessionUser } from "@/lib/blog";
import { useInitialData } from "@/contexts/InitialDataContext";

interface AdminAuthContextValue {
  user: AdminSessionUser | null;
  loading: boolean;
  sessionExpired: boolean;
  refresh: () => Promise<AdminSessionUser | null>;
  logout: () => Promise<void>;
  setUser: (user: AdminSessionUser | null) => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const initialData = useInitialData();
  const [user, setUserState] = useState<AdminSessionUser | null>(initialData.adminSession ?? null);
  const [loading, setLoading] = useState(location.pathname.startsWith("/admin") && !initialData.adminSession);
  const [sessionExpired, setSessionExpired] = useState(false);

  const setUser = useCallback((nextUser: AdminSessionUser | null) => {
    setUserState(nextUser);
    if (nextUser) {
      setSessionExpired(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const response = await fetchAdminSession();
      setUser(response.user);
      return response.user;
    } catch {
      setUser(null);
      if (location.pathname.startsWith("/admin") && location.pathname !== "/admin/login") {
        setSessionExpired(true);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [location.pathname, setUser]);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } finally {
      setUser(null);
      setSessionExpired(false);
    }
  }, [setUser]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setUserState(null);
      setSessionExpired(true);
      setLoading(false);
    };

    window.addEventListener(ADMIN_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(ADMIN_SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      setLoading(false);
      return;
    }

    if (initialData.adminSession && location.pathname !== "/admin/login") {
      setUser(initialData.adminSession);
      setLoading(false);
      return;
    }

    setLoading(true);
    void refresh();
  }, [initialData.adminSession, location.pathname, refresh]);

  const value = useMemo(
    () => ({
      user,
      loading,
      sessionExpired,
      refresh,
      logout,
      setUser,
    }),
    [loading, logout, refresh, sessionExpired, setUser, user],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
