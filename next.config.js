/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WEBNAME: 'NextWithFirebase',
    JWT_REFRESH_SECRET: "NextWithFirebase",
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
