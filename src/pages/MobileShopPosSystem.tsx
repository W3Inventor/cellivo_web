import Layout from "@/components/Layout";
import DemoBookingButton from "@/components/DemoBookingButton";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  DollarSign,
  Hash,
  Heart,
  LayoutDashboard,
  Monitor,
  Package,
  Receipt,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_RAW } from "@/lib/business-info";

const trustCards = [
  "500+ phone shops use Cellivo",
  "Used in 12+ countries",
  "Instant setup",
];

const previewMetrics = [
  {
    value: "LKR 809,799",
    label: "Revenue",
    hint: "Live sales income",
    icon: DollarSign,
    accent: "text-blue-600 bg-blue-500/10 border-blue-200/60",
  },
  {
    value: "LKR 145,582",
    label: "Net Profit",
    hint: "After commissions",
    icon: TrendingUp,
    accent: "text-emerald-600 bg-emerald-500/10 border-emerald-200/60",
  },
  {
    value: "18.0%",
    label: "Profit Margin",
    hint: "Net profit / revenue",
    icon: Target,
    accent: "text-cyan-600 bg-cyan-500/10 border-cyan-200/60",
  },
  {
    value: "13",
    label: "Orders",
    hint: "Daily sales count",
    icon: Receipt,
    accent: "text-amber-600 bg-amber-500/10 border-amber-200/60",
  },
];

const coreFeatures = [
  {
    icon: Receipt,
    title: "POS Billing",
    desc: "Fast billing with IMEI support, discounts, and instant receipts.",
    link: "/billing-software-for-mobile-shop",
  },
  {
    icon: Hash,
    title: "IMEI Tracking",
    desc: "Track every device with serial and IMEI-level control.",
    link: "/imei-tracking-pos-system",
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Real-time stock tracking for phones, accessories, and parts.",
    link: "/inventory-management-system",
  },
  {
    icon: Wrench,
    title: "Repair Management",
    desc: "Manage repair jobs, technicians, and customer updates.",
    link: "/mobile-repair-management-software",
  },
  {
    icon: Building2,
    title: "Multi-Branch Control",
    desc: "Manage multiple shops from one centralized dashboard.",
    link: "/multi-branch-pos-system",
  },
  {
    icon: Heart,
    title: "Customer & Loyalty",
    desc: "Track repeat customers and improve retention.",
    link: "/customer-loyalty-system",
  },
];

const differentiators = [
  "Built specifically for phone shops and mobile retailers",
  "Combines billing, inventory, repairs, and finance in one system",
  "Reduces manual work and operational errors",
  "Works across devices without installation",
  "Scales from single shop to multi-branch operations",
];

const featureLinks = [
  { label: "POS Billing System", path: "/billing-software-for-mobile-shop" },
  { label: "IMEI Tracking System", path: "/imei-tracking-pos-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Inventory System", path: "/inventory-management-system" },
];

