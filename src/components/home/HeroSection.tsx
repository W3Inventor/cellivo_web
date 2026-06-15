import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Play, ShieldCheck, Zap } from "lucide-react";

import DemoBookingButton from "@/components/DemoBookingButton";
import { Button } from "@/components/ui/button";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_RAW } from "@/lib/business-info";

const heroKpis = [
  { label: "Today's Sales", value: "$12,450", change: "+18% vs yesterday" },
  { label: "Phones in Stock", value: "342", change: "5 below reorder" },
  { label: "Repairs Pending", value: "12", change: "3 ready for pickup" },
];

const sales = [
  { name: "iPhone 15 Pro", price: "$1,199" },
  { name: "Galaxy S24", price: "$899" },
  { name: "Pixel 8", price: "$699" },
];

const reorderItems = ["Screen Protectors", "USB-C Cables", "AirPods Pro"];
const weeklyRevenueBars = [40, 55, 35, 70, 60, 85, 45, 90, 65, 78, 50, 88];

const HeroSection = () => (
  <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
    <div className="container relative z-10 mx-auto px-4 pb-16 pt-28 lg:px-8 md:pb-20 md:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr,1.15fr] lg:gap-20">
        <div className="lg:contents">
          <div>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-[11px] font-medium text-muted-foreground md:text-xs">
                Used by 500+ Phone Shops Worldwide
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-heading font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:mb-7 md:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
              Mobile Shop POS System for <span className="text-primary">Phone Shops</span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:mb-10 md:text-lg lg:text-xl">
              All-in-one POS software for phone shops to manage billing, IMEI stock, repairs, inventory, staff, and multi-branch operations from one dashboard.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row md:mb-10 md:gap-3.5">
              <Link to="/pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto md:h-13 md:px-8 md:text-base"
                >
                  Start Free Trial <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <DemoBookingButton
                size="lg"
                variant="outline"
                fallbackTo="/contact"
                className="h-12 w-full rounded-xl border-border px-7 text-sm font-medium text-foreground hover:bg-secondary sm:w-auto md:h-13 md:px-8 md:text-base"
              >
                <Play size={14} className="mr-2" /> Book Live Demo
              </DemoBookingButton>
            </div>

            <div className="mb-6">
              <Link to="/mobile-shop-pos-system" className="text-sm text-primary underline underline-offset-4 hover:text-primary/80">
                Explore Mobile Shop POS System →
              </Link>
            </div>

            <p className="mb-6 text-sm text-muted-foreground">
              Need help? Call us at{" "}
              <a href={`tel:${BUSINESS_PHONE_RAW}`} className="text-primary underline underline-offset-4 hover:text-primary/80">
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </p>

            <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3">
              <div className="flex items-center gap-2">
                <CreditCard size={14} className="shrink-0 text-muted-foreground/60" />
                <span>No credit card required</span>
              </div>
              <span className="hidden text-muted-foreground/50 sm:inline">·</span>
              <div className="flex items-center gap-2">
                <Zap size={14} className="shrink-0 text-muted-foreground/60" />
                <span>Instant access</span>
              </div>
              <span className="hidden text-muted-foreground/50 sm:inline">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="shrink-0 text-muted-foreground/60" />
                <span>Works on desktop, tablet, and mobile</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative hidden lg:block"
          style={{ perspective: "1200px" }}
          role="img"
          aria-label="Cellivo mobile shop POS dashboard with sales, stock, and repairs"
        >
          <div className="origin-bottom rounded-2xl border border-border bg-white shadow-xl shadow-black/[0.04]">
            <div className="overflow-hidden rounded-2xl p-5">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="mx-12 h-6 flex-1 rounded-md bg-secondary" />
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3">
                {heroKpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-xl bg-secondary/70 p-3.5">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                    <p className="mt-1 text-lg font-semibold text-foreground">{kpi.value}</p>
                    <span className="text-[10px] font-medium text-green-700">{kpi.change}</span>
                  </div>
                ))}
              </div>
              <div className="mb-4 rounded-xl bg-secondary/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue This Week</span>
                  <span className="text-[10px] font-medium text-primary">$48,290 total</span>
                </div>
                <div className="flex h-20 items-end gap-1.5">
                  {weeklyRevenueBars.map((height, index) => (
                    <div key={`${height}-${index}`} className="relative flex-1 rounded-t bg-primary/10" style={{ height: `${height}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 rounded-t bg-primary/50" style={{ height: `${65 + index * 2}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-secondary/70 p-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Last 3 Sales</span>
                  <div className="mt-2 space-y-2">
                    {sales.map((sale) => (
                      <div key={sale.name} className="flex items-center justify-between">
                        <span className="text-[11px] text-foreground/70">{sale.name}</span>
                        <span className="text-[10px] font-medium text-primary">{sale.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-secondary/70 p-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Reorder Needed</span>
                  <div className="mt-2 space-y-2">
                    {reorderItems.map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-[11px] text-foreground/70">{item}</span>
                        <span className="text-[10px] font-medium text-amber-700">Low</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="absolute -right-6 -top-4 rounded-xl border border-border bg-white p-3.5 shadow-lg shadow-black/[0.04]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8">
                <span className="font-mono text-xs font-semibold text-primary">#</span>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">IMEI Scanned</p>
                <p className="font-mono text-[11px] text-muted-foreground">354832091...</p>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="absolute -bottom-6 -left-8 rounded-xl border border-border bg-white p-3.5 shadow-lg shadow-black/[0.04]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                <span className="text-sm text-green-700">✓</span>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Invoice #1247 Paid</p>
                <p className="text-[11px] font-medium text-green-700">$899 — Auto-receipt sent</p>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="absolute bottom-16 -right-4 rounded-xl border border-border bg-white p-3 shadow-lg shadow-black/[0.04]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-[11px] font-medium text-foreground">Screen repair — 65% done</span>
            </div>
          </div>

          <div aria-hidden="true" className="absolute -left-10 top-1/2 rounded-xl border border-border bg-white p-3 shadow-lg shadow-black/[0.04]">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50">
                <span className="text-[10px] font-semibold text-green-700">↑</span>
              </div>
              <span className="text-[11px] font-medium text-foreground">Profit +22% this week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
