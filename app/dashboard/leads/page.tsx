import { ChartColumnIncreasing, PhoneCall, Target, UserRoundPlus } from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { DistributionChart } from "@/components/dashboard/charts/distribution-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { leadStatus, recentLeads } from "@/lib/mock-data";
import { formatLongDate } from "@/lib/format";

const leadSourcePerformance = [
  { id: "src-1", source: "Organic landing page", volume: "34 leads", conversion: "38%" },
  { id: "src-2", source: "Referral webinar", volume: "27 leads", conversion: "32%" },
  { id: "src-3", source: "Comparison guide", volume: "18 leads", conversion: "29%" },
  { id: "src-4", source: "Newsletter CTA", volume: "11 leads", conversion: "17%" },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-4">
        <MetricCard label="New this month" value="128" detail="Lead volume is pacing 18% above last month." change="+18%" icon={UserRoundPlus} tone="olive" />
        <MetricCard label="Qualified" value="46" detail="High-intent leads that are ready for handoff." change="36%" icon={Target} tone="teal" />
        <MetricCard label="Callbacks booked" value="29" detail="Scheduled calls from referred traffic this month." change="+7" icon={PhoneCall} tone="amber" />
        <MetricCard label="Conversion pace" value="32%" detail="Lead-to-sale close rate over the rolling 30-day window." change="Stable" icon={ChartColumnIncreasing} tone="rose" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Lead breakdown" title="Status mix this month" />
          <div className="mt-5">
            <DistributionChart data={leadStatus} />
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading
            eyebrow="Source quality"
            title="Channels driving the best lead shape"
            description="Keep this close to attribution so you can see which campaigns generate the cleanest pipeline, not just the most clicks."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {leadSourcePerformance.map((item) => (
              <div key={item.id} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
                <p className="font-semibold text-[var(--foreground)]">{item.source}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-[var(--ink-soft)]">
                  <span>{item.volume}</span>
                  <StatusPill label={item.conversion} tone="olive" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Detailed leads" title="Recent referred leads" />
        <div className="mt-5">
          <DataTable
            rows={recentLeads}
            columns={[
              {
                header: "Contact",
                cell: (row) => (
                  <div>
                    <p className="font-semibold">{row.contact}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">Lead score: {row.score}</p>
                  </div>
                ),
              },
              {
                header: "Source",
                cell: (row) => <span className="text-[var(--ink-soft)]">{row.source}</span>,
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
                    tone={row.status === "Qualified" ? "olive" : row.status === "Nurturing" ? "teal" : row.status === "Proposal" ? "amber" : "rose"}
                  />
                ),
              },
              {
                header: "Created",
                cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.createdAt)}</span>,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
