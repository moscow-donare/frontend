import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // This is not recommended for production, but can be useful during development
  },
  eslint: {
    ignoreDuringBuilds: true, // This is not recommended for production, but can be useful during development
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salmon-naval-guppy-392.mypinata.cloud", // <== tu subdominio específico de Pinata
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      }
    ],
  },
};

export default nextConfig;
