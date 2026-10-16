# Project status — CUBARESORT.CA

Updated 2026-10-15. Repository `takatakca/CUBARESORT.CA`; publication branch `main`.

## Product currently implemented
- Responsive editorial travel-inspiration site in static HTML, CSS and ES modules, with FR/EN/ES copy.
- Six editorial destinations and nine stay inspirations; filter/search/sort, shareable URL state and browser-local favourites.
- Directory of 169 named Cuban properties in 13 regions; names, arrival airports and provenance flags only. No real inventory, pricing or booking.
- Unsent trip-request draft with optional hotel-of-interest, copy-to-clipboard and disabled pre-addressed mail until official recipient verification.
- Baseline privacy/terms notices; no user account, payment or backend collection.
- Node 22 source checks and tests; static build; `release.json` for verifiable deployment.

## Verified accessibility release — 2026-10-15

- Multilingual accessible-name commit `050fd18cdac1ea1a84299be1317bc4155b796bb3` passed 31 tests, build, Pages run 38826028471 and the real production-container job. Coolify run 38826028392 failed only at external live acceptance because the public resource stayed on prior release `111ad171`; the new commit is therefore **not yet verified on Contabo**.

- Functional commit `b607f3bfaa0c81585237547f8c3c690e87fce11e`: [Contabo container and live workflow 38790752444](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38790752444) passed exact SHA + nine file digests; [Pages workflow 38790752455](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38790752455) passed.
- A subsequent documentation-only commit requires its own fresh release verification; check current main. Custom-domain cutover remains blocked.

## Dialog keyboard acceptance follow-up — 2026-10-15

- Live keyboard traversal found that forward Tab could leave the open inquiry dialog after its final action and briefly focus the page body. Both modal dialogs also lacked explicit `aria-labelledby` relationships.
- Commit `e6dd1d26a36e72ca580bcfb79a8bae1b24eaa0f5` adds forward/reverse focus containment, explicit visible heading names and regression coverage. Contabo run 38818276620 and Pages run 38818276543 passed; independent exact-SHA, all-nine-digest and health verification passed after the rolling replacement stabilized.

## Accessibility improvement — 2026-10-15

- Fixed keyboard focus loss after interactive region-chip and favourite-card re-render; added static regression guards. Requires latest main live release verification before marking deployed.

## Custom-domain Passenger error and preflight — 2026-10-15

- Screenshot confirms a Passenger error on the old MochaHost site; external HTTPS returns 500. Without the legacy site account/logs, the underlying application exception cannot be determined.
- Added a read-only DNS guard and unit tests to reject an unsafe apex+MX web cutover when the custom-domain production-ready check is enabled. Await new main's container/HTTPS pipeline before marking this safeguard deployed.

## Current Contabo status — 2026-10-15

- The owner selected Contabo/Coolify with automatic deployment. Separate resource `ci7ltew4v50e4fwq63tfvtg6` is running healthy on `31.220.96.134` using `Dockerfile.coolify`, port 8080 and the existing GitHub App's main-push webhook.
- Verified release `5f47930af670fa387f6f5990b42394d8c62a7d11`: actual production container tests and external HTTPS exact-SHA/nine-file-digest check passed in run 38776838876. Native Coolify webhook deployment xofxdyeudps7innbmlkqzwzv succeeded; browser rendering was verified.
- Working HTTPS URL: https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ . GitHub Pages remains the fallback.
- Custom domain still points to MochaHost and returns Apache 500. Its existing DNS zone is not in the accessible accounts, and its apex MX requires preservation. The application/pipeline are installed; the custom-domain cutover remains blocked.
- This documentation update triggers a newer release; verify its current main SHA and live file digests before claiming that newer version is published.

## Historical deployment baseline
- Baseline `main`: `fb5f9d60e9ee251d59121d94f27c4231ac8c9d2a` (2026-10-15 13:47 UTC).
- Workflow run [38745782187](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38745782187): build, Pages deploy, public exact-SHA check all succeeded.
- Pages path: https://takatakca.github.io/CUBARESORT.CA/ . The existing check verifies `release.json` commit plus homepage and assets; current development strengthens it to check per-file digests.
- Custom domain `cubaresort.ca` last known to point to MochaHost `209.42.24.125` and return Apache 500. The current browser check also returned HTTP 500. **Do not claim the custom domain is launched.**
- Public Pages content could not be directly re-fetched from this session's web/network clients; the documented CI release verification is the available evidence for the baseline. Re-check via latest Actions on any new push.

## Verified release-integrity delivery
- Code commit: `3e9e10376f22532f0d24242a5598055e29bdf324`.
- Run [38773832573](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38773832573) passed tests, build, actual Pages publication and public file-by-file SHA-256 verification.
- This status document is updated in a follow-up commit; check the newest `main` SHA and run before announcing *that* release.

## Separate remaining blocks
- [Issue #1](https://github.com/takatakca/CUBARESORT.CA/issues/1): existing DNS zone/site-account access, mail-preserving cutover, custom-domain certificate and exact-main acceptance check.
- [Issue #2](https://github.com/takatakca/CUBARESORT.CA/issues/2): supplier feeds, operator identity, legal terms, consent, payment/booking and TAKATAK tenant-scoped integrations; none are authorized or implemented.
- [PR #3](https://github.com/takatakca/CUBARESORT.CA/pull/3): separate Next.js conversion, not part of the current static Pages path and not approved for merge.

## Acceptance gate
A commercial booking solution is not complete until an authorized supplier/API, responsible operator, legal framework, secure payments and verified production flows exist. Successful Pages publication is **only** an informational-site release.
