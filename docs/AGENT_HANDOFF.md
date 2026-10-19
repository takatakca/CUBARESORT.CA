## 2026-10-19 — Preserve focus after clearing empty results (release pending)

- Verified starting production release: main `fc8777545a60b231c2334dc5557163f435ab1d2b`. Pages run [39083227914](https://github.com/takatakca/CUBARESORT.CA/actions/runs/39083227914) passed. Coolify run [39083227917](https://github.com/takatakca/CUBARESORT.CA/actions/runs/39083227917) passed after a clean replacement removed an orphan predecessor container; its retry completed both the production-container and external live jobs. Independent checks passed the exact full SHA and all nine digests on the generated Contabo host, apex and www, with the existing web/MX separation preserved.
- Verified keyboard defect: activating either empty-results reset button repopulated results and hid the empty-state container while focus remained on its now-hidden button.
- Fix: the stays empty reset now moves focus to the visible stays search input, and the hotel empty reset moves focus to the visible hotel search input. The always-visible reset buttons retain their existing behavior.
- Regression coverage protects both focus transfers. Scope is limited to keyboard focus, tests and continuity notes; no interface copy, DNS, mail, supplier data, booking/payment, personal-data collection or draft PR changed.
- Required release proof: validation/build, real production container, public DNS/mail separation, exact latest-main `release.json` and all nine digests on generated Contabo/apex/www, plus Pages fallback.

## 2026-10-17 — Make the skip-link destination focusable (release pending)

- Verified starting production release: main `31cb2c6ab3b5ad911039b3327da889c23fa28378`; [Coolify container/live run 39074598019](https://github.com/takatakca/CUBARESORT.CA/actions/runs/39074598019) and [Pages fallback run 39074597959](https://github.com/takatakca/CUBARESORT.CA/actions/runs/39074597959) passed. The exact full SHA and all nine digests passed at the generated Contabo host, apex, www and Pages; the container also asserted the production security headers.
- Verified accessibility gap: the visible skip link targeted the semantic `<main>`, but that element was not focusable. Browsers that only scroll a non-focusable fragment could leave the keyboard sequence in the header.
- Fix: give `#main` `tabindex="-1"` so native fragment navigation can move programmatic focus into the main content without adding it to normal Tab order. A regression test protects both ends of the skip-link relationship.
- Scope is limited to the focus target, test and continuity notes. No interface copy, DNS, mail, supplier data, booking/payment, personal-data collection or draft PR changed.
- Required release proof: validation/build, real production container, public DNS/mail separation, exact latest-main `release.json` and all nine digests on generated Contabo/apex/www, plus Pages fallback.

## 2026-10-17 — Enforce browser security policy (verified)

- Verified starting production release: main `46ddfe587802efbb8574345a650dc173b6d25415`; [Coolify container/live run 39068210647](https://github.com/takatakca/CUBARESORT.CA/actions/runs/39068210647) and [Pages fallback run 39068210584](https://github.com/takatakca/CUBARESORT.CA/actions/runs/39068210584) passed. The exact full SHA and all nine first-party digests passed at the generated Contabo host, apex, www and Pages; public DNS/web-versus-mail separation also passed.
- Verified security gap: production sent `X-Content-Type-Options` and a referrer policy, but did not restrict framing, browser features or the sources from which executable content could load.
- Fix: add a strict Content Security Policy, `X-Frame-Options: DENY`, and a least-privilege Permissions Policy to the production Nginx response. A matching CSP meta policy protects the static Pages fallback. The sole inline style was moved to the stylesheet, so neither policy requires `unsafe-inline`.
- Regression coverage checks the configuration and the real production-container response headers. No application behavior, third-party service, DNS, mail, supplier content, booking/payment flow, personal-data collection or draft PR is changed.
- Release verified as main `31cb2c6ab3b5ad911039b3327da889c23fa28378`: Coolify/container/custom-domain run 39074598019 and Pages run 39074597959 passed, including 39 tests, runtime security-header assertions, DNS/mail separation, and exact SHA plus all nine digests on the generated host, apex, www and Pages.

## 2026-10-17 — Keep no-contact and no-JavaScript claims honest (verified)

- Verified starting production release: main `0c184652431b0fb798c42b63280eee74bf9bc0d0`; [Coolify container/live run 38975920255](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38975920255) and [Pages fallback run 38975920298](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38975920298) passed. The container passed 37 tests plus health, exact-SHA, nine-digest and private-path checks; CI passed public DNS/web-versus-mail separation and all three production HTTPS hosts. Independent verification also passed the generated host, apex, www and Pages.
- Verified honest-functionality defect: the initial/no-JavaScript French markup still called the directory complete and claimed CUBARESORT could make offers, contradicting the maintained partial-directory copy and blocked supplier state. FR/EN/ES benefit and copy-success text also advertised email sending while the official contact address is unconfigured and the email action is hidden.
- Fix: synchronize the initial French directory markup with maintained translations and describe the request consistently as an unsent draft visitors can copy and keep in their chosen tool. The separate future email action and FAQ remain ready for an authorized monitored recipient.
- Regression coverage rejects the obsolete offer/completeness claims and email-send wording while `SITE_CONFIG.contactEmail` is empty. No supplier, pricing, inventory, booking, payment, personal-data, mail/DNS/hosting or draft PR change is included.
- Release verified as main `46ddfe587802efbb8574345a650dc173b6d25415`: Coolify/container/custom-domain run 39068210647 and Pages run 39068210584 passed, including 38 tests, runtime/private-path checks, DNS/mail separation, and exact SHA plus all nine digests on the generated host, apex, www and Pages. Functional mailbox delivery remains untested and no message was sent.

## 2026-10-16 — Preserve focus when mobile navigation closes (verified)

- Verified starting production release: main `9809fd22a034ead16db9714bf18be69a11d95e0b`; [Coolify container/live run 38974291261](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38974291261) and [Pages fallback run 38974291249](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38974291249) passed. The generated Contabo hostname, apex and www served the exact full SHA and all nine first-party SHA-256 digests; public web/MX separation passed.
- Verified keyboard-accessibility defect: activating a mobile same-page navigation link immediately hid the focused link without relocating focus to the destination. Changing from mobile to desktop width while focus was inside the mobile menu could likewise leave focus on hidden content.
- Fix: after native fragment navigation, focus the destination section heading; on transition to desktop width, focus the matching visible desktop link or the visible brand fallback. Escape behavior and localized open/close action names are unchanged.
- Regression coverage protects both focus-continuity paths. Scope is limited to `assets/app.js`, tests and continuity notes; no DNS, mail, hosting settings, draft PRs, supplier claims, pricing, booking, payment or personal-data collection changed.
- Release verified as main `0c184652431b0fb798c42b63280eee74bf9bc0d0`: Coolify/container/custom-domain run 38975920255 and Pages run 38975920298 passed, including 37 tests, runtime/private-path checks, DNS/mail separation, and exact SHA plus all nine digests on the generated host, apex, www and Pages.
- Next exact action: continue safe honest-functionality and accessibility checks without merging draft branches.

## 2026-10-16 — Remove unconfigured email CTA from live inquiry (verified)

- Verified predecessor: main `cd6ee53cbfbb36de7aa59bbb21f967c486eae61c` with 100%-successful [Coolify container/live 38973890981](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38973890981) and [Pages fallback 38973890951](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38973890951). The Contabo-generated hostname, apex and www served this exact SHA with all nine first-party SHA-256 file digests; public DNS/mail routing separation passed.
- Verified honest-functionality defect: an `Ouvrir mon courriel` (email) action remained visibly clickable even though the project has no authorized contact mailbox (`SITE_CONFIG.contactEmail` is empty), so the click could only report the unavailable recipient. The useful clipboard-draft action already works.
- Fix: default the email action to `hidden` in HTML to avoid initial flash, reveal it from `assets/app.js` only when an authorized contactEmail is configured, and explicitly enforce `display:none!important` against flex button rules. Keep existing extra runtime validation and existing mailto implementation for any future verified recipient.
- Regression in `tests/site.test.mjs` protects the hidden-unconfigured state and the visible clipboard action. No external recipient added, email sent, PII captured, marketing integration, DNS/mail/Coolify changes, prices, bookings or PR #3/#5/#7/#8 merges.
- Files changed: `index.html`, `assets/app.js`, `assets/styles.css`, `tests/site.test.mjs`, `docs/AGENT_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`.
- Release verified as main `9809fd22a034ead16db9714bf18be69a11d95e0b`: Coolify/container/custom-domain run 38974291261 and Pages run 38974291249 passed, including the exact SHA and all nine digests on the generated host, apex and www.
- Remaining blocker issue #2: verified supplier/operator and legal/consent approvals before live reservation/lead/payment flows. Real end-to-end mail delivery is untested; do not send external messages without authorization. PR #7 and #8 are independently reviewed draft branches and not production code.
- Next exact action: continue actionable browser, accessibility and license checks without an unreviewed draft merge.

## 2026-10-16 — Visible selected-hotel context for unsent inquiries (release pending)

- Starting main: `423d3fdb5b9f03020b32d4b6465af1750322ea3b`, verified by [Contabo container/live run 38968103017](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38968103017) and [Pages fallback run 38968103038](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38968103038). The new #7 and #8 hotel-microsite and guide PRs are **draft branches**, with successful PR tests but no approved production merge; preserve their independent scope.
- Verified behavior gap: the hotel-specific unsent draft included the selected hotel in its copied text, but the inquiry modal displayed only the region, giving no visible or screen-reader confirmation of the chosen property. Visitors could not see whether their hotel selection persisted.
- Implemented a visible, accessible, locale-aware `#inquiry-hotel-context` summary derived only from the trusted local directory. It appears only for a selected hotel, updates when language changes, and disappears when region changes or a generic inquiry is opened. The existing copied draft still contains the property name and continues to transmit/store no personal data.
- Files changed: `index.html`, `assets/app.js`, `assets/request.js`, `assets/styles.css`, `tests/site.test.mjs`, `docs/AGENT_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`.
- Tests added: FR/EN/ES pure-function display validation; unknown ID/language handling; markup and event handler regression. No supplier prices, rates, bookings, marketing data capture, DNS, mail, Coolify configuration, Next.js migrations or draft PR changes.
- Last completed task: published accessible repeated-card labels from `423d3fdb5b9f03020b32d4b6465af1750322ea3b`. Current task: run CI tests/build, actual Docker container, live HTTPS exact-new-main SHA and all **nine** first-party SHA-256 digests at the Contabo host, apex and www; verify DNS/mail separation and Pages fallback. The pushed SHA must be read from the actual main branch.
- Known limitations: actual mail send/receive remains untested. Commercial supplier/operator legal agreements, real inventory and payment requirements remain open in issue #2. The unrelated #3/#5 Next.js and draft #7/#8 developments have not been merged.
- Next exact action: examine new main GitHub Actions container/live and Pages runs and their published full SHA/checksums; fix any demonstrated failure before claiming deployment. Continue real-device accessibility/browser and image rights reviews when authorized.

## 2026-10-16 — Item-specific card action names (release pending)

- Starting verified production baseline: main `87bfd6304017b63d5e8366da7cecedff97c9ccf0`; Coolify/container/custom-domain run [38961583924](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38961583924) passed on retry after its queued native webhook deployment completed, and Pages fallback run [38961583852](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38961583852) passed. Exact SHA and all nine digests were verified at the generated Contabo hostname, apex, www and Pages.
- Verified accessibility defect: every favourite control exposed the same accessible name, every experience request control exposed the same visible-only name, and all property request controls likewise repeated one name. Screen-reader button navigation therefore did not identify the card each action controls.
- Added localized FR/EN/ES item-specific accessible names for favourite/unfavourite and request actions while preserving the existing visible labels. The shared interpolation helper is directly tested, including all four templates in every locale.
- Scope is limited to `assets/i18n.js`, `assets/app.js`, tests and continuity notes. No DNS, mail, hosting configuration, supplier content, booking, payment, personal-data collection or draft PR #3/#5/#7 changes.
- Required release proof: 35 tests/build, production container, public DNS/mail separation, exact latest-main `release.json` and all nine digests at the generated Contabo hostname, apex and www, plus Pages fallback. Functional mailbox delivery remains untested and no email was sent.
- Next exact action: publish as a normal expected-head fast-forward only if `main` remains at the starting baseline, then inspect both resulting workflows and fix only demonstrated release failures.

## 2026-10-16 — Mobile navigation action announced correctly (release pending)

- Starting production baseline: main `25ba3ce46118a97aaa8262e3cd14cd08dc49f2c1`; Coolify/container/custom-domain run [38953495749](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38953495749) and Pages fallback run [38953495767](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38953495767) passed.
- Verified defect: the mobile-menu button retained the localized “Open menu” accessible name while expanded. It now announces the state-appropriate “Open menu” / “Close menu” action in French, English and Spanish, including after an in-place language change.
- Regression coverage guards all six localized action labels and the shared menu-state updater. No DNS, mail, hosting, inventory, booking, payment, personal-data or Next.js PR #3/#5 changes.
- Required release proof: validation/build, production container, public DNS/mail separation, exact latest-main `release.json` and all nine digests at the Contabo hostname, apex and www, plus Pages fallback. Functional mailbox delivery remains untested and no email was sent.
- Next exact action: inspect the resulting main workflows and repair only a demonstrated failure before calling this change live.

## 2026-10-16 — Restore visible keyboard focus on the stay-search field (release pending)

- Verified predecessor: `8c511044cb0232632940e38c42dc2e57cc2c02cd` successfully deployed to Contabo and both public `cubaresort.ca` hostnames with exact SHA and nine file digests (run [38953151340](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38953151340)); Pages fallback succeeded (run [38953151339](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38953151339)).
- Confirmed in `assets/styles.css`: global `input:focus-visible` is overridden later by the more-specific `.text-search input{outline:0}`, making keyboard focus on the stay-search field invisible. Applied a high-contrast, 3px `.text-search:focus-within` outline to its wrapper to restore a consistent visible focus indicator while keeping the input's clean visual treatment.
- Regression test in `tests/site.test.mjs` checks that this focus ring accompanies the outline suppression. Files changed: `assets/styles.css`, `tests/site.test.mjs`, `docs/AGENT_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`.
- No DNS, mail, Coolify configuration, booking, payment, provider data, personal-data collection or PR #3/#5 changes.
- Last completed task: preference-aware scroll deployed and verified as `8c511044cb0232632940e38c42dc2e57cc2c02cd`; current task: validate/build and verify actual main-push container and public-domain release for this focus fix.
- Required checks: Node 22 `npm run validate`, `npm run build`, production Docker image/runtime tests, DNS/mail separation and HTTPS `release.json` full latest-main SHA plus nine SHA-256 file digests on Contabo, apex and www, and Pages fallback. Read new SHA from GitHub after push.
- Known limits: actual mail send/receive not verified; issue #2 suppliers/booking/legal/privacy and TAKATAK tenant-scoped backend approvals pending; cross-device assistive-technology and image rights remain open.
- Next exact action: check `main` and both latest Actions workflows, inspect exact deployed SHA and nine checksums; resolve a failing verification before claiming release.


## 2026-10-16 — Reduced-motion destination navigation (CI / release pending)

- Starting `main`: `31e5911f6dce61b145b00d6226a6b11a753cc0be`. The actual Coolify production-container and HTTPS verification in [run 38922319385](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38922319385) passed full SHA and all nine SHA-256 asset digests at the Contabo hostname, https://cubaresort.ca/ and https://www.cubaresort.ca/ with `PRODUCTION_READY=true` and DNS/mail host separation. Pages fallback [run 38922319404](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38922319404) passed.
- Verified accessibility problem: the destination-card click handler used `scrollIntoView({behavior:"smooth"})` unconditionally. This explicit option ignores the CSS `prefers-reduced-motion` handling. The separate search-filter submit handler already respected the preference.
- Correction in `assets/app.js`: route **both** interactions through one preference-aware `scrollToExperiences()` that uses `auto` for reduced motion and `smooth` otherwise. A regression guard was added to `tests/site.test.mjs` for both entry points.
- Files changed in this patch: `assets/app.js`, `tests/site.test.mjs`, `docs/AGENT_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`. No hosting, email DNS, payment, real inventory, personal-data collection, or Next.js PR #3/#5 changes.
- Last completed task prior to this patch: confirmed automatic public-domain release `31e5911f6dce61b145b00d6226a6b11a753cc0be`. Current task: validate, build, and verify a new exact-`main` production release following this one safe code change.
- Required checks: `npm run validate`, `npm run build`, production image/container health and integrity, read-only DNS/mail separation, Contabo + apex/www HTTPS `release.json` full SHA and all nine first-party SHA-256 digests, and Pages fallback. New commit SHA must be read from GitHub after push; it cannot be embedded in its own tree.
- Known remaining blockers: issue #2 needs authorized supplier/operator/legal identity and tenant-scoped booking/lead integrations. Actual functional mail send/receive testing was never authorized and remains unverified, despite DNS separation; do not claim otherwise. Hardware/assistive-tech accessibility acceptance and photo rights remain outstanding.
- Next exact action: inspect the two latest `main` GitHub Actions runs for the new SHA and their release logs. Fix actual CI failures if any; preserve the closed DNS issue #1, current mail routing, and production-ready checks.


## 2026-10-16 — Automatic public-domain production release verified

Main `d64603349ed7c967590c41b7e2005cab391142de` automatically deployed through native Coolify Webhook `5yufbgsdz9bccmoe9h15vnzc` on 2026-10-16. Production container/live [run 38921978874](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978874) and Pages [run 38921978877](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978877) both passed. The live job explicitly reports `PRODUCTION_READY: true`, public DNS/mail separation, and full SHA plus all nine file digests on both apex and www.

The reported 404 is resolved and the requested separate Contabo hosting plus automatic GitHub-to-live pipeline is accepted. PR #6 is merged. No manual start was used for the accepted webhook release. Preserve the production-ready flag and apex/www checks, mail separation, Pages fallback and rollback backups. Functional mailbox delivery remains untested; no message was sent. This evidence-only follow-up is another main release: require its own latest-main workflow and live verification, and keep the final accepted SHA/run/deployment evidence in issue #1 rather than creating an endless documentation-release loop.

The previous entry's merge/verify next action is complete. Future work begins by reading current main and actual production checks. Do not reopen the obsolete DNS synchronization ticket or request the same login.

## 2026-10-16 — Public Coolify domain activated; production acceptance enabled

- Owner confirmed DNS repair. Fresh public DNS now resolves apex/www to Contabo `31.220.96.134`; separate MX `mail.cubaresort.ca` resolves to MochaHost `209.42.24.127`, with no apex/www IPv6. The read-only mail-safe DNS guard passed via a public DoH lookup adapter.
- Root cause of the reported public 404: Coolify's saved apex/www domain configuration had not been applied. Manual deployment `1ckyac9swtil2zrjjhezhrcb` applied it at 15:06:16 UTC; the existing image and exact main `ff907675207f32f0d113f07f01a1d7d11c97ed0e` became healthy on the first Docker health attempt.
- Independent HTTPS checks passed on **both** https://cubaresort.ca/ and https://www.cubaresort.ca/: full SHA and all nine file digests. Both `/healthz` endpoints returned 200 `ok`; HTTP redirects to the matching HTTPS hostname. No certificate-validation bypass was used.
- Repository variable `CUBARESORT_COOLIFY_PRODUCTION_READY=true` enables public DNS/mail separation and custom-domain release acceptance. The workflow now verifies both apex and www, and retries the full release group during rolling replacement.
- This operations PR updates continuity and deployment instructions, preserving the 25-record DNS export, document-root archive, existing nameservers, separate mail and Pages fallback. No application features or commercial integrations change.
- Next exact action: merge this tested PR, let the existing **GitHub App webhook** deploy the resulting main SHA without manual start, require both Actions workflows to succeed, then independently verify that full SHA and all nine digests on apex/www. Record the resulting commit, native webhook deployment and run links in issue #1. A successful manual routing repair alone is not the final automatic-release proof.
- Functional send/receive mail has not been tested; no external email was sent. Keep this limitation separate from verified DNS/mail routing. Historical missing-zone, REFUSED and pending-domain entries below are superseded; the prepared provider support ticket was never submitted and is no longer needed.

## 2026-10-16 — MochaHost portal authenticated; provider repair ticket prepared

The owner completed customer-portal login. Authenticated hosting/domain controls and bolonca cPanel SSO were verified. The saved Contabo A, independent MochaHost MX/mail A and service routes persist; fresh direct public nameserver queries remain REFUSED while local DNS answers authoritatively. Hosting/domain General and Settings have no DNS-sync control. Prepared a Support ticket for bolon.ca (Ultimate), subject `cubaresort.ca DNS outage - authoritative nameservers return REFUSED`, asking MochaHost to publish the existing preserved zone. It is unsubmitted pending explicit authorization to send the external support message. The next step is approval to send this concrete draft, not another login request. Main remains ff907675 and PR #6 remains a checkpoint; production-domain acceptance is incomplete.

## 2026-10-16 — bolonca zone found; custom-domain settings saved

The owner supplied an actionable access route: cubaresort.ca is now visible in bolonca cPanel. Backed up its 25 DNS records and existing document root; saved web A to Contabo, independent mail/MX and MochaHost service routes, and apex/www HTTPS domains in the existing Coolify application. Public authoritative nameservers still return REFUSED, causing public SERVFAIL; the MochaHost portal login did not complete. Coolify domain changes remain pending and production-ready remains disabled. See `docs/DOMAIN_CUTOVER_20261016.md` for exact values, backup limits and the next action. Keep issue #1 open. Current main ff907675 passed container/live run 38852247513 and Pages run 38852247489; independent full-SHA/nine-file verification passed. Do not repeat the earlier claim that the zone is absent, or claim the public domain is live.

## 2026-10-16 — Verified past-departure validation release

- Last verified `main` at task start: `ab4325811e9418d96aa06990d987f1eb1a66d07a`. Main Coolify/Contabo actual production-container and HTTPS SHA-256 verification passed in [run 38828658167](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38828658167); Pages fallback passed in [run 38828658021](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38828658021). The proof log reports exact main SHA and all nine first-party file digests.
- Verified code defect: `assets/request.js` accepted a syntactically valid **past** YYYY-MM departure month, despite `assets/app.js` setting the form input's minimum month when opening the draft. The previously selected stale month also survived reopening the dialog.
- Fix: `formatTravelRequest` rejects past months using the user's local current month, with an injectable clock for deterministic tests; `openInquiry` clears a stale month if an existing draft is reopened later. The month remains optional; FR, EN and ES are preserved.
- Added regression tests for earlier month, prior year, current month, next year, empty month in all three locales, and source-level stale-input reset protection. No submission/PII, booking, supplier, payment, DNS or unrelated Next.js PR changes.
- Files modified: `assets/request.js`, `assets/app.js`, `tests/site.test.mjs`, `docs/AGENT_HANDOFF.md`, `docs/TASK_QUEUE.md`, `docs/PROJECT_STATUS.md`.
- Release commit `681fbff3696b0e5d991a111ebe33d11ae90c22e4` passed all 32 tests and the production build. Pages fallback run [38848617974](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38848617974) passed.
- Coolify/Contabo run [38848617953](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38848617953) passed the actual production-container job and exact public HTTPS verification. The live job initially observed the previous SHA, then one short mixed rolling-replacement response where `release.json` preceded `assets/request.js`; the following attempt passed after the deployment stabilized.
- Independent verification on 2026-10-16 confirmed the full live `release.json` SHA, all nine first-party SHA-256 digests, and HTTP 200 from `/healthz` at the selected Contabo URL. Issue #1 records the evidence.
- Current task: continue independently executable keyboard, multilingual and browser acceptance without changing the blocked custom-domain zone or enabling commercial flows.
- Known blockers unchanged: issue #1 existing MochaHost authoritative DNS zone inaccessible and apex MX mail routing not separated; `cubaresort.ca` returns Passenger/Apache HTTP 500. Issue #2 requires approved suppliers/operator/legal prerequisites. PRs #3/#5 remain separate.
- Next exact action: verify the documentation-only release generated by this handoff update, then continue realistic accessibility/browser acceptance. Do not cut over `cubaresort.ca` until existing-zone export and mail separation are authorized and complete.

## 2026-10-15 — Verified multilingual accessible-name release

- Commit `050fd18cdac1ea1a84299be1317bc4155b796bb3` translates eight explicit accessible names with the selected FR/EN/ES locale: brand/home, desktop and mobile navigation, search region, two illustrative images, stay sorting and property-region filtering. Regression coverage raises the suite to 31 tests; local validation/build and the real production-container job passed.
- Pages fallback run [38826028471](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38826028471) passed. Initial Coolify run [38826028392](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38826028392) passed the production-container job but expired while the public resource remained on prior release `111ad1719cf055bebbf935252f42e75568d831e9` for its ten-minute window.
- The queued webhook later advanced normally. Documentation follow-up `894e5eae6fe0aad0bfdd4411bcd328d07511373b` passed Pages run [38827678397](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38827678397) and Coolify container/live run [38827678357](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38827678357). Independent HTTPS verification passed the exact current-main SHA, all nine asset digests and `/healthz=ok`.
- Live browser inspection confirmed all eight English, Spanish and French accessible names after language switching. The temporary queue delay recovered without hosting configuration changes.
- Custom-domain issue #1 is unchanged and remains open; no DNS, mail, nameserver or production-ready setting was changed.

## 2026-10-15 — Verified inquiry-dialog keyboard containment release

- Release commit: `e6dd1d26a36e72ca580bcfb79a8bae1b24eaa0f5` (normal expected-head fast-forward of `main`).
- Fresh live keyboard testing found that the native inquiry dialog restored the opener after Escape, but forward Tab moved from its last action to the page body before cycling back. The dialog also lacked an explicit accessible-name relationship.
- Added an explicit focus loop for every modal dialog, including reverse Shift+Tab handling, and linked the inquiry/legal dialogs to their visible headings with `aria-labelledby`.
- Added static regression coverage in `tests/site.test.mjs`. No DNS, mail, booking, personal-data or Next.js work changed.
- Files changed: `index.html`, `assets/app.js`, `tests/site.test.mjs`, and continuity documents. `npm run validate` passed 30/30 tests and `npm run build` passed locally; Docker was unavailable locally and therefore exercised by CI.
- Pages run [38818276543](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38818276543) passed. Coolify run [38818276620](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38818276620) passed the actual production-container job and automatic Contabo release verification.
- During rolling replacement, one independent verification correctly rejected a short mixed response where the new `release.json` preceded the new `assets/app.js`. After the replacement stabilized, the exact SHA, homepage/application/style/catalog bytes, all nine manifest digests and `/healthz=ok` passed independently. No stale release is claimed.
- Current task: continue real-device/screen-reader and multilingual acceptance where executable without touching the blocked domain zone.
- Known blockers remain unchanged: issue #1 requires existing-zone access, full DNS export and separated mail before any cutover; issue #2 requires supplier/operator/legal authorization; PR #3/#5 remain separate.
- Next exact action: verify the documentation follow-up release generated by this handoff, then continue FR/EN/ES dialog and mobile assistive-technology acceptance.

## 2026-10-15 — Verified Passenger/DNS safety release

- Release commit: `2538d9d41ca43ab8df723051e8aeb4aee86fa937` (normal non-forced main update).
- Pages fallback run [38792654944](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38792654944) passed. Coolify run [38792655057](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38792655057) passed production-container testing, but its first live-verification attempt expired seven seconds before the queued Coolify deployment exposed the new SHA. The failed job was retried without rebuilding and attempt 2 passed after the deployment was live.
- Independent HTTPS verification confirmed `release.json` SHA `2538d9d41ca43ab8df723051e8aeb4aee86fa937`, all nine first-party SHA-256 file digests and `/healthz` at https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ .
- Added the read-only `scripts/check-domain-dns.mjs` custom-domain preflight and eight DNS safety tests. It rejects apex-following MX, mail following the Contabo web target, missing mail records, wrong apex/www web records and unexpected IPv6. The guard remains disabled until `CUBARESORT_COOLIFY_PRODUCTION_READY=true` is deliberately set after authorized zone export and mail separation.
- The supplied Android screenshot and independent HTTP check confirm the legacy MochaHost endpoint still fails through Phusion Passenger/Apache HTTP 500. This does not affect the independent healthy Contabo container.
- No DNS, nameserver or mail record was changed. Issue #1 remains open because the existing authoritative zone/site account is still unavailable and MX still points to the apex. PR #3 and PR #5 remain separate and unmerged; bookings, payments and personal-data collection remain disabled.
- Files in the release: `scripts/check-domain-dns.mjs`, `tests/domain-dns.test.mjs`, `.github/workflows/coolify.yml`, `package.json`, and continuity documents.
- Verification: `npm run validate`, `npm run build`, production Docker/container checks, Pages deployment, Contabo exact-SHA live verification and nine asset digests.
- Current task: continue independently executable browser/keyboard/screen-reader and multilingual acceptance work without touching the blocked domain zone.
- Next exact action: inspect the newest main release generated by this handoff update, then verify its container, HTTPS `release.json` SHA and all nine digests before claiming it current.

## 2026-10-15 — Verified keyboard-focus release on Contabo and Pages

- Functional commit: `b607f3bfaa0c81585237547f8c3c690e87fce11e` (non-forced fast-forward of `main`).
- GitHub Actions container/live run [38790752444](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38790752444): **success**. Production container tests passed, and the live verifier returned `PASS` for the exact SHA plus all nine first-party SHA-256 file digests at https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ .
- Pages fallback run [38790752455](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38790752455): **success** including deployment and public exact-SHA file checks.
- Files changed in the functional commit: `assets/app.js`, `tests/site.test.mjs`, `docs/AGENT_HANDOFF.md`, `docs/TASK_QUEUE.md`, `docs/PROJECT_STATUS.md`. Restoring focus prevents keyboard navigation from falling back to the page body after replacing region chips/favourite cards.
- CI commands executed: `npm run validate`, `npm run build`, actual `docker build` / container smoke testing, `npm run verify:live` at the HTTPS Contabo URL; Pages fallback checks passed as well.
- This documentation evidence creates a *new* commit. For the latest release after this entry, check the current `main` SHA and both new Actions deployments; do not assume this historical SHA is the latest.
- No new existing-zone access appeared. Issue #1 remains blocked by MochaHost's inaccessible authoritative DNS zone, its apex MX and the broken Apache custom-domain site. No web DNS, mail or nameservers were changed. Issue #2 and PR #3/#5 are separate.
- Current task: confirm the fresh documentation-only `main` release using container/live checks and nine file digests, then proceed to independently executable keyboard/screen-reader and multi-language acceptance work.
- Next exact action: inspect the next `main` Coolify GitHub Actions run (both jobs), verify the `release.json` full SHA and all asset SHA-256 hashes, and keep `cubaresort.ca` issue #1 open pending a mail-preserving authorized cutover.

## 2026-10-15 — Keyboard focus preservation on dynamic controls (release pending)

- Verified main baseline: `382585a29cf1d15f81a63961bebbbd13a031271b` with existing Coolify HTTPS production and Pages fallback. Recent PR #5 workflows are on a different SHA and do not supersede main.
- Found a reproducible-by-code keyboard accessibility defect: rebuilding the selected region chip group or toggled favourite card removes the focused DOM button, discarding keyboard focus.
- `assets/app.js` now restores focus to the corresponding new region chip or favourite button after the re-render, without scrolling; `tests/site.test.mjs` guards both behaviors.
- Updated this handoff and `docs/TASK_QUEUE.md` / `docs/PROJECT_STATUS.md`; no secrets, DNS, e-mail, commercial inventory or Next.js migration changed.
- Commands to verify: `npm run validate`, `npm run build`, the actual Docker container smoke tests, and `npm run verify:live -- --url https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ --sha CURRENT_MAIN_SHA`.
- Last completed task: implementation and regression-guard changes, subject to a successful CI release. Current task: inspect main Actions for completed build, container and live HTTPS integrity, then record the SHA from actual main.
- Known blockers remain: existing MochaHost DNS zone unavailable, apex MX to apex and HTTP 500 on `cubaresort.ca`; do not cut over without backing up every record and preserving mail (issue #1). Suppliers, legal identity and bookings (issue #2) blocked; PR #3/#5 separate.
- Next exact action: inspect the newest main-push Coolify run and its live proof; if a job fails, fix the demonstrated failure without changing DNS.

## 2026-10-15 — Verified automatic Contabo release

- Release `5f47930af670fa387f6f5990b42394d8c62a7d11` was pushed normally to main. [Coolify container and live run 38776838876](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38776838876) passed both actual container testing and exact-current-main HTTPS/file-checksum verification. Pages fallback run 38776838801 also passed.
- Native GitHub App push created the Coolify **Webhook** deployment `xofxdyeudps7innbmlkqzwzv`, on the separate CUBARESORT resource `ci7ltew4v50e4fwq63tfvtg6`. It finished successfully at 2026-10-15 17:25:57 UTC; Docker healthcheck passed on the first attempt. The shared server had a deployment queue, so Force start was used once to advance this already webhook-created deployment. No other application's deployment was cancelled or changed.
- HTTPS URL **https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/** renders the current static portal in the browser. Browser smoke checks confirmed property search, reset to all 169 properties, inquiry-dialog opening and Escape dismissal. All 20 application tests and the production container smoke checks passed. GitHub's external verifier confirmed full SHA and all nine first-party file digests, not only a green homepage.
- Saved Coolify settings were re-read: Dockerfile `/Dockerfile.coolify`, internal `8080`, source commit available during build, build arguments managed explicitly, auto deploy **Deploy on push (webhooks)**, HTTPS enabled, DNS matches. The Dockerfile healthcheck controls readiness and rolling replacement.
- Fresh public DNS still returns `cubaresort.ca A 209.42.24.125`, no AAAA, and `MX 0 cubaresort.ca.`; a new HTTPS request still returned Apache 500. The existing authoritative DNS-zone access blocker remains. This is a completed Contabo installation and release pipeline, **not a completed cubaresort.ca cutover**. Keep issue #1 open. No DNS/mail settings were changed or inaccessible legacy files backed up.
- This evidence update creates another release SHA. Inspect its new workflow and webhook deployment, and verify the new SHA before reporting it as current. The next infrastructure action remains access to the existing zone/site account, export, preservation of the current mail route, apex/www cutover to verified Contabo, then certificate/domain/mail acceptance.

## 2026-10-15 — Authorized Coolify / Contabo migration setup

The owner requested the same automatic GitHub-to-Contabo behavior as the other independent applications. Created the separate CUBARESORT production project and GitHub App resource `ci7ltew4v50e4fwq63tfvtg6` on `31.220.96.134`. Added a test-gated unprivileged Nginx Dockerfile, runtime health check, real container CI and exact-main HTTPS verification. Preserved the newer nine-file SHA-256 manifest and all current product behavior from baseline `8e1459335f23cb085b04431e1ec15f8c3d256d74`. See `docs/DEPLOYMENT.md` for exact settings. Deployment, certificate, webhook evidence and the custom-domain cutover still require verification; this entry does not claim them complete. Existing DNS access and apex MX constraints remain until new verified access exists.

## 2026-10-15 — Completed verified release-integrity implementation

- Code and continuity commit: [`3e9e10376f22532f0d24242a5598055e29bdf324`](https://github.com/takatakca/CUBARESORT.CA/commit/3e9e10376f22532f0d24242a5598055e29bdf324), pushed as a non-forced main fast-forward.
- GitHub Actions run [38773832573](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38773832573): static checks, automated tests, build, Pages deployment and live HTTPS verification all **successful**.
- The deployment job log proves that the public Pages URL returned exactly SHA `3e9e10376f22532f0d24242a5598055e29bdf324` and passed SHA-256 checks for all nine first-party release files.
- All five required continuity documents now exist: `AGENTS.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/DEPLOYMENT.md`, and `docs/DECISIONS.md`. The existing handoff/checklist were updated.
- Latest release claim must always follow the current `main` HEAD; this documentation follow-up is itself a new commit and triggers a fresh Pages build. Verify that newer deployment before reporting its SHA.
- Last completed task: release-file digest verification and baseline continuity files. Next actionable task: improve real browser keyboard/screen-reader acceptance when available; do not attempt DNS cutover without the existing zone's authorized access.
- No new authorized DNS access route appeared. `cubaresort.ca` remains Apache 500 and issue #1 remains OPEN. Preserve MX mail routing and complete DNS record export before any approved cutover.
- Operator/supplier/commercial booking issue #2 remains OPEN. PR #3 Next.js work remains separate.

## 2026-10-15 — Agent continuity and byte-verified publication

### Baseline evidence
- The verified main baseline for this task was `fb5f9d60e9ee251d59121d94f27c4231ac8c9d2a`.
- Its GitHub Actions run [38745782187](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38745782187) reported successful validation, actual GitHub Pages deployment and HTTPS exact-SHA/asset presence verification.
- The Pages URL is https://takatakca.github.io/CUBARESORT.CA/ . Independent public Pages retrieval was unavailable from this session's web clients; do not present that as a fresh independent verification.
- The custom domain `cubaresort.ca` still returned Apache HTTP 500 on an attempted public request. Its existing MochaHost zone is not exposed in the previously inspected cPanel/WHM accounts. Issue #1 remains open; MX pointing to the apex must be preserved during any future authorized cutover.
- Issue #2 still lacks supplier/operating/legal authorizations. Next.js PR #3 remains unrelated and unmerged.

### Work in this changeset
- Added `AGENTS.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/DEPLOYMENT.md`, and `docs/DECISIONS.md` for durable agent restart.
- `scripts/release-assets.mjs` enumerates published first-party files; `scripts/build.mjs` adds their SHA-256 digests to generated `release.json`.
- `scripts/verify-live.mjs` now hashes actual HTTPS bytes to detect mixed/stale files returning HTTP 200; `tests/deployment.test.mjs` adds negative regression cases.
- `tests/site.test.mjs` enforces presence of the required continuity files; README and production checklist explain the new acceptance gate.
- Files changed are limited to release verification, tests and documentation; no mail/DNS settings, credentials, personal-data intake, reservations or payments were touched.
- Last confirmed release before these edits: `fb5f9d60e9ee251d59121d94f27c4231ac8c9d2a`. For the latest pushed SHA, read the current `main` HEAD directly; a commit cannot include its own SHA.
- Validation commands: `npm run validate`, `npm run build`, `npm run verify:live -- --url https://takatakca.github.io/CUBARESORT.CA/ --sha FULL_MAIN_SHA`.
- Current task: obtain passing tests, actual Pages deployment, and the newly required checksum-verified public release at the new `main` commit.
- Known blockers: custom-domain Apache 500 / unavailable existing DNS zone account; mail-preserving cutover; supplier/operator/legal approvals; real-device acceptance outstanding.
- Next exact action: inspect the latest `main` workflow jobs, then verify public `release.json` SHA and byte digests. Fix deployment failures. Keep issue #1 open until authorized custom-domain HTTPS matches current `main` and mail is verified.

## 2026-10-15 — Authorized deployment repair

The owner requested immediate resolution of issue #1 and draft PR #4. Reused PR #4; PR #3's incomplete Next.js conversion remains separate.

- GitHub Pages source was successfully saved as **GitHub Actions** in the authenticated repository settings. The earlier `has_pages: false` report is historical.
- The workflow now validates pull requests as well as main pushes. Deployment is limited to main, after successful checks, with Pages/OIDC write permissions scoped to the deployment job. Configuration/publication failures are real failures instead of silent green skips.
- Builds publish `release.json` containing only the application name, full source SHA and build time. The release workflow verifies the exact public HTTPS commit, homepage, JavaScript, CSS and hotel directory; a green build alone is insufficient.
- PR #4 was marked ready, automatically validated in run [38742979223](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38742979223), and merged as `daa6f4a8d7daf62f87a3d5dcdb24e7c2e6fd84cd`. All 18 tests, syntax checks and the static build passed. Escape/focus restoration and desktop-resize behavior are retained; real mobile/screen-reader acceptance testing remains open.
- Main push run [38743595259](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38743595259) passed both validation and the actual Pages deployment, including the exact public HTTPS release check. Independent `verify:live` confirmed that full merge SHA, the homepage, JavaScript, stylesheet and property directory. The browser rendered the English site and its 169-property directory.
- Verified public deployment: **https://takatakca.github.io/CUBARESORT.CA/**. Every future main push runs the same tested publication and exact-commit verification. This does not establish that the custom domain is healthy.
- Public hosting inspection: `cubaresort.ca` A is `209.42.24.125`, no AAAA, `www` aliases the apex, and HTTP/HTTPS return Apache 500. MX currently points to **cubaresort.ca itself**. Any web DNS cutover must first retain mail delivery at the existing mail host/IP; do not point that MX at GitHub Pages.
- The Vercel preview `https://cubaresort-ca.vercel.app/` now answers HTTP 200. The historical API 403 is not evidence that the preview is unavailable; Vercel administration is unnecessary for the selected Pages path.
- Authenticated hosting inspection confirmed that the accessible application-hosting cPanel and the separate reseller WHM DNS Zone Manager both return no matching zone for `cubaresort.ca`. The registered domain is present in the owner's MochaHost portal, with the four `ns1`–`ns4.mysecurecloudhost.com` nameservers, but its authoritative zone is not exposed in either available hosting account. Do not create a replacement zone or change nameservers without the existing records. No DNS, mail, billing or cancellation changes were made.
- Remaining intervention: obtain access to the existing `cubaresort.ca` DNS zone/site account serving `209.42.24.125`, or ask MochaHost to attach that existing zone to the authorized account. Export all records and preserve the apex MX's mail destination before changing web DNS; then connect the Pages custom domain and verify HTTPS plus the current main SHA. Keep issue #1 open until this domain acceptance passes. Never put credentials or authenticated session URLs in Git or chat.
- The existing hourly follow-up can resume in English to verify main, Actions and the working Pages URL, and report only significant changes. The known DNS access blocker must not be mistaken for another Pages activation failure or a reason to repeatedly request the same unavailable access.

Commercial booking, payment, supplier and lead collection remain outside this deployment repair. All existing FR/EN/ES content and GROUPE TAKATAK boundaries are preserved.

Updated: 2026-10-14

## Starting repository state

- Repository: takatakca/CUBARESORT.CA
- Default branch: main
- Pre-development commit: 1b567d6a6bc982a8b2058066e4ad2733cf5712f4 (Initial commit)
- Only original file: README.md containing one line (# CUBARESORT.CA).
- No issues, PRs, existing application code or handoff documents in the original tree.

## First phase decision

With no product specification and no existing implementation, deliver a usable Cuba travel inspiration website. It must not impersonate a reservation engine or advertise unverified inventory. The booking provider, operator legal identity, contact mailbox, production hosting and payment arrangement are currently unknown.

## Implementation guide

- index.html and assets/styles.css: UI and responsive styles
- assets/app.js: rendering, filtering, sorting, saved favourites, language switch, request draft
- assets/catalog.js: editorial inspiration data, not confirmed hotel listings
- assets/i18n.js: FR/EN/ES copy, FAQs and temporary legal text
- assets/config.js: external integrations disabled by default
- scripts/: Node preview server and output packaging
- tests/: built-in Node tests
- .github/workflows/publish.yml: main push validation and GitHub Pages attempt
- docs/PRODUCTION_CHECKLIST.md: requirements and deployment blockers

## Next agent tasks, prioritized

1. Fetch latest main commit and Actions workflow run; inspect logs; address any errors without force pushing over someone else's work.
2. Confirm actual Pages/DNS/hosting status. Use GitHub Pages only if authorized and configured, otherwise arrange a static output deployment to the verified CUBARESORT.CA cPanel root.
3. Test in real browsers and on mobile, then correct layout and accessibility issues.
4. Confirm operator identity, a working email mailbox and legally reviewed policies before allowing real lead collection.
5. Obtain approved resort suppliers, feature requirements and booking agreements before building a secure backend, quote and transaction pipeline.
6. Continue by fixing verified issues, updating tests and recording each completed commit and deployment in this handoff.

## Non-negotiable constraints

- No fabricated prices, reviews, room availability, booking confirmation or hotel-specific photo claims.
- No API keys or sensitive traveller data in the static client.
- Preserve all three locales and keyboard accessibility.
- GROUPE TAKATAK retains the master identity/customer-data authority; all vertical business data must be tenant scoped.
- An information-site deployment is not a live commercial booking launch.

## 2026-10-14 release verification

- Feature release commit: 637a25cbb27494e7d6e3b97c396c02fe5bed3b19 pushed to main.
- GitHub Actions run #38617962103: static validation and build **passed**. Publish job **failed** at actions/configure-pages because the repository GitHub Pages site is not enabled (404 Not Found).
- GitHub Pages source must be configured once by a repository administrator: Settings > Pages > Build and deployment > Source: GitHub Actions; then rerun workflow. The built-in GITHUB_TOKEN cannot enable Pages automatically without an additional authorized token.
- A Vercel project named cubaresort-ca was created (project id prj_YH0obrJP1zKgZTk3AAV98GdYLOUi) but deployment and project inspection returned 403 for scope takatakcas-projects. No Vercel deployment was confirmed. Do not claim it is live or retry without appropriate access.
- custom domain https://cubaresort.ca/ and DNS/SSL remain unverified; avoid modifying production DNS absent a verified target.

## 2026-10-14 property directory release

### What shipped

`assets/hotels.js` — a directory of **169 Cuban properties across 13 regions**, surfaced in a new
`#hotels` section with region chips, a region select, accent-insensitive name search and reset.
Trilingual (FR/EN/ES). Four new tests cover directory integrity, the no-commercial-claim rule and search.

### Where the data came from, and what it is worth

Two sources were merged, de-duplicated by a normalised name key plus an explicit alias table:

1. **Operator supplier list (135 properties).** Names read directly from screenshots of the
   operator's own booking system supplied by the user. These carry `confirmed:true`.
2. **Project archive (34 further properties).** Recovered from
   `cubaresort-ALL-148-HOTELS-COMPLETE.tar.gz`, which held a 148-record `hotel-data.ts`.
   These carry `confirmed:false` and need re-confirmation against the supplier list.

Multi-centre combo packages (`2CT …`, `… AND …`) were excluded: they are products, not properties.

### Correcting the record on the earlier "148 hotels complete" claim

The recovered 148-record file was a **skeleton, not a populated database**: 117 of its records
were literally marked `DATA EXTRACTION NEEDED`, and **no record had a non-zero room count**.
Only 3 properties anywhere in the archives had restaurants, bars and room categories filled in.
So the names and regions were real and worth recovering; the detail was never there. Any future
handoff claiming a populated 148-hotel database should be checked against this paragraph first.

### Deliberately NOT in `assets/hotels.js`

No rate, availability, star rating, review, room count, chain ranking or hotel-specific photo.
A test (`property directory carries no rate, availability or ranking claim`) asserts the record
shape is exactly `{id, name, region, airport, confirmed}` and fails the build if a commercial
field is added. Populate those only from an authorized supplier feed, never from memory or a
public website.

## 2026-10-14 accessibility pass (handoff priority 3)

Audited with axe-core in Chromium at 1440x900, 820x1180 and 390x844, plus the mobile
menu, the request dialog and the legal dialog opened.

**Before:** 426 nodes failing `color-contrast` (WCAG 2 AA), serious impact, at every width.
**After:** 0 violations in all six states. Horizontal overflow was already 0 and still is.

27 palette values were darkened to reach 4.5:1 for body text and 3:1 for large text,
each solved against the darkest background it actually renders on, with hue preserved.
The CTA band background moved from `#cf725e` to `#985445` because no text colour could
reach 4.5:1 over the original coral. The primary coral button moved from `#ee755e` to
`#b75a48` for the same reason. The result reads as a deeper terracotta and the design
intent survives.

A test (`no low-contrast colour from the pre-audit palette comes back`) lists all 27
retired values and fails the build if one reappears, so this does not silently regress.

Not yet audited: keyboard-only traversal of the full page and screen-reader announcement
order. axe covers neither.

### Next tasks, prioritized

1. Re-confirm the 34 `confirmed:false` properties against the current supplier list; correct or drop.
2. Decide how multi-centre combo packages should be modelled, if they belong on the site at all.
3. GitHub Pages is still not enabled — Settings > Pages > Source: GitHub Actions, then rerun. Still blocking.
4. Per-property detail pages require the supplier feed first; do not hand-write them.

## 2026-10-14 — Preview exposure and property-inquiry fixes

- Baseline `main`: `46d7dec9de6c9e5a44d299010253aa511848a394`; latest Actions run `38623054650` passed checks/build but Pages upload/deploy steps were **skipped** because Pages configuration remains unavailable. A green workflow is **not** proof of publication.
- Preview-server risk: prior `scripts/dev-server.mjs` blocked a few named folders but allowed arbitrary dotfiles such as `/.env`. Replaced with a strict production-file allowlist and real-path check to refuse symlink aliases; added live HTTP allow/deny integration test.
- Directory inquiry risk: clicking Ask on a named hotel passed only its region, losing the chosen hotel. The selected property ID is now retained only in memory for the open draft and rendered as an explicitly **unbooked** property of interest; switching to a generic request clears the selection. Added pure request formatter and FR/EN/ES tests.
- Open issue #1: GitHub Pages still requires repository-admin activation, and `cubaresort.ca` DNS/HTTPS remains unverified. Do not change DNS or claim a public release.
- PR #3 (`feat/nextjs-conversion`) is open; the `fix/nextjs-feature-parity-20261014` branch has passing CI but is not merged. Reapply/port these safety and inquiry fixes to Next.js only after comparing current branch state; do not replace `main` with an incomplete conversion.
- Next: inspect this new commit's Actions results, fix any failures, and continue keyboard/screen-reader verification. Supplier/legal/hosting approvals remain blockers to real bookings.
