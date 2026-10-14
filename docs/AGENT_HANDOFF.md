# Agent handoff — CUBARESORT.CA

Updated: 2026-10-14

## Starting repository state

- Repository: takatakca/CUBARESORT.CA
- Default branch: main
- Pre-development commit: 1b567d6a6bc982a8b2058066e4ad2733cf5712f4 (Initial commit)
- Only original file: README.md containing one line (# CUBARESORT.CA).
- No issues, PRs, existing application code or handoff documents in the original tree.

## First phase decision

With no product specification and no existing implementation, deliver a usable Cuba travel inspiration website. It must not impersonate a reservation engine or advertise unverified inventory. The booking provider, operator legal identity, contact mailbox, production hosting and payment arrangement are currently unknown.

## Implementation guide

- index.html and assets/styles.css: UI and responsive styles
- assets/app.js: rendering, filtering, sorting, saved favourites, language switch, request draft
- assets/catalog.js: editorial inspiration data, not confirmed hotel listings
- assets/i18n.js: FR/EN/ES copy, FAQs and temporary legal text
- assets/config.js: external integrations disabled by default
- scripts/: Node preview server and output packaging
- tests/: built-in Node tests
- .github/workflows/publish.yml: main push validation and GitHub Pages attempt
- docs/PRODUCTION_CHECKLIST.md: requirements and deployment blockers

## Next agent tasks, prioritized

1. Fetch latest main commit and Actions workflow run; inspect logs; address any errors without force pushing over someone else's work.
2. Confirm actual Pages/DNS/hosting status. Use GitHub Pages only if authorized and configured, otherwise arrange a static output deployment to the verified CUBARESORT.CA cPanel root.
3. Test in real browsers and on mobile, then correct layout and accessibility issues.
4. Confirm operator identity, a working email mailbox and legally reviewed policies before allowing real lead collection.
5. Obtain approved resort suppliers, feature requirements and booking agreements before building a secure backend, quote and transaction pipeline.
6. Continue by fixing verified issues, updating tests and recording each completed commit and deployment in this handoff.

## Non-negotiable constraints

- No fabricated prices, reviews, room availability, booking confirmation or hotel-specific photo claims.
- No API keys or sensitive traveller data in the static client.
- Preserve all three locales and keyboard accessibility.
- GROUPE TAKATAK retains the master identity/customer-data authority; all vertical business data must be tenant scoped.
- An information-site deployment is not a live commercial booking launch.
