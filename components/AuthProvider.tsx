"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProgressLog } from "@/lib/progress";

const STORAGE_KEY = "fitcalc-auth-token";

interface SessionUser {
  id: string;
  email: string;
  customCalculatorUnlocked: boolean;
  progress: ProgressLog;
}

interface AuthContextValue {
  user: SessionUser | null;
  token: string | null;
  authEnabled: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function authRequest(
  path: string,
  body: unknown,
): Promise<{ ok: boolean; accessToken?: string; error?: string }> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) return { ok: false, error: data?.error ?? "Something went wrong." };
  return { ok: true, accessToken: data.accessToken };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  // Optimistic default so pages don't flash "not configured" while the
  // first /api/auth/me call is in flight - the common case is enabled.
  const [authEnabled, setAuthEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  async function refreshWithToken(t: string | null) {
    try {
      const res = await fetch("/api/auth/me", {
        headers: t ? { Authorization: `Bearer ${t}` } : {},
      });
      const data = await res.json();
      setUser(data.user ?? null);
      setAuthEnabled(data.authEnabled !== false);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setToken(stored);
    refreshWithToken(stored).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    await refreshWithToken(token);
  }

  async function login(email: string, password: string) {
    const result = await authRequest("/api/auth/login", { email, password });
    if (!result.ok || !result.accessToken) return result.error ?? "Something went wrong.";
    setToken(result.accessToken);
    window.localStorage.setItem(STORAGE_KEY, result.accessToken);
    await refreshWithToken(result.accessToken);
    return null;
  }

  async function register(email: string, password: string) {
    const result = await authRequest("/api/auth/register", { email, password });
    if (!result.ok || !result.accessToken) return result.error ?? "Something went wrong.";
    setToken(result.accessToken);
    window.localStorage.setItem(STORAGE_KEY, result.accessToken);
    await refreshWithToken(result.accessToken);
    return null;
  }

  function logout() {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, token, authEnabled, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
