import Link from "next/link";

import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[420px_minmax(0,1.1fr)]">
        <section className="glass-panel order-2 rounded-[36px] p-7 sm:p-8 lg:order-1">
          <p className="section-kicker">Affiliate application</p>
          <h1 className="display-title mt-3 text-3xl font-semibold text-[var(--foreground)]">Apply to the program</h1>
          <SignUpForm />

          <p className="mt-6 text-sm text-[var(--ink-soft)]">
            Already have access? <Link href="/auth/sign-in" className="font-semibold text-[var(--olive-deep)]">Sign in</Link>
          </p>
        </section>

        <section className="order-1 rounded-[36px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(135deg,rgba(51,74,50,0.96),rgba(36,59,52,0.92))] p-8 text-white shadow-[0_28px_80px_rgba(31,45,39,0.22)] sm:p-10 lg:order-2">
          <p className="section-kicker text-white/62">How approval works</p>
          <h2 className="display-title mt-4 max-w-2xl text-5xl font-semibold leading-none">
            We review quality first, then unlock referral links and payout setup.
          </h2>
          <div className="mt-8 space-y-4">
            {[
              "Application review and fit check",
              "Affiliate approval and account activation",
              "Stripe Connect onboarding for bank payouts",
              "Referral code issued for campaigns and landing pages",
            ].map((item, index) => (
              <div key={item} className="rounded-[26px] border border-white/14 bg-white/8 p-4">
                <p className="text-sm font-semibold text-white/64">Step {index + 1}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
