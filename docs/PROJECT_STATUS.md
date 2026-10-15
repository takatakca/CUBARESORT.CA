# Project status — CUBARESORT.CA

Updated: 2026-10-15. One line of truth: **a published information site, not a booking service.**

## What exists and works

| Area | State | Evidence |
| --- | --- | --- |
| Published site | Live | https://takatakca.github.io/CUBARESORT.CA/ returns HTTP 200 |
| Framework | Next.js 16.2.10 on `takatak-v1` conventions | `package.json`, `next.config.ts` |
| Property directory | 169 properties, 13 regions, 135 supplier-confirmed | `src/lib/hotels/data.ts` |
| Editorial content | 6 destinations, 9 stay ideas, FAQ, legal dialogs | `src/components/` |
| Languages | FR / EN / ES, complete and test-enforced | `src/lib/i18n/` |
| Accessibility | 0 axe violations (wcag2a/2aa/21aa), no overflow | Chromium 1440×1000 and 390×844 |
| Request draft | Composed in the browser, copied by the visitor | `src/components/travel-ui.tsx` |
| Deploy verification | The published commit is checked, not assumed | `scripts/verify-live.mjs` |
| Tests | 16/16 | `npm test` |

## What is deliberately absent

Not missing by oversight — absent because the business prerequisites do not exist:

- **No rates, availability, star ratings, reviews, room counts or hotel photos.**
  A test fails the build if such a field enters the directory.
- **No booking, payment or lead transmission.** The request draft never leaves
  the browser on its own.
- **No database, auth or supplier feed connected.** The app runs in foundation mode.

## Architecture inside GROUPE TAKATAK

Follows the ISEXY arrangement: its own repo and app, sharing the TAKATAK V1
Supabase project through a `cubaresort` schema, with identity from TAKATAK Auth
(Google + Twilio OTP). This app implements no login and stores no password, OTP
or session — enforced by a test over the Prisma schema.

## Honest completion estimate

| Phase | State |
| --- | --- |
| Information site | **Done and published** |
| Node/Coolify runtime | Code ready, host not provisioned |
| Database + auth | Schema written, never migrated |
| Supplier feed, rates, availability | Not started — blocked on a supplier agreement |
| Booking and payment | Not started — blocked on legal and operator identity |

The site is finished as an information portal. It is **not** a booking product,
and the remaining phases depend on commercial decisions, not on code.
