/**
 * Placeholder ad slot. Once you have an AdSense (or other network) publisher
 * ID, replace the inner div with the real <ins class="adsbygoogle" ...> tag
 * and load the AdSense script in app/layout.tsx.
 */
export default function AdSlot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-24 w-full items-center justify-center rounded-lg border border-dashed border-black/15 bg-black/[.02] text-xs text-zinc-400 dark:border-white/15 dark:bg-white/[.03] ${className}`}
    >
      Ad space — connect AdSense in components/AdSlot.tsx
    </div>
  );
}
