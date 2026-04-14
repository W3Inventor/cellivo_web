import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import ClientLogos from "@/components/home/ClientLogos";
import ProblemSection from "@/components/home/ProblemSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ParallaxShowcase from "@/components/home/ParallaxShowcase";
import DashboardSection from "@/components/home/DashboardSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => (
  <Layout>
    <SEOHead
      title="Cellivo — Mobile Shop POS System with IMEI-Based Stock Control & Repair Management"
      description="All-in-one POS software for phone shops to manage sales, inventory, repairs, and staff. IMEI-based stock control, billing, multi-branch support. Start your free trial today."
      canonical="https://cellivo.lovable.app/"
    />
    <HeroSection />
    <TrustStrip />
    <ClientLogos />
    <ProblemSection />
    <FeaturesSection />
    <ParallaxShowcase />
    <DashboardSection />
    <BenefitsSection />
    <TestimonialsSection />
    <FAQSection />
    <FinalCTA />
  </Layout>
);

export default Index;
