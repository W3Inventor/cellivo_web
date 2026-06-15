import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import DemoBookingButton from "@/components/DemoBookingButton";
import { Button } from "@/components/ui/button";

interface TrustItem {
  value: string;
  label: string;
}

interface FeatureHeroProps {
  badge: string;
  painHook: string[];
  title: ReactNode;
  supportText: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  primaryCtaTo?: string;
  secondaryCtaTo?: string;
  helperLine?: string;
  trustItems?: TrustItem[];
  trustBullets?: string[];
}

const FeatureHero = ({
  badge,
  painHook,
  title,
  supportText,
  primaryCtaLabel,
  secondaryCtaLabel = "Book a Demo",
  primaryCtaTo = "/pricing",
  secondaryCtaTo = "/contact",
  helperLine = "Start free today and see how Cellivo fits your phone shop in minutes.",
  trustItems = [],
  trustBullets = [
    "No credit card required",
    "Instant access",
    "Works on desktop, tablet, and mobile",
  ],
}: FeatureHeroProps) => (
  <section className="pt-28 pb-10 md:pt-32 md:pb-14 bg-gradient-to-b from-secondary/50 to-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-4xl">
        <div className="inline-flex flex-col gap-1 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 mb-5 max-w-2xl">
          {painHook.slice(0, 3).map((line, index) => (
            <p
              key={`${index}-${line}`}
              className={
                index === painHook.length - 1
                  ? "text-sm font-semibold text-primary"
                  : index === 0
                    ? "text-sm font-medium text-foreground"
                    : "text-sm text-muted-foreground"
              }
            >
              {line}
            </p>
          ))}
        </div>

        <span className="section-header-label">{badge}</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-5 text-foreground leading-[1.06]">
          {title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-3xl">
          {supportText}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <Link to={primaryCtaTo}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
              {primaryCtaLabel} <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <DemoBookingButton
            variant="outline"
            className="font-medium px-8 h-12 rounded-xl text-sm"
            fallbackTo={secondaryCtaTo}
          >
            {secondaryCtaLabel}
          </DemoBookingButton>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{helperLine}</p>

        {trustItems.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mb-6">
            {trustItems.slice(0, 3).map((item) => (
              <div
                key={`${item.value}-${item.label}`}
                className="rounded-2xl border border-border bg-white/90 px-4 py-4 shadow-sm"
              >
                <p className="text-xl font-heading font-semibold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {trustBullets.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {trustBullets.slice(0, 3).map((bullet) => (
              <span key={bullet} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden="true" />
                {bullet}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default FeatureHero;
