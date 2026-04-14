import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Phone, LayoutDashboard, ShoppingCart, Settings, Zap, BarChart3 } from "lucide-react";

const relatedLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Staff Commissions", path: "/staff-commissions-payroll" },
];

const ReloadTopUp = () => (
  <FeaturePageTemplate
    seoTitle="Reload & Top-Up Services for Phone Shops | Cellivo"
    seoDescription="Sell mobile reloads and top-ups directly from your POS. Track commissions, manage providers, and offer instant top-up services to customers with Cellivo."
    canonical="https://cellivo.lovable.app/reload-topup-services"
    badge="Reload & Top-Up"
    headline="Sell Mobile Reloads &"
    highlightedText="Top-Ups from Your POS"
    subheadline="Offer instant mobile reload and top-up services to customers. Track every transaction, manage provider settings, and earn commissions — all from one dashboard."
    benefits={[
      { icon: LayoutDashboard, title: "Reload Dashboard", desc: "View all reload activity, pending transactions, and daily summaries in one centralized dashboard." },
      { icon: ShoppingCart, title: "Instant Reload Sell", desc: "Process customer reloads in seconds. Select provider, enter number, choose amount — done." },
      { icon: Phone, title: "Quick Top-Up", desc: "Top up any mobile number instantly with preset amounts or custom values for any supported provider." },
      { icon: Settings, title: "Provider Settings", desc: "Configure reload providers, set commission rates, and manage available denominations per network." },
      { icon: Zap, title: "Fast Transactions", desc: "Process reloads alongside regular sales without switching systems — everything in one POS." },
      { icon: BarChart3, title: "Commission Tracking", desc: "Track reload commissions earned per provider, per day, and per cashier automatically." },
    ]}
    howItWorks={[
      { step: "1", title: "Select Provider", desc: "Choose the mobile network and enter the customer's phone number at the POS." },
      { step: "2", title: "Process Top-Up", desc: "Select the reload amount and confirm. The transaction is recorded instantly." },
      { step: "3", title: "Track & Earn", desc: "Commissions are calculated automatically. View reports by provider, cashier, or date." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default ReloadTopUp;
