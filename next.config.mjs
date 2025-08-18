/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure route handlers can read raw body (req.text()) for webhooks
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
