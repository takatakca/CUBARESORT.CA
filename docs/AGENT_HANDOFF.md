# Agent handoff — CUBARESORT.CA

Updated: 2026-10-15 · Agent: Claude (Opus 5) · Session `01EcgxTi4xXX2mQNqwqGVbAN`

Read this with `AGENTS.md` and `docs/TASK_QUEUE.md`. Do not restart the project:
working code exists and is deployed.

## Last completed task

Consolidated three diverging branches into one and kept the published site working.

`main`, `feat/nextjs-conversion` (PR #3) and `fix/nextjs-feature-parity-20261014`
had split apart: `main` carried on as the static site while two branches carried
the Next.js rewrite. `feat/nextjs-consolidated` now contains all three.

## Task in progress

Getting `feat/nextjs-consolidated` through CI and merged, then proving the
published site is the new commit.

## Current state

| | |
| --- | --- |
| Branch | `feat/nextjs-consolidated` |
| Last local commit | `2c669c3` |
| Stack | Next.js 16.2.10, React 19.2.4, Node 22, Prisma 6.19.3, Supabase SSR, Tailwind 4 |
| Published site | https://takatakca.github.io/CUBARESORT.CA/ — **live, HTTP 200** |
| Published commit | `daa6f4a` (the static build, verified by run 38743595259) |
| cubaresort.ca | **not pointed here.** Apex 209.42.24.125 (MochaHost), answers HTTP 500 |

## Files changed in this session

- `next.config.ts` — dual build target (`static` for Pages, `node` for Coolify), `basePath`
- `src/app/api/health/route.ts` — `force-static`, build-time facts only
- `src/app/robots.ts`, `src/app/sitemap.ts` — `force-static` so export emits them
- `src/components/site-chrome.tsx` — Escape closes the mobile menu and restores focus; desktop-width resize closes it
- `src/components/travel-experiences.tsx` — scrolling honours `prefers-reduced-motion`
- `src/lib/i18n/index.ts` — removed the exhaustive/guaranteed-quote wording
- `scripts/verify-live.mjs` — re-pointed at the Next.js output
- `scripts/write-release.mjs` — new; emits `out/release.json` for deploy verification
- `.github/workflows/publish.yml` — Next.js build + Pages deploy + live verification
- `tests/deployment.test.mjs` — fixtures updated for the export
- `tests/directory.test.mjs` — added the overclaim guard
- `package.json`, `docs/PRODUCTION_CHECKLIST.md`, `WORKLOG.md`, `README.md`
- Deleted: `assets/`, `scripts/build.mjs`, `scripts/dev-server.mjs`, `tests/site.test.mjs`

## Commands run, and what they actually returned

```
npm run typecheck                      clean
npm run lint                           clean
npm test                               16/16 pass
BUILD_TARGET=static npm run build:static   out/ produced, release.json written
```

Then the export was served under the real project path and driven in Chromium:

- 169 properties, 14 region chips, 3 destinations, 9 stay ideas
- **0 axe violations** (wcag2a/2aa/21aa) at 1440×1000 and 390×844; no horizontal overflow
- mobile menu opens, Escape closes it, focus returns to `.menu-toggle`
- region chip filters and writes `?region=` to the URL

## Known problems

- **`cubaresort.ca` MX points at the apex.** Repointing the apex to move the
  site would break the mailbox. Export the existing zone before any cutover.
- Unsplash images cannot load from this sandbox (egress allowlist). Not a code
  defect; verify imagery from a normal network.
- 34 of 169 properties are `confirmed: false` — archive records awaiting
  re-confirmation against the supplier list.
- No database, no auth and no supplier feed are connected. The app is in
  foundation mode by design.

## Deployment status, as verified

- GitHub Pages: **live**, serving the static build at commit `daa6f4a`.
- This branch is **not yet deployed**; it deploys when merged to `main`.
- Coolify: **not provisioned for this project.** The Dockerfile exists and CI
  builds it, but no Coolify app, token or DNS record has been confirmed. Do not
  claim a Coolify deployment without evidence.

## Access needed (no secrets here)

- For Coolify: `COOLIFY_API_TOKEN`, plus `DATABASE_URL`, `DIRECT_URL`,
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY`.
- For the domain: the account holding the `cubaresort.ca` DNS zone.

## Exact next action

1. Push `feat/nextjs-consolidated`, open its PR, and wait for CI.
2. On green, merge to `main`. The deploy job then publishes and verifies.
3. Confirm with `npm run verify:live -- --url https://takatakca.github.io/CUBARESORT.CA/ --sha <merge sha>`.
   Do not record a successful deployment until that passes.
4. Then pick up the next item in `docs/TASK_QUEUE.md`.
