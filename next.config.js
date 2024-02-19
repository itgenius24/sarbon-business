/** @type {import('next').NextConfig} */

// const { locales, defaultLocale } = require("./i18n");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
        @import "./app/[lng]/styles/_mixins.scss";
        @import "./app/[lng]/styles/unit.scss";
        @import "./app/[lng]/styles/variables.scss";
        `,
    additionalData: `
        @import "./app/[lng]/styles/mixins.scss";
        @import "./app/[lng]/styles/unit.scss";
        @import "./app/[lng]/styles/variables.scss";
        `,
  },
};

module.exports = nextConfig;
