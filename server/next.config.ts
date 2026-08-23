import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Two package-lock.json files exist (this app's and the web app's, one
  // directory up) - pin this explicitly so Next.js doesn't guess wrong.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
