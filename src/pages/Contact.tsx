import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Zap, ShieldCheck, Globe, Check, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import {
  BUSINESS_ADDRESS_DISPLAY,
  BUSINESS_EMAIL,
  BUSINESS_MAP_EMBED_URL,
  BUSINESS_MAP_URL,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_RAW,
  LOCAL_BUSINESS_SCHEMA,
} from "@/lib/business-info";

const contactFaqs = [
  {
    question: "How quickly can I start using Cellivo?",
    answer:
      "Most phone shops can start using Cellivo within minutes by creating an account, setting up products, and beginning billing and day-to-day operations right away.",
  },
  {
    question: "Does Cellivo support phone shops in Sri Lanka?",
    answer:
      "Yes. Cellivo supports phone shops across Sri Lanka with billing, IMEI tracking, inventory, repair management, and day-to-day support for mobile retailers.",
  },
  {
    question: "Can I get help setting up my POS system?",
    answer:
      "Yes. Our team can help you understand setup, organize your inventory, and get your POS system ready for real store workflows.",
  },
  {
    question: "Does Cellivo support multi-branch shops?",
    answer:
      "Yes. Cellivo supports multi-branch phone shops with centralized visibility, stock control, staff access, and reporting across locations.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes. You can start a free trial and explore how Cellivo helps manage billing, inventory, repairs, and customers from one system.",
  },
];

