import Layout from "@/components/Layout";
import DemoBookingButton from "@/components/DemoBookingButton";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, Smartphone, Receipt, Hash, Wrench,
  Package, Building2, BarChart3, Heart, Users, ShieldCheck
} from "lucide-react";

const challenges = [
  "Tracking hundreds of IMEI numbers manually",
  "Managing phone sales and repairs in different systems",
  "Running out of popular accessories without warning",
  "Spending hours on manual billing and tax calculations",
  "No visibility into which products are actually profitable",
  "Staff making pricing errors on high-value phones",
];

const solutions = [
  { icon: Receipt, title: "Fast POS Billing", desc: "Create invoices in 30 seconds with auto-tax, discounts, and multiple payment methods.", link: "/billing-software-for-mobile-shop" },
  { icon: Hash, title: "IMEI Stock Control", desc: "Every phone gets an IMEI record the moment it enters your shop. Full traceability.", link: "/imei-tracking-pos-system" },
  { icon: Wrench, title: "Repair Management", desc: "Log repairs, assign technicians, track parts, and notify customers automatically.", link: "/mobile-repair-management-software" },
  { icon: Package, title: "Inventory Control", desc: "Track phones, accessories, and spare parts with low-stock alerts.", link: "/inventory-management-system" },
  { icon: Building2, title: "Multi-Branch", desc: "Manage all your locations from one centralized dashboard.", link: "/multi-branch-pos-system" },
  { icon: BarChart3, title: "Profit Analytics", desc: "See profit margins per phone, per accessory, per repair, per day.", link: "/billing-software-for-mobile-shop" },
];

const PosForMobileShops = () => (
  <Layout>
    <SEOHead
      title="POS for Small Mobile Shops | Billing & Inventory Software"
      description="POS for small mobile shops with fast billing, IMEI tracking, repairs, inventory control, and simple tools for owners who need easier daily control."
      canonical="https://cellivo.com/pos-for-mobile-shops"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Cellivo",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "POS for small mobile shops with billing, IMEI stock control, repair management, accessories inventory, and simple growth tools.",
        url: "https://cellivo.com/pos-for-mobile-shops",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "POS for Small Mobile Shops", path: "/pos-for-mobile-shops" },
      ]}
    />

    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <span className="section-header-label">For Small Mobile Shops</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-6 text-foreground leading-[1.1]">
            POS for <span className="text-primary">Small Mobile Shops</span> That Need Simpler Control
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Small mobile shops need fast billing, IMEI control, and repair tracking without complex setup. Cellivo keeps daily operations simple for owner-led stores from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link to="/pricing">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <DemoBookingButton variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
              Book a Demo
            </DemoBookingButton>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Start with the essentials now, then grow into the full{" "}
            <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
              mobile shop POS system
            </Link>{" "}
            or a faster{" "}
            <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
              POS system for phone shop
            </Link>{" "}
            checkout workflow when your counter gets busier.
          </p>
        </div>
      </div>
    </section>

    {/* Challenges */}
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div>
          <span className="section-header-label">The Challenge</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Small Mobile Shops Face Unique Daily Pressure
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Unlike generic retail, smaller phone shops still manage high-value devices, repair intake, and fast-moving accessories without extra staff or time to waste. This page focuses on simpler daily control for compact teams, while the broader{" "}
            <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
              mobile shop POS system
            </Link>{" "}
            covers the full operational stack as you scale.
          </p>
          <ul className="space-y-3">
            {challenges.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 size={16} className="text-destructive/50 mt-0.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary/40 border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone size={24} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground text-lg">Cellivo Keeps It Manageable</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            One system that handles billing, stock, repairs, and customer history without forcing a small team to juggle disconnected tools or jump into a more advanced{" "}
            <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
              POS system for phone shop
            </Link>{" "}
            setup before they are ready.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <ShieldCheck size={14} />
            <span>Used by 500+ phone shops worldwide</span>
          </div>
        </div>
      </div>
    </SectionWrapper>

    {/* Solutions */}
    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12">
        <span className="section-header-label">How Cellivo Helps</span>
        <h2 className="section-header-title">Built for How Phone Shops Actually Work</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {solutions.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="bg-white border border-border rounded-xl p-5 hover-lift group">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/8 transition-colors">
              <s.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{s.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
            <Link to={s.link} className="text-xs text-primary font-medium hover:underline">Learn more →</Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* CTA */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Run Your Small Mobile Shop Smarter?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">Start free today and see how Cellivo transforms your daily operations.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="inverseOutline" className="rounded-xl font-medium px-8">View Pricing</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default PosForMobileShops;
