import FeatureHero from "@/components/FeatureHero";
import FeatureHubLinkSection from "@/components/FeatureHubLinkSection";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  CreditCard,
  Gift,
  Heart,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trustStats = [
  { value: "500+", label: "phone shops using Cellivo" },
  { value: "Thousands+", label: "repeat customers tracked" },
  { value: "Sri Lanka", label: "built for local mobile businesses" },
];

const loyaltyBenefits = [
  {
    icon: Users,
    title: "Know Your Best Customers Instantly",
    desc: "See who buys most often, what they spend on, and which customers are worth protecting with better follow-up and offers.",
  },
  {
    icon: Gift,
    title: "Reward Repeat Buyers Automatically",
    desc: "Give points, rewards, or special offers without manual tracking so every sale can strengthen customer loyalty.",
  },
  {
    icon: Bell,
    title: "Bring Back Customers Who Haven't Visited",
    desc: "Spot inactive customers and send timely promotions before they start buying from another mobile shop.",
  },
  {
    icon: TrendingUp,
    title: "Increase Sales Without Spending More on Ads",
    desc: "Grow repeat business from customers you already acquired instead of depending only on new-customer marketing.",
  },
  {
    icon: Star,
    title: "Turn Every Sale into Future Revenue",
    desc: "Use loyalty points, purchase history, and targeted promotions to keep first-time buyers coming back for phones, accessories, and repairs.",
  },
];

const dashboardHighlights = [
  {
    title: "Customer Profile",
    desc: "See contact details, visit frequency, and total spend in one view.",
    icon: Users,
  },
  {
    title: "Points Balance",
    desc: "Track earned and redeemed loyalty points automatically after each bill.",
    icon: Star,
  },
  {
    title: "Purchase History",
    desc: "Review phones, accessories, and services bought over time.",
    icon: Smartphone,
  },
  {
    title: "Rewards",
    desc: "Offer discounts, VIP perks, and targeted promotions to repeat buyers.",
    icon: Gift,
  },
];

const comparisonRows = [
  {
    manual: "No customer tracking after the sale",
    cellivo: "Full customer history connected to every transaction",
  },
  {
    manual: "No repeat sales strategy",
    cellivo: "Loyalty rewards that encourage return visits automatically",
  },
  {
    manual: "Customers forget your shop after one purchase",
    cellivo: "Automatic retention system to keep your shop top of mind",
  },
  {
    manual: "No clear view of best customers or inactive buyers",
    cellivo: "Instant visibility into repeat buyers and who needs re-engagement",
  },
];

const relatedLinks = [
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
];

const loyaltyFaqs = [
  {
    question: "What is a customer loyalty system?",
    answer:
      "A customer loyalty system helps phone shops track customer activity, reward repeat purchases, and encourage buyers to come back more often.",
  },
  {
    question: "How do loyalty points work?",
    answer:
      "Customers earn points when they buy phones, accessories, or services. Those points can later be redeemed for discounts, rewards, or special offers.",
  },
  {
    question: "Can I track repeat customers?",
    answer:
      "Yes. Cellivo records customer purchase history and visit patterns so you can identify loyal buyers and understand who returns most often.",
  },
  {
    question: "Can I send promotions to customers?",
    answer:
      "Yes. You can use customer history and loyalty behavior to send relevant promotions and bring buyers back to your shop.",
  },
  {
    question: "Does it work with POS billing?",
    answer:
      "Yes. Cellivo connects the loyalty system with POS billing so points, rewards, and customer history update automatically after each sale.",
  },
];

const loyaltyFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: loyaltyFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const loyaltyDashboardPreviewImage =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f8fafc'/%3E%3Crect x='36' y='36' width='1128' height='86' rx='24' fill='%230f172a'/%3E%3Crect x='36' y='160' width='350' height='540' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Ccircle cx='120' cy='245' r='42' fill='%23dbeafe'/%3E%3Crect x='180' y='214' width='140' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='180' y='248' width='110' height='18' rx='9' fill='%23e2e8f0'/%3E%3Crect x='76' y='336' width='270' height='74' rx='22' fill='%23fef3c7'/%3E%3Crect x='76' y='446' width='270' height='74' rx='22' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='76' y='556' width='270' height='74' rx='22' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='430' y='160' width='734' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='470' y='208' width='220' height='20' rx='10' fill='%23dbeafe'/%3E%3Crect x='470' y='250' width='654' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='470' y='294' width='604' height='20' rx='10' fill='%23e2e8f0'/%3E%3Crect x='430' y='450' width='350' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='470' y='498' width='220' height='20' rx='10' fill='%23d1fae5'/%3E%3Crect x='470' y='540' width='270' height='56' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3Crect x='814' y='450' width='350' height='250' rx='28' fill='%23ffffff' stroke='%23cbd5e1'/%3E%3Crect x='854' y='498' width='210' height='20' rx='10' fill='%23fde68a'/%3E%3Crect x='854' y='540' width='270' height='56' rx='18' fill='%23f8fafc' stroke='%23e2e8f0'/%3E%3C/svg%3E";

