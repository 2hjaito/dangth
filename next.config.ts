import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 70, 75],
  },
  outputFileTracingExcludes: {
    '/*': ['./public/**/*'],
  },
};

export default nextConfig;
