import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signSessionToken } from "@/lib/auth";
import { AUTH_ENABLED } from "@/lib/billing";
import { checkRateLimit, requestIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  if (!AUTH_ENABLED) {
    return NextResponse.json({ error: "Accounts aren't configured yet." }, { status: 503 });
  }

  if (!checkRateLimit(`register:${requestIp(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash } });
  const accessToken = signSessionToken({ sub: user.id, email: user.email });

  return NextResponse.json({ accessToken, user: { id: user.id, email: user.email } });
}
