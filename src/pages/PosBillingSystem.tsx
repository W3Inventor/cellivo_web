import FeatureHero from "@/components/FeatureHero";
import FeatureHubLinkSection from "@/components/FeatureHubLinkSection";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Hash,
  Package,
  Receipt,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

const trustStats = [
  { value: "500+", label: "mobile shops using Cellivo" },
  { value: "10,000+", label: "invoices processed" },
  { value: "Sri Lanka", label: "built for local businesses" },
];

const billingBenefits = [
  {
    icon: Clock,
    title: "Bill Customers in 30 Seconds",
    desc: "Move customers through the counter faster with quick item search, auto totals, and instant receipts.",
  },
  {
    icon: Calculator,
    title: "Avoid Pricing Mistakes",
    desc: "Auto tax, saved pricing, and cleaner discount controls help you stop costly billing errors.",
  },
  {
    icon: Wallet,
    title: "Accept Every Payment Smoothly",
    desc: "Take cash, card, bank transfer, or split payments without slowing down checkout.",
  },
  {
    icon: TrendingUp,
    title: "Know Your Daily Profit Instantly",
    desc: "See revenue, margin, and discount impact as sales happen instead of waiting until closing time.",
  },
  {
    icon: Smartphone,
    title: "See Your Best-Selling Phones",
    desc: "Track which models, accessories, and offers are moving fastest so you can restock with confidence.",
  },
  {
    icon: BarChart3,
    title: "Track Sales Without Excel",
    desc: "Get live billing reports and cash summaries without copying numbers into spreadsheets.",
  },
];

const comparisonRows = [
  {
    manual: "Slow billing at the counter",
    cellivo: "Create invoices in about 30 seconds",
  },
  {
    manual: "Manual totals and tax mistakes",
    cellivo: "Auto calculations with saved pricing and taxes",
  },
  {
    manual: "No proper product or IMEI traceability",
    cellivo: "IMEI-linked products with full invoice history",
  },
  {
    manual: "No clear profit or sales visibility",
    cellivo: "Daily sales, totals, and profit reports in one dashboard",
  },
];

