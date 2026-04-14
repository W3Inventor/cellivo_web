import type { ReactNode } from "react";
import { SiteUrlContext } from "./site-url-context";

interface SiteUrlProviderProps {
  children: ReactNode;
  siteUrl?: string;
}

export const SiteUrlProvider = ({ children, siteUrl }: SiteUrlProviderProps) => (
  <SiteUrlContext.Provider value={siteUrl}>{children}</SiteUrlContext.Provider>
);
