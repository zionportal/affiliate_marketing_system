"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SignUpForm() {
  const router = useRouter();
  const supabaseConfigured = hasSupabaseEnv();
  const supabase = useMemo(
    () => (supabaseConfigured ? createSupabaseBrowserClient() : null),
    [supabaseConfigured],
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channel, setChannel] = useState("");
  const [whyFit, setWhyFit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          channel,
          why_fit: whyFit,
        },
      },
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setSuccess("Application submitted. Check your email to confirm the account.");
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-sm font-semibold text-[var(--ink-soft)]">Full name</span>
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          className="mt-2 w-full rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--olive)]"
          placeholder="David Morgan"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[var(--ink-soft)]">Email address</span>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          className="mt-2 w-full rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--olive)]"
          placeholder="david@example.com"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[var(--ink-soft)]">Password</span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          type="password"
          className="mt-2 w-full rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--olive)]"
          placeholder="Create a password"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[var(--ink-soft)]">Primary promotion channel</span>
        <input
          value={channel}
          onChange={(event) => setChannel(event.target.value)}
          className="mt-2 w-full rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--olive)]"
          placeholder="SEO, newsletter, community, paid media"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[var(--ink-soft)]">Why are you a fit?</span>
        <textarea
          value={whyFit}
          onChange={(event) => setWhyFit(event.target.value)}
          className="mt-2 min-h-32 w-full rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--olive)]"
          placeholder="Describe your audience, traffic quality, and how you would promote the offer."
        />
      </label>

      {error ? <p className="text-sm font-medium text-[var(--rose)]">{error}</p> : null}
      {success ? <p className="text-sm font-medium text-[var(--olive-deep)]">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
