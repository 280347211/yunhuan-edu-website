import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during build (legacy hooks from Vite migration)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Proxy /api requests to Express backend
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:3000/api/:path*" },
      { source: "/Uploads/:path*", destination: "http://localhost:3000/Uploads/:path*" },
      { source: "/uploads/:path*", destination: "http://localhost:3000/uploads/:path*" },
    ];
  },

  // Output mode: SSR (default) - not static export
  // This enables server-side rendering for SEO

  // Images config for external image sources (from database)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    unoptimized: true, // Avoid sharp dependency on 2G RAM server
  },
};

export default nextConfig;
