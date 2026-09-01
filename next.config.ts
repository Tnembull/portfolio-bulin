import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-0d2a79c48bbc4fb1b08e20c33d9e6b95.r2.dev",
      },
      {
        protocol: "https",
        hostname: "media.bulindev.tech",
      },
      {
        protocol: "https",
        hostname: "unavatar.io",
      },
    ],
  },
};

let finalConfig = nextConfig;

if (process.env.ANALYZE === "true") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: true,
    });
    finalConfig = withBundleAnalyzer(nextConfig);
  } catch (e) {
    console.warn("Bundle analyzer not installed or failed to load:", e);
  }
}

export default finalConfig;
