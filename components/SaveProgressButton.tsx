"use client";

import { useState } from "react";
import { Bookmark, Check } from "lucide-react";
import type { ProgressMetric } from "@/lib/progress";
import { useAuth } from "@/components/AuthProvider";

/**
 * Only renders once accounts are enabled and signed in, and once there's a
 * valid value to save. Hidden entirely for signed-out visitors — saving
 * progress is one of the two things that actually requires an account.
 */
export default function SaveProgressButton({
  metric,
  value,
}: {
  metric: ProgressMetric;
  value: number | null;
}) {
  const { authEnabled, user, refresh } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!authEnabled || !user || value === null || !Number.isFinite(value)) return null;

  async function handleSave() {
    if (saving || value === null) return;
    setSaving(true);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metric, value }),
    });
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent-soft disabled:opacity-60"
    >
      {saved ? (
        <>
          <Check className="h-3.5 w-3.5" /> Saved to progress
        </>
      ) : (
        <>
          <Bookmark className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save to progress"}
        </>
      )}
    </button>
  );
}
