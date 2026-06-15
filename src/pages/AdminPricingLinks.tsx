import { useEffect, useState } from "react";
import { CreditCard, ExternalLink, Link2, Save } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchAdminPricingPlanLinks, saveAdminPricingPlanLinks } from "@/lib/admin-api";
import type { PricingBillingCycle, PricingPlanKey, PricingPlanLinkRecord } from "@/lib/blog";

const planHints: Record<string, string> = {
  lite: "Entry plan CTA for simple retail shops, usually linked to Lite checkout.",
  starter: "Single-branch plan CTA, usually linked to signup.",
  growth: "Most-popular plan CTA, usually linked to signup.",
  business: "Higher-capacity plan CTA, usually linked to signup or sales.",
  unlimited: "Custom/franchise plan CTA, usually linked to contact or demo.",
};

const planOrder: PricingPlanKey[] = ["lite", "starter", "growth", "business", "unlimited"];
const billingCycles: PricingBillingCycle[] = ["monthly", "yearly", "lifetime"];

const billingLabels: Record<PricingBillingCycle, string> = {
  monthly: "Monthly",
  yearly: "Yearly",
  lifetime: "Lifetime",
};

const AdminPricingLinks = () => {
  const initialData = useInitialData();
  const [pricingLinks, setPricingLinks] = useState<PricingPlanLinkRecord[]>(
    initialData.adminPricingPlanLinks ?? [],
  );
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

  const orderedPlanKeys = planOrder.filter((planKey) => pricingLinks.some((link) => link.planKey === planKey));
  const primaryPlanKeys = orderedPlanKeys.filter((planKey) => planKey !== "unlimited");
  const unlimitedPlanKey = orderedPlanKeys.find((planKey) => planKey === "unlimited");

  const renderPlanCard = (planKey: PricingPlanKey, isWide = false) => {
    const firstPlanLink = pricingLinks.find((link) => link.planKey === planKey);

    return (
      <Card key={planKey} className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <CreditCard size={18} />
            </div>
            <div>
              <CardTitle>{firstPlanLink?.planName ?? planKey} package</CardTitle>
              <CardDescription>{planHints[planKey] ?? "Pricing package CTA settings."}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className={isWide ? "grid gap-4 lg:grid-cols-3" : "space-y-4"}>
          {billingCycles.map((billingCycle) => {
            const index = getPlanLinkIndex(planKey, billingCycle);
            const plan = pricingLinks[index];
            if (!plan) return null;

            return (
              <div key={`${planKey}-${billingCycle}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{billingLabels[billingCycle]}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                    {plan.planName}
                  </span>
                </div>
                <div
                  className={
                    isWide
                      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
                      : "grid gap-4 md:grid-cols-2 xl:grid-cols-1"
                  }
                >
                  <div className="space-y-2">
                    <Label>LKR price</Label>
                    <Input
                      value={plan.lkrPrice}
                      onChange={(event) => updatePlanLink(index, "lkrPrice", event.target.value)}
                      placeholder="7000"
                      inputMode="decimal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>USD price</Label>
                    <Input
                      value={plan.usdPrice}
                      onChange={(event) => updatePlanLink(index, "usdPrice", event.target.value)}
                      placeholder="23"
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
                        placeholder="/pricing or https://example.com"
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Used when the visitor sees {billingLabels[billingCycle]} pricing in LKR.
                    </p>
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
                        placeholder="/pricing or https://example.com"
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Used when the visitor sees {billingLabels[billingCycle]} pricing in USD.
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Leave a price blank if you want that billing cycle to show Contact Us instead of a numeric amount.
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

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
            {saving ? "Saving…" : "Save Pricing Plans"}
          </Button>
        }
      >
        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_420px]">
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
                <CardContent className="px-6 py-10 text-center text-sm text-slate-500">
                  Loading pricing links…
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-4">
                  {primaryPlanKeys.map((planKey) => renderPlanCard(planKey))}
                </div>
                {unlimitedPlanKey ? renderPlanCard(unlimitedPlanKey, true) : null}
              </>
            )}
          </div>

          <div className="space-y-6 2xl:sticky 2xl:top-24 2xl:self-start">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <ExternalLink size={18} />
                  </div>
                  <div>
                    <CardTitle>Live link preview</CardTitle>
                    <CardDescription>These are the currency-based buttons visitors will see on /pricing.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {billingCycles.map((billingCycle) => (
                  <div key={`preview-${billingCycle}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <p className="mb-3 text-sm font-semibold text-slate-950">{billingLabels[billingCycle]} buttons</p>
                    <div className="space-y-3">
                      {pricingLinks
                        .filter((plan) => plan.billingCycle === billingCycle)
                        .map((plan) => (
                          <div key={`preview-${plan.planKey}-${billingCycle}`}>
                            <p className="text-xs font-medium text-slate-500">{plan.planName}</p>
                            <p className="mt-1 text-sm text-slate-700">
                              {plan.lkrPrice ? `LKR ${plan.lkrPrice}` : "No LKR price"}
                              {plan.usdPrice ? ` • USD ${plan.usdPrice}` : ""}
                            </p>
                            <div className="mt-2 grid gap-2 sm:grid-cols-2">
                              <div>
                                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">LKR button</p>
                                <a
                                  href={plan.lkrCtaUrl || plan.ctaUrl || "#"}
                                  className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-medium text-white"
                                  target={(plan.lkrCtaUrl || plan.ctaUrl || "").startsWith("http") ? "_blank" : undefined}
                                  rel={(plan.lkrCtaUrl || plan.ctaUrl || "").startsWith("http") ? "noreferrer" : undefined}
                                >
                                  {plan.ctaLabel || "Button text"}
                                </a>
                                <p className="mt-1 break-all text-xs text-slate-500">{plan.lkrCtaUrl || plan.ctaUrl || "No LKR link set"}</p>
                              </div>
                              <div>
                                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">USD button</p>
                                <a
                                  href={plan.usdCtaUrl || plan.ctaUrl || "#"}
                                  className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-medium text-white"
                                  target={(plan.usdCtaUrl || plan.ctaUrl || "").startsWith("http") ? "_blank" : undefined}
                                  rel={(plan.usdCtaUrl || plan.ctaUrl || "").startsWith("http") ? "noreferrer" : undefined}
                                >
                                  {plan.ctaLabel || "Button text"}
                                </a>
                                <p className="mt-1 break-all text-xs text-slate-500">{plan.usdCtaUrl || plan.ctaUrl || "No USD link set"}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminShell>
    </>
  );
};

export default AdminPricingLinks;
