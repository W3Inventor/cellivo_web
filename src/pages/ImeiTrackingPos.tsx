import FeatureHero from "@/components/FeatureHero";
import FeatureHubLinkSection from "@/components/FeatureHubLinkSection";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileText,
  Hash,
  Package,
  Search,
  ShieldCheck,
  Smartphone,
  UserRound,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops using Cellivo" },
  { value: "Thousands+", label: "devices tracked daily" },
  { value: "Sri Lanka", label: "built for local mobile retailers" },
];

const imeiBenefits = [
  {
    icon: Smartphone,
    title: "Never Lose Track of Any Phone",
    desc: "Track every device from supplier purchase to final sale so stock never disappears into guesswork.",
  },
  {
    icon: Search,
    title: "Find Any Device in Seconds",
    desc: "Search by IMEI and see the device status, history, and current location without digging through notes or spreadsheets.",
  },
  {
    icon: ShieldCheck,
    title: "Stop Fraud and Duplicate IMEI Issues",
    desc: "Catch suspicious entries, duplicate devices, and risky stock problems before they turn into losses.",
  },
  {
    icon: Package,
    title: "Know Exactly Where Every Phone Is",
    desc: "See whether a device is in stock, sold, reserved, or transferred so audits stop being stressful.",
  },
  {
    icon: FileText,
    title: "Track Every Sale with Full History",
    desc: "Keep a complete record of which phone was sold, when it moved, and which customer bought it.",
  },
];

const dashboardHighlights = [
  {
    title: "IMEI List",
    desc: "View every device with model, storage, condition, and live status in one screen.",
    icon: Hash,
  },
  {
    title: "Device Status",
    desc: "Know instantly whether each phone is in stock, sold, reserved, or transferred.",
    icon: Smartphone,
  },
  {
    title: "Supplier Info",
    desc: "See where each phone came from and what it cost without opening multiple records.",
    icon: Package,
  },
  {
    title: "Customer Link",
    desc: "Connect the sold phone to the invoice and buyer for full post-sale traceability.",
    icon: UserRound,
  },
];

