interface AffiliateCalloutProps {
  heading: string;
  body: string;
  ctaLabel: string;
  href: string;
}

/**
 * A clearly-disclosed affiliate placement. `href` should be a real affiliate
 * link once you've signed up for a relevant program — until then this
 * renders as an inert placeholder (href="#").
 */
export default function AffiliateCallout({ heading, body, ctaLabel, href }: AffiliateCalloutProps) {
  return (
    <div className="mt-10 rounded-xl border border-black/10 bg-black/[.02] p-5 dark:border-white/10 dark:bg-white/[.03]">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
        Sponsored
      </div>
      <h3 className="text-sm font-semibold">{heading}</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{body}</p>
      <a
        href={href}
        rel="noopener noreferrer sponsored"
        className="mt-3 inline-block rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
