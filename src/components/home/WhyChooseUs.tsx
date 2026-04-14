import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Puzzle, ThumbsUp, ShieldCheck, Headphones, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const reasons = [
  { icon: Target, title: "Built Only for Phone Shops", desc: "Every feature exists because a phone shop owner asked for it. IMEI-based stock control, repair workflows, accessory management — all native." },
  { icon: Puzzle, title: "Works the Way You Work", desc: "We studied how real phone shops operate. The system mirrors your actual daily routine." },
  { icon: ThumbsUp, title: "Staff Learn It in Minutes", desc: "New cashier? Billing in 10 minutes. New technician? Logging repairs in 5. No manual needed." },
  { icon: ShieldCheck, title: "Your Data Is Safe", desc: "99.9% uptime, encrypted data, automatic backups, and role-based access." },
  { icon: Headphones, title: "Real People Support", desc: "Our team understands phone shop operations — because that's all we do." },
  { icon: TrendingUp, title: "Grows as You Grow", desc: "Add branches, staff, and features without switching systems." },
  { icon: Sparkles, title: "Always Up to Date", desc: "Cloud-based. No installations. New features appear automatically." },
];

const WhyChooseUs = () => (
  <SectionWrapper className="bg-secondary/40">
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">Why Cellivo?</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        7 Reasons Phone Shops Choose <span className="text-primary">Cellivo</span>
      </h2>
      <div className="premium-divider" />
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {reasons.map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className={`bg-white border border-border rounded-xl p-5 hover-lift group ${i === 6 ? "sm:col-span-2 lg:col-span-1" : ""}`}
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/8 transition-colors">
            <r.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{r.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="text-center mt-12 space-y-3">
      <Link to="/contact">
        <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
          Try Cellivo Free <ArrowRight className="ml-2" size={15} />
        </Button>
      </Link>
      <p className="text-xs text-muted-foreground">Get started in under 2 minutes. No credit card.</p>
    </div>
  </SectionWrapper>
);

export default WhyChooseUs;
