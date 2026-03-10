import Link from "next/link";

import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_420px]">
        <section className="rounded-[36px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(135deg,rgba(51,74,50,0.96),rgba(36,59,52,0.92))] p-8 text-white shadow-[0_28px_80px_rgba(31,45,39,0.22)] sm:p-10">
          <p className="section-kicker text-white/62">Summit Ledger</p>
          <h1 className="display-title mt-4 max-w-2xl text-5xl font-semibold leading-none">
            Sign back in to your affiliate workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
            Review leads, see which Stripe sales were attributed to you, and monitor the next payout batch.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Lead and sale reporting",
              "Commission ledger history",
              "Automated bank payout status",
            ].map((item) => (
              <div key={item} className="rounded-[26px] border border-white/14 bg-white/8 p-4 text-sm font-semibold text-white/88">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-[36px] p-7 sm:p-8">
          <p className="section-kicker">Affiliate access</p>
          <h2 className="display-title mt-3 text-3xl font-semibold text-[var(--foreground)]">Welcome back</h2>
          <SignInForm />

          <p className="mt-6 text-sm text-[var(--ink-soft)]">
            Need an account? <Link href="/auth/sign-up" className="font-semibold text-[var(--olive-deep)]">Apply here</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
