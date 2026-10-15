# Task queue — CUBARESORT.CA

Updated 2026-10-15. Always compare with the latest `main` before starting an item.

| Priority | Task | State / actual dependency | Definition of done |
|---|---|---|---|
| Done | Verify and protect published Pages release identity | **Completed** in `3e9e10376f22532f0d24242a5598055e29bdf324` (run 38773832573 passed live SHA + nine file digests) | Keep manifest and negative tests passing for future releases |
| P0 | Finish custom-domain cutover — issue #1 | **Blocked**: existing authoritative MochaHost DNS zone is absent from accessible cPanel/WHM accounts | Authorized zone access, full DNS export, mail route preserved, approved web cutover, HTTPS and exact-current-SHA checks |
| P1 | Browser accessibility and multilingual acceptance | Actionable when real browser automation/hardware is available | Keyboard traversal, screen-reader dialogs/focus, desktop/mobile FR/EN/ES evidence and fixes |
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
