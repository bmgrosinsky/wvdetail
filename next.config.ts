import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inlines the small Tailwind stylesheet into <head> instead of a
    // render-blocking <link>, trading per-navigation CSS caching (the
    // bundle is ~8 KiB) for a faster first paint on new visitors.
    inlineCss: true,
  },
};

export default nextConfig;
