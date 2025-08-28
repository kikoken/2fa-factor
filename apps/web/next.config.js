/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile workspace packages (moved out of experimental in Next.js 14.2)
  transpilePackages: ['@2fa-factor/core', '@2fa-factor/client', '@2fa-factor/ui'],
  // Enable standalone output for Docker
  output: 'standalone'
}

module.exports = nextConfig