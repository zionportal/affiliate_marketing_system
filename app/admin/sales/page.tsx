import { DataTable } from "@/components/dashboard/data-table";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import { salesLedger } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/format";

export default function AdminSalesPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Sale review"
          title="Attributed sales awaiting verification"
          description="Stripe payment events, refund exposure, and commission generation will eventually be reconciled here before approval."
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
              { header: "Amount", cell: (row) => <span className="font-semibold">{formatCurrency(row.amount)}</span> },
              { header: "Commission", cell: (row) => <span>{formatCurrency(row.commission)}</span> },
              {
                header: "Status",
                cell: (row) => (
                  <StatusPill
                    label={row.status}
                    tone={row.status === "Approved" ? "olive" : row.status === "Review" ? "amber" : "rose"}
                  />
                ),
              },
              { header: "Paid", cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.paidAt)}</span> },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
