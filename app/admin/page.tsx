import { AlertTriangle, BadgeDollarSign, ShieldCheck, Users } from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { adminAlerts, affiliateApplications, topAffiliates } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/format";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-4">
        <MetricCard label="Active affiliates" value="48" detail="Partners currently approved and eligible to earn." change="+6" icon={Users} tone="olive" />
        <MetricCard label="Pending approvals" value="4" detail="Applications that still require review or onboarding follow-up." change="Action" icon={ShieldCheck} tone="teal" />
        <MetricCard label="Approved payout batch" value="$26.7K" detail="Program-wide approved commission ready for the next release." change="Apr 03" icon={BadgeDollarSign} tone="amber" />
        <MetricCard label="Risk alerts" value="3" detail="Refund, KYC, or webhook conditions that need admin attention." change="Monitor" icon={AlertTriangle} tone="rose" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Program alerts" title="What needs attention" />
          <div className="mt-6 space-y-4">
            {adminAlerts.map((alert) => (
              <div key={alert} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(215,154,55,0.18)] text-[#8a621f]">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-[var(--foreground)]">{alert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Top affiliates" title="Program leaders this month" />
          <div className="mt-5">
            <DataTable
              rows={topAffiliates}
              columns={[
                {
                  header: "Affiliate",
                  cell: (row) => (
                    <div>
                      <p className="font-semibold">{row.name}</p>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">{row.tier}</p>
                    </div>
                  ),
                },
                {
                  header: "Leads",
                  cell: (row) => <span>{formatNumber(row.leads)}</span>,
                },
                {
                  header: "Revenue",
                  cell: (row) => <span className="font-semibold">{formatCurrency(row.revenue)}</span>,
                },
                {
                  header: "Payout",
                  cell: (row) => (
                    <StatusPill
                      label={row.payoutStatus}
                      tone={row.payoutStatus === "Ready" ? "olive" : row.payoutStatus === "Hold" ? "amber" : "rose"}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Approval queue" title="Affiliate applications" />
        <div className="mt-5">
          <DataTable
            rows={affiliateApplications}
            columns={[
              {
                header: "Name",
                cell: (row) => <span className="font-semibold">{row.name}</span>,
              },
              {
                header: "Channel",
                cell: (row) => <span className="text-[var(--ink-soft)]">{row.channel}</span>,
              },
              {
                header: "Region",
                cell: (row) => <span>{row.region}</span>,
              },
              {
                header: "Status",
                cell: (row) => (
                  <StatusPill
                    label={row.status}
                    tone={row.status === "Approved" ? "olive" : row.status === "Review" ? "amber" : "teal"}
                  />
                ),
              },
              {
                header: "Fit",
                cell: (row) => <span className="text-[var(--ink-soft)]">{row.score}</span>,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
