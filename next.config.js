/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.choroc.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.wooco.kr',
      },
      {
        protocol: 'https',
        hostname: 'wooco-prod-s3.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
}

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackOptions = {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'joytas',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  // silent: !process.env.CI,
  silent: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  hideSourceMaps: true,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackOptions)
