import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Hash, Search, ShieldCheck, FileText, Smartphone, AlertTriangle } from "lucide-react";

const allFeatureLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const ImeiTrackingPos = () => (
  <FeaturePageTemplate
    seoTitle="IMEI-Based Stock Control POS System for Phone Shops | Cellivo"
    seoDescription="Manage every phone by IMEI number from purchase to sale. Cellivo's IMEI-based stock control system provides complete traceability, instant lookup, and fraud prevention for mobile retailers."
    canonical="https://cellivo.lovable.app/imei-tracking-pos"
    badge="IMEI Stock Control"
    headline="IMEI-Based Stock Control for"
    highlightedText="Every Phone"
    subheadline="Every phone that enters your shop gets a unique IMEI record. Manage it from supplier purchase to customer sale with complete traceability and instant lookup."
    benefits={[
      { icon: Hash, title: "Automatic IMEI Recording", desc: "Scan or enter the IMEI when a phone arrives. It's linked to supplier, cost, and condition automatically." },
      { icon: Search, title: "Instant IMEI Lookup", desc: "Find any phone in your inventory by IMEI in under 2 seconds. Know its status, location, and history." },
      { icon: ShieldCheck, title: "Fraud Prevention", desc: "Prevent duplicate entries and flag suspicious IMEI numbers. Protect your business from stolen devices." },
      { icon: FileText, title: "IMEI on Every Invoice", desc: "IMEI numbers are automatically printed on sales invoices for customer records and warranty tracking." },
      { icon: Smartphone, title: "Full Device History", desc: "See the complete lifecycle: when purchased, from whom, at what cost, when sold, and to which customer." },
      { icon: AlertTriangle, title: "Stock Discrepancy Alerts", desc: "Instantly identify missing phones. IMEI-level tracking catches discrepancies before they become losses." },
    ]}
    howItWorks={[
      { step: "1", title: "Register Phone", desc: "Scan the IMEI barcode or enter it manually when adding a phone to inventory." },
      { step: "2", title: "Track in Inventory", desc: "The phone appears in your inventory with full details — model, color, storage, condition, cost." },
      { step: "3", title: "Sell with Traceability", desc: "When sold, the IMEI is linked to the customer and invoice. Complete audit trail." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default ImeiTrackingPos;
