import Link from "next/link";
import { Activity } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-zinc-50/60 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent text-white">
                <Activity className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-[22ch] text-sm text-zinc-500 dark:text-zinc-400">
              Free fitness calculators that run entirely in your browser.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              Calculators
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {tools.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#calculators"
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  View all
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              Site
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400">
                  Track your progress
                </Link>
              </li>
              <li>
                <Link href="/embed" className="text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400">
                  Embed a calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              Legal
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/privacy" className="text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 text-xs text-zinc-400 sm:flex-row dark:border-white/10">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All calculations happen in your browser.</p>
          <p>Not medical advice. For informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
