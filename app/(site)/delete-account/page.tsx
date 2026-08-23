import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import DeleteAccountClient from "./DeleteAccountClient";

export const metadata: Metadata = {
  title: "Delete Account",
  description: `Delete your ${siteConfig.name} account and data.`,
};

export default function DeleteAccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold">Delete your account</h1>
      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        Deleting your {siteConfig.name} account permanently removes your
        email address, hashed password, custom-calculator unlock status, and
        any saved BMI/body fat progress from our database immediately —
        this can&apos;t be undone. Payment records for any past purchase are
        kept by our payment processor, Stripe, under their own retention
        policy and aren&apos;t affected by this.
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          How to delete your account
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          <li>Sign in to your account below.</li>
          <li>Click &quot;Permanently delete my account.&quot;</li>
          <li>Your account and all associated data are deleted immediately.</li>
        </ol>
      </div>

      <DeleteAccountClient />
    </div>
  );
}
