import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Users, Truck, Building2, UserCog, BookOpen, Search } from "lucide-react";

const relatedLinks = [
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
  { label: "Settings & Security", path: "/settings-security-integrations" },
  { label: "POS Billing", path: "/pos-billing-system" },
];

const CustomersSuppliers = () => (
  <FeaturePageTemplate
    seoTitle="Customer, Supplier, Branch & User Management | Cellivo"
    seoDescription="Manage customer records, supplier profiles, branch locations, and user accounts with role-based access — all from your Cellivo POS system."
    canonical="https://cellivo.lovable.app/customers-suppliers-management"
    badge="People & Branches"
    headline="Manage Everyone in Your Business from"
    highlightedText="One Platform"
    subheadline="Centralize customer records, supplier profiles, branch locations, and staff accounts. Control who accesses what with role-based permissions."
    benefits={[
      { icon: Users, title: "Customer Records", desc: "Store customer details, purchase history, repair records, credit balances, and contact information in one place." },
      { icon: Truck, title: "Supplier Records", desc: "Manage supplier profiles with contact details, payment terms, purchase history, and outstanding balances." },
      { icon: Building2, title: "Branch Management", desc: "Add and manage multiple branch locations. Configure branch-specific settings, inventory, and staff." },
      { icon: UserCog, title: "User Management", desc: "Create user accounts for staff with role-based permissions. Control access to modules, reports, and actions." },
      { icon: BookOpen, title: "Complete History", desc: "View full transaction history for any customer or supplier — purchases, returns, payments, and credit." },
      { icon: Search, title: "Quick Search", desc: "Find any customer, supplier, or user instantly with powerful search and filter capabilities." },
    ]}
    howItWorks={[
      { step: "1", title: "Add Records", desc: "Create customer, supplier, branch, or user profiles with all relevant details and settings." },
      { step: "2", title: "Set Permissions", desc: "Assign roles and access levels. Control what each user can see, edit, or manage across branches." },
      { step: "3", title: "Track Everything", desc: "All interactions are logged automatically. View history, balances, and activity for any record." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default CustomersSuppliers;
