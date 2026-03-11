import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  ChartNoAxesCombined,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { formatCompactCurrency, formatNumber } from "@/lib/format";
import {
  programWorkflow,
  revenueByService,
  stackHighlights,
} from "@/lib/mock-data";

const heroMetrics = [
  {
    label: "Qualified leads",
    value: "128",
    change: "+18%",
    detail: "34 sales-ready this week",
  },
  {
    label: "Closed sales",
    value: "41",
    change: "+12%",
    detail: "13 renewals this month",
  },
  {
    label: "Approved commission",
    value: "$18.4K",
    change: "+9%",
    detail: "Runway on track for Apr 03",
  },
  {
    label: "Next payout",
    value: "$7.2K",
    change: "Apr 03",
    detail: "Bank payout ready",
  },
];

export default function Home() {
  return (
    <main className="page-shell overflow-hidden px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[1480px] flex-col gap-4 sm:gap-5">
        <header className="glass-panel flex flex-col gap-4 rounded-[28px] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--olive-deep)] text-white soft-ring">
              <BadgeDollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="section-kicker">Summit Ledger</p>
              <h1 className="display-title text-[1.95rem] font-semibold leading-none sm:text-[2.15rem]">
                Affiliate command center
              </h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--ink-soft)]">
            <a href="#workflow" className="rounded-full px-3 py-2 transition hover:bg-white/50 hover:text-[var(--foreground)]">
              Workflow
            </a>
            <a href="#stack" className="rounded-full px-3 py-2 transition hover:bg-white/50 hover:text-[var(--foreground)]">
              Stack
            </a>
            <Link href="/auth/sign-in" className="rounded-full px-4 py-2 transition hover:bg-white/50 hover:text-[var(--foreground)]">
              Sign in
            </Link>
            <Link href="/dashboard" className="rounded-full bg-[var(--olive-deep)] px-4 py-2 text-white transition hover:bg-[var(--olive)]">
              View dashboard
            </Link>
          </nav>
        </header>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.36fr)_368px] xl:items-start">
          <div className="relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(51,74,50,0.96),rgba(36,59,52,0.92))] px-6 py-5 text-white shadow-[0_28px_80px_rgba(31,45,39,0.22)] sm:px-8 sm:py-6 lg:px-9 xl:pr-10">
            <div className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_58%)]" />
            <div className="relative flex h-full flex-col gap-5">
              <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/72">
                <Sparkles className="h-4 w-4" />
                Track the whole funnel from first click to settled payout
              </div>

              <div className="max-w-3xl space-y-3">
                <p className="section-kicker text-white/64">Next.js + Supabase + Stripe Connect</p>
                <h2 className="display-title max-w-[16.5ch] text-[clamp(2.5rem,3.15vw,3.65rem)] leading-[0.95] font-semibold">
                  Built for affiliate teams who need clear numbers and automated payouts.
                </h2>
                <p className="max-w-[58ch] text-[14px] leading-7 text-white/78 sm:text-[15px] sm:leading-8">
                  Summit Ledger turns referral traffic into a clean operating system: leads, sales,
                  commissions, and Stripe-powered bank payouts, all in one deliberate workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/auth/sign-up" className="inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:bg-[#e4ac53]">
                  Apply as an affiliate
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12">
                  Open admin view
                </Link>
              </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <div className="rounded-full border border-white/14 bg-white/8 px-4 py-2.5">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/52">Revenue</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-xl font-semibold">{formatCompactCurrency(18420)}</p>
                    <p className="text-xs text-emerald-200">+18%</p>
                  </div>
                </div>
                <div className="rounded-full border border-white/14 bg-white/8 px-4 py-2.5">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/52">Approved</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-xl font-semibold">{formatCompactCurrency(7280)}</p>
                    <p className="text-xs text-white/62">Monthly</p>
                  </div>
                </div>
                <div className="rounded-full border border-white/14 bg-white/8 px-4 py-2.5">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/52">Qualified</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-xl font-semibold">{formatNumber(128)}</p>
                    <p className="text-xs text-white/62">Last-click</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel flex h-full flex-col rounded-[32px] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">At a glance</p>
                  <h3 className="display-title mt-2 text-[2.25rem] leading-none font-semibold sm:text-[2.5rem]">
                    This month at a glance
                  </h3>
                </div>
                <div className="rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-[var(--olive-deep)]">
                  Last-click model
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[22px] border border-[var(--line)] bg-white/72 px-4 py-3.5">
                    <div>
                      <p className="text-sm leading-5 text-[var(--ink-soft)]">{metric.label}</p>
                      <p className="mt-2 text-[2rem] leading-none font-semibold text-[var(--foreground)]">{metric.value}</p>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <p className="text-xs leading-5 text-[var(--ink-soft)]">{metric.detail}</p>
                      <p className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[var(--olive-deep)]">
                        {metric.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="glass-panel rounded-[32px] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Dashboard blocks</p>
                <h3 className="display-title mt-2 text-3xl font-semibold">Reporting architecture inspired by your reference</h3>
              </div>
              <ChartNoAxesCombined className="hidden h-8 w-8 text-[var(--olive)] sm:block" />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[28px] border border-[var(--line)] bg-white/72 p-5">
                <p className="text-sm font-semibold text-[var(--ink-soft)]">Funnel summary</p>
                <div className="mt-4 space-y-4">
                  {programWorkflow.slice(0, 3).map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--paper)] text-sm font-semibold text-[var(--olive-deep)]">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(63,128,144,0.12),rgba(63,128,144,0.03))] p-5">
                <p className="text-sm font-semibold text-[var(--ink-soft)]">Top service mix</p>
                <div className="mt-4 space-y-4">
                  {revenueByService.slice(0, 4).map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-[var(--ink-soft)]">{formatCompactCurrency(item.revenue)}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/70">
                        <div className="h-2 rounded-full bg-[var(--olive)]" style={{ width: `${item.share}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="stack" className="glass-panel rounded-[32px] p-6 sm:p-7">
            <p className="section-kicker">Built on your stack</p>
            <h3 className="display-title mt-2 text-3xl font-semibold">Implementation direction</h3>
            <div className="mt-6 space-y-4">
              {stackHighlights.map((item) => (
                <div key={item.name} className="rounded-[24px] border border-[var(--line)] bg-white/72 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--paper)] text-[var(--olive-deep)]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm leading-6 text-[var(--ink-soft)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="glass-panel rounded-[32px] p-6 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Operating model</p>
              <h3 className="display-title mt-2 text-3xl font-semibold">How the system moves from traffic to payout</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--ink-soft)]">
              The MVP starts with affiliate signup, referral tracking, lead capture, Stripe sale attribution,
              commission approval, and payout readiness through Stripe Connect Express.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {programWorkflow.map((step, index) => (
              <div key={step.title} className="rounded-[28px] border border-[var(--line)] bg-white/76 p-5">
                <div className="flex items-center justify-between">
                  <span className="section-kicker">Step {index + 1}</span>
                  <ShieldCheck className="h-5 w-5 text-[var(--olive)]" />
                </div>
                <h4 className="mt-4 text-xl font-semibold">{step.title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
