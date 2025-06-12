import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["mongoose"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
