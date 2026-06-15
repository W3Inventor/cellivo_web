import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
  ArrowRight, CheckCircle2, CreditCard, Zap, ShieldCheck, Clock,
  Receipt, Wallet, Wrench, ArrowLeftRight, BadgePercent, Store, Users, Printer,
  Package, Hash, Barcode, Bell, Truck, HandCoins, DollarSign,
  ClipboardList, UserCog, GitBranch, FileText, Eye, Settings2, MessageSquare, ShieldAlert,
  Banknote, Landmark, BookOpen, Calculator, PiggyBank, Receipt as ReceiptIcon,
  CreditCard as CreditCardIcon, BookOpenCheck, MessageCircle, Star, CalendarCheck, Gift, Scale,
  Shield, Lock, KeyRound, ScrollText, Monitor, Timer, Database,
  UserCheck, BadgeDollarSign, Calendar, Briefcase, CircleDollarSign,
  Building2, ArrowRightLeft, LayoutDashboard, BarChart3, Boxes, UsersRound,
  TrendingUp, Target, ClipboardCheck, FileBarChart, HeartHandshake,
  ShoppingCart, Mail, ScanBarcode, X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MODAL DATA TYPE                                                    */
/* ------------------------------------------------------------------ */

interface ModalData {
  title: string;
  description: string;
  bullets: string[];
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  link?: string;
  modal?: ModalData;
}

interface FeatureGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  features: FeatureCard[];
  benefits: string[];
}

interface FeatureLink {
  label: string;
  path: string;
}

interface SeoCluster {
  icon: LucideIcon;
  title: string;
  description: string;
  links: FeatureLink[];
}

interface FeatureFaq {
  q: string;
  a: string;
}

