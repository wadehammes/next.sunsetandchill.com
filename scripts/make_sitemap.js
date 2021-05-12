const fs = require("fs");

const path = ".next/prerender-manifest.json";
const sitemapPath = "public/sitemap.xml";
const baseUrl = "https://www.gotrhythm.com";
const lastModTime = new Date().toISOString();

const manifestContents = fs.readFileSync(path, "utf-8");
const manifest = JSON.parse(manifestContents);

let sitemapStr = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const addRoute = (route) => {
  sitemapStr += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastModTime}</lastmod>
  </url>`;
};

const { routes } = manifest;

const IGNORE_ROUTES = [
  "/404",
  "/page-404-v2",
  "/ep",
  "/breakup-livvy",
  "/breakup",
  "/blog/post-preview",
  "/page-preview",
  "/welcome",
  "/fb",
  "/houston",
  "/dallas",
];

Object.entries(routes).forEach(([route, _]) => {
  if (route.startsWith("/en")) {
    const strippedRoute = route.replace("/en", "");

    // Don't include our landing page routes in sitemap
    if (
      strippedRoute.startsWith("/partner") ||
      strippedRoute.startsWith("/affiliate") ||
      strippedRoute.startsWith("/lp") ||
      strippedRoute.startsWith("/call-center") ||
      strippedRoute.startsWith("/test-page") ||
      strippedRoute.startsWith("/plp") ||
      strippedRoute.startsWith("/home") ||
      strippedRoute.startsWith("/hardtospell")
    ) {
      return;
    } else if (!IGNORE_ROUTES.includes(strippedRoute)) {
      addRoute(strippedRoute);
    }
  }
});

sitemapStr += "</urlset>";

fs.writeFileSync(sitemapPath, sitemapStr);
