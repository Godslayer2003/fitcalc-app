"use client";

import { useState } from "react";

export default function EmbedSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-lg border border-black/10 bg-black/[.02] p-3 dark:border-white/10 dark:bg-white/[.03]">
      <div className="flex items-center justify-between gap-2">
        <code className="flex-1 overflow-x-auto whitespace-pre text-xs">{code}</code>
        <button
          onClick={copy}
          className="shrink-0 rounded-full border border-black/15 px-3 py-1 text-xs font-semibold hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
