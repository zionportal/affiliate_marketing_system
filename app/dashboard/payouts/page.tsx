import { BadgeCheck, Building2, CalendarClock, Landmark } from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { payoutHistory, payoutTimeline } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/format";

export default function PayoutsPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-4">
        <MetricCard label="Pending balance" value={formatCurrency(payoutTimeline[0].amount)} detail={payoutTimeline[0].caption} change="Hold window" icon={CalendarClock} tone="teal" />
        <MetricCard label="Approved balance" value={formatCurrency(payoutTimeline[1].amount)} detail={payoutTimeline[1].caption} change="Next batch" icon={BadgeCheck} tone="olive" />
        <MetricCard label="Settled YTD" value={formatCurrency(payoutTimeline[2].amount)} detail={payoutTimeline[2].caption} change="Stripe" icon={Landmark} tone="amber" />
        <MetricCard label="Bank account" value="Ready" detail="Connected and eligible for automated transfers." change="2281" icon={Building2} tone="rose" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Stripe Connect" title="Payout readiness" />
          <div className="mt-5 space-y-4">
            {[
              "Connected account created",
              "Identity verification complete",
              "External bank account attached",
              "Charges and payouts enabled",
            ].map((step) => (
              <div key={step} className="rounded-[26px] border border-[var(--line)] bg-white/76 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--foreground)]">{step}</p>
                  <StatusPill label="Complete" tone="olive" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading
            eyebrow="Upcoming release"
            title="How the next payout batch is staged"
            description="Approved commissions move into a payout batch only after the configured hold window clears refund exposure."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {payoutTimeline.map((item) => (
              <div key={item.label} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
                <p className="section-kicker">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--foreground)]">
                  {formatCurrency(item.amount)}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Payout history" title="Recent transfer records" />
        <div className="mt-5">
          <DataTable
            rows={payoutHistory}
            columns={[
              {
                header: "Period",
                cell: (row) => (
                  <div>
                    <p className="font-semibold">{row.period}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{row.method}</p>
                  </div>
                ),
              },
              {
                header: "Amount",
                cell: (row) => <span className="font-semibold">{formatCurrency(row.amount)}</span>,
              },
              {
                header: "Status",
                cell: (row) => <StatusPill label={row.status} tone="olive" />,
              },
              {
                header: "Released",
                cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.releasedAt)}</span>,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
