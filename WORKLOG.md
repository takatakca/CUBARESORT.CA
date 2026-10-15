# Work log

Newest first, one line per piece of work. Rule: `AGENTS.md` › Work log rule.
Format: `YYYY-MM-DD | agent | branch → PR | status | what | next step`

- 2026-10-15 | Claude (Opus 5) | feat/nextjs-conversion → PR #3 | blocked: conflicts with main | Ported PR #4's wording correction into the Next.js copy (the directory is partial and guarantees no quote) and added a test so it cannot regress | owner decides static vs Next.js on main; PR #3 then needs a rebase, and fix/nextjs-feature-parity-20261014 needs the same wording fix
- 2026-10-14 | Claude (Opus 5) | feat/nextjs-conversion → PR #3 | superseded by the line above | Convert the static site to Next.js 16 on takatak-v1 conventions; add the 169-property directory, Prisma `cubaresort` schema and Supabase/TAKATAK Auth wiring | owner reviews the PR; then decide the brand question below and whether to run the first migration against the V1 Supabase project
- 2026-10-14 | Claude (Opus 5) | main | done | Static site: recovered the hotel directory (169 properties, 13 regions), made it deep-linkable, fixed 426 WCAG AA contrast failures, unblocked CI | superseded by the Next.js conversion above

## 🔴 Needs a human

- [ ] **`main` and the Next.js branches are diverging.** `main` is still the static site and moved on with PR #4 (mobile nav, Pages, wording). PR #3 deletes the static site, so it no longer merges (conflicts: `.github/workflows/publish.yml`, `README.md`, `package.json`). A third branch, `fix/nextjs-feature-parity-20261014`, builds on PR #3 and restores the editorial sections. Decide which lineage is the product before more work lands on either. *(2026-10-15)*
- [ ] **`fix/nextjs-feature-parity-20261014` still carries the overclaiming copy** ("au complet" / "Every resort in Cuba" / "Todos los hoteles", and the "we can quote on" framing). PR #4 corrected it on main; PR #3 now matches main. That branch belongs to another agent — it needs the same fix before it merges. *(2026-10-15)*

Each item is something only a person can do: a secret, an approval, a merge, an account.
Done? Delete the line and add a log line `cleared: <item>`. Secret values never go in this file.

- [ ] **Decide the brand and proposition.** The live cubaresort.ca is French, teal/orange, and leads with "On égale tout prix + 5% de rabais". This repo is trilingual, cream/terracotta, and makes no price claim. They cannot both ship. *(2026-10-14)*
- [ ] **Confirm the Supabase arrangement.** This assumes the ISEXY pattern: `cubaresort` schema inside the TAKATAK V1 project. Confirm before the first migration runs. *(2026-10-14)*
- [ ] **Supabase + database secrets for Coolify.** `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY`. Until these exist the app runs in foundation mode. *(2026-10-14)*
- [ ] **GitHub Pages or Coolify — pick one.** Pages is still not enabled (Settings > Pages > Source: GitHub Actions). With the Next.js conversion, Coolify is the better target and Pages can be dropped. *(2026-10-14)*
- [ ] **DNS for cubaresort.ca is not pointed.** The host currently answers HTTP 500 ("Web application could not be started"). Decide the target before pointing. *(2026-10-14)*
- [ ] **Re-confirm 34 archive-only properties.** They carry `confirmed: false`. Check them against the current supplier list, then correct or drop. *(2026-10-14)*
