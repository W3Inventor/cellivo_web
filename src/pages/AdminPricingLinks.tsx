import { useEffect, useMemo, useState } from "react";
import { CreditCard, ExternalLink, Link2, Save } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchAdminPricingPlanLinks, saveAdminPricingPlanLinks } from "@/lib/admin-api";
import type { PricingBillingCycle, PricingPlanKey, PricingPlanLinkRecord } from "@/lib/blog";

const planHints: Record<PricingPlanKey, string> = {
  lite: "Entry plan for lean retail shops.",
  starter: "Single-branch phone shop plan.",
  growth: "Most-popular multi-location plan.",
  business: "Higher-capacity retailer plan.",
  unlimited: "Custom/franchise plan.",
};

const planOrder: PricingPlanKey[] = ["lite", "starter", "growth", "business", "unlimited"];
const billingCycles: PricingBillingCycle[] = ["monthly", "yearly", "lifetime"];

const billingLabels: Record<PricingBillingCycle, string> = {
  monthly: "Monthly",
  yearly: "Yearly",
  lifetime: "Lifetime",
};

const billingHelp: Record<PricingBillingCycle, string> = {
  monthly: "Recurring monthly checkout links and monthly displayed prices.",
  yearly: "Annual checkout links and yearly displayed prices.",
  lifetime: "One-time lifetime checkout links and lifetime displayed prices.",
};

const planSortValue = (planKey: PricingPlanKey) => {
  const index = planOrder.indexOf(planKey);
  return index === -1 ? planOrder.length : index;
};

