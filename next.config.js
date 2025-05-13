/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
   reactStrictMode: true,
  env: {
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_BASIC_URL: process.env.NEXT_PUBLIC_BASIC_URL,
    NEXT_PUBLIC_BASIC_INVOKE_URL: process.env.NEXT_PUBLIC_BASIC_INVOKE_URL,
    NEXT_PUBLIC_BASIC_INVOKE_STAGING_PREFIX_URL: process.env.NEXT_PUBLIC_BASIC_INVOKE_STAGING_PREFIX_URL,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
    NEXT_PUBLIC_YANDEX_MAP_KEY: process.env.NEXT_PUBLIC_YANDEX_MAP_KEY,
    NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY: process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY,
    NEXT_PUBLIC_CUSTOMER_TYPE_ID: process.env.NEXT_PUBLIC_CUSTOMER_TYPE_ID,
    NEXT_PUBLIC_EXPEDITOR_TYPE_ID: process.env.NEXT_PUBLIC_EXPEDITOR_TYPE_ID,
    NEXT_PUBLIC_DISPACR_TYPE_ID: process.env.NEXT_PUBLIC_DISPACR_TYPE_ID,
    NEXT_PUBLIC_ANALITIK_TYPE_ID: process.env.NEXT_PUBLIC_ANALITIK_TYPE_ID,
    NEXT_PUBLIC_DILLER_TYPE_ID: process.env.NEXT_PUBLIC_DILLER_TYPE_ID,
  },

  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
        @import "./src/styles/mixins.scss";
        @import "./src/styles/unit.scss";
        @import "./src/styles/date-picker.scss";
        `,
  },
  images: {
     unoptimized: true ,
    domains: ["cdn.u-code.io", "media.newyorker.com","flagcdn.com", "cdn-api.furgo.uz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.u-code.io",
        port: "",
        pathname: "*/media/*",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "*/media/*",
      },
      {
        protocol: "https",
        hostname: "cdn-api.furgo.uz",
        port: "",
        pathname: "*/media/*",
      },
    ],
  },
 
};

module.exports = nextConfig;


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "sarbon",
    project: "frontend",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
