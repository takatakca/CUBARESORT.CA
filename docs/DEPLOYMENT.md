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
- Initial HTTPS target: `https://ci7ltew4v50e4fwq63tfvtg6.31.220.96.134.sslip.io/`. This becomes a verified live URL only after the deployment and certificate checks succeed. The workflow can override it using `CUBARESORT_COOLIFY_HTTPS_URL`.
- Set `CUBARESORT_COOLIFY_PRODUCTION_READY=true` only after the mail-preserving DNS cutover and domain acceptance; this adds the apex HTTPS check to every release. No production-domain completion is claimed by this setup document.
- No database or uploads exist in this static portal. Content lives in Git, so no persistent volume is required. Browser-local favourites remain browser-local. Do not infer that an inaccessible legacy MochaHost website has been backed up.
- Retain GitHub Pages as a verified fallback during domain migration. Do not disable it before Contabo acceptance.

## Existing GitHub Pages fallback
GitHub Pages from `main` is the current verified publishing service, **not** an unverified cPanel document root. `main` push triggers `.github/workflows/publish.yml`: source check/tests → build `dist/` → upload artifact → Pages deploy → remote HTTPS verification. Pull requests run the validation job only.

- Public project-path URL: https://takatakca.github.io/CUBARESORT.CA/
- Repository: https://github.com/takatakca/CUBARESORT.CA
- Actions: https://github.com/takatakca/CUBARESORT.CA/actions
- Node version: 22; no npm dependencies.
- Local checks: `npm run validate`; `npm run build`.
- Live check: `npm run verify:live -- --url https://takatakca.github.io/CUBARESORT.CA/ --sha FULL_40_CHARACTER_MAIN_SHA`.
- The build creates a `release.json` file containing the full source SHA, build time and SHA-256 of first-party HTML/JS/CSS/asset files. The verifier must compare real HTTPS file bytes to each digest; the release metadata alone is not proof.
- Verify the *latest* `main` SHA and its Actions deployment before declaring publication. A green PR run or successful build without deploy is insufficient.

## Custom-domain state, not yet completed
`https://cubaresort.ca/` remains separate from the working GitHub Pages path. Last authoritative investigation: apex A `209.42.24.125` at MochaHost, `www` CNAME to apex, no apex AAAA, MX to **the apex**, and HTTP/HTTPS Apache 500. The owner has the domain registered at MochaHost, but the existing zone is not accessible from the inspected application cPanel or reseller WHM.

### Safe cutover gate
1. Gain access to the **existing** authoritative zone or have the host attach the existing zone to the authorized site account. Do not create an empty replacement zone.
2. Export all existing DNS records, nameservers, TTLs and mail-related A/MX/TXT/SPF/DKIM/DMARC records; record previous values for rollback. Do not paste passwords, session URLs or private DNS credentials into Git.
3. Because MX resolves to the apex, preserve inbound mail on the existing MochaHost IP using a verified dedicated mail host **before** changing apex web A records. Confirm with the responsible mail administrator.
4. After verifying the Contabo application and preserving mail, configure its custom domain and the required web A/AAAA/CNAME records; do not blindly switch nameservers. Keep existing mail routes intact.
5. Verify HTTPS hostname/certificate, apex and www response, assets, and the exact `main` SHA / file integrity through the custom domain; check mail flow separately.
6. Close issue #1 only after both website and email acceptance, with rollback details documented.

No direct production DNS or hosting changes were authorized/possible during this session.

## Incident / rollback
- For a broken Pages release, inspect the failed job/remote verifier; do not claim success.
- Fix on a reviewed branch, test and push a normal non-forced commit to `main` where permitted. Avoid resetting other agents' work.
- Domain/DNS rollback means restoring the **exported existing records**, not guessing past values.
- Keep PR #3 Next.js work independent. Do not activate private credentials, commercial booking, email collection or payments to repair publishing.
