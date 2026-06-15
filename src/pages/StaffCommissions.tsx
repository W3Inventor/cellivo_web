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
  BadgeDollarSign,
  Calculator,
  CreditCard,
  FileText,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops use Cellivo" },
  { value: "Automated", label: "commission tracking" },
  { value: "Real-Time", label: "payroll visibility" },
];

const payrollBenefits = [
  {
    icon: BadgeDollarSign,
    title: "Know Exactly How Much Each Staff Earns",
    desc: "See salaries, commissions, deductions, and net pay clearly so every staff member's earnings are easier to trust and explain.",
  },
  {
    icon: Calculator,
    title: "Automatically Calculate Commissions",
    desc: "Let the system calculate commission from sales and repairs instead of relying on manual formulas or end-of-month guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Avoid Payroll Mistakes and Conflicts",
    desc: "Reduce confusion around earnings and payout disputes with transparent calculations and cleaner payroll records.",
  },
  {
    icon: Wallet,
    title: "Track Advances and Deductions Clearly",
    desc: "Record salary advances, deductions, and adjustments so nothing gets forgotten when payroll is processed.",
  },
  {
    icon: FileText,
    title: "Generate Payslips Instantly",
    desc: "Create cleaner payslips with salary, commissions, deductions, and net pay already organized for each employee.",
  },
  {
    icon: TrendingUp,
    title: "Manage Staff Performance with Data",
    desc: "Use real earning and commission data to understand which salespeople and technicians are driving results.",
  },
];

const dashboardHighlights = [
  {
    title: "Staff Earnings",
    desc: "See salary, commission, and net earnings for each team member without manual calculations.",
    icon: Wallet,
  },
  {
    title: "Commission Breakdown",
    desc: "Understand how cashiers and technicians earned their commission across sales and repairs.",
    icon: BadgeDollarSign,
  },
  {
    title: "Payroll Summary",
    desc: "Review the full payroll cycle with cleaner totals before finalizing staff payments.",
    icon: Receipt,
  },
  {
    title: "Advances",
    desc: "Track salary advances and deductions so payroll records stay complete and easier to audit.",
    icon: CreditCard,
  },
];

const comparisonRows = [
  {
    manual: "Manual calculation errors every pay cycle",
    cellivo: "Automatic commission and payroll calculation",
  },
  {
    manual: "Confusion around staff commissions",
    cellivo: "Clear commission tracking for each employee",
  },
  {
    manual: "No proper salary, advance, or deduction tracking",
    cellivo: "Transparent payroll with earnings, advances, and deductions",
  },
  {
    manual: "Disputes with staff about how pay was calculated",
    cellivo: "Cleaner payroll records with less confusion",
  },
];

const relatedLinks = [
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Customers & Suppliers", path: "/customers-suppliers-management" },
];

const payrollFaqs = [
  {
    question: "How are commissions calculated?",
    answer:
      "Cellivo calculates commissions automatically based on the commission rules you set for staff, using sales, repairs, or other configured earning logic.",
  },
  {
    question: "Can I track technician earnings?",
    answer:
      "Yes. Technician commissions and repair-based earnings can be tracked clearly alongside cashier and sales staff earnings.",
  },
  {
    question: "Can I manage payroll?",
    answer:
      "Yes. Cellivo helps you manage salary, commission, advances, deductions, and final payroll totals in one system.",
  },
  {
    question: "Does it generate payslips?",
    answer:
      "Yes. Payslips can be generated with itemized salary, commission, deductions, advances, and final net pay.",
  },
  {
    question: "Can I track advances?",
    answer:
      "Yes. Salary advances and other deductions can be recorded and automatically reflected during payroll processing.",
  },
];

const payrollFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: payrollFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const payrollPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='356' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='206' width='200' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='72' y='248' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='324' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='428' y='160' width='736' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='466' y='206' width='228' height='20' rx='10' fill='%23d1fae5'/%3E%3Crect x='466' y='248' width='658' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='286' width='610' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='324' width='560' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='36' y='446' width='540' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='492' width='220' height='20' rx='10' fill='%23fde68a'/%3E%3Crect x='72' y='536' width='460' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='574' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='612' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='612' y='446' width='552' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='648' y='492' width='210' height='20' rx='10' fill='%23ddd6fe'/%3E%3Crect x='648' y='536' width='476' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='574' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='612' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3C/svg%3E";

