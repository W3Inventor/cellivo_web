import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Receipt, Clock, Calculator, FileText, CreditCard, BarChart3 } from "lucide-react";

const allFeatureLinks = [
  { label: "IMEI Stock Control", path: "/imei-tracking-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const PosBillingSystem = () => (
  <FeaturePageTemplate
    seoTitle="POS Billing System for Phone Shops | Cellivo"
    seoDescription="Create invoices in under 30 seconds with Cellivo's POS billing system. Auto-tax calculation, IMEI linking, multiple payment methods, and instant receipts for mobile phone shops."
    canonical="https://cellivo.lovable.app/pos-billing-system"
    badge="POS Billing"
    headline="30-Second Billing for"
    highlightedText="Phone Shops"
    subheadline="Create professional invoices with auto-calculated taxes, IMEI-linked products, multiple payment methods, and instant digital receipts — all in under 30 seconds."
    benefits={[
      { icon: Receipt, title: "Instant Invoice Generation", desc: "Scan a barcode or select a product — the invoice is ready in seconds with auto-calculated taxes and discounts." },
      { icon: Clock, title: "Save 2+ Hours Daily", desc: "No more manual calculations. Prices, taxes, and totals are computed automatically for every transaction." },
      { icon: Calculator, title: "Auto Tax Calculation", desc: "Configure your tax rates once. Every invoice applies them correctly — no miscalculations." },
      { icon: FileText, title: "Digital & Print Receipts", desc: "Email receipts to customers or print thermal receipts instantly. Professional branding on every document." },
      { icon: CreditCard, title: "Multiple Payment Methods", desc: "Accept cash, card, bank transfer, or split payments across methods. All tracked automatically." },
      { icon: BarChart3, title: "Sales Analytics", desc: "See daily revenue, top-selling products, peak hours, and profit margins in real-time." },
    ]}
    howItWorks={[
      { step: "1", title: "Scan or Select", desc: "Scan a barcode/IMEI or search for the product. It's added to the invoice instantly." },
      { step: "2", title: "Apply Discounts", desc: "Add customer-specific discounts or promotional pricing with one click." },
      { step: "3", title: "Complete Sale", desc: "Choose payment method, generate receipt, and the sale is logged with full traceability." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default PosBillingSystem;
