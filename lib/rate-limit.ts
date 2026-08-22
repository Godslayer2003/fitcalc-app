const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;

const attempts = new Map<string, { count: number; resetAt: number }>();

/**
 * In-memory, per-process limiter — resets on redeploy/restart and doesn't
 * share state across instances. Acceptable for a single-instance solo
 * project; not a substitute for a real distributed limiter at scale.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

export function requestIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
