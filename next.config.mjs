/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ваш-домен-для-изображений.vercel.app'],
  },
};

export default nextConfig; // ES-синтаксис!
