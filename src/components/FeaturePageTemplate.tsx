import Layout from "@/components/Layout";
import FeatureHero from "@/components/FeatureHero";
import FeatureHubLinkSection from "@/components/FeatureHubLinkSection";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { BreadcrumbItem } from "@/lib/seo";

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeaturePageProps {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  breadcrumbs?: BreadcrumbItem[];
  badge: string;
  painHook: string[];
  headline: string;
  highlightedText: string;
  subheadline: string;
  whyThisMatters: { problem: string; solution: string };
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  trustItems?: { value: string; label: string }[];
  benefits: Benefit[];
  howItWorks: { step: string; title: string; desc: string }[];
  relatedLinks: { label: string; path: string }[];
  faqItems?: { q: string; a: string }[];
}

const FeaturePageTemplate = ({
  seoTitle, seoDescription, canonical, breadcrumbs, badge, painHook, headline, highlightedText,
  subheadline, whyThisMatters, primaryCtaLabel = "Start Free Trial",
  secondaryCtaLabel = "Book a Demo", trustItems = [], benefits, howItWorks, relatedLinks, faqItems = [],
}: FeaturePageProps) => (
  <Layout>
    <SEOHead
      title={seoTitle}
      description={seoDescription}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={
        faqItems.length
          ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }
          : undefined
      }
    />

    <FeatureHero
      badge={badge}
      painHook={painHook}
      title={
        <>
          {headline} <span className="text-primary">{highlightedText}</span>
        </>
      }
      supportText={subheadline}
      primaryCtaLabel={primaryCtaLabel}
      primaryCtaTo="/pricing"
      secondaryCtaLabel={secondaryCtaLabel}
      trustItems={trustItems}
    />

    <FeatureHubLinkSection />

    <WhyThisMattersSection
      problemText={whyThisMatters.problem}
      solutionText={whyThisMatters.solution}
    />

    {/* Benefits */}
    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-12">
        <h2 className="section-header-title">Key Benefits</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="bg-white border border-border rounded-xl p-5 hover-lift group">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/8 transition-colors">
              <b.icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1.5 text-sm">{b.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* How It Works */}
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="section-header-title">How It Works</h2>
        <div className="premium-divider" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {howItWorks.map((step, i) => (
          <motion.div key={step.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-heading font-bold flex items-center justify-center mx-auto mb-4 text-lg">
              {step.step}
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* Related Features */}
    <SectionWrapper className="bg-secondary/40">
      <div className="text-center mb-8">
        <h2 className="text-xl font-heading font-semibold text-foreground">Explore More Features</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {relatedLinks.map((link) => (
          <Link key={link.path} to={link.path} className="px-4 py-2 bg-white border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </SectionWrapper>

    {faqItems.length ? (
      <SectionWrapper className="bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-header-label">FAQ</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-5">
              Common Questions
            </h2>
            <div className="premium-divider" />
          </div>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
                <h3 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h3>
                <div className="faq-answer text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    ) : null}

    {/* CTA */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Transform Your Phone Shop?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Join 500+ phone shop owners who run their entire business on Cellivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
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
            <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default FeaturePageTemplate;
