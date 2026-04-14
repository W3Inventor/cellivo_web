import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { SiteUrlProvider } from "@/contexts/SiteUrlContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { AppRoutes } from "./routes";

interface AppProps {
  helmetContext?: object;
  queryClient?: QueryClient;
  siteUrl?: string;
}

const App = ({ helmetContext, queryClient, siteUrl }: AppProps) => {
  const [client] = useState(() => queryClient ?? new QueryClient());

  return (
    <HelmetProvider context={helmetContext}>
      <SiteUrlProvider siteUrl={siteUrl}>
        <QueryClientProvider client={client}>
          <TooltipProvider>
            <SEOHead
              title="Cellivo — Mobile Shop POS System with IMEI-Based Stock Control & Repair Management"
              description="All-in-one POS software for phone shops to manage sales, inventory, repairs, and staff. IMEI-based stock control, billing, multi-branch support. Start your free trial today."
            />
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </SiteUrlProvider>
    </HelmetProvider>
  );
};

export default App;
