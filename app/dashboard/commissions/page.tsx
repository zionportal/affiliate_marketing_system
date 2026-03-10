import { BanknoteArrowDown, Clock3, ShieldCheck, Wallet } from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { DistributionChart } from "@/components/dashboard/charts/distribution-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { commissionLedger, commissionRules } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/format";

const commissionMix = [
  { name: "Approved", value: 2, fill: "#617a42" },
  { name: "Pending", value: 1, fill: "#3f8090" },
  { name: "Hold", value: 1, fill: "#d79a37" },
];

export default function CommissionsPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-4">
        <MetricCard label="Pending" value="$2.4K" detail="Commissions still inside the refund or verification window." change="21 days" icon={Clock3} tone="teal" />
        <MetricCard label="Approved" value="$7.2K" detail="Available for the next payout batch once the release date arrives." change="Ready" icon={ShieldCheck} tone="olive" />
        <MetricCard label="Settled YTD" value="$39.8K" detail="Already paid to your connected bank account through Stripe." change="YTD" icon={BanknoteArrowDown} tone="amber" />
        <MetricCard label="Average commission" value="$334" detail="Average payout size per closed and attributed sale in the ledger." change="+5%" icon={Wallet} tone="rose" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Ledger mix" title="Commission status distribution" />
          <div className="mt-4">
            <DistributionChart data={commissionMix} />
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Rulebook" title="Current commission logic" />
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {commissionRules.map((rule) => (
              <div key={rule.id} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
                <p className="font-semibold text-[var(--foreground)]">{rule.name}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Commission ledger"
          title="Detailed earnings queue"
          description="Once Supabase and Stripe are connected, this page becomes the immutable history of what was earned, approved, and paid."
        />
        <div className="mt-5">
          <DataTable
            rows={commissionLedger}
            columns={[
              {
                header: "Source",
                cell: (row) => (
                  <div>
                    <p className="font-semibold">{row.source}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{row.rule}</p>
                  </div>
                ),
              },
              {
                header: "Amount",
                cell: (row) => <span className="font-semibold">{formatCurrency(row.amount)}</span>,
              },
              {
                header: "Status",
                cell: (row) => (
                  <StatusPill
                    label={row.status}
                    tone={row.status === "Approved" ? "olive" : row.status === "Pending" ? "teal" : "amber"}
                  />
                ),
              },
              {
                header: "Available",
                cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.availableOn)}</span>,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
