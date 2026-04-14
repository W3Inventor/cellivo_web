import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, CreditCard, Zap, ShieldCheck, Receipt, Hash,
  Wrench, Package, Building2, BarChart3, Users, Wallet, Heart, Smartphone,
  Clock, TrendingUp, AlertTriangle, Star
} from "lucide-react";

const features = [
  { icon: Receipt, title: "POS Billing System", desc: "Create invoices in under 30 seconds with auto-tax calculation and multiple payment methods.", link: "/pos-billing-system" },
  { icon: Hash, title: "IMEI Stock Control", desc: "Track every phone by IMEI from purchase to sale with complete traceability.", link: "/imei-tracking-pos" },
  { icon: Package, title: "Inventory Management", desc: "Real-time stock tracking for phones, accessories, and spare parts with low-stock alerts.", link: "/inventory-management-system" },
  { icon: Wrench, title: "Repair Management", desc: "Log repairs, assign technicians, track parts, and auto-notify customers.", link: "/mobile-repair-management-software" },
  { icon: Building2, title: "Multi-Branch Support", desc: "Run multiple locations from one dashboard with centralized reporting.", link: "/multi-branch-pos" },
  { icon: Wallet, title: "Cash Drawer Management", desc: "Track cash in/out, shift closings, and expense recording with full reconciliation.", link: "/cash-drawer-management" },
  { icon: Heart, title: "Customer Loyalty", desc: "Build loyalty programs, track purchase history, and reward repeat customers.", link: "/customer-loyalty-system" },
  { icon: BarChart3, title: "Sales & Profit Reports", desc: "Daily revenue, margins per product, top sellers, and real-time profit analytics.", link: "/pos-billing-system" },
];

const problems = [
  { icon: AlertTriangle, title: "Hard to Track IMEI Numbers", desc: "Phones get mixed up, lost, or sold without proper records. You can't trace which phone went to which customer." },
  { icon: Clock, title: "Manual Billing Wastes Time", desc: "Hand-written invoices, manual tax calculations, and pricing errors cost you time and money every day." },
  { icon: Wrench, title: "Repair Jobs Get Lost", desc: "Customers call asking about repair status, and you can't find the ticket. Repairs fall through the cracks." },
  { icon: Package, title: "No Stock Visibility", desc: "You don't know what's in stock until you physically check. Accessories run out without warning." },
];

const benefits = [
  { icon: Clock, title: "Save 2+ Hours Daily", desc: "Automated billing, inventory tracking, and reporting eliminate manual work." },
  { icon: ShieldCheck, title: "Reduce Errors to Zero", desc: "Auto-calculated taxes, IMEI verification, and digital records eliminate human mistakes." },
  { icon: TrendingUp, title: "Increase Sales by 15%+", desc: "Better stock management, faster checkout, and customer loyalty drive more revenue." },
  { icon: Star, title: "Professional Customer Experience", desc: "Instant receipts, repair notifications, and loyalty rewards impress every customer." },
];

const MobileShopPosSystem = () => (
  <Layout>
    <SEOHead
      title="Mobile Shop POS System | Phone Shop Management Software — Cellivo"
      description="Cellivo is the #1 POS system designed for mobile phone shops. IMEI-based stock control, repair management, inventory control, billing, and multi-branch support. Start your free trial today."
      canonical="https://cellivo.lovable.app/mobile-shop-pos-system"
    />

    {/* Hero */}
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <span className="section-header-label">Mobile Shop POS System</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-6 text-foreground leading-[1.1]">
            The Complete POS System for <span className="text-primary">Mobile Phone Shops</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Manage sales, IMEI-based stock control, repairs, inventory, and staff — all from one powerful dashboard. Built exclusively for phone shop owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link to="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
                Book a Demo
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CreditCard size={13} /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Zap size={13} /> Instant access</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Problems */}
    <SectionWrapper>
      <div className="text-center mb-12">
        <span className="section-header-label">The Problem</span>
        <h2 className="section-header-title">Running a Phone Shop Shouldn't Be This Hard</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {problems.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="bg-white border border-border rounded-xl p-6 hover-lift">
            <p.icon size={20} className="text-destructive/60 mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* Features */}
    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12">
        <span className="section-header-label">All-in-One Solution</span>
        <h2 className="section-header-title">Everything Your Phone Shop Needs</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
            className="bg-white border border-border rounded-xl p-5 hover-lift group">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/8 transition-colors">
              <f.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{f.desc}</p>
            <Link to={f.link} className="text-xs text-primary font-medium hover:underline">Learn more →</Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* Benefits */}
    <SectionWrapper>
      <div className="text-center mb-12">
        <span className="section-header-label">Why Cellivo</span>
        <h2 className="section-header-title">Real Benefits for Your Business</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="text-center p-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <b.icon size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* CTA */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Start Managing Your Phone Shop Today
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Join 500+ phone shop owners who chose Cellivo. Create your free account and start in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
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
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default MobileShopPosSystem;
