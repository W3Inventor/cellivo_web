import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yCard = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section ref={ref} className="section-padding relative">
      <motion.div style={{ y: yCard }} className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-foreground rounded-2xl md:rounded-3xl p-8 md:p-14 lg:p-20 text-center max-w-4xl mx-auto">
          <span className="text-xs font-medium text-white/50 uppercase tracking-[0.2em] mb-4 block">Ready to Get Started?</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 md:mb-6 leading-[1.1]">
            Start Managing Your Phone Shop Today.
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8">
            Join 500+ phone shop owners who run their entire business on Cellivo. Create your free account and start in minutes.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-white/50">
            {["No credit card required", "Instant access", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={13} className="shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-foreground hover:bg-white/90 font-medium px-8 md:px-10 h-12 md:h-13 text-sm md:text-base rounded-xl">
                Start Free Now <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="inverseOutline" className="w-full sm:w-auto font-medium px-8 md:px-10 h-12 md:h-13 text-sm md:text-base rounded-xl">
                View Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
