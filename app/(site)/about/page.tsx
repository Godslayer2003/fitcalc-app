import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold">About {siteConfig.name}</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        <p>
          {siteConfig.name} is a small set of health and fitness
          calculators — BMI, calorie needs, macros, body fat, one-rep max,
          heart rate zones, water intake, and running pace — all using
          standard, published formulas. Every calculator runs client-side
          in your browser, so nothing you enter is ever uploaded anywhere.
        </p>
        <p>
          Every calculator is also available as a free embeddable widget —
          see the{" "}
          <a href="/embed" className="underline">
            Embed
          </a>{" "}
          page if you&apos;d like to add one to your own site.
        </p>
        <p>
          The site is free to use, supported by unobtrusive ads. Questions,
          bug reports, or ideas for a new calculator? Email{" "}
          <a href="mailto:hello@example.com" className="underline">
            hello@example.com
          </a>{" "}
          (update this to your real address before launch).
        </p>
      </div>
    </div>
  );
}
