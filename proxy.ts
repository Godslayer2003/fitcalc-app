import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Falls back to a no-op pass-through until NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
// is configured, so the site doesn't 500 on every route before then.
export default process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? clerkMiddleware()
  : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
