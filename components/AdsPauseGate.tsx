"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    adsbygoogle: unknown[] & { pauseAdRequests?: 0 | 1 };
  }
}

/**
 * Stops Google Auto ads from requesting ads for users who paid to remove
 * them. Must run client-side (Clerk's paid-status check can't happen in
 * the static shell without making every page dynamic), so on a very first
 * cold load there's a brief window before this fires — acceptable since
 * it only affects the rare first visit, not repeat sessions.
 */
export default function AdsPauseGate() {
  const { user, isLoaded } = useUser();
  const adsRemoved = isLoaded && user?.publicMetadata?.adsRemoved === true;

  useEffect(() => {
    if (!adsRemoved) return;
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.pauseAdRequests = 1;
  }, [adsRemoved]);

  return null;
}
