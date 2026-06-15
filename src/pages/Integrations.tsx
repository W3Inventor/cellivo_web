import FeatureHero from "@/components/FeatureHero";
import Layout from "@/components/Layout";
import DemoBookingButton from "@/components/DemoBookingButton";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Mail,
  MessageSquare,
  Printer,
  ShieldCheck,
  ShoppingCart,
  Workflow,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops use Cellivo" },
  { value: "Seamless", label: "POS integrations" },
  { value: "Real-Time", label: "sync across tools" },
];

const integrationBenefits = [
  {
    icon: ShoppingCart,
    title: "Sync Online and Offline Sales Automatically",
    desc: "Keep WooCommerce orders, stock, and product updates aligned with your POS so your store and counter stay in sync without manual entry.",
  },
  {
    icon: MessageSquare,
    title: "Send SMS Notifications Without Manual Work",
    desc: "Trigger invoice confirmations, repair updates, and payment reminders automatically instead of sending customer messages one by one.",
  },
  {
    icon: Mail,
    title: "Email Invoices and Reports Instantly",
    desc: "Send invoices, receipts, and store reports directly from the system so communication stays fast and professional.",
  },
  {
    icon: Globe,
    title: "Connect POS with Your Online Store",
    desc: "Link your POS to eCommerce and third-party tools so products, stock, and orders move between systems without duplicate work.",
  },
  {
    icon: Zap,
    title: "Reduce Manual Work and Errors",
    desc: "Replace repeated copy-paste tasks with connected workflows that keep your tools updated automatically.",
  },
  {
    icon: Workflow,
    title: "Keep All Business Tools in Sync",
    desc: "Make sure your POS, customer updates, printers, and external services all follow the same real-time business data.",
  },
];

const flowConnections = [
  {
    icon: ShoppingCart,
    title: "POS to WooCommerce",
    desc: "Sync products, orders, and stock levels automatically between your store counter and online storefront.",
  },
  {
    icon: MessageSquare,
    title: "POS to SMS",
    desc: "Send invoices, repair updates, and payment reminders the moment activity happens inside Cellivo.",
  },
  {
    icon: Mail,
    title: "POS to Email",
    desc: "Deliver invoices, reports, and business notifications instantly without switching between tools.",
  },
  {
    icon: Printer,
    title: "POS to Printer",
    desc: "Print receipts, job slips, and labels directly from the same workflow used for sales and repairs.",
  },
];

