import { NextResponse } from "next/server";

const WEB_ORIGIN = process.env.WEB_ORIGIN || "*";

/**
 * The web app (Vercel) and this API (Render) are different origins, so
 * every request needs CORS headers. No cookies/credentials are involved -
 * auth travels as a Bearer token in a normal header - so a simple
 * allow-origin policy is enough, no credentialed-CORS complexity.
 */
export function proxy(req: Request) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": WEB_ORIGIN,
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", WEB_ORIGIN);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
