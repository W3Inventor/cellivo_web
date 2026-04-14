import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { ShoppingCart, MessageSquare, Mail, Printer, ScanBarcode, Globe } from "lucide-react";

const relatedLinks = [
  { label: "Settings & Security", path: "/settings-security-integrations" },
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const Integrations = () => (
  <FeaturePageTemplate
    seoTitle="Integrations — Connect Your Tools | Cellivo POS"
    seoDescription="Connect Cellivo POS with WooCommerce, SMS gateways, email services, thermal printers, and barcode scanners. Seamless integrations for mobile phone shops."
    canonical="https://cellivo.lovable.app/integrations"
    badge="Integrations"
    headline="Seamless Integrations with"
    highlightedText="Your Favorite Tools"
    subheadline="Connect Cellivo with WooCommerce, SMS & email services, printers, barcode scanners, and more — no coding required. Automate workflows and keep everything in sync."
    benefits={[
      { icon: ShoppingCart, title: "WooCommerce Sync", desc: "Sync products, stock levels, prices, and orders between your POS and online WooCommerce store in real time." },
      { icon: MessageSquare, title: "SMS Gateway", desc: "Send automated SMS for invoices, repair status updates, payment reminders, and promotional campaigns." },
      { icon: Mail, title: "Email Integration", desc: "Email invoices, receipts, reports, and customer notifications directly from Cellivo with customizable templates." },
      { icon: Printer, title: "Printer Support", desc: "Works with thermal receipt printers (58mm/80mm), standard A4/A5 printers, and label printers — plug and play." },
      { icon: ScanBarcode, title: "Barcode Scanners", desc: "Plug-and-play support for USB and Bluetooth barcode scanners. Scan IMEI, product barcodes, and serial numbers instantly." },
      { icon: Globe, title: "API Access", desc: "Use Cellivo's API to build custom integrations, connect third-party apps, and automate business workflows." },
    ]}
    howItWorks={[
      { step: "1", title: "Choose Integration", desc: "Browse available integrations and select the tools you want to connect with Cellivo." },
      { step: "2", title: "Connect & Configure", desc: "Enter your credentials or API keys, configure sync settings, and map your data fields." },
      { step: "3", title: "Automate & Sync", desc: "Data flows automatically between Cellivo and your connected tools — no manual work needed." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default Integrations;
