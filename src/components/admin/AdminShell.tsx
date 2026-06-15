import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, CreditCard, Images, LogOut, MessageSquareQuote, Newspaper, Settings, ShieldCheck, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const navSections = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", to: "/admin", icon: BarChart3 }],
  },
  {
    label: "Blog",
    items: [
      { label: "All Posts", to: "/admin/posts", icon: Newspaper },
      { label: "New Post", to: "/admin/blog", icon: SquarePen },
    ],
  },
  {
    label: "Website",
    items: [
      { label: "Pricing Links", to: "/admin/pricing-links", icon: CreditCard },
      { label: "Customer Logos", to: "/admin/customer-logos", icon: Images },
      { label: "Testimonials", to: "/admin/testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    label: "Settings",
    items: [{ label: "Settings", to: "/admin/settings", icon: Settings }],
  },
];

const AdminShell = ({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen w-full">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-slate-100 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Cellivo Admin</p>
            <h1 className="mt-2 text-xl font-semibold">Content Dashboard</h1>
            <p className="mt-2 text-sm text-slate-400">A secure publishing workspace for the Cellivo website.</p>
          </div>

          <nav className="flex-1 space-y-6 px-4 py-5">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {section.label}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.to;

                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          active ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 px-4 py-5">
            <div className="rounded-2xl bg-white/5 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{user?.name ?? "Admin User"}</p>
                  <p className="mt-1 text-xs text-slate-400">{user?.email}</p>
                </div>
                <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                  {user?.role ?? "admin"}
                </Badge>
              </div>
              {user?.mustChangePassword ? (
                <p className="mt-3 flex items-center gap-2 text-xs text-amber-200">
                  <ShieldCheck size={12} />
                  Change your bootstrap password soon.
                </p>
              ) : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="mt-4 w-full justify-start rounded-xl px-4 text-slate-200 hover:bg-white/10 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Log out
            </Button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">WordPress-style admin</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
                {description ? <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminShell;
