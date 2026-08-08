import Link from "next/link";
import { Scale, Apple, Dumbbell, HeartPulse, type LucideIcon } from "lucide-react";
import type { Tool } from "@/lib/tools";

const categoryIcons: Record<Tool["category"], LucideIcon> = {
  "Body Composition": Scale,
  Nutrition: Apple,
  Training: Dumbbell,
  Wellness: HeartPulse,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = categoryIcons[tool.category];
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-black/10 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md dark:border-white/10 dark:hover:border-accent/40"
    >
      <span className="flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
        <Icon className="h-3 w-3" />
        {tool.category}
      </span>
      <h3 className="text-base font-semibold group-hover:text-accent">
        {tool.name}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {tool.description}
      </p>
    </Link>
  );
}
