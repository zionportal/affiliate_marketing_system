import { BadgeDollarSign, BriefcaseBusiness, ChartNoAxesCombined, Wallet } from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { DistributionChart } from "@/components/dashboard/charts/distribution-chart";
import { PerformanceChart } from "@/components/dashboard/charts/performance-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { performanceSeries, salesLedger, saleStatus } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/format";

export default function SalesPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-4">
        <MetricCard label="Sales this month" value="41" detail="Attributed Stripe sales collected during the current period." change="+12%" icon={BriefcaseBusiness} tone="olive" />
        <MetricCard label="Gross revenue" value="$18.4K" detail="Total referred revenue from successful Stripe payment events." change="+9%" icon={Wallet} tone="teal" />
        <MetricCard label="Average order" value="$2.2K" detail="Average sale size across currently attributed deals." change="Healthy" icon={ChartNoAxesCombined} tone="amber" />
        <MetricCard label="Commission created" value="$5.4K" detail="Ledger entries generated from completed sale events." change="30-day" icon={BadgeDollarSign} tone="rose" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Sales trend" title="Revenue pace by month" />
          <div className="mt-6">
            <PerformanceChart data={performanceSeries} />
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Review queue" title="Current sale status" />
          <div className="mt-4">
            <DistributionChart data={saleStatus} />
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Attributed sales"
          title="Detailed sales ledger"
          description="These rows will eventually hydrate from Stripe checkout and webhook events tied back to referral attribution."
        />
        <div className="mt-5">
          <DataTable
            rows={salesLedger}
            columns={[
              {
                header: "Customer",
                cell: (row) => (
                  <div>
                    <p className="font-semibold">{row.customer}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{row.offer}</p>
                  </div>
                ),
              },
              {
                header: "Amount",
                cell: (row) => <span className="font-semibold">{formatCurrency(row.amount)}</span>,
              },
              {
                header: "Commission",
                cell: (row) => <span className="text-[var(--ink-soft)]">{formatCurrency(row.commission)}</span>,
              },
              {
                header: "Status",
                cell: (row) => (
                  <StatusPill
                    label={row.status}
                    tone={row.status === "Approved" ? "olive" : row.status === "Review" ? "amber" : "rose"}
                  />
                ),
              },
              {
                header: "Paid",
                cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.paidAt)}</span>,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
