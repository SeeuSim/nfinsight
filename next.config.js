/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ethereum.cdn.mnemonichq.com",
      },
      {
        protocol: "https",
        hostname: "ethereum.cdn-proxy.mnemonichq.com",
      },
    ],
  },
};

module.exports = nextConfig;
