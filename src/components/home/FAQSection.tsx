import SectionWrapper from "@/components/SectionWrapper";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, CreditCard } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do I need a credit card to sign up?", a: "No. Create your account with just an email and password. You get full access instantly." },
  { q: "How fast can I actually start?", a: "Under 2 minutes. Sign up, add a few products, and you're billing customers." },
  { q: "Is this built specifically for phone shops?", a: "Yes — and only for phone shops. IMEI-based stock control, repair management, accessories inventory, and phone-specific reporting." },
  { q: "How does IMEI / serial number tracking work?", a: "Scan or enter the IMEI when a phone enters your shop. The system tracks it through inventory and logs it on the invoice when sold." },
  { q: "Can it handle both phone sales and repairs?", a: "Absolutely. POS, inventory, and repair modules are fully connected in one system." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel from your account settings whenever you want." },
  { q: "Does it work on my phone and tablet?", a: "Yes. Cloud-based, works on any device with a browser." },
  { q: "What if I have multiple shop locations?", a: "The system supports unlimited branches from one account with centralized dashboard." },
];

const FAQSection = () => (
  <SectionWrapper className="bg-secondary/40">
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">Questions?</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Everything You Need to Know
      </h2>
      <div className="premium-divider" />
    </div>

    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-border rounded-xl px-5 data-[state=open]:shadow-sm transition-shadow">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-12">
        <Link to="/contact">
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
