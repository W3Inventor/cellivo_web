import type { RouteObject } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import MobileShopPosSystem from "./pages/MobileShopPosSystem";
import PosBillingSystem from "./pages/PosBillingSystem";
import ImeiTrackingPos from "./pages/ImeiTrackingPos";
import InventoryManagement from "./pages/InventoryManagement";
import RepairManagement from "./pages/RepairManagement";
import MultiBranchPos from "./pages/MultiBranchPos";
import CashDrawerManagement from "./pages/CashDrawerManagement";
import CustomerLoyaltySystem from "./pages/CustomerLoyaltySystem";
import ReloadTopUp from "./pages/ReloadTopUp";
import BankingCredit from "./pages/BankingCredit";
import StaffCommissions from "./pages/StaffCommissions";
import CustomersSuppliers from "./pages/CustomersSuppliers";
import SettingsSecurity from "./pages/SettingsSecurity";
import SubscriptionBilling from "./pages/SubscriptionBilling";
import PosForMobileShops from "./pages/PosForMobileShops";
import PosSystemSriLanka from "./pages/PosSystemSriLanka";
import Integrations from "./pages/Integrations";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/about", element: <About /> },
  { path: "/features", element: <Features /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/contact", element: <Contact /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/pos-billing-system", element: <PosBillingSystem /> },
  { path: "/imei-tracking-pos", element: <ImeiTrackingPos /> },
  { path: "/inventory-management-system", element: <InventoryManagement /> },
  { path: "/mobile-repair-management-software", element: <RepairManagement /> },
  { path: "/multi-branch-pos", element: <MultiBranchPos /> },
  { path: "/cash-drawer-management", element: <CashDrawerManagement /> },
  { path: "/customer-loyalty-system", element: <CustomerLoyaltySystem /> },
  { path: "/reload-topup-services", element: <ReloadTopUp /> },
  { path: "/banking-credit-cheques", element: <BankingCredit /> },
  { path: "/staff-commissions-payroll", element: <StaffCommissions /> },
  { path: "/customers-suppliers-management", element: <CustomersSuppliers /> },
  { path: "/settings-security-integrations", element: <SettingsSecurity /> },
  { path: "/subscription-billing-support", element: <SubscriptionBilling /> },
  { path: "/integrations", element: <Integrations /> },
  { path: "/mobile-shop-pos-system", element: <MobileShopPosSystem /> },
  { path: "/pos-for-mobile-shops", element: <PosForMobileShops /> },
  { path: "/pos-system-sri-lanka", element: <PosSystemSriLanka /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/refund-policy", element: <RefundPolicy /> },
  { path: "*", element: <NotFound /> },
];
