import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAdminEmail } from "@/lib/admin";
import { CUSTOM_CALCULATOR_PRICE_CENTS, AUTH_ENABLED } from "@/lib/billing";

export async function POST(req: Request) {
  if (!AUTH_ENABLED) {
    return NextResponse.json({ error: "Accounts aren't configured yet." }, { status: 503 });
  }

  const session = getSessionUser(req);
  if (!session) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  const alreadyUnlocked = user?.customCalculatorUnlocked === true || isAdminEmail(session.email);
  if (alreadyUnlocked) {
    return NextResponse.json({ error: "Custom calculator already unlocked" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 500 });
  }

  const webOrigin = process.env.WEB_ORIGIN;
  if (!webOrigin) {
    return NextResponse.json({ error: "WEB_ORIGIN is not configured." }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: session.id,
    customer_email: session.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Custom Calculator — FitCalc (one-time)" },
          unit_amount: CUSTOM_CALCULATOR_PRICE_CENTS,
        },
        quantity: 1,
      },
    ],
    success_url: `${webOrigin}/dashboard?stripe_session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${webOrigin}/dashboard`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
