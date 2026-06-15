import { useEffect, useMemo, useState } from "react";
import { BarChart3, Globe2, KeyRound, Mail, Save, Search, Send, Settings as SettingsIcon } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useInitialData } from "@/contexts/InitialDataContext";
import {
  changeAdminPasswordRequest,
  fetchAdminSeoSettings,
  fetchAdminSmtpSettings,
  saveAdminSeoSettings,
  saveAdminSmtpSettings,
  sendAdminSmtpTestEmail,
  submitGoogleSearchConsoleSitemap,
} from "@/lib/admin-api";
import type { SeoSettingsRecord, SmtpSettingsRecord } from "@/lib/blog";

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

const defaultSmtpSettings: SmtpSettingsRecord = {
  enabled: false,
  host: "",
  port: 587,
  encryption: "tls",
  username: "",
  password: "",
  hasPassword: false,
  fromName: "Cellivo Team",
  fromEmail: "hello@cellivo.com",
  toEmail: "hello@cellivo.com",
};

const changefreqOptions = ["daily", "weekly", "monthly", "yearly"];

const messageClassNames = {
  success: "border-green-200 bg-green-50 text-green-700",
  error: "border-red-200 bg-red-50 text-red-700",
} as const;

const AdminSettings = () => {
  const initialData = useInitialData();
  const { setUser } = useAdminAuth();
  const [seoSettings, setSeoSettings] = useState<SeoSettingsRecord>(
    initialData.adminSeoSettings ?? defaultSeoSettings,
  );
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettingsRecord>(
    initialData.adminSmtpSettings ?? defaultSmtpSettings,
  );
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [seoLoading, setSeoLoading] = useState(!initialData.adminSeoSettings);
  const [smtpLoading, setSmtpLoading] = useState(!initialData.adminSmtpSettings);
  const [savingSeo, setSavingSeo] = useState(false);
  const [submittingSeo, setSubmittingSeo] = useState(false);
  const [savingSmtp, setSavingSmtp] = useState(false);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [seoMessage, setSeoMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [smtpMessage, setSmtpMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (initialData.adminSeoSettings) return;

    fetchAdminSeoSettings()
      .then((response) => setSeoSettings(response.seoSettings))
      .catch(() => setSeoMessage({ tone: "error", text: "We couldn't load SEO settings right now." }))
      .finally(() => setSeoLoading(false));
  }, [initialData.adminSeoSettings]);

  useEffect(() => {
    if (initialData.adminSmtpSettings) return;

    fetchAdminSmtpSettings()
      .then((response) => setSmtpSettings(response.smtpSettings))
      .catch(() => setSmtpMessage({ tone: "error", text: "We couldn't load SMTP settings right now." }))
      .finally(() => setSmtpLoading(false));
  }, [initialData.adminSmtpSettings]);

  const passwordMismatch = useMemo(
    () => passwordState.confirmPassword.length > 0 && passwordState.newPassword !== passwordState.confirmPassword,
    [passwordState.confirmPassword, passwordState.newPassword],
  );

  const updateSeoSetting = <K extends keyof SeoSettingsRecord>(key: K, value: SeoSettingsRecord[K]) => {
    setSeoSettings((current) => ({ ...current, [key]: value }));
  };

  const updateSmtpSetting = <K extends keyof SmtpSettingsRecord>(key: K, value: SmtpSettingsRecord[K]) => {
    setSmtpSettings((current) => ({ ...current, [key]: value }));
  };

  const updateSmtpPort = (port: number) => {
    setSmtpSettings((current) => ({
      ...current,
      port,
      encryption:
        current.encryption === "ssl" && port === 587
          ? "tls"
          : current.encryption === "tls" && port === 465
            ? "ssl"
            : current.encryption,
    }));
  };

  const updateSmtpEncryption = (encryption: SmtpSettingsRecord["encryption"]) => {
    setSmtpSettings((current) => ({
      ...current,
      encryption,
      port:
        encryption === "ssl" && current.port === 587
          ? 465
          : encryption === "tls" && current.port === 465
            ? 587
            : current.port,
    }));
  };

  const handleSeoSave = async () => {
    setSavingSeo(true);
    setSeoMessage(null);

    try {
      const response = await saveAdminSeoSettings(seoSettings);
      setSeoSettings(response.seoSettings);
      setSeoMessage({ tone: "success", text: "SEO settings saved successfully." });
    } catch (error) {
      setSeoMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save SEO settings.",
      });
    } finally {
      setSavingSeo(false);
    }
  };

  const handleSubmitSitemap = async () => {
    setSubmittingSeo(true);
    setSeoMessage(null);

    try {
      const savedSettings = await saveAdminSeoSettings(seoSettings);
      setSeoSettings(savedSettings.seoSettings);
      const response = await submitGoogleSearchConsoleSitemap();
      setSeoSettings(response.seoSettings);
      setSeoMessage({ tone: "success", text: response.message });
    } catch (error) {
      setSeoMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to submit sitemap to Google Search Console.",
      });
    } finally {
      setSubmittingSeo(false);
    }
  };

  const handleSmtpSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingSmtp(true);
    setSmtpMessage(null);

    try {
      const response = await saveAdminSmtpSettings(smtpSettings);
      setSmtpSettings(response.smtpSettings);
      setSmtpMessage({ tone: "success", text: "SMTP settings saved successfully." });
    } catch (error) {
      setSmtpMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save SMTP settings.",
      });
    } finally {
      setSavingSmtp(false);
    }
  };

  const handleSmtpTest = async () => {
    setTestingSmtp(true);
    setSmtpMessage(null);

    try {
      const saved = await saveAdminSmtpSettings(smtpSettings);
      setSmtpSettings(saved.smtpSettings);
      const response = await sendAdminSmtpTestEmail();
      setSmtpMessage({ tone: "success", text: response.message });
    } catch (error) {
      setSmtpMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to send SMTP test email.",
      });
    } finally {
      setTestingSmtp(false);
    }
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordMismatch) {
      setPasswordMessage({ tone: "error", text: "Your new passwords do not match." });
      return;
    }

    setUpdatingPassword(true);
    setPasswordMessage(null);
    try {
      const response = await changeAdminPasswordRequest(passwordState.currentPassword, passwordState.newPassword);
      setUser(response.user);
      setPasswordMessage({ tone: "success", text: "Admin password updated successfully." });
      setPasswordState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setPasswordMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to change the password.",
      });
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Settings | Cellivo Admin"
        description="Manage contact form SMTP, admin password, and SEO settings for Cellivo."
        canonical="https://cellivo.com/admin/settings"
        noindex
      />
      <AdminShell
        title="Settings"
        description="One place for contact form delivery, admin access, and SEO integrations."
      >
        <Tabs defaultValue="smtp" className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:grid-cols-3">
            <TabsTrigger value="smtp" className="rounded-xl py-3 data-[state=active]:bg-slate-950 data-[state=active]:text-white">
              <Mail className="mr-2" size={16} />
              Contact SMTP
            </TabsTrigger>
            <TabsTrigger value="password" className="rounded-xl py-3 data-[state=active]:bg-slate-950 data-[state=active]:text-white">
              <KeyRound className="mr-2" size={16} />
              Admin Password
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-xl py-3 data-[state=active]:bg-slate-950 data-[state=active]:text-white">
              <SettingsIcon className="mr-2" size={16} />
              SEO Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="smtp" className="mt-0">
            {smtpMessage ? (
              <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${messageClassNames[smtpMessage.tone]}`}>
                {smtpMessage.text}
              </div>
            ) : null}

            {smtpLoading ? (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">Loading SMTP settings...</CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                        <Mail size={18} />
                      </div>
                      <div>
                        <CardTitle>Contact form SMTP</CardTitle>
                        <CardDescription>Send contact page messages to hello@cellivo.com using your SMTP account.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5" onSubmit={handleSmtpSave}>
                      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                          checked={smtpSettings.enabled}
                          onChange={(event) => updateSmtpSetting("enabled", event.target.checked)}
                        />
                        Enable SMTP sending
                      </label>

                      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_120px]">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-host">SMTP host</Label>
                          <Input
                            id="smtp-host"
                            value={smtpSettings.host}
                            placeholder="smtp.example.com"
                            onChange={(event) => updateSmtpSetting("host", event.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-port">Port</Label>
                          <Input
                            id="smtp-port"
                            type="number"
                            min={1}
                            max={65535}
                            value={smtpSettings.port}
                            onChange={(event) => updateSmtpPort(Number(event.target.value))}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-encryption">Encryption</Label>
                          <select
                            id="smtp-encryption"
                            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-slate-400"
                            value={smtpSettings.encryption}
                            onChange={(event) => updateSmtpEncryption(event.target.value as SmtpSettingsRecord["encryption"])}
                          >
                            <option value="tls">TLS / STARTTLS (587)</option>
                            <option value="ssl">SSL (465)</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-username">Username</Label>
                          <Input
                            id="smtp-username"
                            value={smtpSettings.username}
                            placeholder="hello@cellivo.com"
                            onChange={(event) => updateSmtpSetting("username", event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="smtp-password">Password</Label>
                        <Input
                          id="smtp-password"
                          type="password"
                          value={smtpSettings.password}
                          placeholder={smtpSettings.hasPassword ? "Saved password unchanged" : "SMTP password"}
                          onChange={(event) => updateSmtpSetting("password", event.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-from-name">From name</Label>
                          <Input
                            id="smtp-from-name"
                            value={smtpSettings.fromName}
                            onChange={(event) => updateSmtpSetting("fromName", event.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-from-email">From email</Label>
                          <Input
                            id="smtp-from-email"
                            type="email"
                            value={smtpSettings.fromEmail}
                            onChange={(event) => updateSmtpSetting("fromEmail", event.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-to-email">Recipient email</Label>
                          <Input
                            id="smtp-to-email"
                            type="email"
                            value={smtpSettings.toEmail}
                            onChange={(event) => updateSmtpSetting("toEmail", event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button type="submit" className="rounded-xl" disabled={savingSmtp || testingSmtp}>
                          {savingSmtp ? "Saving..." : "Save SMTP"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl"
                          onClick={handleSmtpTest}
                          disabled={savingSmtp || testingSmtp}
                        >
                          <Send size={15} className="mr-2" />
                          {testingSmtp ? "Sending..." : "Send Test Email"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Delivery status</CardTitle>
                    <CardDescription>Current contact form mail configuration.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">SMTP sending</p>
                      <p className="mt-1 text-slate-500">{smtpSettings.enabled ? "Enabled" : "Disabled"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">Recipient</p>
                      <p className="mt-1 break-all text-slate-500">{smtpSettings.toEmail || "No recipient saved"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="font-medium text-slate-950">Server</p>
                      <p className="mt-1 break-all text-slate-500">
                        {smtpSettings.host ? `${smtpSettings.host}:${smtpSettings.port}` : "No SMTP host saved"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="password" className="mt-0">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,560px)_360px]">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                      <KeyRound size={18} />
                    </div>
                    <div>
                      <CardTitle>Change admin password</CardTitle>
                      <CardDescription>Use a strong password to secure the dashboard.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handlePasswordChange}>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordState.currentPassword}
                        onChange={(event) =>
                          setPasswordState((current) => ({ ...current, currentPassword: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordState.newPassword}
                        onChange={(event) =>
                          setPasswordState((current) => ({ ...current, newPassword: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm new password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordState.confirmPassword}
                        onChange={(event) =>
                          setPasswordState((current) => ({ ...current, confirmPassword: event.target.value }))
                        }
                      />
                    </div>

                    {passwordMessage ? (
                      <div className={`rounded-xl border px-4 py-3 text-sm ${messageClassNames[passwordMessage.tone]}`}>
                        {passwordMessage.text}
                      </div>
                    ) : null}

                    <Button type="submit" className="w-full rounded-xl" disabled={updatingPassword || passwordMismatch}>
                      {updatingPassword ? "Updating password..." : "Update password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Password checklist</CardTitle>
                  <CardDescription>Quick rules for a stronger admin login.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    Use at least 12 characters with letters, numbers, and symbols.
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    Avoid reusing your WordPress, hosting, or email password.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="mt-0">
            {seoMessage ? (
              <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${messageClassNames[seoMessage.tone]}`}>
                {seoMessage.text}
              </div>
            ) : null}

            {seoLoading ? (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">Loading SEO settings...</CardContent>
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
                          checked={seoSettings.sitemapEnabled}
                          onCheckedChange={(checked) => updateSeoSetting("sitemapEnabled", checked)}
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-950">Static pages</p>
                            <p className="text-xs text-slate-500">Home, features, pricing, contact, etc.</p>
                          </div>
                          <Switch
                            checked={seoSettings.sitemapIncludeStaticPages}
                            onCheckedChange={(checked) => updateSeoSetting("sitemapIncludeStaticPages", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-950">Blog posts</p>
                            <p className="text-xs text-slate-500">Published blog posts only.</p>
                          </div>
                          <Switch
                            checked={seoSettings.sitemapIncludeBlogPosts}
                            onCheckedChange={(checked) => updateSeoSetting("sitemapIncludeBlogPosts", checked)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Blog change frequency</Label>
                          <select
                            value={seoSettings.sitemapDefaultChangefreq}
                            onChange={(event) => updateSeoSetting("sitemapDefaultChangefreq", event.target.value)}
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
                            value={seoSettings.sitemapDefaultPriority}
                            onChange={(event) => updateSeoSetting("sitemapDefaultPriority", event.target.value)}
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
                          checked={seoSettings.googleAnalyticsEnabled}
                          onCheckedChange={(checked) => updateSeoSetting("googleAnalyticsEnabled", checked)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>GA4 Measurement ID</Label>
                        <Input
                          value={seoSettings.googleAnalyticsMeasurementId}
                          onChange={(event) => updateSeoSetting("googleAnalyticsMeasurementId", event.target.value)}
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
                          value={seoSettings.googleSearchConsoleVerification}
                          onChange={(event) => updateSeoSetting("googleSearchConsoleVerification", event.target.value)}
                          placeholder="Paste only the content value from google-site-verification"
                        />
                        <p className="text-xs text-slate-500">
                          This outputs a sitewide google-site-verification meta tag.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Search Console property URL</Label>
                        <Input
                          value={seoSettings.googleSearchConsolePropertyUrl}
                          onChange={(event) => updateSeoSetting("googleSearchConsolePropertyUrl", event.target.value)}
                          placeholder="https://cellivo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Service account JSON</Label>
                        <Textarea
                          value={seoSettings.googleSearchConsoleServiceAccountJson}
                          onChange={(event) => updateSeoSetting("googleSearchConsoleServiceAccountJson", event.target.value)}
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
                        disabled={submittingSeo}
                        onClick={handleSubmitSitemap}
                      >
                        <Send className="mr-2" size={16} />
                        {submittingSeo ? "Submitting..." : "Submit Sitemap to Google"}
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
                          {seoSettings.googleAnalyticsEnabled && seoSettings.googleAnalyticsMeasurementId
                            ? `Enabled: ${seoSettings.googleAnalyticsMeasurementId}`
                            : "Not enabled"}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                        <p className="font-medium text-slate-950">Search Console verification</p>
                        <p className="mt-1 break-all text-slate-500">
                          {seoSettings.googleSearchConsoleVerification || "No verification token saved"}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                        <p className="font-medium text-slate-950">Last sitemap submission</p>
                        <p className="mt-1 text-slate-500">
                          {seoSettings.googleSearchConsoleLastSubmittedAt
                            ? new Date(seoSettings.googleSearchConsoleLastSubmittedAt).toLocaleString()
                            : "Not submitted from admin yet"}
                        </p>
                      </div>
                      <Button
                        type="button"
                        className="w-full rounded-xl"
                        onClick={handleSeoSave}
                        disabled={savingSeo || seoLoading}
                      >
                        <Save className="mr-2" size={16} />
                        {savingSeo ? "Saving..." : "Save SEO Settings"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </AdminShell>
    </>
  );
};

export default AdminSettings;