const faqs = [
  {
    question: "What is the best POS system for mobile shops?",
    answer:
      "A mobile shop POS system is software built for phone retailers to manage billing, inventory, IMEI tracking, repairs, customers, and store operations from one connected platform.",
  },
  {
    question: "Does this POS software support IMEI tracking?",
    answer:
      "Yes. Cellivo includes IMEI tracking so phone shops can trace devices by serial or IMEI from purchase to sale with stronger stock control.",
  },
  {
    question: "Can I use this POS for mobile repair shop management?",
    answer:
      "Yes. Cellivo includes repair management tools so you can track intake, assign technicians, manage updates, and complete repair jobs from the same system.",
  },
  {
    question: "Is this mobile shop POS system suitable for multi-branch stores?",
    answer:
      "Yes. Cellivo supports multi-branch operations with centralized visibility, stock movement, staff access, and branch performance tracking.",
  },
  {
    question: "Can I run this POS system online without installation?",
    answer:
      "Yes. Cellivo is cloud-based, so you can use the POS without installation on desktop, tablet, or mobile devices with an internet connection.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cellivo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "All-in-one mobile shop POS system to manage billing, inventory, IMEI tracking, repairs, and customers. Built for mobile retailers and phone shops.",
  url: "https://cellivo.com/mobile-shop-pos-system",
  offers: {
    "@type": "Offer",
    price: "7000",
    priceCurrency: "LKR",
  },
};

const MobileShopPosSystem = () => (
  <Layout>
    <SEOHead
      title="Mobile Shop POS System | POS Software for Mobile Shops"
      description="Mobile shop POS system with billing, inventory, IMEI tracking, repairs, and customer tools for phone retailers who need one complete platform."
      canonical="https://cellivo.com/mobile-shop-pos-system"
      ogTitle="Mobile Shop POS System | POS Software for Mobile Shops"
      ogDescription="Mobile shop POS system for Sri Lanka businesses with billing, inventory, IMEI tracking, repairs, and customer management."
      ogUrl="https://cellivo.com/mobile-shop-pos-system"
      twitterTitle="Mobile Shop POS System | POS Software for Mobile Shops"
      twitterDescription="Mobile shop POS system for Sri Lanka businesses with billing, inventory, IMEI tracking, repairs, and customer management."
      structuredData={[softwareApplicationSchema, faqSchema]}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
      ]}
    />

    <section className="pt-28 pb-10 md:pt-32 md:pb-14 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-header-label">MOBILE SHOP POS SYSTEM</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold mt-3 mb-6 text-foreground leading-[1.08]">
            Mobile Shop POS System Built for Faster Billing, Inventory Control and Repairs
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
            Run your mobile shop with one POS system designed to handle billing, IMEI tracking, inventory, repairs, and customer management without manual work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link to="/pricing">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                Start Using Your Mobile Shop POS System Today <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <DemoBookingButton variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
              Book a Demo
            </DemoBookingButton>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            No credit card required • Setup in minutes • Works on any device
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Need help? Call us at{" "}
            <a href={`tel:${BUSINESS_PHONE_RAW}`} className="text-primary underline underline-offset-4 hover:text-primary/80">
              {BUSINESS_PHONE_DISPLAY}
            </a>
          </p>
          <div className="grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {trustCards.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-white/90 px-4 py-4 shadow-sm text-sm font-medium text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <SectionWrapper className="pt-0 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="section-header-label">Positioning</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            A Complete POS System Designed for Mobile Shops
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8 shadow-sm">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Unlike generic POS software, Cellivo is built specifically for mobile phone shops that need to manage devices, IMEI numbers, repairs, and accessories in one system.
          </p>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-0 pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl border border-primary/15 bg-primary/5 px-6 py-6 md:px-8 md:py-8 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="section-header-label">Sales Focus</span>
              <h2 className="text-2xl font-heading font-semibold text-foreground mt-3">
                Looking for Faster Billing and Checkout?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-3">
                If your focus is improving billing speed and sales efficiency, explore our dedicated POS system for phone shops designed for faster checkout and better counter experience.
              </p>
            </div>
            <Link to="/pos-system-for-phone-shop">
              <Button variant="outline" className="w-full md:w-auto font-medium px-6 h-11 rounded-xl text-sm">
                Explore POS for Phone Shops <ArrowRight className="ml-2" size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-0 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Product Preview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            See Everything in <span className="text-primary">One POS Dashboard</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Track sales, stock, repairs, and performance from one clean dashboard built for mobile retailers.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.12)] overflow-hidden"
          role="img"
          aria-label="Cellivo mobile shop POS dashboard preview showing sales, stock, repairs, and reports in one place"
        >
          <div className="grid lg:grid-cols-[250px_1fr]">
            <div className="bg-slate-900 text-white p-6 lg:p-7">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-heading font-semibold">CELLIVO</span>
                <LayoutDashboard size={18} className="text-white/70" />
              </div>
              <button className="w-full rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground text-left mb-8">
                + New Sale
              </button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                  <LayoutDashboard size={16} />
                  Dashboard
                </div>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                  <Package size={16} />
                  Inventory
                </div>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                  <Wrench size={16} />
                  Repairs
                </div>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                  <Users size={16} />
                  Customers
                </div>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                  <BarChart3 size={16} />
                  Reports
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-7">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    Live Store Control
                  </p>
                  <h3 className="text-2xl font-heading font-semibold text-slate-900">
                    Business Dashboard
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-medium text-primary">
                  <Monitor size={14} />
                  Cellivo Demo Branch 001
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                {previewMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xl font-heading font-semibold text-slate-900">{metric.value}</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">{metric.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{metric.hint}</p>
                      </div>
                      <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${metric.accent}`}>
                        <metric.icon size={18} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-[1.55fr_1fr] gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Sales & Repairs</p>
                      <h4 className="text-lg font-heading font-semibold text-slate-900">Live Store Activity</h4>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                      Updated now
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["New sale", "Samsung S24 Ultra · LKR 298,000", "Paid"],
                      ["Repair ready", "iPhone 13 screen replacement", "Notify customer"],
                      ["Stock alert", "USB-C chargers running low", "Reorder"],
                    ].map(([title, info, status]) => (
                      <div key={title} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                        <div>
                          <p className="font-medium text-slate-900">{title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{info}</p>
                        </div>
                        <span className="text-xs font-medium text-primary">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Top Priorities</p>
                  <h4 className="text-lg font-heading font-semibold text-slate-900 mb-4">What Needs Attention</h4>
                  <div className="space-y-3">
                    {[
                      "IMEI-linked stock synced with billing",
                      "Repair queue updated by technician",
                      "Accessory stock alert ready to review",
                      "Profit and sales summary available instantly",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">Core Features</span>
          <h2 className="section-header-title">Everything Your Mobile Shop Needs in One POS System</h2>
          <div className="premium-divider" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-border rounded-xl p-5 hover-lift group"
            >
              <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/8 transition-colors">
                <feature.icon size={19} className="text-foreground/60 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
              <Link to={feature.link} className="text-sm font-medium text-primary hover:underline">
                Learn more →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="lg:py-24">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <span className="section-header-label">Why It Wins</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Why Mobile Shops Choose This POS System
          </h2>
          <div className="premium-divider !mx-0" />
          <p className="text-muted-foreground leading-relaxed">
            Cellivo is built to give mobile retailers one clean operating system instead of multiple disconnected tools. Billing, stock, repairs, customers, and reporting stay connected in one workflow.
          </p>
        </div>
        <div className="space-y-3">
          {differentiators.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm text-sm md:text-base text-foreground flex items-start gap-3"
            >
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="section-header-label">Problem & Solution</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Running a Mobile Shop Should Not Be This Hard
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="rounded-3xl border border-border bg-white px-6 py-6 md:px-8 md:py-8 shadow-sm">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Many mobile shop owners struggle with disconnected tools, manual billing, and unclear stock tracking, which leads to mistakes, delays, and lost sales.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            This{" "}
            <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
              POS system for phone shops
            </Link>{" "}
            helps manage sales, billing, stock, repairs, and customers with better control and visibility.
          </p>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-0 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="section-header-label">Authority</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Built by Experts Who Understand Mobile Retail
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8 shadow-sm">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Cellivo is developed by W3Inventor, a software company focused on building systems for real-world businesses. This mobile shop POS system is designed based on real workflows used by phone shops handling billing, inventory, repairs, and customer management daily.
          </p>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="section-header-label">SEO Focus</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Mobile Shop POS Software for Modern Retailers
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            Cellivo is a complete mobile shop POS system designed for phone retailers who need fast billing, IMEI tracking, inventory control, repair management, and customer tracking in one platform.
          </p>
          <p>
            Whether you run a small mobile shop or a growing retail chain, this POS software for mobile shops provides the tools needed to improve efficiency and scale operations.
          </p>
          <p>
            Cellivo is used by mobile retailers looking for a reliable mobile shop POS system in Sri Lanka and across international markets.
          </p>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Internal Links</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Explore Key Features of Our POS System
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            This mobile shop POS system includes all the tools below as part of one complete solution.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {featureLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="rounded-2xl border border-border bg-white px-5 py-4 text-foreground transition hover:border-primary/40 hover:bg-primary/5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{item.label}</span>
                <ArrowRight size={16} className="text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About Our Mobile Shop POS System
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
              <div className="faq-answer text-muted-foreground leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30 lg:py-24">
      <div className="max-w-4xl mx-auto text-center rounded-[32px] border border-primary/15 bg-primary/5 px-6 py-12 md:px-10 md:py-16">
        <span className="section-header-label">Final CTA</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5 leading-[1.1]">
          Start Using a Mobile Shop POS System Today
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Join phone shop owners who use Cellivo to manage billing, inventory, repairs, and customers from one powerful system.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Using Your Mobile Shop POS System Today <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <DemoBookingButton variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
            Book a Demo
          </DemoBookingButton>
        </div>
      </div>
    </SectionWrapper>
  </Layout>
);

export default MobileShopPosSystem;
