import Link from "next/link";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free fitness calculators, no guesswork
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          BMI, calories, macros, and more — using standard, published
          formulas. Everything runs in your browser, nothing is uploaded.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="#calculators"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Browse calculators
          </Link>
          <Link
            href="/embed"
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
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
