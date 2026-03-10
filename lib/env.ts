function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function getFirstDefinedEnv(names: string[]) {
  const value = names.find((name) => process.env[name])
    ? process.env[names.find((name) => process.env[name]) as string]
    : undefined;

  if (!value) {
    throw new Error(`${names.join(" or ")} is not configured.`);
  }

  return value;
}

function hasStripeSecretKeyShape(value?: string) {
  return Boolean(value && (value.startsWith("sk_") || value.startsWith("rk_")));
}

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function hasStripeServerEnv() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? process.env.stripe_key;

  return Boolean(
    hasStripeSecretKeyShape(stripeSecretKey) && process.env.STRIPE_WEBHOOK_SECRET,
  );
}

export function getSupabasePublicEnv() {
  return {
    url: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}

export function getSupabaseServiceRoleKey() {
  return getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getStripePublishableKey() {
  return getRequiredEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}

export function getStripeSecretKey() {
  return getFirstDefinedEnv(["STRIPE_SECRET_KEY", "stripe_key"]);
}

export function getStripeWebhookSecret() {
  return getRequiredEnv("STRIPE_WEBHOOK_SECRET");
}

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
