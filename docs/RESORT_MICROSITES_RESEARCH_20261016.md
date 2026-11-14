# Resort microsite research — 2026-10-16

Status: editorial research seed on a separate branch; NOT a verified commercial hotel listing or booking inventory. Baseline main: `87bfd6304017b63d5e8366da7cecedff97c9ccf0`.

## Scope and rules

Create one accessible FR/EN/ES microsite for each of the existing 169 property IDs, preserving region and airport metadata. Every new field must be separately sourced, dated and marked verified / unverified / unavailable. Never infer beach length from the length of a destination's beach, nor invent resort-specific dimensions. Record seasonality as general regional travel guidance separately from a property's verified opening/closure dates. Do not reproduce third-party reviews or photos without usage rights; link to original reviews and approved official galleries instead. Do not claim supplier rates, inventory, star ratings or bookings.

Suggested structured fields: property_id; aliases; operator; official_site; official_gallery_url; photo_license; region; airport; location; hotel_type; minimum_age; board_basis; inclusions; exclusions; room_types; pools; restaurants; accessibility; beach_access; beach_name; beach_frontage_m; beach_frontage_measurement_method; beach_frontage_source; best_season_region_guidance; seasonal_closures; family_facilities; wellness; activities; renovation_date; review_platform_links; review_summary_with_attribution; source_urls; last_checked_at; field_status. Keep unknowns explicitly null. Do not show an unsupported field in a public-facing claim.

## First independently sourced property profiles

### Iberostar Selection Varadero
- Existing directory ID: `iberostar-selection-varadero-varadero`.
- Directory region/airport: Varadero / VRA.
- WestJet hotel listing reports all-inclusive meals and snacks, domestic and international beverages, non-motorized water sports, evening entertainment, two freshwater pools, a children's pool and 386 rooms. **These are distributor claims, not verified current operator terms; packages and amenities may change.**
- Resort-specific beachfront length: **unknown**; do not substitute the length of Varadero beach.
- Opening season and temporary closures: **unknown**.
- Independent distributor details and photos (link only): https://www.westjet.com/en-ca/hotels/varadero/vraivu/iberostar-selection-varadero
- Another publicly indexed hotel page (not confirmed as the official operator): https://www.iberostarvaradero.com/all_inclusive.asp
- Last researched: 2026-10-16. Publication status: editorial verification pending.

### Meliá Las Américas
- Existing directory ID: `melia-las-americas-varadero`.
- Directory region/airport: Varadero / VRA.
- Operator's official hotel page identifies a beachfront, all-inclusive, adults-only (18+) property with direct access to Varadero Golf Club and optional The Level services. Exact plan entitlements must be checked by room/package.
- Resort-specific beachfront length: **unknown**.
- Opening season and temporary closures: **unknown**.
- Official operator page and gallery: https://www.meliacuba.com/en/destinations/varadero/hotels/melia-lasamericas
- Last researched: 2026-10-16. Publication status: official description sourced; image rights and operational details pending.

## Implementation order

1. Preserve existing static architecture, multilingual UI, accessibility and nine-file SHA-256 deployment integrity.
2. Introduce a typed/validated property-profile data module keyed to existing hotel IDs, with null-safe optional facts, per-field source URLs and review dates.
3. Implement shareable property microsite URLs with canonical metadata, localized headings, accessibility, breadcrumbs, source citations and transparent unknown states; keep inquiries draft-only.
4. Pilot these two properties, test FR/EN/ES and mobile/keyboard behavior, then roll out to the other 167 after sourcing.
5. Require `npm run validate`, `npm run build`, real production Docker/runtime checks, exact latest-main live SHA and nine asset digests on Contabo generated hostname, apex, www and Pages before merging/publishing.
6. Photo licensing, user review rights, actual beach-frontage measurements, seasonal closures and operator-specific inclusions require evidence before display.

## Handoff

Last completed: researched two seed properties and defined an evidence-first microsite data contract. Files changed: this document only. Branch: `feat/resort-microsite-research-20261016` from `87bfd6304017b63d5e8366da7cecedff97c9ccf0`. No production code or infrastructure touched; no tests or deployments claimed. Next exact action: fetch fresh main, build validated data model and localized pilot pages, then test and open a PR. Existing issue #2 commercial integrations remain blocked.
