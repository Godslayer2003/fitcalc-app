import Link from "next/link";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <section className="relative mx-auto max-w-2xl overflow-hidden text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-140px] h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          8 free calculators &middot; no sign-up
        </span>
        <h1 className="relative mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Free fitness calculators, no guesswork
        </h1>
        <p className="relative mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          BMI, calories, macros, and more — using standard, published
          formulas. Everything runs in your browser, nothing is uploaded.
        </p>
        <div className="relative mt-6 flex justify-center gap-3">
          <Link
            href="#calculators"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-colors hover:bg-accent-hover"
          >
            Browse calculators
          </Link>
          <Link
            href="/embed"
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent dark:border-white/15"
          >
            Embed on your site
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <AdSlot />
      </div>

      <section id="calculators" className="mt-14 scroll-mt-20">
        <h2 className="mb-5 text-xl font-semibold">All calculators</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
