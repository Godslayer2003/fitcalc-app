"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Calculator,
  Loader2,
  Construction,
  LogOut,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { CUSTOM_CALCULATOR_PRICE_LABEL } from "@/lib/billing";
import { PROGRESS_METRICS, type ProgressMetric } from "@/lib/progress";
import Sparkline from "@/components/Sparkline";
import CustomCalculator from "@/components/calculators/CustomCalculator";
import AuthForm from "@/components/AuthForm";
import HideInApp from "@/components/HideInApp";
import { useAuth } from "@/components/AuthProvider";
import { siteConfig } from "@/lib/site";

export default function DashboardClient() {
  const { authEnabled } = useAuth();
  if (!authEnabled) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 text-center sm:px-6">
        <Construction className="mx-auto h-8 w-8 text-zinc-400" />
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Accounts coming soon</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign-in and the custom calculator aren&apos;t switched on yet — check back shortly.
        </p>
      </div>
    );
  }
  return <DashboardAuthGate />;
}

function DashboardAuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 text-center sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Sign in to {siteConfig.name}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
          {siteConfig.description} Sign in to save your results and watch your
          progress over time — or unlock the custom calculator for a one-time payment.
        </p>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { user, token, logout, refresh } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const stripeSessionId = searchParams.get("stripe_session_id");

  useEffect(() => {
    if (!stripeSessionId) return;
    setVerifying(true);
    fetch("/api/checkout/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ sessionId: stripeSessionId }),
    })
      .then(() => refresh())
      .finally(() => {
        setVerifying(false);
        router.replace("/dashboard");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeSessionId]);

  if (!user) return null;

  const metrics = Object.keys(PROGRESS_METRICS) as ProgressMetric[];
  const hasProgress = metrics.some((m) => user.progress[m].length > 0);

  async function handleUnlock() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
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
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-1 text-sm text-zinc-500">{user.email}</p>
        </div>
        <button
          onClick={() => logout()}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-red-400 hover:text-red-500"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>

      <div className="rounded-2xl border border-black/10 p-6">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <Calculator className="h-3.5 w-3.5" />
          Custom calculator
        </h2>
        <div className="mt-3">
          {user.customCalculatorUnlocked ? (
            <>
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Unlocked — build your own calculator below</span>
              </div>
              <div className="mt-4">
                <CustomCalculator />
              </div>
            </>
          ) : verifying ? (
            <div className="flex items-center gap-2 text-zinc-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Confirming your payment…</span>
            </div>
          ) : (
            <HideInApp
              fallback={
                <p className="text-sm text-zinc-500">
                  To unlock the custom calculator, open{" "}
                  <span className="font-medium">{siteConfig.url.replace(/^https?:\/\//, "")}</span>{" "}
                  in your phone&apos;s browser instead of this app.
                </p>
              }
            >
              <p className="text-sm text-zinc-500">
                Define your own variables and formula and get a custom
                calculator that works exactly the way you want, permanently,
                on this account.
              </p>
              <button
                onClick={handleUnlock}
                disabled={loading}
                className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {loading ? "Redirecting…" : `Unlock custom calculator — ${CUSTOM_CALCULATOR_PRICE_LABEL}`}
              </button>
            </HideInApp>
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
              user.progress[metric].length > 0 ? (
                <div key={metric}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{PROGRESS_METRICS[metric].label}</h3>
                    <span className="text-sm text-zinc-500">
                      Latest: {user.progress[metric][user.progress[metric].length - 1].value}
                      {PROGRESS_METRICS[metric].unit}
                    </span>
                  </div>
                  <Sparkline data={user.progress[metric]} />
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                    {user.progress[metric]
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
    </div>
  );
}
