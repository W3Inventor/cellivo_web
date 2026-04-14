import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Building2, BarChart3, Users, RefreshCw, ShieldCheck, Globe } from "lucide-react";

const allFeatureLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const MultiBranchPos = () => (
  <FeaturePageTemplate
    seoTitle="Multi-Branch POS System for Phone Shop Chains | Cellivo"
    seoDescription="Manage multiple phone shop locations from one dashboard. Cellivo's multi-branch POS system provides centralized inventory, staff management, and real-time reporting across all branches."
    canonical="https://cellivo.lovable.app/multi-branch-pos"
    badge="Multi-Branch POS"
    headline="One Dashboard for"
    highlightedText="All Your Branches"
    subheadline="Run 2 shops or 20 from a single login. Centralized inventory, unified reporting, and branch-level staff permissions — all synced in real-time."
    benefits={[
      { icon: Building2, title: "Centralized Management", desc: "View all branches from one dashboard. Compare performance, stock levels, and sales across locations." },
      { icon: BarChart3, title: "Cross-Branch Reporting", desc: "See combined revenue, profit margins, and trends across all branches or drill down to individual locations." },
      { icon: Users, title: "Branch-Level Staff Roles", desc: "Assign staff to specific branches with role-based permissions. Managers see their branch; owners see everything." },
      { icon: RefreshCw, title: "Stock Transfers", desc: "Transfer inventory between branches with full tracking. Balance stock across locations efficiently." },
      { icon: ShieldCheck, title: "Branch Isolation", desc: "Each branch operates independently for billing and inventory, while owners get the complete picture." },
      { icon: Globe, title: "Cloud Synced", desc: "All data syncs in real-time across branches. No manual imports, no delays, no mismatches." },
    ]}
    howItWorks={[
      { step: "1", title: "Create Branches", desc: "Add new branches from your admin panel. Each gets its own inventory and staff setup." },
      { step: "2", title: "Assign Staff", desc: "Invite staff to specific branches with appropriate roles and permissions." },
      { step: "3", title: "Monitor Everything", desc: "View consolidated reports, compare branch performance, and manage from anywhere." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default MultiBranchPos;
