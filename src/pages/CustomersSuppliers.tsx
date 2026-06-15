import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Users, Truck, Building2, UserCog, BookOpen, Search } from "lucide-react";

const relatedLinks = [
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
  { label: "Settings & Security", path: "/settings-security-integrations" },
  { label: "POS Billing", path: "/billing-software-for-mobile-shop" },
];

const CustomersSuppliers = () => (
  <FeaturePageTemplate
    seoTitle="Customer & Supplier Management for Phone Shops | Cellivo"
    seoDescription="Customer and supplier management for phone shops with records, balances, branch visibility, and user access in one connected retail system."
    canonical="https://cellivo.com/customers-suppliers-management"
    breadcrumbs={[
      { name: "Home", path: "/" },
      { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
      { name: "Customer & Supplier Management", path: "/customers-suppliers-management" },
    ]}
    badge="People & Branches"
    painHook={[
      "Still managing customer, supplier, and staff records in different places?",
      "Losing track of purchase history, balances, and branch activity?",
      "Disconnected records create confusion across your phone shop.",
    ]}
    headline="Customer and Supplier Management for"
    highlightedText="Phone Shops"
    subheadline="Manage customer records, supplier profiles, branch locations, balances, and staff access inside one connected phone shop system."
    whyThisMatters={{
      problem:
        "When customer records, supplier details, branch settings, and user accounts are managed separately, your phone shop loses time chasing information, misses balance updates, and creates avoidable mistakes across daily workflows.",
      solution:
        "Cellivo gives phone shops one connected customer and supplier management system with branch locations and role-based access so your team can manage people, balances, and history with clearer control.",
    }}
    trustItems={[
      { value: "500+", label: "phone shops use Cellivo" },
      { value: "Role-Based", label: "access for teams" },
      { value: "Centralized", label: "records across branches" },
    ]}
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
    faqItems={[
      { q: "Can I manage customers and suppliers in one system?", a: "Yes. Cellivo keeps customer records, supplier profiles, balances, and history in one connected phone shop management system." },
      { q: "Does this support branch and user management?", a: "Yes. You can manage multiple branches, create user accounts, and control staff access with role-based permissions." },
      { q: "Can I view customer and supplier history quickly?", a: "Yes. Cellivo stores purchase history, repair records, balances, and account activity so your team can find details quickly." },
      { q: "Does it work with billing and inventory?", a: "Yes. Customer and supplier records connect directly with billing, inventory, and branch workflows across the platform." },
      { q: "Is this built for phone shops?", a: "Yes. Cellivo is built for phone shops that need customer, supplier, branch, and user management inside one mobile retail system." },
    ]}
  />
);

export default CustomersSuppliers;
