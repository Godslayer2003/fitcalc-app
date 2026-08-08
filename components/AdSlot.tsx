"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { CLERK_ENABLED } from "@/lib/billing";

const PLACEHOLDER_CLASSES =
  "flex min-h-24 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-accent/25 bg-gradient-to-br from-accent-soft to-transparent text-xs text-zinc-400 dark:border-accent/20 dark:text-zinc-500";

/**
 * Placeholder ad slot. Once you have an AdSense (or other network) publisher
 * ID, replace the inner div with the real <ins class="adsbygoogle" ...> tag.
 * Hides itself for signed-in users who paid to remove ads (publicMetadata.adsRemoved).
 */
export default function AdSlot({ className = "" }: { className?: string }) {
  if (!CLERK_ENABLED) {
    return (
      <div className={`${PLACEHOLDER_CLASSES} ${className}`}>
        <Sparkles className="h-3.5 w-3.5 text-accent/60" />
        Ad space
      </div>
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

  return (
    <div className={`${PLACEHOLDER_CLASSES} ${className}`}>
      <Sparkles className="h-3.5 w-3.5 text-accent/60" />
      Ad space
    </div>
  );
}
