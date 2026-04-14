import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Heart, Gift, Star, Users, TrendingUp, Bell } from "lucide-react";

const allFeatureLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
];

const CustomerLoyaltySystem = () => (
  <FeaturePageTemplate
    seoTitle="Customer Loyalty System for Phone Shops | Cellivo"
    seoDescription="Build customer loyalty with Cellivo's built-in loyalty program. Track purchase history, reward repeat customers, and increase retention for your mobile phone shop."
    canonical="https://cellivo.lovable.app/customer-loyalty-system"
    badge="Customer Loyalty"
    headline="Turn Buyers into"
    highlightedText="Repeat Customers"
    subheadline="Track every customer's purchase and repair history. Reward loyalty, send targeted promotions, and build lasting relationships that drive repeat business."
    benefits={[
      { icon: Heart, title: "Customer Profiles", desc: "Every customer gets a profile with complete purchase history, repair records, and contact details." },
      { icon: Gift, title: "Loyalty Rewards", desc: "Set up point-based rewards or discount tiers. Customers earn with every purchase." },
      { icon: Star, title: "VIP Tiers", desc: "Create customer tiers based on spending. Offer exclusive discounts to your best customers." },
      { icon: Users, title: "Purchase History", desc: "See what each customer bought, when, and for how much. Personalize every interaction." },
      { icon: TrendingUp, title: "Retention Analytics", desc: "Track repeat purchase rates, customer lifetime value, and identify at-risk customers." },
      { icon: Bell, title: "Targeted Promotions", desc: "Send SMS or email promotions to specific customer segments based on their history." },
    ]}
    howItWorks={[
      { step: "1", title: "Register Customers", desc: "Add customer details during checkout or let them sign up. Quick and frictionless." },
      { step: "2", title: "Track & Reward", desc: "Every transaction earns points or advances their loyalty tier automatically." },
      { step: "3", title: "Retain & Grow", desc: "Use analytics to identify loyal customers and bring back inactive ones with promotions." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default CustomerLoyaltySystem;
