import Link from "next/link";
import { Zap, Lock, CheckCircle2, TrendingUp, Scale } from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import Reveal from "@/components/Reveal";

const trustPoints = [
  { Icon: Zap, label: "Instant results" },
  { Icon: Lock, label: "Nothing leaves your browser" },
  { Icon: CheckCircle2, label: "No sign-up to calculate" },
];

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-14 sm:px-6">
        <section className="relative grid items-center gap-10 overflow-hidden pb-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="animate-blob pointer-events-none absolute left-[10%] top-[-160px] h-[320px] w-[520px] rounded-full bg-accent/20 blur-3xl lg:left-0"
          />

          <div className="relative text-center lg:text-left">
            <span className="animate-fade-up relative inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
              8 free calculators &middot; track your progress
            </span>
            <h1 className="animate-fade-up relative mt-5 text-4xl font-bold tracking-tight [animation-delay:80ms] sm:text-5xl md:text-6xl">
              Free fitness calculators,
              <br />
              <span className="text-accent">no guesswork</span>
            </h1>
            <p className="animate-fade-up relative mx-auto mt-5 max-w-xl text-lg text-zinc-500 [animation-delay:160ms] lg:mx-0">
              BMI, calories, macros, and more — using standard, published
              formulas. Create a free account to save your results and watch
              your progress over time.
            </p>
            <div className="animate-fade-up relative mt-7 flex flex-wrap justify-center gap-3 [animation-delay:240ms] lg:justify-start">
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
            <div className="animate-fade-up relative mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 [animation-delay:300ms] lg:justify-start">
              {trustPoints.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-500"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[17rem] lg:block">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 to-transparent blur-2xl"
            />
            <div className="relative rotate-2 rounded-2xl border border-black/10 bg-white p-5 shadow-xl shadow-zinc-200/60">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Your BMI
                </span>
                <Scale className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <div className="mt-2 text-5xl font-bold tracking-tight text-accent">22.9</div>
              <span className="mt-2 inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                Normal weight
              </span>
            </div>
            <div className="absolute -bottom-6 -left-8 -z-10 w-40 -rotate-3 rounded-2xl border border-black/10 bg-white p-4 shadow-lg shadow-zinc-200/60">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                <TrendingUp className="h-3 w-3 text-accent" />
                Progress
              </div>
              <svg width="100%" height="28" viewBox="0 0 130 28" className="mt-1.5 text-accent">
                <polyline
                  points="0,24 20,19 40,22 60,13 80,16 100,7 130,9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>

      <section id="calculators" className="mt-14 scroll-mt-20 border-t border-black/5 bg-zinc-50/60 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
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
        </div>
      </section>
    </>
  );
}
