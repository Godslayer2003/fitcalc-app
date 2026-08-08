import Link from "next/link";
import { Dumbbell, Flame, Trophy, TrendingUp } from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";
import { categoryIcons, categoryStyles } from "@/lib/categories";

const categories = Object.keys(categoryIcons) as (keyof typeof categoryIcons)[];

const floatingIcons = [
  { Icon: Dumbbell, className: "left-0 top-[8%] -rotate-12 bg-violet-500", delay: "0s" },
  { Icon: Flame, className: "right-0 top-[2%] rotate-6 bg-orange-500", delay: "1.2s" },
  { Icon: Trophy, className: "right-2 bottom-0 -rotate-6 bg-blue-500", delay: "2.1s" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="relative">
        {floatingIcons.map(({ Icon, className, delay }, i) => (
          <div
            key={i}
            aria-hidden
            className={`animate-pulse-soft pointer-events-none absolute hidden h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg xl:flex ${className}`}
            style={{ animationDuration: "4s", animationDelay: delay }}
          >
            <Icon className="h-5 w-5" strokeWidth={2.25} />
          </div>
        ))}

        <section className="relative mx-auto max-w-3xl overflow-hidden pb-2 pt-4 text-center">
          <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="animate-blob pointer-events-none absolute left-1/2 top-[-160px] h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
          />

          <span className="animate-fade-up relative inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
            8 free calculators &middot; track your progress
          </span>
          <h1 className="animate-fade-up relative mt-5 text-4xl font-bold tracking-tight [animation-delay:80ms] sm:text-5xl md:text-6xl">
            Free fitness calculators,
            <br />
            <span className="text-accent">no guesswork</span>
          </h1>
          <p className="animate-fade-up relative mx-auto mt-5 max-w-xl text-lg text-zinc-500 [animation-delay:160ms]">
            BMI, calories, macros, and more — using standard, published
            formulas. Create a free account to save your results and watch
            your progress over time.
          </p>
          <div className="animate-fade-up relative mt-7 flex flex-wrap justify-center gap-3 [animation-delay:240ms]">
            <Link
              href="#calculators"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md active:translate-y-0"
            >
              Browse calculators
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0"
            >
              <TrendingUp className="h-4 w-4" />
              Track your progress
            </Link>
          </div>
          <div className="animate-fade-up relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 [animation-delay:300ms]">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const style = categoryStyles[category];
              return (
                <span
                  key={category}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-400"
                >
                  <Icon className={`h-3.5 w-3.5 ${style.text}`} />
                  {category}
                </span>
              );
            })}
          </div>
        </section>
      </div>

      <div className="animate-fade-up mt-12 [animation-delay:340ms]">
        <AdSlot />
      </div>

      <section id="calculators" className="mt-14 scroll-mt-20">
        <Reveal>
          <h2 className="mb-5 text-xl font-semibold">All calculators</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <Reveal key={tool.slug} delay={(i % 3) * 80}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
