"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Bookmark, Check } from "lucide-react";
import { appendProgressEntry, getProgressLog, type ProgressMetric } from "@/lib/progress";
import { CLERK_ENABLED } from "@/lib/billing";

/**
 * Only renders once CLERK_ENABLED (accounts are live) and once there's a
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
  if (!CLERK_ENABLED || value === null || !Number.isFinite(value)) return null;
  return <SaveProgressButtonInner metric={metric} value={value} />;
}

function SaveProgressButtonInner({ metric, value }: { metric: ProgressMetric; value: number }) {
  const { user, isSignedIn } = useUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isSignedIn) return null;

  async function handleSave() {
    if (!user || saving) return;
    setSaving(true);
    const existing = getProgressLog(user.unsafeMetadata);
    const updated = appendProgressEntry(existing, metric, value);
    await user.update({ unsafeMetadata: { ...user.unsafeMetadata, progress: updated } });
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