const StaffCommissions = () => (
  <Layout>
    <SEOHead
      title="Staff Payroll & Commissions for Phone Shops | Cellivo"
      description="Track commissions, payroll, advances, deductions, payslips, and staff earnings in one payroll system built for phone shops and retail teams."
      canonical="https://cellivo.com/staff-commissions-payroll"
      ogTitle="Staff Payroll & Commissions for Phone Shops | Cellivo"
      ogDescription="Track staff commissions and payroll with automatic calculations, advances, and payslip generation for phone shops."
      ogUrl="https://cellivo.com/staff-commissions-payroll"
      twitterTitle="Staff Payroll & Commissions for Phone Shops | Cellivo"
      twitterDescription="Payroll management system for phone shops with staff commission tracking, salary control, and payslip generation."
      structuredData={payrollFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Staff Payroll & Commissions", path: "/staff-commissions-payroll" },
      ]}
    />

    <FeatureHero
      badge="Staff Commissions & Payroll"
      painHook={[
        "Managing staff salaries manually?",
        "Not sure how much commission each employee actually earned?",
        "Payroll mistakes and confusion can damage your team and your business.",
      ]}
      title={
        <>
          Track Staff Commissions and Payroll{" "}
          <span className="text-primary">Without Errors or Confusion</span>
        </>
      }
      supportText="Automatically calculate commissions, manage payroll, advances, deductions, and payslips for your phone shop team."
      primaryCtaLabel="Start Managing Staff Payroll and Commissions Smarter"
      secondaryCtaLabel="Book a Payroll Demo"
      trustItems={trustStats}
    />

    <WhyThisMattersSection
      label="Why Payroll Control Matters"
      title="Why Phone Shops Need Better Staff Payroll Management"
      problemText="When commissions and salaries are calculated manually, mistakes happen, disputes increase, and staff performance becomes harder to manage fairly."
      solutionText="Cellivo gives phone shops a payroll and commission system that tracks earnings clearly, automates calculations, and keeps staff payments more transparent."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Staff Commission &amp; Payroll Dashboard</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One View for Earnings, Commissions, and <span className="text-primary">Payroll Summary</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See staff earnings, commission breakdown, payroll summary, and advances in one place so
            you always know what each team member is owed.
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
              src={payrollPreviewImage}
              alt="Staff payroll dashboard showing staff earnings, commission breakdown, payroll summary, and advances"
              className="sr-only"
            />
            <div
              role="img"
              aria-label="Staff payroll dashboard showing staff earnings, commission breakdown, payroll summary, and advances"
              className="rounded-[24px] bg-slate-900 p-4 md:p-5 text-slate-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Payroll Dashboard
                  </p>
                  <h3 className="text-lg font-semibold text-white">Commission &amp; Salary Overview</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                  Current payroll cycle
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Staff Earnings", value: "LKR 428,500" },
                      { label: "Commission Total", value: "LKR 86,400" },
                    ].map((card) => (
                      <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Commission Breakdown</p>
                      <span className="text-xs text-emerald-300">Auto calculated</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { item: "Cashier Sales Commission", amount: "LKR 42,000" },
                        { item: "Technician Repair Commission", amount: "LKR 31,400" },
                        { item: "Bonus Adjustments", amount: "LKR 13,000" },
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
                      <p className="text-sm font-medium text-slate-300">Payroll Summary</p>
                      <span className="text-xs text-sky-300">Ready to process</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: "Base Salary", value: "LKR 342,100" },
                        { label: "Deductions", value: "LKR 18,700" },
                        { label: "Net Payroll", value: "LKR 409,800" },
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
                      <p className="text-sm font-medium text-slate-300">Advances</p>
                      <span className="text-xs text-amber-300">Deduct this cycle</span>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                      Track staff salary advances and apply them automatically during the next
                      payroll run without missing deductions.
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
            Built for Phone Shops That Need <span className="text-primary">Transparent Staff Pay</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {payrollBenefits.map((benefit) => {
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
            Manual Payroll <span className="text-primary">vs Cellivo</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Manual payroll creates too much room for commission disputes, salary mistakes, and
            staff confusion. Cellivo keeps the numbers cleaner from day one.
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
          Staff Commission and Payroll Management System for{" "}
          <span className="text-primary">Phone Shops</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cellivo gives phone shops a clearer payroll management system with stronger staff
          commission system controls, employee salary tracking, and a more connected POS payroll
          system. It helps you manage salary, commissions, advances, deductions, and payslips
          without relying on manual calculations.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo also supports international retail businesses looking for a scalable payroll and
          commission management system for multi-staff operations.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Staff earnings stay easier to manage when payroll remains connected to your{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and the sales activity inside your{" "}
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
          Connected with Your <span className="text-primary">POS, Sales, and Repair System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Commissions are automatically calculated from the sales activity inside your{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and the checkout workflow of your{" "}
          <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
            POS system for phone shop
          </Link>
          , ensuring every transaction directly updates staff earnings and payroll records. It
          works seamlessly with{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing
          </Link>
          ,{" "}
          <Link to="/mobile-repair-management-software" className="text-primary hover:underline">
            repair management
          </Link>
          , and your live sales data.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Learn More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Learn How to Manage Staff Commissions and Payroll{" "}
          <span className="text-primary">Without Confusion</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Learn how to manage staff commissions and payroll without confusion in your retail
          business.
        </p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 text-sm font-medium">
            Read Payroll Management Articles
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">Staff Payroll and Commissions</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="space-y-4">
          {payrollFaqs.map((faq) => (
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
          Get My <span className="text-primary">Staff Commission &amp; Payroll System</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Bring commissions, payroll, advances, and payslips into one system so staff pay becomes
          clearer for your whole business.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Managing Staff Payroll and Commissions Smarter{" "}
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

export default StaffCommissions;
