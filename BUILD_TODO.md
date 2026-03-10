# Affiliate System Build Planner

This file is for planning only. It is not part of production and can be deleted later.

## Current Product Direction

- Stack: Next.js, Tailwind CSS, TypeScript, Supabase, Stripe
- Product: affiliate signup, lead tracking, sales tracking, commission ledger, payout tracking
- Payout automation: Stripe Connect Express to bank accounts
- Initial attribution model: last-click
- Initial commission flow: sale creates commission -> hold window -> approved -> paid

## MVP Scope

- [x] Public landing page for the affiliate program
- [ ] Auth flow: sign up, sign in, sign out
- [x] Affiliate application / onboarding flow
- [x] Affiliate dashboard overview
- [x] Leads page
- [x] Sales page
- [x] Commissions page
- [x] Payouts page
- [x] Settings page
- [x] Admin dashboard
- [ ] Referral link generation and tracking
- [x] Supabase schema and row-level security
- [ ] Stripe checkout/webhook sale tracking
- [x] Stripe Connect onboarding for affiliates
- [ ] Automated payout readiness workflow

## Build Order

### Phase 1 - Project Scaffold

- [x] Create the Next.js app with TypeScript and Tailwind
- [x] Set up the App Router structure
- [x] Add base layout, fonts, theme tokens, and global styles
- [x] Create a reusable UI shell for dashboard pages
- [x] Add placeholder navigation for affiliate and admin areas

### Phase 2 - Dashboard UI First

- [x] Build the affiliate dashboard inspired by the reference layout
- [x] Add KPI cards for leads, sales, commissions, and payouts
- [x] Add chart sections for monthly and all-time performance
- [x] Add breakdown panels for lead status and revenue categories
- [x] Add responsive behavior for mobile and tablet
- [x] Seed the UI with mock data so the product shape is visible early

### Phase 3 - Supabase Foundation

- [x] Configure Supabase clients for browser and server usage
- [ ] Add auth helpers and protected route patterns
- [x] Create initial tables for profiles, affiliates, referrals, leads, sales, commissions, and payouts
- [x] Add row-level security policies
- [x] Add role handling for affiliate vs admin views

### Phase 4 - Referral Tracking

- [x] Generate affiliate referral codes and links
- [ ] Capture referral tokens in URL params and cookies
- [x] Persist attribution records in Supabase
- [ ] Convert referred visits into leads when the user signs up or submits a form

### Phase 5 - Sales and Commission Logic

- [x] Define commission rules for fixed and/or percentage payouts
- [ ] Create sales records from Stripe events
- [ ] Attach sales to the correct affiliate using attribution rules
- [x] Create commission ledger entries with statuses
- [x] Add hold-window logic before commissions become approved

### Phase 6 - Stripe Connect Payout Setup

- [ ] Create connected Stripe accounts for affiliates
- [x] Generate Stripe Connect onboarding links
- [ ] Track onboarding completion and payout readiness
- [x] Build payout status UI in affiliate settings/dashboard
- [ ] Prepare automated payout workflow for approved commissions

### Phase 7 - Admin Operations

- [x] Approve or reject affiliate applications
- [x] Review leads and sales
- [ ] Override or approve commission statuses when needed
- [x] Monitor payout readiness and payout history
- [x] Add basic audit trail / event logging

### Phase 8 - Hardening

- [ ] Add loading, empty, and error states across the app
- [ ] Validate key forms and server actions
- [ ] Add basic tests where they provide the most value
- [x] Check responsive polish and dashboard performance
- [ ] Prepare for deployment

## Data Model To Implement

- [x] `profiles`
- [x] `affiliates`
- [x] `referrals`
- [x] `leads`
- [x] `sales`
- [x] `commissions`
- [x] `payouts`
- [x] `commission_rules`
- [x] `audit_events`

## API / Credentials Checkpoints

I will stop and ask you for keys only when we actually reach the integration step.

Current checkpoint: live Supabase auth, real Stripe checkout events, and Stripe Connect onboarding activation still need your keys.

### Supabase Credentials Needed Later

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (only if server-side admin tasks require it)

### Stripe Credentials Needed Later

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

### Likely Stripe Product Decisions Needed Later

- [ ] One-time payments or subscriptions
- [ ] Fixed commissions, percentage commissions, or both
- [ ] Hold window length before payout approval
- [ ] Payout cadence: weekly, biweekly, or monthly

## Default Product Assumptions For Now

- [x] Lead = referred signup or referred form submit
- [x] Sale = successful Stripe payment
- [x] Attribution = last-click
- [x] Affiliates require approval before active status
- [x] Stripe-only payouts for v1

## Notes For Build Session

- Use this file as the working checklist during development
- Keep production code free of planning-only content
- Delete this file later if you want a cleaner repo
