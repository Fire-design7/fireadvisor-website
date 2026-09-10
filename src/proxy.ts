import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Only exclude genuine static-asset extensions from i18n routing — not
  // every path containing a dot. The common next-intl matcher pattern
  // (excluding *any* dotted path) causes bot/scanner requests to file-like
  // paths that don't exist (/wp-login.php, /.env, /backup.sql, etc.) to
  // bypass the app's routing entirely and crash with a 500 instead of
  // reaching our own 404 handling.
  //
  // robots.txt, sitemap.xml and manifest.webmanifest are excluded by exact
  // path instead of by extension — they're real root-level file-convention
  // routes that must skip the locale rewrite, but a blanket txt/xml/json
  // exclusion also caught fake paths with the same extension (old WordPress
  // sitemap remnants like /author-sitemap.xml, /post-sitemap.xml, etc.),
  // sending them down the same crashing path instead of a clean 404.
  matcher: [
    "/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|mjs|woff|woff2|ttf|map)$).*)",
  ],
};
