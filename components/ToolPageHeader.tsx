import { Lock } from "lucide-react";

export default function ToolPageHeader({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{name}</h1>
      <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        <Lock className="h-3 w-3" />
        Runs entirely in your browser — nothing you enter is uploaded
      </div>
    </div>
  );
}
