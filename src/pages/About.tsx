import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, ShieldCheck, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We continuously evolve our platform with cutting-edge technology." },
  { icon: ShieldCheck, title: "Reliability", desc: "99.9% uptime, secure data handling, and consistent performance." },
  { icon: Target, title: "Business Impact", desc: "Every feature delivers measurable value to your operations." },
  { icon: Heart, title: "Partnership", desc: "We don't just sell software. We become your technology partner." },
  { icon: TrendingUp, title: "Growth", desc: "Our system scales — from a single shop to a nationwide chain." },
  { icon: Eye, title: "Transparency", desc: "Clear pricing, honest communication, no hidden surprises." },
];

const About = () => (
  <Layout>
    <SEOHead
      title="About Cellivo | Phone Shop POS by W3Inventor"
      description="Learn about Cellivo, the phone shop POS built by W3Inventor to help mobile retailers manage billing, inventory, repairs, customers, and growth."
      canonical="https://cellivo.com/about"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "About Cellivo", path: "/about" },
      ]}
    />
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <span className="section-header-label">About Us</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground">POS System Built for Phone Shops That <span className="text-primary">Understands Mobile Retail</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Cellivo, a <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">POS system for phone shops</Link> built by W3Inventor, was created to help mobile retailers manage sales, inventory, repairs, and customers with complete control.</p>
        </div>
      </div>
    </section>
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Why We Focus on Mobile Retail</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">The mobile phone retail industry is fast-moving, yet most shops rely on generic POS systems or spreadsheets that weren't designed for their unique workflow.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">We saw owners struggling with <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">IMEI tracking</Link>, losing devices in <Link to="/mobile-repair-management-software" className="text-primary hover:underline">repair tracking</Link>, and miscounting accessories because <Link to="/inventory-management-system" className="text-primary hover:underline">inventory control</Link> was handled manually.</p>
          <p className="text-muted-foreground leading-relaxed">That's why we built a <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">mobile shop POS system</Link> from the ground up - purpose-built for phone shops.</p>
        </div>
        <div className="border border-border rounded-2xl p-8 bg-secondary/30">
          <div className="space-y-5">
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2"><Target className="text-primary" size={22} /><h3 className="font-heading font-semibold text-foreground">Our Mission</h3></div>
              <p className="text-muted-foreground leading-relaxed text-sm">Empower every phone shop with intelligent, easy-to-use technology that drives real business results.</p>
            </div>
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2"><Eye className="text-primary" size={22} /><h3 className="font-heading font-semibold text-foreground">Our Vision</h3></div>
              <p className="text-muted-foreground leading-relaxed text-sm">A world where every mobile retailer has access to enterprise-grade tools without enterprise complexity.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
    <SectionWrapper className="pt-0">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <div className="max-w-3xl">
          <span className="section-header-label">Authority</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-6">Built by a Team That Understands Real Business</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Cellivo is developed by W3Inventor, a Sri Lanka-based software company focused on building high-performance digital systems for growing businesses.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">At W3Inventor, we don't build generic software. We work closely with real businesses, understand their daily workflows, and create systems that solve real operational problems.</p>
          <p className="text-muted-foreground leading-relaxed">Cellivo is the result of working directly with phone shop owners and building a <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">mobile shop POS system</Link> designed specifically for mobile retail, <Link to="/mobile-repair-management-software" className="text-primary hover:underline">repair tracking</Link>, <Link to="/inventory-management-system" className="text-primary hover:underline">inventory control</Link>, and business growth.</p>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/30 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">W3Inventor</p>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-sm font-semibold text-foreground mb-1">Business-first software</p>
              <p className="text-sm text-muted-foreground">Built around real workflows instead of generic feature lists.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-sm font-semibold text-foreground mb-1">Retail-focused systems</p>
              <p className="text-sm text-muted-foreground">Designed for operational clarity, speed, and scalable control.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-sm font-semibold text-foreground mb-1">Built for growth</p>
              <p className="text-sm text-muted-foreground">Created to support single stores and expanding mobile retail businesses.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
    <SectionWrapper className="pt-0">
      <div className="max-w-4xl">
        <span className="section-header-label">Who It's For</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-6">Built for Modern Phone Shops and Mobile Retailers</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">Cellivo is a complete <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">mobile shop POS system</Link> built to help phone retailers manage sales, inventory, repairs, and customers.</p>
        <p className="text-muted-foreground leading-relaxed mb-4">Whether you run a single mobile shop or manage multiple locations, Cellivo provides a scalable mobile shop software solution that simplifies operations and improves business visibility.</p>
        <p className="text-muted-foreground leading-relaxed">This system is used by retailers looking for a modern POS system in Sri Lanka and internationally, offering powerful features without unnecessary complexity.</p>
        <p className="text-muted-foreground leading-relaxed mt-4">Cellivo is widely used by mobile retailers looking for a reliable POS system in Sri Lanka and growing businesses worldwide.</p>
      </div>
    </SectionWrapper>
    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Our <span className="text-primary">Values</span></h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {values.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white border border-border rounded-xl p-5 hover-lift">
            <v.icon size={20} className="text-foreground/60 mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{v.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center rounded-[32px] border border-primary/15 bg-primary/5 px-6 py-12 md:px-10 md:py-16">
        <span className="section-header-label">Get Started</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5">Start Using a POS System Built for Phone Shops</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">Join phone shop owners who use Cellivo to manage billing, inventory, repairs, and customers from one powerful system.</p>
        <Link to="/pricing">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
            Start Free Trial
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  </Layout>
);

export default About;
