# Decisions — CUBARESORT.CA

Newest first. Each entry says what was decided, why, and what would reverse it.
Reopen one only with a reason; do not silently re-litigate.

## 2026-10-15 — Ship Next.js to Pages as a static export

**Decided:** one source, two build targets. `BUILD_TARGET=static` produces the
`out/` folder Pages serves today; `BUILD_TARGET=node` produces the standalone
server for Coolify later.

**Why:** the owner asked for the project converted to Node and aligned with the
TAKATAK ecosystem. The only host actually serving the site is GitHub Pages,
which cannot run Node. Exporting costs nothing today because the directory is a
bundled dataset and no server-side data exists. Keeping the live site up beat
taking it down to await a host that is not provisioned.

**Reverses when:** Coolify is provisioned with its secrets. Then `main` builds
the node target and Pages becomes a fallback or is retired.

## 2026-10-15 — Consolidate three branches into one

**Decided:** fold `main`'s static fixes, `fix/nextjs-feature-parity-20261014`
and `feat/nextjs-conversion` (PR #3) into `feat/nextjs-consolidated`.

**Why:** three lineages were diverging and work was being duplicated and lost.
Three accessibility fixes from PR #4 had already been dropped by the React port
and had to be rewritten by hand.

## 2026-10-15 — The directory never claims to be exhaustive

**Decided:** no copy may say "every resort in Cuba", "au complet", "todos los
hoteles", or that CUBARESORT can quote on these properties. The framing is "a
partial directory… no quote, availability or booking is guaranteed."

**Why:** 169 properties out of an unknown Cuban total, 34 of them unconfirmed,
with no supplier feed and no booking provider. The earlier wording was false. A
test now fails the build if any of the six phrasings returns.

## 2026-10-14 — The directory holds no commercial fields

**Decided:** a property record is exactly `{id, name, region, airport,
confirmed}`. Rates, availability, ratings, reviews, room counts and
hotel-specific photos may only arrive from an authorized supplier feed, in their
own tables, recording the supplier and fetch time.

**Why:** the only way to keep the site truthful while it has no supplier
relationship. A test enforces the record shape.

## 2026-10-14 — The palette is frozen at WCAG 2 AA

**Decided:** 27 colours are retired and must not return. Verified with axe-core
in Chromium at three widths with dialogs open: 426 violations → 0.

**Why:** the inherited palette failed contrast almost everywhere. A test lists
the retired values and fails the build if one reappears.

## 2026-10-14 — CUBARESORT follows the ISEXY arrangement

**Decided:** its own repo and app, sharing the TAKATAK V1 Supabase project
through a `cubaresort` schema, with identity from TAKATAK Auth. No login, no
password, no OTP, no session stored here.

**Why:** the owner's existing pattern for a venture app. One project, one bill,
one dashboard, isolated tables. Pending the owner's confirmation before the
first migration runs.

## Still open — the brand and proposition

The live cubaresort.ca is French, teal/orange, and leads with "On égale tout
prix + 5% de rabais". This repo is trilingual, cream/terracotta, and makes no
price claim. **Both cannot ship.** This is a business decision, not a technical
one, and it blocks the visual direction and the domain cutover.
