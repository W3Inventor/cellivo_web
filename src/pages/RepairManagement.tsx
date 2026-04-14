import FeaturePageTemplate from "@/components/FeaturePageTemplate";
import { Wrench, Bell, UserCog, Package, FileText, Clock } from "lucide-react";

const allFeatureLinks = [
  { label: "POS Billing", path: "/pos-billing-system" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const RepairManagement = () => (
  <FeaturePageTemplate
    seoTitle="Mobile Repair Management Software | Cellivo"
    seoDescription="Track every repair job from intake to completion with Cellivo's repair management software. Assign technicians, manage parts, auto-notify customers, and eliminate lost repair tickets."
    canonical="https://cellivo.lovable.app/mobile-repair-management-software"
    badge="Repair Management"
    headline="Never Lose a Repair Job with"
    highlightedText="Smart Repair Tracking"
    subheadline="Log every repair with device details, assign technicians, track parts used, and send automatic status updates to customers. No more lost tickets or confusion."
    benefits={[
      { icon: Wrench, title: "Complete Repair Logging", desc: "Record device type, issue description, customer details, estimated cost, and expected completion date." },
      { icon: UserCog, title: "Technician Assignment", desc: "Assign repairs to specific technicians. Track who worked on what and measure performance." },
      { icon: Package, title: "Parts Tracking", desc: "Link spare parts from inventory to repair jobs. Track usage and costs per repair." },
      { icon: Bell, title: "Auto Customer Notifications", desc: "Customers receive SMS and email updates when their repair status changes — no phone calls needed." },
      { icon: FileText, title: "Repair Invoicing", desc: "Generate repair invoices with itemized parts, labor costs, and warranty terms automatically." },
      { icon: Clock, title: "Status Workflow", desc: "Move repairs through stages: Received → Diagnosing → In Progress → Ready → Collected." },
    ]}
    howItWorks={[
      { step: "1", title: "Log the Repair", desc: "Enter device details, customer info, and issue description. A repair ticket is created instantly." },
      { step: "2", title: "Assign & Track", desc: "Assign to a technician, add parts used, and update the status as work progresses." },
      { step: "3", title: "Notify & Invoice", desc: "Customer is notified automatically. Generate a repair invoice when the job is done." },
    ]}
    relatedLinks={allFeatureLinks}
  />
);

export default RepairManagement;
