# CUBARESORT.CA

Trilingual (FR / EN / ES), responsive **Cuba travel-inspiration portal**, built as a lightweight, dependency-free static application.

**Launch scope:** Editorial destination and stay inspirations only. This is **not** a reservation engine, a licensed travel agency, live hotel inventory, price feed, or payment service. Content imagery is illustrative rather than verified photographs of individual hotels.

## Implemented functionality

- Premium responsive homepage with hero, destination cards, editorial section, FAQ and footer.
- Nine curated travel ideas across Varadero, Cayo Coco, Havana, Cayo Santa María, Holguín and Trinidad.
- **Property directory: 169 Cuban properties across 13 regions**, with region filter chips, region select and accent-insensitive name search. Names and regions only — no rates, availability, star ratings, room counts or hotel-specific photos.
- Destination and trip-style filters, accent-insensitive text search, sorting, reset and bookmarkable URL filters.
- Browser-local favourites (no accounts or personal tracking).
- French, English and Spanish translations with local language persistence.
- Trip-request draft form for destination, departure month, travellers, duration and notes.
- Clipboard copy of the drafted request. Email draft opens only after an official contact is configured.
- Privacy/terms overview; keyboard navigation; responsive mobile menu.
- Node-native tests, static build, zero-install development server and GitHub Pages workflow.

## Getting started

Requires Node.js 20 or later (Node 22 in CI). No npm install step is necessary.

1. Clone https://github.com/takatakca/CUBARESORT.CA
2. Enter the CUBARESORT.CA directory.
3. Run **npm run validate**.
4. Run **npm run dev** and browse to http://127.0.0.1:4173.
5. Run **npm run build** to generate the deployable static output in the dist directory.

For shared hosting, upload only the contents of dist into the verified document root. Production does not require Node.js.

## Key files

- **index.html**: semantic homepage and dialogs.
- **assets/catalog.js**: destinations and multilingual editorial ideas.
- **assets/hotels.js**: the property directory (names, region, arrival airport, confirmation flag). Never add rates, availability or ratings to this file from memory or a public website — only from an authorized supplier feed.
- **assets/i18n.js**: all translations, FAQ and baseline legal copy.
- **assets/styles.css**: responsive layout, colors and components.
- **assets/app.js**: client-side discovery features.
- **assets/config.js**: disabled-by-default integration configuration. Only add a verified, monitored contact email.
- **scripts/build.mjs** and **scripts/dev-server.mjs**: local build and preview.
- **tests/site.test.mjs**: static and content checks.
- **docs/PRODUCTION_CHECKLIST.md** and **docs/AGENT_HANDOFF.md**: next actions.

Photos currently use third-party Unsplash illustrative imagery. Verify licensing and rights before commercial launch, and replace with correctly labeled authorized hotel/destination photos as the inventory becomes real.

## Deployment

The **.github/workflows/publish.yml** action validates and builds every pull request. Main pushes publish only after those checks succeed, then verify the exact HTTPS release and its assets. It also supports manual runs. Failed publication fails the workflow.

Initial publication requires GitHub repository Settings → Pages configured for **GitHub Actions** as the source. A green GitHub Actions run alone does not establish that the custom domain resolves.

Pages source was activated on 2026-10-15. Check the latest completed main workflow and `release.json` before claiming publication. Use `npm run verify:live -- --url HTTPS_SITE_URL --sha FULL_40_CHARACTER_COMMIT` for a read-only release check; project Pages URLs with a repository path are supported.

The intended production domain is **https://cubaresort.ca/**. To connect it to GitHub Pages, verify current DNS/hosting first; then follow GitHub's official custom domain/DNS and HTTPS procedures. Never overwrite another production deployment or DNS without confirmation.

MochaHost/cPanel alternative: build in GitHub Actions and securely transfer dist contents to the correct domain document root. Do not assume secrets or SSH paths from another TAKATAK project. Only enable automated SSH deployment after host key, domain web root, account and permissions are verified.

## Privacy and ecosystem architecture

The app is static: no payments and no submission to a backend. Only language preference and favourited item IDs are stored in local browser storage. Drafted travel text stays on the device until a visitor explicitly copies it (or opens their own email client when an approved contact is configured). Unsplash and Google Fonts receive normal network requests for remote resources.

A revised privacy policy with accountable business identity and legal review is needed before collecting leads. Real booking integrations must use authorized suppliers, server-managed secrets and **GROUPE TAKATAK** tenant-scoped identity/customer APIs; this vertical should not build another competing master CRM.

## Still required for commercial bookings

- Verified resort content, licensed imagery, operator legal identity and monitored contact.
- Approved supplier agreements with rates, availability and real booking APIs.
- Secure consent-based lead intake and payment infrastructure.
- Applicable Quebec/Canada travel, consumer protection and privacy compliance.
- Confirmation of production infrastructure, DNS, HTTPS and acceptance tests.

This version deliberately avoids fabricated ratings, prices, reviews, promotions and booking confirmations.

See **docs/PRODUCTION_CHECKLIST.md** for launch readiness and **docs/AGENT_HANDOFF.md** for agent continuation.

## Preview safety and hotel-specific drafts

The local preview HTTP server only serves the files intended for static publication (`index.html`, `robots.txt`, `sitemap.xml`, and allowlisted assets). It refuses repository internals, hidden files, local environment secrets and symlink aliases. An HTTP integration test checks both permitted and forbidden paths.

Choosing **Ask** on a named property now adds that exact property name to the visitor's draft, labeled as an *interest only, not a reservation*. Choosing a generic inquiry does not reuse the previous property. No message is sent automatically.
