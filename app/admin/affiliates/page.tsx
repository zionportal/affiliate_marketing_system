import { DataTable } from "@/components/dashboard/data-table";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { affiliateApplications, topAffiliates } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/format";

export default function AdminAffiliatesPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Approvals"
          title="Application queue"
          description="This is where your affiliate approval workflow will live once Supabase auth and role gating are wired."
        />
        <div className="mt-5">
          <DataTable
            rows={affiliateApplications}
            columns={[
              { header: "Name", cell: (row) => <span className="font-semibold">{row.name}</span> },
              { header: "Channel", cell: (row) => <span className="text-[var(--ink-soft)]">{row.channel}</span> },
              { header: "Region", cell: (row) => <span>{row.region}</span> },
              {
                header: "Status",
                cell: (row) => (
                  <StatusPill
                    label={row.status}
                    tone={row.status === "Approved" ? "olive" : row.status === "Review" ? "amber" : "teal"}
                  />
                ),
              },
              { header: "Fit", cell: (row) => <span>{row.score}</span> },
            ]}
          />
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Approved partners" title="Live affiliate roster" />
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
              { header: "Leads", cell: (row) => <span>{formatNumber(row.leads)}</span> },
              { header: "Revenue", cell: (row) => <span className="font-semibold">{formatCurrency(row.revenue)}</span> },
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
      </section>
    </div>
  );
}
