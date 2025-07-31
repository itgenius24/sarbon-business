/** @type {import('next').NextConfig} */

const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Disable source maps in production to prevent folder structure exposure
  buildExcludes: [/\.map$/],
  fallbacks: {
    document: "/offline.html",
    image: "/android-chrome-192x192.png",
    audio: "/sounds/predlojeniya.mp3",
    video: "/android-chrome-192x192.png",
    font: "/android-chrome-192x192.png",
  },
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.admin\.furgo\.uz\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /^https:\/\/cdn-api\.sarbon\.me\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-images",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|eot)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "external-images",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable source maps in production to prevent folder structure exposure
  productionBrowserSourceMaps: false,
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
       {
        protocol: "https",
        hostname: "cdn-api.sarbon.me",
        port: "",
        pathname: "*/media/*",
      },
    ],
  },
  reactStrictMode: false,
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  withPWA(nextConfig),
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

    // Hide source maps from public access while still uploading to Sentry
    hideSourceMaps: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
