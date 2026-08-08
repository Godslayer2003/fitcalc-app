import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All
          calculations happen in your browser.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:opacity-70">
            Privacy
          </Link>
          <Link href="/terms" className="hover:opacity-70">
            Terms
          </Link>
          <Link href="/about" className="hover:opacity-70">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
