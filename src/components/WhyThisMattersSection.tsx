import type { ReactNode } from "react";

import SectionWrapper from "@/components/SectionWrapper";

interface WhyThisMattersSectionProps {
  label?: string;
  title?: ReactNode;
  problemText: string;
  solutionText: string;
}

const WhyThisMattersSection = ({
  label = "Why This Matters",
  title = (
    <>
      Why This Matters for Your <span className="text-primary">Phone Shop</span>
    </>
  ),
  problemText,
  solutionText,
}: WhyThisMattersSectionProps) => (
  <SectionWrapper className="pt-0">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="section-header-label">{label}</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
          {title}
        </h2>
        <div className="premium-divider" />
      </div>

      <div className="rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8 shadow-sm">
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{problemText}</p>
          <p>{solutionText}</p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default WhyThisMattersSection;
