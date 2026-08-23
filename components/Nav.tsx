"use client";

import Link from "next/link";
import { Activity, LayoutDashboard } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useAuth } from "@/components/AuthProvider";

export default function Nav() {
  const { authEnabled } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
          </span>
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <Link href="/#calculators" className="text-zinc-600 transition-colors hover:text-accent dark:text-zinc-300">
            Calculators
          </Link>
          <Link href="/embed" className="hidden text-zinc-600 transition-colors hover:text-accent sm:inline dark:text-zinc-300">
            Embed
          </Link>
          <Link href="/about" className="hidden text-zinc-600 transition-colors hover:text-accent sm:inline dark:text-zinc-300">
            About
          </Link>
          {authEnabled && <AuthSection />}
        </nav>
      </div>
    </header>
  );
}

function AuthSection() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Link
        href="/dashboard"
        className="rounded-full border border-black/15 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-accent hover:text-accent dark:border-white/15"
      >
        Sign in
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 text-zinc-600 transition-colors hover:text-accent dark:text-zinc-300"
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
      <button
        onClick={() => logout()}
        className="text-xs font-semibold text-zinc-500 transition-colors hover:text-red-500"
      >
        Sign out
      </button>
    </>
  );
}