const comparisonRows = [
  {
    manual: "Data mismatch between disconnected tools",
    cellivo: "Real-time sync across integrated systems",
  },
  {
    manual: "Duplicate work when updating stock and orders",
    cellivo: "Automated workflows that reduce repeated tasks",
  },
  {
    manual: "Missed notifications and delayed customer updates",
    cellivo: "Centralized automation for messages and alerts",
  },
  {
    manual: "No clear connection between sales channels",
    cellivo: "No manual work to keep tools aligned",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "IMEI Tracking", path: "/imei-tracking-pos-system" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Settings & Security", path: "/settings-security-integrations" },
];

const integrationFaqs = [
  {
    question: "Does Cellivo support WooCommerce?",
    answer:
      "Yes. Cellivo supports WooCommerce POS integration so you can sync products, stock, and order activity between your phone shop and online store.",
  },
  {
    question: "Can I send SMS automatically?",
    answer:
      "Yes. Automated SMS can be used for invoices, repair updates, payment reminders, and other customer notifications.",
  },
  {
    question: "Can I connect third-party tools?",
    answer:
      "Yes. Cellivo supports integrations with multiple business tools and workflows, helping you connect services used by your shop.",
  },
  {
    question: "Does it support API integrations?",
    answer:
      "Yes. Cellivo supports POS API integration for businesses that need custom workflows or third-party system connectivity.",
  },
  {
    question: "Do integrations sync in real-time?",
    answer:
      "Yes. Connected systems are designed to stay synchronized in real time so your data stays current across tools.",
  },
];

const integrationFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: integrationFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const Integrations = () => (
  <Layout>
    <SEOHead
      title="POS Integrations for Phone Shops | WooCommerce & SMS"
      description="Connect WooCommerce, SMS, email, printers, scanners, and API workflows with Cellivo so phone shop data stays synchronized in one POS system."
      canonical="https://cellivo.com/integrations"
      ogTitle="POS Integrations for Phone Shops | WooCommerce & SMS"
      ogDescription="Connect your POS with WooCommerce, SMS, email, printers, barcode scanners, and third-party systems in one connected workflow."
      ogUrl="https://cellivo.com/integrations"
      twitterTitle="POS Integrations for Phone Shops | WooCommerce & SMS"
      twitterDescription="POS integrations for phone shops with WooCommerce sync, SMS, email automation, printers, scanners, and API connectivity."
      structuredData={integrationFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Integrations", path: "/integrations" },
      ]}
    />

    <FeatureHero
      badge="Integrations"
      painHook={[
        "Still using disconnected tools for your phone shop?",
        "Manually updating stock between POS and online store?",
        "Missed notifications, duplicate work, and data errors slow your business down.",
      ]}
      title={
        <>
          POS Integrations for Phone Shops{" "}
          <span className="text-primary">– Connect WooCommerce, SMS, Email and More</span>
        </>
      }
      supportText="Connect your POS with WooCommerce, SMS gateways, email services, printers, and barcode scanners in one connected workflow."
      primaryCtaLabel="Start Connecting Your POS with All Your Tools"
      secondaryCtaLabel="Book an Integration Demo"
      trustItems={trustStats}
    />

    <WhyThisMattersSection
      label="Why Connected Tools Matter"
      title="Why Phone Shops Need Better POS Integrations"
      problemText="When online orders, customer notifications, printing, and POS workflows live in separate tools, your team wastes time fixing mismatches and repeating the same work."
      solutionText="Cellivo helps phone shops connect WooCommerce, SMS, email, printing, and third-party workflows so data stays synchronized in real time."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">System Flow</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            How Your Systems <span className="text-primary">Work Together</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Connect your POS to WooCommerce, SMS, email, and printing workflows so activity flows
            through one connected system instead of multiple disconnected tools.
          </p>
        </div>

        <div className="rounded-[30px] border border-border bg-slate-950 p-4 md:p-5 shadow-xl shadow-primary/10">
          <div
            role="img"
            aria-label="Integration flow showing POS connected to WooCommerce, SMS, email, and printer systems"
            className="rounded-[24px] bg-slate-900 p-5 md:p-6 text-slate-50"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Integration Flow
                </p>
                <h3 className="text-lg font-semibold text-white">
                  Connected POS Automation
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                Real-time sync
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Source</p>
                <div className="mt-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200">
                      <Workflow size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Cellivo POS</p>
                      <h3 className="text-xl font-semibold text-white">Sales, Stock, and Customer Events</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">
                    Every sale, stock update, and customer action triggers your connected integrations automatically.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {flowConnections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                          <Icon size={18} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Why It Works</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Built for Shops That Need <span className="text-primary">Connected Workflows</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {integrationBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Comparison</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Disconnected Tools <span className="text-primary">vs Cellivo Integrations</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            When your tools do not talk to each other, your team spends too much time correcting
            errors and chasing updates. Cellivo keeps workflows connected automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-destructive/20 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Manual</h3>
            <div className="space-y-3">
              {comparisonRows.map((row) => (
                <div
                  key={row.manual}
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
                >
                  {row.manual}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Cellivo</h3>
            <div className="space-y-3">
              {comparisonRows.map((row) => (
                <div
                  key={row.cellivo}
                  className="rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground"
                >
                  {row.cellivo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">SEO Focus</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          POS Integrations for <span className="text-primary">Phone Shops and Retail Businesses</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cellivo gives retailers stronger POS integrations with support for WooCommerce POS
          integration, SMS notification system workflows, retail automation software, and POS API
          integration needs. It helps phone shops connect their storefront, customer updates, and
          operational tools without disconnected processes.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo also supports international retail businesses looking for scalable POS
          integrations with eCommerce, communication tools, and third-party systems.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          These integrations add more value when they plug into the full{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and the faster billing flow of your{" "}
          <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
            POS system for phone shop
          </Link>
          .
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Connected System</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Connected with Your <span className="text-primary">POS, Inventory, and Customer System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every integration connects directly with your{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and the checkout workflows inside your{" "}
          <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
            POS system for phone shop
          </Link>
          , ensuring all systems stay synchronized in real time. It works seamlessly with{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management
          </Link>
          , and{" "}
          <Link to="/customer-loyalty-system" className="text-primary hover:underline">
            customer tools
          </Link>
          .
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Learn More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Learn How to Automate Your Phone Shop with{" "}
          <span className="text-primary">POS Integrations</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Learn how to automate your phone shop with POS integrations and connected systems.
        </p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 text-sm font-medium">
            Read Integration Guides
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">POS Integrations</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="space-y-4">
          {integrationFaqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <div className="faq-answer text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Explore More</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            More Tools to Run Your <span className="text-primary">Phone Shop Better</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="rounded-2xl border border-border bg-card px-5 py-4 text-foreground transition hover:border-primary/40 hover:bg-primary/5"
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

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center rounded-[32px] border border-primary/15 bg-primary/5 px-6 py-12 md:px-10 md:py-16">
        <span className="section-header-label">Final CTA</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5 leading-[1.1]">
          Get My <span className="text-primary">POS Integration System</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Connect WooCommerce, customer notifications, printing, and third-party workflows into one
          synchronized phone shop system.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Connecting Your POS with All Your Tools{" "}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <DemoBookingButton variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
            Talk to Sales
          </DemoBookingButton>
        </div>
      </div>
    </SectionWrapper>
  </Layout>
);

export default Integrations;
