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
  Bell,
  FileText,
  Lock,
  Settings,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops use Cellivo" },
  { value: "Full Control", label: "with built-in security" },
  { value: "Role-Based", label: "access for teams" },
];

const controlBenefits = [
  {
    icon: Settings,
    title: "Control Every Part of Your POS System",
    desc: "Manage core business settings, workflows, and configuration rules from one place instead of chasing changes across different tools.",
  },
  {
    icon: Users,
    title: "Set User Permissions and Access Levels",
    desc: "Define exactly what cashiers, technicians, managers, and owners can see or change with role based access control.",
  },
  {
    icon: FileText,
    title: "Customize Invoices and Business Settings",
    desc: "Adjust invoice layouts, business details, payment preferences, and output settings so the system matches your store operations.",
  },
  {
    icon: Bell,
    title: "Manage Notifications and Automation",
    desc: "Configure alerts, invoice messages, and operational notifications so communication stays consistent without manual follow-up.",
  },
  {
    icon: ShieldCheck,
    title: "Keep Your System Secure and Organized",
    desc: "Reduce errors and security risks with cleaner controls, safer access rules, and one central admin panel for your phone shop.",
  },
  {
    icon: Workflow,
    title: "Configure Integrations from One Place",
    desc: "Control connected services, automation flows, and external tools from the same settings area used by your team every day.",
  },
];

const dashboardCards = [
  {
    icon: Users,
    title: "Roles & Permissions",
    desc: "Control who can access billing, inventory, reports, and admin actions.",
  },
  {
    icon: FileText,
    title: "Invoice Settings",
    desc: "Customize invoice details, branding, formats, and output rules.",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Manage automated alerts, customer updates, and store messages.",
  },
  {
    icon: Workflow,
    title: "Integrations",
    desc: "Connect and configure WooCommerce, communication tools, and external systems.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Configure Your Business Rules",
    desc: "Set store preferences, invoice options, payment settings, and operating defaults that match your workflow.",
  },
  {
    step: "2",
    title: "Assign Roles and Permissions",
    desc: "Define who can access sales, stock, finance, reports, and admin settings across your team.",
  },
  {
    step: "3",
    title: "Control Security and Integrations",
    desc: "Manage notifications, external connections, and system controls so the entire platform stays consistent and secure.",
  },
];

