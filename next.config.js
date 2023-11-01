/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://mediaverse-land-assets.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "blog.mediaverse.land",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mediaverse-land-assets.s3.eu-west-3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
