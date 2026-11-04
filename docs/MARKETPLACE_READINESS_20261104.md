# Cuba marketplace readiness and provider integration

## Current release and branch checkpoint — 2026-11-04

The premium implementation described below is no longer an unmerged feature branch:

- PR [#11](https://github.com/takatakca/CUBARESORT.CA/pull/11) merged at `1dfef4e6c05eba1f1c38286f094cb29d96856e55`. Its source branch `feat/premium-cuba-guide-20261104` ended at `9f27be47c738a95c827f27c4ba351d6eda6a99f2`; comparison with current `main` shows the branch is three commits behind and has zero unique commits. Do not reopen or duplicate that feature branch.
- Current `main`: `7e6a63cee07d20932c33db3fb5b2d33fae4108a2`. It includes the premium content, static marketplace pilot, travel notebook and private reservation/fulfilment prototypes.
- Node 22 validation/build and Pages run [41808241223](https://github.com/takatakca/CUBARESORT.CA/actions/runs/41808241223) passed. Pages published the exact main SHA and expanded manifest.
- Coolify run [41808241176](https://github.com/takatakca/CUBARESORT.CA/actions/runs/41808241176) passed the production-container, health, release-integrity and private-path checks, but its external live-verification job failed because the generated Contabo hostname served a different release SHA. Current-main production is therefore **not verified** on the generated hostname, apex or www.
- Documentation-only PR [#12](https://github.com/takatakca/CUBARESORT.CA/pull/12) remains draft. It must not be merged while the existing Coolify release is unresolved, because a merge would create another main deployment.
- The branch CI result [41806549307](https://github.com/takatakca/CUBARESORT.CA/actions/runs/41806549307) is branch validation only, not proof of production publication.

No live supplier inventory, room rates, restaurant menus, transport seats, reservations, payment, lead intake, AI calls or dispatch are active. The server modules remain unexposed prototypes. Issue #2 still requires an approved legal operator, supplier agreements and sandbox, payment/cancellation rules, and a dedicated CUBARESORT tenant/source registration in TAKATAK V1.

Human acceptance remains open: a real mobile device/viewport and screen-reader pass, reconfirmation of source details, and the legacy image-license audit. The Meliá source fetch previously failed and those summaries must be reconfirmed before stronger property claims. The current Canadian travel advisory warning remains visible; do not imply guaranteed routes or live travel availability.

---

Signed: Codex · 2026-11-04.

## What is implemented
- Existing site identity and sea/coral/sand design retained, with four premium editorial profiles (12 independently crawlable FR/EN/ES pages), three Cuba guide pages and resort dialog entry points for the 169-name directory.
- Searchable 21-entry pilot marketplace: 5 restaurant sources, buses, taxi/classic/cocotaxi/bicitaxi/horse/van/ferry categories, shared-ride concept, Nexus excursions, kayaking and marina research. Rental cars remain separate. This is not an island-wide exhaustive database or a contracted operator inventory.
- Local travel notebook combines selected services and directory entries; grocery list at bottom; copy/export and reset. Nothing is submitted or stored remotely.
- SIREV program presented as in preparation, with proposed terms, private screenshot MIME/size validation and a 5% illustrative calculator. No claim is submitted, screenshot retained, rebate approved or commercial offer activated.
- Server-only reservation modules: composable HTTP handler, authenticated-actor authorization, tenant and person isolation, strict item schema, provider quote validation, one currency, expiry, quote acceptance digest, idempotent confirmation, durable single-process JSON store, compensation attempts and reconciliation state. No production API listener, V1 auth adapter, supplier/payment/AI activation or real bookings.

## Activation matrix

| Component | Available now | Needed for real transactions |
|---|---|---|
| Travel/stays | directory, original editorial profiles | agency/operator identity, SIREV/Softvoyage supplier access, sandbox documentation, dated quotes, payment and cancellation integration |
| SIREV benefit | proposed comparison terms and private simulation | operator-backed final terms, secure redacted evidence intake, retention policy, verified prices and approval workflow |
| Restaurant/internal delivery | sourced pilot directory and travel notebook | merchant contracts, current menus/prices/allergens/hours, service zones, capacity, order acceptance, payment, driver onboarding/dispatch, proof of pickup/delivery |
| Shared rides/taxis | transport-type guide and shortlist | licensed carriers and driver checks, insurance/capacity, fare rules, live seats, pickup/dropoff/address handling and incident operations |
| Buses | Viazul/BusTour/charter source links | approved routes/timetables/seat APIs and issue/cancel ticket sandbox |
| Cars | Transtur links and requirements checklist | authorized rental provider/API, dates, driver eligibility and live category inventory |
| Water activities | kayaking, marina and Nexus source links | authorized product IDs and dated availability, safety rules, permits/insurance, capacity and cancellation |
| SIM | ETECSA source and tourist-SIM guidance | authorized reseller agreement/API, passport/identity handling inside provider flow, activation/pickup verification |
| eSIM | provider-published Cuba roaming guidance | supplier coverage/product API, supported devices, provisioning/status/refund API |
| Grocery | local shopping checklist | local fulfilment partner, delivery zones, current stock, pricing, expiry/cold-chain handling and order lifecycle |
| AI concierge | no AI claim or live model calls | server-side model credential/provider, consent, bounded catalogue retrieval, tool restrictions and quote approval; model output never proves booking/payment status |
| TAKATAK V1 | existing contracts inspected; required cubaresort registration documented | cubaresort-specific scope, tenant/product mapping, launch/exchange/introspection adapter and staging credentials |

## Reservation prototype runbook

Import `createApiHandler`, `createReservationService`, and `createFileStore` from `server/` in an independently configured server. Keep its storage directory outside the static document root. Inject a verified V1 session adapter (never browser-supplied tenant/identity), a canonical site origin, and supplier adapters. Current Nginx static hosting intentionally does not forward /api to this prototype.

API paths: GET /api/cubaresort/capabilities; POST /api/cubaresort/reservations `{items:[{kind,productId,quantity}]}`; GET /api/cubaresort/reservations/:id; POST .../:id/quote; POST .../:id/confirm `{quoteDigest}` with Idempotency-Key. Server-assigned tenant and identity cannot be overridden in JSON. Dates, travellers, addresses, complete consent and provider-specific intake schemas must be added after real supplier contracts are known; current items are an orchestration prototype, not complete booking input.

Provider adapter: `quote({kind,productId,quantity,actor}) -> {id,totalMinor,currency,expiresAt,cancellationTerms}`; `reserve({quote,actor,idempotencyKey}) -> {status:'confirmed',reference}`; `cancel({reference,actor,idempotencyKey}) -> {status:'cancelled'}`. A provider receipt is mandatory. Payment is deliberately absent until its lifecycle and provider are approved. Durable outbox, transactional DB locks, retention/deletion, rate limiting, session revocation, provider reconciliation and operational admin tooling are mandatory before public multi-replica activation. AI must not call reserve without explicit accepted current quote and human/customer confirmation.

## Source and legal checks
Canada travel advisory read 2026-11-04 warns against non-essential travel, shortages and Canadian airline suspension. WestJet's former resort URL now redirects to its Cuba suspension page, so the stale Iberostar profile from PR #7 was not imported. Meliá sources were available in search excerpts but direct live fetch failed (502/DNS); sourced summaries are attributed and must be reconfirmed. Do not describe every property as freshly operational. Québec agency advertising and operator identity requirements must be satisfied before publishing an active commercial price guarantee. No claim of Cuban telecom or transport regulatory approval is made.

## Image provenance
Two newly researched Cuba images: Nina Ondkova, Varadero, Unsplash QMaExg6PBQ8, photo-1609960276201-22af8a583adf; Daniel Pelaez Duque, Havana, Unsplash BpLvgJe3ulI, photo-1752702338341-2b085cd246e3. Both source pages state free use under the Unsplash License; public credits link to source. New resort-card images are explicitly destination photos, not hotel photographs. Existing illustrative catalogue photography remains labeled; full legacy imagery audit is pending.

## Follow-up acceptance

55 local tests pass after adding internal food/ride fulfilment prototype: merchant acceptance, approved-driver assignment, pickup/delivery evidence, tenant/role/driver ownership and optimistic version conflict checks. The store adapter must enforce evidence ownership and atomically append audit/outbox on compare-and-set; no live dispatch is wired.

PR #11 merged as 1dfef4e6c05eba1f1c38286f094cb29d96856e55. GitHub Pages fallback passed release workflow 41806632426. Production-container job in 41806632151 passed; native domain release is pending and still serves the old application. Coolify displays a sign-in wall in the connected browser; no login attempt or credential entry performed. Browser acceptance on Pages verified locale switching FR/EN/ES, restaurant filter (5 results), notebook preserving selections across languages, resort dialog, and 2000 CAD → 100 CAD maximum / 1900 CAD theoretical minimum simulation. Browser console had no errors. Follow-up fixes address the previously visible conditional screenshot-clear action and existing directory heading markup.
