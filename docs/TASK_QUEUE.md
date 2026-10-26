# Task queue — CUBARESORT.CA

Updated 2026-10-26. Always compare with the latest `main` before starting an item.

| Priority | Task | State / actual dependency | Definition of done |
|---|---|---|---|
| Done | Verify and protect published Pages release identity | **Completed** in `3e9e10376f22532f0d24242a5598055e29bdf324` (run 38773832573 passed live SHA + nine file digests) | Keep manifest and negative tests passing for future releases |
| Done | Verify automatic GitHub to Contabo releases | Queue delay recovered without configuration changes; current main `894e5eae` passed container/live run 38827678357 with exact SHA and nine digests | Keep exact-current-main container and external HTTPS verification passing |
| Done | Automatic GitHub-to-public-domain Contabo deployment — issue #1 | d646033 automatically deployed by native Webhook 5yufbgsdz9bccmoe9h15vnzc; container/live 38921978874 and Pages 38921978877 passed with production-ready true and apex/www exact SHA + all nine digests | Preserve checks; always verify newest main after subsequent releases |
| Done | Skip-link focus destination | `#main` is programmatically focusable without joining normal Tab order; main `fc877754` passed Pages 39083227914 and the successful retry of Coolify/container/live run 39083227917 | Preserve link/target regression and exact-release checks |
| Done | Empty-results reset focus | Main `be0895e12` passed container/live 39324278262 and Pages 39324278131 with exact SHA and all nine digests | Preserve regression and visible-focus behavior |
| Done | Strict browser delivery policy | CSP on production and Pages plus production framing/feature restrictions; main `31cb2c6a` passed container/live run 39074598019 and Pages 39074597959 | Preserve runtime header assertions and exact-release checks |
| Done | Honest no-contact fallback copy | Initial French directory claims and FR/EN/ES request-copy text aligned with the actual partial directory and copy-only draft; main `46ddfe58` passed run 39068210647 and Pages 39068210584 | Preserve honest copy and copy-only behavior |
| Done | Mobile navigation focus continuity | Hidden-link focus loss corrected for same-page activation and mobile-to-desktop transitions; main `0c184652` passed container, DNS/mail, all-host exact-SHA/nine-digest and Pages verification | Preserve focus behavior in browser/assistive-technology acceptance |
| Done | Disable unavailable email action | Hidden in initial HTML and CSS whenever verified recipient is unconfigured; clipboard remains usable; main `9809fd22` passed container, all-host exact-SHA/nine-digest and Pages verification | Reveal only after mailbox is explicitly authorized |
| Done | Hotel-specific inquiry clarity | Main `cd6ee53c` passed container/live 38973890981 and Pages 38973890951 with exact SHA and all nine digests | Preserve localized selected-hotel context and copy-only behavior |
| Done | Distinguishable repeated card actions | Main `423d3fdb` passed container/live 38968103017 and Pages 38968103038 with exact SHA and all nine digests | Preserve item-specific FR/EN/ES accessible names |
| Done | Reject past departure months in unsent travel drafts | Included in later exact-SHA/nine-digest verified releases, through current main `c8c328aa` | Preserve deterministic FR/EN/ES validation tests |
| Done | Reduced-motion navigation | Main `8c511044` passed container/live 38953151340 and Pages 38953151339 with exact SHA and all nine digests | Preserve both preference-aware navigation paths |
| Done | Visible keyboard focus in stay search | Main `25ba3ce4` passed container/live 38953495749 and Pages 38953495767 with exact SHA and all nine digests | Preserve the high-contrast focus-within regression |
| Done | Mobile menu action announcement | Main `87bfd630` passed container/live 38961583924 and Pages 38961583852 with exact SHA and all nine digests | Preserve FR/EN/ES state labels and language switching |
| Done | Mobile inquiry return focus | Main `37bba18e` passed container/live 39512111437 attempt 2 and Pages 39512111462 with exact SHA and all nine digests | Preserve visible return-focus target |
| Done | Hotel region-filter group name | Main `c8c328aa` passed 43 tests/build, container/live 39526121459 and Pages 39526121488 with exact SHA and all nine digests | Preserve the translated group relationship |
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
