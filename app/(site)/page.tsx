import Link from "next/link";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import { categoryIcons, categoryStyles } from "@/lib/categories";

const categories = Object.keys(categoryIcons) as (keyof typeof categoryIcons)[];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <section className="relative mx-auto max-w-3xl overflow-hidden pb-2 pt-4 text-center">
        <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute left-1/2 top-[-160px] h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
        />
        <span className="animate-fade-up relative inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
          8 free calculators &middot; no sign-up
        </span>
        <h1 className="animate-fade-up relative mt-5 text-4xl font-bold tracking-tight [animation-delay:80ms] sm:text-5xl md:text-6xl">
          Free fitness calculators,
          <br />
          <span className="text-accent">no guesswork</span>
        </h1>
        <p className="animate-fade-up relative mx-auto mt-5 max-w-xl text-lg text-zinc-500 [animation-delay:160ms] dark:text-zinc-400">
          BMI, calories, macros, and more — using standard, published
          formulas. Everything runs in your browser, nothing is uploaded.
        </p>
        <div className="animate-fade-up relative mt-7 flex justify-center gap-3 [animation-delay:240ms]">
          <Link
            href="#calculators"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md active:translate-y-0"
          >
            Browse calculators
          </Link>
          <Link
            href="/embed"
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 dark:border-white/15"
          >
            Embed on your site
          </Link>
        </div>
        <div className="animate-fade-up relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 [animation-delay:300ms]">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const style = categoryStyles[category];
            return (
              <span
                key={category}
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500"
              >
                <Icon className={`h-3.5 w-3.5 ${style.text}`} />
                {category}
              </span>
            );
          })}
        </div>
      </section>

      <div className="animate-fade-up mt-12 [animation-delay:340ms]">
        <AdSlot />
      </div>

      <section id="calculators" className="mt-14 scroll-mt-20">
        <h2 className="mb-5 text-xl font-semibold">All calculators</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <div
              key={tool.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${320 + i * 60}ms` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
