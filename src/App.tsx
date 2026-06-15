import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import type { RouteObject } from "react-router-dom";
import { SiteUrlProvider } from "@/contexts/SiteUrlContext";
import { InitialDataProvider } from "@/contexts/InitialDataContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { AppRoutes } from "./routes";
import type { BlogInitialDataPayload } from "@/lib/blog";

interface AppProps {
  helmetContext?: object;
  routes?: RouteObject[];
  siteUrl?: string;
  initialData?: BlogInitialDataPayload;
}

const App = ({ helmetContext, routes, siteUrl, initialData }: AppProps) => {
  return (
    <HelmetProvider context={helmetContext}>
      <SiteUrlProvider siteUrl={siteUrl}>
        <InitialDataProvider initialData={initialData}>
          <AdminAuthProvider>
            <ScrollToTop />
            <Suspense fallback={null}>
              <AppRoutes routes={routes ?? []} />
            </Suspense>
          </AdminAuthProvider>
        </InitialDataProvider>
      </SiteUrlProvider>
    </HelmetProvider>
  );
};

export default App;
