import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAdminEmail } from "@/lib/admin";
import { getProgressLog } from "@/lib/progress";
import { AUTH_ENABLED } from "@/lib/billing";

export async function GET() {
  if (!AUTH_ENABLED) {
    return NextResponse.json({ authEnabled: false, user: null });
  }

  const session = await getSessionUser();
  if (!session) return NextResponse.json({ authEnabled: true, user: null });

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return NextResponse.json({ authEnabled: true, user: null });

  const admin = isAdminEmail(user.email);

  return NextResponse.json({
    authEnabled: true,
    user: {
      id: user.id,
      email: user.email,
      customCalculatorUnlocked: admin || user.customCalculatorUnlocked,
      progress: getProgressLog(user.progressLog),
    },
  });
}
