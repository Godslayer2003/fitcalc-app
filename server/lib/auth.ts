import jwt from "jsonwebtoken";

const TOKEN_EXPIRY = "180d";

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

/**
 * Frontend and backend live on different domains (Vercel + Render), so the
 * session travels as a Bearer token in the Authorization header rather than
 * a cookie - cross-site cookies are unreliable (blocked by default in
 * Safari/private browsing), while a header works the same everywhere.
 */
export function getSessionUser(req: Request): { id: string; email: string } | null {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, getSecret()) as SessionPayload;
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
