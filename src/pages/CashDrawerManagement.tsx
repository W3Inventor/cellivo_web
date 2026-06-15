import FeatureHero from "@/components/FeatureHero";
import FeatureHubLinkSection from "@/components/FeatureHubLinkSection";
import Layout from "@/components/Layout";
import DemoBookingButton from "@/components/DemoBookingButton";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops trust Cellivo" },
  { value: "Real-Time", label: "track every cash transaction" },
  { value: "Shift Control", label: "full cashier accountability" },
];

const cashBenefits = [
  {
    icon: Wallet,
    title: "Know Your Exact Cash Balance Anytime",
    desc: "See the expected drawer total at any moment so you do not wait until closing time to discover cash problems.",
  },
  {
    icon: Clock,
    title: "Track Cash Per Shift and Per Cashier",
    desc: "Know who opened the drawer, who handled each shift, and how much cash each cashier was responsible for.",
  },
  {
    icon: AlertTriangle,
    title: "Detect Missing Cash Instantly",
    desc: "Spot cash mismatches faster with clearer variance tracking instead of finding out too late after numbers stop matching.",
  },
  {
    icon: FileText,
    title: "Record Every Expense from the Drawer",
    desc: "Log petty cash, withdrawals, and shop expenses with a proper record so cash outflows never disappear into handwritten notes.",
  },
  {
    icon: Calculator,
    title: "Eliminate Manual Cash Tracking",
    desc: "Stop relying on paper notes and mental math for cash control when the system can track movement automatically.",
  },
  {
    icon: BarChart3,
    title: "Get Clear Cash Flow Reports",
    desc: "Review shift totals, cash movement, expenses, and closing results in reports that are easier to understand and act on.",
  },
];

const dashboardHighlights = [
  {
    title: "Opening Balance",
    desc: "Start every cashier session with a recorded amount so the drawer begins with a clear baseline.",
    icon: Wallet,
  },
  {
    title: "Cash In / Out",
    desc: "Track sales, petty cash, drawer removals, and manual cash adjustments with a full record.",
    icon: Receipt,
  },
  {
    title: "Current Balance",
    desc: "See the expected balance live as cash moves throughout the day.",
    icon: TrendingUp,
  },
  {
    title: "Shift Closing & Variance",
    desc: "Close the shift, count the drawer, and see exactly whether the expected amount matches reality.",
    icon: CheckCircle2,
  },
];

