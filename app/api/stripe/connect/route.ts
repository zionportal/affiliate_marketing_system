import { NextResponse } from "next/server";

import { hasStripeServerEnv } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";

type ConnectRequestBody = {
  accountId?: string;
  refreshUrl?: string;
  returnUrl?: string;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasStripeServerEnv()) {
    return NextResponse.json(
      { error: "Stripe environment variables are not configured yet." },
      { status: 501 },
    );
  }

  const body = (await request.json()) as ConnectRequestBody;

  if (!body.accountId || !body.refreshUrl || !body.returnUrl) {
    return NextResponse.json(
      { error: "accountId, refreshUrl, and returnUrl are required." },
      { status: 400 },
    );
  }

  const stripe = getStripeClient();
  const accountLink = await stripe.accountLinks.create({
    account: body.accountId,
    refresh_url: body.refreshUrl,
    return_url: body.returnUrl,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}
