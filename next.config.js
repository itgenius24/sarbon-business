/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
        @import "./src/styles/mixins.scss";
        @import "./src/styles/unit.scss";
        @import "./src/styles/date-picker.scss";
        `,
  },
  images: {
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
  reactStrictMode: false,
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
