import { Lock } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { categoryIcons, categoryStyles } from "@/lib/categories";

export default function ToolPageHeader({
  name,
  description,
  category,
}: {
  name: string;
  description: string;
  category: Tool["category"];
}) {
  const Icon = categoryIcons[category];
  const style = categoryStyles[category];
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.iconBg} text-white shadow-sm`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.25} />
        </div>
        <div>
          <span className={`text-xs font-semibold uppercase tracking-wide ${style.text}`}>
            {category}
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{name}</h1>
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-zinc-500 dark:text-zinc-400">{description}</p>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        <Lock className="h-3 w-3" />
        Runs entirely in your browser — nothing you enter is uploaded
      </div>
    </div>
  );
}
