import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, Wrench, Package } from "lucide-react";

const problems = [
  { icon: AlertTriangle, title: "Hard to Track IMEI Numbers", desc: "Phones get mixed up, lost, or sold without proper records. You can't trace which phone went to which customer." },
  { icon: Clock, title: "Manual Billing Wastes Time", desc: "Hand-written invoices, manual tax calculations, and pricing errors cost you time and money every day." },
  { icon: Wrench, title: "Repair Jobs Get Lost", desc: "Customers call asking about repair status, and you can't find the ticket. Repairs fall through the cracks." },
  { icon: Package, title: "No Stock Visibility", desc: "You don't know what's in stock until you physically check. Accessories run out without warning." },
];

const ProblemSection = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">The Problem</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Running a Phone Shop <span className="text-primary">Shouldn't Be This Hard</span>
      </h2>
      <div className="premium-divider" />
      <p className="section-header-desc">
        Most phone shop owners struggle with these daily challenges. Sound familiar?
      </p>
    </div>

    <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {problems.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="bg-white border border-border rounded-xl p-6 hover-lift group"
        >
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
            <p.icon size={18} className="text-destructive/60" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default ProblemSection;
