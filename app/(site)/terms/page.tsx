import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Not medical advice
          </h2>
          <p>
            {siteConfig.name}&apos;s calculators use standard, published
            formulas to produce general estimates. They are not a
            substitute for professional medical, nutrition, or fitness
            advice — talk to a qualified professional before making health
            decisions based on these results.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Using the calculators
          </h2>
          <p>
            {siteConfig.name} is provided &quot;as is&quot;, free to use,
            with no guarantee of uptime or accuracy. Formula-based estimates
            can differ from clinical measurements — don&apos;t rely on them
            for anything where that difference could cause harm.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Embedding our widgets
          </h2>
          <p>
            You&apos;re welcome to embed any calculator on your own site
            using the snippets on the{" "}
            <a href="/embed" className="underline">
              Embed
            </a>{" "}
            page, provided the &quot;Powered by {siteConfig.name}&quot;
            credit link stays visible and unmodified.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Remove Ads purchase
          </h2>
          <p>
            The one-time &quot;Remove Ads&quot; payment removes display ads
            from calculator pages for your signed-in account, permanently,
            on a one-time-payment basis. It doesn&apos;t include a warranty
            of any kind and isn&apos;t refundable except where required by
            law, since it applies immediately after payment. Payments are
            processed by Stripe; we don&apos;t store your card details.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Changes
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            the site after changes means you accept the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
