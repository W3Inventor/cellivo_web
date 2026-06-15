import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Building2, Crown, ShieldCheck, Store } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_RAW } from "@/lib/business-info";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchPricingPlanLinks } from "@/lib/blog-api";
import type { PricingCurrencyCode, PricingPlanKey, PricingPlanLinkRecord } from "@/lib/blog";

type BillingCycle = "monthly" | "yearly" | "lifetime";

const liteFeatures = ["Billing & invoicing","Product inventory","Accessories management","Customer records","Supplier records","Purchasing","Basic reports"];
const allFeatures = ["Billing & invoicing","Product inventory","IMEI-based stock control","Accessories management","Customer records","Repair job management","Staff / user roles","Advanced reports & analytics","Profit analytics","Full analytics dashboard","Priority support"];

const plans = [
  { key: "lite" as PricingPlanKey, name: "Lite", tagline: "For simple retail shops starting lean", icon: Store, cta: "Start Free", href: "/pricing", popular: false, branches: "1 Branch", features: [...liteFeatures] },
  { key: "starter" as PricingPlanKey, name: "Starter", tagline: "For single-location phone shops", icon: Zap, cta: "Start Free", href: "/pricing", popular: false, branches: "1 Branch", features: [...allFeatures] },
  { key: "growth" as PricingPlanKey, name: "Growth", tagline: "For shops expanding to multiple locations", icon: Sparkles, cta: "Start Free", href: "/pricing", popular: true, branches: "Up to 3 Branches", features: [...allFeatures] },
  { key: "business" as PricingPlanKey, name: "Business", tagline: "For established multi-location retailers", icon: Building2, cta: "Start Free", href: "/pricing", popular: false, branches: "Up to 6 Branches", features: [...allFeatures] },
  { key: "unlimited" as PricingPlanKey, name: "Unlimited", tagline: "For large-scale or franchise operations", icon: Crown, cta: "Contact Us", href: "/contact", popular: false, branches: "Unlimited Branches", features: [...allFeatures] },
];

const defaultPlanPricing: Record<PricingPlanKey, Record<BillingCycle, { lkrPrice: string; usdPrice: string }>> = {
  lite: {
    monthly: { lkrPrice: "3900", usdPrice: "13" },
    yearly: { lkrPrice: "39000", usdPrice: "130" },
    lifetime: { lkrPrice: "180000", usdPrice: "600" },
  },
  starter: {
    monthly: { lkrPrice: "7000", usdPrice: "23" },
    yearly: { lkrPrice: "70000", usdPrice: "233" },
    lifetime: { lkrPrice: "380000", usdPrice: "1267" },
  },
  growth: {
    monthly: { lkrPrice: "12000", usdPrice: "40" },
    yearly: { lkrPrice: "120000", usdPrice: "400" },
    lifetime: { lkrPrice: "500000", usdPrice: "1667" },
  },
  business: {
    monthly: { lkrPrice: "16000", usdPrice: "53" },
    yearly: { lkrPrice: "160000", usdPrice: "533" },
    lifetime: { lkrPrice: "700000", usdPrice: "2333" },
  },
  unlimited: {
    monthly: { lkrPrice: "", usdPrice: "" },
    yearly: { lkrPrice: "", usdPrice: "" },
    lifetime: { lkrPrice: "", usdPrice: "" },
  },
};

const normalizePriceNumber = (value: string) => {
  const sanitized = `${value ?? ""}`.replace(/,/g, "").trim();
  return /^\d+(\.\d+)?$/.test(sanitized) ? sanitized : null;
};

const formatPriceValue = (value: string) => {
  const normalized = normalizePriceNumber(value);
  if (!normalized) return `${value ?? ""}`.trim();

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return `${value ?? ""}`.trim();

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: normalized.includes(".") ? 2 : 0,
    maximumFractionDigits: normalized.includes(".") ? 2 : 0,
  }).format(parsed);
};

const getBillingSuffix = (billing: BillingCycle) =>
  billing === "monthly" ? "/mo" : billing === "yearly" ? "/yr" : "";

