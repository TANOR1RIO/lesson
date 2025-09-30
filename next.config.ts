import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Убеждаемся, что Next.js использует App Router
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
