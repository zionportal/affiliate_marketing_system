import { DataTable } from "@/components/dashboard/data-table";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { payoutHistory, topAffiliates } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/format";

export default function AdminPayoutsPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Transfer monitor"
          title="Recent payout batches"
          description="This admin view will map approved commission items to payout batches and Stripe transfer records."
        />
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
              { header: "Amount", cell: (row) => <span className="font-semibold">{formatCurrency(row.amount)}</span> },
              { header: "Status", cell: (row) => <StatusPill label={row.status} tone="olive" /> },
              { header: "Released", cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.releasedAt)}</span> },
            ]}
          />
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Exposure" title="Affiliates with payout blockers" />
        <div className="mt-5">
          <DataTable
            rows={topAffiliates.filter((affiliate) => affiliate.payoutStatus !== "Ready")}
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
              { header: "Revenue", cell: (row) => <span>{formatCurrency(row.revenue)}</span> },
              {
                header: "Blocker",
                cell: (row) => (
                  <StatusPill label={row.payoutStatus} tone={row.payoutStatus === "Hold" ? "amber" : "rose"} />
                ),
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
