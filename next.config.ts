import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep production optimization, but avoid expensive transforms during local development.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
