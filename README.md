# CUBARESORT.CA

Cuba travel portal for **GROUPE TAKATAK**. Next.js 16 app, trilingual (FR / EN / ES).

**Launch scope:** information only. This is **not** a reservation engine, a price
feed or a payment service. It lists the properties CUBARESORT can quote on and
editorial stay ideas. Imagery is illustrative, never a verified photograph of a
named hotel.

## How it fits the TAKATAK ecosystem

It follows the **ISEXY arrangement**: its own repo and app, sharing the TAKATAK V1
Supabase project through the `cubaresort` schema, with identity provided by
**TAKATAK Auth** (Google sign-in + Twilio OTP). This app implements no login of
its own and stores no password, OTP or session.

Conventions are pinned to [`takatak-v1`](https://github.com/takatakca/takatak-v1)
so one reviewer reads both the same way:

| | Version |
| --- | --- |
| Node | 22.x |
| Next.js | 16.2.10 (production builds use `--webpack`) |
| React | 19.2.4 |
| Prisma | 6.19.3, pooled `DATABASE_URL` + `DIRECT_URL` |
| Supabase | `@supabase/ssr` ^0.12 |
| Tailwind | 4 |

## What is implemented

- **Property directory: 169 properties across 13 Cuban regions**, 135 of them
  confirmed against the operator's current supplier list. Region chips, region
  select, accent-insensitive name search, and shareable `?region=` / `?hq=` links.
- Trilingual interface with language persistence.
- `GET /api/health`, same response shape as `takatak-v1`.
- Prisma schema for `cubaresort.regions`, `cubaresort.properties`, `cubaresort.leads`.
- Coolify-ready `Dockerfile` (standalone output, port 3000, health check).

### What the directory deliberately does not contain

No rate, availability, star rating, review, room count or hotel-specific photo.
Those arrive **only** from an authorized supplier feed, in their own tables, with
the supplier and fetch time recorded. A test asserts the record shape is exactly
`{id, name, region, airport, confirmed}` and fails the build if a commercial
field appears.

`confirmed: false` on 34 properties means "recovered from the project archive,
awaiting re-confirmation" — not "unavailable".

## Accessibility

The palette was corrected to WCAG 2 AA on 2026-10-14 (axe-core in Chromium at
1440×900, 820×1180 and 390×844, dialogs included): **426 contrast violations → 0**,
with no horizontal overflow. A test lists the 27 retired colours and fails the
build if one returns. Do not lighten them.

## Getting started

Requires Node 22. No secrets are needed for local development.

```bash
npm ci --ignore-scripts=false   # Prisma's postinstall must run
npm run db:generate
npm run dev                     # http://localhost:3000
npm run qa                      # typecheck + lint + tests + build
```

Without Supabase and database environment variables the app runs in
**foundation mode**: the directory renders from the bundled dataset and
`/api/health` reports `database` and `supabase` as `not_configured`. That is a
truthful state, not a failure.

Copy `.env.example` to `.env.local` to configure more.

## Project structure

```
src/
  app/
    layout.tsx            Root layout, next/font, metadata
    page.tsx              Home page composition
    globals.css           Audited palette and layout
    robots.ts sitemap.ts  Generated, single canonical URL
    api/health/route.ts   Health endpoint
  components/
    language-provider.tsx FR/EN/ES context, hydration-safe
    hotel-directory.tsx   The property directory
    site-chrome.tsx       Header, hero, FAQ, footer
  lib/
    hotels/               types · data (169 properties) · index (queries) · catalog (editorial)
    i18n/                 FR/EN/ES dictionary and helpers
    db/prisma.ts          Single Prisma instance, pg adapter
    supabase/             SSR and browser clients for TAKATAK Auth
prisma/schema.prisma      cubaresort schema
tests/                    Node-native tests
Dockerfile                Coolify image, port 3000
```

## Before launch

`WORKLOG.md` carries the open items that need a person. The two that block
everything else: **decide the brand and proposition** (the live site leads with
"-5% price match"; this repo makes no price claim), and **confirm the Supabase
arrangement** before the first migration runs.
