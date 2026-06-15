import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "@/components/LightMotion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const kpis = [
  { label: "Today's Sales", value: "$4,890", change: "+18% vs yesterday", color: "text-green-700" },
  { label: "Phones in Stock", value: "342", change: "5 need reorder", color: "text-amber-700" },
  { label: "Repairs in Queue", value: "12", change: "3 ready for pickup", color: "text-primary" },
  { label: "This Month's Profit", value: "$28,450", change: "+22% vs last month", color: "text-green-700" },
];

const benefits = [
  "Track daily revenue from your mobile shop POS",
  "Monitor low stock across phones and accessories",
  "Follow repair jobs from intake to delivery",
  "See actual profit, not just sales totals",
  "Review staff and branch performance",
  "Find your best-selling and slow-moving products",
];

const DashboardSection = () => {
  const ref = useRef(null);
  const [enableParallax, setEnableParallax] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const yDashboard = useTransform(scrollYProgress, [0, 1], [40, -30]);

  useEffect(() => {
    const updateParallaxState = () => setEnableParallax(window.innerWidth >= 1024);

    updateParallaxState();
    window.addEventListener("resize", updateParallaxState);

    return () => window.removeEventListener("resize", updateParallaxState);
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="section-padding relative"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div style={enableParallax ? { y: yText } : undefined}>
            <span className="section-header-label">Live Store Control</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              See Sales, Stock, Repairs, and <span className="text-primary">Profit in Real Time</span>
            </h2>
            <div className="premium-divider !mx-0" />
            <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8">
              The moment you sign in, your mobile shop management system dashboard shows the numbers that matter: sales, repair queues, low-stock alerts, staff performance, and profit margins.
            </p>
            <ul className="space-y-3 mb-6 md:mb-8">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/pricing">
              <Button className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 font-medium px-6 h-11 rounded-xl">
                Start Free — See Your Dashboard <ArrowRight className="ml-2" size={15} />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            style={enableParallax ? { y: yDashboard } : undefined}
            className="border border-border rounded-2xl bg-white shadow-lg shadow-black/[0.03] p-1"
            role="img"
            aria-label="Cellivo mobile shop POS dashboard with sales, stock, and repairs"
          >
            <div className="rounded-xl p-4 md:p-5">
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                {kpis.map((kpi, i) => (
                  <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06 }} className="bg-secondary/60 rounded-xl p-3 md:p-4">
                    <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                    <p className="text-lg md:text-xl font-semibold text-foreground mt-1">{kpi.value}</p>
                    <span className={`text-[10px] md:text-xs font-medium ${kpi.color}`}>{kpi.change}</span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-secondary/40 rounded-xl p-3 md:p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">Revenue vs Profit</span>
                  <span className="text-[9px] md:text-[10px] text-primary font-medium">Margin: 34%</span>
                </div>
                <div className="flex items-end gap-1.5 md:gap-2.5 h-20 md:h-28">
                  {[45, 62, 38, 78, 55, 90, 72].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary/8 rounded-t relative" style={{ height: `${h}%` }}>
                        <div className="absolute inset-0 bg-primary/30 rounded-t" style={{ height: "70%" }} />
                      </div>
                      <span className="text-[8px] md:text-[10px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardSection;
