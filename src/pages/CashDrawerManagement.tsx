import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Wallet, Clock, ShieldCheck, FileText, Users, BarChart3 } from "lucide-react";

const allFeatureLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const CashDrawerManagement = () => (
  <FeaturePageTemplate
    seoTitle="Cash Drawer Management for Phone Shops | Cellivo"
    seoDescription="Track cash in and cash out with Cellivo's cash drawer management. Opening balance, shift closing, expense tracking, and full cash reconciliation for phone shop POS."
    canonical="https://cellivo.lovable.app/cash-drawer-management"
    badge="Cash Drawer"
    headline="Complete Cash Control for"
    highlightedText="Your Shop"
    subheadline="Track every rupee or dollar that enters and leaves your cash drawer. Opening balances, shift closings, expense tracking, and full reconciliation — all automated."
    benefits={[
      { icon: Wallet, title: "Opening & Closing Balance", desc: "Start each day or shift with a recorded opening balance. Close with a reconciliation report." },
      { icon: Clock, title: "Shift Management", desc: "Track cash flow per shift. Know exactly how much cash each cashier handled." },
      { icon: ShieldCheck, title: "Cash Discrepancy Alerts", desc: "If the closing balance doesn't match expected totals, get instant alerts with variance details." },
      { icon: FileText, title: "Expense Tracking", desc: "Record petty cash expenses directly from the drawer. All outflows are documented." },
      { icon: Users, title: "Cashier Accountability", desc: "Each cashier's transactions are tracked separately. Full accountability per staff member." },
      { icon: BarChart3, title: "Cash Flow Reports", desc: "Daily, weekly, and monthly cash reports. See patterns, track expenses, and plan better." },
    ]}
    howItWorks={[
      { step: "1", title: "Open Drawer", desc: "Record the opening balance when starting a shift. The system tracks all transactions from here." },
      { step: "2", title: "Transact Normally", desc: "Sales, refunds, and expenses are automatically tracked against the drawer balance." },
      { step: "3", title: "Close & Reconcile", desc: "Count the cash, enter the closing balance, and the system flags any discrepancies." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default CashDrawerManagement;
