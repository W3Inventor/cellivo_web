import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";

interface FeatureHubLinkSectionProps {
  description?: ReactNode;
  buttonLabel?: string;
  linkTo?: string;
  secondaryButtonLabel?: string;
  secondaryLinkTo?: string;
}

const defaultDescription = (
  <>
    This feature is part of our complete{" "}
    <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
      mobile shop POS system
    </Link>{" "}
    designed for phone shops.
  </>
);

const FeatureHubLinkSection = ({
  description = defaultDescription,
  buttonLabel = "View Full POS System",
  linkTo = "/mobile-shop-pos-system",
  secondaryButtonLabel = linkTo === "/pos-system-for-phone-shop" ? "View Full POS System" : "View POS for Phone Shops",
  secondaryLinkTo = linkTo === "/pos-system-for-phone-shop" ? "/mobile-shop-pos-system" : "/pos-system-for-phone-shop",
}: FeatureHubLinkSectionProps) => (
  <SectionWrapper className="pt-0 pb-10 md:pb-12 lg:pb-14">
    <div className="max-w-4xl mx-auto">
      <div className="rounded-3xl border border-primary/15 bg-primary/5 px-6 py-6 md:px-8 md:py-7 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <Link to={linkTo} className="w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto font-medium rounded-xl h-11 px-6 text-sm">
                {buttonLabel} <ArrowRight className="ml-2" size={15} />
              </Button>
            </Link>
            <Link to={secondaryLinkTo} className="w-full md:w-auto">
              <Button variant="ghost" className="w-full md:w-auto font-medium rounded-xl h-11 px-6 text-sm">
                {secondaryButtonLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default FeatureHubLinkSection;
