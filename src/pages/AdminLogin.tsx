import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/lib/admin-api";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = new URLSearchParams(location.search).get("next") || "/admin";
  const loginReason = new URLSearchParams(location.search).get("reason");
  const sessionExpired = loginReason === "session-expired";

  useEffect(() => {
    if (user) {
      navigate("/admin", { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await loginAdmin(email, password);
      setUser(response.user);
      navigate(next, { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <SEOHead
        title="Admin Login | Cellivo"
        description="Secure admin login for Cellivo content and publishing."
        canonical="https://cellivo.com/admin/login"
        noindex
      />

      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_420px]">
        <div className="hidden rounded-[32px] bg-slate-950 p-10 text-white lg:block">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Secure publishing
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            A protected admin workspace for content, SEO, and publishing.
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Manage blog posts, scheduling, metadata, schema, and internal linking from one secure dashboard built for the Cellivo team.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "HTTP-only admin sessions",
              "Idle session expiry",
              "Failed-login lockout",
              "Password-protected publishing",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                <ShieldCheck size={16} className="mb-3 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Admin login</CardTitle>
            <CardDescription>
              Use your secure admin account to access the content dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@cellivo.com"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : sessionExpired ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Your admin session expired for security. Please sign in again to continue.
                </div>
              ) : null}

              <Button type="submit" className="h-11 w-full rounded-xl" disabled={submitting}>
                <LockKeyhole size={16} className="mr-2" />
                {submitting ? "Signing in…" : "Sign in to admin"}
              </Button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Need the public site instead?{" "}
              <Link to="/" className="font-medium text-primary hover:underline">
                Return to Cellivo
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
