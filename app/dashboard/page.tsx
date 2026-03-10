import {
  ArrowUpRight,
  BadgeDollarSign,
  BanknoteArrowDown,
  ClipboardCheck,
  Target,
} from "lucide-react";

import { DataTable } from "@/components/dashboard/data-table";
import { DistributionChart } from "@/components/dashboard/charts/distribution-chart";
import { PerformanceChart } from "@/components/dashboard/charts/performance-chart";
import { ShareChart } from "@/components/dashboard/charts/share-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";
import {
  commissionLedger,
  leadStatus,
  overviewMetrics,
  performanceSeries,
  recentLeads,
  revenueByLocation,
  revenueByService,
  saleStatus,
  yearlyRollups,
} from "@/lib/mock-data";
import { formatCompactCurrency, formatCurrency, formatLongDate } from "@/lib/format";

const topMetricIcons = [Target, ClipboardCheck, BadgeDollarSign, BanknoteArrowDown] as const;
const topMetricTones = ["olive", "teal", "amber", "rose"] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_340px]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="section-kicker">Welcome back</p>
              <h3 className="display-title mt-2 text-4xl font-semibold">David Morgan</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
                Your referral motion is healthy: qualified lead volume is up, approved commissions are
                pacing ahead of target, and the next Stripe bank payout is already staged.
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--line)] bg-white/72 p-4 text-sm text-[var(--ink-soft)]">
              <p className="section-kicker">Referral asset</p>
              <p className="mt-3 font-semibold text-[var(--foreground)]">
                https://summitledger.app/r/DAVID-GLD
              </p>
              <div className="mt-4 flex items-center gap-2 text-[var(--olive-deep)]">
                <ArrowUpRight className="h-4 w-4" />
                Ready for campaigns, embeds, and email CTAs
              </div>
            </div>
          </div>
        </div>

        <div className="panel-strong rounded-[32px] p-6">
          <p className="section-kicker">Next release window</p>
          <h3 className="display-title mt-2 text-3xl font-semibold">Apr 03 payout batch</h3>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
            Approved commission has cleared the hold window and Stripe Connect onboarding is complete.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] border border-[var(--line)] bg-white/75 p-4">
              <p className="text-sm text-[var(--ink-soft)]">Ready to settle</p>
              <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">$7.2K</p>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/75 p-4">
              <p className="text-sm text-[var(--ink-soft)]">Payout rail</p>
              <p className="mt-2 font-semibold text-[var(--foreground)]">Stripe Connect Express</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">First National Bank ending in 2281</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        {overviewMetrics.map((metric, index) => {
          const Icon = topMetricIcons[index] ?? Target;
          const tone = topMetricTones[index] ?? "olive";

          return (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              detail={metric.detail}
              change={metric.change}
              icon={Icon}
              tone={tone}
            />
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading
            eyebrow="This month"
            title="Revenue and commission pace"
            description="Monitor referred revenue beside the earnings it creates so payout timing is never a surprise."
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
            <PerformanceChart data={performanceSeries} />
            <div className="space-y-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-white/76 p-4">
                <p className="text-sm text-[var(--ink-soft)]">Trailing 30-day revenue</p>
                <p className="mt-3 text-3xl font-semibold">{formatCompactCurrency(18420)}</p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/76 p-4">
                <p className="text-sm text-[var(--ink-soft)]">Estimated next settlement</p>
                <p className="mt-3 text-3xl font-semibold">{formatCompactCurrency(7280)}</p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/76 p-4">
                <p className="text-sm text-[var(--ink-soft)]">Average close rate</p>
                <p className="mt-3 text-3xl font-semibold">32%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel rounded-[32px] p-6">
            <SectionHeading eyebrow="Lead quality" title="Current lead mix" />
            <div className="mt-4">
              <DistributionChart data={leadStatus} />
            </div>
          </div>
          <div className="glass-panel rounded-[32px] p-6">
            <SectionHeading eyebrow="Sale approvals" title="Sales risk profile" />
            <div className="mt-4">
              <DistributionChart data={saleStatus} />
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Over the year"
          title="Program totals"
          description="The structure mirrors the dense operational reporting in your inspiration, but with cleaner typography and more breathing room."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {yearlyRollups.map((item) => (
            <div key={item.label} className="rounded-[28px] border border-[var(--line)] bg-white/76 p-5">
              <p className="text-sm font-semibold text-[var(--ink-soft)]">{item.label}</p>
              <p className="mt-4 text-4xl font-semibold text-[var(--foreground)]">{item.value}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Service mix" title="Top services by revenue" />
          <div className="mt-5 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
            <ShareChart data={revenueByService} />
            <div className="space-y-4">
              {revenueByService.map((item) => (
                <div key={item.name} className="rounded-[24px] border border-[var(--line)] bg-white/76 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--foreground)]">{item.name}</p>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.share}% of attributed revenue</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--olive-deep)]">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Top locations" title="Where revenue is landing" />
          <div className="mt-5">
            <DataTable
              rows={revenueByLocation}
              columns={[
                {
                  header: "City",
                  cell: (row) => <span className="font-semibold">{row.city}</span>,
                },
                {
                  header: "State",
                  cell: (row) => <span className="text-[var(--ink-soft)]">{row.state}</span>,
                },
                {
                  header: "Revenue",
                  cell: (row) => <span className="font-semibold">{formatCurrency(row.revenue)}</span>,
                },
                {
                  header: "Share",
                  cell: (row) => <StatusPill label={row.share} tone="olive" />,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Detailed leads" title="Recent lead activity" />
          <div className="mt-5">
            <DataTable
              rows={recentLeads}
              columns={[
                {
                  header: "Contact",
                  cell: (row) => (
                    <div>
                      <p className="font-semibold">{row.contact}</p>
                      <p className="mt-1 text-xs tracking-[0.18em] uppercase text-[var(--ink-soft)]">
                        {row.id}
                      </p>
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
                  header: "Date",
                  cell: (row) => <span className="text-[var(--ink-soft)]">{formatLongDate(row.createdAt)}</span>,
                },
              ]}
            />
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Commission queue" title="What is moving toward payout" />
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
        </div>
      </section>
    </div>
  );
}
