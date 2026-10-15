# Deployment operations — CUBARESORT.CA

Updated 2026-10-15.

## Authorized Contabo migration — 2026-10-15

The owner explicitly selected Coolify on Contabo with automatic GitHub deployment. This supersedes the earlier Pages-only hosting decision; the existing application and SHA-256 release verification remain intact.

- Separate project `CUBARESORT`, production environment; resource UUID `ci7ltew4v50e4fwq63tfvtg6`.
- Coolify resource: https://coolify.takatak.ca/project/ayhntlw7pcxy46nqiubhrnp5/environment/bkqnnzcbjc8q2lcxndyenjpl/application/ci7ltew4v50e4fwq63tfvtg6
- Contabo host: `31.220.96.134`; internal port `8080`; no public port mappings.
- Existing authorized GitHub App, repository `takatakca/CUBARESORT.CA`, branch `main`, auto deploy on push. No extra repository token or new GitHub permission grant is needed.
- Build strategy Dockerfile, path `/Dockerfile.coolify`, base `/`, source commit available during build, explicit Dockerfile build arguments.
- `Dockerfile.coolify` runs all application tests and the static build using the exact `SOURCE_COMMIT`, then exercises the final unprivileged Nginx image before it can replace a live container. Runtime health checks validate release identity, homepage, assets and `/healthz`.
- `.github/workflows/coolify.yml` builds and starts the actual production container, verifies all first-party file digests, private-path isolation, cache behavior and runtime health. Main pushes also wait for the matching HTTPS Coolify release and verify its exact SHA and byte digests.
- Verified HTTPS target: `https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/`. Release `5f47930af670fa387f6f5990b42394d8c62a7d11` passed the real container and external HTTPS verification in run 38776838876; native webhook deployment `xofxdyeudps7innbmlkqzwzv` finished healthy at 17:25:57 UTC on 2026-10-15. The workflow can override it using `CUBARESORT_COOLIFY_HTTPS_URL`.
- Set `CUBARESORT_COOLIFY_PRODUCTION_READY=true` only after the mail-preserving DNS cutover and domain acceptance; this adds the apex HTTPS check to every release. No production-domain completion is claimed by this setup document.
- No database or uploads exist in this static portal. Content lives in Git, so no persistent volume is required. Browser-local favourites remain browser-local. Do not infer that an inaccessible legacy MochaHost website has been backed up.
- Retain GitHub Pages as a verified fallback during domain migration. Do not disable it before Contabo acceptance.

## Existing GitHub Pages fallback
GitHub Pages from `main` continues as the verified fallback while Contabo becomes the selected production host. `main` push triggers `.github/workflows/publish.yml`: source check/tests → build `dist/` → upload artifact → Pages deploy → remote HTTPS verification. Pull requests run the validation job only.

- Public project-path URL: https://takatakca.github.io/CUBARESORT.CA/
- Repository: https://github.com/takatakca/CUBARESORT.CA
- Actions: https://github.com/takatakca/CUBARESORT.CA/actions
- Node version: 22; no npm dependencies.
- Local checks: `npm run validate`; `npm run build`.
- Live check: `npm run verify:live -- --url https://takatakca.github.io/CUBARESORT.CA/ --sha FULL_40_CHARACTER_MAIN_SHA`.
- The build creates a `release.json` file containing the full source SHA, build time and SHA-256 of first-party HTML/JS/CSS/asset files. The verifier must compare real HTTPS file bytes to each digest; the release metadata alone is not proof.
- Verify the *latest* `main` SHA and its Actions deployment before declaring publication. A green PR run or successful build without deploy is insufficient.

## Read-only domain/mail readiness guard — 2026-10-15

The owner's mobile screenshot shows a generic Phusion Passenger error at `cubaresort.ca`; a public HTTPS request also returned HTTP 500. This is the legacy MochaHost application, not the deployed Contabo Nginx application. The precise Passenger exception requires access to that legacy application's logs.

