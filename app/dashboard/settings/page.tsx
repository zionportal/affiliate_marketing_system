import Link from "next/link";
import { ExternalLink, Link2, ShieldCheck, UserCircle2 } from "lucide-react";

import { SectionHeading } from "@/components/dashboard/section-heading";
import { StatusPill } from "@/components/dashboard/status-pill";

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Profile" title="Affiliate identity" />
          <div className="mt-6 space-y-4">
            <div className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(97,122,66,0.14)] text-[var(--olive-deep)]">
                  <UserCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">David Morgan</p>
                  <p className="text-sm text-[var(--ink-soft)]">Summit Partner tier</p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-[var(--ink-soft)]">Email</p>
                  <p className="mt-2 font-semibold text-[var(--foreground)]">david@example.com</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-[var(--ink-soft)]">Primary channel</p>
                  <p className="mt-2 font-semibold text-[var(--foreground)]">Organic search + content</p>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Referral code</p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">DAVID-GLD</p>
                </div>
                <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[var(--olive-deep)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--olive)]">
                  Preview dashboard
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6 sm:p-7">
          <SectionHeading eyebrow="Payout settings" title="Stripe Connect onboarding" />
          <div className="mt-6 space-y-4">
            {[
              "Connected account ID saved",
              "Identity verification complete",
              "External account verified",
              "Charges and payouts enabled",
            ].map((item) => (
              <div key={item} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--foreground)]">{item}</p>
                  <StatusPill label="Ready" tone="olive" />
                </div>
              </div>
            ))}

            <div className="rounded-[26px] border border-[var(--line)] bg-[rgba(63,128,144,0.08)] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-[var(--teal)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Integration checkpoint</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
                    When you are ready to wire live onboarding, I will need your Stripe publishable key,
                    secret key, and webhook secret.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Referral assets" title="Links and campaign placement" />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Default signup link",
              value: "https://summitledger.app/r/DAVID-GLD",
              note: "Use for general referral traffic and broad content placements.",
            },
            {
              title: "Newsletter CTA link",
              value: "https://summitledger.app/r/DAVID-GLD?utm_source=newsletter",
              note: "Lets you compare newsletter traffic against site traffic inside attribution reports.",
            },
            {
              title: "Campaign deep link",
              value: "https://summitledger.app/r/DAVID-GLD?campaign=spring-launch",
              note: "Use custom campaign params whenever you need tighter source reporting.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--paper)] text-[var(--olive-deep)]">
                  <Link2 className="h-5 w-5" />
                </div>
                <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
              </div>
              <p className="mt-4 break-all text-sm font-semibold text-[var(--foreground)]">{item.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{item.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
