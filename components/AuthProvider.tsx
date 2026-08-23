"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProgressLog } from "@/lib/progress";

interface SessionUser {
  id: string;
  email: string;
  customCalculatorUnlocked: boolean;
  progress: ProgressLog;
}

interface AuthContextValue {
  user: SessionUser | null;
  authEnabled: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function postJson(url: string, body: unknown): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok) return { ok: true };
  const data = await res.json().catch(() => null);
  return { ok: false, error: data?.error ?? "Something went wrong." };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  // Optimistic default so pages don't flash "not configured" while the
  // first /api/auth/me call is in flight — the common case is enabled.
  const [authEnabled, setAuthEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user ?? null);
      setAuthEnabled(data.authEnabled !== false);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(email: string, password: string) {
    const result = await postJson("/api/auth/login", { email, password });
    if (!result.ok) return result.error ?? "Something went wrong.";
    await refresh();
    return null;
  }

  async function register(email: string, password: string) {
    const result = await postJson("/api/auth/register", { email, password });
    if (!result.ok) return result.error ?? "Something went wrong.";
    await refresh();
    return null;
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, authEnabled, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
