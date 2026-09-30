import path from "node:path";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Lets a measurement build run into its own directory while `next dev`
  // keeps using .next. Unset in normal use.
  distDir: process.env.BUILD_DIR || ".next",
  trailingSlash: true,
  // Pin the workspace root so a stray lockfile above the project is ignored.
  turbopack: { root: path.resolve(".") },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback. Next negotiates per Accept header.
    formats: ["image/avif", "image/webp"],
    // Next 16 rejects any quality not declared here. The brief specifies 80.
    qualities: [80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
