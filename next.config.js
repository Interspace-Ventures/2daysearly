const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.replit.dev', '*.riker.replit.dev', '*.repl.co'],
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    domains: ['localhost'],
    unoptimized: true, // For Replit compatibility
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  async headers() {
    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
    ];

    // Only block iframe embedding in production. In dev, the Replit
    // preview/canvas embeds the app in an iframe, and X-Frame-Options: DENY
    // would prevent it from loading.
    if (isProd) {
      securityHeaders.unshift({
        key: 'X-Frame-Options',
        value: 'DENY',
      });
    }

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;