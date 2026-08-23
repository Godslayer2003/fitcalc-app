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

  if (!checkRateLimit(`login:${requestIp(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const genericError = NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return genericError;

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return genericError;

  const accessToken = signSessionToken({ sub: user.id, email: user.email });

  return NextResponse.json({ accessToken, user: { id: user.id, email: user.email } });
}
