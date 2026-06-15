import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import CustomerLogoCarousel from "@/components/home/CustomerLogoCarousel";
import ProblemSection from "@/components/home/ProblemSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ParallaxShowcase from "@/components/home/ParallaxShowcase";
import DashboardSection from "@/components/home/DashboardSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection, { homeFaqs } from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchHomepageSocialProof } from "@/lib/blog-api";
import type { HomepageSocialProofData } from "@/lib/blog";
import { useEffect, useState } from "react";

const homeSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cellivo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Mobile shop POS system for phone shops with billing, IMEI tracking, repair management, inventory control, and multi-branch support.",
  url: "https://cellivo.com/",
  offers: {
    "@type": "Offer",
    price: "7000",
    priceCurrency: "LKR",
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const Index = () => {
  const initialData = useInitialData();
  const [socialProof, setSocialProof] = useState<HomepageSocialProofData | null>(
    initialData.homepageSocialProof ?? null,
  );
  const [socialProofResolved, setSocialProofResolved] = useState(Boolean(initialData.homepageSocialProof));

  useEffect(() => {
    if (socialProofResolved) return;

    let isCurrent = true;

    fetchHomepageSocialProof()
      .then((data) => {
        if (isCurrent) {
          setSocialProof(data);
        }
      })
      .catch(() => {
        // Keep homepage resilient if the social proof request fails.
      })
      .finally(() => {
        if (isCurrent) {
          setSocialProofResolved(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [socialProofResolved]);

  return (
  <Layout>
    <SEOHead
      title="Mobile Shop POS System for Phone Shops | Cellivo"
      description="Cellivo is a phone shop POS system with billing, IMEI tracking, repairs, inventory control, and multi-branch tools for mobile retailers worldwide."
      canonical="https://cellivo.com/"
      ogTitle="Mobile Shop POS System for Phone Shops | Cellivo"
      ogDescription="Mobile shop POS system for Sri Lanka businesses with billing, IMEI tracking, repairs, inventory, and multi-branch control."
      ogUrl="https://cellivo.com/"
      ogImage="https://cellivo.com/og-home.jpg"
      twitterTitle="Mobile Shop POS System for Phone Shops | Cellivo"
      twitterDescription="Mobile shop POS system for Sri Lanka businesses with billing, IMEI tracking, repairs, inventory, and multi-branch control."
      twitterImage="https://cellivo.com/og-home.jpg"
      structuredData={[homeSoftwareSchema, homeFaqSchema]}
      breadcrumbs={[{ name: "Home", path: "/" }]}
    />
    <HeroSection />
    <TrustStrip />
    <CustomerLogoCarousel logos={socialProof?.customerLogos ?? []} isLoading={!socialProofResolved} />
    <ProblemSection />
    <FeaturesSection />
    <ParallaxShowcase />
    <DashboardSection />
    <BenefitsSection />
    <TestimonialsSection testimonials={socialProof?.testimonials ?? []} isLoading={!socialProofResolved} />
    <FAQSection />
    <FinalCTA />
  </Layout>
  );
};

export default Index;
