import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { CreditCard, LayoutDashboard, UserPlus, FileText, LifeBuoy, Star } from "lucide-react";

const relatedLinks = [
  { label: "Settings & Security", path: "/settings-security-integrations" },
  { label: "Users & Branches", path: "/customers-suppliers-management" },
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Staff Commissions", path: "/staff-commissions-payroll" },
  { label: "Banking & Credit", path: "/banking-credit-cheques" },
];

const SubscriptionBilling = () => (
  <FeaturePageTemplate
    seoTitle="Subscription, Billing & Support Platform | Cellivo"
    seoDescription="Manage your Cellivo subscription, access the billing portal, sign up new branches, and get support — all from a centralized platform hub."
    canonical="https://cellivo.lovable.app/subscription-billing-support"
    badge="Subscription & Support"
    headline="Manage Your Plan with the"
    highlightedText="Subscription Hub"
    subheadline="View your subscription status, manage billing, add new branches through the signup portal, and access support — everything in one centralized platform."
    benefits={[
      { icon: Star, title: "Subscription Management", desc: "View your current plan, usage limits, renewal dates, and upgrade options at a glance." },
      { icon: LayoutDashboard, title: "Subscription Hub", desc: "Centralized dashboard showing all subscription details, add-ons, and account activity." },
      { icon: UserPlus, title: "Signup Portal", desc: "Onboard new branches or staff with a streamlined signup portal — fast and guided setup." },
      { icon: FileText, title: "Billing Portal", desc: "Access invoices, payment history, update payment methods, and download receipts anytime." },
      { icon: LifeBuoy, title: "Support Center", desc: "Get help with tickets, live chat, knowledge base articles, and video tutorials — all in one place." },
      { icon: CreditCard, title: "Flexible Billing", desc: "Choose monthly or annual billing. Upgrade, downgrade, or add branches at any time." },
    ]}
    howItWorks={[
      { step: "1", title: "Choose Your Plan", desc: "Select the plan that fits your business size. Start with a free trial — no credit card required." },
      { step: "2", title: "Manage & Scale", desc: "Add branches, upgrade features, and manage billing from the subscription hub as you grow." },
      { step: "3", title: "Get Support", desc: "Access the support center for help anytime — tickets, chat, docs, and video guides." },
    ]}
    relatedLinks={relatedLinks}
  />
);

export default SubscriptionBilling;
