import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Nav() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/#calculators" className="hover:opacity-70">
            Calculators
          </Link>
          <Link href="/embed" className="hover:opacity-70">
            Embed
          </Link>
          <Link href="/about" className="hover:opacity-70">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
