create extension if not exists pgcrypto;

create type public.app_role as enum ('affiliate', 'admin');

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'affiliate',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );

  return new;
end;
$$;

create table if not exists public.commission_rules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  rule_type text not null check (rule_type in ('fixed', 'percent')),
  amount numeric(10,2),
  percentage numeric(5,2),
  hold_days integer not null default 21,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.affiliates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  referral_code text not null unique,
  status text not null default 'review' check (status in ('review', 'approved', 'rejected', 'suspended')),
  tier text not null default 'core',
  stripe_account_id text unique,
  stripe_onboarding_complete boolean not null default false,
  charges_enabled boolean not null default false,
  payouts_enabled boolean not null default false,
  default_commission_rule_id uuid references public.commission_rules(id),
  approved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references public.affiliates(id) on delete set null,
  referral_code text not null,
  landing_path text not null,
  visitor_token text,
  referrer_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_hash text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references public.affiliates(id) on delete set null,
  referral_id uuid references public.referrals(id) on delete set null,
  email text,
  full_name text,
  phone text,
  source text,
  region text,
  score integer not null default 0,
  status text not null default 'new' check (status in ('new', 'qualified', 'nurturing', 'proposal', 'disqualified')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references public.affiliates(id) on delete set null,
  referral_id uuid references public.referrals(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  stripe_payment_intent_id text unique,
  stripe_checkout_session_id text unique,
  stripe_invoice_id text unique,
  customer_email text,
  customer_name text,
  currency text not null default 'usd',
  gross_amount integer not null,
  net_amount integer,
  status text not null default 'pending' check (status in ('pending', 'approved', 'review', 'refunded', 'cancelled')),
  paid_at timestamptz,
  refunded_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  sale_id uuid not null references public.sales(id) on delete cascade,
  rule_id uuid references public.commission_rules(id),
  amount integer not null,
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending', 'approved', 'hold', 'rejected', 'paid')),
  hold_until timestamptz,
  approved_at timestamptz,
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  provider text not null default 'stripe_connect' check (provider in ('stripe_connect', 'paypal', 'manual_bank_transfer')),
  stripe_transfer_id text unique,
  stripe_payout_id text unique,
  status text not null default 'scheduled' check (status in ('scheduled', 'pending', 'paid', 'failed', 'cancelled')),
  period_start date,
  period_end date,
  amount integer not null,
  currency text not null default 'usd',
  released_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payout_items (
  id uuid primary key default gen_random_uuid(),
  payout_id uuid not null references public.payouts(id) on delete cascade,
  commission_id uuid not null unique references public.commissions(id) on delete cascade,
  amount integer not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.owns_affiliate(affiliate_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.affiliates
    where id = affiliate_uuid and user_id = auth.uid()
  );
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger commission_rules_set_updated_at
  before update on public.commission_rules
  for each row execute procedure public.handle_updated_at();

create trigger affiliates_set_updated_at
  before update on public.affiliates
  for each row execute procedure public.handle_updated_at();

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute procedure public.handle_updated_at();

create trigger sales_set_updated_at
  before update on public.sales
  for each row execute procedure public.handle_updated_at();

create trigger commissions_set_updated_at
  before update on public.commissions
  for each row execute procedure public.handle_updated_at();

create trigger payouts_set_updated_at
  before update on public.payouts
  for each row execute procedure public.handle_updated_at();

create index if not exists affiliates_user_id_idx on public.affiliates (user_id);
create index if not exists referrals_affiliate_id_idx on public.referrals (affiliate_id);
create index if not exists leads_affiliate_id_idx on public.leads (affiliate_id);
create index if not exists sales_affiliate_id_idx on public.sales (affiliate_id);
create index if not exists commissions_affiliate_id_idx on public.commissions (affiliate_id);
create index if not exists payouts_affiliate_id_idx on public.payouts (affiliate_id);

alter table public.profiles enable row level security;
alter table public.commission_rules enable row level security;
alter table public.affiliates enable row level security;
alter table public.referrals enable row level security;
alter table public.leads enable row level security;
alter table public.sales enable row level security;
alter table public.commissions enable row level security;
alter table public.payouts enable row level security;
alter table public.payout_items enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin"
on public.profiles for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create policy "affiliates_select_own_or_admin"
on public.affiliates for select
using (user_id = auth.uid() or public.is_admin());

create policy "affiliates_insert_own_or_admin"
on public.affiliates for insert
with check (user_id = auth.uid() or public.is_admin());

create policy "affiliates_update_own_or_admin"
on public.affiliates for update
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "referrals_select_own_or_admin"
on public.referrals for select
using (
  public.is_admin() or
  (affiliate_id is not null and public.owns_affiliate(affiliate_id))
);

create policy "referrals_insert_authenticated"
on public.referrals for insert
with check (auth.role() = 'authenticated');

create policy "leads_select_own_or_admin"
on public.leads for select
using (
  public.is_admin() or
  (affiliate_id is not null and public.owns_affiliate(affiliate_id))
);

create policy "sales_select_own_or_admin"
on public.sales for select
using (
  public.is_admin() or
  (affiliate_id is not null and public.owns_affiliate(affiliate_id))
);

create policy "commission_rules_select_all_authenticated"
on public.commission_rules for select
using (auth.role() = 'authenticated');

create policy "commission_rules_admin_all"
on public.commission_rules for all
using (public.is_admin())
with check (public.is_admin());

create policy "commissions_select_own_or_admin"
on public.commissions for select
using (public.is_admin() or public.owns_affiliate(affiliate_id));

create policy "payouts_select_own_or_admin"
on public.payouts for select
using (public.is_admin() or public.owns_affiliate(affiliate_id));

create policy "payout_items_select_own_or_admin"
on public.payout_items for select
using (
  public.is_admin() or
  exists (
    select 1
    from public.payouts
    where public.payouts.id = payout_id
      and public.owns_affiliate(public.payouts.affiliate_id)
  )
);

create policy "audit_events_admin_select"
on public.audit_events for select
using (public.is_admin());
