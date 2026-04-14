import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Building2, Crown, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type BillingCycle = "monthly" | "yearly" | "lifetime";

const allFeatures = ["Billing & invoicing","Product inventory","IMEI-based stock control","Accessories management","Customer records","Repair job management","Staff / user roles","Advanced reports & analytics","Profit analytics","Full analytics dashboard","Priority support"];

const plans = [
  { name: "Starter", tagline: "For single-location phone shops", icon: Zap, prices: { monthly: "7,000", yearly: "70,000", lifetime: "380,000" }, cta: "Start Free", popular: false, branches: "1 Branch", features: [...allFeatures] },
  { name: "Growth", tagline: "For shops expanding to multiple locations", icon: Sparkles, prices: { monthly: "12,000", yearly: "120,000", lifetime: "500,000" }, cta: "Start Free", popular: true, branches: "Up to 3 Branches", features: [...allFeatures] },
  { name: "Business", tagline: "For established multi-location retailers", icon: Building2, prices: { monthly: "16,000", yearly: "160,000", lifetime: "700,000" }, cta: "Start Free", popular: false, branches: "Up to 6 Branches", features: [...allFeatures] },
  { name: "Unlimited", tagline: "For large-scale or franchise operations", icon: Crown, prices: { monthly: null, yearly: null, lifetime: null }, cta: "Contact Us", popular: false, branches: "Unlimited Branches", features: [...allFeatures] },
];

const comparisonFeatures = [
  { name: "All POS features", starter: true, growth: true, business: true, unlimited: true },
  { name: "Billing & invoicing", starter: true, growth: true, business: true, unlimited: true },
  { name: "IMEI-based stock control", starter: true, growth: true, business: true, unlimited: true },
  { name: "Repair job management", starter: true, growth: true, business: true, unlimited: true },
  { name: "Advanced reports", starter: true, growth: true, business: true, unlimited: true },
  { name: "Priority support", starter: true, growth: true, business: true, unlimited: true },
  { name: "Branches", starter: "1" as string | boolean, growth: "3" as string | boolean, business: "6" as string | boolean, unlimited: "∞" as string | boolean },
];

const faqs = [
  { q: "Do I need a credit card to start?", a: "No. Create your account and start using Cellivo immediately — no credit card required." },
  { q: "How fast can I get started?", a: "Instantly. Sign up, add your products, and start billing within minutes." },
  { q: "Can I upgrade or switch plans later?", a: "Absolutely. Upgrade, downgrade, or switch anytime. Your data carries over seamlessly." },
  { q: "What is included in lifetime?", a: "A one-time payment for permanent access with all future updates. No recurring fees." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel from your account settings — no questions asked." },
];

const toggleOptions: { label: string; value: BillingCycle; badge?: string }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly", badge: "Save 2 months" },
  { label: "Lifetime", value: "lifetime", badge: "Best value" },
];

const Pricing = () => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <Layout>
      <SEOHead
        title="Cellivo Pricing — POS Plans for Phone Shops"
        description="Compare Cellivo pricing plans for single-store and multi-branch phone shops. Start free and upgrade when your business is ready."
        canonical="/pricing"
      />
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 text-center">
        <div className="container mx-auto px-4">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-header-label">Pricing</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-header-desc mb-4">
            Start free, upgrade anytime. No credit card required.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10">
            <ShieldCheck size={14} /><span>No commitment. Cancel anytime.</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-secondary/60">
            {toggleOptions.map((opt) => (
              <button key={opt.value} onClick={() => setBilling(opt.value)} className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${billing === opt.value ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                {billing === opt.value && <motion.div layoutId="toggle-bg" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="relative z-10 flex items-center gap-2">{opt.label}{opt.badge && <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{opt.badge}</span>}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`relative group rounded-2xl border ${plan.popular ? "border-foreground shadow-lg" : "border-border"} bg-white hover-lift`}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><span className="text-[11px] font-semibold uppercase tracking-wider bg-foreground text-background px-4 py-1 rounded-full">Most Popular</span></div>}
                  <div className="p-6 lg:p-7 flex flex-col h-full">
                    <div className="mb-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.popular ? "bg-foreground/5 text-foreground" : "bg-secondary text-muted-foreground"}`}><Icon className="w-5 h-5" /></div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">{plan.tagline}</p>
                    </div>
                    <div className="mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div key={billing} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="flex items-baseline gap-1">
                          {plan.prices[billing] ? (
                            <>
                              <span className="text-sm text-muted-foreground mr-0.5">Rs.</span>
                              <span className="text-4xl font-heading font-bold text-foreground">{plan.prices[billing]}</span>
                              <span className="text-sm text-muted-foreground">{billing === "lifetime" ? " one-time" : billing === "yearly" ? "/yr" : "/mo"}</span>
                            </>
                          ) : (
                            <span className="text-2xl font-heading font-bold text-foreground">Contact Us</span>
                          )}
                        </motion.div>
                      </AnimatePresence>
                      {billing === "yearly" && plan.prices.yearly && <p className="text-xs text-primary mt-1.5 font-medium">Save 2 months — best annual deal</p>}
                      {billing === "lifetime" && plan.prices.lifetime && <p className="text-xs text-primary mt-1.5 font-medium">Pay once, use forever</p>}
                    </div>
                    <div className="mb-5 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center"><span className="text-sm font-medium text-primary">{plan.branches}</span></div>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm text-foreground/70"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{f}</li>))}
                    </ul>
                    <Button className={`w-full rounded-xl h-11 font-medium ${plan.popular ? "bg-foreground text-background hover:bg-foreground/90" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>{plan.cta}</Button>
                    <p className="text-[10px] text-muted-foreground text-center mt-2">No credit card required</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12"><span className="section-header-label">Compare Plans</span><h2 className="section-header-title">Feature Comparison</h2></div>
          <div className="border border-border rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="text-left p-4 text-muted-foreground font-medium min-w-[200px]">Feature</th>{["Starter","Growth","Business","Unlimited"].map((p) => (<th key={p} className="p-4 text-center text-foreground font-medium min-w-[100px]">{p}</th>))}</tr></thead>
                <tbody>{comparisonFeatures.map((row, i) => (<tr key={row.name} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/30" : ""}`}><td className="p-4 text-foreground/70">{row.name}</td>{(["starter","growth","business","unlimited"] as const).map((key) => (<td key={key} className="p-4 text-center">{typeof row[key] === "string" ? <span className="font-medium text-primary">{row[key]}</span> : row[key] ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-muted-foreground/30">—</span>}</td>))}</tr>))}</tbody>
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
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">Start Free</Button>
              <Button size="lg" variant="inverseOutline" className="rounded-xl font-medium px-8">Contact Support</Button>
            </div>
            <p className="text-xs text-white/40 mt-4">No commitment. Cancel anytime.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
