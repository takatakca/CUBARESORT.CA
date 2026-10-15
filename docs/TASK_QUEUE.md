# Task queue — CUBARESORT.CA

Updated: 2026-10-15. Newest decisions win. Take the top unblocked item.

## Ready to execute (no human input needed)

1. **Merge `feat/nextjs-consolidated` and verify the publication.**
   CI green → merge → the deploy job publishes and runs `verify:live`.
   Done only when the live URL reports the merge SHA.
2. **Re-confirm the 34 `confirmed: false` properties** against the supplier
   list, then correct or drop them. They are archive records, not offers.
3. **Browser matrix.** Chrome, Firefox, Safari, Android, iOS. Only Chromium has
   been exercised so far.
4. **Screen-reader pass.** axe cannot judge announcement order; keyboard
   traversal and a real reader are still untested.
5. **Imagery review.** Unsplash photos are illustrative. Confirm rights,
   availability and loading performance from a normal network.

## Blocked on a person

Each needs an account, a secret, an approval or a commercial decision.

- **Brand and proposition.** The live cubaresort.ca is French, teal/orange, and
  leads with "On égale tout prix + 5% de rabais". This repo is trilingual,
  cream/terracotta, and makes no price claim. Both cannot ship. *Blocks: any
  visual rework, and pointing the domain.*
- **`cubaresort.ca` DNS zone access.** Apex 209.42.24.125 (MochaHost) answers
  HTTP 500. **The MX record points at the apex, so repointing it breaks email.**
  Export the zone before any cutover. *Blocks: the real domain.*
- **Confirm the Supabase arrangement** (`cubaresort` schema inside TAKATAK V1,
  the ISEXY pattern). *Blocks: the first migration.*
- **Coolify provisioning**: app, `COOLIFY_API_TOKEN`, and the database and
  Supabase secrets. *Blocks: the Node runtime, server rendering, saved leads.*
- **Supplier agreement** for rates and availability. *Blocks: every commercial
  feature. Nothing may be invented in the meantime.*
- **Operator identity, a monitored mailbox and reviewed policies.**
  *Blocks: collecting real leads.*

## Explicitly out of scope until unblocked

Do not add prices, availability, ratings, reviews, room counts or hotel-specific
photos from memory or from a public website. They may only arrive from an
authorized supplier feed, in their own tables, recording the supplier and the
fetch time.
