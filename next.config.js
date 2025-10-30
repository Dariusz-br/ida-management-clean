/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve the app under /ida-management (fixes _next chunk 404s on subpath)
  basePath: '/ida-management',
  images: {
    domains: ['localhost'],
  },
  experimental: {
    optimizeCss: true,
  },
  // Fix font preload warnings
  async headers() {
    return [
      {
        source: '/_next/static/media/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
