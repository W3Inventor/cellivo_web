import Layout from "@/components/Layout";
import DemoBookingButton from "@/components/DemoBookingButton";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Hash,
  LayoutDashboard,
  Package,
  Receipt,
  Search,
  ShoppingCart,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustCards = [
  "500+ phone shops use Cellivo",
  "Used in 12+ countries",
  "Instant setup",
];

const posExperiencePoints = [
  "Quick product search and selection",
  "IMEI-based billing for devices",
  "Multiple payment methods support",
  "Instant invoice and receipt generation",
  "Discount and price control features",
];

const coreFeatures = [
  {
    icon: Receipt,
    title: "Billing Software",
    desc: "Create invoices quickly with tax, discounts, and payment tracking.",
    link: "/billing-software-for-mobile-shop",
  },
  {
    icon: Hash,
    title: "IMEI Tracking",
    desc: "Track each device sold with complete IMEI history.",
    link: "/imei-tracking-pos-system",
  },
  {
    icon: Package,
    title: "Inventory Integration",
    desc: "Stock updates automatically after every sale.",
    link: "/inventory-management-system",
  },
];

const differentiators = [
  "Built specifically for mobile phone shops",
  "Handles devices, IMEI numbers, and accessories",
  "Reduces billing errors and manual work",
  "Improves checkout speed and efficiency",
  "Works online without complex setup",
];

