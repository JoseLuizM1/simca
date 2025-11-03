/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowDevelopmentBuild: ['https://municipariosdecachoeirinha.com.br'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sniwsqukpuuehmqhoczq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig