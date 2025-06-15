import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["mongoose"],
  // typescript: {
  //   ignoreBuildErrors: true, // ✅ Skip type checking
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
