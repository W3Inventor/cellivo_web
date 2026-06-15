import FeatureHero from "@/components/FeatureHero";
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
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Landmark,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops use Cellivo" },
  { value: "Real-Time", label: "track credit and cash flow" },
  { value: "Global", label: "built for Sri Lankan and global mobile retailers" },
];

const financeBenefits = [
  {
    icon: Wallet,
    title: "Know Who Owes You Money Instantly",
    desc: "See outstanding balances faster so customer credit and supplier dues never get buried in scattered notes or memory.",
  },
  {
    icon: CreditCard,
    title: "Track Customer and Supplier Credit Clearly",
    desc: "Keep every credit transaction, payment, and remaining balance in one place for easier follow-up and cleaner records.",
  },
  {
    icon: CalendarDays,
    title: "Never Miss a Cheque Payment or Deposit",
    desc: "Stay ahead of cheque dates with a clearer schedule so you do not lose time or cash flow because a deposit was missed.",
  },
  {
    icon: Landmark,
    title: "See Real-Time Bank Balances",
    desc: "Keep a cleaner view of account activity, deposits, withdrawals, and available balance without piecing data together manually.",
  },
  {
    icon: AlertTriangle,
    title: "Eliminate Financial Guesswork",
    desc: "Replace confusing ledgers and disconnected spreadsheets with one system that makes balances easier to trust.",
  },
  {
    icon: BarChart3,
    title: "Manage Cash Flow with Full Visibility",
    desc: "Review credit, payments, bank movements, and cheque activity together so decisions happen with better financial context.",
  },
];

const dashboardHighlights = [
  {
    title: "Credit Balances",
    desc: "See outstanding customer and supplier balances without digging through separate records.",
    icon: CreditCard,
  },
  {
    title: "Bank Accounts",
    desc: "Track account balances, deposits, and withdrawals in one financial view.",
    icon: Landmark,
  },
  {
    title: "Cheque Calendar",
    desc: "Keep future cheque deposits and due dates organized so nothing gets missed.",
    icon: CalendarDays,
  },
  {
    title: "Ledger Summary",
    desc: "Review payment history and account movement with a cleaner summary of what changed.",
    icon: BookOpen,
  },
];

const comparisonRows = [
  {
    manual: "No clear credit tracking across customers and suppliers",
    cellivo: "Real-time credit tracking with up-to-date balances",
  },
  {
    manual: "Missed cheque dates and forgotten deposits",
    cellivo: "Cheque reminders and a clearer due-date workflow",
  },
  {
    manual: "Confusing records across notes, sheets, and statements",
    cellivo: "Clean ledgers and easier bank-account visibility",
  },
  {
    manual: "No real visibility into financial position",
    cellivo: "Full financial control from one connected system",
  },
];

const relatedLinks = [
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Staff Commissions", path: "/staff-commissions-payroll" },
];

const financeFaqs = [
  {
    question: "What is credit management?",
    answer:
      "Credit management is the process of tracking customer and supplier balances, payment history, due amounts, and outstanding credit so your shop always knows what is owed and what has been paid.",
  },
  {
    question: "How does cheque tracking work?",
    answer:
      "Cellivo records received and issued cheques with dates, status, and related transactions so you can follow upcoming deposits, payments, and cleared or pending cheques more easily.",
  },
  {
    question: "Can I track customer balances?",
    answer:
      "Yes. You can monitor customer credit balances, payment history, due amounts, and ledger entries from one place.",
  },
  {
    question: "Does it support bank reconciliation?",
    answer:
      "Yes. Cellivo helps you compare transaction records with bank activity so deposits, withdrawals, and payment flows are easier to reconcile.",
  },
  {
    question: "Can I manage suppliers?",
    answer:
      "Yes. Supplier balances, ledger activity, cheque records, and payment history can all be managed inside the same financial workflow.",
  },
];

const financeFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: financeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const financePreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='356' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='206' width='188' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='72' y='248' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='324' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='428' y='160' width='736' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='466' y='206' width='220' height='20' rx='10' fill='%23d1fae5'/%3E%3Crect x='466' y='248' width='658' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='286' width='610' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='324' width='560' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='36' y='446' width='540' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='492' width='220' height='20' rx='10' fill='%23fde68a'/%3E%3Crect x='72' y='536' width='460' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='574' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='612' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='612' y='446' width='552' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='648' y='492' width='210' height='20' rx='10' fill='%23ddd6fe'/%3E%3Crect x='648' y='536' width='476' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='574' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='612' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3C/svg%3E";