const CustomerLoyaltySystem = () => (
  <Layout>
    <SEOHead
      title="Customer Loyalty System for Phone Shops | Cellivo"
      description="Customer loyalty system for phone shops with repeat buyer tracking, rewards, purchase history, and retention tools built for mobile retailers."
      canonical="https://cellivo.com/customer-loyalty-system"
      ogTitle="Customer Loyalty System for Phone Shops | Cellivo"
      ogDescription="Track customer purchase history, reward repeat buyers, and increase retention with a loyalty system built for phone shops."
      ogUrl="https://cellivo.com/customer-loyalty-system"
      twitterTitle="Customer Loyalty System for Phone Shops | Cellivo"
      twitterDescription="Loyalty software for phone shops with repeat customer tracking, rewards, and retention tools."
      structuredData={loyaltyFaqStructuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
        { name: "Customer Loyalty System", path: "/customer-loyalty-system" },
      ]}
    />

    <FeatureHero
      badge="Customer Loyalty System"
      painHook={[
        "Still losing customers after one purchase?",
        "No system to bring them back?",
        "Your competitors are building loyalty - you are losing repeat sales.",
      ]}
      title={
        <>
          Turn One-Time Buyers into Loyal Customers Who <span className="text-primary">Keep Coming Back</span>
        </>
      }
      supportText="Track repeat customers, reward loyalty, and increase retention with a customer loyalty system built for phone shops."
      primaryCtaLabel="Start Building Customer Loyalty Smarter"
      trustItems={trustStats}
    />

    <FeatureHubLinkSection />

    <WhyThisMattersSection
      label="Why Loyalty Matters"
      title="Why Phone Shops Need Better Customer Retention"
      problemText="Without a loyalty system, many buyers visit once, forget your store, and return only when another shop offers a better deal or promotion."
      solutionText="Cellivo helps phone shops turn customer history into repeat business with loyalty rewards, return tracking, and smarter customer retention tools."
    />

    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Customer Loyalty Dashboard Preview</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            One Dashboard for Customer Profiles, Rewards, and <span className="text-primary">Repeat Sales</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc max-w-3xl">
            Keep customer history, points, rewards, and repeat-purchase signals in one place so your team always knows how to bring buyers back.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold text-foreground mb-5">What Your Team Can See Instantly</h2>
            <div className="space-y-4">
              {dashboardHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.10)] overflow-hidden"
            role="img"
            aria-label="Customer loyalty dashboard preview showing customer profile, points balance, purchase history, and rewards for a phone shop"
          >
            <img
              src={loyaltyDashboardPreviewImage}
              alt="Customer loyalty system dashboard showing customer profile, points balance, purchase history, and rewards"
              className="sr-only"
              loading="lazy"
            />
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">Loyalty Dashboard</p>
                <h3 className="font-heading font-semibold text-lg">Cellivo Customer Loyalty</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
                <Heart size={13} />
                VIP Customer
              </div>
            </div>

            <div className="bg-slate-50 p-5 md:p-6">
              <div className="grid md:grid-cols-[0.78fr_1.22fr] gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Users size={22} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">Customer Profile</p>
                        <h3 className="text-lg font-heading font-semibold text-slate-900">Amaya Silva</h3>
                        <p className="text-xs text-muted-foreground">6 visits in the last 90 days</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-amber-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-amber-700 mb-1">Points Balance</p>
                      <p className="text-2xl font-heading font-semibold text-slate-900">1,280 pts</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Rewards</h3>
                      <Gift size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl bg-slate-50 px-4 py-3">LKR 2,500 accessory reward unlocked</div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">VIP discount active for next visit</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Purchase History</h3>
                      <Smartphone size={16} className="text-primary" />
                    </div>
                    <div className="space-y-3 text-sm">
                      {[
                        ["iPhone 14 Plus", "March 28, 2026", "LKR 274,000"],
                        ["AirPods Case", "April 6, 2026", "LKR 5,500"],
                        ["Battery Replacement", "April 10, 2026", "LKR 12,000"],
                      ].map(([name, date, amount]) => (
                        <div key={name} className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-900">{name}</p>
                            <p className="text-xs text-muted-foreground">{date}</p>
                          </div>
                          <span className="font-medium text-slate-900">{amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-heading font-semibold text-slate-900">Retention Signal</h3>
                      <TrendingUp size={16} className="text-primary" />
                    </div>
                    <div className="rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 font-medium mb-3">
                      High-value repeat buyer likely to return this month
                    </div>
                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      Suggested promo: 10% off accessories on next visit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12">
        <span className="section-header-label">Why This Loyalty Page Converts</span>
        <h2 className="section-header-title">Benefits Phone Shop Owners Actually Care About</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {loyaltyBenefits.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-border rounded-xl p-5 hover-lift group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
              <item.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">Manual vs Cellivo Loyalty System</span>
          <h2 className="section-header-title">Why Smart Phone Shops Stop Guessing About Repeat Sales</h2>
          <div className="premium-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-destructive font-semibold">Manual Loyalty Tracking</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Hard to track, easy to lose customers</h3>
              </div>
            </div>
            <div className="space-y-3">
              {comparisonRows.map((row) => (
                <div key={row.manual} className="rounded-xl bg-white/80 border border-destructive/10 px-4 py-3 text-sm text-foreground/80">
                  {row.manual}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-primary/5 p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Cellivo Loyalty System</p>
                <h3 className="text-xl font-heading font-semibold text-foreground">Clear customer history with built-in retention</h3>
              </div>
            </div>
            <div className="space-y-3">
              {comparisonRows.map((row) => (
                <div key={row.cellivo} className="rounded-xl bg-white/90 border border-primary/10 px-4 py-3 text-sm text-foreground/85">
                  {row.cellivo}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-4xl mx-auto text-center">
        <span className="section-header-label">SEO Boost</span>
        <h2 className="section-header-title">Customer Loyalty System for Mobile Shops in Sri Lanka</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Cellivo gives phone shops a customer loyalty system that helps track buyer history, reward repeat visits, and grow retention without extra manual work. If you need a loyalty program for phone shops or customer retention software Sri Lanka businesses can use to increase repeat revenue, this page is built for that search intent.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          It also works seamlessly with our{" "}
          <Link to="/billing-software-for-mobile-shop" className="text-primary hover:underline">
            POS billing system
          </Link>
          ,{" "}
          <Link to="/mobile-repair-management-software" className="text-primary hover:underline">
            repair management system
          </Link>
          , and{" "}
          <Link to="/inventory-management-system" className="text-primary hover:underline">
            inventory
          </Link>{" "}
          tools so every sale, service, and reward stays connected.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="section-header-label">Learn More</span>
        <h2 className="section-header-title">Learn How to Increase Repeat Customers in Your Phone Shop</h2>
        <div className="premium-divider" />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Explore our blog for loyalty strategies, customer retention tips, and simple ways to increase repeat visits without relying only on new customer acquisition.
        </p>
        <div className="mt-6">
          <Link to="/blog">
            <Button variant="outline" className="rounded-xl font-medium px-6">
              Read Loyalty Strategy Articles
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-header-label">FAQ</span>
          <h2 className="section-header-title">Common Questions About Customer Loyalty Software</h2>
          <div className="premium-divider" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Quick answers to the questions phone shops ask when choosing a loyalty and retention system.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {loyaltyFaqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
              <div className="faq-answer text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="text-center mb-12">
        <span className="section-header-label">Explore More</span>
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">More Features That Help You Keep Customers Longer</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {relatedLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="px-4 py-2 bg-white border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </SectionWrapper>

    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Get My Loyalty System Now
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Stop depending on one-time buyers and start using a system that helps your phone shop earn more repeat sales every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Building Customer Loyalty Smarter <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="inverseOutline" className="rounded-xl font-medium px-8">
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Instant access</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Built for Sri Lankan mobile businesses</span>
          </div>
          <p className="text-sm text-white/60 mt-4">Start today and turn more first-time buyers into repeat customers in minutes.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default CustomerLoyaltySystem;
