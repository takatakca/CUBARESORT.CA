# CUBARESORT.CA — Production checklist

Updated: 2026-10-15. Current scope: **static inspiration portal, not a live booking service**.

## Implemented in code

- [x] Responsive static site and baseline keyboard accessibility
- [x] FR / EN / ES translations
- [x] Six Cuba destinations, nine editorial inspirations
- [x] Search, filters, sorting and sharable URL states
- [x] Browser-local favourites and language preference
- [x] Trip request draft and clipboard export (no private data sent)
- [x] Pricing/availability disclaimers, baseline privacy and terms
- [x] GitHub Pages build and publication workflow
- [x] Zero-dependency Node development server and automated code tests

## Accessibility follow-up (2026-10-15)

- [x] Region-chip and favourite-card keyboard focus restoration implemented on `main`; `b607f3bf` verified by Contabo workflow 38790752444 and Pages workflow 38790752455.
- [x] Inquiry/legal dialog accessible names and forward/reverse Tab containment verified in `e6dd1d26`; Contabo run 38818276620 and Pages run 38818276543 passed, followed by independent exact-SHA/nine-digest/health checks.
- [ ] Real keyboard traversal, mobile assistive technology and screen-reader acceptance in FR/EN/ES.

## Contabo deployment — 2026-10-15

- [x] Separate CUBARESORT Coolify resource on Contabo 31.220.96.134, internal port 8080.
- [x] Existing authorized GitHub App, main-push deployment webhook enabled.
- [x] All 20 application tests, final production image smoke test, runtime health and private-path isolation passed.
- [x] Actual Coolify webhook deployment xofxdyeudps7innbmlkqzwzv succeeded and became healthy at 17:25:57 UTC.
- [x] External HTTPS exact commit and nine-file SHA-256 verification passed for 5f47930 in run 38776838876.
- [x] Browser rendered https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ .
- [ ] Existing-zone access, mail-preserving DNS cutover, cubaresort.ca certificate and current-main/domain/email acceptance. The domain still points to MochaHost and returns 500.

## Release-integrity enhancement (2026-10-15)

- [x] Build stamps a SHA-256 manifest for the homepage and the required first-party assets.
- [x] Live verifier checks fetched bytes against manifest to reject stale/mixed deployments with HTTP 200.
- [x] Regression tests cover wrong SHA, corrupt/missing manifest, stale 200 OK JavaScript and missing CSS.
- [ ] Confirm the new main workflow and exact byte-verified Pages SHA; record the run in handoff.

## Verification still required

- [x] GitHub Actions validation and build passed on commit 637a25c (run 38617962103)
- [x] GitHub Pages is configured with GitHub Actions as publication source (saved 2026-10-15)
- [x] Published Pages URL serves working site: https://takatakca.github.io/CUBARESORT.CA/; run 38743595259 deployed and independently verified full commit daa6f4a8d7daf62f87a3d5dcdb24e7c2e6fd84cd
- [x] cubaresort.ca DNS and ownership inspected: MochaHost domain present, apex 209.42.24.125, MX points to apex; neither accessible hosting account exposes its DNS zone
- [ ] Obtain the existing cubaresort.ca zone/site account and export records before a mail-preserving cutover
- [ ] HTTPS on cubaresort.ca validated with matching certificate
- [ ] Production domain points to verified static deployment
- [ ] Chrome, Firefox, Safari, Android/iOS smoke tests
- [ ] Keyboard, screen reader, mobile menus and all locales tested
- [ ] Verify stock-photo availability, rights, link targets and performance

## Before real leads or bookings

- [ ] Confirm registered business/operator name and official contact
- [ ] Configure a monitored verified email in assets/config.js
- [ ] Implement consent, spam protection, backend security and retention/deletion before collecting visitor information
- [ ] Replace placeholder privacy and terms with legally reviewed versions
- [ ] Verify destination and resort information and authorized images
- [ ] Review Canadian/Quebec travel agency and consumer protection requirements
- [ ] Confirm entry requirements only through authoritative sources
- [ ] Contract approved hotel/booking supplier and connect live APIs securely
- [ ] Implement verified quote, reservation, cancellation and payment lifecycle
- [ ] Integrate GROUPE TAKATAK tenant-scoped identity/lead services; never duplicate master CRM
- [ ] Add monitoring, incident response and successful end-to-end tests

## Hosting alternatives

**GitHub Pages:** GitHub Actions publishes static dist output once Pages source and permissions are configured. DNS and certificate are separate operator steps.

**MochaHost/cPanel:** Build dist in CI, upload only dist to the domain's confirmed document root. Verify SSH host key and an explicitly authorized deployment key before adding a deployment action. Do not inherit paths and credentials from another TAKATAK service.

**Release rule:** A live informational website must not be described as live bookable inventory or a complete commercial booking integration.

## Security and request-draft improvements (2026-10-14)

- [x] Preview HTTP server restricts routes to production static assets and rejects hidden/repository files; integration test covers `.env` and internal paths.
- [x] Property-specific request draft includes the selected hotel name with an explicit *not booked* label, while generic requests clear that selection.
- [x] PR #4 automatic validation (38742979223) and merged main publication (38743595259) passed, including 18 tests and the exact public HTTPS SHA/assets check.
- [x] GitHub Pages upload and deploy actually succeeded. The custom domain remains blocked by access to its existing DNS zone and still returns Apache HTTP 500; this is not a completed custom-domain launch.
