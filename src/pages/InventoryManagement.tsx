import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Package, Bell, BarChart3, Layers, RefreshCw, TrendingUp } from "lucide-react";

const allFeatureLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const InventoryManagement = () => (
  <FeaturePageTemplate
    seoTitle="Inventory Management System for Phone Shops | Cellivo"
    seoDescription="Manage phone inventory, accessories, and spare parts with Cellivo's inventory management system. Low-stock alerts, category management, and real-time stock levels for mobile retailers."
    canonical="https://cellivo.lovable.app/inventory-management-system"
    badge="Inventory Management"
    headline="Smart Inventory Control for"
    highlightedText="Phone Shops"
    subheadline="Track phones, accessories, and spare parts in real-time. Get low-stock alerts, manage categories, and never run out of your best-selling products again."
    benefits={[
      { icon: Package, title: "Categorized Stock", desc: "Organize inventory by phones, accessories, spare parts, and custom categories with detailed attributes." },
      { icon: Bell, title: "Low-Stock Alerts", desc: "Set reorder thresholds for every SKU. Get notified before you run out of fast-moving items." },
      { icon: BarChart3, title: "Real-Time Stock Levels", desc: "See current stock counts updated in real-time as sales and purchases happen." },
      { icon: Layers, title: "Variant Management", desc: "Track phones by model, color, storage, and condition. Accessories by type, brand, and compatibility." },
      { icon: RefreshCw, title: "Purchase Order Tracking", desc: "Log supplier purchases and automatically update inventory when stock arrives." },
      { icon: TrendingUp, title: "Inventory Valuation", desc: "Know the total value of your stock at cost and retail price at any given moment." },
    ]}
    howItWorks={[
      { step: "1", title: "Add Products", desc: "Add phones with IMEI, accessories with SKU, or spare parts with categories." },
      { step: "2", title: "Set Thresholds", desc: "Configure low-stock alerts and reorder points for each product." },
      { step: "3", title: "Monitor & Restock", desc: "Get alerts, view reports, and restock before items run out." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default InventoryManagement;
