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
  ArrowRight,
  BarChart3,
  Building2,
  CreditCard,
  GitBranch,
  Package,
  ShieldCheck,
  Store,
  TrendingUp,
  UserCog,
  Warehouse,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops using Cellivo" },
  { value: "Multi-Branch", label: "businesses scaling across locations" },
  { value: "Real-Time", label: "data across all locations" },
];

const multiBranchBenefits = [
  {
    icon: Building2,
    title: "See All Branch Performance in One View",
    desc: "Stop jumping between separate reports and see how every location is performing from one clean dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Compare Sales and Profit Across Locations",
    desc: "Understand which branch is growing, which one is underperforming, and where profit is actually coming from.",
  },
  {
    icon: UserCog,
    title: "Control Staff Access by Branch",
    desc: "Give branch managers and staff access only to the locations they handle while owners keep full visibility.",
  },
  {
    icon: GitBranch,
    title: "Transfer Stock Between Branches Easily",
    desc: "Move products between stores with a clear record so stock mismatches stop eating into your time and margin.",
  },
  {
    icon: Store,
    title: "Run Multiple Shops Without Losing Control",
    desc: "Keep operations organized across locations without separate systems, disconnected spreadsheets, or daily confusion.",
  },
  {
    icon: Warehouse,
    title: "Track Every Branch in Real-Time",
    desc: "See live sales, stock levels, staff activity, and branch updates the moment things change.",
  },
];

const dashboardHighlights = [
  {
    title: "Branch Selector",
    desc: "Switch between all shops or view one branch instantly from a single control panel.",
    icon: Building2,
  },
  {
    title: "Sales Comparison",
    desc: "Compare branch revenue, profit, and order trends without exporting reports manually.",
    icon: BarChart3,
  },
  {
    title: "Stock Levels per Branch",
    desc: "See what is available in each location before stock mismatches become missed sales.",
    icon: Package,
  },
  {
    title: "Staff Overview",
    desc: "Keep track of managers, cashiers, and branch-level access in one place.",
    icon: UserCog,
  },
];

