# Architecture and release decisions — CUBARESORT.CA

Updated 2026-10-16.

| Decision | Rationale / limit |
|---|---|
| Continue the current static FR/EN/ES portal on `main` | It is working code with successful GitHub Pages releases. A from-scratch rebuild would discard features and increase release risk. |
| Treat the property list as a directory, not inventory | 169 names across 13 regions include unconfirmed archival records. There are no trustworthy per-property rates, rooms, reviews or live availability. |
| Do not merge PR #3 as part of DNS/Pages repair | Its Next.js/Supabase architecture is separately proposed and not at feature parity or commercially approved. It also raises new authorization requirements. |
| Use a separate Coolify application on Contabo for the informational site, retaining Pages as fallback | Owner explicitly requested Contabo and automatic GitHub deployment on 2026-10-15. Preserve the existing static product and checksum verification. Confirm real deployment and DNS acceptance before claiming production cutover. |
| Stamp `release.json` with SHA-256 of first-party files | SHA-only metadata can coexist with stale or mismatched assets; hashing the generated output and checking fetched bytes makes a mixed deployment fail CI. |
| Reject unsafe custom-domain DNS when production-ready validation is enabled | Public read-only preflight must confirm apex/www web target and a separate resolving MX target; still require original-zone export and actual mail acceptance before any change. |
| Keep production on Contabo and mail independently on MochaHost | Existing-zone access and backup became available in bolonca; the owner repaired public DNS. On 2026-10-16 apex/www TLS and exact release acceptance passed after pending Coolify routing was applied. MX now targets mail.cubaresort.ca at 209.42.24.127. Preserve all original backups and nameservers; mail delivery remains untested. |
| No backend lead collection, payment or booking without a provider | No verified recipient, approved travel operator, supplier agreements, consent processing or tenant-scoped permissions exist. Draft-only interactions avoid misleading transactions. |
| GROUPE TAKATAK retains master identity/data authority | If integration is approved later, use authenticated server-side, tenant-scoped APIs; no duplicate master CRM or credentials in browser code. |

Re-evaluate a decision only with new, verifiable evidence; update this record and the handoff in the same changeset.

## 2026-10-16 — Curated multilingual travel guide and controlled partner roadmap

- Preserve current Contabo static site and existing main. Add separate crawlable guides for FR/EN/ES with helpful original summaries, official visa/advisory/UNESCO links, unique metadata and human-confirmed sources; reject automatically generated thin or duplicative SEO pages. Google position #1 is not guaranteed.
- Professional travel-agency aesthetics do not establish legal travel-agent status. No real booking, lead capture, public 5% price-matching promise or live partner registration while commercial authority in issue #2 remains unresolved.
- TAKATAK V1 stays master for identity/tenant/permissions. CUBARESORT will require a distinct server-side, tenant-scoped partner content service and reviewer moderation; no shadow identities, API tokens or prices in static files. AI may draft but may never bypass human review.
- Add the three guide pages, stylesheet and interaction module to the checksum manifest (14 total) and use full built release validation before public launch. Keep FR/EN/ES and existing Pages fallback intact.
