/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  output: "standalone",
  webpack: (config, { isServer }) => {
    // This will only be used for production builds
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;
