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
  async redirects() {
    // Ensure production root routes to our basePath on Vercel
    return [
      {
        source: '/favicon.ico',
        destination: '/ida-management/icon.svg',
        permanent: false,
      },
      {
        source: '/',
        destination: '/ida-management',
        permanent: false,
      },
      // If someone hits a path not starting with the basePath, push them under it
      {
        source: '/:path((?!ida-management).*)',
        destination: '/ida-management/:path',
        permanent: false,
      },
    ]
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
