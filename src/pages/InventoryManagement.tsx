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
  Boxes,
  CheckCircle2,
  CreditCard,
  LayoutGrid,
  Package,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops using Cellivo" },
  { value: "Thousands+", label: "products tracked daily" },
  { value: "Sri Lanka", label: "built for local mobile retailers" },
];

const inventoryBenefits = [
  {
    icon: TrendingUp,
    title: "Never Run Out of Best-Selling Products",
    desc: "Know which fast-moving phones, accessories, and spare parts need attention before missed sales start hurting revenue.",
  },
  {
    icon: Boxes,
    title: "Know Your Stock Levels in Real-Time",
    desc: "See live stock counts as sales, purchases, and internal movements happen so you never rely on yesterday's numbers.",
  },
  {
    icon: LayoutGrid,
    title: "Organize Inventory Without Confusion",
    desc: "Group products cleanly by phones, accessories, brands, variants, and spare parts so your team can find items faster.",
  },
  {
    icon: Bell,
    title: "Get Alerts Before Stock Runs Out",
    desc: "Receive low-stock warnings early enough to restock popular items before customers ask for something you do not have.",
  },
  {
    icon: Package,
    title: "Track Every Product Across Your Shop",
    desc: "Keep full visibility on what is in stock, what is reserved, what was sold, and what needs replenishment.",
  },
];

const dashboardHighlights = [
  {
    title: "Product List",
    desc: "View all phones, accessories, and spare parts in one searchable inventory table.",
    icon: Boxes,
  },
  {
    title: "Stock Levels",
    desc: "See current quantities clearly so your team always knows what is available right now.",
    icon: TrendingUp,
  },
  {
    title: "Low Stock Alerts",
    desc: "Catch items approaching reorder level before they create missed sales.",
    icon: Bell,
  },
  {
    title: "Categories",
    desc: "Keep stock organized by device type, brand, accessory line, and spare part group.",
    icon: LayoutGrid,
  },
];

