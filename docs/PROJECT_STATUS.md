# Project status — CUBARESORT.CA

Updated 2026-10-16. Repository `takatakca/CUBARESORT.CA`; publication branch `main`.

## Visible search keyboard focus — 2026-10-16

- Restored a high-contrast 3px focus outline on the stay search field's container, whose input CSS previously overrode the general keyboard focus ring.
- Regression check added. The latest confirmed full production release prior to this patch is `8c511044cb0232632940e38c42dc2e57cc2c02cd` (Contabo/apex/www run 38953151340, Pages run 38953151339). This newer change is pending its own tests and exact-main HTTPS release evidence.

## Reduced-motion navigation correction — 2026-10-16

- Found a destination-card scroll path that always requested animation even when reduced motion was preferred. It now shares the preference-aware scroll helper used by stay search. Source regression tests guard both entry points.
- The latest tested production release before this code change is `31e5911f6dce61b145b00d6226a6b11a753cc0be`; this patch must pass its own main/Contabo/apex/www exact-SHA/nine-digest release checks before it is called live.

## Verified automatic production release — 2026-10-16

Main `d64603349ed7c967590c41b7e2005cab391142de` automatically deployed through native Coolify Webhook `5yufbgsdz9bccmoe9h15vnzc` on 2026-10-16. Production container/live [run 38921978874](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978874) and Pages [run 38921978877](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978877) both passed. The live job explicitly reports `PRODUCTION_READY: true`, public DNS/mail separation, and full SHA plus all nine file digests on both apex and www.

The hosting incident is resolved. Later evidence-only main commits require their own normal automatic verification; the final current SHA/run/deployment is recorded in issue #1. Functional mail delivery is still untested. Earlier instructions to merge PR #6 or finish its acceptance describe the completed checkpoint.

## Current production hosting — 2026-10-16

- https://cubaresort.ca/ and https://www.cubaresort.ca/ now serve the separate Coolify application on Contabo `31.220.96.134`. Saved routing was applied successfully at 15:06 UTC, fixing the proxy 404 and issuing valid HTTPS.
- Initial domain acceptance passed exact main `ff907675207f32f0d113f07f01a1d7d11c97ed0e`, all nine asset digests, health and HTTP redirects on both hostnames.
- Existing native GitHub App main-push auto deployment remains enabled. `CUBARESORT_COOLIFY_PRODUCTION_READY=true` makes public DNS/mail separation and apex/www HTTPS checks mandatory for new main releases. Verify the new operations merge's actual webhook and CI before claiming its SHA current.
- Mail routes independently to MochaHost `209.42.24.127`; the original zone and confirmed bolonca document root are backed up. End-to-end mail delivery is untested. Pages remains an active fallback.
- Historical pre-cutover blockers below are superseded by `docs/DOMAIN_CUTOVER_20261016.md`; do not ask for missing-zone access or the old support request again.

## Product currently implemented
- Responsive editorial travel-inspiration site in static HTML, CSS and ES modules, with FR/EN/ES copy.
- Six editorial destinations and nine stay inspirations; filter/search/sort, shareable URL state and browser-local favourites.
- Directory of 169 named Cuban properties in 13 regions; names, arrival airports and provenance flags only. No real inventory, pricing or booking.
- Unsent trip-request draft with optional hotel-of-interest, copy-to-clipboard and disabled pre-addressed mail until official recipient verification.
- Baseline privacy/terms notices; no user account, payment or backend collection.
- Node 22 source checks and tests; static build; `release.json` for verifiable deployment.

## Travel draft date validation — 2026-10-16

- The frontend draft formatter now rejects past departure months rather than relying only on an HTML input minimum, and the dialog clears a previously selected past month when reopened.
- Added deterministic FR/EN/ES regression tests; the change does not collect, transmit or persist personal data. Publication remains pending the new main release's container and HTTPS SHA-256 checks.

## Verified accessibility release — 2026-10-15

- Multilingual accessible-name commit `050fd18cdac1ea1a84299be1317bc4155b796bb3` passed 31 tests, build and Pages run 38826028471. Its first Coolify verifier expired during a deployment queue delay; follow-up main `894e5eae6fe0aad0bfdd4411bcd328d07511373b` passed container/live run 38827678357, exact SHA, all nine digests and health. Live FR/EN/ES label inspection passed.

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
- [Issue #1](https://github.com/takatakca/CUBARESORT.CA/issues/1): final automatic custom-domain release evidence; initial DNS, routing, TLS and full-SHA checks have passed. Functional mail delivery remains explicitly untested.
- [Issue #2](https://github.com/takatakca/CUBARESORT.CA/issues/2): supplier feeds, operator identity, legal terms, consent, payment/booking and TAKATAK tenant-scoped integrations; none are authorized or implemented.
- [PR #3](https://github.com/takatakca/CUBARESORT.CA/pull/3): separate Next.js conversion, not part of the current static Pages path and not approved for merge.

## Acceptance gate
A commercial booking solution is not complete until an authorized supplier/API, responsible operator, legal framework, secure payments and verified production flows exist. Successful Pages publication is **only** an informational-site release.
