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

const groups: FeatureGroup[] = [
  {
    id: "pos-sales",
    label: "POS & Sales",
    title: "Powerful Point-of-Sale for Phone Shops",
    description: "Speed up every transaction with a POS system designed for mobile retail — phones, accessories, repairs, and trade-ins.",
    features: [
      { icon: Zap, title: "Fast Billing", desc: "Create invoices in seconds with auto-tax calculations and quick item lookup.", link: "/pos-billing-system" },
      { icon: Wallet, title: "Multi-Payment Support", desc: "Accept cash, card, bank transfer, and split payments in one transaction.", link: "/pos-billing-system" },
      { icon: Wrench, title: "Repair Billing", desc: "Generate repair invoices with labor, parts, and warranty details included.", link: "/mobile-repair-management-software" },
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
    label: "Inventory & IMEI Tracking",
    title: "IMEI-Level Stock Control for Every Device",
    description: "Track every phone by IMEI, every accessory by barcode, and every part by serial — with real-time visibility across all branches.",
    features: [
      { icon: Package, title: "Purchase & GRN", desc: "Create purchase orders and verify goods received with GRN matching.", link: "/inventory-management-system" },
      { icon: Hash, title: "IMEI Tracking", desc: "Assign IMEI numbers at intake and trace every device through your pipeline.", link: "/imei-tracking-pos" },
      { icon: ScanBarcode, title: "Serial Number Tracking", desc: "Track serialized accessories and parts alongside IMEI-based inventory.", link: "/imei-tracking-pos" },
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
      { icon: Bell, title: "Stock Alerts", desc: "Get notified when items hit reorder levels — never miss a best-seller.", link: "/inventory-management-system" },
      { icon: ArrowRightLeft, title: "Stock Transfer", desc: "Move inventory between branches with full transfer tracking and approval.", link: "/multi-branch-pos" },
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
    title: "End-to-End Repair Workshop Management",
    description: "From customer drop-off to pickup notification — manage every repair job with full transparency and efficiency.",
    features: [
      { icon: ClipboardList, title: "Job Ticket Tracking", desc: "Create detailed repair tickets with device info, issue description, and photos.", link: "/mobile-repair-management-software" },
      { icon: UserCog, title: "Technician Assignment", desc: "Assign jobs to technicians based on skill, availability, and workload.", link: "/mobile-repair-management-software" },
      { icon: GitBranch, title: "Repair Workflow", desc: "Move jobs through customizable stages — diagnosed, in-progress, completed.", link: "/mobile-repair-management-software" },
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
    label: "Credit & Loyalty",
    title: "Credit Sales & Customer Loyalty Programs",
    description: "Offer installment plans, track credit balances, and reward your best customers — all built into the POS.",
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
    title: "Staff Management, Commissions & Payroll",
    description: "Control who can do what, track commissions automatically, and run payroll — all from one system.",
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
    title: "Manage Multiple Branches from One Dashboard",
    description: "Whether you have 2 shops or 20 — Cellivo gives you centralized control with branch-level detail.",
    features: [
      { icon: Building2, title: "Branch Management", desc: "Add and configure branches with their own settings, staff, and stock.", link: "/multi-branch-pos" },
      { icon: ArrowRightLeft, title: "Stock Transfer Between Branches", desc: "Move inventory between locations with approval workflows and tracking.", link: "/multi-branch-pos" },
      { icon: LayoutDashboard, title: "Central Dashboard", desc: "See sales, stock, and performance across all branches in one view.", link: "/multi-branch-pos" },
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
    label: "Reports & Analytics",
    title: "Reports & Analytics That Drive Decisions",
    description: "Stop guessing. Get clear, actionable insights into every aspect of your mobile shop business.",
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
            <Link to="/signup" onClick={onClose}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12 rounded-xl text-sm">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
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
    <Link to="/signup">
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 h-11 rounded-xl text-sm">
        Start Free Trial <ArrowRight className="ml-2" size={15} />
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
        title="All Features | Cellivo — Complete POS System for Mobile Phone Shops"
        description="Explore every feature of Cellivo — POS billing, IMEI tracking, repair management, finance control, multi-branch operations, loyalty programs, staff payroll, and more."
        canonical="https://cellivo.lovable.app/features"
      />

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <span className="section-header-label">All Features</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold mt-3 mb-6 text-foreground leading-[1.13]">
              Complete Mobile Shop POS System with{" "}
              <span className="text-primary">IMEI Tracking, Repair Management & Finance Control</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Cellivo is the all-in-one operating system for mobile phone shops — billing, inventory, repairs, finance, loyalty, staff, and multi-branch management in a single platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link to="/signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 h-12 rounded-xl text-sm">
                  Start Free Trial <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="font-medium px-8 h-12 rounded-xl text-sm">
                  Book a Demo
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CreditCard size={13} /> No credit card required</span>
              <span className="flex items-center gap-1.5"><Zap size={13} /> Setup in minutes</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Run Your Phone Shop Like a Pro?
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Join 500+ phone shop owners who manage their entire business with Cellivo. Start free — no credit card, no setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <Button size="lg" className="rounded-xl font-medium px-8 bg-white text-foreground hover:bg-white/90">
                  Start Free Trial <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="inverseOutline" className="rounded-xl font-medium px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Setup in minutes</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} /> Cancel anytime</span>
            </div>
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
