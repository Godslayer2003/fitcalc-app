import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AUTH_ENABLED } from "@/lib/billing";

export async function DELETE(req: Request) {
  if (!AUTH_ENABLED) {
    return NextResponse.json({ error: "Accounts aren't configured yet." }, { status: 503 });
  }

  const session = getSessionUser(req);
  if (!session) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  await prisma.user.delete({ where: { id: session.id } }).catch(() => null);

  return NextResponse.json({ deleted: true });
}
