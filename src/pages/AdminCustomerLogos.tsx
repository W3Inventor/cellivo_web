import { useEffect, useState } from "react";
import { Images, Plus, Save, Trash2 } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchAdminSocialProof, saveHomepageSocialProofRequest } from "@/lib/admin-api";
import type { CustomerLogoRecord, HomepageSocialProofData } from "@/lib/blog";

const createEmptyLogo = (displayOrder: number): CustomerLogoRecord => ({
  name: "",
  detail: "",
  imageUrl: "",
  imageAlt: "",
  isActive: true,
  displayOrder,
});

const AdminCustomerLogos = () => {
  const initialData = useInitialData();
  const [socialProof, setSocialProof] = useState<HomepageSocialProofData>(
    initialData.adminSocialProof ?? { customerLogos: [], testimonials: [] },
  );
  const [loading, setLoading] = useState(!initialData.adminSocialProof);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData.adminSocialProof) return;

    fetchAdminSocialProof()
      .then((response) => setSocialProof(response.socialProof))
      .catch(() => setMessage({ tone: "error", text: "We couldn't load the customer logos right now." }))
      .finally(() => setLoading(false));
  }, [initialData.adminSocialProof]);

  const updateLogo = <K extends keyof CustomerLogoRecord>(index: number, key: K, value: CustomerLogoRecord[K]) => {
    setSocialProof((current) => ({
      ...current,
      customerLogos: current.customerLogos.map((logo, logoIndex) =>
        logoIndex === index ? { ...logo, [key]: value } : logo,
      ),
    }));
  };

  const addLogo = () => {
    setSocialProof((current) => ({
      ...current,
      customerLogos: [...current.customerLogos, createEmptyLogo(current.customerLogos.length)],
    }));
  };

  const removeLogo = (index: number) => {
    setSocialProof((current) => ({
      ...current,
      customerLogos: current.customerLogos
        .filter((_, logoIndex) => logoIndex !== index)
        .map((logo, logoIndex) => ({ ...logo, displayOrder: logoIndex })),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await saveHomepageSocialProofRequest(socialProof);
      setSocialProof(response.socialProof);
      setMessage({ tone: "success", text: "Customer logos updated successfully." });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save customer logos.",
      });
    } finally {
      setSaving(false);
    }
  };

  const activeLogos = socialProof.customerLogos.filter((logo) => logo.isActive);

  return (
    <>
      <SEOHead
        title="Customer Logos | Cellivo Admin"
        description="Manage homepage customer logos in the Cellivo admin dashboard."
        canonical="https://cellivo.com/admin/customer-logos"
        noindex
      />
      <AdminShell
        title="Customer Logos"
        description="Manage the homepage logo carousel with a simpler, visual workflow."
        actions={
          <>
            <Button type="button" variant="outline" className="rounded-xl" onClick={addLogo}>
              <Plus className="mr-2" size={16} />
              Add Logo
            </Button>
            <Button type="button" className="rounded-xl" onClick={handleSave} disabled={saving}>
              <Save className="mr-2" size={16} />
              {saving ? "Saving…" : "Save Logos"}
            </Button>
          </>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-4">
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
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">Loading customer logos…</CardContent>
              </Card>
            ) : socialProof.customerLogos.length === 0 ? (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">
                  No customer logos yet. Add your first logo to start the homepage carousel.
                </CardContent>
              </Card>
            ) : (
              socialProof.customerLogos.map((logo, index) => (
                <Card key={`logo-${index}`} className="border-slate-200 shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Logo {index + 1}</CardTitle>
                      <CardDescription>Customer branding shown in the homepage trust carousel.</CardDescription>
                    </div>
                    <Button type="button" variant="ghost" className="h-9 px-3 text-xs" onClick={() => removeLogo(index)}>
                      <Trash2 className="mr-1.5" size={14} />
                      Remove
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Customer name</Label>
                        <Input value={logo.name} onChange={(event) => updateLogo(index, "name", event.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Supporting detail</Label>
                        <Input
                          value={logo.detail}
                          onChange={(event) => updateLogo(index, "detail", event.target.value)}
                          placeholder="2 branches"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5">
                      <div className="space-y-2">
                        <Label>Logo image</Label>
                        <ImageUploadField
                          value={logo.imageUrl}
                          onChange={(value) => updateLogo(index, "imageUrl", value)}
                          folder="customer-logos"
                          placeholder="Paste a logo URL or upload the logo file"
                          previewAlt={logo.imageAlt || `${logo.name || "Customer"} logo preview`}
                          previewClassName="min-h-28"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image alt text</Label>
                        <Input
                          value={logo.imageAlt}
                          onChange={(event) => updateLogo(index, "imageAlt", event.target.value)}
                          placeholder="Customer logo alt text"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-950">Show this logo on the website</p>
                        <p className="text-xs text-slate-500">Disable a logo without deleting it.</p>
                      </div>
                      <Switch checked={logo.isActive} onCheckedChange={(checked) => updateLogo(index, "isActive", checked)} />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <Images size={18} />
                  </div>
                  <div>
                    <CardTitle>Live preview</CardTitle>
                    <CardDescription>How the active customer logos will look on the homepage.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeLogos.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                    No active logos to preview yet.
                  </div>
                ) : (
                  activeLogos.map((logo, index) => (
                    <div key={`preview-logo-${index}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      {logo.imageUrl ? (
                        <div className="flex min-h-20 items-center justify-center rounded-xl bg-slate-50 px-3 py-4">
                          <img
                            src={logo.imageUrl}
                            alt={logo.imageAlt || `${logo.name} customer logo`}
                            width="180"
                            height="64"
                            className="max-h-12 w-auto object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-lg font-semibold tracking-tight text-slate-950">{logo.name || "Customer name"}</p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                            {logo.detail || "Supporting detail"}
                          </p>
                        </>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminShell>
    </>
  );
};

export default AdminCustomerLogos;
