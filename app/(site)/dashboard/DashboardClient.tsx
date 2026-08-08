"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, SignIn, useUser } from "@clerk/nextjs";
import { CheckCircle2, ShieldOff, Loader2, Construction } from "lucide-react";
import { REMOVE_ADS_PRICE_LABEL, CLERK_ENABLED } from "@/lib/billing";

export default function DashboardClient() {
  if (!CLERK_ENABLED) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 text-center sm:px-6">
        <Construction className="mx-auto h-8 w-8 text-zinc-400" />
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Accounts coming soon</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Sign-in and the ad-free option aren&apos;t switched on yet — check back shortly.
        </p>
      </div>
    );
  }
  return <DashboardAuthGate />;
}

/**
 * Isolated so its Clerk hooks only ever run when CLERK_ENABLED is true,
 * i.e. when a ClerkProvider is actually mounted above it in the tree.
 */
function DashboardAuthGate() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="mx-auto max-w-md px-4 py-14 sm:px-6" />;
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 text-center sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Sign in to your account</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account, and go ad-free with a one-time payment.
        </p>
        <div className="mt-6 flex justify-center">
          <SignIn routing="hash" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(
    () => searchParams.get("success") === "1",
  );
  const adsRemoved = user?.publicMetadata?.adsRemoved === true;

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

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        Welcome{user?.firstName ? `, ${user.firstName}` : ""}
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {user?.primaryEmailAddress?.emailAddress}
      </p>

      <div className="mt-8 rounded-xl border border-black/10 p-5 dark:border-white/10">
        {adsRemoved ? (
          <div className="flex items-center gap-2 text-accent">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Ads removed — thank you!</span>
          </div>
        ) : refreshing ? (
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-medium">Confirming your payment…</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <ShieldOff className="h-5 w-5 text-zinc-400" />
              <span className="font-semibold">Ads are currently shown</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Make a one-time payment to remove ads from every calculator,
              permanently, on this account.
            </p>
            <button
              onClick={handleRemoveAds}
              disabled={loading}
              className="mt-4 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {loading ? "Redirecting…" : `Remove ads — ${REMOVE_ADS_PRICE_LABEL}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
