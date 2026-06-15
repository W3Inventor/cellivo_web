import { useEffect, useState } from "react";
import { BarChart3, Globe2, Save, Search, Send } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useInitialData } from "@/contexts/InitialDataContext";
import {
  fetchAdminSeoSettings,
  saveAdminSeoSettings,
  submitGoogleSearchConsoleSitemap,
} from "@/lib/admin-api";
import type { SeoSettingsRecord } from "@/lib/blog";

const defaultSeoSettings: SeoSettingsRecord = {
  sitemapEnabled: true,
  sitemapIncludeStaticPages: true,
  sitemapIncludeBlogPosts: true,
  sitemapDefaultChangefreq: "weekly",
  sitemapDefaultPriority: "0.7",
  googleAnalyticsEnabled: false,
  googleAnalyticsMeasurementId: "",
  googleSearchConsoleVerification: "",
  googleSearchConsolePropertyUrl: "https://cellivo.com",
  googleSearchConsoleServiceAccountJson: "",
  googleSearchConsoleLastSubmittedAt: "",
};

const changefreqOptions = ["daily", "weekly", "monthly", "yearly"];

const AdminSeoSettings = () => {
  const initialData = useInitialData();
  const [settings, setSettings] = useState<SeoSettingsRecord>(
    initialData.adminSeoSettings ?? defaultSeoSettings,
  );
  const [loading, setLoading] = useState(!initialData.adminSeoSettings);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (initialData.adminSeoSettings) return;

    fetchAdminSeoSettings()
      .then((response) => setSettings(response.seoSettings))
      .catch(() => setMessage({ tone: "error", text: "We couldn't load SEO settings right now." }))
      .finally(() => setLoading(false));
  }, [initialData.adminSeoSettings]);

  const updateSetting = <K extends keyof SeoSettingsRecord>(key: K, value: SeoSettingsRecord[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await saveAdminSeoSettings(settings);
      setSettings(response.seoSettings);
      setMessage({ tone: "success", text: "SEO settings saved successfully." });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save SEO settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitSitemap = async () => {
    setSubmitting(true);
    setMessage(null);

    try {
      const savedSettings = await saveAdminSeoSettings(settings);
      setSettings(savedSettings.seoSettings);
      const response = await submitGoogleSearchConsoleSitemap();
      setSettings(response.seoSettings);
      setMessage({ tone: "success", text: response.message });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to submit sitemap to Google Search Console.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="SEO Settings | Cellivo Admin"
        description="Manage sitemap, Google Analytics, and Google Search Console settings for Cellivo."
        canonical="https://cellivo.com/admin/seo-settings"
        noindex
      />
      <AdminShell
        title="SEO Settings"
        description="Control sitemap output, Google Analytics tracking, and Google Search Console submission from one admin page."
        actions={
          <Button type="button" className="rounded-xl" onClick={handleSave} disabled={saving || loading}>
            <Save className="mr-2" size={16} />
            {saving ? "Saving…" : "Save SEO Settings"}
          </Button>
        }
      >
        <div className="space-y-6">
          {message ? (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                message.tone === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          ) : null}

          {loading ? (
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="px-6 py-10 text-center text-sm text-slate-500">Loading SEO settings…</CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="space-y-6">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <Globe2 size={18} />
                      </div>
                      <div>
                        <CardTitle>Sitemap settings</CardTitle>
                        <CardDescription>Control what is included in /sitemap.xml.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-950">Enable sitemap.xml</p>
                        <p className="text-xs text-slate-500">When disabled, /sitemap.xml returns 404.</p>
                      </div>
                      <Switch
                        checked={settings.sitemapEnabled}
                        onCheckedChange={(checked) => updateSetting("sitemapEnabled", checked)}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-950">Static pages</p>
                          <p className="text-xs text-slate-500">Home, features, pricing, contact, etc.</p>
                        </div>
                        <Switch
                          checked={settings.sitemapIncludeStaticPages}
                          onCheckedChange={(checked) => updateSetting("sitemapIncludeStaticPages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-950">Blog posts</p>
                          <p className="text-xs text-slate-500">Published blog posts only.</p>
                        </div>
                        <Switch
                          checked={settings.sitemapIncludeBlogPosts}
                          onCheckedChange={(checked) => updateSetting("sitemapIncludeBlogPosts", checked)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Blog change frequency</Label>
                        <select
                          value={settings.sitemapDefaultChangefreq}
                          onChange={(event) => updateSetting("sitemapDefaultChangefreq", event.target.value)}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {changefreqOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Blog priority</Label>
                        <Input
                          value={settings.sitemapDefaultPriority}
                          onChange={(event) => updateSetting("sitemapDefaultPriority", event.target.value)}
                          placeholder="0.7"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <BarChart3 size={18} />
                      </div>
                      <div>
                        <CardTitle>Google Analytics</CardTitle>
                        <CardDescription>Add your GA4 Measurement ID to load tracking sitewide.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-950">Enable Google Analytics</p>
                        <p className="text-xs text-slate-500">Adds the gtag script to public pages.</p>
                      </div>
                      <Switch
                        checked={settings.googleAnalyticsEnabled}
                        onCheckedChange={(checked) => updateSetting("googleAnalyticsEnabled", checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GA4 Measurement ID</Label>
                      <Input
                        value={settings.googleAnalyticsMeasurementId}
                        onChange={(event) => updateSetting("googleAnalyticsMeasurementId", event.target.value)}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <Search size={18} />
                      </div>
                      <div>
                        <CardTitle>Google Search Console</CardTitle>
                        <CardDescription>Manage verification and submit sitemap through the Search Console API.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label>Verification meta content</Label>
                      <Input
                        value={settings.googleSearchConsoleVerification}
                        onChange={(event) => updateSetting("googleSearchConsoleVerification", event.target.value)}
                        placeholder="Paste only the content value from google-site-verification"
                      />
                      <p className="text-xs text-slate-500">
                        This outputs a sitewide google-site-verification meta tag.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Search Console property URL</Label>
                      <Input
                        value={settings.googleSearchConsolePropertyUrl}
                        onChange={(event) => updateSetting("googleSearchConsolePropertyUrl", event.target.value)}
                        placeholder="https://cellivo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Service account JSON</Label>
                      <Textarea
                        value={settings.googleSearchConsoleServiceAccountJson}
                        onChange={(event) => updateSetting("googleSearchConsoleServiceAccountJson", event.target.value)}
                        className="min-h-[180px] font-mono text-xs"
                        placeholder='{"type":"service_account","client_email":"...","private_key":"..."}'
                      />
                      <p className="text-xs text-slate-500">
                        Add this service account email as an owner or full user in Google Search Console before submitting.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      disabled={submitting}
                      onClick={handleSubmitSitemap}
                    >
                      <Send className="mr-2" size={16} />
                      {submitting ? "Submitting…" : "Submit Sitemap to Google"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>SEO output preview</CardTitle>
                    <CardDescription>Current live values generated from these settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">Sitemap URL</p>
                      <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="mt-1 block text-primary underline">
                        /sitemap.xml
                      </a>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">Google Analytics</p>
                      <p className="mt-1 text-slate-500">
                        {settings.googleAnalyticsEnabled && settings.googleAnalyticsMeasurementId
                          ? `Enabled: ${settings.googleAnalyticsMeasurementId}`
                          : "Not enabled"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">Search Console verification</p>
                      <p className="mt-1 break-all text-slate-500">
                        {settings.googleSearchConsoleVerification || "No verification token saved"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">Last sitemap submission</p>
                      <p className="mt-1 text-slate-500">
                        {settings.googleSearchConsoleLastSubmittedAt
                          ? new Date(settings.googleSearchConsoleLastSubmittedAt).toLocaleString()
                          : "Not submitted from admin yet"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </AdminShell>
    </>
  );
};

export default AdminSeoSettings;
