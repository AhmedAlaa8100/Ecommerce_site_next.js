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
      }
    ]
  },
};

export default nextConfig;
