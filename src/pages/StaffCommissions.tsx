import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { BadgeDollarSign, Users, Wrench, Calculator, FileText, Wallet } from "lucide-react";

const relatedLinks = [
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Users & Branches", path: "/customers-suppliers-management" },
  { label: "Settings & Security", path: "/settings-security-integrations" },
];

const StaffCommissions = () => (
  <FeaturePageTemplate
    seoTitle="Staff Commissions & Payroll Management | Cellivo"
    seoDescription="Automate cashier and technician commissions, manage payroll, process advances, and generate payslips — all built into your phone shop POS with Cellivo."
    canonical="https://cellivo.lovable.app/staff-commissions-payroll"
    badge="Commissions & Payroll"
    headline="Automate Staff Pay with"
    highlightedText="Commissions & Payroll"
    subheadline="Calculate commissions for cashiers and technicians automatically based on sales and repairs. Manage payroll, advances, and payslips — all in one system."
    benefits={[
      { icon: BadgeDollarSign, title: "Commission Dashboard", desc: "See total commissions earned by each staff member with breakdowns by sales, repairs, and date range." },
      { icon: Users, title: "Cashier Commissions", desc: "Set commission rules for cashiers based on sales volume, product category, or profit margin." },
      { icon: Wrench, title: "Technician Commissions", desc: "Track repair-based commissions for technicians. Reward based on completed jobs, parts used, or revenue." },
      { icon: Calculator, title: "Payroll Management", desc: "Process monthly payroll with base salary, commissions, deductions, and bonuses calculated automatically." },
      { icon: Wallet, title: "Payroll Advances", desc: "Record salary advances and automatically deduct them from the next payroll cycle." },
      { icon: FileText, title: "Payslip Generation", desc: "Generate professional payslips with itemized earnings, deductions, and net pay for every staff member." },
    ]}
    howItWorks={[
      { step: "1", title: "Set Commission Rules", desc: "Define commission percentages or fixed amounts for cashiers and technicians based on your business model." },
      { step: "2", title: "Auto-Calculate", desc: "Commissions are calculated automatically as sales and repairs are processed through the POS." },
      { step: "3", title: "Process Payroll", desc: "Run payroll with one click. Commissions, advances, and deductions are all factored in. Generate payslips instantly." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default StaffCommissions;
