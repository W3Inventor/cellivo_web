import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Receipt, Smartphone, Hash, Headphones, Wrench, Users,
  BarChart3, UserCog, TrendingUp, Building2, ArrowRight
} from "lucide-react";

const features = [
  { icon: Receipt, title: "30-Second Billing", desc: "Create invoices with auto-tax, discounts, and multiple payment methods." },
  { icon: Hash, title: "IMEI & Serial Tracking", desc: "Every phone gets an IMEI record. Instant lookup and complete traceability." },
  { icon: Smartphone, title: "Phone Inventory", desc: "Catalog by make, model, color, storage, and condition." },
  { icon: Wrench, title: "Repair Management", desc: "Log jobs, assign technicians, track parts, and auto-notify customers." },
  { icon: Headphones, title: "Accessory Stock Control", desc: "Track cases, chargers, and protectors with low-stock alerts." },
  { icon: Users, title: "Customer Records", desc: "Full purchase and repair history per customer." },
  { icon: BarChart3, title: "Sales & Profit Reports", desc: "Daily revenue, margins per product, top sellers, and peak hours." },
  { icon: UserCog, title: "Staff Access Controls", desc: "Role-based permissions for cashiers, technicians, and managers." },
  { icon: TrendingUp, title: "Margin Visibility", desc: "Know your profit per phone, per accessory, per repair." },
  { icon: Building2, title: "Multi-Location Ready", desc: "Run multiple shops from one dashboard." },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgOrb = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="section-padding bg-secondary/40 relative"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-header-label">What You Get</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Everything Your Phone Shop Needs
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc">
            Every feature works out of the box the moment you sign up.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="bg-white border border-border rounded-xl p-4 md:p-6 hover-lift group"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/8 transition-colors">
                <f.icon size={18} className="text-foreground/70 group-hover:text-primary transition-colors md:hidden" />
                <f.icon size={20} className="text-foreground/70 group-hover:text-primary transition-colors hidden md:block" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 md:mb-1.5 text-sm">{f.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-3">
          <Link to="/contact">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
              Start Free — All Features Included <ArrowRight className="ml-2" size={15} />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground">No credit card required. Ready in under 2 minutes.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