const groups: FeatureGroup[] = [
  {
    id: "pos-sales",
    label: "POS Billing",
    title: "POS Billing System for Phone Shops",
    description: "Bill phones and accessories faster with a POS system built for phone shops. Create invoices, track payments, and generate clean receipts without slowing your counter.",
    features: [
      { icon: Zap, title: "Fast Billing", desc: "Create clean invoices in seconds with quick item lookup, automatic totals, and faster counter service.", link: "/billing-software-for-mobile-shop" },
      { icon: Wallet, title: "Multi-Payment Support", desc: "Accept cash, card, bank transfer, and split payments without slowing down checkout.", link: "/billing-software-for-mobile-shop" },
      { icon: Wrench, title: "Repair Billing", desc: "Bill labor, parts, and warranty work together so every repair stays profitable and documented.", link: "/mobile-repair-management-software" },
      { icon: ArrowLeftRight, title: "Exchange / Trade-In", desc: "Handle phone trade-ins and exchanges with automatic value adjustments.", modal: {
        title: "Exchange / Trade-In",
        description: "Cellivo lets you handle phone trade-ins and device exchanges directly at the POS — no workarounds or manual calculations needed.",
        bullets: [
          "Accept used phones as partial payment toward new purchases",
          "Auto-calculate trade-in value based on condition grading",
          "Track exchanged devices with IMEI for full audit trail",
          "Apply trade-in credit instantly to the current invoice",
          "Generate separate trade-in receipts for customer records",
        ],
      }},
      { icon: BadgePercent, title: "Discount Approval", desc: "Set discount limits by role and require manager approval for overrides.", modal: {
        title: "Discount Approval Workflow",
        description: "Prevent unauthorized discounts with a role-based approval system that keeps margins safe while giving your team flexibility.",
        bullets: [
          "Set maximum discount percentages per staff role",
          "Require manager PIN approval for discounts above limits",
          "Track all discount history with staff attribution",
          "Configure discount rules per product category",
          "View discount analytics to spot patterns and abuse",
        ],
      }},
      { icon: Store, title: "Wholesale", desc: "Separate wholesale pricing tiers and bulk invoicing for B2B customers.", modal: {
        title: "Wholesale & B2B Sales",
        description: "Manage wholesale customers with dedicated pricing tiers, bulk invoicing, and credit terms — all within the same POS.",
        bullets: [
          "Create separate wholesale price lists per customer tier",
          "Generate bulk invoices with quantity-based pricing",
          "Apply B2B credit terms and payment schedules",
          "Track wholesale margins separately from retail",
          "Export wholesale reports for accounting and tax",
        ],
      }},
      { icon: Users, title: "Customer Lookup", desc: "Instantly find customer history, credit balance, and loyalty points at checkout.", link: "/customers-suppliers-management" },
      { icon: Printer, title: "Invoice Printing", desc: "Print thermal receipts, A4 invoices, or email digital copies automatically.", modal: {
        title: "Invoice Printing & Delivery",
        description: "Print or send invoices in any format your customers prefer — thermal receipts, A4 printouts, or digital copies via email and SMS.",
        bullets: [
          "Print thermal receipts (58mm/80mm) instantly at checkout",
          "Generate A4/A5 formatted invoices for business customers",
          "Email digital invoice copies automatically after sale",
          "Customize invoice templates with your logo and branding",
          "Queue multiple print jobs for busy checkout periods",
        ],
      }},
    ],
    benefits: [
      "Process sales 3× faster than manual billing",
      "Reduce pricing errors with role-based discounts",
      "Handle any payment method your customers prefer",
      "Complete trade-ins without leaving the POS screen",
    ],
  },
  {
    id: "inventory",
    label: "IMEI & Inventory",
    title: "IMEI and Serial Number Tracking",
    description: "Track every mobile device by IMEI or serial number so you can trace stock, sales, warranties, and returns without guesswork.",
    features: [
      { icon: Package, title: "Purchase & GRN", desc: "Create purchase orders and verify goods received with GRN matching.", link: "/inventory-management-system" },
      { icon: Hash, title: "IMEI Tracking", desc: "Track each phone by IMEI from purchase to sale, return, or warranty claim.", link: "/imei-tracking-pos-system" },
      { icon: ScanBarcode, title: "Serial Number Tracking", desc: "Track serialized accessories and parts alongside IMEI-based inventory.", link: "/imei-tracking-pos-system" },
      { icon: Barcode, title: "Barcode Management", desc: "Generate, print, and scan barcodes for fast stock lookup and billing.", modal: {
        title: "Barcode Management",
        description: "Generate, print, and scan barcodes to speed up stock management and billing — works with any standard barcode scanner.",
        bullets: [
          "Auto-generate barcodes for new products on intake",
          "Print barcode labels in bulk with customizable formats",
          "Scan-to-bill at checkout for instant item lookup",
          "Support for Code 128, EAN-13, and QR code formats",
          "Barcode search across all branches in real time",
        ],
      }},
      { icon: Bell, title: "Stock Alerts", desc: "Get low-stock alerts before your best-selling phones and accessories run out.", link: "/inventory-management-system" },
      { icon: ArrowRightLeft, title: "Stock Transfer", desc: "Move inventory between branches with full transfer tracking and approval.", link: "/multi-branch-pos-system" },
      { icon: Truck, title: "Supplier Management", desc: "Maintain supplier profiles, purchase history, and performance records.", link: "/customers-suppliers-management" },
      { icon: HandCoins, title: "Supplier Payment", desc: "Track supplier balances, schedule payments, and reconcile bills.", link: "/banking-credit-cheques" },
    ],
    benefits: [
      "Know exactly where every phone is — by IMEI",
      "Eliminate stock-outs with automated low-stock alerts",
      "Speed up receiving with GRN verification",
      "Full supplier ledger for better cash flow planning",
    ],
  },
  {
    id: "repair",
    label: "Repair Management",
    title: "Repair Management System for Phone Shops",
    description: "Track every repair with customer details, device issues, technician updates, parts usage, and payments all in one place.",
    features: [
      { icon: ClipboardList, title: "Job Ticket Tracking", desc: "Track every repair with customer details, device issues, photos, and promised dates in one ticket.", link: "/mobile-repair-management-software" },
      { icon: UserCog, title: "Technician Assignment", desc: "Assign the right technician faster based on skill, workload, and repair status.", link: "/mobile-repair-management-software" },
      { icon: GitBranch, title: "Repair Workflow", desc: "Move each job from intake to pickup with clear stages and no missed updates.", link: "/mobile-repair-management-software" },
      { icon: FileText, title: "Repair Invoice", desc: "Auto-generate invoices from completed repairs with parts and labor breakdown.", link: "/mobile-repair-management-software" },
      { icon: Eye, title: "Customer Repair Status Page", desc: "Give customers a link to check their repair status in real time.", modal: {
        title: "Customer Repair Status Page",
        description: "Build trust and reduce phone calls by giving customers a unique link to track their repair status online — in real time.",
        bullets: [
          "Auto-generate a unique tracking link for each repair job",
          "Show real-time status: received, diagnosing, repairing, ready",
          "Display estimated completion time and cost breakdown",
          "Send SMS/email with tracking link when job is created",
          "Customizable status page with your shop branding",
        ],
      }},
      { icon: Settings2, title: "Parts Usage Tracking", desc: "Deduct spare parts from inventory automatically when used in repairs.", modal: {
        title: "Parts Usage Tracking",
        description: "Automatically deduct spare parts from inventory when assigned to a repair — ensuring accurate stock levels and repair costing.",
        bullets: [
          "Link spare parts to specific repair jobs with one click",
          "Auto-deduct parts from inventory upon assignment",
          "Track parts cost per repair for accurate profit calculation",
          "View parts consumption history by technician or job type",
          "Get alerts when commonly-used parts are running low",
        ],
      }},
      { icon: ShieldCheck, title: "Warranty Tracking", desc: "Set warranty periods on repairs and get alerts before they expire.", modal: {
        title: "Repair Warranty Tracking",
        description: "Set warranty terms on completed repairs and track them automatically — so you never miss a warranty claim or expiry.",
        bullets: [
          "Set custom warranty periods per repair type or service",
          "Automatic alerts before warranty expiry dates",
          "Quick warranty lookup by job ID, IMEI, or customer name",
          "Handle warranty claims with linked original repair records",
          "Generate warranty certificates for customer records",
        ],
      }},
      { icon: MessageSquare, title: "Repair Notifications", desc: "Send SMS or email updates when repair status changes.", modal: {
        title: "Repair Notifications",
        description: "Keep customers informed automatically — send SMS or email notifications at every stage of the repair process.",
        bullets: [
          "Auto-send notifications when repair status changes",
          "Customizable SMS and email templates per status stage",
          "Notify customers when device is ready for pickup",
          "Send payment reminders for completed but unpaid repairs",
          "Batch notification sending for multiple job updates",
        ],
      }},
    ],
    benefits: [
      "Reduce repair turnaround time by 40%",
      "Eliminate lost tickets and forgotten repairs",
      "Build customer trust with real-time status updates",
      "Track every part used for accurate costing",
    ],
  },
  {
    id: "finance",
    label: "Finance & Banking",
    title: "Complete Financial Control for Your Business",
    description: "Manage cash flow, bank accounts, expenses, and reconciliation — all without switching to separate accounting software.",
    features: [
      { icon: Banknote, title: "Cash Drawer Management", desc: "Open and close drawer sessions, track every cash movement in real time.", link: "/cash-drawer-management" },
      { icon: Landmark, title: "Bank Account Tracking", desc: "Connect multiple bank accounts and monitor balances and transactions.", link: "/banking-credit-cheques" },
      { icon: BookOpen, title: "Cheque Tracking", desc: "Record issued and received cheques with maturity dates and status.", link: "/banking-credit-cheques" },
      { icon: ScrollText, title: "Ledger Management", desc: "Maintain customer and supplier ledgers with automatic balance updates.", link: "/banking-credit-cheques" },
      { icon: DollarSign, title: "Payment Tracking", desc: "Track all incoming and outgoing payments across channels.", modal: {
        title: "Payment Tracking",
        description: "Monitor every payment flowing in and out of your business — across cash, card, bank transfer, and digital wallets.",
        bullets: [
          "Track payments by method: cash, card, transfer, cheque",
          "View real-time payment status: pending, received, overdue",
          "Match payments to invoices automatically",
          "Filter payment history by date, customer, or method",
          "Export payment reports for accounting and tax filing",
        ],
      }},
      { icon: Calculator, title: "Expense Management", desc: "Categorize and track business expenses for clear profit visibility.", modal: {
        title: "Expense Management",
        description: "Record and categorize every business expense — rent, utilities, supplies, salaries — for complete visibility into your true profitability.",
        bullets: [
          "Create expense categories tailored to your business",
          "Record recurring expenses with auto-reminders",
          "Attach receipts and documents to expense entries",
          "View expense trends with monthly/quarterly breakdowns",
          "Factor expenses into profit & loss reports automatically",
        ],
      }},
      { icon: PiggyBank, title: "Income Tracking", desc: "Monitor all revenue streams — sales, repairs, services, top-ups.", modal: {
        title: "Income Tracking",
        description: "See exactly where your money comes from — track revenue from sales, repairs, reload services, and accessories in one dashboard.",
        bullets: [
          "Automatic income recording from all POS transactions",
          "Break down revenue by category: phones, repairs, accessories",
          "Compare income across time periods and branches",
          "Track daily, weekly, and monthly revenue targets",
          "Export income data for tax returns and audits",
        ],
      }},
      { icon: Scale, title: "Reconciliation", desc: "Match bank statements with system records to catch discrepancies.", link: "/banking-credit-cheques" },
    ],
    benefits: [
      "See your real profit — not just revenue",
      "Never lose track of cheques or pending payments",
      "Automated ledgers save hours of manual bookkeeping",
      "Reconcile accounts in minutes, not hours",
    ],
  },
  {
    id: "credit-loyalty",
    label: "Customer & Loyalty",
    title: "Customer Management and Loyalty System",
    description: "Store customer data, track purchase history, and run loyalty programs that bring shoppers back more often.",
    features: [
      { icon: CalendarCheck, title: "Installment Plans", desc: "Set up flexible payment plans for high-value phone purchases.", link: "/customer-loyalty-system" },
      { icon: BookOpenCheck, title: "Credit Ledger", desc: "Track every credit sale with automatic balance and due date tracking.", link: "/banking-credit-cheques" },
      { icon: MessageCircle, title: "SMS Reminders", desc: "Send automated payment reminders before and after due dates.", modal: {
        title: "SMS Payment Reminders",
        description: "Reduce overdue payments with automated SMS reminders that notify customers before and after their payment due dates.",
        bullets: [
          "Schedule reminders X days before and after due dates",
          "Customize reminder message templates with customer details",
          "Auto-include outstanding balance and payment link",
          "Track reminder delivery and response rates",
          "Escalate overdue accounts with follow-up sequences",
        ],
      }},
      { icon: Star, title: "Loyalty Points", desc: "Award points on purchases and let customers redeem for discounts.", link: "/customer-loyalty-system" },
      { icon: Clock, title: "Due Tracking", desc: "Dashboard view of all overdue payments with aging analysis.", modal: {
        title: "Due Date & Aging Tracker",
        description: "Stay on top of every overdue payment with a visual dashboard showing aging buckets, overdue amounts, and customer details.",
        bullets: [
          "View overdue payments grouped by aging: 30/60/90+ days",
          "Filter by customer, amount, or branch for quick action",
          "One-click SMS or call reminders from the dashboard",
          "Track partial payments and remaining balances in real time",
          "Export aging reports for management review",
        ],
      }},
      { icon: CreditCardIcon, title: "Customer Balance", desc: "See each customer's outstanding balance and payment history instantly.", link: "/customers-suppliers-management" },
      { icon: Calendar, title: "Payment Schedule", desc: "Create and manage payment schedules with flexible terms.", modal: {
        title: "Payment Schedules",
        description: "Create flexible payment schedules for installment sales and credit customers — with automatic tracking and reminders.",
        bullets: [
          "Set custom payment frequencies: weekly, bi-weekly, monthly",
          "Auto-calculate installment amounts with interest options",
          "Visual calendar view of upcoming and missed payments",
          "Automatic status updates: paid, pending, overdue",
          "Link schedules to customer profiles for easy lookup",
        ],
      }},
      { icon: Gift, title: "Reward Redemption", desc: "Let customers redeem points at checkout — seamlessly integrated.", link: "/customer-loyalty-system" },
    ],
    benefits: [
      "Increase average order value with installment options",
      "Reduce overdue payments with automated reminders",
      "Build customer loyalty with a points-based rewards system",
      "Full visibility into credit exposure at any time",
    ],
  },
  {
    id: "staff",
    label: "Staff & Payroll",
    title: "Staff Management and Access Control",
    description: "Control who can bill, discount, edit stock, and view margins while keeping your phone shop secure and accountable.",
    features: [
      { icon: Shield, title: "Role-Based Access", desc: "Define granular permissions for cashiers, technicians, managers, and owners.", link: "/settings-security-integrations" },
      { icon: BadgeDollarSign, title: "Commission Tracking", desc: "Automatically calculate commissions on sales, repairs, and services.", link: "/staff-commissions-payroll" },
      { icon: Briefcase, title: "Payroll Management", desc: "Process monthly payroll with deductions, advances, and payslip generation.", link: "/staff-commissions-payroll" },
      { icon: Timer, title: "Shift Management", desc: "Schedule staff shifts and track attendance across branches.", modal: {
        title: "Shift & Attendance Management",
        description: "Schedule shifts, track attendance, and manage working hours for your entire team — across all branches from one place.",
        bullets: [
          "Create and assign shifts with drag-and-drop scheduling",
          "Track clock-in and clock-out times per staff member",
          "View attendance reports with late arrivals and absences",
          "Auto-calculate overtime hours for payroll processing",
          "Branch-level shift management with cross-branch visibility",
        ],
      }},
      { icon: CircleDollarSign, title: "Salary Advances", desc: "Record and deduct salary advances with automatic payroll adjustment.", link: "/staff-commissions-payroll" },
    ],
    benefits: [
      "Prevent unauthorized actions with role-based permissions",
      "Motivate staff with transparent commission tracking",
      "Run payroll in minutes — no spreadsheets needed",
    ],
  },
  {
    id: "multi-branch",
    label: "Multi-Branch",
    title: "Multi-Branch POS System",
    description: "Run multiple phone shop locations from one dashboard with centralized stock visibility, branch transfers, and branch-level performance tracking.",
    features: [
      { icon: Building2, title: "Branch Management", desc: "Manage every shop location with its own staff, stock, and settings from one admin view.", link: "/multi-branch-pos-system" },
      { icon: ArrowRightLeft, title: "Stock Transfer Between Branches", desc: "Move inventory between locations with approval workflows and tracking.", link: "/multi-branch-pos-system" },
      { icon: LayoutDashboard, title: "Central Dashboard", desc: "See branch sales, stock, repairs, and margins in one live dashboard.", link: "/multi-branch-pos-system" },
      { icon: BarChart3, title: "Branch-Wise Reports", desc: "Compare branch performance with side-by-side analytics.", modal: {
        title: "Branch-Wise Reports",
        description: "Compare performance across all your locations with detailed branch-level reporting — sales, stock, staff productivity, and profitability.",
        bullets: [
          "Side-by-side comparison of sales across branches",
          "Branch-level profit & loss and expense tracking",
          "Identify top-performing and underperforming locations",
          "Track stock movement and transfer efficiency per branch",
          "Export branch reports for stakeholder presentations",
        ],
      }},
      { icon: Boxes, title: "Branch Inventory View", desc: "Check real-time stock levels at any branch from anywhere.", modal: {
        title: "Branch Inventory View",
        description: "See real-time stock levels at any of your branches from a single screen — know exactly what's available and where.",
        bullets: [
          "Real-time stock visibility across all locations",
          "Filter inventory by branch, category, or product type",
          "View IMEI-level device locations across branches",
          "Quick-initiate stock transfers from the inventory view",
          "Set branch-specific reorder levels and stock alerts",
        ],
      }},
      { icon: UsersRound, title: "Branch Staff Control", desc: "Manage staff roles and permissions independently per branch.", modal: {
        title: "Branch Staff Control",
        description: "Manage staff assignments, roles, and permissions independently for each branch — while maintaining centralized oversight.",
        bullets: [
          "Assign staff to specific branches with role-based access",
          "Set branch-level permissions independent of other locations",
          "Transfer staff between branches with permission updates",
          "View staff activity logs filtered by branch",
          "Centralized staff directory with branch assignments",
        ],
      }},
    ],
    benefits: [
      "One login to manage your entire business",
      "Transfer stock between branches in seconds",
      "Identify top-performing and underperforming locations",
      "Independent branch settings with centralized oversight",
    ],
  },
  {
    id: "reports",
    label: "Reports & Insights",
    title: "Sales Reports and Business Insights",
    description: "See revenue, profit, expenses, and stock performance quickly enough to make better decisions every day.",
    features: [
      { icon: TrendingUp, title: "Sales Reports", desc: "Daily, weekly, and monthly sales breakdowns by product, category, and staff.", modal: {
        title: "Sales Reports",
        description: "Get detailed sales breakdowns across any time period — by product, category, staff member, or payment method.",
        bullets: [
          "Daily, weekly, monthly, and custom date range reports",
          "Break down sales by product, category, brand, or staff",
          "Compare sales performance across time periods",
          "View top-selling products and slow-moving inventory",
          "Export reports to PDF or Excel with one click",
        ],
      }},
      { icon: Target, title: "Profit Tracking", desc: "See real profit margins per phone, accessory, and repair job.", modal: {
        title: "Profit Tracking & Margins",
        description: "See your real profit margins — not just revenue. Track profitability per product, category, repair job, and branch.",
        bullets: [
          "Calculate gross and net profit per transaction",
          "Track margin trends over time with visual charts",
          "Compare profitability across product categories",
          "Factor in expenses for true net profit visibility",
          "Set margin alerts for low-profit transactions",
        ],
      }},
      { icon: LayoutDashboard, title: "KPI Dashboard", desc: "Track key performance indicators with real-time visual dashboards.", modal: {
        title: "KPI Dashboard",
        description: "Monitor your business health at a glance with a real-time dashboard showing your most critical key performance indicators.",
        bullets: [
          "Real-time widgets for revenue, profit, and transaction count",
          "Repair turnaround time and completion rate tracking",
          "Customer acquisition and retention metrics",
          "Staff productivity and commission leaderboards",
          "Customizable dashboard layout per user role",
        ],
      }},
      { icon: ClipboardCheck, title: "Stock Reports", desc: "Inventory valuation, aging stock, dead stock, and movement reports.", modal: {
        title: "Stock & Inventory Reports",
        description: "Understand your inventory health — see valuation, aging stock, dead stock, fast movers, and stock movement across branches.",
        bullets: [
          "Current inventory valuation at cost and retail price",
          "Aging stock report to identify slow-moving items",
          "Dead stock identification with disposal recommendations",
          "Stock movement history with source and destination tracking",
          "Low-stock and out-of-stock alerts with reorder suggestions",
        ],
      }},
      { icon: FileBarChart, title: "Repair Reports", desc: "Repair turnaround times, technician productivity, and revenue analysis.", modal: {
        title: "Repair Reports & Analytics",
        description: "Measure your repair workshop's efficiency — turnaround times, technician productivity, parts costs, and repair revenue.",
        bullets: [
          "Average repair turnaround time by job type",
          "Technician productivity and job completion rates",
          "Revenue and profit breakdown per repair category",
          "Parts cost analysis and usage frequency",
          "Warranty claim frequency and cost reports",
        ],
      }},
      { icon: HeartHandshake, title: "Customer Reports", desc: "Top customers, purchase frequency, credit exposure, and loyalty stats.", modal: {
        title: "Customer Reports",
        description: "Understand your customer base — identify top spenders, track purchase frequency, and monitor credit exposure and loyalty stats.",
        bullets: [
          "Top customers by revenue, frequency, and lifetime value",
          "Credit exposure report with risk assessment",
          "Loyalty program participation and redemption rates",
          "Customer segmentation by purchase behavior",
          "New vs returning customer acquisition trends",
        ],
      }},
      { icon: Calculator, title: "Finance Reports", desc: "P&L statements, cash flow, expense trends, and bank reconciliation.", modal: {
        title: "Finance Reports",
        description: "Generate professional financial reports — profit & loss, cash flow statements, expense breakdowns, and reconciliation summaries.",
        bullets: [
          "Profit & loss statements for any date range",
          "Cash flow reports with inflow and outflow tracking",
          "Expense trend analysis by category and period",
          "Bank reconciliation summary with discrepancy flags",
          "Tax-ready reports for accountant handoff",
        ],
      }},
    ],
    benefits: [
      "Make data-driven decisions — not gut-feel guesses",
      "Identify your most profitable products and services",
      "Spot trends before they become problems",
      "Export any report to PDF or Excel",
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    title: "Seamless Integrations with Your Tools",
    description: "Connect Cellivo with the tools you already use — no coding required.",
    features: [
      { icon: ShoppingCart, title: "WooCommerce Sync", desc: "Sync products, stock levels, and orders between your POS and online store.", link: "/integrations" },
      { icon: MessageSquare, title: "SMS Integration", desc: "Send automated SMS for invoices, repair updates, and payment reminders.", link: "/integrations" },
      { icon: Mail, title: "Email Integration", desc: "Email invoices, reports, and notifications directly from the system.", link: "/integrations" },
      { icon: Printer, title: "Printer Integration", desc: "Works with thermal receipt printers and standard A4/A5 printers.", link: "/integrations" },
      { icon: ScanBarcode, title: "Barcode Scanner Integration", desc: "Plug-and-play support for USB and Bluetooth barcode scanners.", link: "/integrations" },
    ],
    benefits: [
      "Sell online and in-store from one system",
      "Automate customer communications",
      "Works with hardware you already own",
    ],
  },
  {
    id: "security",
    label: "Security",
    title: "Enterprise-Grade Security for Your Data",
    description: "Your business data is valuable. Cellivo keeps it safe with multiple layers of protection.",
    features: [
      { icon: KeyRound, title: "Two-Factor Authentication", desc: "Add an extra layer of security to every user login.", modal: {
        title: "Two-Factor Authentication",
        description: "Protect your business data with an extra layer of security — require a second verification step for every user login.",
        bullets: [
          "SMS or email-based verification codes on login",
          "Enforce 2FA for specific roles (admin, manager)",
          "Trusted device management to skip 2FA on known devices",
          "Failed login attempt monitoring and lockout policies",
          "Easy setup wizard for staff onboarding",
        ],
      }},
      { icon: Shield, title: "Role Permissions", desc: "Control exactly what each user can see, edit, and delete.", modal: {
        title: "Granular Role Permissions",
        description: "Define exactly what each team member can access — down to individual modules, actions, and data visibility levels.",
        bullets: [
          "Pre-built roles: Owner, Manager, Cashier, Technician",
          "Custom role creation with granular permission toggles",
          "Module-level access: view, create, edit, delete per section",
          "Data visibility controls (e.g. hide cost prices from cashiers)",
          "Permission changes take effect instantly — no restart needed",
        ],
      }},
      { icon: Lock, title: "IP Lock", desc: "Restrict system access to specific IP addresses or ranges.", modal: {
        title: "IP Address Restriction",
        description: "Lock down system access to specific IP addresses or ranges — ensuring only authorized networks can reach your POS data.",
        bullets: [
          "Whitelist specific IP addresses for system access",
          "Support IP ranges for office network restrictions",
          "Separate IP rules per branch or user role",
          "Instant alerts when access is attempted from blocked IPs",
          "Emergency override with owner-level authentication",
        ],
      }},
      { icon: ScrollText, title: "Audit Logs", desc: "Track every action — who did what, when, and from where.", modal: {
        title: "Audit Logs & Activity Trail",
        description: "Maintain a complete record of every action taken in the system — who did what, when, from which device, and which branch.",
        bullets: [
          "Log every create, edit, delete, and login action",
          "Filter logs by user, action type, module, or date range",
          "Track sensitive actions: price changes, deletions, refunds",
          "Export audit logs for compliance and investigation",
          "Real-time activity feed for administrators",
        ],
      }},
      { icon: Monitor, title: "Device Login Control", desc: "Manage which devices are authorized to access the system.", modal: {
        title: "Device Login Control",
        description: "Control which devices can access your Cellivo account — approve, block, or monitor devices for enhanced security.",
        bullets: [
          "View all devices currently logged into your account",
          "Approve or block specific devices remotely",
          "Get notifications when a new device logs in",
          "Force logout from any device with one click",
          "Device fingerprinting for accurate identification",
        ],
      }},
      { icon: Timer, title: "Session Management", desc: "Auto-logout idle sessions and monitor active logins.", modal: {
        title: "Session Management",
        description: "Automatically log out idle users, monitor active sessions, and maintain full control over who's currently accessing the system.",
        bullets: [
          "Configurable auto-logout after idle timeout",
          "View all active sessions across branches and devices",
          "Force-end any active session remotely",
          "Session history with login/logout timestamps",
          "Concurrent session limits per user role",
        ],
      }},
      { icon: Database, title: "Data Backup", desc: "Automatic daily backups with one-click restore capability.", modal: {
        title: "Automatic Data Backup",
        description: "Your business data is backed up automatically every day — with the ability to restore to any point in time with a single click.",
        bullets: [
          "Automated daily backups with no manual intervention",
          "Point-in-time restore to recover from any incident",
          "Backup verification to ensure data integrity",
          "Encrypted backup storage for maximum security",
          "Download backup copies for offline archival",
        ],
      }},
      { icon: ShieldAlert, title: "Data Encryption", desc: "All data encrypted in transit and at rest with industry-standard protocols.", modal: {
        title: "Data Encryption",
        description: "All your business data is encrypted with industry-standard protocols — both when it's being transmitted and when it's stored.",
        bullets: [
          "TLS 1.3 encryption for all data in transit",
          "AES-256 encryption for data at rest",
          "Encrypted database connections and API endpoints",
          "Secure credential storage with hashing and salting",
          "Regular security audits and penetration testing",
        ],
      }},
    ],
    benefits: [
      "Sleep easy knowing your data is protected",
      "Full audit trail for accountability",
      "Comply with data protection requirements",
      "Recover from any incident with automatic backups",
    ],
  },
];

const seoClusters: SeoCluster[] = [
  {
    icon: Package,
    title: "Smart Inventory Management",
    description:
      "Know exactly what you have in stock at all times. Track IMEI and serial numbers, avoid losses, and manage mobiles and accessories without confusion.",
    links: [
      { label: "Explore inventory management", path: "/inventory-management-system" },
      { label: "See IMEI tracking tools", path: "/imei-tracking-pos-system" },
    ],
  },
  {
    icon: ReceiptIcon,
    title: "Fast & Easy Billing",
    description:
      "Create invoices in seconds and serve customers faster. Reduce waiting time and handle more sales every day.",
    links: [{ label: "Explore billing features", path: "/billing-software-for-mobile-shop" }],
  },
  {
    icon: Wrench,
    title: "Repair Management System",
    description:
      "Never lose track of repairs again. Manage devices, issues, costs, and statuses in one simple dashboard.",
    links: [{ label: "See repair management tools", path: "/mobile-repair-management-software" }],
  },
  {
    icon: Users,
    title: "Customer Management",
    description:
      "Keep all your customer details organized. View their history instantly and provide better service every time.",
    links: [{ label: "Explore customer management", path: "/customers-suppliers-management" }],
  },
  {
    icon: TrendingUp,
    title: "Business Reports That Matter",
    description:
      "See your sales, profits, and performance clearly. Make better decisions with real-time data.",
    links: [{ label: "View reporting capabilities", path: "/features#reports" }],
  },
  {
    icon: Shield,
    title: "Secure User Control",
    description:
      "Give staff access without losing control. Manage roles and permissions easily and keep your business safe.",
    links: [
      { label: "Manage staff roles", path: "/staff-commissions-payroll" },
      { label: "Review security controls", path: "/settings-security-integrations" },
    ],
  },
  {
    icon: Monitor,
    title: "Access From Anywhere",
    description:
      "Use your POS from shop, home, or anywhere. All you need is internet — no installation required.",
    links: [{ label: "See how the platform works", path: "/pricing" }],
  },
  {
    icon: Zap,
    title: "Ready in Minutes",
    description:
      "No setup stress. Sign up and your system is ready instantly.",
    links: [{ label: "Create your POS account", path: "/pricing" }],
  },
];

const howItWorksSteps = [
  "Sign up in less than 1 minute",
  "Your POS system is created instantly",
  "Start billing and managing your shop immediately",
];

const whyChooseUsPoints = [
  "Designed specifically for mobile shops",
  "Saves time on billing and stock handling",
  "Reduces errors and manual work",
  "Simple enough for anyone to use",
  "Works on any device, anywhere",
];

const previewMetrics = [
  {
    value: "LKR 809,799",
    label: "Revenue",
    hint: "Live sales income",
    icon: DollarSign,
    accent: "text-blue-600 bg-blue-500/10 border-blue-200/60",
  },
  {
    value: "LKR 145,582",
    label: "Net Profit",
    hint: "After commissions",
    icon: TrendingUp,
    accent: "text-emerald-600 bg-emerald-500/10 border-emerald-200/60",
  },
  {
    value: "18.0%",
    label: "Profit Margin",
    hint: "Net profit / revenue",
    icon: Target,
    accent: "text-cyan-600 bg-cyan-500/10 border-cyan-200/60",
  },
  {
    value: "13",
    label: "Orders",
    hint: "Daily sales count",
    icon: Receipt,
    accent: "text-amber-600 bg-amber-500/10 border-amber-200/60",
  },
];

const trustHighlights = [
  {
    title: "Growing daily usage",
    description: "Trusted by mobile shop owners across Sri Lanka who want one place to run billing, stock, and repairs.",
  },
  {
    title: "Built for Sri Lankan businesses",
    description: "Built by W3Inventor PVT LTD with workflows shaped for local mobile retailers and repair shops.",
  },
  {
    title: "Reliable and simple",
    description: "Cloud-based, easy to use, and ready for daily work without technical setup or complicated installation.",
  },
];

const featureFaqs: FeatureFaq[] = [
  {
    q: "Is this POS system built for phone shops?",
    a: "Yes, Cellivo is designed specifically for mobile phone shops, including billing, IMEI tracking, and repair management.",
  },
  {
    q: "Does it support IMEI tracking?",
    a: "Yes, Cellivo allows full IMEI tracking for mobile devices with sales and inventory management.",
  },
  {
    q: "Can Cellivo handle inventory and billing for multiple branches?",
    a: "Yes. Cellivo supports inventory and billing system workflows for mobile shops with centralized visibility, stock transfers, and branch performance reporting.",
  },
  {
    q: "Does the system support staff permissions and customer loyalty tools?",
    a: "Yes. You can assign staff roles, control access to modules, track commissions, and run customer loyalty programs from the same system.",
  },
  {
    q: "Can I start using the features without a credit card?",
    a: "Yes. You can start your free trial and explore the full mobile shop POS features without entering card details.",
  },
];

const featureFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: featureFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const featureSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cellivo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Complete phone shop POS system with billing, IMEI tracking, repairs, inventory, and multi-branch management.",
  url: "https://cellivo.com/features",
  offers: {
    "@type": "Offer",
    price: "7000",
    priceCurrency: "LKR",
  },
};

