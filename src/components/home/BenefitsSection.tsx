import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "@/components/LightMotion";
import { Clock, ShieldCheck, TrendingUp, Star } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Save Hours Every Day", desc: "Automate billing, stock updates, and reporting so your team spends less time on admin work." },
  { icon: ShieldCheck, title: "Reduce Costly Mistakes", desc: "Use digital billing, IMEI records, and controlled pricing to reduce errors." },
  { icon: TrendingUp, title: "Grow Sales with Better Control", desc: "Speed up checkout, avoid stockouts, and deliver a better customer experience." },
  { icon: Star, title: "Look More Professional", desc: "Give customers printed invoices, repair updates, and a more organized service experience." },
];

const BenefitsSection = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">Why Cellivo</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Why Phone Shops <span className="text-primary">Choose Cellivo</span>
      </h2>
      <div className="premium-divider" />
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {benefits.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="text-center p-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <b.icon size={24} className="text-primary" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default BenefitsSection;