`npm run check:domain-dns` reads public DNS only. It requires apex and www to resolve exclusively to the verified Contabo IPv4 `31.220.96.134`, requires an MX pointing to a **separate, resolving mail host** rather than the web apex or web server, and refuses unapproved IPv6. When `CUBARESORT_COOLIFY_PRODUCTION_READY=true`, the CI runs this guard before the custom-domain HTTPS SHA/asset verifier. While the current MX still points at the apex, it deliberately fails.

The guard never changes DNS. Its success cannot replace a backup of the **entire existing zone**, email send/receive checks, site-account verification or authorization to cut over. Do not enable the production-ready flag until these human-controlled requirements and apex/www TLS are fulfilled.

## Custom-domain state, not yet completed
`https://cubaresort.ca/` remains separate from the working GitHub Pages path. Last authoritative investigation: apex A `209.42.24.125` at MochaHost, `www` CNAME to apex, no apex AAAA, MX to **the apex**, and HTTP/HTTPS Apache 500. The owner has the domain registered at MochaHost, but the existing zone is not accessible from the inspected application cPanel or reseller WHM.

### Safe cutover gate
1. Gain access to the **existing** authoritative zone or have the host attach the existing zone to the authorized site account. Do not create an empty replacement zone.
2. Export all existing DNS records, nameservers, TTLs and mail-related A/MX/TXT/SPF/DKIM/DMARC records; record previous values for rollback. Do not paste passwords, session URLs or private DNS credentials into Git.
3. Because MX resolves to the apex, preserve inbound mail on the existing MochaHost IP using a verified dedicated mail host **before** changing apex web A records. Confirm with the responsible mail administrator.
4. After verifying the Contabo application and preserving mail, configure its custom domain and the required web A/AAAA/CNAME records; do not blindly switch nameservers. Keep existing mail routes intact.
5. Verify HTTPS hostname/certificate, apex and www response, assets, and the exact `main` SHA / file integrity through the custom domain; check mail flow separately.
6. Close issue #1 only after both website and email acceptance, with rollback details documented.

The owner authorized the separate Contabo application and domain migration. The Contabo application is deployed; the existing authoritative domain-zone access is still unavailable. No domain DNS or mail changes were made.

## Incident / rollback
- For a broken Pages release, inspect the failed job/remote verifier; do not claim success.
- Fix on a reviewed branch, test and push a normal non-forced commit to `main` where permitted. Avoid resetting other agents' work.
- Domain/DNS rollback means restoring the **exported existing records**, not guessing past values.
- Keep PR #3 Next.js work independent. Do not activate private credentials, commercial booking, email collection or payments to repair publishing.

## DNS cutover record (pending existing-zone access)

Do not apply this table until the full existing zone has been exported and the current mail hostname/routing has been verified. It records the intended web target, not permission to replace unseen records.

| Record | Current verified state | Required next state |
|---|---|---|
| cubaresort.ca A | 209.42.24.125 | 31.220.96.134 after mail separation and DNS backup |
| cubaresort.ca AAAA | No record | Keep absent unless a verified Contabo IPv6 route is deliberately configured |
| www | CNAME cubaresort.ca | Preserve alias, configure matching Coolify domain and HTTPS redirect |
| MX | 0 cubaresort.ca. | Verified dedicated mail hostname resolving to the existing mail service before apex web changes |
| SPF / DKIM / DMARC and other records | Existing SPF includes a, mx and MochaHost IP/include mechanisms | Export and preserve all records; confirm mail authorization still resolves correctly after separation |

The concrete hosting intervention is to expose or attach the **existing cubaresort.ca authoritative DNS zone/site account serving 209.42.24.125** to the authorized MochaHost account. Do not create a blank zone or switch nameservers. After access: back up records, preserve mail, add apex/www HTTPS domains to this Coolify resource, change only verified web records, test HTTPS and the exact current main manifest plus every checksum, then verify mail before closing issue #1.