/* ------------------------------------------------------------------ */
/*  FEATURE MODAL                                                      */
/* ------------------------------------------------------------------ */

const FeatureModal = ({
  feature,
  onClose,
}: {
  feature: FeatureCard;
  onClose: () => void;
}) => {
  const modal = feature.modal!;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X size={16} className="text-muted-foreground" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">{modal.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{modal.description}</p>

            {/* UI Preview Placeholder */}
            <div className="rounded-xl bg-secondary/50 border border-border p-6 mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Feature Preview</span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-3 mb-8">
              {modal.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link to="/pricing" onClick={onClose}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12 rounded-xl text-sm">
                Get My POS System Now <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <p className="text-center text-xs text-muted-foreground mt-3">
              No credit card required · Setup in minutes
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

const sectionCTA = (
  <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 justify-center">
    <Link to="/pricing">
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 h-11 rounded-xl text-sm">
        Get My POS System Now <ArrowRight className="ml-2" size={15} />
      </Button>
    </Link>
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <CreditCard size={12} /> No credit card required
    </span>
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Clock size={12} /> Setup in minutes
    </span>
  </div>
);

const Features = () => {
  const [activeModal, setActiveModal] = useState<FeatureCard | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Mobile Shop POS Features | Billing, IMEI & Repair"
        description="Explore mobile shop POS features for phone shops, including billing, IMEI tracking, repairs, inventory control, multi-branch tools, and staff access."
        canonical="https://cellivo.com/features"
        ogTitle="Mobile Shop POS Features | Cellivo"
        ogDescription="Complete phone shop POS system with billing, IMEI tracking, repairs, inventory, and multi-branch management."
        ogUrl="https://cellivo.com/features"
        twitterTitle="Mobile Shop POS Features | Cellivo"
        twitterDescription="All-in-one POS system for phone shops with IMEI tracking, repair workflows, and inventory management."
        structuredData={[featureSoftwareSchema, featureFaqSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Mobile Shop POS System", path: "/mobile-shop-pos-system" },
          { name: "Features", path: "/features" },
        ]}
      />

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex flex-col gap-1 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 mb-6 max-w-xl">
              <p className="text-sm font-medium text-foreground">Still managing your mobile shop manually?</p>
              <p className="text-sm text-muted-foreground">Bills, stock, and repairs getting confusing?</p>
              <p className="text-sm font-semibold text-primary">There&apos;s a smarter way.</p>
            </div>
            <span className="section-header-label">All Features</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold mt-3 mb-6 text-foreground leading-[1.13]">
              Mobile Shop POS Features <span className="text-primary">for Phone Shops</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Explore mobile shop POS features for phone shops that need faster billing, better stock control, repair workflows, and cleaner customer management in one connected system.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link to="/pricing">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                  Get My POS System Now <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Unlike generic POS systems, Cellivo is built specifically for mobile phone shops with{" "}
              <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">
                IMEI tracking
              </Link>{" "}
              and{" "}
              <Link to="/mobile-repair-management-software" className="text-primary hover:underline">
                repair workflows
              </Link>.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CreditCard size={13} /> No credit card required</span>
              <span className="flex items-center gap-1.5"><Zap size={13} /> Setup in minutes</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Cancel anytime</span>
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed mt-4 max-w-3xl">
              Used by mobile shops across Sri Lanka and built by W3Inventor PVT LTD for retailers who need a reliable mobile shop POS system in Sri Lanka.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-3xl">
              Affordable plans for small businesses.{" "}
              <Link to="/pricing" className="text-primary hover:underline">
                See pricing
              </Link>
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="pt-0 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="rounded-3xl border border-primary/15 bg-primary/5 px-6 py-6 md:px-8 md:py-8 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <span className="section-header-label">Complete Mobile Shop POS System</span>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-3">
                    All features below are part of one complete{" "}
                    <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
                      mobile shop POS system
                    </Link>{" "}
                    designed for phone retailers.
                  </p>
                </div>
                <Link to="/mobile-shop-pos-system">
                  <Button variant="outline" className="w-full md:w-auto font-medium px-6 h-11 rounded-xl text-sm">
                    Explore Full POS System <ArrowRight className="ml-2" size={15} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <span className="section-header-label">Sales Focus</span>
                  <h2 className="text-2xl font-heading font-semibold text-foreground mt-3">
                    Built for Faster Sales and Billing
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-3">
                    Explore how our phone shop POS system improves checkout speed and reduces billing errors for phone shops.
                  </p>
                </div>
                <Link to="/pos-system-for-phone-shop">
                  <Button variant="outline" className="w-full md:w-auto font-medium px-6 h-11 rounded-xl text-sm">
                    View POS System <ArrowRight className="ml-2" size={15} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-header-label">Product Preview</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              See Everything in <span className="text-primary">One Dashboard</span>
            </h2>
            <div className="premium-divider" />
            <p className="section-header-desc max-w-3xl">
              Sales, stock, repairs, and reports stay visible in one place so your team can work faster without switching between tools.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.12)] overflow-hidden"
            role="img"
            aria-label="Cellivo mobile shop POS dashboard preview showing sales, stock, repairs, and reports in one place"
          >
            <div className="grid lg:grid-cols-[250px_1fr]">
              <div className="bg-slate-900 text-white p-6 lg:p-7">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-heading font-semibold">CELLIVO</span>
                  <LayoutDashboard size={18} className="text-white/70" />
                </div>
                <button className="w-full rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground text-left mb-8">
                  + New Sale
                </button>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </div>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                    <Package size={16} />
                    Inventory
                  </div>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                    <Wrench size={16} />
                    Repairs
                  </div>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                    <Users size={16} />
                    Customers
                  </div>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70">
                    <BarChart3 size={16} />
                    Reports
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-5 md:p-7">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Live Store Control</p>
                    <h3 className="text-2xl font-heading font-semibold text-slate-900">Business Dashboard</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-medium text-primary">
                    <Monitor size={14} />
                    Cellivo Demo Branch 001
                  </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                  {previewMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xl font-heading font-semibold text-slate-900">{metric.value}</p>
                          <p className="text-sm font-medium text-slate-700 mt-1">{metric.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{metric.hint}</p>
                        </div>
                        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${metric.accent}`}>
                          <metric.icon size={18} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid xl:grid-cols-[1.55fr_1fr] gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-base font-heading font-semibold text-slate-900">Revenue vs Net Profit</h4>
                        <p className="text-xs text-muted-foreground">Sales, stock, repairs, all in one view</p>
                      </div>
                      <span className="text-xs text-primary font-medium">Live reports</span>
                    </div>
                    <div className="h-48 rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-end gap-3">
                      {[45, 78, 58, 92, 70, 88, 76].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col justify-end gap-2">
                          <div className="rounded-t-xl bg-blue-500/80" style={{ height: `${height}%` }} />
                          <div className="rounded-t-xl bg-emerald-400/70" style={{ height: `${Math.max(height - 24, 18)}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-heading font-semibold text-slate-900">Inventory Screen</h4>
                        <Package size={16} className="text-primary" />
                      </div>
                      <div className="space-y-3 text-sm">
                        {[
                          ["iPhone 13 128GB", "4 in stock"],
                          ["Samsung A15", "7 in stock"],
                          ["Fast Charger", "Low stock"],
                        ].map(([name, status]) => (
                          <div key={name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                            <span className="text-slate-700">{name}</span>
                            <span className="text-xs font-medium text-primary">{status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-heading font-semibold text-slate-900">Repair Queue</h4>
                        <Wrench size={16} className="text-primary" />
                      </div>
                      <div className="space-y-3 text-sm">
                        {[
                          ["Screen replacement", "In progress"],
                          ["Battery issue", "Ready for pickup"],
                          ["Water damage", "Diagnosing"],
                        ].map(([name, status]) => (
                          <div key={name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                            <span className="text-slate-700">{name}</span>
                            <span className="text-xs font-medium text-primary">{status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-header-label">Trust Section</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              Trusted by Mobile Shop Owners <span className="text-primary">Across Sri Lanka</span>
            </h2>
            <div className="premium-divider" />
            <p className="section-header-desc max-w-3xl">
              Growing number of shops using daily, built for Sri Lankan businesses, and reliable enough to run your billing, stock, and repairs from one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {trustHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-lg font-heading font-semibold text-foreground mb-2">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Quick Nav ── */}
      <div className="border-y border-border bg-background sticky top-16 z-30">
        <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 py-2 min-w-max">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
              >
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feature Groups ── */}
      {groups.map((group, idx) => (
        <SectionWrapper key={group.id} id={group.id} className={idx % 2 === 1 ? "bg-secondary/40" : ""}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-header-label">{group.label}</span>
            <h2 className="section-header-title">{group.title}</h2>
            <div className="premium-divider" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{group.description}</p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {group.features.map((f, i) => {
              const hasLink = !!f.link;
              const hasModal = !!f.modal;
              const isInteractive = hasLink || hasModal;

              const cardContent = (
                <>
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                    <f.icon size={16} className="text-foreground/60 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  {isInteractive && (
                    <span className="text-xs text-primary font-medium mt-2 inline-block">
                      {hasLink ? "Learn more →" : "View details →"}
                    </span>
                  )}
                </>
              );

              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  {hasLink ? (
                    <Link
                      to={f.link!}
                      className="block bg-card border border-border rounded-xl p-5 hover-lift group h-full cursor-pointer"
                    >
                      {cardContent}
                    </Link>
                  ) : hasModal ? (
                    <button
                      onClick={() => setActiveModal(f)}
                      className="block w-full text-left bg-card border border-border rounded-xl p-5 hover-lift group h-full cursor-pointer"
                    >
                      {cardContent}
                    </button>
                  ) : (
                    <div className="block bg-card border border-border rounded-xl p-5 group h-full">
                      {cardContent}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {group.benefits.map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Section CTA */}
          {sectionCTA}
        </SectionWrapper>
      ))}

      <SectionWrapper className="bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-header-label">Core Features</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              Core Features of Our <span className="text-primary">Mobile Shop POS System</span>
            </h2>
            <div className="premium-divider" />
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed max-w-4xl mx-auto mb-4">
              Our mobile shop POS system is built specifically for mobile stores, with features designed to handle IMEI tracking, repairs, billing, and inventory seamlessly.
            </p>
            <p className="section-header-desc max-w-3xl">
              Cellivo helps shops that need a POS system with{" "}
              <Link to="/imei-tracking-pos-system" className="text-primary hover:underline">
                IMEI tracking
              </Link>{" "}
              and{" "}
              <Link to="/mobile-repair-management-software" className="text-primary hover:underline">
                repair management
              </Link>
              , plus the workflows required for an inventory and billing system for mobile shops. It is built for teams that want phone shop software with multi-branch support and a mobile shop POS with stock and repair tracking.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto mt-4">
              Unlike generic POS systems, Cellivo is built specifically for mobile phone shops with IMEI tracking and repair workflows.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {seoClusters.map((cluster, index) => (
              <motion.article
                key={cluster.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <cluster.icon size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                  {cluster.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {cluster.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {cluster.links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-header-label">How It Works</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              Get Started in <span className="text-primary">Three Simple Steps</span>
            </h2>
            <div className="premium-divider" />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-lg mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-base font-medium text-foreground leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-header-label">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
              Why Shop Owners Choose This <span className="text-primary">POS</span>
            </h2>
            <div className="premium-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {whyChooseUsPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="bg-card border border-border rounded-2xl p-5 flex items-start gap-3"
              >
                <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm md:text-base text-foreground/85 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-secondary/40">
        <div className="text-center mb-12">
          <span className="section-header-label">Features FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-[1.1]">
            Common Questions About <span className="text-primary">Cellivo Features</span>
          </h2>
          <div className="premium-divider" />
          <p className="section-header-desc">
            Still have questions? Here are answers to some common queries about our mobile shop POS system.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {featureFaqs.map((faq) => (
            <article key={faq.q} className="bg-card border border-border rounded-xl px-5 py-4">
              <h3 className="text-sm font-medium text-foreground">{faq.q}</h3>
              <p className="faq-answer text-sm text-muted-foreground leading-relaxed mt-2">{faq.a}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
              Stop Managing Your Shop the Hard Way
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Switch to a smarter system and take full control of your business today.
            </p>
            <div className="flex justify-center">
              <Link to="/pricing">
                <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                  Start My POS Now <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Setup in minutes</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Cancel anytime</span>
            </div>
            <p className="text-sm text-white/60 mt-4">Start today and simplify your shop in minutes.</p>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {activeModal && activeModal.modal && (
        <FeatureModal feature={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </Layout>
  );
};

export default Features;
