import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // We already run TypeScript check separately
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
