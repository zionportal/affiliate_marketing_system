"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, KeyRound, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { dashboardTodayLabel } from "@/lib/format";
import { adminNav, affiliateNav, routeTitles } from "@/lib/navigation";

type DashboardShellProps = {
  children: React.ReactNode;
  variant: "affiliate" | "admin";
};

export function DashboardShell({ children, variant }: DashboardShellProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = variant === "affiliate" ? affiliateNav : adminNav;
  const currentRoute = useMemo(() => {
    return (
      routeTitles[pathname] ?? {
        title: variant === "affiliate" ? "Affiliate dashboard" : "Admin operations",
        description:
          variant === "affiliate"
            ? "Track performance and payout readiness."
            : "Monitor approvals, rules, and payout exposure.",
      }
    );
  }, [pathname, variant]);

  return (
    <div className="page-shell min-h-screen px-4 py-4 sm:px-6 lg:px-7">
      {isOpen ? (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-[rgba(29,48,40,0.28)] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <div className="mx-auto flex max-w-[1600px] gap-5">
        <aside
          className={`fixed inset-y-4 left-4 z-40 flex w-[290px] flex-col rounded-[34px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(51,74,50,0.97),rgba(29,48,40,0.94))] p-5 text-white shadow-[0_28px_90px_rgba(23,32,28,0.3)] transition lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] ${isOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker text-white/56">Summit Ledger</p>
              <h1 className="display-title mt-2 text-3xl font-semibold">
                {variant === "affiliate" ? "Affiliate suite" : "Admin suite"}
              </h1>
            </div>
            <button
              aria-label="Close navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/8 lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/68">
            {variant === "affiliate"
              ? "Operate the partner funnel from lead capture through final bank payout."
              : "Approve affiliates, verify commissions, and keep the payout ledger clean."}
          </p>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-4 rounded-[24px] px-4 py-4 transition ${isActive ? "bg-white/12 text-white" : "text-white/72 hover:bg-white/8 hover:text-white"}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isActive ? "bg-[var(--amber)] text-[var(--foreground)]" : "bg-white/10 text-white/84"}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs tracking-[0.18em] uppercase text-white/46">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[28px] border border-white/12 bg-white/10 p-5">
            <p className="section-kicker text-white/56">
              {variant === "affiliate" ? "Your referral code" : "Program pulse"}
            </p>
            <p className="mt-3 text-xl font-semibold">
              {variant === "affiliate" ? "DAVID-GLD" : "3 approvals need review"}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/68">
              {variant === "affiliate"
                ? "Use this code for referral links, campaigns, and landing page source tracking."
                : "Approve new affiliates and clear payout blockers before the next release window."}
            </p>
            <Link
              href={variant === "affiliate" ? "/dashboard/settings" : "/admin/affiliates"}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5"
            >
              {variant === "affiliate" ? "Manage assets" : "Open review queue"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:pl-[0.25rem]">
          <header className="glass-panel sticky top-4 z-20 mb-5 flex flex-col gap-4 rounded-[30px] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                aria-label="Open navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--olive-deep)] text-white lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="section-kicker">{dashboardTodayLabel}</p>
                <h2 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)]">
                  {currentRoute.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
                  {currentRoute.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/74 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
                <KeyRound className="h-4 w-4 text-[var(--olive-deep)]" />
                Role key: {variant === "affiliate" ? "Affiliate" : "Admin"}
              </div>
              <Link
                href={variant === "affiliate" ? "/admin" : "/dashboard"}
                className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white"
              >
                {variant === "affiliate" ? "Open admin overview" : "Open affiliate dashboard"}
              </Link>
              <Link
                href={variant === "affiliate" ? "/dashboard/settings" : "/admin/rules"}
                className="rounded-full bg-[var(--olive-deep)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--olive)]"
              >
                {variant === "affiliate" ? "Payout settings" : "Edit rules"}
              </Link>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
