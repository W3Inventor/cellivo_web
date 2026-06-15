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
  Bell,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  GitBranch,
  Package,
  ShieldCheck,
  Smartphone,
  UserCog,
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops using Cellivo" },
  { value: "Thousands+", label: "repairs tracked successfully" },
  { value: "Sri Lanka", label: "built for local mobile businesses" },
];

const repairBenefits = [
  {
    icon: Smartphone,
    title: "Never Lose Track of Devices Again",
    desc: "Capture customer details, device condition, issues, and promised dates in one repair ticket from the moment a phone reaches your desk.",
  },
  {
    icon: UserCog,
    title: "Know Which Technician Is Handling Each Repair",
    desc: "Assign every job clearly so your team knows who owns the work and you can spot bottlenecks before customers start calling.",
  },
  {
    icon: Bell,
    title: "Update Customers Automatically Without Calling",
    desc: "Send status updates when repairs move forward so customers stay informed without your staff repeating the same phone calls all day.",
  },
  {
    icon: GitBranch,
    title: "See Repair Status in Seconds",
    desc: "Move jobs from intake to diagnosis, in progress, ready, and collected with a workflow that is easy to understand at a glance.",
  },
  {
    icon: Package,
    title: "Track Parts Used on Every Repair",
    desc: "Link spare parts to each job, keep costs visible, and stop losing margin because parts were used without being recorded.",
  },
  {
    icon: ClipboardList,
    title: "Turn Finished Repairs into Invoices Fast",
    desc: "Convert completed jobs into clean invoices with labor, parts, and totals already organized for your front desk team.",
  },
];

const workflowSteps = [
  {
    step: "1",
    title: "Repair Intake",
    desc: "Log the phone, issue, customer notes, and expected completion date in one ticket.",
    icon: ClipboardList,
  },
  {
    step: "2",
    title: "Technician Assignment",
    desc: "Assign the right technician and keep responsibility clear from the start.",
    icon: UserCog,
  },
  {
    step: "3",
    title: "Status Update",
    desc: "Move the job through diagnosis, repair, and ready-for-pickup stages.",
    icon: GitBranch,
  },
  {
    step: "4",
    title: "Completion",
    desc: "Notify the customer, confirm payment, and close the repair with full history saved.",
    icon: CheckCircle2,
  },
];

