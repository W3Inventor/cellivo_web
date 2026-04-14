import { motion } from "framer-motion";
import { Hash, Zap, Wrench, BarChart3, Package, ShieldCheck } from "lucide-react";

const items = [
  { icon: Zap, label: "Instant Access — No Setup" },
  { icon: Hash, label: "IMEI-Based Stock Control" },
  { icon: Wrench, label: "Full Repair Lifecycle" },
  { icon: BarChart3, label: "Live Profit Reports" },
  { icon: Package, label: "Accessory Stock Alerts" },
  { icon: ShieldCheck, label: "Secure Cloud Platform" },
];

const TrustStrip = () => (
  <section className="py-8 border-y border-border/60">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border/60"
          >
            <item.icon size={13} className="text-muted-foreground/60 shrink-0" />
            <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
