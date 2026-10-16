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

## Production hosting and mail boundary
The owner completed the separate Coolify/Contabo cutover on 2026-10-16. Production is https://cubaresort.ca/ and https://www.cubaresort.ca/ on resource `ci7ltew4v50e4fwq63tfvtg6`, Contabo `31.220.96.134`, internal port 8080. Preserve the current static application, existing GitHub App main-push webhook, Docker healthcheck and nine-file SHA-256 verifier. GitHub Pages remains a fallback at https://takatakca.github.io/CUBARESORT.CA/ . Every production release must pass public DNS/mail separation and apex/www HTTPS exact-main checks. Mail remains on MochaHost: MX `0 mail.cubaresort.ca`, mail A `209.42.24.127`, Local Mail Exchanger. Keep existing nameservers, DKIM/DMARC and service records. Never make mail follow the web apex. See `docs/DOMAIN_CUTOVER_20261016.md` for backups and rollback limits. Historical entries about unavailable DNS or pending domain routing are superseded by this cutover record. Mail delivery itself has not been tested; do not claim otherwise.

## Session continuity
Record both what worked and what failed in `docs/AGENT_HANDOFF.md`; organize new work by actual dependencies in `docs/TASK_QUEUE.md`. A prompt is not an independent background process; resume only through an explicitly authorized orchestrator.
