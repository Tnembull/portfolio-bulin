import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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

export default withBundleAnalyzer(nextConfig);
