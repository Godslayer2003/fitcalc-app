import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
  if (!sessionId) return NextResponse.json({ error: "Missing session id" }, { status: 400 });

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  if (checkoutSession.client_reference_id !== session.id) {
    return NextResponse.json({ error: "This checkout session does not belong to you." }, { status: 403 });
  }

  if (checkoutSession.payment_status === "paid") {
    await prisma.user.update({
      where: { id: session.id },
      data: {
        customCalculatorUnlocked: true,
        stripePaymentIntentId:
          typeof checkoutSession.payment_intent === "string" ? checkoutSession.payment_intent : null,
      },
    });
    return NextResponse.json({ unlocked: true });
  }

  return NextResponse.json({ unlocked: false });
}
