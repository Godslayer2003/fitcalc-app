import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">{children}</main>
      <footer className="border-t border-black/10 px-4 py-2 text-center text-[11px] text-zinc-400 dark:border-white/10">
        Powered by{" "}
        <Link href="/" target="_blank" className="font-medium hover:underline">
          {siteConfig.name}
        </Link>
      </footer>
    </div>
  );
}
