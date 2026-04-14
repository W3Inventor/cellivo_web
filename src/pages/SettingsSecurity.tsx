import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Settings, Palette, Printer, CreditCard, Mail, Shield } from "lucide-react";

const relatedLinks = [
  { label: "Users & Branches", path: "/customers-suppliers-management" },
  { label: "Subscription & Billing", path: "/subscription-billing-support" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
];

const SettingsSecurity = () => (
  <FeaturePageTemplate
    seoTitle="Settings, Security & Integrations | Cellivo POS"
    seoDescription="Customize invoices, configure printers, manage payment methods, set up email and SMS notifications, control roles, and sync with WooCommerce — all in Cellivo."
    canonical="https://cellivo.lovable.app/settings-security-integrations"
    badge="Settings & Security"
    headline="Configure Everything with"
    highlightedText="Full Platform Control"
    subheadline="Customize invoices, manage printers, set up payment methods, configure notifications, control user roles, and sync with external platforms — all from one settings panel."
    benefits={[
      { icon: Settings, title: "General Settings", desc: "Configure business details, currency, tax rates, date formats, and default preferences for your POS." },
      { icon: Palette, title: "Invoice Designer", desc: "Customize your invoice layout with your logo, colors, fields, terms, and footer — print-ready templates." },
      { icon: Printer, title: "Printer Settings", desc: "Configure receipt printers, thermal printers, and label printers. Set paper sizes and print preferences." },
      { icon: CreditCard, title: "Payment Methods & Warranty", desc: "Set up accepted payment methods, configure warranty terms, and manage payment-related settings." },
      { icon: Mail, title: "Email & SMS Settings", desc: "Configure automated email and SMS notifications for invoices, repair updates, and customer communications." },
      { icon: Shield, title: "Role & Module Control", desc: "Define user roles with granular permissions. Control access to specific modules, reports, and actions per role." },
    ]}
    howItWorks={[
      { step: "1", title: "Configure Basics", desc: "Set up business info, currency, tax, and general preferences to match your operations." },
      { step: "2", title: "Customize Output", desc: "Design invoices, configure printers, and set up email/SMS templates for professional communication." },
      { step: "3", title: "Secure & Sync", desc: "Define roles and permissions, then connect integrations like WooCommerce for seamless data sync." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default SettingsSecurity;
