# Deployment — CUBARESORT.CA

Updated: 2026-10-15. Nothing here is assumed; every "live" claim names its evidence.

## Where the site actually runs today

**GitHub Pages**, from `main`, built by `.github/workflows/publish.yml`.

- URL: https://takatakca.github.io/CUBARESORT.CA/ (HTTP 200, checked 2026-10-15)
- Source: GitHub Actions (`has_pages: true`)
- Served from the static export in `out/`

Pages runs no Node. Anything needing a server at request time cannot ship here.

## Two build targets, one source

```bash
npm run build:static   # BUILD_TARGET=static -> out/   (GitHub Pages: today)
BUILD_TARGET=node npm run build   # -> .next/standalone (Coolify: later)
```

`NEXT_PUBLIC_BASE_PATH=/CUBARESORT.CA` is required for project Pages so assets
resolve. Leave it empty for a custom domain or the container.

## How a deployment is proved

The deploy job does not trust itself. After `deploy-pages` it runs:

```bash
npm run verify:live -- --url <page_url> --sha <commit>
```

which fetches `release.json` and the homepage over HTTPS and fails unless the
published commit matches and the page really contains the Next.js bundle, the
rendered directory and real region data. It retries for ~2 minutes, then fails
the job. **A deployment is not reported as successful without this passing.**

## Coolify (prepared, not provisioned)

The Dockerfile targets the same shape FOOD HUB uses on the Contabo VPS
(`coolify.takatak.ca`): Node 22 Alpine, standalone output, port 3000, health
check. CI builds the image on every run, so it cannot silently rot.

**No Coolify app, token or DNS record has been confirmed for this project.**
Before claiming a Coolify deployment, provision the app, set the secrets below,
deploy, then fetch the URL and check it.

Required: `COOLIFY_API_TOKEN`, `DATABASE_URL`, `DIRECT_URL`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY`.

## The cubaresort.ca domain — read before touching DNS

- Apex `209.42.24.125` (MochaHost). It currently answers **HTTP 500**
  ("Web application could not be started").
- **The MX record points at the apex.** Repointing the apex to move the website
  would break the mailbox. Export the existing zone first and plan a
  mail-preserving cutover.
- Neither accessible hosting account exposes the zone. Getting that access is a
  prerequisite, tracked in `docs/TASK_QUEUE.md`.

## Rollback

Pages keeps previous deployments. Re-run the workflow on an earlier commit, or
revert the merge on `main` and let the pipeline republish. The live check then
confirms the rollback actually took.
