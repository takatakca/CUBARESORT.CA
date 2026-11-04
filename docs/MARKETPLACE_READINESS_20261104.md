# Cuba marketplace readiness and provider integration

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
