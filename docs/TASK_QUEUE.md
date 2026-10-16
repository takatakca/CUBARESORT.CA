# Task queue — CUBARESORT.CA

Updated 2026-10-15. Always compare with the latest `main` before starting an item.

| Priority | Task | State / actual dependency | Definition of done |
|---|---|---|---|
| Done | Verify and protect published Pages release identity | **Completed** in `3e9e10376f22532f0d24242a5598055e29bdf324` (run 38773832573 passed live SHA + nine file digests) | Keep manifest and negative tests passing for future releases |
| Done | Verify automatic GitHub to Contabo releases | Queue delay recovered without configuration changes; current main `894e5eae` passed container/live run 38827678357 with exact SHA and nine digests | Keep exact-current-main container and external HTTPS verification passing |
| P0 | Finish custom-domain cutover — issue #1 | **Blocked**: user screenshot confirms legacy Passenger error; existing MochaHost authoritative zone inaccessible. A read-only MX/apex/www gate now protects later acceptance, but DNS and mail remain unchanged | Obtain the existing-zone access, export every record, separate MX mail route, approve web A cutover, verify apex/www HTTPS, current SHA and mail |
| P1 | Browser accessibility and multilingual acceptance | **In progress:** focus/dialog fixes and translated explicit names are deployed; `050fd18c` passed 31 tests and live FR/EN/ES label inspection, with current-main verification in run 38827678357. Real device/screen-reader acceptance remains pending. | Keyboard traversal, screen-reader dialogs/focus, desktop/mobile FR/EN/ES evidence and fixes |
| P1 | Confirm 34 archive-sourced property names | Requires authoritative current supplier data | Reconcile, update or remove unconfirmed names with provenance recorded |
| P1 | Verify photo licensing and destination specificity | Requires licensed image/usage confirmation | Replaced or documented authorized imagery and no false hotel-photo representations |
| P2 | Secure inquiry delivery | **Blocked**: verified operator and support mailbox, consent policy and endpoint | Reviewed consent, spam protection, tenant-scoped secure API, data lifecycle, delivery errors and tests |
| P2 | Live booking, price, inventory and payment | **Blocked**: approved supplier agreements, licenses, legal/payout decisions | Server-side integration, real availability, verified quotes, reservations, cancellation/payment and end-to-end acceptance |
| Separate | PR #3 Next.js conversion | Not part of the production repair; incomplete and unapproved | Separately reviewed against current static feature parity and architecture before any merge |

## Order of work
1. Finish independent checks, test and document improvements without touching production DNS.
2. If authorized DNS access appears, export the **existing** zone (including mail records) before planning the cutover; never make blind changes.
3. Never close issue #1 without verified custom-domain HTTPS and the **latest** `main` manifest/asset checksum match.
4. Never enable payments, personal-data capture or fabricated resort inventory while issue #2 is blocked.

Completed tasks should be recorded in `docs/AGENT_HANDOFF.md` with the actual commit and Actions run IDs, not just moved between headings.
