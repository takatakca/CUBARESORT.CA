# CUBARESORT — Partner marketplace and TAKATAK V1 integration

Updated 2026-10-16. Status: design/implementation contract for the future partner service; **not deployed or integrated**. TAKATAK V1 is the sole customer/identity/tenant authority. Reference: TAKATAK V1 Architecture Lock and its current master repository. Source of truth for actual commercial eligibility remains CUBARESORT issue #2.

## Product

The public travel guide offers original, verifiable FR/EN/ES content about hotels, cities, excursions, free activities, outdoors, visas and safety. Partner organizations in Cuba will eventually manage their own activities, price proposals, descriptions, permitted photos, capacity, pickup points, inclusions/exclusions, cancellation rules and accessibility notes through a separate authenticated service. The existing static portal must keep working if the partner/AI services are down.

## TAKATAK identity and tenant isolation

- No CUBARESORT user-password, OTP or alternate master CRM. TAKATAK V1 owns identity, memberships, organization relations and product entitlements.
- Obtain a reviewed contract from TAKATAK before wiring auth: versioned discovery or one-time signed launch/exchange, issuer/audience validation, allowed origins/redirects, nonce/replay protection, server-held service credentials, short-lived codes and audited entitlement decisions. No guessed endpoints.
- Server verifies principal, active tenant, approved organization membership and the specific product entitlement on EVERY request, not merely when a session starts. Use server-side queries plus row-level security; never trust client-supplied tenant_id, owner_id, role or price-approval state.
- Scope organization listings, media objects, prices, audit entries, analytics, jobs and refunds to tenant_id AND organization_id. Add cross-tenant read/write/delete/ID-guessing E2E with two independent businesses.
- Cookies must be HttpOnly/Secure/SameSite, sessions revocable, every mutation CSRF-protected and rate-limited. Admin review requires separately granted reviewer/publisher entitlements. Fail closed on unavailable TAKATAK authentication while keeping public approved content readable.
- Proposed API contracts (NOT actual live URLs): GET /partner/me; GET/POST /partner/listings; PATCH /partner/listings/:id; POST /partner/listings/:id/submit; reviewer-only approve/reject/publish/pause. Approve precise routes in TAKATAK V1 before implementation.

## Listing and price lifecycle

Models: partner_organization(tenant_id,organization_id,legal_identity,verification_status,insurance/license_evidence);
experience_listing(id,tenant_id,organization_id,status,version,locale_content,geography,meeting_point,inclusions,exclusions,cancellation_policy,capacity,seasonality,source_urls,media_rights,updated_by);
listing_price(listing_id,currency,amount_minor,unit,taxes,fees,valid_from,valid_to,terms,revision,reviewer);
immutable_audit_event(actor,tenant,organization,action,version,timestamp).

Allowed workflow: DRAFT → SUBMITTED → APPROVED → PUBLISHED; REJECTED → DRAFT for corrections; PUBLISHED → PAUSED for safety. Partners can propose prices but cannot approve/publish them. Publish only immutable approved snapshots; new changes create a new review version and never silently alter prior transactions. Never display fake availability or unsourced ratings, beach lengths and inclusions. Prices use explicit ISO currency, integer minor units, inclusions, tax/fee rules and expiry, not a made-up FX conversion. Uploads require licensed rights, malware and MIME/size scans, EXIF privacy policy, alt text, protected staging and moderation.

## AI layer: server-only, sourced and human-approved

- TAKATAK's knowledge and identity are the master authorities for platform/organization facts. Current official travel advice, visas, hotel operator claims and actual offers still require dedicated primary sources.
- A future Cuba Guide Assistant retrieves approved source snippets and locale-specific travel content through a tenant-aware backend, links its sources, expresses uncertainty and falls back to normal search when AI is unavailable.
- AI drafting may suggest FR/EN/ES titles, descriptions, SEO and itineraries, but never auto-publish or invent prices, ratings, availability, permits, visas or beach dimensions. All AI output stays DRAFT until reviewer approval.
- Require prompt-injection resistance on retrieved text, privacy/consent, model version provenance, rate limits, cost caps, moderation, logging of approval actions and retrieval quality tests. No API keys or client-level model calls in static files.

## Proposed 5% price match — NO active public guarantee

The owner requests a conditional promotion. Do not market an unconditional 5% savings offer until the operator, consumer-law adviser and owner approve rules and merchant funding.

Draft comparability: same verified competing offer, same provider/property/product, exact dates, party size, room/activity category, board/inclusions, cancellation flexibility, currency, taxes, mandatory fees and availability at the quoted time. Decide whether 5% applies to a matched total or an eligible base, maximum benefit, exclusions for member/private/bundle/coupon offers, claim deadlines, accepted proof, supported markets, dispute/refund policy and valid marketing wording. Review Quebec/Canadian travel-agent and price-comparison compliance. Implement a versioned rules engine and audited human acceptance only after approvals. The marketing flag stays OFF.

## SEO and multilingual editorial

- Crawlable independent FR/EN/ES canonical pages with reciprocal hreflang, complete sitemaps, accessible semantic headings, unique original content and citations. WebPage structured data only for editorial pages, no fake Product/Offer/Review data.
- Develop city and destination clusters (La Havane/Havana/La Habana, Trinidad, Viñales, Varadero, Holguín, Cayo Coco, Santiago); dedicated excursion/free activities/outdoors/history/visas/entry/seasonal guides. Support search variations naturally rather than stuffing keywords or indexing thin placeholder profiles.
- Connect Search Console after verified access; monitor indexing, performance, real visitor queries and corrections. SEO #1 ranking can never be guaranteed.
- Only source-cleared photography and supplier-authorized media. Changing entry/advisory details need official links, checked dates and visible caution. Verify functional Canadian mail acceptance separately; DNS alone is not mailbox proof.

## Execution checkpoints

1. Current isolated PR: professionally designed trilingual static Cuba guide with six sourced/caveated discovery concepts; official travel advice links; accessible filter and pop-up dialogs; SEO canonical/hreflang and sitemap; homepage entry. No partner registration or personal data.
2. Review PR and pass tests/build, Docker runtime and accessibility/mobile checks. After approved main merge, require exact main commit, current release manifest digests and verified Contabo generated hostname, apex, www and Pages. Preserve DNS/mail.
3. Obtain verified TAKATAK V1 auth/entitlement API and operator authorization; build server-side partner CRUD, tenant isolation, audit, moderation, draft-priced offers and human-approved public publication.
4. Activate commercial booking, payments and 5% campaign only after issue #2 operator/legal/supplier requirements are fully satisfied. Do not create billable Supabase projects.
5. Add grounded multilingual AI via approved server adapter and SEO expansion with real sources and ongoing review.

No real partner dashboard, AI service, payments, booked excursions, customer data capture or 5% public promotion is implemented by this design document.
