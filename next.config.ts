import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Disable experimental features that might cause issues
  experimental: {
    // Disable static optimization
  },
  // Disable static generation for all pages
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
};

export default nextConfig;
