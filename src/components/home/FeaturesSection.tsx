import { useRef } from "react";
import { motion, useScroll, useTransform } from "@/components/LightMotion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Receipt, Smartphone, Hash, Headphones, Wrench, Users,
  BarChart3, UserCog, TrendingUp, Building2, ArrowRight
} from "lucide-react";

const features = [
  { icon: Receipt, title: "Fast POS Billing", desc: "Create invoices in seconds with discounts, multiple payment methods, and cleaner front-desk workflows.", path: "/billing-software-for-mobile-shop" },
  { icon: Hash, title: "IMEI and Serial Tracking", desc: "Track every phone with IMEI and serial records for sales, stock control, and warranty visibility.", path: "/imei-tracking-pos-system" },
  { icon: Smartphone, title: "Mobile Inventory Management", desc: "Manage phone models, storage, color, condition, and accessory stock from one inventory system." },
  { icon: Wrench, title: "Repair Management System", desc: "Create repair jobs, assign technicians, update status, and keep customers informed.", path: "/mobile-repair-management-software" },
  { icon: Headphones, title: "Accessory Stock Control", desc: "Monitor chargers, cables, cases, and protectors with low-stock alerts and better reorder timing." },
  { icon: Users, title: "Customer Records", desc: "Keep complete sales history, repair history, and contact details in one place." },
  { icon: BarChart3, title: "Sales and Profit Reports", desc: "See revenue, margins, top-selling products, and store performance in real time." },
  { icon: UserCog, title: "Staff Permissions", desc: "Control access for cashiers, technicians, branch managers, and admins." },
  { icon: TrendingUp, title: "Margin Visibility", desc: "Track profit by device, accessory, repair, and salesperson." },
  { icon: Building2, title: "Multi-Branch Ready", desc: "Run multiple phone shops with centralized visibility and stock transfer support.", path: "/multi-branch-pos-system" },
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
            Everything You Need in a <span className="text-primary">Mobile Shop POS System</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc">
            Cellivo combines <Link to="/billing-software-for-mobile-shop" className="text-primary underline underline-offset-4 hover:text-primary/80">POS billing</Link>, inventory, <Link to="/imei-tracking-pos-system" className="text-primary underline underline-offset-4 hover:text-primary/80">IMEI and serial tracking</Link>, <Link to="/mobile-repair-management-software" className="text-primary underline underline-offset-4 hover:text-primary/80">repairs</Link>, reporting, and staff control in one phone shop software platform for stores that need a stronger POS system for phone shop teams.
          </p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 text-center">
          Looking for a complete solution?{" "}
          <Link to="/mobile-shop-pos-system" className="text-primary underline underline-offset-4 hover:text-primary/80">
            Explore the full mobile shop POS system →
          </Link>
        </p>

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
              <h3 className="font-heading font-semibold text-foreground mb-1 md:mb-1.5 text-sm">
                {f.path ? (
                  <Link to={f.path} className="hover:text-primary transition-colors">
                    {f.title}
                  </Link>
                ) : (
                  f.title
                )}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-3">
          <Link to="/features">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
              Explore All Features <ArrowRight className="ml-2" size={15} />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground">Phone shop billing, IMEI tracking, repairs, and inventory in one system.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