const comparisonRows = [
  {
    manual: "Phones get lost or mixed up in stock",
    cellivo: "Full IMEI tracking from purchase to sale",
  },
  {
    manual: "No instant way to trace a device",
    cellivo: "Instant lookup by IMEI with live status",
  },
  {
    manual: "No reliable history for audits or disputes",
    cellivo: "Complete history for every phone and sale",
  },
  {
    manual: "Audits are slow and stock confusion is common",
    cellivo: "Zero stock confusion with device-level visibility",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const imeiFaqs = [
  {
    question: "What is IMEI tracking?",
    answer:
      "IMEI tracking is a way to manage every phone by its unique device number so you can trace stock movement, sales, returns, and ownership accurately.",
  },
  {
    question: "How does IMEI stock control work?",
    answer:
      "Each phone is recorded with its IMEI when it enters stock. From there, the system tracks status changes, supplier details, movements, and the final sale to a customer.",
  },
  {
    question: "Can I track sold phones?",
    answer:
      "Yes. Cellivo links sold phones to invoices and customers so you can see exactly which device was sold, when, and to whom.",
  },
  {
    question: "Does it prevent fraud?",
    answer:
      "Yes. IMEI-level records help prevent duplicate entries, suspicious stock activity, and missing-device confusion by keeping a clean audit trail.",
  },
  {
    question: "Does it work with POS?",
    answer:
      "Yes. Cellivo connects IMEI tracking with POS billing so the device history and sale record update together automatically.",
  },
];

const imeiFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: imeiFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const imeiDashboardPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='680' height='540' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='76' y='208' width='190' height='18' rx='9' fill='%23dbeafe'/%3E%3Crect x='76' y='248' width='600' height='54' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='324' width='600' height='54' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='400' width='600' height='54' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='476' width='600' height='54' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='752' y='160' width='412' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='792' y='208' width='190' height='18' rx='9' fill='%23d1fae5'/%3E%3Crect x='792' y='248' width='332' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='792' y='288' width='286' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='752' y='450' width='412' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='792' y='498' width='184' height='18' rx='9' fill='%23fde68a'/%3E%3Crect x='792' y='538' width='332' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='792' y='578' width='270' height='20' rx='10' fill='%23e2e8f0'/%3E%3C/svg%3E";

const ImeiTrackingPos = () => (
  <Layout>
    <SEOHead
      title="IMEI Tracking System for Phone Shops | Cellivo"
      description="IMEI tracking system for phone shops with instant lookup, stock history, supplier tracing, warranty visibility, and cleaner device audits daily."
      canonical="https://cellivo.com/imei-tracking-pos-system"
      ogTitle="IMEI Tracking System for Phone Shops | Cellivo"
      ogDescription="Manage every device from purchase to sale with full IMEI tracking, instant lookup, and complete history."
      ogUrl="https://cellivo.com/imei-tracking-pos-system"
      twitterTitle="IMEI Tracking System for Phone Shops | Cellivo"
      twitterDescription="IMEI stock control software for mobile shops with instant device lookup and full history."
      structuredData={imeiFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "IMEI Tracking System", path: "/imei-tracking-pos-system" },
      ]}
    />

    <FeatureHero
      badge="IMEI Tracking System"
      painHook={[
        "Lost a phone in your stock?",
        "Can't track which device was sold to which customer?",
        "Manual stock tracking is costing you money every month.",
      ]}
      title={
        <>
          Track Every Phone by IMEI and <span className="text-primary">Never Lose Stock Again</span>
        </>
      }
      supportText="Manage every device from purchase to sale with full IMEI tracking, instant lookup, and complete device history."
      primaryCtaLabel="Start Tracking Your Stock Smarter"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection
      description="This feature is part of our phone shop POS system designed to improve billing speed and sales efficiency."
      buttonLabel="View POS System"
      linkTo="/pos-system-for-phone-shop"
    />

    <WhyThisMattersSection
      label="Why IMEI Control Matters"
      title="Why Phone Shops Need IMEI-Level Stock Control"
      problemText="When stock is managed manually, it becomes difficult to trace which phone came from which supplier, where it moved, and which customer finally bought it."
      solutionText="Cellivo gives phone shops an IMEI tracking system with full traceability, instant lookup, cleaner audits, and stronger device-level control."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">IMEI Tracking Dashboard Preview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One Dashboard for IMEI Records, Device Status, and <span className="text-primary">Sales History</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See every phone by IMEI with supplier details, stock status, and customer-linked sales records so nothing goes missing between purchase and checkout.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground mb-5">What Your Team Can See Instantly</h2>
            <div className="space-y-4">
              {dashboardHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
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
            aria-label="IMEI tracking dashboard preview showing IMEI list, device status, supplier information, and customer-linked sales history"
          >
            <img
              src={imeiDashboardPreviewImage}
              alt="IMEI tracking system dashboard showing device list, stock status, supplier info, and customer link"
              className="sr-only"
              loading="lazy"
            />
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">IMEI Dashboard</p>
                <h3 className="font-heading font-semibold text-lg">Cellivo Device Traceability</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
                <Hash size={13} />
                IMEI Verified
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-6">
              <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">IMEI List</p>
                      <h3 className="text-lg font-heading font-semibold text-slate-900">Tracked Devices</h3>
                    </div>
                    <Search size={18} className="text-primary" />
                  </div>

                  <div className="space-y-3 text-sm">
                    {[
                      ["356789123456789", "iPhone 13 128GB", "In Stock"],
                      ["353214987654321", "Samsung S24 256GB", "Sold"],
                      ["351118887776665", "Pixel 8 128GB", "Reserved"],
                    ].map(([imei, model, status]) => (
                      <div key={imei} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-900">{imei}</p>
                          <p className="text-xs text-muted-foreground">{model}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Supplier Info</h3>
                      <Package size={16} className="text-primary" />
                    </div>
                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm">
                      <p className="font-medium text-slate-900">Lanka Mobile Distributors</p>
                      <p className="text-xs text-muted-foreground">Purchase date: April 12, 2026</p>
                      <p className="text-xs text-muted-foreground">Cost: LKR 168,000</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Customer Link</h3>
                      <UserRound size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 font-medium">
                        Sold phone linked to invoice and customer
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        <p className="font-medium text-slate-900">Customer: Dhanushka Jayasuriya</p>
                        <p className="text-xs text-muted-foreground">Invoice #20481 · Warranty tracked</p>
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
        <span className="section-header-label">Why This IMEI Page Converts</span>
        <h2 className="section-header-title">Benefits Phone Shop Owners Actually Care About</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {imeiBenefits.map((item, index) => (
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
          <span className="section-header-label">Manual vs IMEI System</span>
          <h2 className="section-header-title">Why Smart Phone Shops Stop Guessing About Stock</h2>
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
                <p className="text-xs uppercase tracking-[0.18em] text-destructive font-semibold">Manual Stock Tracking</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Harder to audit, easier to lose devices</h3>
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
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Cellivo IMEI System</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Clear stock history with less confusion</h3>
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
        <h2 className="section-header-title">IMEI Tracking System for Mobile Shops in Sri Lanka</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo gives mobile retailers an imei tracking system that helps control every phone at device level with accurate traceability and faster audits. If you need stronger mobile inventory tracking or a phone shop stock system Sri Lanka businesses can use without spreadsheet confusion, this page is built for that search intent.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          It works with our{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing system
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management system
          </Link>
          , and{" "}
          <Link to="/mobile-repair-management-software" className="text-primary hover:underline">
            repair tracking tools
          </Link>{" "}
          so every device, sale, and service record stays connected.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="section-header-label">Learn More</span>
        <h2 className="section-header-title">Learn How IMEI Tracking Prevents Stock Loss</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Explore our blog to learn how IMEI tracking can prevent stock loss and improve your mobile shop operations with clearer audits and stronger traceability.
        </p>
        <div className="mt-6">
          <Link to="/blog">
            <Button variant="outline" className="rounded-xl font-medium px-6">
              Read IMEI Tracking Articles
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">FAQ</span>
          <h2 className="section-header-title">Common Questions About IMEI Tracking Systems</h2>
          <div className="premium-divider" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Quick answers to the questions phone shops ask most when choosing IMEI-level stock control.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {imeiFaqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
              <div className="faq-answer text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="text-center mb-12">
        <span className="section-header-label">Explore More</span>
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">More Features That Support Better Device Tracking</h2>
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
            Get My IMEI Tracking System Now
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Replace stock confusion with a system that shows exactly where every phone is and what happened to it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Tracking Your Stock Smarter <ArrowRight className="ml-2" size={16} />
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
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Built for Sri Lankan mobile retailers</span>
          </div>
          <p className="text-sm text-white/60 mt-4">Start today and get control of every phone in your stock within minutes.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default ImeiTrackingPos;