const comparisonRows = [
  {
    manual: "No centralized control when managing multiple shops",
    cellivo: "One dashboard to manage every location",
  },
  {
    manual: "Confusing reports from separate systems or sheets",
    cellivo: "Clear reporting with branch-by-branch visibility",
  },
  {
    manual: "Stock mismatches between branches",
    cellivo: "Real-time sync and easier stock transfers",
  },
  {
    manual: "Staff confusion around access and responsibility",
    cellivo: "Controlled access and clearer branch ownership",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const multiBranchFaqs = [
  {
    question: "What is a multi-branch POS system?",
    answer:
      "A multi-branch POS system helps phone shops manage sales, inventory, staff, and reports across multiple store locations from one centralized dashboard.",
  },
  {
    question: "Can I manage multiple locations?",
    answer:
      "Yes. Cellivo lets you manage multiple phone shop locations from one login while keeping branch-level control and visibility.",
  },
  {
    question: "How does stock transfer work?",
    answer:
      "You can move stock between branches with clear transfer records so both sending and receiving locations stay accurate.",
  },
  {
    question: "Can I control staff access?",
    answer:
      "Yes. You can assign staff to specific branches and control what branch managers, cashiers, and admins can view or change.",
  },
  {
    question: "Can I view reports per branch?",
    answer:
      "Yes. Cellivo gives you branch-wise sales, profit, inventory, and staff insights so you can compare locations and make better decisions.",
  },
];

const multiBranchFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: multiBranchFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const multiBranchPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='356' height='240' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='206' width='170' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='72' y='246' width='284' height='54' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='320' width='284' height='42' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='428' y='160' width='736' height='240' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='466' y='206' width='222' height='20' rx='10' fill='%23d1fae5'/%3E%3Crect x='466' y='252' width='658' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='290' width='620' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='466' y='328' width='580' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='36' y='436' width='540' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='482' width='200' height='20' rx='10' fill='%23fde68a'/%3E%3Crect x='72' y='528' width='460' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='566' width='430' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='72' y='604' width='390' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='612' y='436' width='552' height='300' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='648' y='482' width='220' height='20' rx='10' fill='%23ddd6fe'/%3E%3Crect x='648' y='528' width='476' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='566' width='420' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='648' y='604' width='360' height='18' rx='9' fill='%23e2e8f0'/%3E%3C/svg%3E";

const MultiBranchPos = () => (
  <Layout>
    <SEOHead
      title="Multi-Branch POS System for Mobile Shops | Cellivo"
      description="Cellivo is a multi branch POS system for mobile shops. Manage inventory, sales, staff access, and reports across multiple locations from one dashboard."
      canonical="https://cellivo.com/multi-branch-pos-system"
      ogTitle="Multi-Branch POS System for Mobile Shops | Cellivo"
      ogDescription="Control inventory, sales, staff, and reports across multiple phone shop locations in real time from one dashboard."
      ogUrl="https://cellivo.com/multi-branch-pos-system"
      twitterTitle="Multi-Branch POS System for Mobile Shops | Cellivo"
      twitterDescription="Multi-branch phone shop POS software with real-time stock, staff, and reporting visibility."
      structuredData={multiBranchFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Multi-Branch POS System", path: "/multi-branch-pos-system" },
      ]}
    />

    <FeatureHero
      badge="Multi-Branch POS System"
      painHook={[
        "Running multiple phone shops is getting messy?",
        "Stock mismatches between branches?",
        "No clear view of which branch is actually making profit?",
      ]}
      title={
        <>
          Manage All Your Phone Shop Branches from One Dashboard{" "}
          <span className="text-primary">Without Chaos</span>
        </>
      }
      supportText="Control inventory, sales, staff, and reports across multiple locations in real time from one dashboard."
      primaryCtaLabel="Manage All Branches Smarter Now"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection />

    <WhyThisMattersSection
      label="Why Multi-Branch Control Matters"
      title="Why Growing Phone Shops Need One Central Dashboard"
      problemText="When multiple branches run without central control, reports get confusing, stock mismatches increase, and it becomes hard to know which location is actually performing well."
      solutionText="Cellivo gives mobile retailers one multi-branch POS system to compare branches, transfer stock, control staff access, and manage operations from one place."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Multi-Branch Control Dashboard</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One Place for Branch Sales, Stock, and <span className="text-primary">Staff Visibility</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See branch selector controls, sales comparison, stock levels per branch, and staff
            oversight from one dashboard so decisions are faster and branch problems are easier to
            spot.
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
              src={multiBranchPreviewImage}
              alt="Multi-branch POS dashboard showing branch selector, sales comparison, stock levels per branch, and staff overview"
              className="sr-only"
            />
            <div
              role="img"
              aria-label="Multi-branch POS dashboard showing branch selector, sales comparison, stock levels per branch, and staff overview"
              className="rounded-[24px] bg-slate-900 p-4 md:p-5 text-slate-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Multi-Branch Control Dashboard
                  </p>
                  <h3 className="text-lg font-semibold text-white">Branch Operations Overview</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                  All Branches
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-slate-300">Branch Selector</p>
                    <div className="mt-3 space-y-2">
                      {["Colombo Main Branch", "Kandy Branch", "Galle Branch"].map((branch, index) => (
                        <div
                          key={branch}
                          className={`rounded-xl px-3 py-3 text-sm ${
                            index === 0
                              ? "bg-primary text-primary-foreground"
                              : "border border-white/10 bg-white/5 text-slate-200"
                          }`}
                        >
                          {branch}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Stock Levels per Branch</p>
                      <span className="text-xs text-emerald-300">Live sync</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { item: "iPhone 14 Pro", stock: "12 in Colombo", width: "w-10/12" },
                        { item: "Samsung A55", stock: "5 in Kandy", width: "w-6/12" },
                        { item: "Fast Chargers", stock: "Low in Galle", width: "w-4/12" },
                      ].map((row) => (
                        <div key={row.item}>
                          <div className="flex items-center justify-between text-sm text-slate-200">
                            <span>{row.item}</span>
                            <span>{row.stock}</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10">
                            <div className={`h-2 rounded-full bg-primary ${row.width}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-slate-300">Sales Comparison</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        { label: "Colombo", value: "LKR 2.4M", note: "18% margin" },
                        { label: "Kandy", value: "LKR 1.6M", note: "15% margin" },
                        { label: "Galle", value: "LKR 980K", note: "13% margin" },
                      ].map((card) => (
                        <div key={card.label} className="rounded-2xl bg-white/6 p-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                            {card.label}
                          </p>
                          <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
                          <p className="text-xs text-slate-300">{card.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Staff Overview</p>
                      <span className="text-xs text-sky-300">Role based</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { role: "Branch Managers", count: "3 active" },
                        { role: "Cashiers", count: "9 active" },
                        { role: "Admins", count: "2 active" },
                      ].map((row) => (
                        <div
                          key={row.role}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm"
                        >
                          <span className="text-slate-200">{row.role}</span>
                          <span className="text-white">{row.count}</span>
                        </div>
                      ))}
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
            Built for Multi-Branch Phone Shops That Need <span className="text-primary">Clarity</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {multiBranchBenefits.map((benefit) => {
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
            Managing Multiple Shops Manually <span className="text-primary">vs With Cellivo</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            When each branch runs in its own silo, visibility disappears fast. Cellivo keeps every
            location connected without the mess.
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
          Multi-Branch POS System for <span className="text-primary">Growing Mobile Shops</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cellivo is a multi branch POS system built for mobile retailers that need one place to
          manage more than one store. If you are looking for a POS system for multiple stores or a
          mobile shop POS businesses can use for cleaner stock control and branch
          reporting, this platform brings everything together. It works seamlessly with our{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing system
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management system
          </Link>
          , and{" "}
          <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">
            IMEI tracking tools
          </Link>
          .
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo also supports international mobile retailers managing multiple store locations
          who need a scalable multi-branch POS system with real-time control.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Connected System</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Connected with Your <span className="text-primary">POS, Inventory, and IMEI System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every sale, stock update, and transfer automatically syncs across all branches. Your{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management
          </Link>
          , and{" "}
          <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">
            IMEI tracking
          </Link>{" "}
          stay perfectly aligned without manual work.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Learn More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Learn How to Manage Multiple Phone Shop Branches <span className="text-primary">Without Confusion</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Learn how to manage multiple phone shop branches efficiently, avoid stock mismatches, and
          improve branch reporting with the right system.
        </p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 text-sm font-medium">
            Read Multi-Branch POS Articles
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">Multi-Branch POS Software</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="space-y-4">
          {multiBranchFaqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
              <div className="faq-answer text-muted-foreground leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
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

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center rounded-[32px] border border-primary/15 bg-primary/5 px-6 py-12 md:px-10 md:py-16">
        <span className="section-header-label">Final CTA</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5 leading-[1.1]">
          Get My <span className="text-primary">Multi-Branch POS System</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Bring every location into one system so you can compare branch performance, control
          stock, and manage staff without the daily chaos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Manage All Branches Smarter Now <ArrowRight className="ml-2" size={16} />
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

export default MultiBranchPos;