const AdminPricingLinks = () => {
  const initialData = useInitialData();
  const [pricingLinks, setPricingLinks] = useState<PricingPlanLinkRecord[]>(
    initialData.adminPricingPlanLinks ?? [],
  );
  const [activeBilling, setActiveBilling] = useState<PricingBillingCycle>("monthly");
  const [loading, setLoading] = useState(!initialData.adminPricingPlanLinks);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (initialData.adminPricingPlanLinks) return;

    fetchAdminPricingPlanLinks()
      .then((response) => setPricingLinks(response.pricingPlanLinks))
      .catch(() => setMessage({ tone: "error", text: "We couldn't load pricing button links right now." }))
      .finally(() => setLoading(false));
  }, [initialData.adminPricingPlanLinks]);

  const updatePlanLink = <K extends keyof PricingPlanLinkRecord>(
    index: number,
    key: K,
    value: PricingPlanLinkRecord[K],
  ) => {
    setPricingLinks((current) =>
      current.map((plan, planIndex) => (planIndex === index ? { ...plan, [key]: value } : plan)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await saveAdminPricingPlanLinks(pricingLinks);
      setPricingLinks(response.pricingPlanLinks);
      setMessage({ tone: "success", text: "Pricing plans updated successfully." });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save pricing plans.",
      });
    } finally {
      setSaving(false);
    }
  };

  const getPlanLinkIndex = (planKey: PricingPlanKey, billingCycle: PricingBillingCycle) =>
    pricingLinks.findIndex((link) => link.planKey === planKey && link.billingCycle === billingCycle);

  const orderedPlanKeys = useMemo(
    () => planOrder.filter((planKey) => pricingLinks.some((link) => link.planKey === planKey)),
    [pricingLinks],
  );
  const primaryPlanKeys = orderedPlanKeys.filter((planKey) => planKey !== "unlimited");
  const unlimitedPlanKey = orderedPlanKeys.find((planKey) => planKey === "unlimited");
  const activePreviewPlans = pricingLinks
    .filter((plan) => plan.billingCycle === activeBilling)
    .sort((a, b) => planSortValue(a.planKey) - planSortValue(b.planKey));

  const renderPlanEditor = (planKey: PricingPlanKey) => {
    const index = getPlanLinkIndex(planKey, activeBilling);
    const plan = pricingLinks[index];
    if (!plan) return null;

    const isUnlimited = planKey === "unlimited";

    return (
      <div
        key={`${planKey}-${activeBilling}`}
        className={`rounded-2xl border p-5 ${
          isUnlimited ? "border-indigo-200 bg-indigo-50/40" : "border-slate-200 bg-white"
        }`}
      >
        <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <CreditCard size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-tight text-slate-950">{plan.planName}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">{planHints[planKey]}</p>
                <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {billingLabels[activeBilling]}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[120px_120px_170px_minmax(0,1fr)]">
              <div className="space-y-2">
                <Label>LKR price</Label>
                <Input
                  value={plan.lkrPrice}
                  onChange={(event) => updatePlanLink(index, "lkrPrice", event.target.value)}
                  placeholder="3900"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <Label>USD price</Label>
                <Input
                  value={plan.usdPrice}
                  onChange={(event) => updatePlanLink(index, "usdPrice", event.target.value)}
                  placeholder="13"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <Label>Button text</Label>
                <Input
                  value={plan.ctaLabel}
                  onChange={(event) => updatePlanLink(index, "ctaLabel", event.target.value)}
                  placeholder="Start Free"
                />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Blank price shows Contact Us on the public pricing page.
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label>LKR button link</Label>
                <div className="relative">
                  <Link2
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    value={plan.lkrCtaUrl}
                    onChange={(event) => updatePlanLink(index, "lkrCtaUrl", event.target.value)}
                    placeholder="https://account.cellivo.com/..."
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>USD button link</Label>
                <div className="relative">
                  <Link2
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    value={plan.usdCtaUrl}
                    onChange={(event) => updatePlanLink(index, "usdCtaUrl", event.target.value)}
                    placeholder="https://account.cellivo.com/..."
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPreviewUrl = (label: string, url: string) => (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-slate-950">
        {url ? "Button set" : "No link set"}
      </p>
      <p className="mt-1 break-all text-xs leading-5 text-slate-500">{url || "-"}</p>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Pricing Plans | Cellivo Admin"
        description="Manage pricing page package prices and CTA links in the Cellivo admin dashboard."
        canonical="https://cellivo.com/admin/pricing-links"
        noindex
      />
      <AdminShell
        title="Pricing Plans"
        description="Manage LKR and USD prices for every billing cycle, plus separate CTA links for Sri Lanka and international visitors."
        actions={
          <Button type="button" className="rounded-xl" onClick={handleSave} disabled={saving || loading}>
            <Save className="mr-2" size={16} />
            {saving ? "Saving..." : "Save Pricing Plans"}
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

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle>Package editor</CardTitle>
                  <CardDescription>{billingHelp[activeBilling]}</CardDescription>
                </div>
                <Tabs value={activeBilling} onValueChange={(value) => setActiveBilling(value as PricingBillingCycle)}>
                  <TabsList className="grid w-full grid-cols-3 lg:w-[360px]">
                    {billingCycles.map((billingCycle) => (
                      <TabsTrigger key={billingCycle} value={billingCycle}>
                        {billingLabels[billingCycle]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                  Loading pricing links...
                </div>
              ) : (
                <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_420px]">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                          Main packages
                        </h2>
                        <span className="text-xs text-slate-400">{primaryPlanKeys.length} plans</span>
                      </div>
                      <div className="space-y-3">{primaryPlanKeys.map((planKey) => renderPlanEditor(planKey))}</div>
                    </div>

                    {unlimitedPlanKey ? (
                      <div className="space-y-3">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                          Custom package
                        </h2>
                        {renderPlanEditor(unlimitedPlanKey)}
                      </div>
                    ) : null}
                  </div>

                  <aside className="2xl:sticky 2xl:top-24 2xl:self-start">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700">
                          <ExternalLink size={18} />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-slate-950">Live link preview</h2>
                          <p className="text-sm leading-5 text-slate-500">
                            {billingLabels[activeBilling]} buttons shown on /pricing.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {activePreviewPlans.map((plan) => (
                          <div key={`preview-${plan.planKey}-${activeBilling}`} className="rounded-2xl bg-white p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-slate-950">{plan.planName}</p>
                                <p className="mt-1 text-sm text-slate-600">
                                  {plan.lkrPrice ? `LKR ${plan.lkrPrice}` : "No LKR price"}
                                  {plan.usdPrice ? ` | USD ${plan.usdPrice}` : ""}
                                </p>
                              </div>
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                {plan.ctaLabel || "Button"}
                              </span>
                            </div>
                            <div className="mt-3 grid gap-2 sm:grid-cols-2 2xl:grid-cols-1">
                              {renderPreviewUrl("LKR", plan.lkrCtaUrl || plan.ctaUrl)}
                              {renderPreviewUrl("USD", plan.usdCtaUrl || plan.ctaUrl)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminShell>
    </>
  );
};

export default AdminPricingLinks;
