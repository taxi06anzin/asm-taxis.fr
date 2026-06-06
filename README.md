# ASM Taxis — site Astro (reconstruction 2026)

Site officiel d'**ASM Taxis** (asm-taxis.fr), artisan taxi à Lille — **Mohamed Alaghyane, ADS Lille n°180**.
Reconstruit **de zéro**, design jaune taxi/noir, **distinct de vtaxi-lille.fr** (propriétaire différent) pour éviter toute cannibalisation et toute duplication de template.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # prévisualise dist/
```

## Architecture — 1 mot-clé = 1 page = 1 intention (zéro cannibalisation interne)

| URL | Mot-clé cible |
|---|---|
| `/` | taxi lille |
| `/taxi-aeroport-lille/` | taxi aeroport lille |
| `/taxi-gare-lille-flandres/` | taxi gare lille flandres |
| `/taxi-gare-lille-europe/` | taxi gare lille europe |
| `/taxi-lille-nuit/` | taxi lille nuit |
| `/taxi-lille-pas-cher/` | taxi lille pas cher |
| `/reservation-taxi-lille/` | reservation taxi lille |
| `/contact/` + pages légales | utilitaire |

## Différences voulues vs vtaxi-lille.fr (anti-cannibalisation)
- **URLs à plat** (pas de `/services/...` comme VTaxi).
- **Pas de 29 pages villes** (territoire/template de VTaxi).
- **Design jaune/noir** ≠ bleu marine/ambre de VTaxi.
- **Copie 100 % originale**, angle artisan unique + ADS n°180 (≠ angle « réseau » de VTaxi).
- Schema avec `Person` (propriétaire) + `PropertyValue` ADS réel.

## À COMPLÉTER avant mise en ligne (données légales — non inventées)
- `src/pages/mentions-legales.astro` : **SIRET**, statut TVA, **hébergeur** (nom/adresse/tél).
- `src/pages/cgv.astro` : coordonnées du **médiateur de la consommation**.
- Vérifier le n° de téléphone et l'e-mail dans `src/data/site.ts`.

## Configuration centralisée
Toutes les données (NAP, ADS, téléphone, schema) sont dans **`src/data/site.ts`** — point unique à modifier.

## Déploiement
Site 100 % statique → déployable sur tout hébergeur statique/CDN (Netlify, Vercel, Cloudflare Pages, OVH, etc.).
Publier le contenu de `dist/`. Conserver les en-têtes de sécurité (CSP, HSTS) côté hébergeur comme sur l'actuel.
Après mise en ligne : soumettre `https://asm-taxis.fr/sitemap-index.xml` dans Google Search Console.
