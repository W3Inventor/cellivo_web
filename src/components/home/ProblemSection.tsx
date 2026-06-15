import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "@/components/LightMotion";
import { AlertTriangle, Clock, Wrench, Package } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Hard to Track IMEI and Serial Numbers",
    desc: "Phones get mixed up, sold without proper records, or returned without traceability. A phone shop needs accurate IMEI and serial tracking.",
  },
  {
    icon: Clock,
    title: "Billing Is Slow and Error-Prone",
    desc: "Manual billing, price overrides, and payment mistakes slow your front desk and reduce customer trust.",
  },
  {
    icon: Wrench,
    title: "Repair Jobs Become Difficult to Manage",
    desc: "Without a proper repair management system, tickets get delayed, parts are missed, and customers keep calling for updates.",
  },
  {
    icon: Package,
    title: "Stock Visibility Is Poor",
    desc: "Many shops do not know what is in stock, what is low, or which items are moving fastest until it is too late.",
  },
];

const ProblemSection = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">The Problem</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Why Phone Shops Outgrow <span className="text-primary">Generic POS Software</span>
      </h2>
      <div className="premium-divider" />
      <p className="section-header-desc">
        Most mobile phone shops start with spreadsheets, handwritten bills, or generic billing tools. But once you manage phones, accessories, IMEI numbers, repairs, and staff, those systems break down fast.
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