const comparisonRows = [
  {
    manual: "Lost repair tickets and device confusion",
    cellivo: "Track every repair with clear customer and device records",
  },
  {
    manual: "No proper status tracking for ongoing jobs",
    cellivo: "Clear workflow from intake to pickup in one dashboard",
  },
  {
    manual: "Customer complaints because updates are delayed",
    cellivo: "Automatic customer updates when repair status changes",
  },
  {
    manual: "No visibility into technician workload or parts used",
    cellivo: "Know who is handling each repair and what parts were used",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const repairFaqs = [
  {
    question: "What is a repair management system?",
    answer:
      "A repair management system is software that helps phone shops log repair jobs, track device issues, assign technicians, manage parts, and monitor status until pickup.",
  },
  {
    question: "Can I track mobile phone repairs?",
    answer:
      "Yes. Cellivo lets you record each mobile phone repair with customer details, device information, issues, promised dates, and progress updates in one dashboard.",
  },
  {
    question: "Does it support technician assignment?",
    answer:
      "Yes. You can assign each repair to a technician, monitor workload, and see who is responsible for every open job.",
  },
  {
    question: "Can customers get updates automatically?",
    answer:
      "Yes. Cellivo can send automatic repair status updates so customers know when their device is received, in progress, ready, or completed.",
  },
  {
    question: "Does it work with billing and inventory?",
    answer:
      "Yes. Cellivo connects repair tracking with billing, parts usage, inventory control, and IMEI-linked device records so your front desk and repair desk stay in sync.",
  },
];

const repairFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: repairFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const repairWorkflowPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='530' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='70' y='204' width='220' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='70' y='242' width='462' height='56' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='70' y='316' width='462' height='56' rx='16' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='612' y='160' width='552' height='174' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='646' y='204' width='240' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='646' y='244' width='484' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='646' y='280' width='400' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='612' y='370' width='552' height='216' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='646' y='414' width='300' height='20' rx='10' fill='%23d1fae5'/%3E%3Crect x='646' y='454' width='484' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='646' y='490' width='440' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='36' y='450' width='530' height='136' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='70' y='494' width='220' height='20' rx='10' fill='%23fde68a'/%3E%3Crect x='70' y='534' width='462' height='18' rx='9' fill='%23e2e8f0'/%3E%3C/svg%3E";

const RepairManagement = () => (
  <Layout>
    <SEOHead
      title="Repair Management System for Phone Shops | Cellivo"
      description="Mobile repair management software for phone shops with intake, technician assignment, parts tracking, status updates, and repair delivery control."
      canonical="https://cellivo.com/mobile-repair-management-software"
      ogTitle="Repair Management System for Phone Shops | Cellivo"
      ogDescription="Track every repair from intake to delivery with technician assignment, parts tracking, and customer updates in one system."
      ogUrl="https://cellivo.com/mobile-repair-management-software"
      twitterTitle="Repair Management System for Phone Shops | Cellivo"
      twitterDescription="Repair tracking software for mobile shops with technician assignment, parts tracking, and automatic customer updates."
      structuredData={repairFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Repair Management Software", path: "/mobile-repair-management-software" },
      ]}
    />

    <FeatureHero
      badge="Repair Management System"
      painHook={[
        "Still managing repairs on paper or WhatsApp?",
        "Losing track of devices, parts, or customer updates?",
        "There's a smarter way to run your repair desk.",
      ]}
      title={
        <>
          Stop Losing Repair Jobs and Customer Trust in Your <span className="text-primary">Phone Shop</span>
        </>
      }
      supportText="Track every repair from intake to delivery with technician assignment, parts tracking, and automatic customer updates."
      primaryCtaLabel="Start Managing Repairs Smarter"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection
      description="This feature is part of our POS system for phone shops designed to improve billing speed and sales efficiency."
      buttonLabel="View POS System"
      linkTo="/pos-system-for-phone-shop"
    />

    <WhyThisMattersSection
      label="Why Repair Control Matters"
      title="Why Phone Shops Need Better Repair Tracking"
      problemText="When repairs are tracked on paper, WhatsApp, or memory, devices get delayed, updates get missed, and customers lose confidence in your service desk."
      solutionText="Cellivo gives phone shops one repair workflow for intake, job tracking, technician assignment, parts usage, and delivery so your repair desk stays organized."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Repair Workflow Preview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One Repair Desk for Intake, Updates, and <span className="text-primary">Delivery</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See every repair job clearly from intake to completion so your team always knows what is pending, who is working on it, and what the customer has been told.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-5">4 Steps to Complete a Repair</h3>
            <div className="space-y-4">
              {workflowSteps.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-1">Step {item.step}</p>
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
            aria-label="Repair workflow dashboard preview showing intake, technician assignment, status updates, and completion for a phone shop"
          >
            <img
              src={repairWorkflowPreviewImage}
              alt="Mobile repair management system dashboard showing repair tracking workflow"
              className="sr-only"
              loading="lazy"
            />
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">Repair Workflow</p>
                <h3 className="font-heading font-semibold text-lg">Cellivo Repair Desk</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
                <Wrench size={13} />
                Job #RP-1208
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-6">
              <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Repair Intake</p>
                        <h3 className="text-lg font-heading font-semibold text-slate-900">Customer & Device</h3>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Smartphone size={18} />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                        <p className="font-medium text-slate-900">Samsung S23 Ultra</p>
                        <p className="text-xs text-muted-foreground">Customer: Nimesh Perera</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                        <p className="font-medium text-slate-900">Issue</p>
                        <p className="text-xs text-muted-foreground">Display flicker and battery drain</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                        <p className="font-medium text-slate-900">Promised Date</p>
                        <p className="text-xs text-muted-foreground">April 17, 2026 at 4:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Technician Assignment</h3>
                      <UserCog size={16} className="text-primary" />
                    </div>
                    <div className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Assigned to Kasun</p>
                        <p className="text-xs text-muted-foreground">Screen repair specialist</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                        Diagnosing
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Status Updates</h3>
                      <GitBranch size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      {[
                        ["Received", "Phone checked in at front desk"],
                        ["In Progress", "Display unit replaced and tested"],
                        ["Ready", "Customer notified for pickup"],
                      ].map(([title, desc]) => (
                        <div key={title} className="rounded-xl bg-slate-50 px-4 py-3">
                          <p className="font-medium text-slate-900">{title}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Completion</h3>
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 font-medium">
                        Customer update sent automatically
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-slate-700">Parts Used</span>
                        <span className="font-medium text-slate-900">OLED screen, adhesive</span>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-slate-700">Repair Total</span>
                        <span className="font-medium text-slate-900">LKR 38,000</span>
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
        <span className="section-header-label">Why This Repair Page Converts</span>
        <h2 className="section-header-title">Benefits Phone Shop Owners Actually Feel Every Day</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {repairBenefits.map((item, index) => (
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
          <span className="section-header-label">Manual vs Cellivo Repair Management</span>
          <h2 className="section-header-title">Why Repair Shops Stop Running Repairs the Hard Way</h2>
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
                <p className="text-xs uppercase tracking-[0.18em] text-destructive font-semibold">Manual Repair Tracking</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Harder to manage, easier to lose trust</h3>
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
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Cellivo Repair Desk</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Clear workflow with fewer missed updates</h3>
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
        <h2 className="section-header-title">Mobile Repair Management Software for Phone Shops in Sri Lanka</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo gives mobile stores a practical mobile repair management software platform with repair intake, technician assignment, status workflows, and customer notifications in one place. If you are searching for a phone repair tracking system or a repair management system Sri Lanka shops can use without messy spreadsheets and paper tickets, this page is designed for that need.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          Cellivo also works with our{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing system
          </Link>
          ,{" "}
          <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">
            IMEI tracking system
          </Link>
          , and{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory management
          </Link>{" "}
          tools so your repair desk, parts usage, and final invoices stay connected.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="section-header-label">Learn More</span>
        <h2 className="section-header-title">Learn More About Repair Management</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Explore the Cellivo blog for repair workflow tips, customer communication ideas, and practical ways to run a faster repair desk in your phone shop.
        </p>
        <div className="mt-6">
          <Link to="/blog">
            <Button variant="outline" className="rounded-xl font-medium px-6">
              Read Repair Management Articles
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">FAQ</span>
          <h2 className="section-header-title">Common Questions About Repair Management Software</h2>
          <div className="premium-divider" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Quick answers to the questions phone shops ask most when choosing a repair tracking system.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {repairFaqs.map((faq) => (
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
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">More Features That Support Better Repair Workflows</h2>
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
            Get My Repair System Now
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Replace repair chaos with a system that keeps every ticket, technician, and customer update organized in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Managing Repairs Smarter <ArrowRight className="ml-2" size={16} />
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
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Built for Sri Lankan mobile businesses</span>
          </div>
          <p className="text-sm text-white/60 mt-4">Start today and organize your repair workflow in minutes.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default RepairManagement;
