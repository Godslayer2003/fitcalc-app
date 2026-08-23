"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import AuthForm from "@/components/AuthForm";

export default function DeleteAccountClient() {
  const { authEnabled, user, token, loading, logout } = useAuth();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!authEnabled) {
    return (
      <p className="mt-8 text-sm text-zinc-500">
        Accounts aren&apos;t switched on yet, so there&apos;s nothing to delete.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="mt-8 flex justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-8">
        <p className="text-sm text-zinc-500">Sign in to delete your account.</p>
        <AuthForm />
      </div>
    );
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setDeleting(false);
        return;
      }
      logout();
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Signed in as <span className="font-semibold">{user.email}</span>
      </p>
      {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="mt-4 flex items-center gap-1.5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          <ShieldAlert className="h-4 w-4" />
          Delete my account
        </button>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">Are you sure?</p>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Yes, permanently delete my account"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={deleting}
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent disabled:opacity-60 dark:border-white/15"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
