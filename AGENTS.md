# CUBARESORT.CA — agent instructions

Read these before changing code, in order: `docs/AGENT_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md`, `docs/PRODUCTION_CHECKLIST.md`, then the current GitHub `main` commit and Actions runs.

## Source of truth
- The GitHub repository `takatakca/CUBARESORT.CA`, not old chat messages or unrelated applications, is authoritative.
- Continue the current static editorial portal; do **not** merge PR #3's incomplete Next.js conversion into a deployment repair.
- Keep FR, EN and ES supported; changes to interface wording must be translated.
- No fake prices, ratings, room inventory, claims of booking confirmation, payments or personal-data collection.
- Current hotel directory contains 169 property **names** in 13 regions. The `confirmed` field tracks source provenance, **not** booking inventory.
- Any future TAKATAK identity/CRM connection must enforce tenant isolation on the server; no API keys or secret tokens in static content.

## Changes and verification
1. Inspect `main` head and recent commits/PRs/issues first. Do not overwrite newer agent work.
2. Work on feasible, authorized tasks only; do not request the same known-unavailable DNS account without a newly actionable access route.
3. Run `npm run validate` and `npm run build` (Node 22) before production changes.
4. Push only via non-forced commits and respect branch policies. Never use a destructive force-push.
5. After a `main` release, inspect Actions and verify the deployed HTTPS `release.json` full SHA **and first-party file checksums**. A green build or an old SHA is insufficient.
6. Maintain a dated, accurate English handoff. Report actual SHA, checks, changed files, deployment and next action. Never include credentials or authenticated session URLs.

## Domain hard boundary
The owner selected a separate Coolify application on Contabo on 2026-10-15. Resource `ci7ltew4v50e4fwq63tfvtg6` on `31.220.96.134` has a verified healthy webhook release at https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ . Preserve the current static application and SHA-256 verifier. GitHub Pages remains active as fallback at https://takatakca.github.io/CUBARESORT.CA/ . The separate apex `cubaresort.ca` is **not** yet cut over: the last confirmed A record points at MochaHost `209.42.24.125` and Apache returns HTTP 500. Existing MX targets the apex; moving the apex would affect mail. The authoritative DNS zone was not visible in available application cPanel or reseller WHM accounts. Preserve every DNS record and mail route before any *authorized* cutover; do not replace nameservers, create a blank zone or declare issue #1 closed until HTTPS, DNS, and exact-main-release checks pass.

## Session continuity
Record both what worked and what failed in `docs/AGENT_HANDOFF.md`; organize new work by actual dependencies in `docs/TASK_QUEUE.md`. A prompt is not an independent background process; resume only through an explicitly authorized orchestrator.
