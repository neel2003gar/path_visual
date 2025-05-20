import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/path_visual' : '',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/path_visual' : '',
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;
