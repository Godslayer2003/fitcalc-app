import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { categoryIcons, categoryStyles } from "@/lib/categories";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = categoryIcons[tool.category];
  const style = categoryStyles[tool.category];
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group flex flex-col gap-3 rounded-2xl border border-black/10 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 ${style.ring}`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBg} text-white shadow-sm transition-transform group-hover:scale-105`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </div>
      <div>
        <span className={`text-xs font-semibold uppercase tracking-wide ${style.text}`}>
          {tool.category}
        </span>
        <h3 className="mt-0.5 text-base font-semibold group-hover:text-accent">
          {tool.name}
        </h3>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{tool.description}</p>
    </Link>
  );
}