const normalizeCountryCode = (value: string) => {
  const normalized = `${value ?? ""}`.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : "";
};

const LEGACY_CURRENCY_STORAGE_KEY = "cellivo-pricing-currency";
const CURRENCY_STORAGE_KEY = "cellivo-pricing-currency-v2";
const currencyOptions: { label: string; value: PricingCurrencyCode }[] = [
  { label: "USD", value: "USD" },
  { label: "LKR", value: "LKR" },
];

const comparisonFeatures = [
  { name: "Core POS features", lite: true, starter: true, growth: true, business: true, unlimited: true },
  { name: "Billing & invoicing", lite: true, starter: true, growth: true, business: true, unlimited: true },
  { name: "IMEI-based stock control", lite: false, starter: true, growth: true, business: true, unlimited: true },
  { name: "Repair job management", lite: false, starter: true, growth: true, business: true, unlimited: true },
  { name: "Credit sale workflows", lite: false, starter: true, growth: true, business: true, unlimited: true },
  { name: "Returns management", lite: false, starter: true, growth: true, business: true, unlimited: true },
  { name: "Advanced reports", lite: false, starter: true, growth: true, business: true, unlimited: true },
  { name: "Priority support", lite: false, starter: true, growth: true, business: true, unlimited: true },
  { name: "Branches", lite: "1" as string | boolean, starter: "1" as string | boolean, growth: "3" as string | boolean, business: "6" as string | boolean, unlimited: "∞" as string | boolean },
];

const faqs = [
  { q: "Do I need a credit card to start Cellivo POS?", a: "No. Create your account and start using Cellivo immediately — no credit card required." },
  { q: "How much does phone shop POS software cost?", a: "Cellivo offers flexible phone shop POS pricing with monthly, yearly, and lifetime options based on your branch count and business stage." },
  { q: "How fast can I get started?", a: "Instantly. Sign up, add your products, and start billing within minutes." },
  { q: "Can I upgrade or switch plans later?", a: "Absolutely. Upgrade, downgrade, or switch anytime. Your data carries over seamlessly." },
  { q: "What is included in lifetime?", a: "A one-time payment for permanent access with all future updates. No recurring fees." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel from your account settings — no questions asked." },
];

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const toggleOptions: { label: string; value: BillingCycle; badge?: string }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly", badge: "Save 2 months" },
  { label: "Lifetime", value: "lifetime", badge: "Best value" },
];

