import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BanknoteArrowDown,
  ClipboardList,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Users,
} from "lucide-react";

export type AppNavItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const affiliateNav: AppNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Overview and trends",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    description: "Referral pipeline",
    icon: Target,
  },
  {
    title: "Sales",
    href: "/dashboard/sales",
    description: "Attributed deals",
    icon: ClipboardList,
  },
  {
    title: "Commissions",
    href: "/dashboard/commissions",
    description: "Pending and approved earnings",
    icon: BadgeDollarSign,
  },
  {
    title: "Payouts",
    href: "/dashboard/payouts",
    description: "Stripe Connect transfer status",
    icon: BanknoteArrowDown,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    description: "Profile and payout setup",
    icon: Settings2,
  },
];

export const adminNav: AppNavItem[] = [
  {
    title: "Overview",
    href: "/admin",
    description: "Program health",
    icon: ShieldCheck,
  },
  {
    title: "Affiliates",
    href: "/admin/affiliates",
    description: "Approvals and tiers",
    icon: Users,
  },
  {
    title: "Sales",
    href: "/admin/sales",
    description: "Sale review queue",
    icon: ClipboardList,
  },
  {
    title: "Payouts",
    href: "/admin/payouts",
    description: "Disbursement monitor",
    icon: BanknoteArrowDown,
  },
  {
    title: "Rules",
    href: "/admin/rules",
    description: "Commission controls",
    icon: SlidersHorizontal,
  },
];

export const routeTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Affiliate dashboard",
    description: "Monthly performance, funnel visibility, and payout readiness.",
  },
  "/dashboard/leads": {
    title: "Lead pipeline",
    description: "Track referred signups and form submissions across the funnel.",
  },
  "/dashboard/sales": {
    title: "Sales attribution",
    description: "Review every Stripe-backed sale attached to your referral traffic.",
  },
  "/dashboard/commissions": {
    title: "Commission ledger",
    description: "Monitor pending, approved, and settled earnings in one ledger.",
  },
  "/dashboard/payouts": {
    title: "Payout center",
    description: "See payout timing, bank readiness, and transfer history.",
  },
  "/dashboard/settings": {
    title: "Affiliate settings",
    description: "Manage profile details, payout setup, and referral assets.",
  },
  "/admin": {
    title: "Admin operations",
    description: "Program-wide approvals, sales quality, and payout exposure.",
  },
  "/admin/affiliates": {
    title: "Affiliate approvals",
    description: "Review partner applications, status, and onboarding completeness.",
  },
  "/admin/sales": {
    title: "Sales review",
    description: "Verify attributed sales before they move into commission approval.",
  },
  "/admin/payouts": {
    title: "Payout operations",
    description: "Watch transfer readiness and payout batches before release.",
  },
  "/admin/rules": {
    title: "Commission rules",
    description: "Tune payout logic, hold windows, and approval thresholds.",
  },
};
