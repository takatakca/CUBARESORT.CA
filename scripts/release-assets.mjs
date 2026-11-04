import {GUIDE_PATHS} from './guide-pages.mjs';
import {PROFILE_PATHS} from './premium-pages.mjs';
// Files whose published bytes must match the tested build exactly.
// Keep this list limited to static first-party files that exist in dist/.
export const VERIFIED_RELEASE_FILES = Object.freeze([
  "index.html",
  "assets/app.js",
  "assets/catalog.js",
  "assets/hotels.js",
  "assets/config.js",
  "assets/i18n.js",
  "assets/request.js",
  "assets/styles.css",
  "assets/favicon.svg",
  "assets/premium.js", "assets/premium-data.js", "assets/premium-copy.js", "assets/premium-render.js", "assets/premium.css", "assets/marketplace-data.js",
  "assets/guide.js", "assets/guide.css",
  ...Object.values(GUIDE_PATHS), ...PROFILE_PATHS
]);
