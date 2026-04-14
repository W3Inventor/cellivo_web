import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import FinalCTA from "@/components/home/FinalCTA";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { motion } from "framer-motion";
import { Target, Puzzle, ThumbsUp, ShieldCheck, Headphones, TrendingUp, Sparkles, Users } from "lucide-react";

const reasons = [
  { icon: Target, title: "Built for Phone Shops", desc: "Every screen, field, and workflow is designed for mobile phone retail." },
  { icon: Puzzle, title: "Practical Design", desc: "Every capability exists because real phone shop owners told us they need it." },
  { icon: ThumbsUp, title: "Easy to Use", desc: "A new cashier can learn it in minutes — yet powerful enough for multi-branch operations." },
  { icon: ShieldCheck, title: "Reliable & Secure", desc: "Enterprise-grade infrastructure with 99.9% uptime and encrypted data." },
  { icon: Headphones, title: "Dedicated Support", desc: "A team who understands your business and proactively helps you succeed." },
  { icon: TrendingUp, title: "Scalable", desc: "Start with one shop. Add branches, staff, and features as you grow." },
  { icon: Sparkles, title: "Modern Technology", desc: "Cloud-based, always updated. Access from anywhere, on any device." },
  { icon: Users, title: "Industry Understanding", desc: "Our team has spent years studying phone shop operations." },
];

const WhyUs = () => (
  <Layout>
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="section-header-label">Why Choose Us</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground">Why Phone Shops Choose <span className="text-primary">Cellivo</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">There are many POS systems on the market. Here's why mobile retailers trust us.</p>
        </motion.div>
      </div>
    </section>
    <SectionWrapper>
      <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div key={r.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white border border-border rounded-xl p-5 hover-lift">
            <r.icon size={20} className="text-foreground/60 mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{r.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
    <TestimonialsSection />
    <FinalCTA />
  </Layout>
);

export default WhyUs;
