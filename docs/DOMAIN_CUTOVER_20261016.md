# Custom-domain cutover checkpoint — 16 October 2026

The owner confirmed that cubaresort.ca is in the bolonca hosting account and authorized completing its separate Coolify/Contabo migration. The zone is now present in that account. The earlier missing-zone diagnosis is historical.

## Saved infrastructure configuration

| Record or setting | Saved value |
| --- | --- |
| cubaresort.ca A | 31.220.96.134, TTL 300 |
| www.cubaresort.ca CNAME | cubaresort.ca, existing TTL 7200 |
| cubaresort.ca MX | Priority 0, mail.cubaresort.ca, TTL 300 |
| mail.cubaresort.ca A | 209.42.24.127, TTL 300 |
| ftp.cubaresort.ca A | 209.42.24.127, existing TTL 7200 |
| SPF | v=spf1 +mx +ip4:209.42.24.124 +ip4:209.42.24.127 include:spf.mysecurecloudhost.com ~all |
| Four CalDAV/CardDAV SRV targets | cpcalendars.cubaresort.ca; existing priority, weight, ports and TTL retained |
| Existing DKIM, DMARC and other service A/TXT records | Retained |
| cPanel email routing | Local Mail Exchanger |
| Nameservers | Existing ns1–ns4.mysecurecloudhost.com retained |
| Coolify apex and www domains | HTTPS, internal port 8080, HTTP-to-HTTPS enabled; saved, deployment changes pending |

The existing mail hostname was a CNAME to the web apex. It is now an independent A record so it cannot follow the web move to Contabo. SPF no longer authorizes the web apex through `+a`. FTP and calendar/address-book destinations similarly remain on MochaHost. These are saved local-zone settings, not proof of public DNS publication or end-to-end mail delivery.

## Backup and source inspection

- Exported all 25 visible zone records, including the complete DKIM public key, plus all four configured nameservers, before any edit. The rollback export contains no sign-in/session values.
- Archived the confirmed `/home/bolonca/cubaresort.ca` document root to `/home/bolonca/migration-backups/cubaresort-20261016/site-before-cutover.tar.gz`; archive listing verified. The directory was about 28 KB and contained PHP configuration, `.well-known` and `cgi-bin`, with no deployed application or database configuration identified.
- No cubaresort.ca mailbox directory was present at the inspected account paths. No mail messages, database data, hosting subscription or billing setting was deleted or changed.
- This does not constitute a backup of the previously documented inaccessible installation at 209.42.24.125.
- A supplemental UAPI CLI zone export failed in the account's jailed environment. Do not treat the empty `dns-current.json` from that attempt as a valid backup. Use the verified 25-record export instead.

## Verified application release

Main at inspection: `ff907675207f32f0d113f07f01a1d7d11c97ed0e`.

- [Coolify container and live run 38852247513](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38852247513): successful.
- [Pages fallback run 38852247489](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38852247489): successful.
- Independent `verify:live` passed that full SHA and all nine first-party SHA-256 digests at https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ . Local validation passed all 32 tests and the static build.
- Separate application remains `ci7ltew4v50e4fwq63tfvtg6` on Contabo `31.220.96.134`, Dockerfile.coolify, internal port 8080, existing GitHub App webhook.

## Current blocker and next action

All four delegated MochaHost nameservers returned **REFUSED** for this domain. Both Google and Cloudflare public DNS returned **SERVFAIL**, explicitly identifying refused authoritative queries. Queries to bolonca's local DNS server returned **NOERROR** and an authoritative SOA. Therefore this is an authoritative-zone publication/synchronization problem; waiting for ordinary A-record cache expiry cannot by itself establish success.

Coolify shows DNS mismatch for apex/www and configuration changes pending. The generated Contabo hostname still works. The owner completed MochaHost customer-portal sign-in at approximately 11:15 UTC. The authenticated bolonca hosting and registered-domain General/Settings screens expose no DNS synchronization control. Fresh direct queries from s3650 again show public REFUSED versus local authoritative NOERROR with the saved A/MX/mail A records. A Support-category ticket is fully prepared for bolon.ca (Ultimate), titled `cubaresort.ca DNS outage - authoritative nameservers return REFUSED`, but has NOT been submitted; explicit permission to send a support message is pending. No support message was sent.

1. MochaHost portal sign-in is complete and bolonca cPanel SSO was verified. No customer-facing synchronization control was found in the hosting/domain settings. Keep the prepared support ticket available; do not ask for the same sign-in again while the session remains valid. Do not create a blank zone or change nameservers blindly.
2. If provider administration is required, obtain authorization before sending a support request asking MochaHost to publish/synchronize the existing cubaresort.ca zone from s3650.can1.stableserver.net to ns1–ns4.mysecurecloudhost.com. The exact saved values above must be retained.
3. Require authoritative/public DNS to return web A 31.220.96.134, www alias, separate MX/mail A and preserved TXT/service records. Verify apex/www TLS and apply the pending Coolify domain configuration to this application only.
4. Perform the mail checks applicable to the actual mailbox/service; no mailbox delivery test has yet passed. Do not describe mail as verified.
5. Only after acceptance, set CUBARESORT_COOLIFY_PRODUCTION_READY=true, require the apex DNS/mail guard and exact-SHA/file checks, and verify a real GitHub-triggered main release through the public domain. Keep issue #1 open until then.

This checkpoint is intentionally on an operations branch while DNS publication is blocked; it does not claim a completed custom-domain launch or change main solely to produce an unnecessary deployment failure.
