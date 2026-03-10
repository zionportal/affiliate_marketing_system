# Summit Ledger

Affiliate operations workspace built with `Next.js`, `Tailwind CSS`, `TypeScript`, `Supabase`, and `Stripe`.

Current build status:

- Marketing landing page
- Affiliate dashboard with overview, leads, sales, commissions, payouts, and settings
- Admin dashboard with approvals, sales review, payouts, and rules views
- Supabase helper scaffolding
- Stripe Connect helper scaffolding and webhook route
- Initial database schema in `supabase/migrations/0001_affiliate_system.sql`

The UI is currently powered by mock data so the product shape is ready before live APIs are connected.

## Local Setup

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` when you are ready to connect services.

Needed later:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Main Routes

- `/`
- `/auth/sign-in`
- `/auth/sign-up`
- `/dashboard`
- `/dashboard/leads`
- `/dashboard/sales`
- `/dashboard/commissions`
- `/dashboard/payouts`
- `/dashboard/settings`
- `/admin`
- `/admin/affiliates`
- `/admin/sales`
- `/admin/payouts`
- `/admin/rules`

## Integration Notes

- Supabase helper modules live under `lib/supabase`
- Stripe helper module lives at `lib/stripe.ts`
- Webhook endpoint scaffold lives at `app/api/stripe/webhook/route.ts`
- Stripe Connect onboarding endpoint scaffold lives at `app/api/stripe/connect/route.ts`

## Database

The initial schema covers:

- `profiles`
- `affiliates`
- `referrals`
- `leads`
- `sales`
- `commission_rules`
- `commissions`
- `payouts`
- `payout_items`
- `audit_events`

See `BUILD_TODO.md` for the working build planner.
