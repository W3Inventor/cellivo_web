import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Package, Zap, ArrowRight } from "lucide-react";

const steps = [
  { step: "01", icon: UserPlus, title: "Create Your Free Account", desc: "Sign up in seconds — just your email and a password. No credit card, no approval process." },
  { step: "02", icon: Package, title: "Add Your Products & Stock", desc: "Import or manually add your phones, accessories, and repair services. The system guides you." },
  { step: "03", icon: Zap, title: "Start Billing & Managing", desc: "That's it. Start creating invoices, tracking repairs, and viewing reports immediately." },
];

const HowItWorks = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">Get Started in Minutes</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Three Steps to a <span className="text-primary">Smarter Shop</span>
      </h2>
      <div className="premium-divider" />
      <p className="section-header-desc">
        No installation. No technical knowledge. No waiting.
      </p>
    </div>

    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto mb-5">
              <s.icon size={22} className="text-foreground/70" />
            </div>
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-semibold mb-3">
              {s.step}
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2 text-base">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="text-center mt-12">
      <Link to="/contact">
        <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
          Create Free Account <ArrowRight className="ml-2" size={15} />
        </Button>
      </Link>
      <p className="text-xs text-muted-foreground mt-3">No credit card required. No commitment. Cancel anytime.</p>
    </div>
  </SectionWrapper>
);

export default HowItWorks;
