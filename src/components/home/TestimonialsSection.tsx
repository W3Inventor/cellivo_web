import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al-Rashidi",
    role: "Owner — PhoneZone Store (2 branches)",
    text: "I signed up during my lunch break and was billing customers by the afternoon. No IT guy, no setup calls. The IMEI stock control alone saved me hours every week.",
    result: "80% fewer stock discrepancies",
  },
  {
    name: "Sarah Chen",
    role: "Manager — MobileFix Repair Hub",
    text: "We tried three other POS systems before Cellivo. They all needed 'onboarding calls.' Cellivo? I created an account, added our repair categories, and my team was using it the same day.",
    result: "Zero lost repair tickets",
  },
  {
    name: "James Okonkwo",
    role: "CEO — MultiCell Retail (5 locations)",
    text: "I set up all 5 branches in one evening. Each branch manager created their account, I assigned roles, and we were live everywhere by the next morning.",
    result: "15% margin recovery on accessories",
  },
];

const TestimonialsSection = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">What Shop Owners Say</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Real Results from <span className="text-primary">Real Phone Shops</span>
      </h2>
      <div className="premium-divider" />
    </div>

    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="border border-border rounded-xl p-6 hover-lift relative flex flex-col bg-white"
        >
          <Quote size={20} className="text-border absolute top-5 right-5" />
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">"{t.text}"</p>
          <div className="bg-primary/5 rounded-lg px-3 py-2 mb-5">
            <p className="text-xs font-medium text-primary">{t.result}</p>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default TestimonialsSection;