const relatedLinks = [
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const billingFlowSteps = [
  {
    step: "1",
    title: "Add Product",
    desc: "Scan a barcode, select a phone, or search by item name and IMEI.",
    icon: Package,
  },
  {
    step: "2",
    title: "Auto Total",
    desc: "Taxes, discounts, and payable totals update automatically on the invoice.",
    icon: Calculator,
  },
  {
    step: "3",
    title: "Done",
    desc: "Take payment, print or send the receipt, and log the sale instantly.",
    icon: Receipt,
  },
];

const PosBillingSystem = () => (
  <Layout>
    <SEOHead
      title="POS Billing System for Phone Shops | Cellivo"
      description="Phone shop billing software with 30-second invoicing, IMEI tracking, instant receipts, auto tax, and checkout tools built for mobile retailers."
      canonical="https://cellivo.com/billing-software-for-mobile-shop"
      ogTitle="POS Billing System for Phone Shops | Cellivo"
      ogDescription="Create invoices in 30 seconds with IMEI tracking, auto tax, instant receipts, and real-time billing reports for mobile shops."
      ogUrl="https://cellivo.com/billing-software-for-mobile-shop"
      twitterTitle="POS Billing System for Phone Shops | Cellivo"
      twitterDescription="Mobile shop billing system for phone shops with faster checkout, auto totals, IMEI tracking, and better daily reports."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Billing Software for Mobile Shop", path: "/billing-software-for-mobile-shop" },
      ]}
    />

    <FeatureHero
      badge="POS Billing System"
      painHook={[
        "Still writing bills manually?",
        "Losing time at the counter and making avoidable pricing mistakes?",
        "There's a faster way to bill in your phone shop.",
      ]}
      title={
        <>
          Stop Wasting Time on Manual Billing in Your <span className="text-primary">Phone Shop</span>
        </>
      }
      supportText="Create invoices in 30 seconds with IMEI tracking, auto tax, and instant receipts for your phone shop."
      primaryCtaLabel="Start Managing My Shop Smarter"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection
      description="This feature is part of our POS system for phone shops designed to improve billing speed and sales efficiency."
      buttonLabel="View POS System"
      linkTo="/pos-system-for-phone-shop"
    />

    <WhyThisMattersSection
      label="Why Better Billing Matters"
      title="Why Phone Shops Need Faster Billing"
      problemText="Without a proper billing system, your counter gets slow, mistakes happen more often, and your team wastes time on manual totals, handwritten bills, and invoice corrections."
      solutionText="Cellivo gives phone shops a faster POS billing system with cleaner checkout, instant receipts, IMEI-linked sales, and better daily billing visibility."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">30-Second Billing Flow</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Faster Billing Starts with a <span className="text-primary">Simple Screen</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Add product, let the system calculate totals, and finish the sale with a receipt in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-5">3 Steps to Complete a Sale</h3>
            <div className="space-y-4">
              {billingFlowSteps.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-1">Step {item.step}</p>
                      <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.10)] overflow-hidden"
            role="img"
            aria-label="Billing system preview showing product selection, auto totals, and instant receipt flow for a phone shop POS"
          >
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">Billing Preview</p>
                <h3 className="font-heading font-semibold text-lg">Cellivo POS Billing</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
                <Hash size={13} />
                Invoice #20264
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-6">
              <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Add Product</p>
                      <h4 className="text-lg font-heading font-semibold text-slate-900">Invoice Builder</h4>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Receipt size={18} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["iPhone 13 128GB", "IMEI 356789123456789", "LKR 185,000"],
                      ["Tempered Glass", "Accessory", "LKR 3,500"],
                      ["Fast Charger", "Accessory", "LKR 6,500"],
                    ].map(([name, meta, price]) => (
                      <div key={name} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{name}</p>
                          <p className="text-xs text-muted-foreground">{meta}</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-heading font-semibold text-slate-900">Auto Total</h4>
                      <Calculator size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-slate-900">LKR 195,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-medium text-slate-900">LKR 2,500</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium text-slate-900">LKR 0</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">Payable</span>
                        <span className="text-lg font-heading font-semibold text-primary">LKR 192,500</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-heading font-semibold text-slate-900">Done</h4>
                      <FileText size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 font-medium">
                        Payment received and receipt sent
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-700">Cash</span>
                        <span className="font-medium text-slate-900">LKR 100,000</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-700">Card</span>
                        <span className="font-medium text-slate-900">LKR 92,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12">
        <span className="section-header-label">Why This Billing Page Converts</span>
        <h2 className="section-header-title">Benefits Phone Shop Owners Actually Care About</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {billingBenefits.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-border rounded-xl p-5 hover-lift group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
              <item.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">Manual vs Cellivo</span>
          <h2 className="section-header-title">Why Phone Shops Stop Billing the Hard Way</h2>
          <div className="premium-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-destructive font-semibold">Manual Billing</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Slower, riskier, harder to track</h3>
              </div>
            </div>
            <div className="space-y-3">
              {comparisonRows.map((row) => (
                <div key={row.manual} className="rounded-xl bg-white/80 border border-destructive/10 px-4 py-3 text-sm text-foreground/80">
                  {row.manual}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-primary/5 p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Cellivo Billing</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Faster sales with cleaner control</h3>
              </div>
            </div>
            <div className="space-y-3">
              {comparisonRows.map((row) => (
                <div key={row.cellivo} className="rounded-xl bg-white/90 border border-primary/10 px-4 py-3 text-sm text-foreground/85">
                  {row.cellivo}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">SEO Boost</span>
        <h2 className="section-header-title">POS Billing System for Mobile Shops in Sri Lanka</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo is a POS system Sri Lanka retailers can use as billing software for phone shops without complex setup or long training. If you need a mobile shop billing system that helps your team bill faster, track IMEI-linked products, calculate totals automatically, and see daily sales clearly, this page is built for that search intent.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="text-center mb-12">
        <span className="section-header-label">Explore More</span>
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">More Features That Support Faster Billing</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {relatedLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="px-4 py-2 bg-white border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </SectionWrapper>

    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Start Billing Faster in Your Phone Shop
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Switch to a billing system that helps your team work faster, avoid mistakes, and track every sale properly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Managing My Shop Smarter <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="inverseOutline" className="rounded-xl font-medium px-8">
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Instant access</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Built for Sri Lankan businesses</span>
          </div>
          <p className="text-sm text-white/60 mt-4">Start today. Set up your billing system in under 5 minutes.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default PosBillingSystem;
