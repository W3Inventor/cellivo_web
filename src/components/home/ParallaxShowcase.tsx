import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ParallaxShowcase = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yDashboard = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yInvoice = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const yRepair = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const yImei = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const yAccessory = useTransform(scrollYProgress, [0, 1], [130, -30]);
  const yNotif = useTransform(scrollYProgress, [0, 1], [30, -130]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.97]);
  const dashboardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -0.5]);

  const yMobileDash = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yMobileCard = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-36 overflow-hidden relative bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-20">
          <span className="section-header-label">See It in Action</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Your Entire Shop on <span className="text-primary">One Screen</span>
          </h2>
          <div className="premium-divider" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
            Sales, stock, repairs, invoices, and IMEI-based stock control — everything works the moment you sign up.
          </p>
        </motion.div>

        {/* Desktop parallax */}
        <motion.div style={{ opacity }} className="hidden md:block relative max-w-5xl mx-auto h-[640px]">
          <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-3xl" style={{ perspective: "1200px" }}>
            <motion.div style={{ y: yDashboard, scale: dashboardScale, rotateX: dashboardRotate }} className="origin-bottom">
              <div className="bg-white border border-border rounded-2xl shadow-xl shadow-black/[0.04] p-1">
                <div className="rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] text-muted-foreground ml-3 tracking-wider uppercase">Live Dashboard</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Today's Revenue", value: "$48,290", change: "+12%" },
                      { label: "Phones Sold", value: "156", change: "+8%" },
                      { label: "Repairs Closed", value: "43", change: "+15%" },
                      { label: "Repeat Customers", value: "67", change: "+22%" },
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-secondary/60 rounded-xl p-3.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                        <p className="text-lg font-semibold text-foreground mt-1">{kpi.value}</p>
                        <span className="text-[10px] text-green-600 font-medium">{kpi.change}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-secondary/40 rounded-xl p-4 h-32 flex items-end gap-1.5">
                    {[40, 55, 35, 70, 60, 80, 45, 90, 65, 75, 50, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/8 rounded-t" style={{ height: `${h}%` }}>
                        <div className="w-full bg-primary/40 rounded-t" style={{ height: `${55 + i * 3}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ y: yInvoice }} className="absolute left-2 top-48 w-56">
            <div className="bg-white border border-border rounded-xl p-4 shadow-lg shadow-black/[0.04]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-foreground">Invoice #2847</p>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Paid</span>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>iPhone 15 Pro</span><span className="text-foreground/70">$1,199</span></div>
                <div className="flex justify-between"><span>Tempered Glass</span><span className="text-foreground/70">$29</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-medium text-foreground">
                  <span>Total</span><span className="text-primary">$1,277</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yRepair }} className="absolute right-2 top-52 w-52">
            <div className="bg-white border border-border rounded-xl p-4 shadow-lg shadow-black/[0.04]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-medium text-foreground">Repair #R-482</p>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Device</span><span className="text-foreground/70">Galaxy S24 Ultra</span></div>
                <div className="flex justify-between"><span>Status</span><span className="text-amber-600 font-medium">In Progress</span></div>
              </div>
              <div className="mt-3 w-full bg-secondary rounded-full h-1.5">
                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yImei }} className="absolute right-20 top-2 w-48">
            <div className="bg-white border border-border rounded-xl p-3.5 shadow-lg shadow-black/[0.04]">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">IMEI Verified</p>
              <p className="text-xs font-mono text-primary">354832091847562</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[11px] text-green-600 font-medium">Clean — Ready to sell</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yAccessory }} className="absolute left-16 top-4 w-44">
            <div className="bg-white border border-border rounded-xl p-3.5 shadow-lg shadow-black/[0.04]">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Reorder Alert</p>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-foreground/70">USB-C Cables</span>
                  <span className="text-amber-600 font-medium">3 left</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-foreground/70">AirPods Pro</span>
                  <span className="text-red-500 font-medium">Out</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yNotif }} className="absolute right-12 bottom-20 w-44">
            <div className="bg-white border border-border rounded-xl p-3 shadow-lg shadow-black/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center shrink-0">
                  <span className="text-primary text-[10px] font-semibold">$</span>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-foreground">Sale Logged</p>
                  <p className="text-[10px] text-muted-foreground">Galaxy S24 — $1,049</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: yNotif }} className="absolute left-6 bottom-16 w-44">
            <div className="bg-white border border-border rounded-xl p-3 shadow-lg shadow-black/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-[11px] font-medium text-foreground">Repair Ready</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 pl-4">SMS sent to customer</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          <motion.div style={{ y: yMobileDash }}>
            <div className="bg-white border border-border rounded-2xl shadow-sm p-1">
              <div className="rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[9px] text-muted-foreground ml-2 uppercase tracking-wider">Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: "Revenue", value: "$48,290", change: "+12%" },
                    { label: "Phones Sold", value: "156", change: "+8%" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-secondary/60 rounded-lg p-3">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                      <p className="text-base font-semibold text-foreground mt-1">{kpi.value}</p>
                      <span className="text-[9px] text-green-600 font-medium">{kpi.change}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary/40 rounded-lg p-3 h-20 flex items-end gap-1">
                  {[40, 55, 35, 70, 60, 80, 45, 90].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/8 rounded-t" style={{ height: `${h}%` }}>
                      <div className="w-full bg-primary/40 rounded-t" style={{ height: `${55 + i * 3}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div style={{ y: yMobileCard }}>
              <div className="bg-white border border-border rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-medium text-foreground">Invoice #2847</p>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Paid</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-medium text-foreground text-xs">
                  <span>Total</span><span className="text-primary">$1,277</span>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ y: yMobileCard }}>
              <div className="bg-white border border-border rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <p className="text-[11px] font-medium text-foreground">Repair #R-482</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/contact">
            <Button className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
              Try It Free <ArrowRight className="ml-2" size={15} />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3">No credit card required. Start in minutes.</p>
        </div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
