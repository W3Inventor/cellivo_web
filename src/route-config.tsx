import { lazy, type ComponentType } from "react";

import {
  buildAppRoutes,
  normalizePathname,
  pageFiles,
  routePreloadLookup,
  type PageModule,
  type PagePath,
} from "./route-config.shared";

const pageModules = import.meta.glob<PageModule>("./pages/*.tsx");

const resolvePage = (pagePath: PagePath): ComponentType => {
  const importer = pageModules[pageFiles[pagePath]] as (() => Promise<PageModule>) | undefined;

  if (!importer) {
    throw new Error(`Client page importer not found for ${pageFiles[pagePath]}`);
  }

  return lazy(importer);
};

export const preloadRouteForPath = async (pathname: string) => {
  const normalizedPath = normalizePathname(pathname);
  const routeKey = normalizedPath.startsWith("/admin/blog/preview/")
    ? "BlogAdminPreview"
    : normalizedPath.startsWith("/blog/")
      ? "BlogPost"
      : routePreloadLookup[normalizedPath];

  if (!routeKey) return;

  const importer = pageModules[pageFiles[routeKey]] as (() => Promise<PageModule>) | undefined;
  if (importer) {
    await importer();
  }
};

export const appRoutes = buildAppRoutes({
  About: resolvePage("About"),
  Affiliate: resolvePage("Affiliate"),
  AdminCustomerLogos: resolvePage("AdminCustomerLogos"),
  AdminDashboard: resolvePage("AdminDashboard"),
  AdminLogin: resolvePage("AdminLogin"),
  AdminPosts: resolvePage("AdminPosts"),
  AdminPricingLinks: resolvePage("AdminPricingLinks"),
  AdminSettings: resolvePage("AdminSettings"),
  AdminTestimonials: resolvePage("AdminTestimonials"),
  BankingCredit: resolvePage("BankingCredit"),
  Blog: resolvePage("Blog"),
  BlogAdmin: resolvePage("BlogAdmin"),
  BlogAdminPreview: resolvePage("BlogAdminPreview"),
  BlogPost: resolvePage("BlogPost"),
  CashDrawerManagement: resolvePage("CashDrawerManagement"),
  Contact: resolvePage("Contact"),
  CustomerLoyaltySystem: resolvePage("CustomerLoyaltySystem"),
  CustomersSuppliers: resolvePage("CustomersSuppliers"),
  Features: resolvePage("Features"),
  ImeiTrackingPos: resolvePage("ImeiTrackingPos"),
  Index: resolvePage("Index"),
  Integrations: resolvePage("Integrations"),
  InventoryManagement: resolvePage("InventoryManagement"),
  Login: resolvePage("Login"),
  MobileShopPosSystem: resolvePage("MobileShopPosSystem"),
  MultiBranchPos: resolvePage("MultiBranchPos"),
  NotFound: resolvePage("NotFound"),
  PosBillingSystem: resolvePage("PosBillingSystem"),
  PosForMobileShops: resolvePage("PosForMobileShops"),
  PosSystemForPhoneShop: resolvePage("PosSystemForPhoneShop"),
  PosSystemSriLanka: resolvePage("PosSystemSriLanka"),
  Pricing: resolvePage("Pricing"),
  PrivacyPolicy: resolvePage("PrivacyPolicy"),
  RefundPolicy: resolvePage("RefundPolicy"),
  RepairManagement: resolvePage("RepairManagement"),
  SettingsSecurity: resolvePage("SettingsSecurity"),
  Signup: resolvePage("Signup"),
  StaffCommissions: resolvePage("StaffCommissions"),
  TermsOfService: resolvePage("TermsOfService"),
});
