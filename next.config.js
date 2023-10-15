/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  env: {
    NFT_STORAGE_TOKEN: process.env.NFT_STORAGE_TOKEN,
  }
};

module.exports = nextConfig;
