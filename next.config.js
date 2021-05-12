const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "images.ctfassets.net",
      "assets.ctfassets.net",
      "videos.ctfassets.net",
    ],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_API_TOKEN: process.env.CONTENTFUL_API_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET,
    ENVIRONMENT: process.env.ENVIRONMENT,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    GA_GTM_PREVIEW_ENV: process.env.GA_GTM_PREVIEW_ENV,
    GA_GTM_AUTH: process.env.GA_GTM_AUTH,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SEGMENT_ANALYTICS_KEY: process.env.SEGMENT_ANALYTICS_KEY,
    SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE,
    VERCEL_GITHUB_COMMIT_SHA: process.env.VERCEL_GITHUB_COMMIT_SHA,
    FULLSTORY_ORG_ID: process.env.FULLSTORY_ORG_ID,
    API_SECRET: process.env.API_SECRET,
    EMBED_SOCIAL_API_KEY: process.env.EMBED_SOCIAL_API_KEY,
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/react";
    }

    // Only add sentry webpack plugin when sentry DSN is defined and the
    // app is being deployed (NODE_ENV=production when making an optimized build
    // for a deployed environment).
    if (
      process.env.NEXT_PUBLIC_SENTRY_DSN &&
      process.env.NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
          release: process.env.VERCEL_GITHUB_COMMIT_SHA,
        }),
      );
    }
    return config;
  },
  async redirects() {
    if (process.env.ENVIRONMENT === "production") {
      return [...productionRedirects, ...sharedRedirects];
    } else {
      return [...sharedRedirects];
    }
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/fonts/Averta/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/fonts/fontface.css",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate",
          },
          ...securityHeaders,
        ],
      },
    ];
  },
};

// Redirect test and home slug pages on Production
const sources = [
  "/:parent(test-page.*)",
  "/:parent(home.*)",
  "/partner/:slug(test-page.*)",
  "/affiliate/:slug(test-page.*)",
  "/lp/:slug(test-page.*)",
  "/vs/:slug(test-page.*)",
  "/page-preview",
];

const productionRedirects = sources.map((source) => ({
  source,
  destination: "/",
  permanent: true,
}));

// Redirects various lp directories to home page since they have no page
const lpSources = ["/partner", "/affiliate", "/vs", "/lp"];

const lpRedirects = lpSources.map((source) => ({
  source,
  destination: "/",
  permanent: true,
}));

// Redirects needed for both Production and Staging/Development
const sharedRedirects = [
  {
    // 301 Redirect ElectricityPlans page to new affiliate url
    source: "/ep",
    destination: "/affiliate/ep",
    permanent: true,
  },
  {
    // 301 Redirect original simple header page to new lp url
    source: "/texas-sh",
    destination: "/lp/texas-sh",
    permanent: true,
  },
  {
    // 301 Redirect Support pages
    source: "/support",
    destination: "https://support.gotrhythm.com",
    permanent: true,
  },
  {
    // 301 Redirect register pages
    source: "/register",
    destination: "https://app.gotrhythm.com/sign-up?rcid=default",
    permanent: true,
  },
  {
    // 301 Redirect login page
    source: "/login",
    destination: "https://app.gotrhythm.com/sign-in",
    permanent: true,
  },
  {
    // 301 Redirect login page
    source: "/account",
    destination: "https://app.gotrhythm.com/sign-in",
    permanent: true,
  },
  {
    // 301 Redirect login page
    source: "/myaccount",
    destination: "https://app.gotrhythm.com/sign-in",
    permanent: true,
  },
  {
    // 301 Redirect register pages
    source: "/sign-up",
    destination: "https://app.gotrhythm.com/sign-up?rcid=default",
    permanent: true,
  },
  {
    // 301 Redirect register pages
    source: "/sign-up/plans",
    destination: "https://app.gotrhythm.com/sign-up?rcid=default",
    permanent: true,
  },
  {
    // 301 Redirect /payments 404
    source: "/payments",
    destination: "https://app.gotrhythm.com/sign-in",
    permanent: true,
  },
  {
    // 301 Redirect /eswelcome 404
    source: "/eswelcome",
    destination: "/es/welcome",
    permanent: true,
  },
  {
    // 301 Redirect /eswelcome 404
    source: "/es/eswelcome",
    destination: "/es/welcome",
    permanent: true,
  },
  {
    // 301 Redirect /eswelcome 404
    source: "/es/eswelcome",
    destination: "/es/welcome",
    permanent: true,
  },
  {
    // 301 Redirect /hc/en-us 404
    source: "/hc/en-us",
    destination: "/",
    permanent: true,
  },
  {
    // 301 Redirect Earth Day
    source: "/lp/texas-earth-day",
    destination: "/electricity/texas",
    permanent: true,
  },
  {
    // 301 Redirect Earth Day
    source: "/lp/fb-earth-day",
    destination: "/electricity/texas",
    permanent: true,
  },
  ...lpRedirects,
];

// https://securityheaders.com
const scriptSrc = [
  "'self'",
  "'unsafe-eval'",
  "'unsafe-inline'",
  "*.youtube.com",
  "*.ads-twitter.com",
  "*.twitter.com",
  "*.instagram.com",
  "*.ctfassets.net",
  "*.fullstory.com",
  "*.zdassets.com",
  "*.segment.com",
  "*.facebook.net",
  "*.nextdoor.com",
  "*.tvsquared.com",
  "*.doubleclick.net",
  "*.adsrvr.org",
  "*.bing.com",
  "*.google.com",
  "*.google-analytics.com",
  "*.googletagmanager.com",
  "*.googleadservices.com",
  "*.googleusercontent.com",
  "polyfill.io",
  "*.vercel-insights.com",
  "*.vercel.app",
];

const ContentSecurityPolicy = `
  default-src 'self';
  script-src ${scriptSrc.join(" ")};
  child-src *.youtube.com *.google.com *.twitter.com *.facebook.com *.adsrvr.org *.doubleclick.net;
  style-src 'self' 'unsafe-inline' *.googleapis.com *.google.com;
  img-src * blob: data: *.ctfassets.net *.fbsbx.com *.googleusercontent.com;
  media-src 'self' *.zdassets.com *.ctfassets.net;
  connect-src *;
  font-src 'self' fonts.gstatic.com;
  worker-src 'self' *.vercel.app;
  manifest-src 'self' *.vercel.app;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];
