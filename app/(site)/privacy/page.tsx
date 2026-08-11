import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import HideInApp from "@/components/HideInApp";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            The numbers you enter
          </h2>
          <p>
            Every calculator on {siteConfig.name} runs entirely on your
            device using JavaScript. Height, weight, age, and any other
            values you enter are never sent to our servers and are not
            stored anywhere — they exist only for as long as you&apos;re
            using the calculator.
          </p>
          <p>
            The one exception: if you&apos;re signed in and tap &quot;Save
            to progress&quot; on the BMI or Body Fat calculator, that
            calculator&apos;s result (just the number and the date — not
            your height, weight, or age) is stored on your account so you
            can see your progress over time on the dashboard. This only
            happens if you choose to save it.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Analytics and ads
          </h2>
          <p>
            We may use privacy-respecting analytics and third-party
            advertising (such as Google AdSense) to support {siteConfig.name}.
            These services may use cookies or similar technologies as
            described in their own privacy policies.
          </p>
        </section>

        <HideInApp>
          <section>
            <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Embedded widgets
            </h2>
            <p>
              If you embed one of our calculators on your own site via
              iframe, the same applies there — values entered by your
              visitors stay in their browser and aren&apos;t sent to us or
              to you.
            </p>
          </section>
        </HideInApp>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Accounts and payments (optional)
          </h2>
          <p>
            Creating an account is entirely optional and only needed if you
            want to remove ads. If you sign in, our authentication provider
            (Clerk) stores your email address and basic account details.
            If you pay to remove ads, our payment processor (Stripe) handles
            your card details directly — we never see or store your full
            card number. We only receive confirmation that a payment
            succeeded, which we use to mark your account ad-free.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Contact
          </h2>
          <p>
            Questions about this policy? Reach out via the contact details
            on our About page.
          </p>
        </section>
      </div>
    </div>
  );
}
