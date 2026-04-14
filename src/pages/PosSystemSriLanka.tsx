import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, MapPin, Globe, Receipt, Hash,
  Wrench, Package, Building2, Users, Smartphone, ShieldCheck
} from "lucide-react";

const whySriLanka = [
  "Designed for Sri Lankan tax and business requirements",
  "Works on any device — no expensive hardware needed",
  "Supports LKR currency and local payment methods",
  "Cloud-based — accessible from anywhere in Sri Lanka",
  "Affordable pricing for Sri Lankan phone shop businesses",
  "SMS notifications in English and Sinhala/Tamil",
];

const features = [
  { icon: Receipt, title: "POS Billing in LKR", desc: "Create invoices in Sri Lankan Rupees with proper tax calculations and digital receipts.", link: "/pos-billing-system" },
  { icon: Hash, title: "IMEI Stock Control", desc: "Track every phone by IMEI — essential for Sri Lankan mobile retailers.", link: "/imei-tracking-pos" },
  { icon: Wrench, title: "Repair Management", desc: "Manage phone repairs with job tracking and customer notifications.", link: "/mobile-repair-management-software" },
  { icon: Package, title: "Inventory Control", desc: "Track phones, accessories, and spare parts across your Sri Lankan shop.", link: "/inventory-management-system" },
  { icon: Building2, title: "Multi-Branch", desc: "Manage shops across Colombo, Kandy, Galle, or anywhere in Sri Lanka.", link: "/multi-branch-pos" },
  { icon: Users, title: "Customer Management", desc: "Build customer relationships with purchase history and loyalty rewards.", link: "/customer-loyalty-system" },
];

const PosSystemSriLanka = () => (
  <Layout>
    <SEOHead
      title="POS System for Phone Shops in Sri Lanka | Cellivo"
      description="Cellivo is the #1 POS system for mobile phone shops in Sri Lanka. IMEI-based stock control, repair management, LKR billing, and inventory control. Start your free trial today."
      canonical="https://cellivo.lovable.app/pos-system-sri-lanka"
    />

    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="section-header-label flex items-center gap-2">
            <MapPin size={12} /> Sri Lanka
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-6 text-foreground leading-[1.1]">
            POS System for Phone Shops in <span className="text-primary">Sri Lanka</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The most complete POS system for Sri Lankan mobile phone shops. Manage sales, IMEI-based stock control, repairs, and inventory — designed for your local market.
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

    {/* Why Sri Lanka */}
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div>
          <span className="section-header-label">Local Focus</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Built for Sri Lankan Phone Shops
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Whether you run a phone shop in Colombo, Kandy, Galle, or any town in Sri Lanka, Cellivo is designed to meet your specific needs.
          </p>
          <ul className="space-y-3">
            {whySriLanka.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
          <Globe size={48} className="text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground text-xl mb-2">Cloud-Based</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Access your POS from any device, anywhere in Sri Lanka. No expensive hardware or IT setup required.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
            <ShieldCheck size={14} />
            <span>Trusted by phone shops across Sri Lanka</span>
          </div>
        </div>
      </div>
    </SectionWrapper>

    {/* Features */}
    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12">
        <h2 className="section-header-title">Features for Sri Lankan Phone Shops</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
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

    {/* CTA */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Start Your Free Trial in Sri Lanka
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Join Sri Lankan phone shop owners who manage their entire business on Cellivo.
          </p>
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

export default PosSystemSriLanka;
