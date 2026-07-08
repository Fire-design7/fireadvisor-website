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
  matcher: [
    "/((?!api|_next|_vercel|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|mjs|woff|woff2|ttf|map|txt|xml|json|webmanifest)$).*)",
  ],
};