const comparisonRows = [
  {
    manual: "No permission control for staff",
    cellivo: "Centralized control with role-based access",
  },
  {
    manual: "Settings scattered across different tools",
    cellivo: "One secure admin panel for core configuration",
  },
  {
    manual: "Higher security risks and accidental changes",
    cellivo: "Secure system controls with clearer access limits",
  },
  {
    manual: "Inconsistent workflows between staff and branches",
    cellivo: "Consistent operations controlled from one place",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Integrations", path: "/integrations" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
  { label: "Staff Payroll", path: "/staff-commissions-payroll" },
];

const settingsFaqs = [
  {
    question: "Can I control user permissions?",
    answer:
      "Yes. Cellivo lets you assign role-based permissions so each staff member only sees the modules and actions relevant to their job.",
  },
  {
    question: "Is the system secure?",
    answer:
      "Yes. Cellivo is designed with controlled access, centralized settings, and permission rules that help keep your phone shop system secure and organized.",
  },
  {
    question: "Can I customize invoices?",
    answer:
      "Yes. You can configure invoice details, layouts, branding, and business output settings directly from the control panel.",
  },
  {
    question: "Can I configure integrations?",
    answer:
      "Yes. Integrations and connected workflows can be managed from the settings area so your tools stay aligned with the rest of the system.",
  },
  {
    question: "Can I restrict staff access?",
    answer:
      "Yes. You can restrict access to billing, inventory, reports, finance, and admin functions based on staff role and responsibility.",
  },
];

const settingsFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: settingsFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const settingsPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='90' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='158' width='320' height='606' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='72' y='208' width='210' height='22' rx='11' fill='%23dbeafe'/%3E%3Crect x='72' y='258' width='248' height='64' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='344' width='248' height='64' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='430' width='248' height='64' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='72' y='516' width='248' height='64' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='392' y='158' width='772' height='286' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='432' y='206' width='220' height='22' rx='11' fill='%23d1fae5'/%3E%3Crect x='432' y='256' width='688' height='22' rx='11' fill='%23e2e8f0'/%3E%3Crect x='432' y='300' width='632' height='22' rx='11' fill='%23e2e8f0'/%3E%3Crect x='432' y='344' width='578' height='22' rx='11' fill='%23e2e8f0'/%3E%3Crect x='392' y='478' width='366' height='286' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='432' y='528' width='200' height='22' rx='11' fill='%23fde68a'/%3E%3Crect x='432' y='578' width='286' height='22' rx='11' fill='%23e2e8f0'/%3E%3Crect x='432' y='620' width='250' height='22' rx='11' fill='%23e2e8f0'/%3E%3Crect x='798' y='478' width='366' height='286' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='838' y='528' width='184' height='22' rx='11' fill='%23ddd6fe'/%3E%3Crect x='838' y='578' width='286' height='22' rx='11' fill='%23e2e8f0'/%3E%3Crect x='838' y='620' width='236' height='22' rx='11' fill='%23e2e8f0'/%3E%3C/svg%3E";

const SettingsSecurity = () => (
  <Layout>
    <SEOHead
      title="POS Settings & Security for Phone Shops | Cellivo"
      description="Manage POS settings, user roles, security permissions, invoices, notifications, and integrations from one control panel built for phone shops."
      canonical="https://cellivo.com/settings-security-integrations"
      ogTitle="POS Settings & Security for Phone Shops | Cellivo"
      ogDescription="Control settings, security permissions, invoices, notifications, and integrations from one secure POS admin panel."
      ogUrl="https://cellivo.com/settings-security-integrations"
      twitterTitle="POS Settings & Security for Phone Shops | Cellivo"
      twitterDescription="Centralized POS admin panel for phone shops with role-based access control, security settings, invoices, notifications, and integrations."
      structuredData={settingsFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Settings & Security", path: "/settings-security-integrations" },
      ]}
    />

    <FeatureHero
      badge="Settings, Security & Control"
      painHook={[
        "Still struggling to control how your phone shop operates?",
        "Different settings, manual changes, and unclear permissions slow down your team.",
        "Lack of control leads to mistakes, security risks, and inconsistent workflows.",
      ]}
      title={
        <>
          POS Settings, Security and <span className="text-primary">System Control for Phone Shops</span>
        </>
      }
      supportText="Manage settings, user roles, security permissions, invoices, notifications, and integrations from one centralized control panel."
      primaryCtaLabel="Take Full Control of Your POS System"
      secondaryCtaLabel="Book a Control Demo"
      trustItems={trustStats}
    />

    <WhyThisMattersSection
      label="Why System Control Matters"
      title="Why Phone Shops Need Better POS Control"
      problemText="When settings live in different places and staff permissions are unclear, mistakes spread faster across billing, stock, finance, and customer workflows."
      solutionText="Cellivo gives phone shops one admin control layer for security, permissions, notifications, invoice settings, and integrations so the system stays secure and consistent."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Control Dashboard</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Centralized Settings &amp; <span className="text-primary">Control Dashboard</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Manage roles, permissions, invoice settings, notifications, and integrations from one
            place so your entire phone shop runs with cleaner control.
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
              {dashboardCards.map((item) => {
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
              src={settingsPreviewImage}
              alt="Settings control dashboard showing roles and permissions, invoice settings, notifications, and integrations"
              className="sr-only"
            />
            <div
              role="img"
              aria-label="Settings control dashboard showing roles and permissions, invoice settings, notifications, and integrations"
              className="rounded-[24px] bg-slate-900 p-4 md:p-5 text-slate-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Admin Control Panel
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    Settings, Security, and Workflow Control
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                  Centralized admin access
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  {[
                    "Roles & permissions",
                    "Invoice settings",
                    "Notifications",
                    "Integrations",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl px-4 py-3 text-sm ${
                        index === 0
                          ? "bg-emerald-400/15 text-emerald-100 border border-emerald-300/20"
                          : "bg-white/5 text-slate-300 border border-white/10"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Roles & Permissions</p>
                      <span className="text-xs text-emerald-300">Restricted by role</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { item: "Cashier access", value: "Billing only" },
                        { item: "Technician access", value: "Repairs + jobs" },
                        { item: "Manager access", value: "Reports + approvals" },
                      ].map((row) => (
                        <div
                          key={row.item}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm"
                        >
                          <span className="text-slate-200">{row.item}</span>
                          <span className="text-white">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-medium text-slate-300">Invoice Settings</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Configure branding, formats, and store details from one screen.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-medium text-slate-300">Notifications</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Control customer alerts and system automation without manual work.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Integrations</p>
                      <span className="text-xs text-sky-300">Connected securely</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">
                      Manage WooCommerce, communication tools, and external workflows from the same
                      admin layer used to control your store.
                    </p>
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
            Built for Teams That Need <span className="text-primary">Operational Control</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {controlBenefits.map((benefit) => {
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
          <span className="section-header-label">How It Works</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            How to Standardize Control Across <span className="text-primary">Your Phone Shop</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {howItWorks.map((item) => (
            <div key={item.step} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Comparison</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Uncontrolled Systems <span className="text-primary">vs Cellivo Control Panel</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            When settings and permissions are unmanaged, workflows drift and security problems show
            up fast. Cellivo keeps your operations governed from one control layer.
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

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">SEO Focus</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          POS Settings, Security and <span className="text-primary">Access Control System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cellivo gives retailers a stronger POS settings system with role based access control,
          POS security system controls, retail system configuration, and a centralized POS admin
          panel. It helps you manage permissions, invoices, notifications, and integrations
          without relying on scattered settings or manual changes.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo also supports international retail businesses looking for a secure POS system
          with role-based access control and centralized configuration.
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Stronger permissions matter most when they protect the full{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>{" "}
          and the live checkout flow inside your{" "}
          <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
            POS system for phone shop
          </Link>
          .
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Connected System</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Connected with Your <span className="text-primary">Entire POS System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          Settings and permissions directly control your{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
            mobile shop POS system
          </Link>
          , the counter flow inside your{" "}
          <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
            POS system for phone shop
          </Link>
          , and your{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS
          </Link>
          ,{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory
          </Link>
          , sales, finance, and{" "}
          <Link to="/integrations" className="text-primary hover:underline">
            integrations
          </Link>{" "}
          - ensuring your entire system runs securely and consistently.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">Learn More</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          Learn How to Secure and Control Your{" "}
          <span className="text-primary">POS System</span>
        </h2>
        <div className="premium-divider" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Learn how to secure and control your POS system with proper settings and role-based access.
        </p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-xl px-8 h-12 text-sm font-medium">
            Read Security & Control Guides
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">Settings and Security</span>
          </h2>
          <div className="premium-divider" />
        </div>

        <div className="space-y-4">
          {settingsFaqs.map((faq) => (
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
          Get My <span className="text-primary">Settings &amp; Security Control System</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          Bring permissions, settings, notifications, and integrations into one secure admin panel
          so your phone shop runs with clearer control.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              Take Full Control of Your POS System <ArrowRight className="ml-2" size={16} />
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

export default SettingsSecurity;
