# Project status — CUBARESORT.CA

Updated 2026-10-15. Repository `takatakca/CUBARESORT.CA`; publication branch `main`.

## Product currently implemented
- Responsive editorial travel-inspiration site in static HTML, CSS and ES modules, with FR/EN/ES copy.
- Six editorial destinations and nine stay inspirations; filter/search/sort, shareable URL state and browser-local favourites.
- Directory of 169 named Cuban properties in 13 regions; names, arrival airports and provenance flags only. No real inventory, pricing or booking.
- Unsent trip-request draft with optional hotel-of-interest, copy-to-clipboard and disabled pre-addressed mail until official recipient verification.
- Baseline privacy/terms notices; no user account, payment or backend collection.
- Node 22 source checks and tests; static build; `release.json` for verifiable deployment.

## Deployment truth at start of this session
- Baseline `main`: `fb5f9d60e9ee251d59121d94f27c4231ac8c9d2a` (2026-10-15 13:47 UTC).
- Workflow run [38745782187](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38745782187): build, Pages deploy, public exact-SHA check all succeeded.
- Pages path: https://takatakca.github.io/CUBARESORT.CA/ . The existing check verifies `release.json` commit plus homepage and assets; current development strengthens it to check per-file digests.
- Custom domain `cubaresort.ca` last known to point to MochaHost `209.42.24.125` and return Apache 500. The current browser check also returned HTTP 500. **Do not claim the custom domain is launched.**
- Public Pages content could not be directly re-fetched from this session's web/network clients; the documented CI release verification is the available evidence for the baseline. Re-check via latest Actions on any new push.

## Separate remaining blocks
- [Issue #1](https://github.com/takatakca/CUBARESORT.CA/issues/1): existing DNS zone/site-account access, mail-preserving cutover, custom-domain certificate and exact-main acceptance check.
- [Issue #2](https://github.com/takatakca/CUBARESORT.CA/issues/2): supplier feeds, operator identity, legal terms, consent, payment/booking and TAKATAK tenant-scoped integrations; none are authorized or implemented.
- [PR #3](https://github.com/takatakca/CUBARESORT.CA/pull/3): separate Next.js conversion, not part of the current static Pages path and not approved for merge.

## Acceptance gate
A commercial booking solution is not complete until an authorized supplier/API, responsible operator, legal framework, secure payments and verified production flows exist. Successful Pages publication is **only** an informational-site release.
