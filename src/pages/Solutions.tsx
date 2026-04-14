import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import FinalCTA from "@/components/home/FinalCTA";
import { motion } from "framer-motion";
import { Store, TrendingUp, Wrench, Package, BarChart3 } from "lucide-react";

const solutions = [
  { icon: Store, title: "For Small Phone Shops", desc: "Powerful inventory, billing, and IMEI-based stock control without the complexity.", benefits: ["Fast billing & invoicing", "IMEI-based stock control", "Basic sales reports", "Customer records"] },
  { icon: TrendingUp, title: "For Growing Retailers", desc: "Multi-staff support, detailed analytics, and multi-location capabilities.", benefits: ["Multi-staff with role access", "Advanced reporting", "Multi-branch readiness", "Profit margin analysis"] },
  { icon: Wrench, title: "For Repair Businesses", desc: "Full repair lifecycle — intake, diagnosis, parts, labor, and invoicing.", benefits: ["Full repair lifecycle", "Technician assignment", "Customer updates", "Parts & labor invoicing"] },
  { icon: Package, title: "For Inventory-heavy Shops", desc: "Complete visibility with automated reorder alerts.", benefits: ["Serial/IMEI per device", "Reorder alerts", "Stock movement logs", "Supplier tracking"] },
  { icon: BarChart3, title: "For Better Reporting", desc: "Real-time dashboards for sales, profits, stock, and staff performance.", benefits: ["Daily/weekly reports", "Profit per product", "Staff tracking", "Trend analysis"] },
];

const Solutions = () => (
  <Layout>
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="section-header-label">Solutions</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground">Tailored for <span className="text-primary">Every Phone Business</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Our POS adapts to your specific needs — start free and see for yourself.</p>
        </motion.div>
      </div>
    </section>
    <SectionWrapper>
      <div className="space-y-5">
        {solutions.map((s) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border rounded-xl p-6 md:p-8 hover-lift bg-white">
            <div className="grid md:grid-cols-[1fr_auto] gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"><s.icon size={20} className="text-foreground/60" /></div>
                  <h3 className="font-heading font-semibold text-foreground text-lg">{s.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <div className="bg-secondary/60 rounded-xl p-4 min-w-[200px]">
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">Key Benefits</p>
                <ul className="space-y-2">{s.benefits.map((b) => (<li key={b} className="flex items-center gap-2 text-sm text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />{b}</li>))}</ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
    <FinalCTA />
  </Layout>
);

export default Solutions;
