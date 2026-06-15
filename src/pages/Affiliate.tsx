import { ArrowRight, BadgeCheck, Coins, Link as LinkIcon, LogIn, Share2, Users } from "lucide-react";

import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";

const AFFILIATE_SIGNUP_URL = "https://account.cellivo.com/affiliate-signup/";
const AFFILIATE_LOGIN_URL = "https://account.cellivo.com/affiliate-panel/";

const benefits = [
  {
    icon: Coins,
    title: "15% commission",
    description: "Earn 15% commission on every qualified annual or lifetime Cellivo sale you refer.",
  },
  {
    icon: BadgeCheck,
    title: "High-fit product",
    description: "Promote a POS system built specifically for phone shops, repair centers, and mobile retailers.",
  },
  {
    icon: LinkIcon,
    title: "Simple tracking",
    description: "Use your affiliate link to send qualified leads to Cellivo and track referrals from your panel.",
  },
];

const steps = [
  {
    title: "Apply for the program",
    description: "Create your affiliate account and get access to your referral panel.",
  },
  {
    title: "Share Cellivo with phone shops",
    description: "Promote Cellivo to mobile shop owners, repair shops, and retail operators.",
  },
  {
    title: "Earn from annual and lifetime sales",
    description: "Receive 15% commission when your referral buys an eligible annual or lifetime plan.",
  },
];

const audiences = [
  "Software resellers and consultants",
  "Mobile shop industry creators",
  "POS implementation partners",
  "Repair shop trainers and advisors",
  "Business communities for phone retailers",
  "Agencies working with retail businesses",
];

const affiliateFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much commission does the Cellivo affiliate program pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cellivo pays 15% commission on eligible annual or lifetime sales generated through affiliate referrals.",
      },
    },
    {
      "@type": "Question",
      name: "Who can join the Cellivo affiliate program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program is suitable for software resellers, consultants, creators, agencies, and partners who can refer phone shops and mobile retailers to Cellivo.",
      },
    },
    {
      "@type": "Question",
      name: "Where can affiliates log in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Approved affiliates can log in at https://account.cellivo.com/affiliate-panel/.",
      },
    },
  ],
};

const Affiliate = () => (
  <Layout>
    <SEOHead
      title="Cellivo Affiliate Program | Earn 15% Commission"
      description="Join the Cellivo affiliate program and earn 15% commission on qualified annual or lifetime sales by referring phone shops and mobile retailers."
      canonical="https://cellivo.com/affiliate"
      structuredData={affiliateFaqSchema}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Affiliate Program", path: "/affiliate" },
      ]}
    />

    <section className="pt-28 pb-12 md:pt-36 md:pb-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl">
          <span className="section-header-label">Cellivo Affiliate Program</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold mt-3 mb-6 text-foreground leading-[1.08]">
            Earn 15% Commission by Referring Phone Shops to Cellivo
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            Partner with Cellivo and earn from qualified annual or lifetime sales. Share a POS system built for mobile phone shops, repair centers, and growing retail businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              <a href={AFFILIATE_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Become an Affiliate <ArrowRight className="ml-2" size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
              <a href={AFFILIATE_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Affiliate Login <LogIn className="ml-2" size={16} />
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Commission applies to qualified annual and lifetime plan sales.
          </p>
        </div>
      </div>
    </section>

    <SectionWrapper className="pt-0">
      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <benefit.icon size={20} />
            </div>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-2">{benefit.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary/40">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
        <div>
          <span className="section-header-label">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5">
            A Simple Referral Program for Cellivo Partners
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If your audience includes phone shop owners, mobile retailers, or repair businesses, Cellivo gives you a focused product to recommend and a clear commission model.
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 h-11 rounded-xl text-sm">
            <a href={AFFILIATE_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              Start Affiliate Signup <Share2 className="ml-2" size={15} />
            </a>
          </Button>
        </div>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-heading font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-header-label">Best Fit</span>
          <h2 className="section-header-title">Who Should Join?</h2>
          <p className="section-header-desc">
            The program works best for people and teams who already reach mobile retail, phone repair, or small business audiences.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {audiences.map((audience) => (
            <div key={audience} className="rounded-2xl border border-border bg-card px-5 py-4 flex items-start gap-3 shadow-sm">
              <Users size={17} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm font-medium text-foreground">{audience}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-0">
      <div className="max-w-4xl mx-auto text-center rounded-[32px] border border-primary/15 bg-primary/5 px-6 py-12 md:px-10 md:py-16">
        <span className="section-header-label">Ready to Partner?</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5">
          Start Referring Phone Shops to Cellivo
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          Join the affiliate program, share Cellivo with the right businesses, and earn 15% commission on qualified annual or lifetime sales.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
            <a href={AFFILIATE_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              Become an Affiliate <ArrowRight className="ml-2" size={16} />
            </a>
          </Button>
          <Button asChild variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
            <a href={AFFILIATE_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Affiliate Login
            </a>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  </Layout>
);

export default Affiliate;
