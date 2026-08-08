import Link from "next/link";
import { Activity } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
          </span>
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/#calculators" className="text-zinc-600 transition-colors hover:text-accent dark:text-zinc-300">
            Calculators
          </Link>
          <Link href="/embed" className="text-zinc-600 transition-colors hover:text-accent dark:text-zinc-300">
            Embed
          </Link>
          <Link href="/about" className="text-zinc-600 transition-colors hover:text-accent dark:text-zinc-300">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
