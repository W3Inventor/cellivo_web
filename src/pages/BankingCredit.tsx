import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Landmark, CreditCard, BookOpen, FileText, CalendarDays, BarChart3 } from "lucide-react";

const relatedLinks = [
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Staff Commissions", path: "/staff-commissions-payroll" },
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Settings & Security", path: "/settings-security-integrations" },
];

const BankingCredit = () => (
  <FeaturePageTemplate
    seoTitle="Banking, Credit & Cheque Management | Cellivo"
    seoDescription="Manage bank accounts, reconcile transactions, track customer and supplier credit, and handle cheques — all integrated into your phone shop POS with Cellivo."
    canonical="https://cellivo.lovable.app/banking-credit-cheques"
    badge="Banking & Credit"
    headline="Complete Financial Control with"
    highlightedText="Banking & Credit Management"
    subheadline="Manage bank accounts, reconcile transactions, track credit balances for customers and suppliers, and stay on top of cheque schedules — all from your POS."
    benefits={[
      { icon: Landmark, title: "Bank Accounts", desc: "Register and manage multiple bank accounts. Track deposits, withdrawals, and balances in real time." },
      { icon: BarChart3, title: "Bank Reconciliation", desc: "Match POS transactions with bank statements to ensure accuracy and catch discrepancies fast." },
      { icon: CreditCard, title: "Credit Dashboard", desc: "Monitor outstanding credit for customers and suppliers. Set credit limits and track payment due dates." },
      { icon: BookOpen, title: "Customer & Supplier Ledgers", desc: "Detailed ledger views for every customer and supplier showing all transactions, payments, and balances." },
      { icon: FileText, title: "Cheque Reports", desc: "Track issued and received cheques with status tracking — pending, cleared, bounced, or cancelled." },
      { icon: CalendarDays, title: "Cheque Calendar", desc: "Visual calendar view of upcoming cheque dates so you never miss a deposit or payment deadline." },
    ]}
    howItWorks={[
      { step: "1", title: "Register Accounts", desc: "Add your bank accounts and set opening balances. Link payment methods to specific accounts." },
      { step: "2", title: "Track Everything", desc: "All sales, purchases, and payments are automatically logged. Credit balances update in real time." },
      { step: "3", title: "Reconcile & Report", desc: "Match transactions, generate reports, and manage cheques from a single financial dashboard." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default BankingCredit;
