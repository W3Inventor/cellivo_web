import { useEffect, useState } from "react";
import { MessageSquareQuote, Plus, Save, Star, Trash2 } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchAdminSocialProof, saveHomepageSocialProofRequest } from "@/lib/admin-api";
import type { HomepageSocialProofData, TestimonialRecord } from "@/lib/blog";

const createEmptyTestimonial = (displayOrder: number): TestimonialRecord => ({
  name: "",
  role: "",
  text: "",
  result: "",
  imageUrl: "",
  imageAlt: "",
  rating: 5,
  isActive: true,
  displayOrder,
});

const AdminTestimonials = () => {
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
      .catch(() => setMessage({ tone: "error", text: "We couldn't load the testimonials right now." }))
      .finally(() => setLoading(false));
  }, [initialData.adminSocialProof]);

  const updateTestimonial = <K extends keyof TestimonialRecord>(
    index: number,
    key: K,
    value: TestimonialRecord[K],
  ) => {
    setSocialProof((current) => ({
      ...current,
      testimonials: current.testimonials.map((testimonial, testimonialIndex) =>
        testimonialIndex === index ? { ...testimonial, [key]: value } : testimonial,
      ),
    }));
  };

  const addTestimonial = () => {
    setSocialProof((current) => ({
      ...current,
      testimonials: [...current.testimonials, createEmptyTestimonial(current.testimonials.length)],
    }));
  };

  const removeTestimonial = (index: number) => {
    setSocialProof((current) => ({
      ...current,
      testimonials: current.testimonials
        .filter((_, testimonialIndex) => testimonialIndex !== index)
        .map((testimonial, testimonialIndex) => ({ ...testimonial, displayOrder: testimonialIndex })),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await saveHomepageSocialProofRequest(socialProof);
      setSocialProof(response.socialProof);
      setMessage({ tone: "success", text: "Testimonials updated successfully." });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save testimonials.",
      });
    } finally {
      setSaving(false);
    }
  };

  const activeTestimonials = socialProof.testimonials.filter((testimonial) => testimonial.isActive);

  return (
    <>
      <SEOHead
        title="Testimonials | Cellivo Admin"
        description="Manage homepage testimonials in the Cellivo admin dashboard."
        canonical="https://cellivo.com/admin/testimonials"
        noindex
      />
      <AdminShell
        title="Testimonials"
        description="Edit customer quotes and outcome highlights in a dedicated admin view."
        actions={
          <>
            <Button type="button" variant="outline" className="rounded-xl" onClick={addTestimonial}>
              <Plus className="mr-2" size={16} />
              Add Testimonial
            </Button>
            <Button type="button" className="rounded-xl" onClick={handleSave} disabled={saving}>
              <Save className="mr-2" size={16} />
              {saving ? "Saving…" : "Save Testimonials"}
            </Button>
          </>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
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
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">Loading testimonials…</CardContent>
              </Card>
            ) : socialProof.testimonials.length === 0 ? (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">
                  No testimonials yet. Add your first customer quote to get started.
                </CardContent>
              </Card>
            ) : (
              socialProof.testimonials.map((testimonial, index) => (
                <Card key={`testimonial-${index}`} className="border-slate-200 shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Testimonial {index + 1}</CardTitle>
                      <CardDescription>Customer quote shown on the homepage.</CardDescription>
                    </div>
                    <Button type="button" variant="ghost" className="h-9 px-3 text-xs" onClick={() => removeTestimonial(index)}>
                      <Trash2 className="mr-1.5" size={14} />
                      Remove
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(event) => updateTestimonial(index, "name", event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role / business</Label>
                        <Input
                          value={testimonial.role}
                          onChange={(event) => updateTestimonial(index, "role", event.target.value)}
                          placeholder="Owner — PhoneZone Store"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Customer photo / logo</Label>
                        <ImageUploadField
                          value={testimonial.imageUrl}
                          onChange={(value) => updateTestimonial(index, "imageUrl", value)}
                          folder="testimonials"
                          placeholder="Paste an image URL or upload a testimonial image"
                          previewAlt={testimonial.imageAlt || `${testimonial.name || "Customer"} image preview`}
                          previewClassName="min-h-28"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image alt text</Label>
                        <Input
                          value={testimonial.imageAlt}
                          onChange={(event) => updateTestimonial(index, "imageAlt", event.target.value)}
                          placeholder="Portrait of store owner using Cellivo"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Testimonial text</Label>
                      <Textarea
                        value={testimonial.text}
                        onChange={(event) => updateTestimonial(index, "text", event.target.value)}
                        className="min-h-[140px]"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_120px]">
                      <div className="space-y-2">
                        <Label>Result highlight</Label>
                        <Input
                          value={testimonial.result}
                          onChange={(event) => updateTestimonial(index, "result", event.target.value)}
                          placeholder="80% fewer stock discrepancies"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(event) =>
                            updateTestimonial(index, "rating", Math.min(5, Math.max(1, Number(event.target.value) || 5)))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-950">Show this testimonial on the website</p>
                        <p className="text-xs text-slate-500">Hide it without losing the saved copy.</p>
                      </div>
                      <Switch
                        checked={testimonial.isActive}
                        onCheckedChange={(checked) => updateTestimonial(index, "isActive", checked)}
                      />
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
                    <MessageSquareQuote size={18} />
                  </div>
                  <div>
                    <CardTitle>Live preview</CardTitle>
                    <CardDescription>Preview how active testimonials will appear on the homepage.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeTestimonials.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                    No active testimonials to preview yet.
                  </div>
                ) : (
                  activeTestimonials.map((testimonial, index) => (
                    <div key={`preview-testimonial-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5">
                      {testimonial.imageUrl ? (
                        <div className="mb-4 flex items-center gap-3">
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.imageAlt || `${testimonial.name} testimonial`}
                            width="56"
                            height="56"
                            className="h-14 w-14 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-950">{testimonial.name || "Customer name"}</p>
                            <p className="mt-1 text-xs text-slate-500">{testimonial.role || "Role / business"}</p>
                          </div>
                        </div>
                      ) : null}
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={12} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">"{testimonial.text || "Customer quote preview"}"</p>
                      {testimonial.result ? (
                        <div className="mt-4 rounded-lg bg-primary/5 px-3 py-2">
                          <p className="text-xs font-medium text-primary">{testimonial.result}</p>
                        </div>
                      ) : null}
                      {!testimonial.imageUrl ? (
                        <div className="mt-4 border-t border-slate-200 pt-4">
                          <p className="text-sm font-semibold text-slate-950">{testimonial.name || "Customer name"}</p>
                          <p className="mt-1 text-xs text-slate-500">{testimonial.role || "Role / business"}</p>
                        </div>
                      ) : null}
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

export default AdminTestimonials;
