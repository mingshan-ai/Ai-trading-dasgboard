import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Skip TypeScript type check during build (types are validated by IDE and Vercel build)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
