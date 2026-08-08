import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-black/10 p-5 transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
    >
      <span className="w-fit rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-white/10 dark:text-zinc-400">
        {tool.category}
      </span>
      <h3 className="text-base font-semibold group-hover:underline">
        {tool.name}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {tool.description}
      </p>
    </Link>
  );
}