const comparisonRows = [
  {
    manual: "Stock mistakes from outdated sheets and manual counting",
    cellivo: "Real-time tracking that updates as stock moves",
  },
  {
    manual: "No alerts before items run out",
    cellivo: "Smart alerts before low stock becomes a lost sale",
  },
  {
    manual: "Hard to track products across categories",
    cellivo: "Clean organization for phones, accessories, and parts",
  },
  {
    manual: "Excel confusion during audits and restocking",
    cellivo: "Full visibility with cleaner audits and easier replenishment",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const inventoryFaqs = [
  {
    question: "What is an inventory management system?",
    answer:
      "An inventory management system helps phone shops track products, stock levels, movements, and replenishment so inventory stays accurate and easier to control.",
  },
  {
    question: "Can I track accessories and spare parts?",
    answer:
      "Yes. Cellivo lets you manage phones, accessories, and spare parts in one inventory system with categories, quantities, and stock visibility.",
  },
  {
    question: "How do low stock alerts work?",
    answer:
      "You set reorder thresholds for products, and Cellivo alerts your team when stock drops near those levels so you can restock before items run out.",
  },
  {
    question: "Does it work with POS?",
    answer:
      "Yes. Cellivo connects inventory with POS billing so stock updates automatically after each sale.",
  },
  {
    question: "Can I manage multiple product categories?",
    answer:
      "Yes. You can organize inventory by phones, accessories, brands, conditions, storage variants, and spare parts for cleaner stock control.",
  },
];

const inventoryFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: inventoryFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const inventoryDashboardPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='720' height='540' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='76' y='208' width='210' height='18' rx='9' fill='%23dbeafe'/%3E%3Crect x='76' y='248' width='640' height='56' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='326' width='640' height='56' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='404' width='640' height='56' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='482' width='640' height='56' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='792' y='160' width='372' height='220' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='832' y='208' width='170' height='18' rx='9' fill='%23fde68a'/%3E%3Crect x='832' y='248' width='292' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='832' y='288' width='240' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='792' y='420' width='372' height='280' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='832' y='468' width='170' height='18' rx='9' fill='%23d1fae5'/%3E%3Crect x='832' y='508' width='292' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='832' y='548' width='292' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='832' y='588' width='220' height='20' rx='10' fill='%23e2e8f0'/%3E%3C/svg%3E";

const InventoryManagement = () => (
  <Layout>
    <SEOHead
      title="Inventory Management System for Phone Shops | Cellivo"
      description="Inventory management system for phone shops with real-time stock visibility, low-stock alerts, category control, and cleaner inventory workflows."
      canonical="https://cellivo.com/inventory-management-system"
      ogTitle="Inventory Management System for Phone Shops | Cellivo"
      ogDescription="Track phones, accessories, and spare parts with real-time updates, low-stock alerts, and complete visibility across your shop."
      ogUrl="https://cellivo.com/inventory-management-system"
      twitterTitle="Inventory Management System for Phone Shops | Cellivo"
      twitterDescription="Inventory software for mobile shops with real-time stock visibility and low-stock alerts."
      structuredData={inventoryFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Inventory Management System", path: "/inventory-management-system" },
      ]}
    />

    <FeatureHero
      badge="Inventory Management System"
      painHook={[
        "Still managing your stock in Excel?",
        "Running out of best-selling items without warning?",
        "Inventory mistakes are silently killing your profit.",
      ]}
      title={
        <>
          Control Your Entire Inventory in Real-Time <span className="text-primary">Without Stock Mistakes</span>
        </>
      }
      supportText="Track phones, accessories, and spare parts with real-time stock visibility, low-stock alerts, and smarter inventory control."
      primaryCtaLabel="Start Managing Stock Smarter"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection
      description="This feature is part of our POS for mobile phone shops designed to improve billing speed and sales efficiency."
      buttonLabel="View POS System"
      linkTo="/pos-system-for-phone-shop"
    />

    <WhyThisMattersSection
      label="Why Inventory Control Matters"
      title="Why Phone Shops Need Smarter Inventory Management"
      problemText="When stock is managed in Excel or scattered lists, fast-selling products run out unexpectedly, counts become unreliable, and profit gets affected by avoidable stock mistakes."
      solutionText="Cellivo helps phone shops control inventory in real time with low-stock alerts, category-based organization, and stock updates that stay aligned with billing."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Inventory Dashboard Preview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One Dashboard for Stock Levels, Alerts, and <span className="text-primary">Product Categories</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            See your product list, live stock levels, low-stock warnings, and organized categories in one place so you can act before stock problems hit sales.
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
            aria-label="Inventory dashboard preview showing product list, stock levels, low stock alerts, and categories for a phone shop"
          >
            <img
              src={inventoryDashboardPreviewImage}
              alt="Inventory management system dashboard showing product list, stock levels, low stock alerts, and categories"
              className="sr-only"
              loading="lazy"
            />
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">Inventory Dashboard</p>
                <h3 className="font-heading font-semibold text-lg">Cellivo Stock Control</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
                <Boxes size={13} />
                Live Inventory
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-6">
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Product List</p>
                      <h3 className="text-lg font-heading font-semibold text-slate-900">Tracked Inventory</h3>
                    </div>
                    <Package size={18} className="text-primary" />
                  </div>

                  <div className="space-y-3 text-sm">
                    {[
                      ["iPhone 15 Pro", "Phones", "14 in stock"],
                      ["Type-C Fast Charger", "Accessories", "8 in stock"],
                      ["Battery Flex Cable", "Spare Parts", "4 in stock"],
                    ].map(([name, category, stock]) => (
                      <div key={name} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-900">{name}</p>
                          <p className="text-xs text-muted-foreground">{category}</p>
                        </div>
                        <span className="font-medium text-slate-900">{stock}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Low Stock Alerts</h3>
                      <Bell size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-amber-50 text-amber-700 px-4 py-3 font-medium">
                        3 products need restocking this week
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        Charger stock below reorder level
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Categories</h3>
                      <LayoutGrid size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-slate-50 px-4 py-3">Phones</div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">Accessories</div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">Spare Parts</div>
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
        <span className="section-header-label">Why This Inventory Page Converts</span>
        <h2 className="section-header-title">Benefits Phone Shop Owners Actually Care About</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {inventoryBenefits.map((item, index) => (
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
          <span className="section-header-label">Manual vs Smart Inventory System</span>
          <h2 className="section-header-title">Why Smart Phone Shops Stop Managing Stock in Excel</h2>
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
                <p className="text-xs uppercase tracking-[0.18em] text-destructive font-semibold">Manual Inventory Tracking</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Harder to control, easier to make mistakes</h3>
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
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Cellivo Inventory System</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Real-time visibility with cleaner stock control</h3>
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
        <h2 className="section-header-title">Inventory Management System for Mobile Shops in Sri Lanka</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo gives mobile retailers an inventory management system that helps control stock, prevent shortages, and keep cleaner product visibility across daily operations. If you need a mobile inventory system or stock management software Sri Lanka businesses can use without Excel confusion, this page is built for that search intent.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          It works with our{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing system
          </Link>
          ,{" "}
          <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">
            IMEI tracking system
          </Link>
          , and{" "}
          <Link to="/mobile-repair-management-software" className="text-primary hover:underline">
            repair management tools
          </Link>{" "}
          so every sale, device, and stock movement stays connected.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="section-header-label">Learn More</span>
        <h2 className="section-header-title">Learn How to Avoid Stock Mistakes in Your Mobile Shop</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Explore our blog to learn how to manage mobile shop inventory and avoid stock mistakes with the right system.
        </p>
        <div className="mt-6">
          <Link to="/blog">
            <Button variant="outline" className="rounded-xl font-medium px-6">
              Read Inventory Management Articles
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">FAQ</span>
          <h2 className="section-header-title">Common Questions About Inventory Management Software</h2>
          <div className="premium-divider" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Quick answers to the questions phone shops ask most when choosing a smarter inventory system.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {inventoryFaqs.map((faq) => (
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
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">More Features That Support Better Stock Control</h2>
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
            Get My Inventory System Now
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Replace stock confusion with a system that shows what you have, what is running low, and what needs action before profit slips away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Managing Stock Smarter <ArrowRight className="ml-2" size={16} />
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
          <p className="text-sm text-white/60 mt-4">Start today and get full control of your stock in minutes.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default InventoryManagement;
