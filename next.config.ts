import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/path_visual' : '',
  images: {
    unoptimized: true
  },
  // Allow static page generation
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/path_visual' : ''
};

export default nextConfig;
