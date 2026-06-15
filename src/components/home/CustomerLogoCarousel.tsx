import type { CustomerLogoRecord } from "@/lib/blog";

const customerLogoImageVersion = "202604270455";
const webpCustomerLogoBasenames = new Set([
  "1776961918721-logo-1764073475",
  "1776961956755-logo-1762942262",
  "1776962071559-logo-branch-1-1772768603",
  "1776962112055-logo-branch-1-1774343753",
  "1776962234479-logo-branch-1-1773741190",
  "1776962341945-logo-branch-1-1773820784",
  "1776962391089-logo-branch-1-1776829470",
  "1776962488305-logo-branch-1-1776501196",
  "1776962557700-logo-branch-1-1772775355",
]);

const addLogoCacheVersion = (url: string) => {
  if (!url.startsWith("/uploads/customer-logos/")) return url;

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${customerLogoImageVersion}`;
};

const getCustomerLogoImageUrl = (url: string) => {
  const match = url.match(/^\/uploads\/customer-logos\/(.+)\.(?:png|jpe?g)$/i);

  if (!match || !webpCustomerLogoBasenames.has(match[1])) {
    return addLogoCacheVersion(url);
  }

  return addLogoCacheVersion(`/uploads/customer-logos/${match[1]}.webp`);
};

const CustomerLogoSkeleton = () => (
  <>
    {Array.from({ length: 6 }).map((_, index) => (
      <li
        key={`customer-logo-skeleton-${index}`}
        className="flex min-w-[220px] items-center rounded-2xl border border-border/70 bg-secondary/35 px-5 py-4 shadow-sm shadow-black/[0.02] md:min-w-[260px] md:px-6"
      >
        <div className="w-full">
          <div className="flex h-20 items-center justify-center rounded-xl bg-white/70 px-3 py-4">
            <div className="h-8 w-32 rounded-md bg-muted" />
          </div>
        </div>
      </li>
    ))}
  </>
);

const CustomerLogoCarousel = ({
  logos = [],
  isLoading = false,
}: {
  logos: CustomerLogoRecord[];
  isLoading?: boolean;
}) => {
  if (logos.length === 0 && !isLoading) return null;

  const repeatedMarks = [...logos, ...logos];

  return (
  <section
    aria-labelledby="customer-logos-title"
    className="overflow-hidden border-y border-border/60 bg-white py-10 md:py-12"
  >
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <span className="section-header-label mb-3">Customer Logos</span>
        <h2
          id="customer-logos-title"
          className="text-xl font-heading font-semibold tracking-tight text-foreground md:text-2xl"
        >
          Trusted by growing mobile retailers using Cellivo every day
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          From single-location shops to growing retail teams, Cellivo is already helping mobile
          retailers run billing, stock, repairs, and day-to-day operations with better control.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div className="overflow-hidden">
          <ul className="logo-marquee-track flex w-max items-stretch gap-4 pr-4">
            {logos.length === 0 ? <CustomerLogoSkeleton /> : repeatedMarks.map((customer, index) => (
              <li
                key={`${customer.name}-${index}`}
                aria-hidden={index >= logos.length}
                className="flex min-w-[220px] items-center rounded-2xl border border-border/70 bg-secondary/35 px-5 py-4 shadow-sm shadow-black/[0.02] md:min-w-[260px] md:px-6"
              >
                <div className="w-full">
                  {customer.imageUrl ? (
                    <div className="flex items-center justify-center rounded-xl bg-white/70 px-3 py-4">
                      <img
                        src={getCustomerLogoImageUrl(customer.imageUrl)}
                        alt={customer.imageAlt || `${customer.name} customer logo`}
                        width="180"
                        height="64"
                        decoding="async"
                        loading="lazy"
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                        {customer.name}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        {customer.detail}
                      </p>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
  );
};

export default CustomerLogoCarousel;