const Pricing = () => {
  const initialData = useInitialData();
  const detectedCurrency =
    initialData.preferredPricingCurrency === "LKR" ? "LKR" : "USD";
  const detectedCountryCode = normalizeCountryCode(initialData.pricingVisitorCountryCode || "");
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState<PricingCurrencyCode>(detectedCurrency);
  const [visitorCountryCode, setVisitorCountryCode] = useState(detectedCountryCode);
  const [manualPreferenceLoaded, setManualPreferenceLoaded] = useState(false);
  const [hasManualCurrencyPreference, setHasManualCurrencyPreference] = useState(false);
  const [pricingLinks, setPricingLinks] = useState<PricingPlanLinkRecord[]>(
    initialData.pricingPlanLinks ?? [],
  );

  useEffect(() => {
    if (initialData.pricingPlanLinks) return;

    fetchPricingPlanLinks()
      .then((response) => setPricingLinks(response.pricingPlanLinks))
      .catch(() => {
        setPricingLinks([]);
      });
  }, [initialData.pricingPlanLinks]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(LEGACY_CURRENCY_STORAGE_KEY);

    const savedCurrency = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (savedCurrency === "LKR" || savedCurrency === "USD") {
      setCurrency(savedCurrency);
      setHasManualCurrencyPreference(true);
      setManualPreferenceLoaded(true);
      return;
    }

    setCurrency(detectedCurrency);
    setHasManualCurrencyPreference(false);
    setManualPreferenceLoaded(true);
  }, [detectedCurrency]);

  useEffect(() => {
    if (!manualPreferenceLoaded || hasManualCurrencyPreference) {
      return;
    }

    if (detectedCountryCode) {
      setVisitorCountryCode(detectedCountryCode);
      setCurrency(detectedCountryCode === "LK" ? "LKR" : "USD");
      return;
    }

    const controller = new AbortController();

    fetch("https://ipwho.is/", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((payload) => {
        const countryCode = normalizeCountryCode(payload?.country_code || "");
        if (!countryCode) return;

        setVisitorCountryCode(countryCode);
        setCurrency(countryCode === "LK" ? "LKR" : "USD");
      })
      .catch(() => {
        // Keep the server-selected fallback currency if IP lookup is unavailable.
      });

    return () => controller.abort();
  }, [detectedCountryCode, hasManualCurrencyPreference, manualPreferenceLoaded]);

  const handleCurrencyChange = (nextCurrency: PricingCurrencyCode) => {
    setCurrency(nextCurrency);
    setHasManualCurrencyPreference(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
    }
  };

  const pricingLinkMap = useMemo(
    () =>
      pricingLinks.reduce<Partial<Record<PricingPlanKey, Partial<Record<BillingCycle, PricingPlanLinkRecord>>>>>((acc, link) => {
        if (!acc[link.planKey]) {
          acc[link.planKey] = {};
        }
        acc[link.planKey]![link.billingCycle] = link;
        return acc;
      }, {}),
    [pricingLinks],
  );
  const primaryPlans = plans.filter((plan) => plan.key !== "unlimited");
  const unlimitedPlan = plans.find((plan) => plan.key === "unlimited");

  return (
    <Layout>
      <SEOHead
        title="Phone Shop POS Pricing Plans | Mobile Shop POS Software Cost"
        description="Compare phone shop POS pricing plans with flexible monthly and lifetime options. Affordable mobile shop POS software with billing, inventory, and IMEI tracking."
        canonical="/pricing"
        structuredData={pricingFaqSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 text-center">
        <div className="container mx-auto px-4">
          <span className="section-header-label">Pricing</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Phone Shop POS Pricing <span className="text-primary">Plans for Mobile Shops</span>
          </h1>
          <p className="section-header-desc mb-4">
            Compare flexible phone shop POS pricing plans designed for mobile shops of all sizes. Start free, upgrade anytime, and scale your business with powerful billing, inventory, and IMEI tracking features.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10">
            <ShieldCheck size={14} /><span>No commitment. Cancel anytime.</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Need help? Call us at{" "}
            <a href={`tel:${BUSINESS_PHONE_RAW}`} className="text-primary underline underline-offset-4 hover:text-primary/80">
              {BUSINESS_PHONE_DISPLAY}
            </a>
          </p>
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-secondary/60">
            {toggleOptions.map((opt) => (
              <button key={opt.value} onClick={() => setBilling(opt.value)} className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${billing === opt.value ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                {billing === opt.value && <motion.div layoutId="toggle-bg" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="relative z-10 flex items-center gap-2">{opt.label}{opt.badge && <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{opt.badge}</span>}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
              {currencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleCurrencyChange(option.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    currency === option.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {visitorCountryCode === "LK"
                ? "Showing Sri Lanka pricing by default based on your location."
                : "Showing international USD pricing by default based on your location."}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {primaryPlans.map((plan) => {
              const Icon = plan.icon;
              const planLink = pricingLinkMap[plan.key]?.[billing];
              const ctaLabel = planLink?.ctaLabel || plan.cta;
              const ctaUrl =
                (currency === "LKR" ? planLink?.lkrCtaUrl : planLink?.usdCtaUrl) ||
                planLink?.ctaUrl ||
                plan.href;
              const fallbackPricing = defaultPlanPricing[plan.key][billing];
              const lkrPrice = formatPriceValue(planLink?.lkrPrice || fallbackPricing.lkrPrice);
              const usdPrice = formatPriceValue(planLink?.usdPrice || fallbackPricing.usdPrice);
              const activePrice = currency === "LKR" ? lkrPrice : usdPrice;
              const billingSuffix = getBillingSuffix(billing);
              const hasPricing = Boolean(activePrice);
	              return (
                <div key={plan.name}
                  className={`relative group rounded-2xl border ${plan.popular ? "border-foreground shadow-lg" : "border-border"} bg-white hover-lift`}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider bg-foreground text-background px-4 py-1 rounded-full">Most Popular</span></div>}
                  <div className="p-6 lg:p-7 flex flex-col h-full">
                    <div className="mb-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.popular ? "bg-foreground/5 text-foreground" : "bg-secondary text-muted-foreground"}`}><Icon className="w-5 h-5" /></div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">{plan.tagline}</p>
                    </div>
                    <div className="mb-6">
                      <div className="space-y-2">
                        {hasPricing ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {currency}
                            </span>
                            <span className="text-4xl font-heading font-bold text-foreground">{activePrice}</span>
                            {billingSuffix ? (
                              <span className="text-sm text-muted-foreground">{billingSuffix}</span>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-2xl font-heading font-bold text-foreground">Contact Us</span>
                        )}
                      </div>
                      {billing === "yearly" && hasPricing && <p className="text-xs text-primary mt-1.5 font-medium">Save 2 months — best annual deal</p>}
                      {billing === "lifetime" && hasPricing && <p className="text-xs text-primary mt-1.5 font-medium">Pay once, use forever</p>}
                    </div>
                    <div className="mb-5 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center"><span className="text-sm font-medium text-primary">{plan.branches}</span></div>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm text-foreground/70"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{f}</li>))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full rounded-xl h-11 text-sm font-medium ${plan.popular ? "bg-foreground text-background hover:bg-foreground/90" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    >
                      <a href={ctaUrl}>{ctaLabel}</a>
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center mt-2">No credit card required</p>
                  </div>
                </div>
              );
            })}
          </div>
          {unlimitedPlan ? (() => {
            const plan = unlimitedPlan;
            const Icon = plan.icon;
            const planLink = pricingLinkMap[plan.key]?.[billing];
            const ctaLabel = planLink?.ctaLabel || plan.cta;
            const ctaUrl =
              (currency === "LKR" ? planLink?.lkrCtaUrl : planLink?.usdCtaUrl) ||
              planLink?.ctaUrl ||
              plan.href;
            const fallbackPricing = defaultPlanPricing[plan.key][billing];
            const lkrPrice = formatPriceValue(planLink?.lkrPrice || fallbackPricing.lkrPrice);
            const usdPrice = formatPriceValue(planLink?.usdPrice || fallbackPricing.usdPrice);
            const activePrice = currency === "LKR" ? lkrPrice : usdPrice;
            const billingSuffix = getBillingSuffix(billing);
            const hasPricing = Boolean(activePrice);

            return (
              <div className="mt-5 max-w-7xl mx-auto rounded-2xl border border-border bg-white hover-lift">
                <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.15fr)_220px_minmax(0,1.7fr)_180px] lg:items-center lg:p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-muted-foreground shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {hasPricing ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {currency}
                        </span>
                        <span className="text-4xl font-heading font-bold text-foreground">{activePrice}</span>
                        {billingSuffix ? <span className="text-sm text-muted-foreground">{billingSuffix}</span> : null}
                      </div>
                    ) : (
                      <span className="text-2xl font-heading font-bold text-foreground">Contact Us</span>
                    )}
                    <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center">
                      <span className="text-sm font-medium text-primary">{plan.branches}</span>
                    </div>
                  </div>
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/70">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Button
                      asChild
                      className="w-full rounded-xl h-11 text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80"
                    >
                      <a href={ctaUrl}>{ctaLabel}</a>
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center mt-2">Custom rollout support</p>
                  </div>
                </div>
              </div>
            );
          })() : null}
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="section-header-label">Pricing Guide</span>
            <h2 className="section-header-title">Mobile Shop POS Pricing Explained</h2>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              Choosing the right phone shop POS pricing plan depends on your business size, number of branches, and daily sales volume. Cellivo offers flexible pricing for mobile shop owners, from single-store setups to multi-branch operations.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              If you are comparing a complete{" "}
              <Link to="/mobile-shop-pos-system" className="text-primary underline underline-offset-4">
                mobile shop POS system
              </Link>{" "}
              or a dedicated{" "}
              <Link to="/pos-system-for-phone-shop" className="text-primary underline underline-offset-4">
                POS system for phone shop
              </Link>{" "}
              workflows, each plan is built to support billing, operations, and growth without unnecessary complexity.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Our pricing plans are designed to grow with you, whether you are starting a new mobile shop or scaling an existing business with a stronger{" "}
              <Link to="/imei-tracking-pos-system" className="text-primary underline underline-offset-4">
                IMEI tracking system
              </Link>
              .
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Billing and invoicing system
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                IMEI-based inventory management
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Mobile repair tracking system
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Customer and supplier management
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                Advanced reporting and analytics
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="section-header-label">Plan Selection</span>
            <h2 className="section-header-title">Which Phone Shop POS Plan Is Right for You?</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Lite</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Best for simple retail shops that need affordable billing, stock, purchasing, customers, suppliers, and basic reports without repair, return, wholesale, or credit-sale workflows.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Starter</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Best for single-location mobile shops that need{" "}
                <Link to="/billing-software-for-mobile-shop" className="text-primary underline underline-offset-4">
                  billing
                </Link>
                , inventory, IMEI tracking, and repair management in one system.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Growth</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Best for growing phone shops with multiple branches that need stronger control, reporting, and team access.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Business</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Best for established retailers that need more branch capacity, advanced reporting, and full operational visibility.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Unlimited</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Best for franchise operations, large retail groups, or businesses that need a custom mobile shop POS setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="section-header-label">Commercial Intent</span>
            <h2 className="section-header-title">Affordable POS Software Cost for Mobile Shops</h2>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              Cellivo offers affordable phone shop POS pricing for businesses that need billing, inventory management, IMEI tracking, and repair workflows without paying for unnecessary software.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If you are comparing POS software cost for a mobile shop, Cellivo gives you flexible monthly, yearly, and lifetime options so you can choose the right pricing model for your business stage. You can explore the full{" "}
              <Link to="/mobile-shop-pos-system" className="text-primary underline underline-offset-4">
                mobile shop POS system
              </Link>
              , review the dedicated{" "}
              <Link to="/pos-system-for-phone-shop" className="text-primary underline underline-offset-4">
                POS system for phone shop
              </Link>{" "}
              page, or see how our{" "}
              <Link to="/billing-software-for-mobile-shop" className="text-primary underline underline-offset-4">
                billing software for mobile shops
              </Link>{" "}
              fits your daily sales workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12"><span className="section-header-label">Compare Plans</span><h2 className="section-header-title">Feature Comparison</h2></div>
          <div className="border border-border rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="text-left p-4 text-muted-foreground font-medium min-w-[200px]">Feature</th>{["Lite","Starter","Growth","Business","Unlimited"].map((p) => (<th key={p} className="p-4 text-center text-foreground font-medium min-w-[100px]">{p}</th>))}</tr></thead>
                <tbody>{comparisonFeatures.map((row, i) => (<tr key={row.name} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/30" : ""}`}><td className="p-4 text-foreground/70">{row.name}</td>{(["lite","starter","growth","business","unlimited"] as const).map((key) => (<td key={key} className="p-4 text-center">{typeof row[key] === "string" ? <span className="font-medium text-primary">{row[key]}</span> : row[key] ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-muted-foreground/30">-</span>}</td>))}</tr>))}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12"><span className="section-header-label">FAQ</span><h2 className="section-header-title">Common Questions</h2></div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-border rounded-xl px-5"><AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline text-left py-4">{faq.q}</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent></AccordionItem>))}
          </Accordion>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ready to run your shop <span className="text-white/60">smarter</span>?</h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">Create your free account and start managing your phone shop in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                <Link to="/pricing">Start Free</Link>
              </Button>
              <Button asChild size="lg" variant="inverseOutline" className="rounded-xl font-medium px-8">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-xs text-white/40 mt-4">No commitment. Cancel anytime.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
