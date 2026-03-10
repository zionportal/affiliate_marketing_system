import { SectionHeading } from "@/components/dashboard/section-heading";
import { commissionRules } from "@/lib/mock-data";

export default function AdminRulesPage() {
  return (
    <div className="space-y-6 pb-8">
      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Rule controls"
          title="Commission policies"
          description="These cards will eventually be backed by a commission_rules table so admins can tune payout behavior without editing code."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {commissionRules.map((rule) => (
            <div key={rule.id} className="rounded-[28px] border border-[var(--line)] bg-white/76 p-5">
              <p className="font-semibold text-[var(--foreground)]">{rule.name}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{rule.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <SectionHeading eyebrow="Default assumptions" title="Initial operating defaults" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Lead = referred signup or form submit",
            "Sale = successful Stripe payment",
            "Attribution = last-click",
            "Payout cadence = monthly after hold window",
          ].map((item) => (
            <div key={item} className="rounded-[26px] border border-[var(--line)] bg-white/76 p-5 text-sm font-semibold text-[var(--foreground)]">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
