# KLEAN — Carte de déploiement — cubaresort.ca — 2026-10-29

Signé : KLEAN (Muse), mission déploiement 2026-10-29 ~17:14 EDT.
Portée : carte seulement. Aucun site remplacé, aucun DNS modifié, aucun secret copié, aucune réservation activée.

## AVANT (vérifié 2026-10-29)

- Dépôt : `takatakca/CUBARESORT.CA`, branche `main` vérifiée : `a80c383e8e02481c3331fabc344b84b36c0cc1fe` (2026-10-26, « docs: reconcile verified accessibility releases »).
- Cible déclarée dans le dépôt : **Coolify / Contabo** (application Coolify `CUBARESORT`, production), serveur `31.220.96.134`, port interne `8080`, `Dockerfile.coolify` ; secours **GitHub Pages** (`takatakca.github.io/CUBARESORT.CA`, sans domaine personnalisé).
- Configuration présente : oui — `Dockerfile.coolify`, `deploy/coolify/nginx.conf`, `.github/workflows/coolify.yml` (conteneur + vérification live), `.github/workflows/publish.yml` (Pages, `main` seulement).

## PENDANT (auto-déploiement)

- **Auto-déploiement : OUI, déjà activé selon les docs du dépôt** — application GitHub Coolify existante, « Deploy on push » (webhooks) sur `main` ; chaque push de `main` crée un déploiement Coolify natif, sans nouveau jeton. Les docs citent le déploiement automatique vérifié du 2026-10-16 (`d646033`, webhook natif, runs conteneur/live et Pages passés, SHA exact + neuf digests sur apex et www).
- Aucune activation par code à ajouter : le mécanisme est déjà en place dans le dépôt et dans Coolify. KLEAN n'a pas d'accès Coolify vérifié et ne prétend pas avoir vérifié le panneau Coolify.
- Nuance : la dernière version de production vérifiée consignée dans `docs/PROJECT_STATUS.md` est `c8c328aa` (2026-10-21). Le `main` actuel `a80c383` (2026-10-26, docs seulement) n'a pas encore de preuve de production consignée dans le dépôt — à re-vérifier après le prochain déploiement automatique (SHA exact + digests + `/healthz` sur apex et www).

## APRÈS (ce qui manque / à faire par le propriétaire)

- Vérification en ligne du `main` actuel (à faire par l'agent principal, pas par cet agent) : `npm run verify:live -- --url https://cubaresort.ca/ --sha a80c383e8e02481c3331fabc344b84b36c0cc1fe` et idem pour `www`, plus `/healthz=ok` et HTTP→HTTPS. État en ligne du `main` actuel : **non vérifié en ligne par cet agent** (un merge n'est pas une preuve de mise en ligne).
- Bloqueurs commerciaux inchangés : l'issue #2 bloque toujours tout flux fournisseur, réservation, paiement et collecte de prospects ; exigences fournisseur/opérateur/légal AVANT toute réservation. PRs ouvertes non fusionnées par cet agent : #8 (brouillon, guide éditorial), #7 (brouillon, microsites), #5 et #3 (Next.js, séparées de l'exploitation).
- Aucune PR fusionnée par cette carte. Cette note est une carte, pas un déploiement.
