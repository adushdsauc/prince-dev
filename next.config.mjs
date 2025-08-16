/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure route handlers can read raw body (req.text()) for webhooks
  }
};

export default nextConfig;