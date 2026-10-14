# CUBARESORT.CA — Release parity and production safety gate

Date: 2026-10-14. Applies to all replacements of the current public website, including the Next.js migration PR #3.

## Three distinct states — do not conflate

1. **Current GitHub main:** a static trilingual inspiration site with a 169-property directory, 9 editorial stay ideas, filters, favourites and a travel-request draft. It does not take payment or make real bookings.
2. **Next.js candidate:** PR #3 (`feat/nextjs-conversion`) adds the Next.js 16 / Prisma / Supabase foundation and the property directory, but its home page currently renders only the hero, directory, FAQ, header and footer. A successful build is not proof of feature parity.
3. **Previously indexed public cubaresort.ca site:** search-engine snapshots show a separate French commercial presentation centered on a 5% price-match promise and quote/screenshot funnel. That indexed content does not verify current uptime, ownership, offers, or authorization. Do not reproduce commercial claims without evidence.

## Functional acceptance before merging PR #3

- [ ] Preserve or explicitly de-scope the nine editorial stay ideas and destination/style search, sorting, reset and deep links.
- [ ] Preserve or explicitly de-scope browser-local favourites.
- [ ] Preserve or explicitly de-scope the non-submitting travel-request draft with destination, departure month, traveller count, duration, notes and clipboard export.
- [ ] Preserve or explicitly de-scope the editorial/approach sections and privacy/terms dialogs.
- [ ] Ensure the property directory keeps 169 records / 13 regions and never advertises unverified rates, availability, hotel photos or ratings.
- [ ] Verify FR/EN/ES across all visible controls, menus, dialogs and error states.
- [ ] Check keyboard-only navigation, screen-reader labels, mobile layout and reduced-motion preferences.
- [ ] Test direct URL loads, browser back/forward, query filters and fallback when optional backend secrets are absent.

## Commercial and legal parity

- [ ] Decide with the operator whether the public proposition is price-match, editorial discovery, or both; record approved text and contact details.
- [ ] Independently substantiate any licence, price, review, savings, customer-count or response-time claim before publishing it.
- [ ] Confirm the actual owner/operator, consumer terms, privacy policy, consent and support channels.
- [ ] Confirm which supplier feeds and Cuba travel inventory may be presented as current.
- [ ] Obtain authorization for shared TAKATAK V1 Supabase `cubaresort` schema creation and migrations, then verify RLS/tenant boundaries. No migration before approval.

## Deployment gate

- [ ] Identify the actual current production host and its rollback/backup procedure before changing DNS.
- [ ] Verify the selected preview (GitHub Pages, Vercel or Coolify) with a real HTTP smoke test, not only a green CI badge.
- [ ] Deploy with secrets only in server-side environment variables, never client bundles.
- [ ] Compare the deployed candidate against this checklist in real browsers.
- [ ] Change production routing only after approval, HTTPS verification and rollback readiness.
- [ ] Record public URL, deployment ID, commit SHA and smoke-test evidence in `docs/AGENT_HANDOFF.md`.

## GitHub Pages incident

Run #38623054650 (main, 2026-10-14) completed with an overall green status but the Pages configuration action logged `Get Pages site failed ... Not Found`. The upload and deploy actions were skipped. This is a **successful static build only**, not a successful public deployment. Repository metadata still returned `has_pages:false`. Do not close issue #1 based on the workflow badge alone.

## Ownership of release

The migration PR #3 explicitly requests a brand decision and Supabase arrangement confirmation. Those are human authorization dependencies. Keep the current production website untouched until those decisions are documented.
