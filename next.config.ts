import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'ecommerce.routemisr.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-products/**'
      },
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-brands/**'
      },
    ]
  },
  eslint: {
    // ⚠️ Warning: This allows production builds to successfully complete
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;