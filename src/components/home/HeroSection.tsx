import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ShieldCheck, Zap, CreditCard } from "lucide-react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yDashboard = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFloat3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.97]);
  const dashboardRotateX = useTransform(scrollYProgress, [0, 0.5], [2, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      <motion.div style={{ opacity, scale }} className="container mx-auto px-4 lg:px-8 relative z-10 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1fr,1.15fr] gap-12 lg:gap-20 items-center">
          <div className="lg:contents">
            <motion.div style={{ y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? yText : 0 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-secondary/60 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[11px] md:text-xs font-medium text-muted-foreground">Used by 500+ Phone Shops Worldwide</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-heading font-bold leading-[1.08] mb-6 md:mb-7 tracking-tight text-foreground">
                  The Complete POS for{" "}
                  <span className="text-primary">Mobile Phone Shops</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-lg">
                  All-in-one POS software for phone shops to manage sales, inventory, repairs, and staff — start your free trial today.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-3.5 mb-8 md:mb-10">
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-7 md:px-8 h-12 md:h-13 text-sm md:text-base rounded-xl">
                      Start Free Trial <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-secondary font-medium px-7 md:px-8 h-12 md:h-13 text-sm md:text-base text-foreground rounded-xl">
                      <Play size={14} className="mr-2" /> Book Demo
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-6 sm:gap-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><CreditCard size={14} className="text-muted-foreground/60 shrink-0" /><span>No credit card required</span></div>
                  <div className="flex items-center gap-2"><Zap size={14} className="text-muted-foreground/60 shrink-0" /><span>Instant access</span></div>
                  <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-muted-foreground/60 shrink-0" /><span>Works on any device</span></div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative hidden lg:block" style={{ perspective: "1200px" }}>
            <motion.div style={{ y: yDashboard, rotateX: dashboardRotateX, scale: dashboardScale }} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="rounded-2xl border border-border bg-white shadow-xl shadow-black/[0.04] origin-bottom">
              <div className="rounded-2xl overflow-hidden p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 h-6 bg-secondary rounded-md mx-12" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Today's Sales", value: "$12,450", change: "+18% vs yesterday" },
                    { label: "Phones in Stock", value: "342", change: "5 below reorder" },
                    { label: "Repairs Pending", value: "12", change: "3 ready for pickup" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-secondary/70 rounded-xl p-3.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                      <p className="text-lg font-semibold text-foreground mt-1">{kpi.value}</p>
                      <span className="text-[10px] text-green-600 font-medium">{kpi.change}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Revenue This Week</span>
                    <span className="text-[10px] text-primary font-medium">$48,290 total</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 55, 35, 70, 60, 85, 45, 90, 65, 78, 50, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-primary/10 relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 rounded-t bg-primary/50" style={{ height: `${65 + i * 2}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/70 rounded-xl p-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Last 3 Sales</span>
                    <div className="mt-2 space-y-2">
                      {[{ name: "iPhone 15 Pro", price: "$1,199" }, { name: "Galaxy S24", price: "$899" }, { name: "Pixel 8", price: "$699" }].map((sale) => (
                        <div key={sale.name} className="flex justify-between items-center">
                          <span className="text-[11px] text-foreground/70">{sale.name}</span>
                          <span className="text-[10px] text-primary font-medium">{sale.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-secondary/70 rounded-xl p-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Reorder Needed</span>
                    <div className="mt-2 space-y-2">
                      {["Screen Protectors", "USB-C Cables", "AirPods Pro"].map((item) => (
                        <div key={item} className="flex justify-between items-center">
                          <span className="text-[11px] text-foreground/70">{item}</span>
                          <span className="text-[10px] text-amber-600 font-medium">Low</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: yFloat3 }} initial={{ opacity: 0, x: 15, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1, duration: 0.6 }} className="absolute -top-4 -right-6 bg-white border border-border shadow-lg shadow-black/[0.04] p-3.5 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                  <span className="text-primary text-xs font-semibold font-mono">#</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">IMEI Scanned</p>
                  <p className="text-[11px] text-muted-foreground font-mono">354832091...</p>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: yFloat2 }} initial={{ opacity: 0, x: -15, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute -bottom-6 -left-8 bg-white border border-border shadow-lg shadow-black/[0.04] p-3.5 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Invoice #1247 Paid</p>
                  <p className="text-[11px] text-green-600 font-medium">$899 — Auto-receipt sent</p>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: yFloat1 }} initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-16 -right-4 bg-white border border-border shadow-lg shadow-black/[0.04] p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-medium text-foreground">Screen repair — 65% done</span>
              </div>
            </motion.div>

            <motion.div style={{ y: yFloat3 }} initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.6, duration: 0.6 }} className="absolute top-1/2 -left-10 bg-white border border-border shadow-lg shadow-black/[0.04] p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="text-green-600 text-[10px] font-semibold">↑</span>
                </div>
                <span className="text-[11px] font-medium text-foreground">Profit +22% this week</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