const comparisonRows = [
  {
    manual: "Cash mismatches discovered only at day end",
    cellivo: "Real-time tracking of every cash movement",
  },
  {
    manual: "No clear tracking of drawer activity",
    cellivo: "Auto reconciliation with shift-level records",
  },
  {
    manual: "Manual notes and scattered cash records",
    cellivo: "Clear reports for balances, expenses, and shifts",
  },
  {
    manual: "No accountability for cashier handling",
    cellivo: "Staff accountability with shift and cashier control",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const cashFaqs = [
  {
    question: "What is cash drawer management?",
    answer:
      "Cash drawer management is the process of tracking opening balances, cash in, cash out, expenses, shift totals, and closing variances so shop owners always know what happened in the drawer.",
  },
  {
    question: "How does shift tracking work?",
    answer:
      "Each cashier shift starts with an opening balance and ends with a closing count. Cellivo records every cash movement during that shift and compares the expected balance with the actual drawer count.",
  },
  {
    question: "Can I track multiple cashiers?",
    answer:
      "Yes. Cellivo helps you track cash handled by different cashiers and shifts so each drawer session has a clear record of responsibility.",
  },
  {
    question: "What happens if cash doesn't match?",
    answer:
      "If the counted cash does not match the expected drawer total, Cellivo shows the variance clearly so you can review transactions, expenses, and staff activity faster.",
  },
  {
    question: "Can I track expenses?",
    answer:
      "Yes. You can log petty cash expenses and other cash outflows directly from the drawer so every amount is documented in your cash tracking history.",
  },
];

const cashFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cashFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const cashDrawerPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='356' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='206' width='200' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='72' y='248' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='324' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='428' y='160' width='736' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='466' y='206' width='210' height='20' rx='10' fill='%23d1fae5'/%3E%3Crect x='466' y='250' width='658' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='288' width='610' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='326' width='560' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='36' y='446' width='540' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='492' width='220' height='20' rx='10' fill='%23fde68a'/%3E%3Crect x='72' y='536' width='460' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='574' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='612' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='612' y='446' width='552' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='648' y='492' width='210' height='20' rx='10' fill='%23fecaca'/%3E%3Crect x='648' y='536' width='476' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='574' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='612' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3C/svg%3E";

const CashDrawerManagement = () => (
  <Layout>
    <SEOHead
      title="Cash Drawer Management System for Phone Shops | Cellivo"
      description="Cash drawer management system for phone shops with opening balances, shift closings, expense logging, cashier accountability, and POS cash control."
      canonical="https://cellivo.com/cash-drawer-management"
      ogTitle="Cash Drawer Management System for Phone Shops | Cellivo"
      ogDescription="Track every cash movement in your phone shop with shift tracking, expense logging, and real-time cash reconciliation."
      ogUrl="https://cellivo.com/cash-drawer-management"
      twitterTitle="Cash Drawer Management System for Phone Shops | Cellivo"
      twitterDescription="Cash tracking system for phone shops with shift control, expense logging, and cash reconciliation."
      structuredData={cashFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Cash Drawer Management", path: "/cash-drawer-management" },
      ]}
    />

    <FeatureHero
      badge="Cash Drawer Management"
      painHook={[
        "Losing track of cash in your shop?",
        "Cash missing at the end of the day?",
        "No clear record of what cashiers actually handled?",
      ]}
      title={
        <>
          Track Every Cash Movement in Your Phone Shop{" "}
          <span className="text-primary">Without Guesswork</span>
        </>
      }
      supportText="Track opening balances, cash in and out, expenses, and shift closings with real-time drawer control."
      primaryCtaLabel="Start Tracking Your Cash Accurately Today"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection />

    <WhyThisMattersSection
      label="Why Cash Control Matters"
      title="Why Phone Shops Need Better Cash Drawer Management"
      problemText="When cash is tracked manually, missing amounts, shift confusion, and undocumented expenses create daily stress and make cashier accountability harder."
      solutionText="Cellivo gives phone shops a cash drawer management system with clearer shift control, expense logging, reconciliation, and better visibility into every drawer movement."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Cash Drawer Dashboard &amp; Shift Overview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One Place for Cash Balances, Shift Closing, and <span className="text-primary">Variance Checks</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See opening balance, cash in and out, current balance, shift closing, and variance in a
            single view so every cashier session is easier to control.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="space-y-4">
              {dashboardHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/80 bg-background px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[30px] border border-border bg-slate-950 p-4 shadow-xl shadow-primary/10"
          >
            <img
              src={cashDrawerPreviewImage}
              alt="Cash drawer management dashboard showing opening balance, cash in and out, current balance, shift closing, and cash variance"
              className="sr-only"
            />
            <div
              role="img"
              aria-label="Cash drawer management dashboard showing opening balance, cash in and out, current balance, shift closing, and cash variance"
              className="rounded-[24px] bg-slate-900 p-4 md:p-5 text-slate-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Cash Drawer Dashboard
                  </p>
                  <h3 className="text-lg font-semibold text-white">Current Shift Overview</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                  Cashier Shift A
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Opening Balance", value: "LKR 25,000" },
                      { label: "Current Balance", value: "LKR 84,500" },
                    ].map((card) => (
                      <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Cash In / Out</p>
                      <span className="text-xs text-emerald-300">Live updates</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { item: "Cash Sales", amount: "+ LKR 72,800" },
                        { item: "Petty Cash Expense", amount: "- LKR 1,200" },
                        { item: "Drawer Removal", amount: "- LKR 12,100" },
                      ].map((row) => (
                        <div
                          key={row.item}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm"
                        >
                          <span className="text-slate-200">{row.item}</span>
                          <span className="text-white">{row.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Shift Closing</p>
                      <span className="text-xs text-sky-300">Ready to reconcile</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: "Expected Closing", value: "LKR 84,500" },
                        { label: "Counted Cash", value: "LKR 84,000" },
                        { label: "Variance", value: "- LKR 500" },
                      ].map((card) => (
                        <div key={card.label} className="rounded-xl bg-white/6 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                            {card.label}
                          </p>
                          <p className="mt-1 text-lg font-semibold text-white">{card.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Variance Status</p>
                      <span className="text-xs text-amber-300">Needs review</span>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                      The system highlights differences between expected and counted cash so you can
                      review shift activity before closing the drawer.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Why It Works</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Built for Phone Shops That Need <span className="text-primary">Cleaner Cash Control</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cashBenefits.map((benefit) => {
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
            Managing Cash Manually <span className="text-primary">vs With Cellivo</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Manual cash tracking creates more room for errors, missing cash, and unclear staff
            responsibility. Cellivo makes every movement easier to follow.
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
          Cash Drawer Management System for <span className="text-primary">Phone Shops</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cellivo gives phone shops a clearer cash drawer management workflow with stronger POS cash
          control and a more reliable cash tracking system. If you need retail cash management that
          helps you record cash in, cash out, expenses, and shift reconciliation without manual
          notes, this page is built for that exact job.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo also supports international retail stores looking for a scalable cash drawer
          management system with real-time tracking and multi-cashier control.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Designed as a scalable retail POS cash management system, Cellivo helps growing
          businesses handle multiple cashiers, branches, and high-volume transactions without
          losing control.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Connected System</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Connected with Your <span className="text-primary">POS, Inventory, and Finance Tracking</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Works seamlessly with{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management
          </Link>
          , and{" "}
          <Link to="/banking-credit-cheques" className="text-primary hover:underline">
            finance tracking
          </Link>{" "}
          to keep your entire business in sync.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Learn More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Learn How to Manage Cash Flow in Your Phone Shop <span className="text-primary">Without Mismatches</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Learn how to manage cash flow in your phone shop and avoid daily cash mismatches with the
          right cash drawer system.
        </p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 text-sm font-medium">
            Read Cash Flow Articles
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">Cash Drawer Management</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="space-y-4">
          {cashFaqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
              <div className="faq-answer text-muted-foreground leading-relaxed">{faq.answer}</div>
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
          Get My <span className="text-primary">Cash Drawer Management System</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Bring every drawer movement, cashier shift, and closing balance into one system so cash
          control stops depending on guesswork.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Tracking Your Cash Accurately Today <ArrowRight className="ml-2" size={16} />
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

export default CashDrawerManagement;
