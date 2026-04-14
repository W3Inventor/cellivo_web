import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Zap, ShieldCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); toast.success("Thank you! We'll get back to you within 24 hours."); (e.target as HTMLFormElement).reset(); }, 1500); };

  return (
    <Layout>
      <SEOHead
        title="Contact Cellivo — Get Started or Get in Touch"
        description="Start your free trial or contact the Cellivo team for enterprise features, custom integrations, or support. No credit card required."
        canonical="https://cellivo.lovable.app/contact"
      />
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="section-header-label">Get Started or Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground">Start Using Cellivo <span className="text-primary">Right Now</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">Create your free account and start managing your shop in minutes. Or send us a message for enterprise features or custom needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl">Start Free Trial <ArrowRight className="ml-2" size={16} /></Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[{ icon: Zap, text: "Instant access" }, { icon: ShieldCheck, text: "No credit card required" }, { icon: Globe, text: "Works on any device" }].map((item) => (
                <div key={item.text} className="flex items-center gap-2"><item.icon size={14} className="text-muted-foreground/50" /><span>{item.text}</span></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <SectionWrapper>
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border rounded-2xl p-6 md:p-8 space-y-6 bg-white">
            <div><h3 className="font-heading font-semibold text-foreground text-lg mb-1">Have Questions? Contact Us</h3><p className="text-sm text-muted-foreground">For enterprise inquiries, custom integrations, or support.</p></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label><Input required placeholder="Your name" className="border-border" /></div>
              <div><label className="text-sm font-medium text-foreground mb-2 block">Email *</label><Input required type="email" placeholder="you@company.com" className="border-border" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-2 block">Phone</label><Input type="tel" placeholder="+1 (555) 000-0000" className="border-border" /></div>
              <div><label className="text-sm font-medium text-foreground mb-2 block">Shop Name</label><Input placeholder="Your shop name" className="border-border" /></div>
            </div>
            <div><label className="text-sm font-medium text-foreground mb-2 block">Topic *</label><Select><SelectTrigger className="border-border"><SelectValue placeholder="Select a topic" /></SelectTrigger><SelectContent><SelectItem value="enterprise">Enterprise pricing</SelectItem><SelectItem value="integration">Custom integration</SelectItem><SelectItem value="support">Technical support</SelectItem><SelectItem value="partnership">Partnership</SelectItem><SelectItem value="other">Something else</SelectItem></SelectContent></Select></div>
            <div><label className="text-sm font-medium text-foreground mb-2 block">Message *</label><Textarea required rows={4} placeholder="Tell us how we can help..." className="border-border" /></div>
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 w-full sm:w-auto rounded-xl">{loading ? "Sending..." : "Send Message"} <ArrowRight className="ml-2" size={16} /></Button>
          </motion.form>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <div className="border border-foreground/10 rounded-xl p-6 bg-foreground text-white">
              <h3 className="font-heading font-semibold mb-3">Prefer Self-Service?</h3>
              <p className="text-sm text-white/60 mb-4">Most users just create an account and start instantly.</p>
              <Link to="/signup">
                <Button className="w-full bg-white text-foreground hover:bg-white/90 font-medium rounded-xl h-10">Start Free Trial <ArrowRight className="ml-2" size={14} /></Button>
              </Link>
              <p className="text-[10px] text-white/40 text-center mt-2">No credit card. Ready in minutes.</p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-white">
              <h3 className="font-heading font-semibold text-foreground mb-4 text-sm">Contact Directly</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3"><Mail size={15} className="text-muted-foreground/50 mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Email</p>hello@cellivo.com</div></li>
                <li className="flex items-start gap-3"><Phone size={15} className="text-muted-foreground/50 mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Phone</p>+1 (555) 000-0000</div></li>
                <li className="flex items-start gap-3"><MapPin size={15} className="text-muted-foreground/50 mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Office</p>Business District, City</div></li>
              </ul>
            </div>
            <div className="border border-border rounded-xl p-6 bg-white">
              <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={15} className="text-green-500" /><h3 className="font-heading font-semibold text-foreground text-sm">500+ Shops Trust Us</h3></div>
              <p className="text-sm text-muted-foreground">Phone shops across 12 countries use Cellivo daily.</p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Contact;
