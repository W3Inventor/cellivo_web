import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Wrench, Headphones, Building2, Cpu, ArrowRight } from "lucide-react";

const industries = [
  { icon: Smartphone, title: "Phone Sales Shops", desc: "Track every device with IMEI records, profit tracking, and fast billing.", cta: "Start free — I sell phones" },
  { icon: Wrench, title: "Repair Centers", desc: "Manage jobs from intake to pickup with auto-notifications.", cta: "Start free — I do repairs" },
  { icon: Headphones, title: "Accessories Retailers", desc: "Set reorder points, track what sells fastest, stop losing revenue.", cta: "Start free — I sell accessories" },
  { icon: Building2, title: "Multi-Location Chains", desc: "Run every branch from one dashboard. Transfer stock, compare performance.", cta: "Start free — Multiple shops" },
  { icon: Cpu, title: "Mixed Electronics Shops", desc: "Sales + repairs + accessories — all in one system.", cta: "Start free — I do all" },
];

const IndustrySection = () => (
  <SectionWrapper className="bg-secondary/40">
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">Who Is This For?</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Which One Sounds Like <span className="text-primary">Your Business?</span>
      </h2>
      <div className="premium-divider" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {industries.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className={`bg-white border border-border rounded-xl p-6 hover-lift group flex flex-col ${i === 4 ? "sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none" : ""}`}
        >
          <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/8 transition-colors">
            <item.icon size={20} className="text-foreground/60 group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.desc}</p>
          <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            {item.cta} <ArrowRight size={12} />
          </Link>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default IndustrySection;
