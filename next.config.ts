import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    serverActions: {}, // Empty object instead of boolean
  },
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    });
    config.externals = [...config.externals, "@prisma/client"];
    return config;
  },
};

export default nextConfig;
