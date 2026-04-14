import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, ShieldCheck, Heart, TrendingUp } from "lucide-react";

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
      title="About Cellivo — Our Mission to Empower Phone Shops"
      description="Cellivo was founded to give phone shop owners the smart, reliable POS technology they need. Learn about our mission, vision, and values."
      canonical="https://cellivo.lovable.app/about"
    />
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="section-header-label">About Us</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground">Technology That Understands <span className="text-primary">Phone Retail</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Cellivo was founded to give phone shop owners the smart, reliable technology they need to run their businesses efficiently.</p>
        </motion.div>
      </div>
    </section>
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Why We Focus on Mobile Retail</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">The mobile phone retail industry is fast-moving, yet most shops rely on generic POS systems or spreadsheets that weren't designed for their unique workflow.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">We saw owners struggling with IMEI-based stock control, losing repair tickets, miscounting accessories. We knew there had to be a better way.</p>
          <p className="text-muted-foreground leading-relaxed">That's why we built a <a href="/mobile-shop-pos-system" className="text-primary hover:underline">POS system</a> from the ground up — purpose-built for phone shops.</p>
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
  </Layout>
);

export default About;
