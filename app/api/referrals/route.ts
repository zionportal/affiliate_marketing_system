import { NextResponse } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ReferralPayload = {
  affiliateCode?: string;
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured yet." },
      { status: 501 },
    );
  }

  const body = (await request.json()) as ReferralPayload;

  if (!body.affiliateCode) {
    return NextResponse.json(
      { error: "affiliateCode is required." },
      { status: 400 },
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("referrals")
    .insert({
      referral_code: body.affiliateCode,
      landing_path: body.landingPath ?? "/",
      utm_source: body.utmSource ?? null,
      utm_medium: body.utmMedium ?? null,
      utm_campaign: body.utmCampaign ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
