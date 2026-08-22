"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fn = mode === "login" ? login : register;
    const err = await fn(email, password);
    setSubmitting(false);
    if (err) setError(err);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-sm flex-col gap-3 text-left">
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
      />
      <input
        type="password"
        required
        minLength={8}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (min. 8 characters)"
        className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
      />
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError(null);
        }}
        className="text-xs font-medium text-zinc-500 hover:underline"
      >
        {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
