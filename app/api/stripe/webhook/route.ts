import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getStripeWebhookSecret, hasStripeServerEnv } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasStripeServerEnv()) {
    return NextResponse.json(
      { error: "Stripe environment variables are not configured yet." },
      { status: 501 },
    );
  }

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header." },
      { status: 400 },
    );
  }

  const body = await request.text();

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret(),
    );

    switch (event.type) {
      case "account.updated":
      case "checkout.session.completed":
      case "payment_intent.succeeded":
      case "payout.paid":
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true, type: event.type });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to validate Stripe event.",
      },
      { status: 400 },
    );
  }
}
