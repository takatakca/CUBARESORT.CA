# Task queue — CUBARESORT.CA

Updated 2026-10-16. Always compare with the latest `main` before starting an item.

| Priority | Task | State / actual dependency | Definition of done |
|---|---|---|---|
| Done | Verify and protect published Pages release identity | **Completed** in `3e9e10376f22532f0d24242a5598055e29bdf324` (run 38773832573 passed live SHA + nine file digests) | Keep manifest and negative tests passing for future releases |
| Done | Verify automatic GitHub to Contabo releases | Queue delay recovered without configuration changes; current main `894e5eae` passed container/live run 38827678357 with exact SHA and nine digests | Keep exact-current-main container and external HTTPS verification passing |
| Done | Automatic GitHub-to-public-domain Contabo deployment — issue #1 | d646033 automatically deployed by native Webhook 5yufbgsdz9bccmoe9h15vnzc; container/live 38921978874 and Pages 38921978877 passed with production-ready true and apex/www exact SHA + all nine digests | Preserve checks; always verify newest main after subsequent releases |
| P1 | Hotel-specific inquiry clarity | Show localized selected hotel name in the draft modal; clear it on generic requests and destination changes; pure and markup regression added, pending main release | Confirm current-main HTTPS SHA/digests and accessible visual/voice acceptance |
| P1 | Distinguishable repeated card actions | Item-specific FR/EN/ES accessible names added for favourite and request controls; pending fresh main release proof | 35 tests/build, container and generated/apex/www/Pages exact-SHA plus nine-digest verification |
| Done | Reject past departure months in unsent travel drafts | Form min was not enforced by formatter; fixed validator plus reopening behavior and FR/EN/ES regression checks (2026-10-16, pending release) | CI container and live release must confirm exact SHA and nine asset digests |
| P1 | Reduced-motion navigation | Destination-card smooth scrolling found to bypass a reduced-motion preference; corrected both paths with a shared helper and regression guard, pending verified main release | CI, container, apex/www exact SHA+digests and accessibility smoke tests must pass |
| P1 | Visible keyboard focus in stay search | Fixed a late `.text-search input{outline:0}` override by adding a 3px high-contrast wrapper outline on focus; regression check added, pending fresh public release | Keyboard-focus acceptance on mobile/desktop and verified current main deployment |
| P1 | Mobile menu action announcement | Fixed the stale “Open menu” accessible name while expanded; FR/EN/ES state labels and language switching are regression guarded, pending fresh public release | Container and all public hosts verify exact main SHA plus nine digests |
| P1 | Browser accessibility and multilingual acceptance | **In progress:** focus/dialog fixes and translated explicit names are deployed; `050fd18c` passed 31 tests and live FR/EN/ES label inspection, with current-main verification in run 38827678357. Real device/screen-reader acceptance remains pending. | Keyboard traversal, screen-reader dialogs/focus, desktop/mobile FR/EN/ES evidence and fixes |
| P1 | Confirm 34 archive-sourced property names | Requires authoritative current supplier data | Reconcile, update or remove unconfirmed names with provenance recorded |
| P1 | Verify photo licensing and destination specificity | Requires licensed image/usage confirmation | Replaced or documented authorized imagery and no false hotel-photo representations |
| P2 | Secure inquiry delivery | **Blocked**: verified operator and support mailbox, consent policy and endpoint | Reviewed consent, spam protection, tenant-scoped secure API, data lifecycle, delivery errors and tests |
| P2 | Live booking, price, inventory and payment | **Blocked**: approved supplier agreements, licenses, legal/payout decisions | Server-side integration, real availability, verified quotes, reservations, cancellation/payment and end-to-end acceptance |
| Separate | PR #3 Next.js conversion | Not part of the production repair; incomplete and unapproved | Separately reviewed against current static feature parity and architecture before any merge |

## Order of work
1. Hosting cutover and automatic-release acceptance are complete. Keep the latest evidence-only follow-up verified and record its actual production SHA/run in issue #1.
2. Preserve the completed domain routing, original DNS backup and independent MochaHost mail routes. Future changes must retain public DNS/mail and apex/www release checks.
3. Functional mailbox send/receive is a separate untested acceptance item; do not infer it from DNS success or send messages without authorization.
4. Continue authorized accessibility work only after the requested hosting acceptance is complete. Commercial booking and personal-data collection remain blocked by issue #2.

Completed tasks should be recorded in `docs/AGENT_HANDOFF.md` with the actual commit and Actions run IDs, not just moved between headings.