const BankingCredit = () => (
  <Layout>
    <SEOHead
      title="Banking, Credit & Cheques for Phone Shops | Cellivo"
      description="Manage customer credit, supplier balances, bank accounts, cheque schedules, and retail finance activity with one phone shop financial system."
      canonical="https://cellivo.com/banking-credit-cheques"
      ogTitle="Banking, Credit & Cheques for Phone Shops | Cellivo"
      ogDescription="Track credit, bank transactions, and cheques with real-time visibility for phone shop finance management."
      ogUrl="https://cellivo.com/banking-credit-cheques"
      twitterTitle="Banking, Credit & Cheques for Phone Shops | Cellivo"
      twitterDescription="Retail finance management for phone shops with credit tracking, cheque handling, and bank visibility."
      structuredData={financeFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Banking, Credit & Cheques", path: "/banking-credit-cheques" },
      ]}
    />

    <FeatureHero
      badge="Banking, Credit & Cheque Management"
      painHook={[
        "Still struggling to track credit, bank balances, and cheques?",
        "Not sure who owes you money or which cheque is due next?",
        "Financial confusion is silently damaging your business.",
      ]}
      title={
        <>
          Track Credit, Bank Transactions, and Cheques{" "}
          <span className="text-primary">Without Financial Confusion</span>
        </>
      }
      supportText="Manage customer credit, supplier balances, bank accounts, and cheque schedules in one financial control system."
      primaryCtaLabel="Start Managing Your Finances Smarter"
      trustItems={trustStats}
    />

    <WhyThisMattersSection
      label="Why Financial Control Matters"
      title="Why Phone Shops Need Better Banking and Credit Visibility"
      problemText="When customer balances, supplier payments, bank records, and cheque dates are tracked separately, financial confusion grows and cash flow becomes harder to control."
      solutionText="Cellivo gives phone shops one banking, credit, and cheque management system with ledgers, cheque tracking, and stronger retail finance visibility."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Financial Dashboard Overview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One View for Credit, Bank Accounts, and <span className="text-primary">Cheque Activity</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See credit balances, bank accounts, cheque calendar, and ledger summary in one place so
            financial decisions happen with better visibility.
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
              src={financePreviewImage}
              alt="Financial dashboard showing credit balances, bank accounts, cheque calendar, and ledger summary"
              className="sr-only"
            />
            <div
              role="img"
              aria-label="Financial dashboard showing credit balances, bank accounts, cheque calendar, and ledger summary"
              className="rounded-[24px] bg-slate-900 p-4 md:p-5 text-slate-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Financial Dashboard
                  </p>
                  <h3 className="text-lg font-semibold text-white">Credit &amp; Banking Overview</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                  Live financial summary
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Customer Credit", value: "LKR 248,000" },
                      { label: "Supplier Balance", value: "LKR 412,500" },
                    ].map((card) => (
                      <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Bank Accounts</p>
                      <span className="text-xs text-emerald-300">Real-time visibility</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { item: "Commercial Bank", amount: "LKR 1.42M" },
                        { item: "HNB Current", amount: "LKR 864K" },
                        { item: "Cash Deposits Pending", amount: "LKR 96K" },
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
                      <p className="text-sm font-medium text-slate-300">Cheque Calendar</p>
                      <span className="text-xs text-sky-300">Upcoming dates</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: "18 Apr", value: "Customer cheque deposit" },
                        { label: "21 Apr", value: "Supplier cheque payment" },
                        { label: "24 Apr", value: "Pending cheque clearance" },
                      ].map((card) => (
                        <div key={card.label} className="rounded-xl bg-white/6 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                            {card.label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-white">{card.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Ledger Summary</p>
                      <span className="text-xs text-amber-300">Updated today</span>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                      Review recent payments, due balances, and account movement from one summary
                      instead of checking disconnected records.
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
            Built for Phone Shops That Need <span className="text-primary">Financial Clarity</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {financeBenefits.map((benefit) => {
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
            Managing Finance Manually <span className="text-primary">vs With Cellivo</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Manual finance tracking creates blind spots around credit, cheques, and cash flow.
            Cellivo makes those moving parts easier to control from one place.
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
          Banking, Credit and Cheque Management System for <span className="text-primary">Phone Shops</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cellivo gives phone shops a clearer credit management system with cheque tracking system
          support, stronger retail finance management, and a more connected POS financial system.
          It helps you track bank accounts, credit balances, due payments, and cheque movement
          without depending on scattered records.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo also supports international retail businesses looking for a scalable financial
          management system with credit tracking, bank reconciliation, and cheque handling.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          It works best when finance stays connected to your{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and the day-to-day counter flow in your{" "}
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
          Connected with Your <span className="text-primary">POS, Inventory, and Cash Flow System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every sale inside your{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and each payment tied to your{" "}
          <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
            POS system for phone shop
          </Link>{" "}
          checkout flow updates your credit balances, bank accounts, and financial records
          automatically. It works seamlessly with{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management
          </Link>
          , and{" "}
          <Link to="/cash-drawer-management" className="text-primary hover:underline">
            cash flow tracking
          </Link>
          .
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Learn More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Learn How to Manage Credit, Cheques, and Financial Records{" "}
          <span className="text-primary">Without Confusion</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Learn how to manage credit, cheques, and financial records in your phone shop without
          confusion.
        </p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 text-sm font-medium">
            Read Finance Management Articles
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">Credit and Banking Management</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="space-y-4">
          {financeFaqs.map((faq) => (
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
          Get My <span className="text-primary">Credit &amp; Banking Management System</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Bring credit tracking, bank visibility, and cheque handling into one system so your shop
          can make financial decisions with less confusion.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Managing Your Finances Smarter <ArrowRight className="ml-2" size={16} />
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

export default BankingCredit;
