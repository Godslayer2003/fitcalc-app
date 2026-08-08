import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { REMOVE_ADS_PRICE_CENTS, CLERK_ENABLED } from "@/lib/billing";
import { siteConfig } from "@/lib/site";

export async function POST() {
  if (!CLERK_ENABLED) {
    return NextResponse.json(
      { error: "Accounts aren't configured yet." },
      { status: 503 },
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const user = await currentUser();
  if (user?.publicMetadata?.adsRemoved === true) {
    return NextResponse.json({ error: "Ads already removed" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payments aren't configured yet." },
      { status: 500 },
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Remove Ads — FitCalc (one-time)" },
          unit_amount: REMOVE_ADS_PRICE_CENTS,
        },
        quantity: 1,
      },
    ],
    client_reference_id: userId,
    metadata: { clerkUserId: userId },
    success_url: `${siteConfig.url}/dashboard?success=1`,
    cancel_url: `${siteConfig.url}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
