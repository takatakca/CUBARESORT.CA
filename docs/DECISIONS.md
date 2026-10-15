# Architecture and release decisions — CUBARESORT.CA

Updated 2026-10-15.

| Decision | Rationale / limit |
|---|---|
| Continue the current static FR/EN/ES portal on `main` | It is working code with successful GitHub Pages releases. A from-scratch rebuild would discard features and increase release risk. |
| Treat the property list as a directory, not inventory | 169 names across 13 regions include unconfirmed archival records. There are no trustworthy per-property rates, rooms, reviews or live availability. |
| Do not merge PR #3 as part of DNS/Pages repair | Its Next.js/Supabase architecture is separately proposed and not at feature parity or commercially approved. It also raises new authorization requirements. |
| Use a separate Coolify application on Contabo for the informational site, retaining Pages as fallback | Owner explicitly requested Contabo and automatic GitHub deployment on 2026-10-15. Preserve the existing static product and checksum verification. Confirm real deployment and DNS acceptance before claiming production cutover. |
| Stamp `release.json` with SHA-256 of first-party files | SHA-only metadata can coexist with stale or mismatched assets; hashing the generated output and checking fetched bytes makes a mixed deployment fail CI. |
| Reject unsafe custom-domain DNS when production-ready validation is enabled | Public read-only preflight must confirm apex/www web target and a separate resolving MX target; still require original-zone export and actual mail acceptance before any change. |
| Keep the custom-domain DNS and MX unchanged until access exists | `cubaresort.ca`'s MX points to the apex; changing the web A record without a mail-preserving destination risks email disruption. The existing authoritative zone is outside accessible hosting accounts. |
| No backend lead collection, payment or booking without a provider | No verified recipient, approved travel operator, supplier agreements, consent processing or tenant-scoped permissions exist. Draft-only interactions avoid misleading transactions. |
| GROUPE TAKATAK retains master identity/data authority | If integration is approved later, use authenticated server-side, tenant-scoped APIs; no duplicate master CRM or credentials in browser code. |

Re-evaluate a decision only with new, verifiable evidence; update this record and the handoff in the same changeset.
