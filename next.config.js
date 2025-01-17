/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "**",
        pathname: "**",
        protocol: "http",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:lang/app/account",
        destination: "/:lang/app/account/ownership",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
