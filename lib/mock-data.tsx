import {
  BadgeDollarSign,
  Database,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const overviewMetrics = [
  {
    label: "Qualified leads",
    value: "128",
    change: "+18%",
    detail: "34 moved to sales-ready this week",
  },
  {
    label: "Closed sales",
    value: "41",
    change: "+12%",
    detail: "13 recurring accounts renewed",
  },
  {
    label: "Approved commission",
    value: "$18.4K",
    change: "+9%",
    detail: "Monthly runway on track for Apr 03 payout",
  },
  {
    label: "Next payout",
    value: "$7.2K",
    change: "Apr 03",
    detail: "Stripe Connect bank payout is ready",
  },
];

export const performanceSeries = [
  { month: "Jan", leads: 64, sales: 18, revenue: 7200, commissions: 2100 },
  { month: "Feb", leads: 72, sales: 21, revenue: 8600, commissions: 2510 },
  { month: "Mar", leads: 78, sales: 24, revenue: 9200, commissions: 2730 },
  { month: "Apr", leads: 81, sales: 25, revenue: 9800, commissions: 2870 },
  { month: "May", leads: 88, sales: 29, revenue: 11400, commissions: 3310 },
  { month: "Jun", leads: 92, sales: 30, revenue: 12100, commissions: 3520 },
  { month: "Jul", leads: 104, sales: 33, revenue: 13400, commissions: 3840 },
  { month: "Aug", leads: 113, sales: 36, revenue: 14700, commissions: 4240 },
  { month: "Sep", leads: 119, sales: 38, revenue: 15200, commissions: 4420 },
  { month: "Oct", leads: 123, sales: 39, revenue: 16100, commissions: 4690 },
  { month: "Nov", leads: 126, sales: 40, revenue: 17100, commissions: 4990 },
  { month: "Dec", leads: 128, sales: 41, revenue: 18420, commissions: 5360 },
];

export const leadStatus = [
  { name: "Qualified", value: 46, fill: "#617a42" },
  { name: "Nurturing", value: 28, fill: "#3f8090" },
  { name: "Proposal", value: 14, fill: "#d79a37" },
  { name: "Disqualified", value: 8, fill: "#a95f49" },
];

export const saleStatus = [
  { name: "Approved", value: 31, fill: "#617a42" },
  { name: "In review", value: 7, fill: "#d79a37" },
  { name: "Refund risk", value: 3, fill: "#a95f49" },
];

export const revenueByService = [
  { name: "SEO retainers", revenue: 6120, share: 33 },
  { name: "Paid media", revenue: 5040, share: 27 },
  { name: "Landing pages", revenue: 3460, share: 19 },
  { name: "CRM setup", revenue: 2250, share: 12 },
  { name: "AI follow-up", revenue: 1550, share: 9 },
];

export const revenueByLocation = [
  { id: "loc-1", city: "Austin", state: "Texas", revenue: 4120, share: "22%" },
  { id: "loc-2", city: "Nashville", state: "Tennessee", revenue: 3360, share: "18%" },
  { id: "loc-3", city: "Charlotte", state: "North Carolina", revenue: 2910, share: "16%" },
  { id: "loc-4", city: "Raleigh", state: "North Carolina", revenue: 2540, share: "14%" },
  { id: "loc-5", city: "Phoenix", state: "Arizona", revenue: 2310, share: "13%" },
];

export const yearlyRollups = [
  {
    label: "Total referred revenue",
    value: "$142.6K",
    detail: "Detailed amount of all attributed sales over the year.",
  },
  {
    label: "Total leads",
    value: "1,148",
    detail: "Detailed amount of all lead transactions over the year.",
  },
  {
    label: "Closed sales",
    value: "354",
    detail: "Detailed amount of all closed deals attributed to this partner.",
  },
  {
    label: "Settled payouts",
    value: "$39.8K",
    detail: "Total sum of all transactions released through Stripe Connect.",
  },
];

export const recentLeads = [
  {
    id: "lead-1001",
    contact: "Maya Chen",
    source: "Organic landing page",
    region: "Austin, TX",
    score: 92,
    status: "Qualified",
    createdAt: "2026-03-07",
  },
  {
    id: "lead-1002",
    contact: "Lucas Patel",
    source: "Referral webinar",
    region: "Phoenix, AZ",
    score: 87,
    status: "Nurturing",
    createdAt: "2026-03-07",
  },
  {
    id: "lead-1003",
    contact: "Rachel Stone",
    source: "Comparison guide",
    region: "Charlotte, NC",
    score: 84,
    status: "Proposal",
    createdAt: "2026-03-05",
  },
  {
    id: "lead-1004",
    contact: "Omari Brooks",
    source: "Newsletter CTA",
    region: "Raleigh, NC",
    score: 45,
    status: "Disqualified",
    createdAt: "2026-03-04",
  },
];

export const salesLedger = [
  {
    id: "sale-201",
    customer: "North Coast Dental",
    offer: "SEO retainer",
    amount: 2400,
    commission: 360,
    status: "Approved",
    paidAt: "2026-03-06",
  },
  {
    id: "sale-202",
    customer: "Harbor Legal Group",
    offer: "Paid media",
    amount: 1800,
    commission: 270,
    status: "Review",
    paidAt: "2026-03-05",
  },
  {
    id: "sale-203",
    customer: "Blue Ridge Roofing",
    offer: "Landing page sprint",
    amount: 3200,
    commission: 480,
    status: "Approved",
    paidAt: "2026-03-03",
  },
  {
    id: "sale-204",
    customer: "Modern Spine Clinic",
    offer: "CRM setup",
    amount: 1500,
    commission: 225,
    status: "Refund risk",
    paidAt: "2026-03-01",
  },
];

export const commissionLedger = [
  {
    id: "com-401",
    source: "North Coast Dental / SEO retainer",
    amount: 360,
    status: "Approved",
    availableOn: "2026-03-20",
    rule: "15% recurring",
  },
  {
    id: "com-402",
    source: "Harbor Legal Group / Paid media",
    amount: 270,
    status: "Pending",
    availableOn: "2026-03-22",
    rule: "15% recurring",
  },
  {
    id: "com-403",
    source: "Blue Ridge Roofing / Landing page sprint",
    amount: 480,
    status: "Approved",
    availableOn: "2026-03-18",
    rule: "$480 fixed",
  },
  {
    id: "com-404",
    source: "Modern Spine Clinic / CRM setup",
    amount: 225,
    status: "Hold",
    availableOn: "2026-03-28",
    rule: "15% recurring",
  },
];

export const payoutHistory = [
  {
    id: "pay-01",
    period: "Feb 2026",
    amount: 6180,
    method: "Stripe Connect",
    status: "Paid",
    releasedAt: "2026-03-01",
  },
  {
    id: "pay-02",
    period: "Jan 2026",
    amount: 5540,
    method: "Stripe Connect",
    status: "Paid",
    releasedAt: "2026-02-01",
  },
  {
    id: "pay-03",
    period: "Dec 2025",
    amount: 4975,
    method: "Stripe Connect",
    status: "Paid",
    releasedAt: "2026-01-02",
  },
];

export const payoutTimeline = [
  { label: "Pending", amount: 2410, caption: "Waiting for refund window" },
  { label: "Approved", amount: 7280, caption: "Ready for next batch" },
  { label: "Settled", amount: 39840, caption: "Paid to bank accounts" },
];

export const affiliateApplications = [
  {
    id: "app-1",
    name: "Evergreen Studio",
    channel: "Content / SEO",
    region: "US",
    status: "Review",
    score: "High fit",
  },
  {
    id: "app-2",
    name: "Quartz Media",
    channel: "Paid media",
    region: "CA",
    status: "Approved",
    score: "Expansion",
  },
  {
    id: "app-3",
    name: "Oak & Wave",
    channel: "Newsletter",
    region: "UK",
    status: "KYC pending",
    score: "Good fit",
  },
  {
    id: "app-4",
    name: "North Atlas",
    channel: "Agency partner",
    region: "US",
    status: "Review",
    score: "Requires call",
  },
];

export const topAffiliates = [
  {
    id: "aff-1",
    name: "David Morgan",
    tier: "Summit Partner",
    leads: 128,
    revenue: 18420,
    payoutStatus: "Ready",
  },
  {
    id: "aff-2",
    name: "Quartz Media",
    tier: "Growth Partner",
    leads: 96,
    revenue: 14630,
    payoutStatus: "Hold",
  },
  {
    id: "aff-3",
    name: "Maple Advisory",
    tier: "Core Partner",
    leads: 82,
    revenue: 11880,
    payoutStatus: "Ready",
  },
  {
    id: "aff-4",
    name: "North Atlas",
    tier: "New Partner",
    leads: 47,
    revenue: 6720,
    payoutStatus: "KYC pending",
  },
];

export const adminAlerts = [
  "3 affiliates still need Stripe Connect onboarding completion.",
  "2 commissions are blocked by refund exposure over 30 days.",
  "1 webhook retry is pending for a checkout.session.completed event.",
];

export const commissionRules = [
  {
    id: "rule-1",
    name: "Recurring retainer",
    description: "15% of the first collected invoice, held for 21 days.",
  },
  {
    id: "rule-2",
    name: "Landing page sprint",
    description: "$480 fixed payout after successful Stripe payment and no refund claim.",
  },
  {
    id: "rule-3",
    name: "CRM setup",
    description: "15% commission with manual review for implementation-heavy deals.",
  },
];

export const programWorkflow = [
  {
    title: "Affiliate signs up",
    description: "Create an account, apply to the program, and receive a unique referral code after approval.",
  },
  {
    title: "Traffic becomes a lead",
    description: "Referral tokens persist across visits and create lead records when a signup or form submission happens.",
  },
  {
    title: "Stripe sale is attributed",
    description: "Successful checkout events connect the customer purchase back to the originating affiliate.",
  },
  {
    title: "Commission is released",
    description: "Hold windows clear refund risk, then approved balances move into Stripe Connect payout batches.",
  },
];

export const stackHighlights = [
  {
    name: "Next.js App Router",
    description: "Marketing pages, dashboard layouts, protected routes, and server actions under one roof.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    name: "Tailwind CSS",
    description: "A dense operations interface with a custom visual language instead of default SaaS chrome.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    name: "Supabase",
    description: "Auth, Postgres, row-level security, and referral-to-commission data storage.",
    icon: <Database className="h-5 w-5" />,
  },
  {
    name: "Stripe Connect",
    description: "Automated bank payouts, onboarding links, sale events, and payout status monitoring.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    name: "Commission ledger",
    description: "A provider-agnostic earnings ledger so payout logic stays clean even if methods expand later.",
    icon: <BadgeDollarSign className="h-5 w-5" />,
  },
];
