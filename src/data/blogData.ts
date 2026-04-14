export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export const blogCategories = [
  "All",
  "POS & Billing",
  "IMEI & Inventory",
  "Repair Management",
  "Business Growth",
  "Tips & Guides",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-pos-system-for-phone-shop",
    title: "How to Choose the Best POS System for Your Phone Shop",
    excerpt: "A complete guide to finding the right POS software for mobile retailers — what features matter most and what to avoid.",
    category: "POS & Billing",
    date: "2026-04-10",
    readTime: "6 min read",
    author: "Cellivo Team",
    content: `
## Why Your Phone Shop Needs a Specialized POS

Generic POS systems aren't built for the unique challenges of mobile phone retail. From IMEI-based stock control to repair management, phone shops need software that understands their workflow.

### What to Look For

**1. IMEI & Serial Number Tracking**
Every phone has a unique IMEI number. Your POS should automatically link IMEI numbers to sales, suppliers, and customers — creating a complete chain of custody.

**2. Repair Job Management**
If you offer repairs, your POS should track repair tickets from intake to completion, assign technicians, and notify customers automatically.

**3. Multi-Payment Support**
Customers pay with cash, card, bank transfers, and sometimes split payments. Your POS should handle all of these seamlessly.

**4. Inventory Intelligence**
Real-time stock levels, low-stock alerts, and supplier management save hours of manual counting.

### Red Flags to Watch For

- No IMEI-based stock control capability
- No repair module
- Limited reporting
- No multi-branch support
- Complicated pricing with hidden fees

### Making Your Decision

Start with a free trial. Test the system with your actual workflow before committing. The best POS is one your staff can learn in minutes, not days.

> **Pro Tip:** Look for a POS that offers a lifetime plan — it saves significant money over monthly subscriptions in the long run.
    `,
  },
  {
    slug: "imei-tracking-best-practices-phone-shops",
    title: "5 IMEI-Based Stock Control Best Practices for Phone Shops",
    excerpt: "Learn how to manage every phone from purchase to sale with proper IMEI stock control — reduce fraud and improve accountability.",
    category: "IMEI & Inventory",
    date: "2026-04-08",
    readTime: "5 min read",
    author: "Cellivo Team",
    content: `
## Why IMEI-Based Stock Control Matters

Every mobile phone has a unique IMEI (International Mobile Equipment Identity) number. Proper IMEI-based stock control protects your business from fraud, simplifies warranty claims, and creates accountability.

### Best Practice #1: Scan at Receiving

The moment stock arrives from a supplier, scan or enter every IMEI number. Link it to the purchase bill and supplier. This creates the first link in your traceability chain.

### Best Practice #2: Link IMEI to Sales

When selling a phone, the IMEI should automatically attach to the customer's record and invoice. If a customer returns with a warranty issue, you can verify the purchase instantly.

### Best Practice #3: Track Transfers Between Branches

If you operate multiple branches, every IMEI transfer should be logged. Know exactly which branch holds which device at any time.

### Best Practice #4: Regular Physical Stock Checks

Run periodic stock checks where you physically scan every IMEI in your store and match it against your system. Cellivo makes this easy with its stock check module.

### Best Practice #5: Use Barcode Labels

Print barcode labels for each device. This speeds up sales, reduces manual entry errors, and makes stock checks faster.

## The Bottom Line

Proper IMEI-based stock control isn't optional — it's essential for any serious phone shop. The right POS system makes it effortless.
    `,
  },
  {
    slug: "why-phone-shops-need-repair-management-software",
    title: "Why Phone Shops Need Repair Management Software",
    excerpt: "Stop losing repair tickets with automated repair tracking. Learn how dedicated repair software transforms your service desk.",
    category: "Repair Management",
    date: "2026-04-05",
    readTime: "5 min read",
    author: "Cellivo Team",
    content: `
## The Repair Ticket Problem

Many phone shops still track repairs on paper or in spreadsheets. This leads to lost tickets, angry customers, and missed revenue.

### Common Repair Management Problems

- **Lost tickets:** Paper tickets get misplaced. Customers call and you can't find their repair.
- **No status updates:** Customers don't know if their phone is being worked on or sitting in a queue.
- **Parts tracking chaos:** You don't know which spare parts were used on which repair.
- **No technician accountability:** You can't measure who completed what.

### How Software Solves This

**Centralized Repair Log**
Every repair gets a digital ticket with device details, customer info, issue description, and estimated cost.

**Status Workflow**
Move repairs through clear stages: Received → Diagnosing → In Progress → Ready → Collected. Everyone knows exactly where each repair stands.

**Auto Customer Notifications**
When a repair status changes, the customer gets an SMS or email automatically. No more phone calls asking "is my phone ready?"

**Parts & Cost Tracking**
Link spare parts from your inventory to each repair. Track costs, labor, and margins per job.

### The ROI of Repair Software

Shops that switch to digital repair management report:
- 40% fewer customer complaints about lost repairs
- 25% faster repair turnaround times
- Better technician productivity tracking

The investment pays for itself within the first month.
    `,
  },
  {
    slug: "multi-branch-phone-shop-management-tips",
    title: "Multi-Branch Phone Shop Management Tips",
    excerpt: "How to manage multiple phone shop locations without losing control — stock transfers, reporting, and staff management.",
    category: "Business Growth",
    date: "2026-04-02",
    readTime: "7 min read",
    author: "Cellivo Team",
    content: `
## Growing Beyond One Location

Expanding to multiple branches is exciting but creates new challenges. Here's how to stay in control.

### Centralized Dashboard

Your POS should give you a bird's-eye view of all branches from one dashboard. Sales, inventory levels, and staff activity — all in one place.

### Stock Transfer Management

Moving stock between branches needs to be tracked properly. Every transfer should be logged with:
- Which items were sent
- From which branch to which branch
- Who authorized the transfer
- When it was received

### Consistent Pricing

Maintain uniform pricing across all branches. Your POS should sync prices centrally so customers get the same deal regardless of which branch they visit.

### Branch-Level Reporting

While you need a consolidated view, you also need branch-specific reports. Compare performance across locations to identify which branches need attention.

### Staff Management Per Branch

Each branch should have its own staff roster with appropriate access levels. A cashier at Branch A shouldn't be able to void transactions at Branch B.

### Tips for Success

1. **Start with systems, not stores.** Get your POS and processes right before opening the second branch.
2. **Hire a branch manager** for each location who takes ownership.
3. **Visit regularly.** Technology helps, but nothing replaces being there.
4. **Standardize everything.** From receipt format to return policies.

## The Right Tools Matter

Multi-branch management is only as good as your tools. Choose a POS system built for multi-location retail from day one.
    `,
  },
  {
    slug: "reducing-billing-errors-mobile-retail",
    title: "Reducing Billing Errors in Mobile Retail",
    excerpt: "How auto-calculated taxes and IMEI linking eliminate mistakes — save time and build customer trust with accurate billing.",
    category: "POS & Billing",
    date: "2026-03-28",
    readTime: "4 min read",
    author: "Cellivo Team",
    content: `
## The Cost of Billing Errors

Billing mistakes don't just cost money — they cost trust. A customer who receives an incorrect invoice is unlikely to return.

### Common Billing Mistakes in Phone Shops

1. **Wrong price:** Manual price entry leads to typos and outdated pricing.
2. **Tax calculation errors:** Manually calculating tax percentages is error-prone.
3. **Missing IMEI on invoice:** Without the IMEI, warranty claims become a headache.
4. **Incorrect discounts:** Applying the wrong discount percentage or forgetting to apply one.

### How POS Software Eliminates Errors

**Auto-Price Lookup**
Scan a barcode or select a product — the price populates automatically from your catalog. No manual entry needed.

**Tax Auto-Calculation**
Set your tax rates once. The system calculates tax on every transaction automatically.

**IMEI Auto-Link**
When you sell a phone, the IMEI is automatically printed on the invoice and linked to the customer's record.

**Discount Rules**
Set discount rules by product, customer type, or promotion period. The system applies them consistently.

### The Result

- Faster checkout
- Fewer customer complaints
- Accurate financial records
- Easier tax filing

## Start Getting It Right

Switch to a POS that handles the math so your staff can focus on serving customers.
    `,
  },
  {
    slug: "customer-loyalty-programs-phone-shops",
    title: "Customer Loyalty Programs for Phone Shops",
    excerpt: "Turn one-time buyers into repeat customers with a simple points-based loyalty system built into your POS.",
    category: "Business Growth",
    date: "2026-03-25",
    readTime: "5 min read",
    author: "Cellivo Team",
    content: `
## Why Loyalty Matters for Phone Shops

Acquiring a new customer costs 5x more than retaining an existing one. A loyalty program gives customers a reason to come back.

### Simple Points System

The most effective loyalty programs are simple:
- Customer earns points on every purchase
- Points can be redeemed for discounts on future purchases
- Balance is tracked automatically in your POS

### Setting Up Your Program

**Step 1: Define Point Value**
Decide how many points per rupee spent. For example: 1 point per Rs. 100 spent.

**Step 2: Set Redemption Rules**
Define what points are worth. For example: 100 points = Rs. 50 discount.

**Step 3: Communicate to Customers**
Train staff to mention the loyalty program at checkout. Print point balances on receipts.

### What Works for Phone Shops

- **Accessory bonuses:** Double points on accessories (higher margin items).
- **Repair loyalty:** Earn points on repair services too.
- **Birthday rewards:** Automatic bonus points on customer birthdays.
- **Referral bonuses:** Points when a customer refers someone new.

### Tracking & Reporting

Your POS should show:
- Total points issued vs redeemed
- Top loyalty customers
- Revenue influenced by loyalty redemptions

### The Key: Make It Automatic

The best loyalty program is one that runs itself. Points are earned and tracked automatically — no stamp cards, no manual counting.

## Build Lasting Relationships

A loyalty program transforms transactions into relationships. Start simple, stay consistent, and watch your repeat business grow.
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatBlogDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
