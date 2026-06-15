import { useEffect, useState } from "react";
import { CreditCard, FileClock, FileText, Images, MessageSquareQuote, Newspaper, Settings, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import SEOHead from "@/components/SEOHead";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAdminDashboard } from "@/lib/admin-api";
import { useInitialData } from "@/contexts/InitialDataContext";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import type { AdminDashboardData } from "@/lib/blog";

const statCards = [
  { key: "totalPosts", label: "Total posts", icon: Newspaper },
  { key: "publishedPosts", label: "Published", icon: FileText },
  { key: "scheduledPosts", label: "Scheduled", icon: FileClock },
  { key: "draftPosts", label: "Drafts", icon: ShieldCheck },
] as const;

const AdminDashboard = () => {
  const initialData = useInitialData();
  const { user } = useAdminAuth();
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(initialData.adminDashboard ?? null);
  const [dashboardMessage, setDashboardMessage] = useState<{ tone: "error"; text: string } | null>(null);

  useEffect(() => {
    if (dashboard) return;

    fetchAdminDashboard()
      .then((response) => {
        setDashboard(response);
      })
      .catch(() => {
        setDashboardMessage({
          tone: "error",
          text: "We couldn't load the latest dashboard stats right now.",
        });
      });
  }, [dashboard]);

  return (
    <>
      <SEOHead
        title="Admin Dashboard | Cellivo"
        description="Secure content dashboard for Cellivo publishing and SEO management."
        canonical="https://cellivo.com/admin"
        noindex
      />
      <AdminShell
        title="Admin Dashboard"
        description="Manage publishing, homepage social proof, and keep the secure admin workspace healthy."
        actions={
          <>
            <Link to="/admin/blog">
              <Button className="rounded-xl">Create New Post</Button>
            </Link>
            <Link to="/admin/posts">
              <Button variant="outline" className="rounded-xl">Manage Blog Posts</Button>
            </Link>
          </>
        }
      >
        <div className="space-y-6">
          {dashboardMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {dashboardMessage.text}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              const value = dashboard?.stats[card.key] ?? 0;

              return (
                <Card key={card.key} className="border-slate-200 shadow-sm">
                  <CardContent className="flex items-center justify-between px-6 py-5">
                    <div>
                      <p className="text-sm text-slate-500">{card.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                      <Icon size={18} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Recent blog posts</CardTitle>
                  <CardDescription>Your most recently updated content items.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboard?.recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-medium text-slate-950">{post.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          /{post.slug} · {post.status} · {post.publishDate.slice(0, 10)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/admin/blog?post=${post.id}`}>
                          <Button variant="outline" className="h-9 rounded-lg px-4 text-xs">
                            Open editor
                          </Button>
                        </Link>
                        <Link to={`/admin/blog/preview/${post.id}`} target="_blank" rel="noreferrer">
                          <Button className="h-9 rounded-lg px-4 text-xs">Preview</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-6 xl:grid-cols-2">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <CardTitle>Pricing links</CardTitle>
                        <CardDescription>
                          Control where each package CTA button sends pricing visitors.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-sm text-slate-500">Package buttons</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-950">
                        {dashboard?.pricingPlanLinks.length ?? 0}
                      </p>
                    </div>
                    <Link to="/admin/pricing-links">
                      <Button className="w-full rounded-xl">Manage Pricing Links</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <Images size={18} />
                      </div>
                      <div>
                        <CardTitle>Customer logos</CardTitle>
                        <CardDescription>
                          Manage the homepage logo carousel and customer brand marks.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-sm text-slate-500">Active logos</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-950">
                        {dashboard?.socialProof.customerLogos.filter((item) => item.isActive).length ?? 0}
                      </p>
                    </div>
                    <Link to="/admin/customer-logos">
                      <Button className="w-full rounded-xl">Manage Customer Logos</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <MessageSquareQuote size={18} />
                      </div>
                      <div>
                        <CardTitle>Testimonials</CardTitle>
                        <CardDescription>
                          Edit the review quotes and proof points shown on the homepage.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-sm text-slate-500">Active testimonials</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-950">
                        {dashboard?.socialProof.testimonials.filter((item) => item.isActive).length ?? 0}
                      </p>
                    </div>
                    <Link to="/admin/testimonials">
                      <Button className="w-full rounded-xl">Manage Testimonials</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Admin security</CardTitle>
                  <CardDescription>Your current dashboard session and access level.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="font-medium text-slate-950">{user?.name}</p>
                    <p className="mt-1">{user?.email}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{user?.role}</p>
                    {user?.mustChangePassword ? (
                      <p className="mt-3 text-sm text-amber-700">
                        You're still using the bootstrap password. Open Settings to change it.
                      </p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                      <Settings size={18} />
                    </div>
                    <div>
                      <CardTitle>Settings</CardTitle>
                      <CardDescription>SMTP, password, and SEO controls are grouped in one settings page.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600">
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">Contact form SMTP</div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">Change admin password</div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">SEO Settings</div>
                  </div>
                  <Link to="/admin/settings">
                    <Button className="w-full rounded-xl">Open Settings</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminShell>
    </>
  );
};

export default AdminDashboard;
