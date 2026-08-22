import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { appendProgressEntry, getProgressLog, type ProgressMetric } from "@/lib/progress";
import { AUTH_ENABLED } from "@/lib/billing";

export async function POST(req: Request) {
  if (!AUTH_ENABLED) {
    return NextResponse.json({ error: "Accounts aren't configured yet." }, { status: 503 });
  }

  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const metric = body?.metric as ProgressMetric;
  const value = Number(body?.value);
  if ((metric !== "bmi" && metric !== "bodyFat") || !Number.isFinite(value)) {
    return NextResponse.json({ error: "Invalid progress entry" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const existing = getProgressLog(user.progressLog);
  const updated = appendProgressEntry(existing, metric, value);
  await prisma.user.update({
    where: { id: user.id },
    data: { progressLog: updated as unknown as Prisma.InputJsonValue },
  });

  return NextResponse.json({ progress: updated });
}
