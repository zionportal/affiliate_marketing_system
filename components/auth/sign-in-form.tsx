"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SignInForm() {
  const router = useRouter();
  const supabaseConfigured = hasSupabaseEnv();
  const supabase = useMemo(
    () => (supabaseConfigured ? createSupabaseBrowserClient() : null),
    [supabaseConfigured],
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
          type="password"
          className="mt-2 w-full rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--olive)]"
          placeholder="Enter your password"
        />
      </label>

      {error ? <p className="text-sm font-medium text-[var(--rose)]">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--olive-deep)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
