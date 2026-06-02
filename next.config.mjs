/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "surgicalworld.org",
      },
    ],
  },
};

export default nextConfig;