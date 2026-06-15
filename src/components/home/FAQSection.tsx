import SectionWrapper from "@/components/SectionWrapper";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, CreditCard } from "lucide-react";

export const homeFaqs = [
  { q: "Do I need a credit card to sign up?", a: "No. You can start your free trial without entering card details." },
  { q: "How fast can I actually start?", a: "Most phone shops can create an account and start using billing, stock, and repair workflows in minutes." },
  { q: "Is this built specifically for phone shops?", a: "Yes. Cellivo is designed for mobile phone stores, accessory sellers, and repair shops, with IMEI tracking and repair management built in." },
  { q: "How does IMEI and serial number tracking work?", a: "Each phone can be recorded with its IMEI or serial number so you can track stock, sales, warranty, and returns accurately." },
  { q: "Can it handle both phone sales and repairs?", a: "Yes. Cellivo includes POS billing, repair intake, technician workflows, repair invoicing, and customer tracking." },
  { q: "Can I cancel anytime?", a: "Yes. You can manage or cancel your subscription according to your plan terms." },
  { q: "Does it work on my phone and tablet?", a: "Yes. Cellivo is cloud-based and works across desktop, tablet, and mobile devices." },
  { q: "What if I have multiple shop locations?", a: "Cellivo supports multi-branch operations, including stock control, branch visibility, and centralized reporting." },
];

const FAQSection = () => (
  <SectionWrapper className="bg-secondary/40">
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">FAQ</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Common Questions from <span className="text-primary">Phone Shop Owners</span>
      </h2>
      <div className="premium-divider" />
      <p className="section-header-desc">
        Cellivo helps mobile phone shops improve billing speed, stock accuracy, and repair visibility without complicated setup.
      </p>
    </div>

    <div className="max-w-3xl mx-auto">
      <div className="space-y-3">
        {homeFaqs.map((faq, i) => (
          <article key={i} className="bg-white border border-border rounded-xl px-5 py-4">
            <h3 className="text-sm font-medium text-foreground">{faq.q}</h3>
            <p className="faq-answer text-sm text-muted-foreground leading-relaxed mt-2">{faq.a}</p>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/pricing">
          <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12 rounded-xl text-sm">
            Start Free Now <ArrowRight className="ml-2" size={15} />
          </Button>
        </Link>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><CreditCard size={11} />No credit card</span>
          <span className="flex items-center gap-1.5"><Zap size={11} />Ready in 2 min</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} />Cancel anytime</span>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default FAQSection;
