# Deployment operations — CUBARESORT.CA

Updated 2026-10-16. Production hosting is the separate Coolify application on Contabo.

## Verified automatic production release — 2026-10-16

Main `d64603349ed7c967590c41b7e2005cab391142de` automatically deployed through native Coolify Webhook `5yufbgsdz9bccmoe9h15vnzc` on 2026-10-16. Production container/live [run 38921978874](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978874) and Pages [run 38921978877](https://github.com/takatakca/CUBARESORT.CA/actions/runs/38921978877) both passed. The live job explicitly reports `PRODUCTION_READY: true`, public DNS/mail separation, and full SHA plus all nine file digests on both apex and www.

The hosting incident is resolved. Later evidence-only main commits require their own normal automatic verification; the final current SHA/run/deployment is recorded in issue #1. Functional mail delivery is still untested. Earlier instructions to merge PR #6 or finish its acceptance describe the completed checkpoint.

## Production settings

| Setting | Value |
| --- | --- |
| Production | https://cubaresort.ca/ and https://www.cubaresort.ca/ |
| Contabo IPv4 | 31.220.96.134 |
| Coolify project / environment | CUBARESORT / production |
| Resource UUID | ci7ltew4v50e4fwq63tfvtg6 |
| Repository / branch | takatakca/CUBARESORT.CA / main |
| Deployment | Existing authorized GitHub App, Deploy on push (webhooks) |
| Builder / path / base | Dockerfile / /Dockerfile.coolify / / |
| Internal port | 8080, no host port mappings |
| Source commit | Available during build; explicit Dockerfile build arguments |
| Readiness | Dockerfile healthcheck: release identity, static files and /healthz |
| HTTPS | Valid certificates for apex/www; HTTP redirects to HTTPS |
| Production acceptance variable | CUBARESORT_COOLIFY_PRODUCTION_READY=true |
| Generated HTTPS diagnostic URL | https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/ |
| Pages fallback | https://takatakca.github.io/CUBARESORT.CA/ |

Coolify resource: https://coolify.takatak.ca/project/ayhntlw7pcxy46nqiubhrnp5/environment/bkqnnzcbjc8q2lcxndyenjpl/application/ci7ltew4v50e4fwq63tfvtg6

Main pushes automatically create a native Coolify webhook deployment. No new deployment token or permissions are needed. `Dockerfile.coolify` runs the Node 22 checks, tests and build and validates the final unprivileged Nginx image before replacement. `.github/workflows/coolify.yml` independently exercises the actual container, private-path isolation and runtime integrity, then verifies the exact current-main HTTPS release and nine first-party file digests. With production readiness enabled it also requires mail-safe public DNS and exact apex/www releases. The whole group retries during rolling replacement; a newer main prevents a stale-release claim.

The portal has no server database or uploaded content; Git is the content source. No persistent volume is required. Browser-local favourites remain local. Keep the separate application, existing healthcheck and shared-server build limit intact.

## Accepted domain repair

The owner repaired provider DNS publication on 2026-10-16. The reported HTTP 404 was then traced to pending Coolify domain configuration. Deployment `1ckyac9swtil2zrjjhezhrcb` applied it and became healthy at 15:06:16 UTC. Independent checks passed on apex and www for full main SHA `ff907675207f32f0d113f07f01a1d7d11c97ed0e`, all nine asset digests, `/healthz=ok`, valid HTTPS and HTTP redirects. This is the initial routing acceptance, not a substitute for verifying the subsequent automatic operations-merge release. Record that release's actual SHA, native Webhook deployment and Actions links in issue #1.

## DNS and mail preservation

The existing 25-record zone and four nameservers were exported before changes. Apex A is `31.220.96.134`; www remains an apex CNAME; no web AAAA is approved. Mail stays independent: MX `0 mail.cubaresort.ca`, mail A `209.42.24.127`, Local Mail Exchanger. SPF, DKIM, DMARC and service routes remain on their documented MochaHost destinations. Existing nameservers were retained.

`npm run check:domain-dns` is read-only and rejects wrong apex/www hosts, unexpected IPv6, apex-following MX and mail pointing at the web server. It does not prove mail delivery. No send/receive test has been performed or email sent. See `docs/DOMAIN_CUTOVER_20261016.md` for exact records, backups and limitations. Historical missing-zone/REFUSED blockers and the unsubmitted support draft are superseded.

## Release verification

Use Node 22 in CI. Run `npm run validate` and `GITHUB_SHA=FULL_SHA npm run build` before release. After a main push, inspect both current-main Actions workflows and the native Coolify **Webhook** deployment. Then run:

```sh
npm run check:domain-dns
npm run verify:live -- --url https://cubaresort.ca/ --sha FULL_40_CHARACTER_MAIN_SHA
npm run verify:live -- --url https://www.cubaresort.ca/ --sha FULL_40_CHARACTER_MAIN_SHA
```

Require `/healthz` HTTP 200 and both HTTP-to-HTTPS redirects. Never disable TLS validation or accept metadata without fetched asset checksums. The executor may use public DoH through the guard's injected lookup when direct DNS sockets are unavailable; CI must still run the ordinary real-DNS guard.

## Pages fallback and rollback

Settings → Pages uses GitHub Actions, with no custom domain. `.github/workflows/publish.yml` validates PRs and publishes main only after successful checks, then verifies exact HTTPS SHA and file bytes at the Pages project path. Keep this fallback active.

For an application regression, revert with a normal tested main commit or use this application's known healthy Coolify image; reverify exact release/health. Do not reset unrelated branches or change other server resources. DNS rollback restores the exported records, preserving independent mail; never guess original values or replace nameservers. The confirmed bolonca root archive is `/home/bolonca/migration-backups/cubaresort-20261016/site-before-cutover.tar.gz`; this is not a backup of the older inaccessible 209.42.24.125 installation. Merely restoring old web DNS may restore the former broken site, so test before any rollback.

PR #3's Next.js proposal, supplier integrations, lead collection and payments remain separate from hosting operations.
