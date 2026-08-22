import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "fitcalc_session";
const TOKEN_EXPIRY = "180d";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export interface SessionPayload {
  sub: string;
  email: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function signSessionToken(payload: SessionPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: TOKEN_EXPIRY });
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSessionUser(): Promise<{ id: string; email: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, getSecret()) as SessionPayload;
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
