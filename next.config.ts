import type { NextConfig } from "next";

// Server-side only (no NEXT_PUBLIC_ prefix) - never shipped to the browser.
// The backend URL lives only in this rewrite, not in any client code.
const API_ORIGIN = process.env.RENDER_API_URL || "https://fitcalc-api.onrender.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_ORIGIN}/api/:path*` }];
  },
};

export default nextConfig;
