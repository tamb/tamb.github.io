import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // TypeScript 7 has no JS compiler API; run project-local tsc instead.
    useTypeScriptCli: true,
  },
};

export default nextConfig;
