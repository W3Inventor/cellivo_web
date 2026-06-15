import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "@/components/LightMotion";
import { Star, Quote } from "lucide-react";
import type { TestimonialRecord } from "@/lib/blog";

const TestimonialsSkeleton = () => (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16" aria-hidden="true">
      <div className="mx-auto mb-4 h-4 w-40 rounded-full bg-muted" />
      <div className="mx-auto mb-5 h-10 max-w-xl rounded-xl bg-muted" />
      <div className="premium-divider" />
      <div className="mx-auto mt-5 h-5 max-w-lg rounded-md bg-muted" />
    </div>

    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`testimonial-skeleton-${index}`} className="min-h-[286px] rounded-xl border border-border bg-white p-6">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((__, starIndex) => (
              <div key={`testimonial-skeleton-${index}-${starIndex}`} className="h-3 w-3 rounded-full bg-muted" />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-11/12 rounded-md bg-muted" />
            <div className="h-4 w-4/5 rounded-md bg-muted" />
          </div>
          <div className="mt-8 h-10 rounded-lg bg-muted" />
          <div className="mt-8 border-t border-border pt-4">
            <div className="h-4 w-32 rounded-md bg-muted" />
            <div className="mt-2 h-3 w-44 rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

const TestimonialsSection = ({
  testimonials = [],
  isLoading = false,
}: {
  testimonials: TestimonialRecord[];
  isLoading?: boolean;
}) => {
  if (testimonials.length === 0) {
    return isLoading ? <TestimonialsSkeleton /> : null;
  }

  return (
  <SectionWrapper>
    <div className="text-center mb-12 md:mb-16">
      <span className="section-header-label">What Shop Owners Say</span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
        Real Results from <span className="text-primary">Real Phone Shops</span>
      </h2>
      <div className="premium-divider" />
      <p className="section-header-desc">
        Cellivo helps mobile phone shops improve billing speed, stock accuracy, and repair visibility without complicated setup.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="border border-border rounded-xl p-6 hover-lift relative flex flex-col bg-white"
        >
          <Quote size={20} className="text-border absolute top-5 right-5" />
          {t.imageUrl ? (
            <div className="mb-4 flex items-center gap-3">
              <img
                src={t.imageUrl}
                alt={t.imageAlt || `${t.name} testimonial`}
                width="52"
                height="52"
                className="h-[52px] w-[52px] rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
              </div>
            </div>
          ) : null}
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: t.rating || 5 }).map((_, j) => (
              <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">"{t.text}"</p>
          <div className="bg-primary/5 rounded-lg px-3 py-2 mb-5">
            <p className="text-xs font-medium text-primary">{t.result}</p>
          </div>
          {!t.imageUrl ? (
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
            </div>
          ) : null}
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
  );
};

export default TestimonialsSection;
