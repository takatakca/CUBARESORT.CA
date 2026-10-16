# Custom-domain cutover record — 16 October 2026

The owner confirmed that cubaresort.ca is in the bolonca hosting account and authorized completing its separate Coolify/Contabo migration. The zone is now present in that account. The earlier missing-zone diagnosis is historical.

## Verified automatic production release — 2026-10-16

Main `d64603349ed7c967590c41b7e2005cab391142de` automatically deployed through native Coolify Webhook `5yufbgsdz9bccmoe9h15vnzc` on 2026-10-16. Production container/live [run 38921978874](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978874) and Pages [run 38921978877](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978877) both passed. The live job explicitly reports `PRODUCTION_READY: true`, public DNS/mail separation, and full SHA plus all nine file digests on both apex and www.

The hosting incident is resolved. Later evidence-only main commits require their own normal automatic verification; the final current SHA/run/deployment is recorded in issue #1. Functional mail delivery is still untested. Earlier instructions to merge PR #6 or finish its acceptance describe the completed checkpoint.

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
| Coolify apex and www domains | HTTPS, internal port 8080, HTTP-to-HTTPS enabled; applied successfully at 15:06:16 UTC |

The existing mail hostname was a CNAME to the web apex. It is now an independent A record so it cannot follow the web move to Contabo. SPF no longer authorizes the web apex through `+a`. FTP and calendar/address-book destinations similarly remain on MochaHost. Fresh public DNS and the mail-safe DNS guard now confirm web/mail separation. End-to-end mail delivery remains untested.

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

## Domain activation and automatic-release acceptance

The owner confirmed provider DNS repair on 2026-10-16. Fresh public Google DNS returns apex A `31.220.96.134`, www CNAME to apex, MX `0 mail.cubaresort.ca`, mail A `209.42.24.127`, and no apex/www AAAA. The read-only `verifyDomainDns` guard passed using an injected public DoH lookup; normal DNS guard execution remains mandatory in CI.

The public HTTP 404 was caused by **saved but unapplied Coolify domain routing**, not missing application files. Manual deployment `1ckyac9swtil2zrjjhezhrcb` applied those changes, retained exact main `ff907675207f32f0d113f07f01a1d7d11c97ed0e`, and became healthy on its first Docker health attempt at 15:06:16 UTC. Coolify reports DNS matches for all three configured hostnames.

Independent HTTPS verification passed that full SHA and all nine real first-party file digests on both https://cubaresort.ca/ and https://www.cubaresort.ca/ . Both health endpoints return 200 `ok`; HTTP redirects to the corresponding HTTPS hostname. TLS validation was never disabled.

Repository variable `CUBARESORT_COOLIFY_PRODUCTION_READY=true` now activates public DNS/mail and production-hostname verification for main releases. The operations merge must pass a **new native GitHub App Webhook deployment**, actual container tests, Pages fallback publication and exact-new-main verification on both domains. Store the final merge SHA, native deployment UUID and Actions links in issue #1, then close its hosting incident once that proof succeeds. Do not call the manual routing deployment the automatic-release proof.

Mail routing and original records are preserved; no functional send/receive test or external mail was performed. The earlier local-only zone, public REFUSED and pending routing states are historical. The prepared MochaHost support ticket was never submitted and is no longer necessary.

## Rollback limits

Restore original records from the verified 25-record export only if a tested rollback is needed; retain separate mail routes rather than making mail follow the web. Keep the bolonca archive and Pages fallback. The archive does not cover the previously inaccessible 209.42.24.125 installation, which was already failing before this migration. Prefer a tested normal main revert or known healthy image on this same Coolify application for application regressions.
