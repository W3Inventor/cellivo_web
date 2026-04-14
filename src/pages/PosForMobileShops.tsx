import Layout from "@/components/Layout";
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
  { icon: Receipt, title: "Fast POS Billing", desc: "Create invoices in 30 seconds with auto-tax, discounts, and multiple payment methods.", link: "/pos-billing-system" },
  { icon: Hash, title: "IMEI Stock Control", desc: "Every phone gets an IMEI record the moment it enters your shop. Full traceability.", link: "/imei-tracking-pos" },
  { icon: Wrench, title: "Repair Management", desc: "Log repairs, assign technicians, track parts, and notify customers automatically.", link: "/mobile-repair-management-software" },
  { icon: Package, title: "Inventory Control", desc: "Track phones, accessories, and spare parts with low-stock alerts.", link: "/inventory-management-system" },
  { icon: Building2, title: "Multi-Branch", desc: "Manage all your locations from one centralized dashboard.", link: "/multi-branch-pos" },
  { icon: BarChart3, title: "Profit Analytics", desc: "See profit margins per phone, per accessory, per repair, per day.", link: "/pos-billing-system" },
];

const PosForMobileShops = () => (
  <Layout>
    <SEOHead
      title="POS System for Mobile Phone Shops | Cellivo"
      description="Cellivo is the POS system built specifically for mobile phone shops. Manage IMEI-based stock control, repairs, accessories inventory, billing, and multi-branch operations — all in one platform."
      canonical="https://cellivo.lovable.app/pos-for-mobile-shops"
    />

    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="section-header-label">For Mobile Phone Shops</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-6 text-foreground leading-[1.1]">
            The POS System Built for <span className="text-primary">Mobile Phone Shops</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Phone shops have unique needs — IMEI-based stock control, repair workflows, accessory management. Generic POS systems don't understand your business. Cellivo does.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link to="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">Book a Demo</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Challenges */}
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div>
          <span className="section-header-label">The Challenge</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Mobile Phone Shops Face Unique Challenges
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Unlike general retail, phone shops deal with high-value serialized products, repair services, and fast-moving accessories — all at the same time.
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
            <h3 className="font-heading font-semibold text-foreground text-lg">Cellivo Solves All of This</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            One system that handles everything a mobile phone shop needs — from the moment a phone enters your inventory to the moment it's sold with a receipt in the customer's hand.
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
            Ready to Run Your Phone Shop Smarter?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">Start free today and see how Cellivo transforms your daily operations.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup">
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