const faqItems = [
  {
    question: "What is the best POS system for phone shops?",
    answer:
      "The best POS system for phone shops is one built for mobile retail workflows, including billing, IMEI-based sales, inventory updates, and faster checkout. Cellivo is designed specifically for those needs.",
  },
  {
    question: "Does this POS support IMEI billing?",
    answer:
      "Yes. Cellivo supports IMEI billing so you can record each device sold, link it to the invoice, and keep a complete sales history for every phone.",
  },
  {
    question: "Can I manage inventory with this POS system?",
    answer:
      "Yes. Inventory updates automatically after each sale, helping phone shops keep stock levels accurate for phones, accessories, and related items.",
  },
  {
    question: "Is this POS system suitable for small phone shops?",
    answer:
      "Yes. Cellivo works well for small phone shops that need faster billing, simpler checkout, and clearer stock visibility without complicated setup.",
  },
  {
    question: "Can I use this POS system without installation?",
    answer:
      "Yes. Cellivo is cloud-based, so you can use the POS system online without installation from desktop, tablet, or mobile devices.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
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
    "POS system for phone shops to manage billing, sales, inventory, and IMEI tracking. Built for mobile phone stores to speed up checkout and reduce errors.",
  url: "https://cellivo.com/pos-system-for-phone-shop",
  offers: {
    "@type": "Offer",
    price: "7000",
    priceCurrency: "LKR",
  },
};

const salesSteps = [
  {
    icon: Search,
    title: "Select Products Fast",
    desc: "Find phones and accessories quickly with cleaner item lookup and fewer clicks at the counter.",
  },
  {
    icon: Smartphone,
    title: "Confirm Device Details",
    desc: "Attach IMEI numbers to the sale, apply pricing rules, and keep each device properly documented.",
  },
  {
    icon: Wallet,
    title: "Complete Payment",
    desc: "Finish the sale with instant totals, payment tracking, and a receipt ready to print or send.",
  },
];

const PosSystemForPhoneShop = () => (
  <Layout>
    <SEOHead
      title="POS System for Phone Shop | Fast Billing Software"
      description="POS system for phone shops to manage billing, sales, inventory, and IMEI tracking. Built for mobile phone stores to speed up checkout and reduce errors."
      canonical="https://cellivo.com/pos-system-for-phone-shop"
      ogTitle="POS System for Phone Shop | Fast Billing Software"
      ogDescription="POS system for phone shops to manage billing, sales, inventory, and IMEI tracking. Built for mobile phone stores to speed up checkout and reduce errors."
      ogUrl="https://cellivo.com/pos-system-for-phone-shop"
      twitterTitle="POS System for Phone Shop | Fast Billing Software"
      twitterDescription="POS system for phone shops to manage billing, sales, inventory, and IMEI tracking with faster checkout and fewer errors."
      structuredData={[softwareApplicationSchema, faqSchema]}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "POS System for Phone Shop", path: "/pos-system-for-phone-shop" },
      ]}
    />

    <section className="pt-28 pb-10 md:pt-32 md:pb-14 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-header-label">PHONE SHOP POS SYSTEM</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-heading font-bold mt-3 mb-6 text-foreground leading-[1.08]">
            POS System for Phone Shop That Speeds Up Billing and Sales
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
            Handle every sale faster with a POS system designed for mobile phone shops, including IMEI billing, instant receipts, and real-time inventory updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link to="/pricing">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <DemoBookingButton variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
              Book a Demo
            </DemoBookingButton>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            No installation required • Works on any device • Setup in minutes
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

    <SectionWrapper className="pt-0 pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl border border-primary/15 bg-primary/5 px-6 py-6 md:px-8 md:py-8 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="section-header-label">Complete Platform</span>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-3">
                This page focuses on checkout and billing speed, but Cellivo also connects sales with inventory, IMEI tracking, repairs, and customer tools inside one{" "}
                <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
                  mobile shop POS system
                </Link>
                .
              </p>
            </div>
            <Link to="/mobile-shop-pos-system">
              <Button variant="outline" className="w-full md:w-auto font-medium px-6 h-11 rounded-xl text-sm">
                Explore Full POS System <ArrowRight className="ml-2" size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-0 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">POS Experience</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Designed for Fast Checkout at Your Counter
          </h2>
          <div className="premium-divider" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Every second matters at the billing counter. This POS system is built to help phone shops complete sales quickly with fewer clicks, faster item selection, and instant invoice generation.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            {posExperiencePoints.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-4">
                <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm md:text-base text-foreground/85 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-0 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Sales Workflow</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Simple and Efficient <span className="text-primary">Sales Workflow</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            From selecting products to completing payment, every step is optimized for speed and accuracy in mobile phone retail.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-5">Built for Faster Counter Sales</h3>
            <div className="space-y-4">
              {salesSteps.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
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
            aria-label="Phone shop POS dashboard showing checkout flow, IMEI billing, payment options, and live inventory updates"
          >
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">Sales Flow</p>
                <h3 className="font-heading font-semibold text-lg">Cellivo Checkout Desk</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
                <ShoppingCart size={13} />
                Counter Sale
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-6">
              <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Invoice Builder</p>
                      <h4 className="text-lg font-heading font-semibold text-slate-900">Fast Counter Billing</h4>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Receipt size={18} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["iPhone 14 Pro", "IMEI-linked device", "LKR 255,000"],
                      ["Clear Case", "Accessory", "LKR 4,500"],
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
                      <h4 className="text-base font-heading font-semibold text-slate-900">Payments</h4>
                      <Wallet size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      {[
                        ["Cash", "Available"],
                        ["Card", "Available"],
                        ["Bank Transfer", "Available"],
                      ].map(([name, status]) => (
                        <div key={name} className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between">
                          <span className="text-slate-700">{name}</span>
                          <span className="text-xs font-medium text-primary">{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-heading font-semibold text-slate-900">Live Updates</h4>
                      <LayoutDashboard size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 font-medium">
                        Stock updated automatically
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-slate-700">Receipt</span>
                        <span className="font-medium text-slate-900">Ready instantly</span>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-slate-700">IMEI History</span>
                        <span className="font-medium text-slate-900">Logged to sale</span>
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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">Core POS Features</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Everything You Need for <span className="text-primary">Sales and Billing</span>
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {coreFeatures.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <feature.icon size={18} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Why It Works</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Why Phone Shops Choose This <span className="text-primary">POS System</span>
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {differentiators.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card px-5 py-5 flex items-start gap-3 shadow-sm">
              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
              <p className="text-sm md:text-base text-foreground/85 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Problem and Solution</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Stop Slowing Down Your Sales with <span className="text-primary">Manual Billing</span>
        </h2>
        <div className="premium-divider" />
        <div className="rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8 shadow-sm text-left">
          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Many phone shops still use slow or outdated billing systems that increase waiting time, create pricing mistakes, and reduce customer satisfaction.
            </p>
            <p>
              This POS system helps mobile retailers process sales faster, reduce errors, and improve the overall checkout experience.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">SEO Focus</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          POS Software for Mobile Phone Shops and Retail Stores
        </h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo is a POS system for phone shops designed to handle mobile devices, accessories, and repair services in one platform. It supports IMEI tracking, inventory management, and real-time sales updates.
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
          Whether you operate a small mobile shop or a large cell phone store, this POS software helps improve billing speed, reduce manual errors, and increase operational efficiency.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          This POS system is used by mobile retailers looking for a reliable POS system for phone shops in Sri Lanka and international markets.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Explore More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Explore More POS Features
        </h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          This POS system for phone shops includes advanced tools for billing, inventory, and device tracking.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4 max-w-3xl mx-auto">
          If you need the wider platform beyond checkout, explore the full{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          to see how billing connects with repairs, customer tools, and multi-branch control.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { label: "Billing Software for Mobile Shop", path: "/billing-software-for-mobile-shop" },
            { label: "IMEI Tracking System", path: "/imei-tracking-pos-system" },
            { label: "Inventory Management System", path: "/inventory-management-system" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="rounded-2xl border border-border bg-white px-5 py-4 text-foreground transition hover:border-primary/40 hover:bg-primary/5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{link.label}</span>
                <ArrowRight size={16} className="text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About This <span className="text-primary">Phone Shop POS System</span>
          </h2>
          <div className="premium-divider" />
        </div>
        <div className="space-y-4">
          {faqItems.map((faq) => (
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
          Start Using a Faster POS System for Your Phone Shop
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Upgrade your billing and sales process with a POS system built specifically for mobile retailers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Free Trial <ArrowRight className="ml-2" size={16} />
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

export default PosSystemForPhoneShop;
