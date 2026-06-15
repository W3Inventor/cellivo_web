import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAdminAuth } from "@/contexts/AdminAuthContext";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, loading, sessionExpired } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-700 flex items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          Loading admin workspace…
        </div>
      </div>
    );
  }

  if (!user) {
    const loginParams = new URLSearchParams({ next: `${location.pathname}${location.search}` });
    if (sessionExpired) {
      loginParams.set("reason", "session-expired");
    }

    return <Navigate to={`/admin/login?${loginParams.toString()}`} replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
