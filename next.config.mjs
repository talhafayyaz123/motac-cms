/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },

      {
        protocol: 'http',
        hostname: 'motac-assets.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'motac-assets.s3.ap-south-1.amazonaws.com',
      },
    ],
    domains: ['assets.motac-dev.com'],
  },
};

export default nextConfig;
