import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['a.storyblok.com', 'a-eu.storyblok.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
