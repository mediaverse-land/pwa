/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'https://mediaverse-land-assets.s3.eu-west-3.amazonaws.com',
            port: '',
            pathname: '*',
          },
          {
            protocol: 'https',
            hostname: 'blog.mediaverse.land',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
