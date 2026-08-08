import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import HideInApp from "@/components/HideInApp";

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
          standard, published formulas. Every calculator runs entirely
          on your device, so nothing you enter is ever uploaded anywhere.
        </p>
        <HideInApp>
          <p>
            Every calculator is also available as a free embeddable widget —
            see the{" "}
            <a href="/embed" className="underline">
              Embed
            </a>{" "}
            page if you&apos;d like to add one to your own site.
          </p>
        </HideInApp>
        <p>
          Create a free account to save your BMI and body fat results over
          time and watch your progress on a simple chart — no account is
          needed to use any calculator.
        </p>
        <p>
          {siteConfig.name} is free to use, supported by unobtrusive ads. Questions,
          bug reports, or ideas for a new calculator? Email{" "}
          <a href="mailto:ethan10038@gmail.com" className="underline">
            ethan10038@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
