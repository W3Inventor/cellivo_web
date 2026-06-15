import { useRef } from "react";
import { motion, useScroll, useTransform } from "@/components/LightMotion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const yRight = useTransform(scrollYProgress, [0, 1], [40, -30]);

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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div style={{ y: yLeft }}>
            <span className="section-header-label">The Problem We Solve</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              Most Phone Shops Are Running on{" "}
              <span className="text-primary">Spreadsheets and Guesswork</span>
            </h2>
            <div className="premium-divider !mx-0" />
            <p className="text-muted-foreground leading-relaxed mb-5">
              You're tracking IMEI numbers in Excel. Repair tickets are on sticky notes. You don't know which accessories are running low until a customer asks for one.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cellivo replaces all of that with one system you can start using instantly. No installation, no waiting for setup. <strong className="text-foreground font-medium">Sign up and your shop is online in minutes.</strong>
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: "500+", label: "Phone Shops Using It" },
                { value: "2M+", label: "Devices Tracked" },
                { value: "50K+", label: "Invoices Per Month" },
                { value: "99.9%", label: "System Uptime" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="border border-border rounded-xl p-5 text-center hover-lift"
                >
                  <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <Link to="/contact">
              <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6 h-11 rounded-xl">
                Try It Free — No Credit Card <ArrowRight className="ml-2" size={15} />
              </Button>
            </Link>
          </motion.div>

          <motion.div style={{ y: yRight }}>
            <div className="border border-border rounded-2xl p-8 bg-secondary/30">
              <div className="space-y-4">
                {[
                  { title: "Before", text: "IMEI numbers in spreadsheets. Lost repair tickets. No idea which products are profitable. Slow billing.", highlight: false },
                  { title: "After", text: "Every device tracked by IMEI. Repairs managed from intake to pickup. Live profit dashboards. 30-second checkout.", highlight: true },
                  { title: "Result", text: "Phone shop owners save 2+ hours per day, reduce stock errors by 80%, and see their profit margins clearly.", highlight: false },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`rounded-xl p-5 ${item.highlight ? 'bg-primary/5 border border-primary/15' : 'bg-white border border-border'}`}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${item.highlight ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                        {i + 1}
                      </div>
                      <h4 className="font-heading font-semibold text-foreground text-sm">{item.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-10">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
