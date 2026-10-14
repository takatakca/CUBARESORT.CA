<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Confirmed for this repo (Next 16.2.10): `cookies()`, `headers()`, `params` and `searchParams` are **async only**. Production builds **must** use `next build --webpack` — Turbopack rewrites the Prisma externals to hashed aliases that do not exist in `node_modules`.
<!-- END:nextjs-agent-rules -->

## What this repo is

CUBARESORT.CA, the Cuba travel portal of GROUPE TAKATAK. It follows the same
conventions as [`takatak-v1`](https://github.com/takatakca/takatak-v1): Node 22,
Next 16.2.10, React 19.2.4, Prisma 6.19.3 with the pooled + direct URL pair,
Supabase SSR, Tailwind 4, flat ESLint config.

It is the **ISEXY arrangement**: its own repo and its own app, but it shares the
TAKATAK V1 Supabase project through the `cubaresort` schema, and identity comes
from **TAKATAK Auth** (Google sign-in + Twilio OTP). This app implements no login
of its own and stores no password, OTP or session.

## Work log rule (every agent: Claude, Codex, Cursor, people)

Same rule as `takatak-v1/AGENTS.md`. Cheap to follow: read only what is listed here.

1. **Before you start:** read the top of the log (`head -40 WORKLOG.md`) and open PR titles (`gh pr list`). If a line for the same work is `active` or has an open PR, do not redo it.
2. **Claim it:** add one line at the top of the log with status `active`.
3. **Before you stop:** update your line with the status (`done`, `PR #n`, `blocked: reason`) and the next step. Commit and push it with your work. Never stop with unlogged work.
4. One line per piece of work, newest first. Details go in the PR, not the log.

Line format: `YYYY-MM-DD | agent | branch → PR | status | what | next step`

## Release control

`takatak-v1` is under an owner release lock (one coordinator merges and deploys,
and nobody else touches Coolify, Supabase, Stripe, Twilio or DNS). Treat this
repo the same way: **open a PR, do not push to `main`**, and do not deploy or
change environment variables yourself.

## Non-negotiable product constraints

Carried over from the previous static build and still binding:

- **No fabricated prices, reviews, room availability, booking confirmation or
  hotel-specific photo claims.** `src/lib/hotels/data.ts` holds names, region and
  arrival airport only. A test fails the build if a commercial field appears.
  Rates and availability arrive **only** from an authorized supplier feed, in
  their own tables, with the supplier and fetch time recorded.
- **No API keys or traveller PII in the client bundle.** `SUPABASE_SECRET_KEY` is
  server-only.
- **Preserve all three locales (FR/EN/ES) and keyboard accessibility.** Every
  interface key must exist in all three; a test checks this.
- **Do not lighten the palette.** It was corrected to WCAG 2 AA on 2026-10-14
  (axe-core, Chromium, 1440/820/390, dialogs included): 426 violations → 0. A
  test lists the 27 retired colours and fails if one returns.
- GROUPE TAKATAK retains the master identity and customer-data authority; all
  vertical business data must be tenant scoped.
- An information-site deployment is **not** a live commercial booking launch.

## Brand

TAKATAK-branded surfaces follow [`takatak-v1/BRAND.md`](https://github.com/takatakca/takatak-v1/blob/main/BRAND.md)
(electric blue on deep navy). CUBARESORT.CA is a consumer venture brand with its
own identity and does **not** use the TAKATAK palette on its public pages.
**Open question for the owner:** the live cubaresort.ca design uses teal and
orange with the "-5% price match" proposition; this repo currently uses the
inherited cream and terracotta palette and makes no price claim. Those two need
to be reconciled before launch — see `docs/AGENT_HANDOFF.md`.

## Commands

```bash
npm ci --ignore-scripts=false   # Prisma postinstall must run
npm run db:generate             # Prisma client
npm run dev                     # http://localhost:3000
npm run qa                      # typecheck + lint + tests + build
```

Without Supabase and database env vars the app stays in **foundation mode**: the
directory renders from the bundled dataset and `GET /api/health` reports
`database` and `supabase` as `not_configured`. That is a truthful state, not a
failure.
