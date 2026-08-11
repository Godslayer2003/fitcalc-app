"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Show, SignIn, useUser, useClerk } from "@clerk/nextjs";
import {
  CheckCircle2,
  ShieldOff,
  Loader2,
  Construction,
  LogOut,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { REMOVE_ADS_PRICE_LABEL, CLERK_ENABLED } from "@/lib/billing";
import { getProgressLog, PROGRESS_METRICS, type ProgressMetric } from "@/lib/progress";
import Sparkline from "@/components/Sparkline";
import { siteConfig } from "@/lib/site";

export default function DashboardClient() {
  if (!CLERK_ENABLED) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 text-center sm:px-6">
        <Construction className="mx-auto h-8 w-8 text-zinc-400" />
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Accounts coming soon</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign-in and the ad-free option aren&apos;t switched on yet — check back shortly.
        </p>
      </div>
    );
  }
  return <DashboardAuthGate />;
}

/**
 * Isolated so <Show> only ever mounts when CLERK_ENABLED is true, i.e.
 * when a ClerkProvider is actually mounted above it in the tree.
 */
function DashboardAuthGate() {
  return (
    <>
      <Show when="signed-out">
        <div className="mx-auto max-w-md px-4 py-14 text-center sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight">Sign in to {siteConfig.name}</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
            {siteConfig.description} Sign in to save your results and watch your
            progress over time — or remove ads for a one-time payment.
          </p>
          <div className="mt-6 flex justify-center">
            <SignIn routing="hash" />
          </div>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
          <DashboardContent />
        </div>
      </Show>
    </>
  );
}

function DashboardContent() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(
    () => searchParams.get("success") === "1",
  );
  const adsRemoved = user?.publicMetadata?.adsRemoved === true;
  const progress = getProgressLog(user?.unsafeMetadata);
  const metrics = Object.keys(PROGRESS_METRICS) as ProgressMetric[];
  const hasProgress = metrics.some((m) => progress[m].length > 0);

  useEffect(() => {
    if (!refreshing || !user || adsRemoved) return;
    let cancelled = false;
    let attempts = 0;
    const poll = async () => {
      attempts += 1;
      await user.reload();
      if (cancelled || attempts >= 6) {
        setRefreshing(false);
        return;
      }
      setTimeout(poll, 1500);
    };
    poll();
    return () => {
      cancelled = true;
    };
  }, [refreshing, user, adsRemoved]);

  async function handleRemoveAds() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;
    const confirmed = window.confirm(
      "Delete your account and all saved progress? This can't be undone.",
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      await user.delete();
      router.push("/");
    } catch {
      setDeleting(false);
      window.alert("Couldn't delete your account. Please try again or email us for help.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome{user?.firstName ? `, ${user.firstName}` : ""}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-red-400 hover:text-red-500"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>

      <div className="rounded-2xl border border-black/10 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Ads</h2>
        <div className="mt-3">
          {adsRemoved ? (
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Ads removed — thank you!</span>
            </div>
          ) : refreshing ? (
            <div className="flex items-center gap-2 text-zinc-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Confirming your payment…</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <ShieldOff className="h-5 w-5 text-zinc-400" />
                <span className="font-semibold">Ads are currently shown</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                Make a one-time payment to remove ads from every calculator,
                permanently, on this account. Signing out shows ads again
                until you sign back in.
              </p>
              <button
                onClick={handleRemoveAds}
                disabled={loading}
                className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {loading ? "Redirecting…" : `Remove ads — ${REMOVE_ADS_PRICE_LABEL}`}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 p-6">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <TrendingUp className="h-3.5 w-3.5" />
          Your progress
        </h2>
        {hasProgress ? (
          <div className="mt-4 flex flex-col gap-6">
            {metrics.map((metric) =>
              progress[metric].length > 0 ? (
                <div key={metric}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{PROGRESS_METRICS[metric].label}</h3>
                    <span className="text-sm text-zinc-500">
                      Latest: {progress[metric][progress[metric].length - 1].value}
                      {PROGRESS_METRICS[metric].unit}
                    </span>
                  </div>
                  <Sparkline data={progress[metric]} />
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                    {progress[metric]
                      .slice(-6)
                      .reverse()
                      .map((entry) => (
                        <li key={entry.date}>
                          {entry.date}: {entry.value}
                          {PROGRESS_METRICS[metric].unit}
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
        ) : (
          <div className="mt-3 flex items-start gap-3 rounded-xl bg-accent-soft p-4 text-sm text-zinc-600">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p>
              No progress saved yet. Open the{" "}
              <Link href="/tools/bmi-calculator" className="font-medium text-accent underline">
                BMI
              </Link>{" "}
              or{" "}
              <Link href="/tools/body-fat-calculator" className="font-medium text-accent underline">
                Body Fat
              </Link>{" "}
              calculator and tap &quot;Save to progress&quot; to start tracking.
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleDeleteAccount}
        disabled={deleting}
        className="self-start text-xs font-medium text-zinc-400 underline decoration-dotted transition-colors hover:text-red-500 disabled:opacity-60"
      >
        {deleting ? "Deleting account…" : "Delete account and all saved data"}
      </button>
    </div>
  );
}
