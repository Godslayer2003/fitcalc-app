"use client";

import { useUser } from "@clerk/nextjs";
import { CLERK_ENABLED } from "@/lib/billing";

const PLACEHOLDER_CLASSES =
  "flex h-14 w-full items-center justify-center gap-2 rounded-lg border border-black/[0.06] bg-zinc-50/80 text-[11px] font-medium uppercase tracking-wide text-zinc-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-600";

/**
 * Placeholder ad slot. Once you have an AdSense (or other network) publisher
 * ID, replace the inner div with the real <ins class="adsbygoogle" ...> tag.
 * Hides itself for signed-in users who paid to remove ads (publicMetadata.adsRemoved).
 */
export default function AdSlot({ className = "" }: { className?: string }) {
  if (!CLERK_ENABLED) {
    return (
      <div className={`${PLACEHOLDER_CLASSES} ${className}`}>Advertisement</div>
    );
  }
  return <AdSlotWithAdsRemovedCheck className={className} />;
}

/**
 * Isolated so its Clerk hook only ever runs when CLERK_ENABLED is true,
 * i.e. when a ClerkProvider is actually mounted above it in the tree.
 */
function AdSlotWithAdsRemovedCheck({ className }: { className: string }) {
  const { user, isLoaded } = useUser();
  const adsRemoved = isLoaded && user?.publicMetadata?.adsRemoved === true;

  if (adsRemoved) return null;

  return <div className={`${PLACEHOLDER_CLASSES} ${className}`}>Advertisement</div>;
}