const countryOptions = [
  { value: "LK", label: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { value: "IN", label: "India", dialCode: "+91", flag: "🇮🇳" },
  { value: "BD", label: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { value: "NP", label: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { value: "PK", label: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { value: "SG", label: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { value: "MY", label: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { value: "TH", label: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { value: "AE", label: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { value: "SA", label: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { value: "QA", label: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { value: "KW", label: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { value: "OM", label: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { value: "BH", label: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { value: "GB", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { value: "US", label: "United States", dialCode: "+1", flag: "🇺🇸" },
  { value: "CA", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { value: "AU", label: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { value: "NZ", label: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { value: "ZA", label: "South Africa", dialCode: "+27", flag: "🇿🇦" },
];

const contactStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...LOCAL_BUSINESS_SCHEMA,
  },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0].value);
  const [phoneNumber, setPhoneNumber] = useState("");
  const activeCountry = countryOptions.find((country) => country.value === selectedCountry) ?? countryOptions[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "We could not send your message right now.");
      }

      toast.success(data.message || "Thank you! We'll get back to you within 24 hours.");
      form.reset();
      setPhoneNumber("");
      setSelectedCountry(countryOptions[0].value);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not send your message right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SonnerToaster />
      <SEOHead
        title="Contact Cellivo | POS System for Phone Shops in Sri Lanka"
        description="Contact Cellivo to start a phone shop POS with billing, IMEI tracking, inventory control, repair management, support, and fast setup guidance."
        canonical="https://cellivo.com/contact"
        structuredData={contactStructuredData}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-header-label">Get Started or Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground">Contact Us to Start Using a <span className="text-primary">POS System for Your Phone Shop</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">Start your free trial or contact our team to learn how Cellivo helps phone shops manage billing, inventory, IMEI tracking, and repairs in one system.</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Looking for a POS system focused on faster billing and checkout?{" "}
              <Link to="/pos-system-for-phone-shop" className="text-primary underline underline-offset-4 hover:text-primary/80">
                Explore POS for Phone Shops →
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/pricing">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl">Start Free Trial <ArrowRight className="ml-2" size={16} /></Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[{ icon: Zap, text: "Instant access" }, { icon: ShieldCheck, text: "No credit card required" }, { icon: Globe, text: "Works on any device" }].map((item) => (
                <div key={item.text} className="flex items-center gap-2"><item.icon size={14} className="text-muted-foreground/50" /><span>{item.text}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SectionWrapper className="pt-0">
        <div className="max-w-3xl mb-8">
          <p className="text-base text-muted-foreground leading-relaxed">Have a question or need help setting up your POS system? Send us a message and our team will respond quickly.</p>
        </div>
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-6">
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border rounded-2xl p-6 md:p-8 space-y-6 bg-white">
              <div><h3 className="font-heading font-semibold text-foreground text-lg mb-1">Have Questions? Contact Us</h3><p className="text-sm text-muted-foreground">For enterprise inquiries, custom integrations, or support.</p></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label><Input required name="fullName" placeholder="Your name" className="border-border" /></div>
                <div><label className="text-sm font-medium text-foreground mb-2 block">Email *</label><Input required name="email" type="email" placeholder="you@company.com" className="border-border" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block" htmlFor="contact-phone">
                    Phone *
                  </label>
                  <input type="hidden" name="countryCode" value={activeCountry.dialCode} />
                  <input type="hidden" name="countryIso" value={activeCountry.value} />
                  <input type="hidden" name="countryName" value={activeCountry.label} />
                  <div className="flex h-10 items-center rounded-md border border-border bg-background transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          aria-label="Choose country"
                          aria-expanded={countryPickerOpen}
                          className="flex h-full min-w-[68px] shrink-0 items-center justify-center gap-2 rounded-l-md px-3 text-foreground transition-colors hover:bg-secondary/40 focus-visible:outline-none"
                        >
                          <span className="text-lg leading-none">{activeCountry.flag}</span>
                          <ChevronDown size={14} className="text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-[320px] p-0">
                        <Command>
                          <CommandInput placeholder="Search country or code..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {countryOptions.map((country) => (
                                <CommandItem
                                  key={country.value}
                                  value={`${country.label} ${country.dialCode} ${country.value}`}
                                  onSelect={() => {
                                    setSelectedCountry(country.value);
                                    setCountryPickerOpen(false);
                                  }}
                                  className="flex items-center gap-3 rounded-none px-3 py-2.5"
                                >
                                  <span className="text-xl leading-none">{country.flag}</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-foreground">{country.label}</p>
                                    <p className="text-xs text-muted-foreground">{country.dialCode}</p>
                                  </div>
                                  <Check
                                    size={16}
                                    className={selectedCountry === country.value ? "text-primary" : "text-transparent"}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <span className="h-5 w-px bg-border" />
                    <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                      <span className="shrink-0 text-sm font-medium text-muted-foreground">
                        {activeCountry.dialCode}
                      </span>
                      <Input
                        id="contact-phone"
                        required
                        name="phoneNumber"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        className="h-full border-0 px-0 py-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>
                <div><label className="text-sm font-medium text-foreground mb-2 block">Shop Name</label><Input name="shopName" placeholder="Your shop name" className="border-border" /></div>
              </div>
              <div><label className="text-sm font-medium text-foreground mb-2 block">Topic *</label><Select name="topic" required><SelectTrigger className="border-border"><SelectValue placeholder="Select a topic" /></SelectTrigger><SelectContent><SelectItem value="enterprise">Enterprise pricing</SelectItem><SelectItem value="integration">Custom integration</SelectItem><SelectItem value="support">Technical support</SelectItem><SelectItem value="partnership">Partnership</SelectItem><SelectItem value="other">Something else</SelectItem></SelectContent></Select></div>
              <div><label className="text-sm font-medium text-foreground mb-2 block">Message *</label><Textarea required name="message" rows={4} placeholder="Tell us how we can help..." className="border-border" /></div>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 w-full sm:w-auto rounded-xl">{loading ? "Sending..." : "Send Message"} <ArrowRight className="ml-2" size={16} /></Button>
            </motion.form>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border rounded-2xl p-6 md:p-8 bg-secondary/30">
              <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Why Phone Shops Choose Cellivo</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  "500+ phone shops trust Cellivo",
                  "Used in 12+ countries",
                  "Instant setup",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-white px-4 py-4 text-sm font-medium text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <div className="border border-foreground/10 rounded-xl p-6 bg-foreground text-white">
              <h3 className="font-heading font-semibold mb-3">Prefer Self-Service?</h3>
              <p className="text-sm text-white/60 mb-4">Most users just create an account and start instantly.</p>
              <Link to="/pricing">
                <Button className="w-full bg-white text-foreground hover:bg-white/90 font-medium rounded-xl h-10">Start Free Trial <ArrowRight className="ml-2" size={14} /></Button>
              </Link>
              <p className="text-[10px] text-white/40 text-center mt-2">No credit card. Ready in minutes.</p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-white">
              <h3 className="font-heading font-semibold text-foreground mb-4 text-sm">Contact Directly</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3"><Mail size={15} className="text-muted-foreground/50 mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Email</p><a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-primary">{BUSINESS_EMAIL}</a></div></li>
                <li className="flex items-start gap-3"><Phone size={15} className="text-muted-foreground/50 mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Phone</p><a href={`tel:${BUSINESS_PHONE_RAW}`} className="hover:text-primary">{BUSINESS_PHONE_DISPLAY}</a></div></li>
                <li className="flex items-start gap-3"><MapPin size={15} className="text-muted-foreground/50 mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Address</p><a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{BUSINESS_ADDRESS_DISPLAY}</a></div></li>
              </ul>
            </div>
            <div className="border border-border rounded-xl p-3 bg-white overflow-hidden">
              <iframe
                title="Cellivo office location in Pannipitiya"
                src={BUSINESS_MAP_EMBED_URL}
                className="w-full h-[260px] rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="border border-border rounded-xl p-6 bg-white">
              <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={15} className="text-green-500" /><h3 className="font-heading font-semibold text-foreground text-sm">500+ Shops Trust Us</h3></div>
              <p className="text-sm text-muted-foreground">Phone shops across 12 countries use Cellivo daily.</p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
      <SectionWrapper className="py-12 md:py-16 lg:py-16">
        <div className="max-w-4xl">
          <span className="section-header-label">Sri Lanka Support</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-3 mb-6">POS System Support for Phone Shops in Sri Lanka</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Cellivo supports phone shops across Sri Lanka with a complete <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">mobile shop POS system</Link> designed for mobile retailers, repair centers, and accessory stores.</p>
          <p className="text-muted-foreground leading-relaxed">Whether you need help setting up your system, managing your <Link to="/inventory-management-system" className="text-primary hover:underline">inventory system</Link>, or improving <Link to="/mobile-repair-management-software" className="text-primary hover:underline">repair management</Link>, our team is ready to support your business from {BUSINESS_ADDRESS_DISPLAY}.</p>
        </div>
      </SectionWrapper>
      <SectionWrapper className="py-12 md:py-16 lg:py-16">
        <div className="max-w-4xl">
          <span className="section-header-label">Authority</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-3 mb-6">Built by W3Inventor</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Cellivo is developed by W3Inventor, a Sri Lanka-based software company focused on building high-performance systems for growing businesses.</p>
          <p className="text-muted-foreground leading-relaxed">Our team works closely with real phone shop owners to ensure Cellivo solves real-world operational challenges, including <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">IMEI tracking</Link>, billing, repairs, and inventory control.</p>
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-header-label">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5">Common Questions About Contacting Cellivo</h2>
            <p className="text-muted-foreground leading-relaxed">Get answers about setup, support, free trial access, and how Cellivo helps phone shops across Sri Lanka and beyond.</p>
          </div>
          <div className="space-y-4">
            {contactFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
                <h3 className="font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
                <div className="faq-answer text-sm md:text-base text-muted-foreground leading-relaxed">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Contact;
