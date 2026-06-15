import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "@/components/LightMotion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Hash, Wrench, Package, BarChart3, Zap, RefreshCw, Heart, ArrowRight } from "lucide-react";

const solutions = [
  { icon: AlertTriangle, title: "Billing Errors Costing You Money?", desc: "Auto-calculated taxes, instant product lookup, and pre-set pricing eliminate mistakes." },
  { icon: Hash, title: "Can't Find an IMEI When You Need It?", desc: "Every phone gets a unique IMEI record the moment it enters your shop." },
  { icon: Wrench, title: "Losing Track of Repair Jobs?", desc: "Every repair is logged with device details, technician, status, and parts used." },
  { icon: Package, title: "Running Out of Accessories?", desc: "Set reorder alerts for every SKU. The system notifies you when stock hits your threshold." },
  { icon: BarChart3, title: "No Idea Which Products Are Profitable?", desc: "See profit margins per phone, per accessory, per repair, per day." },
  { icon: Zap, title: "Checkout Takes Too Long?", desc: "Scan, select, invoice — generated in under 30 seconds." },
  { icon: RefreshCw, title: "Using 3 Different Systems?", desc: "One login. One dashboard. Sales, repairs, inventory, and reports — all connected." },
  { icon: Heart, title: "Customers Calling About Repair Status?", desc: "Automatic SMS and email notifications at every stage." },
];

const SolutionsSection = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">Common Problems, Solved</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Sound Familiar? <span className="text-primary">We Built the Fix.</span>
      </h2>
      <div className="premium-divider" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {solutions.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          className="bg-white border border-border rounded-xl p-5 hover-lift group"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/8 transition-colors">
            <s.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{s.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="text-center mt-12 space-y-3">
      <Link to="/pricing">
        <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
          Start Free <ArrowRight className="ml-2" size={15} />
        </Button>
      </Link>
      <p className="text-xs text-muted-foreground">Works out of the box. No setup needed.</p>
    </div>
  </SectionWrapper>
);

export default SolutionsSection;
