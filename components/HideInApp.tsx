"use client";

import { useState, type ReactNode } from "react";

/**
 * Hides content that's only relevant to someone browsing the site in a
 * regular browser tab — e.g. "embed this on your own website" doesn't mean
 * anything to someone using the installed app. Detected via display-mode:
 * standalone, which is true both for the Play Store TWA and for the site
 * installed as a PWA, but false for a normal mobile browser tab.
 */
export default function HideInApp({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [isStandalone] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches,
  );

  if (isStandalone) return <>{fallback}</>;
  return <>{children}</>;
}
