# CUBARESORT.CA — Production checklist

Updated: 2026-10-14. Current scope: **static inspiration portal, not a live booking service**.

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

## Verification still required

- [x] GitHub Actions validation and build passed on commit 637a25c (run 38617962103)
- [ ] GitHub Pages is configured with GitHub Actions as publication source
- [ ] Published Pages URL serves working site
- [ ] cubaresort.ca DNS checked with domain owner and chosen host
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
